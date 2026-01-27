import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [phase, setPhase] = useState(0);
  const name = "EagerBeaver";
  const role = "Full-stack Developer / Product Builder";

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),    // Start name animation
      setTimeout(() => setPhase(2), 2000),   // Show role
      setTimeout(() => setPhase(3), 3500),   // Show scroll cue
      setTimeout(() => setPhase(4), 5000),   // Fade out
      setTimeout(() => onComplete(), 5800),  // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-pattern opacity-20" />
          
          {/* Animated gradient orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Name assembly */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex overflow-hidden">
              {name.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
                  initial={{ y: 100, opacity: 0 }}
                  animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Role text */}
            <motion.p
              className="mt-6 text-lg md:text-xl text-muted-foreground font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {role}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="mt-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={phase >= 2 ? { width: 200, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />

            {/* Scroll indicator */}
            <motion.div
              className="absolute -bottom-32 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Scroll to explore
              </span>
              <motion.div
                className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-2 rounded-full bg-primary"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l border-t border-muted-foreground/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-muted-foreground/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSequence;
