'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/store/cart'
import { Heart, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'
import type { Product } from '@/lib/data/products'

interface ProductRailProps {
  products: Product[]
}

// Calculate scale based on distance from hovered card
function getScaleForDistance(distance: number, hoveredIndex: number | null, cardIndex: number): number {
  if (hoveredIndex === null) return 1
  const d = Math.abs(cardIndex - hoveredIndex)
  if (d === 0) return 1.12
  if (d === 1) return 1.06
  if (d === 2) return 1.03
  return 1
}

interface RailCardProps {
  product: Product
  index: number
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
}

function RailCard({ product, index, hoveredIndex, setHoveredIndex }: RailCardProps) {
  const addToCart = useCart((s) => s.addToCart)
  const addToWishlist = useCart((s) => s.addToWishlist)
  const removeFromWishlist = useCart((s) => s.removeFromWishlist)
  const isInWishlist = useCart((s) => s.isInWishlist(product.id))
  
  const scale = getScaleForDistance(0, hoveredIndex, index)
  const isHovered = hoveredIndex === index
  const isNeighbor = Math.abs((hoveredIndex ?? -10) - index) <= 2 && hoveredIndex !== null

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0].name,
      size: product.sizes[0],
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist) removeFromWishlist(product.id)
    else addToWishlist(product)
  }

  return (
    <motion.div
      className="flex-shrink-0"
      animate={{
        scale,
        y: isHovered ? -12 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 24,
        mass: 0.6,
      }}
      style={{ zIndex: isHovered ? 30 : isNeighbor ? 20 : 1 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <Link
        href={`/product/${product.slug}`}
        className={cn(
          'relative block w-[320px] md:w-[360px] aspect-[3/4] rounded-2xl overflow-hidden bg-background-alt',
          'transition-shadow duration-500',
          isHovered ? 'shadow-2xl shadow-text-primary/30' : 'shadow-lg shadow-text-primary/5'
        )}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="360px"
            priority={index < 4}
          />
        </motion.div>

        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          {product.isNew && <span className="tag text-[10px]">New</span>}
          {product.isLimited && <span className="tag text-[10px]">Limited</span>}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all z-20',
            'bg-background/80 backdrop-blur-md',
            isInWishlist 
              ? 'text-error opacity-100' 
              : isHovered
                ? 'opacity-100 text-text-secondary hover:text-text-primary'
                : 'opacity-0 text-text-secondary'
          )}
          aria-label="Add to wishlist"
        >
          <Heart className={cn('w-4 h-4', isInWishlist && 'fill-current')} strokeWidth={1.5} />
        </button>

        {/* Quick-add - visible on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-4 left-4 right-4 z-20"
            >
              <button
                onClick={handleQuickAdd}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-text-primary text-background font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
                Quick Add
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Product info - below card, also scales with card */}
      <motion.div
        className="mt-4 px-1"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      >
        <h3 className={cn(
          'font-medium text-sm md:text-base transition-colors',
          isHovered ? 'text-text-primary' : 'text-text-primary'
        )}>
          {product.name}
        </h3>
        <p className="text-xs text-text-muted mt-0.5">{product.tags[0]}</p>
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProductRail({ products }: ProductRailProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const scrollPosRef = useRef(0)
  const directionRef = useRef(1)

  // Triplicate for infinite scroll
  const infiniteProducts = [...products, ...products, ...products]

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let lastTime = performance.now()
    const baseSpeed = 0.15 // pixels per ms - very slow, almost subconscious (~50% of 0.3)

    const animate = (currentTime: number) => {
      if (!isPaused && container) {
        const delta = currentTime - lastTime
        const move = baseSpeed * delta * directionRef.current
        scrollPosRef.current += move

        const singleSetWidth = container.scrollWidth / 3
        if (singleSetWidth > 0) {
          if (scrollPosRef.current >= singleSetWidth * 2) {
            scrollPosRef.current = singleSetWidth
          } else if (scrollPosRef.current <= 0) {
            scrollPosRef.current = singleSetWidth
          }
          container.scrollLeft = scrollPosRef.current
        }
      }
      lastTime = currentTime
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Initialize to middle set
    const timer = setTimeout(() => {
      if (container) {
        const singleSetWidth = container.scrollWidth / 3
        if (singleSetWidth > 0) {
          scrollPosRef.current = singleSetWidth
          container.scrollLeft = scrollPosRef.current
        }
      }
    }, 100)

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(timer)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isPaused, products.length])

  return (
    <section id="products" className="relative bg-background py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="eyebrow text-text-muted mb-5"
            >
              Act II · The Wardrobe
            </motion.p>
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
              Shop the collection.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-accent transition-colors group"
            >
              View all
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Rail - clipped container to prevent overflow */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 px-6 md:px-10 py-12 overflow-hidden"
          style={{ scrollbarWidth: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false)
            setHoveredIndex(null)
          }}
        >
          {infiniteProducts.map((product, index) => (
            <RailCard
              key={`${product.id}-${Math.floor(index / products.length)}`}
              product={product}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-30" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-30" />
      </div>
    </section>
  )
}