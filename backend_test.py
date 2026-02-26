import requests
import sys
import json
from datetime import datetime

class EnhancementsAPITester:
    def __init__(self, base_url="https://luxury-cosmetics-hub.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=10):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if not endpoint.startswith('http') else endpoint
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            test_result = {
                "test_name": name,
                "url": url,
                "method": method,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_body": None,
                "error": None
            }
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    test_result["response_body"] = response.json()
                except:
                    test_result["response_body"] = response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                test_result["error"] = f"Status code mismatch: expected {expected_status}, got {response.status_code}"

            self.results.append(test_result)
            return success, test_result.get("response_body", {})

        except requests.exceptions.RequestException as e:
            error_msg = f"Request failed: {str(e)}"
            print(f"❌ Failed - {error_msg}")
            test_result = {
                "test_name": name,
                "url": url,
                "method": method,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_body": None,
                "error": error_msg
            }
            self.results.append(test_result)
            return False, {}

    def test_health_endpoint(self):
        """Test API health check"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_contact_form_submission(self):
        """Test contact form submission with valid data"""
        contact_data = {
            "name": "Mario Rossi",
            "email": "mario.rossi@example.com",
            "company": "Test Company srl",
            "phone": "+39 123 456 7890",
            "message": "Questo è un messaggio di test per verificare il funzionamento del form di contatto.",
            "privacy_accepted": True,
            "language": "it"
        }
        return self.run_test("Contact Form Submission", "POST", "contact", 200, contact_data)

    def test_contact_form_validation_missing_name(self):
        """Test contact form validation - missing required name"""
        invalid_data = {
            "email": "test@example.com",
            "message": "Test message without name",
            "privacy_accepted": True,
            "language": "it"
        }
        return self.run_test("Contact Form - Missing Name", "POST", "contact", 422, invalid_data)

    def test_contact_form_validation_missing_email(self):
        """Test contact form validation - missing required email"""
        invalid_data = {
            "name": "Test User",
            "message": "Test message without email",
            "privacy_accepted": True,
            "language": "it"
        }
        return self.run_test("Contact Form - Missing Email", "POST", "contact", 422, invalid_data)

    def test_contact_form_validation_invalid_email(self):
        """Test contact form validation - invalid email format"""
        invalid_data = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "Test message with invalid email",
            "privacy_accepted": True,
            "language": "it"
        }
        return self.run_test("Contact Form - Invalid Email", "POST", "contact", 422, invalid_data)

    def test_contact_form_validation_privacy_not_accepted(self):
        """Test contact form validation - privacy not accepted"""
        invalid_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Test message without privacy acceptance",
            "privacy_accepted": False,
            "language": "it"
        }
        return self.run_test("Contact Form - Privacy Not Accepted", "POST", "contact", 400, invalid_data)

    def test_contact_form_validation_short_message(self):
        """Test contact form validation - message too short"""
        invalid_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Short",  # Less than 10 characters
            "privacy_accepted": True,
            "language": "it"
        }
        return self.run_test("Contact Form - Short Message", "POST", "contact", 422, invalid_data)

    def test_get_contact_submissions(self):
        """Test retrieving contact submissions"""
        return self.run_test("Get Contact Submissions", "GET", "contact", 200)

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Enhancements srl API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)

        # Basic API tests
        self.test_health_endpoint()
        self.test_root_endpoint()
        
        # Contact form tests
        self.test_contact_form_submission()
        self.test_get_contact_submissions()
        
        # Validation tests
        self.test_contact_form_validation_missing_name()
        self.test_contact_form_validation_missing_email()
        self.test_contact_form_validation_invalid_email()
        self.test_contact_form_validation_privacy_not_accepted()
        self.test_contact_form_validation_short_message()

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("✅ All tests passed!")
            return 0
        else:
            print("❌ Some tests failed")
            failed_tests = [r for r in self.results if not r['success']]
            print(f"\n🚨 Failed Tests ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"   - {test['test_name']}: {test.get('error', 'Unknown error')}")
            return 1

def main():
    tester = EnhancementsAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())