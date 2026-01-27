import { motion } from 'framer-motion';
import { FileText, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';

const posts = [
  { id: '1', title: 'Building Fintech Solutions in Africa', excerpt: 'Lessons learned building payment systems for emerging markets.', date: '2024-01-15' },
  { id: '2', title: 'Modern React Patterns', excerpt: 'Best practices for scalable React applications.', date: '2024-01-10' },
  { id: '3', title: 'The Future of Web Development', excerpt: 'Trends and technologies shaping the web.', date: '2024-01-05' },
];

const Blog = () => (
  <Layout>
    <section className="py-20 md:py-32">
      <div className="container-narrow">
        <SectionHeader tag="Blog" title="Articles & Insights" subtitle="Thoughts on development, design, and technology." />
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.article key={post.id} className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><Calendar className="w-4 h-4" />{post.date}</div>
              <h2 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;
