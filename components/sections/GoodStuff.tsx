import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { POSTS } from '../../lib/blog';
import { ViewState } from '../../types';

interface GoodStuffProps {
  onViewChange: (view: ViewState) => void;
  onOpenPost: (slug: string) => void;
}

export function GoodStuff({ onViewChange, onOpenPost }: GoodStuffProps) {
  const reduced = useReducedMotion();
  const featured = POSTS.slice(0, 2);

  return (
    <section
      id="good-stuff"
      className="relative overflow-hidden bg-black py-16 md:py-20"
      aria-label="Good Stuff — featured articles"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-pink-600/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          className="mb-10 flex flex-col items-center text-center md:mb-14"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-serif italic text-white/95 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1] tracking-normal">
            Some
          </span>
          <span
            className="hero-automation-text mt-1 inline-block leading-none text-[clamp(2.5rem,5.6vw,5rem)]"
            data-text="GOOD STUFF."
          >
            GOOD STUFF.
          </span>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/55 sm:text-base">
            Field notes on AI, automation, and the boring software that quietly runs growing businesses.
          </p>
        </motion.div>

        {/* Blog grid (featured) */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-7">
          {featured.map((post, i) => (
            <motion.button
              key={post.slug}
              type="button"
              onClick={() => onOpenPost(post.slug)}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#08060d] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#ff3f8d]/45 sm:rounded-3xl"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md sm:top-4 sm:left-4">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-white/40">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mt-3 font-sans text-[1.15rem] font-semibold leading-[1.25] tracking-[-0.015em] text-white sm:text-[1.3rem] md:text-[1.4rem]">
                  {post.title}
                </h3>

                <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60 sm:text-[14.5px]">
                  {post.excerpt}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 self-start text-[12px] font-semibold text-white/80 transition-colors duration-200 group-hover:text-white sm:text-[13px]">
                  Read article
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mt-9 flex justify-center"
        >
          <button
            onClick={() => onViewChange('blog')}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 text-[13px] font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 sm:h-14 sm:px-8 sm:text-[14px]"
          >
            See all articles
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
