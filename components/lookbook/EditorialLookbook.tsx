'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { COLLECTIONS, EDITORIAL_LOOKBOOK } from '@/lib/data/products'
import { DepthLayers, FloatingImageStack } from '@/components/visual/Floating3D'

export function EditorialLookbook() {
  return (
    <section id="collection" className="relative bg-background py-32 md:py-40 overflow-hidden">
      <DepthLayers />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section opener */}
        <div className="mb-20 md:mb-28 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="eyebrow text-text-muted mb-6"
          >
            Act III · The Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-text-primary"
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              fontWeight: 400,
            }}
          >
            A wardrobe of intention.
            <br />
            <span className="text-text-muted">Each piece, a chapter.</span>
          </motion.h2>
        </div>

        {/* Collections - premium editorial cards (large + smaller) */}
        <div className="mb-24 md:mb-32">
          <FeaturedCollection />
        </div>

        {/* Smaller collection grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {COLLECTIONS.slice(0, 3).map((collection, i) => (
            <CollectionCard key={collection.id} collection={collection} index={i} />
          ))}
        </div>

        {/* Editorial lookbook section - magazine layout */}
        <div className="mt-24 md:mt-32">
          <div className="mb-12 md:mb-16 flex items-end justify-between gap-6 flex-wrap">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-text-primary"
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                fontWeight: 400,
              }}
            >
              The studio notes.
            </motion.h3>
            <p className="text-text-muted text-sm max-w-md">
              A visual diary of how we make our pieces — from raw cotton to your closet.
            </p>
          </div>

          <EditorialGrid />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-32 md:mt-40 text-center"
        >
          <p className="eyebrow text-text-muted mb-5">Every piece tells a story</p>
          <h3
            className="text-text-primary mb-8"
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
          >
            Ready to start your chapter?
          </h3>
          <Link href="/shop" className="btn-primary inline-flex">
            Shop the Collection
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Featured collection - large editorial card
function FeaturedCollection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1])

  const featured = COLLECTIONS[0]

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center">
      <motion.div
        className="lg:col-span-7"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
      >
        <Link href={`/shop?collection=${featured.id}`} className="block relative aspect-[5/4] md:aspect-[16/10] rounded-2xl overflow-hidden bg-background-alt group">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src={featured.largeImage || featured.image}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-6 left-6 md:top-10 md:left-10 text-background">
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium opacity-80 mb-2">Featured Collection</p>
            <p style={{ fontFamily: 'var(--font-serif), serif', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em', fontWeight: 400 }}>
              {featured.name}
            </p>
          </div>
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <ArrowUpRight className="w-5 h-5 text-text-primary" strokeWidth={1.5} />
          </div>
        </Link>
      </motion.div>
      <motion.div
        className="lg:col-span-5 space-y-6"
        style={{ y }}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div>
          <p className="eyebrow text-text-muted mb-3">{featured.name}</p>
          <h3
            className="text-text-primary"
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
          >
            {featured.description}
          </h3>
        </div>
        <p className="text-text-secondary leading-relaxed">
          Cut from heavyweight 240 GSM cotton with relaxed proportions and refined details — designed to move with you, age beautifully, and become a daily essential.
        </p>
        <ul className="space-y-2 text-sm text-text-secondary pt-2">
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Premium heavyweight cotton
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Twin-needle stitched hems
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Pre-washed for softness
          </li>
        </ul>
        <Link
          href={`/shop?collection=${featured.id}`}
          className="inline-flex items-center gap-2 mt-4 text-text-primary hover:text-accent transition-colors group"
        >
          Explore the collection
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
        </Link>
      </motion.div>
    </div>
  )
}

// Standard collection card
function CollectionCard({ collection, index }: { collection: typeof COLLECTIONS[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link
        href={`/shop?collection=${collection.id}`}
        className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-background-alt"
      >
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-text-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <p className="text-background font-medium text-xl md:text-2xl" style={{ fontFamily: 'var(--font-serif), serif', letterSpacing: '-0.02em', fontWeight: 400 }}>
            {collection.name}
          </p>
          <p className="text-background/70 text-sm mt-1.5">{collection.description}</p>
        </div>
        <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-background/20 backdrop-blur-md border border-background/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <ArrowUpRight className="w-4 h-4 text-background" strokeWidth={1.5} />
        </div>
      </Link>
    </motion.div>
  )
}

// Editorial grid - magazine-style image layout
function EditorialGrid() {
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-5">
      {EDITORIAL_LOOKBOOK.map((item, i) => {
        // Large / medium / small grid layout
        const layouts = [
          'col-span-12 md:col-span-7 row-span-2 aspect-[16/11]', // Large
          'col-span-6 md:col-span-5 aspect-[5/4]', // Small
          'col-span-6 md:col-span-4 aspect-[5/4]', // Small
          'col-span-6 md:col-span-3 aspect-[5/4]', // Small
          'col-span-6 md:col-span-4 aspect-[4/5]', // Medium portrait
          'col-span-6 md:col-span-5 aspect-[5/4]', // Medium
        ]
        return (
          <motion.div
            key={i}
            className={layouts[i]}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
          >
            <div className="group relative w-full h-full overflow-hidden rounded-2xl bg-background-alt">
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-text-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-background translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
              >
                <p className="text-[10px] tracking-[0.25em] uppercase font-medium opacity-75 mb-1.5">{item.title}</p>
                <p style={{ fontFamily: 'var(--font-serif), serif', fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', letterSpacing: '-0.02em', fontWeight: 400 }}>
                  {item.caption}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}