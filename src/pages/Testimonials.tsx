import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';

const testimonials = [
  { id: '1', name: 'John D.', role: 'CEO', company: 'TechStart', content: 'EagerBeaver delivered exceptional work on our fintech platform. Professional and skilled.', rating: 5 },
  { id: '2', name: 'Sarah M.', role: 'Founder', company: 'HealthSL', content: 'Great communication and technical expertise. Our healthcare app exceeded expectations.', rating: 5 },
  { id: '3', name: 'Michael O.', role: 'CTO', company: 'PayFlow', content: 'Highly recommend for any web development project. Quality work delivered on time.', rating: 5 },
];

const Testimonials = () => (
  <Layout>
    <section className="py-20 md:py-32">
      <div className="container-wide">
        <SectionHeader tag="Reviews" title="Testimonials" subtitle="What clients say about working with me." />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} className="p-6 rounded-xl border border-border bg-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-muted-foreground mb-4">"{t.content}"</p>
              <div className="flex items-center gap-1 mb-3">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}</div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}, {t.company}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Testimonials;
