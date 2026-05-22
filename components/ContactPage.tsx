import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  Send,
  CheckCircle,
  Linkedin,
} from 'lucide-react';
import { ViewState } from '../types';

interface ContactPageProps {
  onViewChange: (view: ViewState) => void;
}

const EMAIL = 'support@pureflowdesigns.com';
const PHONE_DISPLAY = '+91 63936 40650';
const PHONE_RAW = '+916393640650';
const WHATSAPP_URL = 'https://wa.me/916393640650';

export const ContactPage: React.FC<ContactPageProps> = ({ onViewChange: _onViewChange }) => {
  const reduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 600);
  };

  const channels = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: PHONE_DISPLAY,
      href: WHATSAPP_URL,
      external: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      external: false,
    },
    {
      icon: Phone,
      label: 'Call',
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_RAW}`,
      external: false,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@pureflowstudios',
      href: 'https://instagram.com/pureflowstudios',
      external: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Pureflow Studios',
      href: 'https://www.linkedin.com/company/pureflow-studios',
      external: true,
    },
    {
      icon: MapPin,
      label: 'Visit',
      value: 'Lucknow, Uttar Pradesh',
      href: 'https://maps.google.com/?q=Lucknow,Uttar+Pradesh',
      external: true,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Ambient bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-brand/[0.07] rounded-full blur-[140px]" />
        <div
          className="absolute bottom-[-15%] left-[-10%] h-[500px] w-[500px]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,32,160,0.18), transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-10%] h-[500px] w-[500px]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(164,82,255,0.18), transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-24 pb-20 sm:px-6 sm:pt-28 lg:px-10 lg:pt-32 lg:pb-24">
        {/* ── Header ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-serif italic text-white/95 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1] tracking-normal">
            Let's start
          </span>
          <span
            className="hero-automation-text mt-1 inline-block leading-none text-[clamp(2.5rem,5.6vw,5rem)]"
            data-text="A CONVERSATION."
          >
            A CONVERSATION.
          </span>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-base">
            Tell us about your project. We respond within 24 hours — no sales theatre,
            no slide decks, no chasing.
          </p>
        </motion.div>

        {/* ── Channels grid ── */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#08060d] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff3f8d]/45 sm:p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/85 bg-black text-white sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.9} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                  {c.label}
                </p>
                <p className="mt-1 break-all text-[13px] font-semibold text-white sm:text-[14px]">
                  {c.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* ── Form ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#08060d]/80 backdrop-blur sm:mt-16"
        >
          <div className="grid lg:grid-cols-[1fr_1fr]">
            {/* Left — pitch */}
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="gradient-flow-text text-[10px] font-bold uppercase tracking-[0.22em]">
                Send a brief
              </p>
              <h2 className="mt-4 font-sans text-[1.7rem] font-semibold leading-[1.15] tracking-[-0.015em] text-white sm:text-[2rem]">
                What gets a written reply.
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
                The clearer your brief, the faster we can scope it. Mention:
              </p>
              <ul className="mt-5 space-y-3 text-[13.5px] text-white/70 sm:text-sm">
                {[
                  'What you’re trying to build or fix',
                  'Roughly when you’d like it live',
                  'Any reference apps or sites you like',
                  'Your budget range (so we don’t waste your time)',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ff3f8d]" strokeWidth={1.8} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="p-6 sm:p-8 lg:p-10">
              {!submitted ? (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <Field
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                    />
                  </div>
                  <Field
                    label="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                  <Field
                    label="What are you building?"
                    type="textarea"
                    required
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                  />

                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff2f86] via-[#d946ef] to-[#a855f7] text-[14px] font-bold text-white shadow-[0_10px_40px_-12px_rgba(255,47,134,0.55)] transition-all hover:scale-[1.01] active:scale-[0.99] sm:h-14 sm:text-[15px]"
                  >
                    Send brief
                    <Send className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[11px] text-white/40">
                    Or message us on{' '}
                    <a href={WHATSAPP_URL} className="text-white/70 underline-offset-2 hover:text-white hover:underline" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>{' '}
                    for a faster reply.
                  </p>
                </form>
              ) : (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#ff3f8d]/40 bg-[#ff3f8d]/10">
                    <CheckCircle className="h-7 w-7 text-[#ff3f8d]" strokeWidth={2} />
                  </div>
                  <h3 className="font-sans text-xl font-semibold text-white">Brief received.</h3>
                  <p className="mt-2 max-w-xs text-[14px] text-white/60">
                    We'll get back to you within 24 hours at the email you provided.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-white/80 hover:text-white"
                  >
                    Or message us now <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

// ─── Field component ─────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, type, value, onChange, required }) => {
  const common =
    'peer w-full rounded-xl border border-white/15 bg-black/40 px-4 pb-2.5 pt-5 text-[14px] text-white placeholder-transparent transition-colors duration-200 focus:border-[#ff3f8d]/60 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#ff3f8d]/20 sm:text-[15px]';

  return (
    <label className="relative block">
      {type === 'textarea' ? (
        <textarea
          required={required}
          placeholder={label}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${common} resize-none`}
        />
      ) : (
        <input
          type={type}
          required={required}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={common}
        />
      )}
      <span className="pointer-events-none absolute left-4 top-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
        {label}
        {required && <span className="ml-0.5 text-[#ff3f8d]">*</span>}
      </span>
    </label>
  );
};
