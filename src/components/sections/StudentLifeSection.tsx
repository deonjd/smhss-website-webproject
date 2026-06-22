'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import { getSiteContent } from '@/lib/content';

const activityIcons: Record<string, string> = {
  users: '👥',
  trophy: '🏆',
  palette: '🎨',
  heart: '❤️',
  compass: '🧭',
  globe: '🌍',
};

export default function StudentLifeSection() {
  const content = getSiteContent();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SectionWrapper id="student-life">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Beyond Academics
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {content.studentLife.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-300 max-w-2xl mx-auto"
        >
          {content.studentLife.subtitle}
        </motion.p>
      </div>

      {/* Activity Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {content.studentLife.activities.map((activity, index) => (
          <motion.button
            key={activity.title}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === index
                ? 'bg-accent text-primary shadow-lg shadow-accent/20'
                : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span>{activityIcons[activity.icon] || '📌'}</span>
            {activity.title}
          </motion.button>
        ))}
      </div>

      {/* Active Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <GlassCard className="p-8 md:p-12">
            <div className="text-center">
              <div className="text-5xl mb-6">
                {activityIcons[content.studentLife.activities[activeTab].icon] || '📌'}
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                {content.studentLife.activities[activeTab].title}
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {content.studentLife.activities[activeTab].description}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      {/* Activity Grid (compact view) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
        {content.studentLife.activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer text-center p-4 rounded-2xl border transition-all duration-300 ${
              activeTab === index
                ? 'border-accent/30 bg-accent/5'
                : 'border-white/5 bg-white/[0.02] hover:bg-white/5'
            }`}
          >
            <div className="text-2xl mb-2">{activityIcons[activity.icon] || '📌'}</div>
            <p className="text-xs font-medium text-slate-300">{activity.title}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
