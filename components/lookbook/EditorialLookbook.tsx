'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductLook } from './ProductLook'
import { COLLECTIONS, getFeaturedProducts, PRODUCTS } from '@/lib/data/products'

export function EditorialLookbook() {
  const featured = getFeaturedProducts()
  // Use all products as the lookbook, with the featured ones prioritized
  const lookbookProducts = [
    ...featured,
    ...PRODUCTS.filter(p => !p.featured).slice(0, 4),
  ]

  return (
    <section id="collection" className="relative bg-background py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section opener */}
        <div className="mb-20 md:mb-32 max-w-4xl">
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

        {/* Collections quick access */}
        <div className="mb-32 md:mb-40">
          <div className="flex items-center justify-between mb-8">
            <p className="eyebrow text-text-muted">Explore by Collection</p>
            <Link
              href="/shop"
              className="text-sm text-text-primary hover:text-accent transition-colors flex items-center gap-1 group"
            >
              View all
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {COLLECTIONS.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <Link
                  href={`/shop?collection=${collection.id}`}
                  className="group block relative aspect-[3/4] overflow-hidden rounded-xl bg-background-alt"
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 25vw, 50vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-text-primary/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="text-background font-medium text-base md:text-lg">
                      {collection.name}
                    </p>
                    <p className="text-background/70 text-xs mt-0.5 hidden md:block">
                      {collection.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Editorial product lookbook - alternating layout */}
        <div className="space-y-24 md:space-y-40">
          {lookbookProducts.map((product, index) => (
            <ProductLook key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-32 md:mt-48 text-center"
        >
          <p className="eyebrow text-text-muted mb-5">The full wardrobe</p>
          <h3
            className="text-text-primary mb-8"
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
          >
            Step into the world
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