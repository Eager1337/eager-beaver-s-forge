import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';

const experiences = [
  {
    id: '1',
    title: 'Full-Stack Developer',
    company: 'Freelance',
    location: 'Remote',
    period: '2022 - Present',
    description:
      'Building production-grade web applications and fintech solutions for clients across Africa. Specializing in React, Node.js, and modern cloud infrastructure.',
    achievements: [
      'Delivered 20+ successful projects',
      'Built payment systems processing thousands of transactions',
      'Implemented secure authentication systems',
      'Optimized application performance by 40%',
    ],
  },
  {
    id: '2',
    title: 'Product Builder',
    company: 'Personal Projects',
    location: 'Freetown, Sierra Leone',
    period: '2021 - Present',
    description:
      'Creating innovative digital products focused on solving local problems. From fintech to healthcare, building solutions that matter.',
    achievements: [
      'Launched 10+ live web applications',
      'Built SalonePay payment platform',
      'Created healthcare information system',
      'Developed skills training platform',
    ],
  },
  {
    id: '3',
    title: 'Student',
    company: 'Limkokwing University',
    location: 'Freetown, Sierra Leone',
    period: '2019 - 2023',
    description:
      'Studied Information Technology with focus on software development, web technologies, and system design.',
    achievements: [
      'Completed degree in Information Technology',
      'Led multiple group projects',
      'Built university website redesign',
      'Self-taught advanced web development',
    ],
  },
];

const Experience = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container-narrow">
          <SectionHeader
            tag="Career"
            title="Experience"
            subtitle="My professional journey in technology and product development."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative pl-8 md:pl-0 pb-12 last:pb-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-1/2'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary border-4 border-background md:-translate-x-1/2`}
                />

                <div
                  className={`p-6 rounded-xl border border-border bg-card ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm text-primary mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-1">{exp.title}</h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4 text-left">{exp.description}</p>

                  <ul className="space-y-2 text-left">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
