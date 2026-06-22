'use client';

import { motion } from 'motion/react';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
  isLast?: boolean;
}

export default function TimelineItem({ year, title, description, index, isLast = false }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-center mb-12 last:mb-0"
    >
      {/* Desktop: alternating layout */}
      <div className={`hidden md:flex w-full items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
          <div className="text-accent font-display font-bold text-lg mb-1">{year}</div>
          <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
        {/* Center dot & line */}
        <div className="w-2/12 flex justify-center relative">
          <div className="w-4 h-4 rounded-full bg-accent border-4 border-primary z-10 shadow-lg shadow-accent/30" />
        </div>
        <div className="w-5/12" />
      </div>

      {/* Mobile: left-aligned layout */}
      <div className="flex md:hidden items-start">
        <div className="flex flex-col items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-accent border-2 border-primary z-10 shadow-lg shadow-accent/30" />
          {!isLast && <div className="w-px h-full bg-gradient-to-b from-accent/50 to-transparent mt-1" />}
        </div>
        <div className="flex-1 pb-8">
          <div className="text-accent font-display font-bold text-sm mb-1">{year}</div>
          <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
