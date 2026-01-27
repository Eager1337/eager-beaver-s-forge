import { motion } from 'framer-motion';
import { ExternalLink, Globe } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Badge } from '@/components/ui/badge';
import { sampleProjects } from '@/lib/data';

const Demos = () => {
  const liveProjects = sampleProjects.filter(
    (p) => p.live_url && p.type !== 'private'
  );

  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <SectionHeader
            tag="Live"
            title="Live Demos"
            subtitle="Experience my projects in action. All these applications are running in production."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="status-live" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Live
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.short_description}
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="capitalize">
                    {project.category}
                  </Badge>
                  {project.demo_type && (
                    <Badge variant="outline" className="capitalize">
                      {project.demo_type}
                    </Badge>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Demos;
