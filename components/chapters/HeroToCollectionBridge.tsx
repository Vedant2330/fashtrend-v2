'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

export function HeroToCollectionBridge() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="relative bg-background pt-24 pb-12 md:pt-40 md:pb-20 overflow-hidden"
    >
      {/* Floating product images - editorial collage */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-[5%] w-32 h-40 md:w-48 md:h-60 rounded-xl overflow-hidden opacity-30 md:opacity-50"
          style={{ y: y1 }}
        >
          <Image
            src="/images/products/cool-bold.webp"
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-[5%] w-32 h-40 md:w-48 md:h-60 rounded-xl overflow-hidden opacity-30 md:opacity-50"
          style={{ y: y2 }}
        >
          <Image
            src="/images/products/world-cup.webp"
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-[15%] w-24 h-32 md:w-40 md:h-52 rounded-xl overflow-hidden opacity-20 md:opacity-40 hidden md:block"
          style={{ y: y1 }}
        >
          <Image
            src="/images/products/cultural-vibe.webp"
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-3xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="eyebrow text-text-muted mb-5"
        >
          The Wardrobe
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-text-primary"
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 400,
          }}
        >
          Explore the collection.
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
      </motion.div>
    </section>
  )
}