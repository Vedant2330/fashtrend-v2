'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

export function WorkshopAct() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="workshop" ref={ref} className="relative bg-text-primary text-background py-32 md:py-40 overflow-hidden">
      {/* Decorative grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />

      {/* Atmospheric glow */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(123,107,90,0.10) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="eyebrow text-background/50">Act IV · The Workshop</p>
            <h2
              className="text-background"
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
                fontWeight: 400,
              }}
            >
              Make it
              <br />
              <span className="italic text-background/70">truly yours.</span>
            </h2>
            <p className="text-background/70 text-lg leading-relaxed max-w-md">
              Your design. Our craft. From sketch to stitch — premium custom apparel, made in our Pune studio, shipped to your door.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                'Upload artwork or add custom text',
                'Live preview as you design',
                'Choose your placement and color',
                'Bulk pricing for orders of 10+',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-background/80 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-background/40" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                href="/customize"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-background text-text-primary font-semibold text-sm hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                Start Customizing
              </Link>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-background/30 text-background font-medium text-sm hover:bg-background/10 transition-colors"
              >
                Visit the Studio
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>

          {/* Right: Featured image */}
          <motion.div
            className="lg:col-span-7 relative"
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/editorial/studio-still.jpg"
                alt="The Workshop"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/40 to-transparent" />
            </div>

            {/* Floating secondary images */}
            <motion.div
              className="absolute -bottom-8 -left-4 md:-bottom-12 md:-left-12 w-32 h-40 md:w-48 md:h-60 rounded-xl overflow-hidden shadow-2xl ring-1 ring-background/10"
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Image
                src="/images/detail/collar-stitching.jpg"
                alt="Stitching detail"
                fill
                className="object-cover"
                sizes="200px"
              />
            </motion.div>

            {/* Floating annotation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-background text-text-primary rounded-2xl p-4 md:p-5 shadow-2xl max-w-[200px]"
            >
              <p className="eyebrow text-text-muted mb-1">Crafted in</p>
              <p
                className="text-text-primary"
                style={{ fontFamily: 'var(--font-serif), serif', fontSize: '1.5rem', fontWeight: 400 }}
              >
                Pune, India
              </p>
              <p className="text-text-muted text-xs mt-1">Hand-finished in our studio</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}