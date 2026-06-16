'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function WorkshopAct() {
  return (
    <section id="workshop" className="relative bg-text-primary text-background py-32 md:py-48 overflow-hidden">
      {/* Decorative grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            className="lg:col-span-6 space-y-8"
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
                fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
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
                'Live 3D preview as you design',
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

          {/* Right: Visual */}
          <motion.div
            className="lg:col-span-6 relative aspect-square"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden bg-background/5">
                <Image
                  src="/images/products/custom-attitude.webp"
                  alt="Custom design"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-background/5">
                <Image
                  src="/images/products/world-cup.webp"
                  alt="Custom design"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-background/5">
                <Image
                  src="/images/products/cultural-vibe.webp"
                  alt="Custom design"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-background/5">
                <Image
                  src="/images/products/cool-bold.webp"
                  alt="Custom design"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
            </div>

            {/* Floating annotation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-background text-text-primary rounded-2xl p-4 shadow-2xl"
            >
              <p className="eyebrow text-text-muted mb-1">Made in</p>
              <p
                className="text-text-primary"
                style={{ fontFamily: 'var(--font-serif), serif', fontSize: '1.5rem', fontWeight: 400 }}
              >
                Pune, India
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}