'use client';

import { motion } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import { getNews } from '@/lib/content';

export default function NewsSection() {
  const news = getNews();
  const featured = news.filter((n) => n.featured);
  const recent = news.filter((n) => !n.featured);

  const categoryColors: Record<string, string> = {
    announcement: 'text-accent bg-accent/10',
    event: 'text-accent2 bg-accent2/10',
    achievement: 'text-purple-400 bg-purple-400/10',
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SectionWrapper id="news" dark={false}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Latest Updates
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          News & Events
        </motion.h2>
      </div>

      {/* Featured News */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${
                    categoryColors[item.category] || 'text-slate-400 bg-white/10'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-slate-500 text-xs">{formatDate(item.date)}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.excerpt}</p>
                <button className="mt-4 text-accent text-sm font-medium hover:text-accent/80 transition-colors">
                  Read More →
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* Recent News */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recent.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="p-5 h-full">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                  categoryColors[item.category] || 'text-slate-400 bg-white/10'
                }`}>
                  {item.category}
                </span>
              </div>
              <h4 className="font-display text-sm font-bold text-white mb-2 line-clamp-2">{item.title}</h4>
              <p className="text-slate-500 text-xs">{formatDate(item.date)}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
