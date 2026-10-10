import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'wouter';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key={location}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 0 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex min-h-[100dvh] w-full flex-col pt-20 pb-20 md:pb-0"
    >
      {children}
    </motion.div>
  );
}
