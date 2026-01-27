import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tag?: string;
}

const SectionHeader = ({ title, subtitle, align = 'center', tag }: SectionHeaderProps) => {
  return (
    <motion.div
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {tag && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20">
          {tag}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <motion.div
        className={`mt-6 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
};

export default SectionHeader;
