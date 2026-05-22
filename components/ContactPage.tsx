
import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { 
  ArrowRight, MapPin, Instagram, MessageCircle, 
  Mail, Phone, Send, CheckCircle, ExternalLink 
} from 'lucide-react';

interface ContactPageProps {
  onViewChange: (view: ViewState) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onViewChange }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setIsSubmitted(true), 800);
  };

  const contactCards = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: 'Chat on WhatsApp',
      value: '+91 6393640650',
      buttonText: 'Start Chat',
      link: 'https://wa.me/916393640650',
      color: 'text-green-500 dark:text-green-400',
      bgGlow: 'bg-green-500/20'
    },
    {
      id: 'instagram',
      icon: Instagram,
      title: 'Follow Us on Instagram',
      value: '@pureflowstudios',
      buttonText: 'Visit Profile',
      link: 'https://instagram.com/pureflowstudios',
      color: 'text-pink-500 dark:text-pink-400',
      bgGlow: 'bg-pink-500/20'
    },
    {
      id: 'office',
      icon: MapPin,
      title: 'Visit Our Office',
      value: 'E4/77 Aamrapali Yojna, Near LPS School, Dubagga, Lucknow — 226003',
      buttonText: 'Open in Maps',
      link: 'https://share.google/DxEVxcjWRKFPl8TDA', // Using prompt specific link
      color: 'text-brand dark:text-brand-light',
      bgGlow: 'bg-brand/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0C0C0E] pt-28 pb-20 relative animate-fade-in overflow-hidden transition-colors duration-300">
      
      {/* Ambient Background */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
            Get in Touch with <br />
            <span className="relative inline-block text-gray-900 dark:text-white">
               Pureflow Studios
               <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-70 blur-[2px]" />
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            We’re here to bring your ideas to life. Reach out for collaborations, inquiries, or just to say hello.
          </p>
        </div>

        {/* 2. Contact Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {contactCards.map((card, idx) => (
            <div 
              key={card.id}
              className={`
                group relative bg-white dark:bg-[#141416]/60 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-2xl p-6 sm:rounded-3xl sm:p-8 
                hover:border-gray-300 dark:hover:border-white/10 hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] 
                transition-all duration-500 hover:-translate-y-1 overflow-hidden
                ${idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}
              `}
            >
              {/* Hover Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${card.bgGlow}`} />

              <div className="relative z-10 flex flex-col h-full items-start">
                <div className={`w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <card.icon className={`w-7 h-7 ${card.color}`} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium mb-8 flex-1">
                  {card.value}
                </p>

                <a 
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 group/btn"
                >
                  {card.buttonText}
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Contact Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden shadow-2xl dark:shadow-2xl sm:p-8 md:rounded-[32px] md:p-12">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">Send us a Message</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Fill out the form below and we’ll get back to you within 24 hours.</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-gray-50 dark:bg-[#0C0C0E] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-gray-900 dark:text-white text-sm focus:border-brand focus:ring-1 focus:ring-brand/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                      <input 
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 dark:bg-[#0C0C0E] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-gray-900 dark:text-white text-sm focus:border-brand focus:ring-1 focus:ring-brand/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full bg-gray-50 dark:bg-[#0C0C0E] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-gray-900 dark:text-white text-sm focus:border-brand focus:ring-1 focus:ring-brand/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full bg-gray-50 dark:bg-[#0C0C0E] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-gray-900 dark:text-white text-sm focus:border-brand focus:ring-1 focus:ring-brand/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-brand to-purple-600 hover:from-brand-light hover:to-purple-500 text-white font-bold tracking-wide shadow-lg shadow-brand/25 hover:shadow-brand/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-16 flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    Thank you for reaching out. Our team will review your message and get back to you shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="mt-8 text-sm text-brand hover:text-brand-light font-medium underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
