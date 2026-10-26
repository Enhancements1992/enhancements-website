import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeo } from '../hooks/useSeo';
import { blogPosts, blogUi } from '../content/blogPosts';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const formatDate = (d, lang) => new Date(d).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const PostCard = ({ post, ui, language }) => (
  <motion.article variants={fadeInUp} className="group" data-testid={`blog-card-${post.slug}`}>
    <Link to={`/blog/${post.slug}`} className="block">
      <div className="img-zoom-container aspect-[4/3] overflow-hidden bg-[#F4F4F4] mb-5">
        <img src={`/images/kbeauty/${post.image}`} alt={post.title} className="img-zoom w-full h-full object-cover" loading="lazy" />
      </div>
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{formatDate(post.date, language)} · {post.readTime} {ui.minutes}</p>
      <h2 className="font-heading text-xl mb-3 group-hover:text-gold transition-colors">{post.title}</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.description}</p>
      <span className="text-xs uppercase tracking-wider text-gold inline-flex items-center gap-2">
        {ui.read} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  </motion.article>
);

export default function BlogPage() {
  useSeo('blog', '/blog');
  const { language } = useLanguage();
  const ui = blogUi[language];

  return (
    <main className="pt-20" data-testid="blog-page">
      <section className="section-spacing bg-[#F9F9F9]">
        <motion.div className="container-luxury" initial="hidden" animate="visible" variants={fadeInUp}><div className="max-w-3xl">
          <span className="label-style text-gold mb-4 block">{ui.label}</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6" data-testid="blog-h1">{ui.h1}</h1>
          <p className="text-lg text-gray-600">{ui.intro}</p>
          {ui.langNote && <p className="text-sm text-gray-500 mt-4">{ui.langNote}</p>}
        </div></motion.div>
      </section>
      <section className="section-spacing">
        <motion.div
          className="container-luxury grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {blogPosts.map((p) => <PostCard key={p.slug} post={p} ui={ui} language={language} />)}
        </motion.div>
      </section>
    </main>
  );
}
