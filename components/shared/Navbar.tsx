import { useState, useEffect, useRef, RefObject } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { ViewState } from '../../types';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onOpenContact: (title: string, rect: DOMRect) => void;
}

type NavItem =
  | { label: string; view: ViewState }
  | { label: string; section: string };

const navItems: NavItem[] = [
  { label: 'Work', view: 'home' },
  { label: 'Services', section: 'services' },
  { label: 'Process', section: 'process' },
  { label: 'About', section: 'about' },
  { label: 'Journal', section: 'journal' },
];

const mobileListVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: {},
};

const mobileItemVariant = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as number[] } },
  exit: { y: 28, opacity: 0, transition: { duration: 0.2 } },
};

export function Navbar({ currentView, onViewChange, onOpenContact }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const desktopCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!pendingSection || currentView !== 'home') return;

    requestAnimationFrame(() => {
      document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth' });
      setPendingSection(null);
    });
  }, [currentView, pendingSection]);

  const handleNav = (item: NavItem) => {
    if ('view' in item) {
      onViewChange(item.view);
    } else {
      if (currentView !== 'home') {
        setPendingSection(item.section);
        onViewChange('home');
      } else {
        document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const openContact = (ref: RefObject<HTMLDivElement | null>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) onOpenContact('Start a project', rect);
  };

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black' : 'bg-black'
        }`}
      >
        <div className="mx-auto flex h-[76px] w-full items-center justify-between border-t border-[#171717] border-b border-white/[0.08] px-6 md:px-7 lg:px-7">
          <button
            onClick={() => onViewChange('home')}
            className="font-display text-[34px] leading-none tracking-[0.01em] text-white select-none transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
            aria-label="PureFlow Studios - go to home"
          >
            PURE<span className="gradient-flow-text">FLOW</span> STUDIOS
          </button>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[42px] md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className="relative pb-4 text-[15px] font-medium leading-none text-white/90 transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-[18px] after:-translate-x-1/2 after:rounded-full after:bg-[#ff2f86] hover:text-white focus-visible:outline-none focus-visible:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div ref={desktopCtaRef} className="hidden md:block">
            <MagneticButton
              variant="primary"
              onClick={() => openContact(desktopCtaRef)}
              className="flex h-[42px] w-[185px] items-center justify-center gap-3 px-0 text-base font-semibold normal-case text-white shadow-[0_0_40px_rgba(255,47,134,0.5)]"
            >
              Start a project
              <ArrowUpRight className="h-[21px] w-[21px] flex-shrink-0" />
            </MagneticButton>
          </div>

          <button
            className="md:hidden text-white hover:text-[#D946EF] transition-colors p-2 -mr-2 focus-visible:outline-none focus-visible:text-[#D946EF]"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black grain flex flex-col items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <button
              className="absolute top-5 right-5 text-white hover:text-[#D946EF] transition-colors p-2 focus-visible:outline-none focus-visible:text-[#D946EF]"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <motion.nav
              variants={prefersReducedMotion ? {} : mobileListVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-6 md:gap-8"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  variants={prefersReducedMotion ? {} : mobileItemVariant}
                  onClick={() => handleNav(item)}
                  className="font-serif italic text-5xl md:text-6xl text-white hover:text-[#D946EF] transition-colors leading-tight focus-visible:outline-none focus-visible:text-[#D946EF]"
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                variants={prefersReducedMotion ? {} : mobileItemVariant}
                className="mt-4"
              >
                <MagneticButton
                  variant="primary"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => openContact(desktopCtaRef), 300);
                  }}
                  className="flex items-center gap-2"
                >
                  Start a project
                  <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                </MagneticButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
