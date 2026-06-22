'use client';

import { motion } from 'motion/react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import ContactForm from '@/components/ui/ContactForm';
import { getSiteContent } from '@/lib/content';

export default function ContactSection() {
  const content = getSiteContent();

  return (
    <SectionWrapper id="contact" dark={false}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Get in Touch
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {content.contact.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-300 max-w-2xl mx-auto"
        >
          {content.contact.subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info & Map */}
        <div className="space-y-6">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Phone</p>
                    <p className="text-white text-sm font-medium">{content.school.phone}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <GlassCard className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent2/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Email</p>
                    <p className="text-white text-sm font-medium">{content.school.email}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="sm:col-span-2"
            >
              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Address</p>
                    <p className="text-white text-sm font-medium">{content.school.address}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-white/10 h-[280px]"
          >
            <iframe
              src={content.contact.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SMHSS Murickassery Location"
            />
          </motion.div>

          {/* Social Media Links */}
          <div className="flex gap-3">
            {Object.entries(content.contact.socialMedia).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-center text-slate-400 hover:text-accent hover:border-accent/30 transition-all duration-300 text-xs capitalize"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <GlassCard className="p-8" hover3D={false}>
            <h3 className="font-display text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <ContactForm />
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
}
