import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Github, Twitter, MessageCircle, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { ViewState } from '../types';

interface FooterProps {
  onViewChange?: (view: ViewState) => void;
}

const Wordmark = ({ className = '' }: { className?: string }) => (
  <span className={`font-display font-bold tracking-tighter ${className}`}>
    Pure <span className="gradient-text">Flow</span> Studios
  </span>
);

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const handleNav = (view: ViewState) => {
    if (onViewChange) {
      onViewChange(view);
      window.scrollTo(0, 0);
    }
  };

  const services = [
    { label: 'Custom Software', action: () => handleNav('service-software') },
    { label: 'CRMs & Dashboards', action: () => handleNav('get-software-built') },
    { label: 'AI Agents', action: () => handleNav('automation-video') },
    { label: 'Websites', action: () => handleNav('service-website') },
    { label: 'Mobile Apps', action: () => handleNav('service-mobile') },
    { label: 'Brand & Content', action: () => handleNav('service-social') },
  ];

  const studio = [
    { label: 'Work', action: () => handleNav('home') },
    { label: 'Process', action: () => handleNav('home') },
    { label: 'About', action: () => handleNav('home') },
    { label: 'Journal', action: () => {} },
    { label: 'Careers', action: () => {} },
  ];

  const socials = [
    { icon: Instagram, href: 'https://instagram.com/pureflowstudios', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'X / Twitter' },
  ];

  return (
    <footer className="relative bg-[var(--color-bg-elevated)] border-t border-white/5">

      {/* Giant watermark wordmark */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <p
            className="font-display font-bold leading-none tracking-[0.05em] text-white select-none"
            style={{ fontSize: 'clamp(4rem, 15vw, 15rem)' }}
          >
            Pure <span className="gradient-text">Flow</span> Studios
          </p>
        </motion.div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Col 1 — About (col-span-2) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Wordmark className="text-2xl" />
            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
              A software and design studio in Lucknow, India. We build CRMs, automations, AI agents,
              and websites for businesses ready to scale.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-pink-500/40 hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Services</p>
            <ul className="space-y-3">
              {services.map(({ label, action }) => (
                <li key={label}>
                  <button
                    onClick={action}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Studio */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Studio</p>
            <ul className="space-y-3">
              {studio.map(({ label, action }) => (
                <li key={label}>
                  <button
                    onClick={action}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@pureflowstudios.com"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  hello@pureflowstudios.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                Lucknow, Uttar Pradesh
              </li>
              <li>
                <a
                  href="https://wa.me/916393640650"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  WhatsApp <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/pureflowstudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  Schedule a call <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">© 2026 PureFlow Studios. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((label) => (
              <a key={label} href="#" className="text-xs text-white/40 hover:text-white transition-colors duration-200">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-white text-center pb-6 italic">
        &quot;Designed and built in Lucknow with too much chai. &#127861;&quot;
      </p>

    </footer>
  );
};
