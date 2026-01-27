import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Lock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  slug: string;
  type: 'public' | 'private';
  category: string;
  short_description?: string;
  thumbnail_url?: string;
  live_url?: string;
  github_repo_url?: string;
  demo_type?: 'production' | 'demo' | 'restricted';
  stack?: string[];
  is_featured?: boolean;
  visibility_level: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const isPrivate = project.type === 'private';
  const isFromLeft = index % 2 === 0;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      fintech: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      web: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      mobile: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      internal: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      experimental: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      design: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    };
    return colors[category] || 'bg-muted text-muted-foreground border-border';
  };

  const getDemoTypeIndicator = (type?: string) => {
    switch (type) {
      case 'production':
        return <span className="status-live" title="Live Production" />;
      case 'demo':
        return <span className="status-demo" title="Demo" />;
      case 'restricted':
        return <span className="status-private" title="Restricted Access" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isFromLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to={`/projects/${project.slug}`} className="block group">
        <div className="project-card overflow-hidden">
          {/* Thumbnail */}
          <div className="relative aspect-project overflow-hidden bg-graphite">
            {project.thumbnail_url ? (
              <img
                src={project.thumbnail_url}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-graphite to-graphite-dark">
                <span className="text-4xl font-display font-bold text-muted-foreground/20">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Private overlay */}
            {isPrivate && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Private / NDA</span>
                </div>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <div className="flex items-center gap-3">
                {project.live_url && (
                  <motion.a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-primary text-primary-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
                {project.github_repo_url && !isPrivate && (
                  <motion.a
                    href={project.github_repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-muted text-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
              <motion.div
                className="p-2 rounded-full bg-muted/50 text-foreground"
                whileHover={{ scale: 1.1 }}
              >
                <Eye className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Featured badge */}
            {project.is_featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                {getDemoTypeIndicator(project.demo_type)}
                <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
              </div>
            </div>

            {project.short_description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {project.short_description}
              </p>
            )}

            {/* Stack */}
            {project.stack && project.stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
