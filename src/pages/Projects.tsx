import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { sampleProjects } from '@/lib/data';

const categories = ['all', 'fintech', 'web', 'mobile', 'internal', 'experimental', 'design'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPrivate, setShowPrivate] = useState(false);

  const filteredProjects = sampleProjects.filter((project) => {
    const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
    const visibilityMatch = showPrivate || project.type !== 'private';
    return categoryMatch && visibilityMatch;
  });

  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <SectionHeader
            tag="Portfolio"
            title="All Projects"
            subtitle="Explore my complete portfolio of web applications, fintech solutions, and more."
          />

          {/* Filters */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
