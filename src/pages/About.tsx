import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Mail, Phone, Github, Linkedin, Globe } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { profileData } from '@/lib/data';

const About = () => {
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Happy Clients', value: '30+' },
  ];

  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image / Avatar */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-graphite to-graphite-dark border border-border">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-9xl font-display font-bold text-gradient">EB</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary opacity-50" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20">
                About Me
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                {profileData.name}
              </h1>
              <p className="text-xl text-primary mb-4">{profileData.role}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{profileData.bio}</p>

              {/* Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span>{profileData.education}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href={`mailto:${profileData.email}`} className="hover:text-primary transition-colors">
                    {profileData.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href={`tel:${profileData.phone}`} className="hover:text-primary transition-colors">
                    {profileData.phone}
                  </a>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                  <a href={profileData.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <a href="mailto:ebeaver091@gmail.com">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="p-6 rounded-xl border border-border bg-card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="font-display text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-graphite/50">
        <div className="container-narrow">
          <SectionHeader
            tag="Journey"
            title="My Story"
            subtitle="From curiosity to building production systems"
          />

          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground leading-relaxed">
              My journey into technology began with a simple curiosity about how digital
              products work. What started as tinkering with code quickly evolved into a
              passion for building systems that solve real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, I specialize in full-stack development with a focus on fintech
              solutions and web applications. I believe in writing clean, maintainable
              code and creating user experiences that feel intuitive and effortless.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond coding, I'm passionate about video editing, animation, and
              cybersecurity. These diverse skills allow me to approach problems from
              multiple angles and deliver comprehensive solutions.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
