'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const UGC = [
  { id: 1, image: '/images/ugc/friends-laughing.jpg', caption: 'Made with friends', tag: 'fash__trend' },
  { id: 2, image: '/images/editorial/walking-wide.jpg', caption: 'On the move', tag: 'fash__trend' },
  { id: 3, image: '/images/editorial/cafe-portrait.jpg', caption: 'Daily ritual', tag: 'fash__trend' },
  { id: 4, image: '/images/editorial/walk-arch.jpg', caption: 'Worn by the world', tag: 'fash__trend' },
  { id: 5, image: '/images/editorial/urban-lookbook.jpg', caption: 'Streetwear campaign', tag: 'fash__trend' },
  { id: 6, image: '/images/editorial/studio-still.jpg', caption: 'In the studio', tag: 'fash__trend' },
]

export function CommunityAct() {
  return (
    <section id="world" className="relative bg-background-alt py-32 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="eyebrow text-text-muted mb-5"
            >
              Act V · The World
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-text-primary max-w-2xl"
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                fontWeight: 400,
              }}
            >
              The community writes the story.
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            href="https://instagram.com/fash__trend"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-primary hover:text-accent transition-colors group self-start md:self-end"
          >
            <InstagramIcon />
            <span className="font-medium">@fash__trend</span>
          </motion.a>
        </div>

        {/* Editorial grid - asymmetric, magazine-style */}
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          {UGC.map((item, i) => {
            // Asymmetric layout for visual interest
            const layouts = [
              'col-span-12 md:col-span-8 aspect-[16/10]', // wide
              'col-span-6 md:col-span-4 aspect-[4/5]',     // tall
              'col-span-6 md:col-span-4 aspect-[4/5]',     // tall
              'col-span-6 md:col-span-4 aspect-[4/5]',     // tall
              'col-span-12 md:col-span-7 aspect-[16/9]',   // wide
              'col-span-12 md:col-span-5 aspect-[4/3]',    // square-ish
            ]
            return (
              <motion.div
                key={item.id}
                className={layouts[i]}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <Link
                  href="https://instagram.com/fash__trend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative w-full h-full overflow-hidden rounded-2xl bg-background"
                >
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-text-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-background translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[10px] tracking-[0.25em] uppercase font-medium opacity-75 mb-1.5">@{item.tag}</p>
                    <p style={{ fontFamily: 'var(--font-serif), serif', fontSize: '1.25rem', letterSpacing: '-0.02em', fontWeight: 400 }}>
                      {item.caption}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Tag us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-text-secondary text-sm">
            Tag <span className="text-text-primary font-medium">@fash__trend</span> to be featured in the next drop
          </p>
        </motion.div>
      </div>
    </section>
  )
}