'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { DepthLayers, GradientMesh } from '@/components/visual/Floating3D'

export function HeroToCollectionBridge() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="relative bg-background pt-32 pb-12 md:pt-48 md:pb-24 overflow-hidden"
    >
      <DepthLayers />
      <GradientMesh />

      {/* Floating product images - editorial collage */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[12%] left-[4%] w-32 h-40 md:w-56 md:h-72 rounded-2xl overflow-hidden hidden sm:block shadow-2xl ring-1 ring-text-primary/5"
          style={{ y: y1 }}
        >
          <Image
            src="/images/products/cool-bold-cream.jpg"
            alt="Premium cream tee"
            fill
            className="object-cover"
            sizes="250px"
          />
        </motion.div>
        <motion.div
          className="absolute top-[8%] right-[5%] w-32 h-40 md:w-56 md:h-72 rounded-2xl overflow-hidden hidden sm:block shadow-2xl ring-1 ring-text-primary/5"
          style={{ y: y2 }}
        >
          <Image
            src="/images/products/cool-bold-charcoal.jpg"
            alt="Premium charcoal tee"
            fill
            className="object-cover"
            sizes="250px"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-[10%] left-[15%] w-28 h-36 md:w-44 md:h-56 rounded-2xl overflow-hidden hidden md:block shadow-2xl ring-1 ring-text-primary/5"
          style={{ y: y3 }}
        >
          <Image
            src="/images/products/world-cup.jpg"
            alt="Festival piece"
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] right-[12%] w-28 h-36 md:w-44 md:h-56 rounded-2xl overflow-hidden hidden md:block shadow-2xl ring-1 ring-text-primary/5"
          style={{ y: y1 }}
        >
          <Image
            src="/images/products/custom-attitude.jpg"
            alt="Custom design"
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>
      </div>

      {/* Gradient fade for content readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-background/60 to-background" />

      {/* Content */}
      <motion.div
        className="relative max-w-3xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-3 text-text-muted text-[11px] tracking-[0.25em] uppercase font-medium">
            <span className="w-8 h-px bg-text-muted/40" />
            The Wardrobe
            <span className="w-8 h-px bg-text-muted/40" />
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-text-primary"
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(2.25rem, 5vw, 4rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            fontWeight: 400,
          }}
        >
          A wardrobe, considered.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-text-secondary text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed"
        >
          Hand-crafted pieces, made to last. Every order, a chapter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/shop" className="btn-primary inline-flex">
            Shop the Collection
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}