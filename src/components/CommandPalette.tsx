import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  FolderOpen,
  User,
  Briefcase,
  Mail,
  Settings,
  LogIn,
  Search,
  ExternalLink,
  Code,
  Palette,
  Shield,
  FileText,
  Award,
  Zap,
  Globe,
  MessageSquare,
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'home',
      title: 'Home',
      description: 'Go to homepage',
      icon: <Home className="w-4 h-4" />,
      action: () => navigate('/'),
      category: 'Navigation',
      keywords: ['main', 'start'],
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'View all projects',
      icon: <FolderOpen className="w-4 h-4" />,
      action: () => navigate('/projects'),
      category: 'Navigation',
      keywords: ['work', 'portfolio'],
    },
    {
      id: 'about',
      title: 'About',
      description: 'Learn about EagerBeaver',
      icon: <User className="w-4 h-4" />,
      action: () => navigate('/about'),
      category: 'Navigation',
      keywords: ['bio', 'info'],
    },
    {
      id: 'services',
      title: 'Services',
      description: 'What I offer',
      icon: <Briefcase className="w-4 h-4" />,
      action: () => navigate('/services'),
      category: 'Navigation',
      keywords: ['hire', 'work'],
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'Technical expertise',
      icon: <Code className="w-4 h-4" />,
      action: () => navigate('/skills'),
      category: 'Navigation',
      keywords: ['tech', 'stack'],
    },
    {
      id: 'experience',
      title: 'Experience',
      description: 'Work history',
      icon: <Award className="w-4 h-4" />,
      action: () => navigate('/experience'),
      category: 'Navigation',
      keywords: ['jobs', 'career'],
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch',
      icon: <Mail className="w-4 h-4" />,
      action: () => navigate('/contact'),
      category: 'Navigation',
      keywords: ['email', 'message'],
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      description: 'Client feedback',
      icon: <MessageSquare className="w-4 h-4" />,
      action: () => navigate('/testimonials'),
      category: 'Navigation',
      keywords: ['reviews', 'clients'],
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Articles & insights',
      icon: <FileText className="w-4 h-4" />,
      action: () => navigate('/blog'),
      category: 'Navigation',
      keywords: ['posts', 'articles'],
    },
    {
      id: 'demos',
      title: 'Live Demos',
      description: 'See projects in action',
      icon: <Globe className="w-4 h-4" />,
      action: () => navigate('/demos'),
      category: 'Navigation',
      keywords: ['live', 'websites'],
    },
    {
      id: 'resume',
      title: 'Resume',
      description: 'Download CV',
      icon: <FileText className="w-4 h-4" />,
      action: () => navigate('/resume'),
      category: 'Navigation',
      keywords: ['cv', 'download'],
    },
    // Actions
    {
      id: 'login',
      title: 'Sign In',
      description: 'Access your account',
      icon: <LogIn className="w-4 h-4" />,
      action: () => navigate('/login'),
      category: 'Actions',
      keywords: ['auth', 'account'],
    },
    {
      id: 'github',
      title: 'View GitHub',
      description: 'Open GitHub profile',
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => window.open('https://github.com/Eager1337', '_blank'),
      category: 'Actions',
      keywords: ['code', 'repos'],
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(search.toLowerCase()) ||
      cmd.keywords?.some((k) => k.toLowerCase().includes(search.toLowerCase()))
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const flatFiltered = Object.values(groupedCommands).flat();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatFiltered[selectedIndex]) {
            flatFiltered[selectedIndex].action();
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, flatFiltered, selectedIndex, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 px-4"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="command-palette overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Commands list */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {Object.entries(groupedCommands).map(([category, items]) => (
                  <div key={category} className="mb-3">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {category}
                    </div>
                    {items.map((item) => {
                      const globalIndex = flatFiltered.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                            globalIndex === selectedIndex
                              ? 'bg-primary/10 text-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                          onClick={() => {
                            item.action();
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <span
                            className={`p-1.5 rounded-md ${
                              globalIndex === selectedIndex ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{item.title}</div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                            )}
                          </div>
                          {globalIndex === selectedIndex && (
                            <kbd className="hidden sm:inline-flex text-xs text-muted-foreground">↵</kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}

                {flatFiltered.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No results found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">↑↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted">↵</kbd>
                  <span>Select</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
