import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Lock, Calendar, Tag, Code } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleProjects } from '@/lib/data';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = sampleProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const isPrivate = project.type === 'private';

  return (
    <Layout>
      <article className="py-12 md:py-20">
        <div className="container-wide">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  {isPrivate && (
                    <Badge variant="outline" className="gap-1">
                      <Lock className="w-3 h-3" />
                      Private
                    </Badge>
                  )}
                  <Badge className="capitalize">{project.category}</Badge>
                  {project.demo_type && (
                    <Badge variant="secondary" className="capitalize">
                      {project.demo_type}
                    </Badge>
                  )}
                </div>

                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                  {project.title}
                </h1>

                <p className="text-lg text-muted-foreground">{project.short_description}</p>
              </motion.div>

              {/* Thumbnail */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative aspect-video rounded-xl overflow-hidden bg-graphite mb-8"
              >
                {project.thumbnail_url ? (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl font-display font-bold text-muted-foreground/20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}

                {isPrivate && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        This project is under NDA. Request access for details.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Case Study (placeholder for role-based content) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <section>
                  <h2 className="font-display text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.short_description} This project showcases modern web development
                    practices including responsive design, performance optimization, and clean
                    architecture.
                  </p>
                </section>

                {!isPrivate && (
                  <>
                    <section>
                      <h2 className="font-display text-2xl font-bold mb-4">The Challenge</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Building a solution that meets both user needs and business requirements
                        while maintaining code quality and scalability.
                      </p>
                    </section>

                    <section>
                      <h2 className="font-display text-2xl font-bold mb-4">The Solution</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        A carefully architected application using modern technologies and best
                        practices to deliver a seamless user experience.
                      </p>
                    </section>
                  </>
                )}

                {isPrivate && (
                  <section className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="font-display text-xl font-bold mb-2">Request Access</h2>
                    <p className="text-muted-foreground mb-4">
                      This project contains proprietary information. To learn more, please sign
                      in with appropriate credentials.
                    </p>
                    <Button asChild>
                      <Link to="/login">Sign In to View Details</Link>
                    </Button>
                  </section>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Actions */}
              <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                {project.live_url && (
                  <Button asChild className="w-full gap-2">
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Live Site
                    </a>
                  </Button>
                )}
                {project.github_repo_url && !isPrivate && (
                  <Button asChild variant="outline" className="w-full gap-2">
                    <a href={project.github_repo_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      View Source
                    </a>
                  </Button>
                )}
              </div>

              {/* Project info */}
              <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                <h3 className="font-semibold">Project Details</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="w-4 h-4" />
                    <span>Category: </span>
                    <span className="text-foreground capitalize">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Status: </span>
                    <span className="text-foreground capitalize">{project.demo_type || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Tech stack */}
              {project.stack && project.stack.length > 0 && (
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-4 h-4" />
                    <h3 className="font-semibold">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
