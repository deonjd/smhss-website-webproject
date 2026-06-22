'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import { getSiteContent } from '@/lib/content';

export default function AdmissionsSection() {
  const content = getSiteContent();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="admissions">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Join Us
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {content.admissions.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-300 max-w-2xl mx-auto"
        >
          {content.admissions.subtitle}
        </motion.p>
      </div>

      {/* Admission Process Timeline */}
      <div className="max-w-4xl mx-auto mb-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold text-center mb-12"
        >
          Admission Process
        </motion.h3>
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {content.admissions.steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                {/* Step number */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="font-display text-2xl font-bold text-accent">{step.step}</span>
                </div>
                <h4 className="font-display font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-amber-500 text-primary font-bold text-lg shadow-lg shadow-accent/20"
        >
          📄 Download Application Form
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const el = document.querySelector('#contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/5"
        >
          📞 Contact Admissions
        </motion.button>
      </motion.div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold text-center mb-8"
        >
          Frequently Asked Questions
        </motion.h3>
        <div className="space-y-3">
          {content.admissions.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="overflow-hidden" hover3D={false}>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    className="text-accent flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
