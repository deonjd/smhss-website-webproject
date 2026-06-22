'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionWrapper({ id, children, className = '', dark = true }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 overflow-hidden ${
        dark ? 'bg-primary text-white' : 'bg-gradient-to-b from-primary to-secondary text-white'
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
