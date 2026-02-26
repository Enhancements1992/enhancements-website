from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactFormCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=30)
    message: str = Field(..., min_length=10, max_length=2000)
    privacy_accepted: bool = Field(...)
    language: str = Field(default="it")

class ContactFormResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    company: Optional[str]
    phone: Optional[str]
    message: str
    privacy_accepted: bool
    language: str
    created_at: str
    status: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Enhancements srl API"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(limit: int = 50, skip: int = 0):
    status_checks = await db.status_checks.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit).skip(skip).to_list(None)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Contact Form Routes
@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(form_data: ContactFormCreate):
    if not form_data.privacy_accepted:
        raise HTTPException(status_code=400, detail="Privacy policy must be accepted")
    
    contact_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    doc = {
        "id": contact_id,
        "name": form_data.name,
        "email": form_data.email,
        "company": form_data.company,
        "phone": form_data.phone,
        "message": form_data.message,
        "privacy_accepted": form_data.privacy_accepted,
        "language": form_data.language,
        "created_at": created_at,
        "status": "new"
    }
    
    await db.contact_submissions.insert_one(doc)
    
    return ContactFormResponse(
        id=contact_id,
        name=form_data.name,
        email=form_data.email,
        company=form_data.company,
        phone=form_data.phone,
        message=form_data.message,
        privacy_accepted=form_data.privacy_accepted,
        language=form_data.language,
        created_at=created_at,
        status="new"
    )

@api_router.get("/contact", response_model=List[ContactFormResponse])
async def get_contact_submissions(limit: int = 50, skip: int = 0):
    submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).limit(limit).skip(skip).to_list(None)
    return submissions

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
