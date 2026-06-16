'use client'

import { useState, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { PRODUCTS, COLLECTIONS } from '@/lib/data/products'
import { formatPrice, cn } from '@/lib/utils'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SiteFooter } from '@/components/ui/SiteFooter'
import { ArrowUpRight } from 'lucide-react'

function ShopContent() {
  const searchParams = useSearchParams()
  const collectionParam = searchParams.get('collection')
  const [activeCollection, setActiveCollection] = useState<string | 'all'>(collectionParam || 'all')

  const filteredProducts = useMemo(() => {
    if (activeCollection === 'all') return PRODUCTS
    return PRODUCTS.filter((p) => p.category === activeCollection)
  }, [activeCollection])

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-text-muted mb-5"
          >
            The Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-text-primary"
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              fontWeight: 400,
            }}
          >
            Shop the wardrobe.
          </motion.h1>
        </div>
      </section>

      {/* Collection Filter */}
      <section className="sticky top-24 z-30 bg-background/90 backdrop-blur-md border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-1 py-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCollection('all')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                activeCollection === 'all'
                  ? 'bg-text-primary text-background'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              All ({PRODUCTS.length})
            </button>
            {COLLECTIONS.map((col) => {
              const count = PRODUCTS.filter(p => p.category === col.id).length
              return (
                <button
                  key={col.id}
                  onClick={() => setActiveCollection(col.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                    activeCollection === col.id
                      ? 'bg-text-primary text-background'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {col.name} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link href={`/product/${product.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-background-alt mb-3">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      />
                    </motion.div>
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isNew && <span className="tag text-[10px]">New</span>}
                      {product.isLimited && <span className="tag text-[10px]">Limited</span>}
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-medium text-text-primary text-sm md:text-base mb-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-text-muted mb-1.5">{product.tags[0]}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-text-muted line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default function ShopPage() {
  return (
    <>
      <FloatingNav />
      <CartDrawer />
      <main>
        <Suspense fallback={<div className="min-h-screen pt-32 px-6">Loading...</div>}>
          <ShopContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}