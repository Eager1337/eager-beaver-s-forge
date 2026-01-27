import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Home,
  FolderOpen,
  User,
  Briefcase,
  Mail,
  Code,
  Award,
  FileText,
  Globe,
  MessageSquare,
  LogIn,
  Github,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: FolderOpen, label: 'Projects', href: '/projects' },
  { icon: User, label: 'About', href: '/about' },
  { icon: Code, label: 'Skills', href: '/skills' },
  { icon: Briefcase, label: 'Services', href: '/services' },
  { icon: Award, label: 'Experience', href: '/experience' },
  { icon: Globe, label: 'Live Demos', href: '/demos' },
  { icon: MessageSquare, label: 'Testimonials', href: '/testimonials' },
  { icon: FileText, label: 'Blog', href: '/blog' },
  { icon: Mail, label: 'Contact', href: '/contact' },
];

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Nav content */}
          <motion.nav
            className="relative h-full pt-20 pb-8 px-6 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-border" />

            {/* Actions */}
            <div className="space-y-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Sign In</span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
              >
                <a
                  href="https://github.com/Eager1337"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">GitHub</span>
                </a>
              </motion.div>
            </div>

            {/* Contact info */}
            <div className="mt-8 p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">Get in touch</p>
              <a href="mailto:ebeaver091@gmail.com" className="block text-sm hover:text-primary transition-colors">
                ebeaver091@gmail.com
              </a>
              <a href="tel:033695803" className="block text-sm hover:text-primary transition-colors">
                033695803
              </a>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
