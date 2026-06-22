'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getSiteContent } from '@/lib/content';

export default function PrincipalSection() {
  const content = getSiteContent();

  return (
    <SectionWrapper id="principal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Principal Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden relative shadow-2xl border border-white/10">
            {content.principal.image ? (
              <Image
                src={content.principal.image}
                alt={content.principal.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-secondary flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-white/30 text-sm">Principal Photo</p>
                </div>
              </div>
            )}
            {/* Subtle bottom shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />
            {/* Decorative border glow */}
            <div className="absolute inset-0 rounded-3xl border border-accent/10 group-hover:border-accent/30 transition-colors duration-500 pointer-events-none" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent/10 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-accent2/10 blur-2xl" />
        </motion.div>

        {/* Principal Message */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            From the Principal&apos;s Desk
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
            Principal&apos;s Message
          </h2>
          <p className="text-accent font-display text-lg mb-8">{content.principal.name}</p>

          {/* Message with styled quote */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 text-6xl text-accent/20 font-serif">&ldquo;</div>
            <div className="space-y-4 text-slate-300 leading-relaxed pl-4 border-l-2 border-accent/20">
              {content.principal.message.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
