import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
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
  { label: 'Work', section: 'work' },
  { label: 'Services', section: 'services' },
  { label: 'Process', section: 'process' },
  { label: 'About', section: 'about' },
  { label: 'Good Stuff', view: 'blog' },
];

const WHATSAPP_URL = 'https://wa.me/916393640650';

const mobileListVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: {},
};

const mobileItemVariant = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as number[] } },
  exit: { y: 24, opacity: 0, transition: { duration: 0.2 } },
};

export function Navbar({ currentView, onViewChange, onOpenContact: _onOpenContact }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
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

  const goToStartProject = () => {
    setIsOpen(false);
    onViewChange('start-project');
  };

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/75 backdrop-blur-md border-b border-white/[0.08]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full items-center justify-between px-5 sm:px-6 md:h-[76px] md:px-7">
          <button
            onClick={() => onViewChange('home')}
            className="font-display text-[26px] leading-none tracking-[0.01em] text-white select-none transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm sm:text-[30px] md:text-[34px]"
            aria-label="PureFlow Studios - go to home"
          >
            PURE<span className="gradient-flow-text">FLOW</span> STUDIOS
          </button>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[42px] md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className="group relative pb-4 text-[15px] font-medium leading-none text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#ff2f86] via-[#d946ef] to-[#a855f7] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton
              variant="primary"
              onClick={goToStartProject}
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
            className="fixed inset-0 z-[100] flex flex-col bg-black"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div
                className="absolute bottom-[-15%] left-[-15%] h-[480px] w-[480px]"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(255,32,160,0.3) 0%, rgba(255,32,160,0.12) 30%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              <div
                className="absolute bottom-[-15%] right-[-15%] h-[480px] w-[480px]"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(164,82,255,0.3) 0%, rgba(164,82,255,0.12) 30%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
            </div>

            {/* Top bar with logo + close */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/8 px-5 py-5">
              <span className="font-display text-[30px] font-bold leading-none tracking-[0.01em] text-white">
                PURE<span className="gradient-flow-text">FLOW</span> STUDIOS
              </span>
              <button
                className="text-white hover:text-[#D946EF] transition-colors p-2 -mr-2 focus-visible:outline-none focus-visible:text-[#D946EF]"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={28} strokeWidth={1.8} />
              </button>
            </div>

            {/* Menu links */}
            <motion.nav
              variants={prefersReducedMotion ? {} : mobileListVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 flex flex-1 flex-col justify-center gap-1 px-7"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  variants={prefersReducedMotion ? {} : mobileItemVariant}
                  onClick={() => handleNav(item)}
                  className="group flex items-center justify-between border-b border-white/8 py-4 text-left text-white transition-colors hover:text-[#D946EF] focus-visible:outline-none focus-visible:text-[#D946EF]"
                >
                  <span className="font-display text-[2.25rem] font-semibold leading-none tracking-tight">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-all duration-300 group-hover:text-[#D946EF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
              ))}
            </motion.nav>

            {/* Bottom action bar — both buttons stacked, full-width, prominent */}
            <motion.div
              variants={prefersReducedMotion ? {} : mobileItemVariant}
              initial="hidden"
              animate="visible"
              className="relative z-10 flex flex-col gap-3 border-t border-white/8 p-5"
            >
              <button
                onClick={goToStartProject}
                className="flex h-[58px] w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#ff2f86] via-[#d946ef] to-[#a855f7] px-6 text-[17px] font-bold text-white shadow-[0_10px_40px_-8px_rgba(255,47,134,0.55)] transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Start a project
                <ArrowUpRight className="h-5 w-5 flex-shrink-0" strokeWidth={2.5} />
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex h-[58px] w-full items-center justify-center gap-2.5 rounded-2xl border border-white/30 bg-white/[0.08] px-6 text-[17px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/[0.14] hover:border-white/50 active:scale-[0.99]"
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" strokeWidth={2.2} />
                Contact us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
