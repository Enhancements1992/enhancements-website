import React, { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeo } from '../hooks/useSeo';
import { blogPosts, blogUi } from '../content/blogPosts';
import { PostCard, formatDate } from './BlogPage';

const SITE = 'https://www.enhancements.eu';

const Section = ({ s }) => (
  <section className="mb-10">
    {s.h && <h2 className="font-heading text-2xl sm:text-3xl mb-4">{s.h}</h2>}
    {s.p?.map((t) => <p key={t.slice(0, 30)} className="text-gray-700 leading-relaxed mb-4">{t}</p>)}
    {s.list && (
      <ul className="space-y-3 mb-4">
        {s.list.map((li) => (
          <li key={li} className="flex items-start gap-3">
            <Check size={18} className="text-gold flex-shrink-0 mt-1" />
            <span className="text-gray-700">{li}</span>
          </li>
        ))}
      </ul>
    )}
  </section>
);

const Article = ({ post }) => {
  const { language } = useLanguage();
  const ui = blogUi[language];
  const path = `/blog/${post.slug}`;
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${SITE}/images/kbeauty/${post.image}`,
    datePublished: post.date,
    inLanguage: 'it-IT',
    mainEntityOfPage: `${SITE}${path}`,
    author: { '@type': 'Organization', name: 'Enhancements srl' },
    publisher: { '@type': 'Organization', name: 'Enhancements srl', url: SITE }
  }), [post, path]);
  useSeo({ title: `${post.title} | Enhancements srl`, description: post.description }, path, jsonLd);
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="pt-20" data-testid="blog-post-page">
      <motion.article className="container-luxury section-spacing" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-xs uppercase tracking-wider text-gray-500 hover:text-gold inline-flex items-center gap-2 mb-8" data-testid="blog-back-link">
          <ArrowLeft size={14} /> {ui.back}
        </Link>
        <p className="text-xs uppercase tracking-wider text-gold mb-4">{formatDate(post.date, language)} · {post.readTime} {ui.minutes}</p>
        <h1 className="font-heading text-4xl sm:text-5xl mb-6" data-testid="blog-post-title">{post.title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">{post.description}</p>
        <div className="aspect-[16/9] overflow-hidden bg-[#F4F4F4] mb-12">
          <img src={`/images/kbeauty/${post.image}`} alt={post.title} className="w-full h-full object-cover" />
        </div>
        {post.sections.map((s, i) => <Section key={i} s={s} />)}
        <div className="bg-[#0A0A0A] text-white p-10 mt-12" data-testid="blog-post-cta">
          <h2 className="font-heading text-2xl sm:text-3xl mb-3">{ui.ctaTitle}</h2>
          <p className="text-gray-400 mb-8">{ui.ctaText}</p>
          <Link to="/richiesta-listino" className="btn-primary bg-gold hover:bg-white hover:text-black inline-block" data-testid="blog-post-cta-button">{ui.ctaButton}</Link>
        </div>
        </div>
      </motion.article>
      <section className="section-spacing bg-[#F9F9F9]">
        <div className="container-luxury">
          <h2 className="font-heading text-3xl mb-10">{ui.related}</h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {related.map((p) => <PostCard key={p.slug} post={p} ui={ui} language={language} />)}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;
  return <Article key={post.slug} post={post} />;
}
