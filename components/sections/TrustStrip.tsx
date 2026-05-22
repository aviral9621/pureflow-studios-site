import { motion, useReducedMotion } from 'framer-motion';

const CLIENTS = [
  'T.S. Associates',
  'Roadlink Tourism',
  'Farineaux Travels',
  'Strataloom Research',
  'Spectrum Tour Travels',
  'The Himalayan Nest',
  'Herbal Vantage',
  'Quick Hotels',
];

export function TrustStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Client names"
      className="relative overflow-hidden border-y border-white/5 bg-black py-14 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1880px] px-5">
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-display text-[15px] font-semibold uppercase tracking-[0.32em] text-white/70 md:text-[17px] md:tracking-[0.36em]"
        >
          Trusted by ambitious teams across India
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="trust-marquee mt-10 md:mt-12"
          aria-hidden="true"
        >
          <div className="trust-marquee__track">
            {[0, 1].map((set) => (
              <div className="trust-marquee__group" key={set}>
                {CLIENTS.map((client) => (
                  <div
                    key={`${client}-${set}`}
                    className="trust-marquee__item whitespace-nowrap text-center font-display text-[20px] uppercase leading-none tracking-tight text-white md:text-[24px]"
                  >
                    {client}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
