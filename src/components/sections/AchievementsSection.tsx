'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import { getAchievements } from '@/lib/content';
import confetti from 'canvas-confetti';
import { Award, Trophy, Star, Sparkles } from 'lucide-react';

const emojiMap: Record<string, string> = {
  award: '🏆',
  trophy: '🏆',
  star: '⭐',
  heart: '❤️',
  brain: '🧠',
  leaf: '🌿',
  music: '🎵',
  cpu: '💻',
};

export default function AchievementsSection() {
  const allAchievements = getAchievements();
  const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'sports' | 'arts' | 'service'>('all');

  // Highlights top 3 achievements as Featured Trophies
  const featuredTrophies = allAchievements.slice(0, 3);
  
  // Filter remaining or all achievements
  const filteredAchievements = allAchievements.filter(ach => {
    if (activeCategory === 'all') return true;
    return ach.category.toLowerCase() === activeCategory;
  });

  const triggerConfetti = (index: number) => {
    const colors = [
      ['#D4A843', '#FFFFFF', '#1E3A5F'], // Gold / White / Navy
      ['#10B981', '#FFFFFF', '#065F46'], // Emerald / White / Dark Green
      ['#3B82F6', '#FFFFFF', '#1E40AF'], // Blue / White / Dark Blue
    ];

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.7 },
      colors: colors[index % colors.length],
    });
  };

  const categories = [
    { value: 'all', label: 'All Pride' },
    { value: 'academic', label: 'Academics' },
    { value: 'sports', label: 'Sports' },
    { value: 'arts', label: 'Arts & Cultural' },
    { value: 'service', label: 'NSS & Service' },
  ] as const;

  return (
    <SectionWrapper id="achievements">
      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Our Pride
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Achievements
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-300 max-w-2xl mx-auto"
        >
          Celebrating our legacy of excellence in regional and national stages
        </motion.p>
      </div>

      {/* 1. FEATURED TROPHY SHOWCASE */}
      <div className="mb-20">
        <h3 className="font-display text-2xl font-bold text-center text-white mb-10 flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-accent" /> Featured Showcases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          {featuredTrophies.map((trophy, idx) => (
            <motion.div
              key={`trophy-${trophy.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => triggerConfetti(idx)}
              className="cursor-pointer"
            >
              <GlassCard
                className="p-8 text-center h-full flex flex-col justify-between relative group border-accent/20"
                glowColor={idx === 0 ? 'rgba(212, 168, 67, 0.25)' : idx === 1 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(59, 130, 246, 0.25)'}
              >
                {/* Glowing Aura */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-accent/5 group-hover:bg-accent/15 blur-2xl transition-all duration-500" />
                
                <div className="space-y-4">
                  <span className="text-4xl block mb-2">{emojiMap[trophy.icon] || '🏆'}</span>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent font-mono text-xs font-semibold">
                    {trophy.year}
                  </span>
                  <h4 className="font-display font-bold text-xl text-white tracking-tight">{trophy.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{trophy.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 text-xs text-accent font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" /> Hover Spark!
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. FILTER BAR */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 px-4 max-w-3xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 cursor-pointer ${
              activeCategory === cat.value
                ? 'bg-accent border-accent text-primary font-bold shadow-lg shadow-accent/20'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. TIMELINE OF ACHIEVEMENTS */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-6 md:pl-10 py-2 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((item, index) => (
              <motion.div
                key={`timeline-item-${item.id}`}
                layout
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="relative group"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0A1628] border-2 border-accent group-hover:bg-accent transition-colors duration-300 shadow-md shadow-accent/30" />

                <GlassCard className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{emojiMap[item.icon] || '🏅'}</span>
                      <h4 className="font-display text-lg font-bold text-white group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 text-xs uppercase font-mono tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-accent font-display font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
