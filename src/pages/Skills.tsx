import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { sampleSkills } from '@/lib/data';

const Skills = () => {
  // Group skills by category
  const groupedSkills = sampleSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof sampleSkills>);

  const categoryOrder = [
    'Frontend',
    'Backend',
    'Languages',
    'Database',
    'Cloud',
    'DevOps',
    'Tools',
    'Design',
    'Video',
    'Animation',
    'Security',
  ];

  const sortedCategories = Object.keys(groupedSkills).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <SectionHeader
            tag="Expertise"
            title="Technical Skills"
            subtitle="A comprehensive overview of my technical capabilities and proficiencies."
          />

          <div className="space-y-12">
            {sortedCategories.map((category, catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="font-display text-xl font-semibold mb-6 text-primary">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedSkills[category].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Skills;
