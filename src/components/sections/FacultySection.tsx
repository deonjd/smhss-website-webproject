'use client';

import { motion } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import { getFaculty } from '@/lib/content';

export default function FacultySection() {
  const faculty = getFaculty();

  return (
    <SectionWrapper id="faculty" dark={false}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Our Team
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Faculty
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-300 max-w-2xl mx-auto"
        >
          Dedicated educators shaping the next generation of leaders
        </motion.p>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {faculty.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <GlassCard className="p-6 text-center h-full">
              {/* Avatar placeholder */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-secondary to-primary border-2 border-white/10 flex items-center justify-center overflow-hidden">
                <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-accent text-sm font-medium mb-1">{member.designation}</p>
              <p className="text-slate-400 text-xs mb-2">{member.department}</p>
              <div className="px-3 py-1 rounded-full bg-white/5 inline-block">
                <p className="text-slate-500 text-xs">{member.qualification}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
