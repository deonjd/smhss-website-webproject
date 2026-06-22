'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';

/* Campus building data */
const buildings = [
  { id: 'main', name: 'Main Building', description: 'Administrative offices and classrooms', x: 45, y: 35, icon: '🏫' },
  { id: 'science', name: 'Science Block', description: 'Physics, Chemistry, and Biology laboratories', x: 25, y: 45, icon: '🔬' },
  { id: 'library', name: 'Library', description: 'Knowledge center with 15,000+ books', x: 68, y: 30, icon: '📚' },
  { id: 'sports', name: 'Sports Complex', description: 'Playground, courts, and athletics track', x: 72, y: 60, icon: '⚽' },
  { id: 'auditorium', name: 'Auditorium', description: 'Cultural events and assemblies', x: 35, y: 65, icon: '🎭' },
  { id: 'computer', name: 'Computer Lab', description: 'Modern IT infrastructure', x: 55, y: 55, icon: '💻' },
  { id: 'canteen', name: 'Canteen', description: 'Student dining and refreshments', x: 80, y: 45, icon: '🍽️' },
];

export default function VirtualCampusSection() {
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);

  return (
    <SectionWrapper id="virtual-campus">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Explore
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Virtual Campus
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-300 max-w-2xl mx-auto"
        >
          Explore our campus facilities — click on markers to learn more
        </motion.p>
      </div>

      {/* Interactive Campus Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-secondary/50 via-primary to-secondary/30"
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Campus label */}
        <div className="absolute top-6 left-6 font-display text-white/20 text-xl font-bold tracking-wider">
          SMHSS CAMPUS MAP
        </div>

        {/* Building Markers */}
        {buildings.map((building) => (
          <motion.div
            key={building.id}
            className="absolute cursor-pointer"
            style={{ left: `${building.x}%`, top: `${building.y}%`, transform: 'translate(-50%, -50%)' }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveBuilding(activeBuilding === building.id ? null : building.id)}
          >
            {/* Pulse ring */}
            <div className="absolute inset-0 w-12 h-12 -m-3">
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
            </div>

            {/* Marker */}
            <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 ${
              activeBuilding === building.id
                ? 'bg-accent shadow-lg shadow-accent/30 scale-110'
                : 'bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20'
            }`}>
              {building.icon}
            </div>

            {/* Tooltip */}
            {activeBuilding === building.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-primary/90 backdrop-blur-xl border border-white/10 z-20"
              >
                <h4 className="font-display font-bold text-white text-sm mb-1">{building.name}</h4>
                <p className="text-slate-400 text-xs">{building.description}</p>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Future 360° tour badge */}
        <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="text-xs text-slate-400">🔮 360° Tour — Coming Soon</span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
