'use client';

import { motion } from 'motion/react';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Future: connect to API endpoint
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all duration-300 backdrop-blur-sm';

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClasses}
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClasses}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClasses}
        />
        <input
          type="text"
          placeholder="Subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={inputClasses}
        />
      </div>
      <textarea
        placeholder="Your Message"
        required
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`${inputClasses} resize-none`}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
          submitted
            ? 'bg-accent2 text-white'
            : 'bg-gradient-to-r from-accent to-amber-500 text-primary hover:shadow-lg hover:shadow-accent/25'
        }`}
      >
        {submitted ? '✓ Message Sent!' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
}
