import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const word1 = 'Synapse';
  const word2 = 'Sentinel';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex min-h-dvh w-full flex-col items-center justify-center gap-5 overflow-hidden bg-background px-4 sm:gap-6 sm:px-6"
        >
          {/* Synapse Sentinel mark from the approved brand asset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="shrink-0"
          >
            <img
              src="/synapse-preloader.png"
              alt="Synapse Sentinel"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24 md:h-28 md:w-28"
            />
          </motion.div>

          {/* Text block */}
          <div className="relative flex max-w-full flex-col items-center pb-3 sm:pb-4">
            {/* "Synapse" line */}
            <div className="flex max-w-full overflow-visible whitespace-nowrap">
              {word1.split('').map((char, i) => (
                <motion.span
                  key={`w1-${i}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.15 + i * 0.045 }}
                  className="font-display text-[clamp(2.75rem,14vw,4.5rem)] leading-[1.08] text-foreground"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* "Sentinel" line */}
            <div className="mt-5 flex max-w-full overflow-visible whitespace-nowrap sm:mt-6">
              {word2.split('').map((char, i) => (
                <motion.span
                  key={`w2-${i}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.55 + i * 0.04 }}
                  className="font-display text-[clamp(2.75rem,14vw,4.5rem)] leading-[1.08] text-foreground"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Growing horizontal line */}
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
              className="absolute bottom-0 left-0 h-[1px] bg-foreground/30"
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="max-w-full px-2 text-center font-sans text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-widest"
          >
            Inteligencia · Seguridad · Autonomía
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
