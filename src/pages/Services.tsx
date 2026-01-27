import { motion } from 'framer-motion';
import { Code, CreditCard, Palette, Video, Smartphone, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { sampleServices } from '@/lib/data';

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-6 h-6" />,
  wallet: <CreditCard className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
  video: <Video className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
};

const Services = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <SectionHeader
            tag="Services"
            title="What I Offer"
            subtitle="Comprehensive development and design services to bring your ideas to life."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {iconMap[service.icon] || <Code className="w-6 h-6" />}
                </div>

                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-4">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-6">
              Interested in working together? Let's discuss your project.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
