'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import TimelineItem from '@/components/ui/TimelineItem';
import { getSiteContent } from '@/lib/content';

export default function AboutSection() {
  const content = getSiteContent();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <SectionWrapper id="about" dark={false}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Our Story
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {content.about.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          {content.about.description}
        </motion.p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-8 h-full" glowColor="rgba(212, 168, 67, 0.15)">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-slate-300 leading-relaxed">{content.about.mission}</p>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-8 h-full" glowColor="rgba(16, 185, 129, 0.15)">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent2/20 to-accent2/5 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-accent2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-slate-300 leading-relaxed">{content.about.vision}</p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="max-w-4xl mx-auto relative px-4 md:px-0">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-bold text-center mb-16"
        >
          Our Journey
        </motion.h3>

        {/* Continuous dynamic center line for desktop */}
        <div className="absolute left-1/2 top-24 bottom-4 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block">
          <motion.div
            style={{ scaleY }}
            className="w-full h-full bg-gradient-to-b from-accent via-accent2 to-transparent origin-top"
          />
        </div>

        <div className="relative z-10 space-y-1">
          {content.about.timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              title={item.title}
              description={item.description}
              index={index}
              isLast={index === content.about.timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
