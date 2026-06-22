'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useCallback } from 'react';

interface LightboxGalleryProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxGallery({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxGalleryProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!images.length) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image display */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {(!images[currentIndex]?.src || images[currentIndex].src.includes('placeholder')) ? (
              <div className="w-[80vw] max-w-4xl aspect-video rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-white/70 text-lg">{images[currentIndex]?.alt}</p>
                  <p className="text-white/40 text-sm mt-1">Image {currentIndex + 1} of {images.length}</p>
                </div>
              </div>
            ) : (
              <div className="relative w-[85vw] max-w-4xl aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-white/10">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="object-contain max-h-[80vh] max-w-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-center">
                  <p className="text-white text-sm">{images[currentIndex].alt}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Next image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 text-white/50 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
