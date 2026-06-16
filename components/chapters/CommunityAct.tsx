'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const UGC = [
  { id: 1, image: '/images/ugc/modi-meloni.webp', caption: 'Worn by the world' },
  { id: 2, image: '/images/ugc/army-day.webp', caption: 'Pride in every stitch' },
  { id: 3, image: '/images/ugc/customer-1.webp', caption: 'Made with love' },
  { id: 4, image: '/images/ugc/customer-2.webp', caption: 'Family first' },
  { id: 5, image: '/images/ugc/customer-3.webp', caption: 'Corporate culture' },
  { id: 6, image: '/images/ugc/customer-4.webp', caption: 'Custom craft' },
]

export function CommunityAct() {
  return (
    <section id="world" className="relative bg-background-alt py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
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
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </motion.a>
        </div>

        {/* Editorial grid - asymmetric, magazine-style */}
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          {UGC.map((item, i) => {
            // Asymmetric layout
            const layouts = [
              'col-span-12 md:col-span-7 aspect-[16/10]',
              'col-span-6 md:col-span-5 aspect-[4/5]',
              'col-span-6 md:col-span-4 aspect-[4/5]',
              'col-span-12 md:col-span-4 aspect-[4/5]',
              'col-span-6 md:col-span-4 aspect-[4/5]',
              'col-span-6 md:col-span-4 aspect-[4/5]',
            ]
            return (
              <motion.div
                key={item.id}
                className={layouts[i]}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="group relative w-full h-full overflow-hidden rounded-xl bg-background">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Image
                      src={item.image}
                      alt={item.caption}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 50vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-background text-sm font-medium">{item.caption}</p>
                  </div>
                </div>
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
            Tag <span className="text-text-primary font-medium">@fash__trend</span> to be featured
          </p>
        </motion.div>
      </div>
    </section>
  )
}