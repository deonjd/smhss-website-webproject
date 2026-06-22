'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import LightboxGallery from '@/components/ui/LightboxGallery';
import { getGalleryByCategory, type GalleryItem } from '@/lib/content';
import { GALLERY_CATEGORIES } from '@/lib/constants';

// Gradient colors for gallery placeholders
const gradients = [
  'from-blue-900/80 to-indigo-900/80',
  'from-emerald-900/80 to-teal-900/80',
  'from-amber-900/80 to-orange-900/80',
  'from-purple-900/80 to-violet-900/80',
  'from-rose-900/80 to-pink-900/80',
  'from-cyan-900/80 to-sky-900/80',
];

const categoryIcons: Record<string, string> = {
  campus: '🏫',
  events: '🎉',
  sports: '⚽',
  cultural: '🎭',
};

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = getGalleryByCategory(activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  return (
    <SectionWrapper id="gallery" dark={false}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Gallery
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Photo Gallery
        </motion.h2>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {GALLERY_CATEGORIES.map((category) => (
          <motion.button
            key={category.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.value)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeCategory === category.value
                ? 'bg-accent text-primary shadow-lg shadow-accent/20'
                : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Masonry Gallery Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        {filteredItems.map((item: GalleryItem, index: number) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div
              className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${
                gradients[index % gradients.length]
              } ${index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'} group`}
            >
              {(!item.src || item.src.includes('placeholder')) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-4xl mb-3">{categoryIcons[item.category] || '📸'}</div>
                  <p className="text-white/70 font-medium text-sm">{item.alt}</p>
                  <p className="text-white/30 text-xs mt-1 capitalize">{item.category}</p>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.div>
              </div>
              {/* Featured badge */}
              {item.featured && (
                <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-accent/90 text-primary text-xs font-bold">
                  Featured
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <LightboxGallery
        images={filteredItems.map((item) => ({ src: item.src, alt: item.alt }))}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </SectionWrapper>
  );
}
