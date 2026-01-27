import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import CommandPalette from './CommandPalette';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background noise">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass">
        <div className="container-wide flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="/"
            className="font-display text-lg font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-foreground">Eager</span>
            <span className="text-primary">Beaver</span>
          </motion.a>

          {/* Desktop: Command palette trigger */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Command Menu</span>
              <kbd className="ml-2 px-1.5 py-0.5 rounded border border-border bg-background text-xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile: Menu button */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-foreground">EagerBeaver</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:ebeaver091@gmail.com" className="hover:text-foreground transition-colors">
                ebeaver091@gmail.com
              </a>
              <span className="text-border">|</span>
              <a href="tel:033695803" className="hover:text-foreground transition-colors">
                033695803
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating command button (mobile) */}
      <motion.button
        onClick={() => setCommandPaletteOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Command className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default Layout;
