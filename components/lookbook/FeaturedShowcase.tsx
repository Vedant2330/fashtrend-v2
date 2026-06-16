'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/data/products'
import { formatPrice } from '@/lib/utils'
import { DepthLayers } from '@/components/visual/Floating3D'

export function FeaturedShowcase() {
  const featured = getFeaturedProducts()
  if (featured.length === 0) return null

  const product = featured[0]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1])

  return (
    <section ref={ref} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <DepthLayers />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <Link href={`/product/${product.slug}`} className="block group relative aspect-[5/4] md:aspect-[16/11] rounded-2xl overflow-hidden bg-background-alt">
              <motion.div
                className="absolute inset-0"
                style={{ scale: imageScale }}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Floating annotations */}
              <div className="absolute top-5 left-5 flex flex-col gap-1.5">
                {product.isNew && <span className="tag">New</span>}
                {product.featured && <span className="tag">Featured</span>}
              </div>
            </Link>

            {/* Secondary smaller images - detail shots */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
              {product.images.slice(1, 3).map((img, i) => (
                <motion.div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-background-alt"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} detail ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(min-width: 768px) 30vw, 50vw"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            style={{ y }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div>
              <p className="eyebrow text-text-muted mb-3">Featured · Studio Pick</p>
              <h2
                className="text-text-primary"
                style={{
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                }}
              >
                The Cool & Bold Oversized.
              </h2>
            </div>

            <p className="text-text-secondary leading-relaxed text-lg">
              {product.description}
            </p>

            <p className="text-text-secondary leading-relaxed">
              {product.story}
            </p>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Fabric</p>
                <p className="text-sm text-text-primary">{product.fabric}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Fit</p>
                <p className="text-sm text-text-primary">{product.fit}</p>
              </div>
            </div>

            <ul className="space-y-2">
              {product.details.slice(0, 3).map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" strokeWidth={2} />
                  {d}
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-semibold text-text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <Link
              href={`/product/${product.slug}`}
              className="btn-primary inline-flex mt-2"
            >
              Shop the Piece
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}