import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import Layout from '@/components/Layout';
import IntroSequence from '@/components/IntroSequence';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { sampleProjects, sampleSkills, profileData } from '@/lib/data';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('hasSeenIntro');
    if (seen) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  const featuredProjects = sampleProjects.filter((p) => p.is_featured).slice(0, 4);
  const topSkills = sampleSkills.slice(0, 8);

  return (
    <>
      {showIntro && !hasSeenIntro && <IntroSequence onComplete={handleIntroComplete} />}

      <Layout>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
            }}
          />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20">
                  Full-stack Developer
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Building{' '}
                <span className="text-gradient">Digital Products</span>
                <br />
                That Matter
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {profileData.bio}
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center justify-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Button asChild size="lg" className="gap-2">
                  <Link to="/projects">
                    View Projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/contact">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="gap-2">
                  <a href="https://github.com/Eager1337" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 md:py-32">
          <div className="container-wide">
            <SectionHeader
              tag="Portfolio"
              title="Featured Projects"
              subtitle="A selection of my best work across fintech, web applications, and more."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/projects">
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-graphite/50">
          <div className="container-wide">
            <SectionHeader
              tag="Expertise"
              title="Technical Skills"
              subtitle="Technologies and tools I work with daily."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/skills">
                  View All Skills
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Live Demos Section */}
        <section className="py-20 md:py-32">
          <div className="container-wide">
            <SectionHeader
              tag="Live"
              title="Projects in Production"
              subtitle="Real applications running in production, serving real users."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleProjects
                .filter((p) => p.live_url && p.demo_type === 'production')
                .slice(0, 6)
                .map((project, index) => (
                  <motion.a
                    key={project.id}
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="status-live" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            Live
                          </span>
                        </div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.a>
                ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/demos">
                  View All Demos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container-narrow">
            <motion.div
              className="relative p-8 md:p-12 rounded-2xl border border-border bg-gradient-to-br from-card to-graphite overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Background glow */}
              <div
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Let's Build Something Great
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Have a project in mind? I'm available for freelance work and collaboration.
                  Let's discuss how we can work together.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/contact">
                      <Mail className="w-4 h-4" />
                      Contact Me
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link to="/services">
                      View Services
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Index;
