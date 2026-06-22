'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { getSiteContent } from '@/lib/content';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

// Dynamically import 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary" />
  ),
});

export default function HeroSection() {
  const content = getSiteContent();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* 3D Background Scene */}
      <HeroScene />

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-primary/40 z-[1]" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        {/* School Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase backdrop-blur-sm">
            Est. {content.school.established}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
            {content.hero.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {content.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 168, 67, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#about')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-amber-500 text-primary font-bold text-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow duration-300"
          >
            {content.hero.ctaPrimary}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#admissions')}
            className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/5 hover:border-white/30 transition-all duration-300"
          >
            {content.hero.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <AnimatedCounter end={content.stats.students} suffix="+" label="Students" />
          <AnimatedCounter end={content.stats.teachers} suffix="+" label="Teachers" />
          <AnimatedCounter end={content.stats.achievements} suffix="+" label="Achievements" />
          <AnimatedCounter end={content.stats.yearsOfExcellence} suffix="+" label="Years of Excellence" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
