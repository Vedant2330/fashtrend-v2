'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/data/products'
import { formatPrice } from '@/lib/utils'

interface ProductLookProps {
  product: Product
  index: number
}

export function ProductLook({ product, index }: ProductLookProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      style={{ opacity }}
    >
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
        {/* Image side */}
        <motion.div
          className={`${isEven ? 'md:col-span-7' : 'md:col-span-7 md:col-start-6'} relative`}
          style={{ y: imageY }}
        >
          <Link
            href={`/product/${product.slug}`}
            className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-background-alt"
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </motion.div>
            
            {/* Tags */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <span className="tag">New</span>}
              {product.isLimited && <span className="tag">Limited</span>}
              {product.featured && !product.isNew && !product.isLimited && (
                <span className="tag">Featured</span>
              )}
            </div>

            {/* Hover arrow */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </div>
          </Link>
        </motion.div>

        {/* Text side */}
        <motion.div
          className={`${isEven ? 'md:col-span-5' : 'md:col-span-5 md:col-start-1 md:row-start-1'} relative px-2 md:px-0`}
          style={{ y: textY }}
        >
          <div className="space-y-5">
            <p className="eyebrow text-text-muted">
              {product.tags[0]} · {product.category}
            </p>
            <h3
              className="text-text-primary"
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                fontWeight: 400,
              }}
            >
              {product.name}
            </h3>
            <p className="text-text-secondary text-base leading-relaxed max-w-md">
              {product.story}
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-semibold tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/product/${product.slug}`} className="btn-primary">
                Discover
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="/customize"
                className="btn-secondary"
              >
                Customize
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}