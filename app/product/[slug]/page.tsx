'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Truck, RotateCcw, Shield, ArrowUpRight, Check, Minus, Plus } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, PRODUCTS } from '@/lib/data/products'
import { useCart } from '@/lib/store/cart'
import { formatPrice, cn } from '@/lib/utils'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SiteFooter } from '@/components/ui/SiteFooter'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const addToCart = useCart((s) => s.addToCart)
  const addToWishlist = useCart((s) => s.addToWishlist)
  const removeFromWishlist = useCart((s) => s.removeFromWishlist)
  const isInWishlist = useCart((s) => s.isInWishlist(product.id))

  const related = getRelatedProducts(product.id, 4)

  const handleAddToCart = () => {
    if (!selectedSize) return
    setIsAdding(true)
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize,
    }, quantity)
    setTimeout(() => {
      setIsAdding(false)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }, 400)
  }

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <>
      <FloatingNav />
      <CartDrawer />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6">
          <nav className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-text-primary transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-text-primary capitalize">{product.category}</span>
          </nav>
        </div>

        {/* Product */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Image gallery */}
            <div className="lg:col-span-7">
              <div className="sticky top-28 space-y-4">
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-background-alt"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <span className="tag">New</span>}
                    {product.isLimited && <span className="tag">Limited</span>}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="eyebrow text-text-muted mb-3">{product.category}</p>
                <h1
                  className="text-text-primary mb-4"
                  style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                    fontWeight: 400,
                  }}
                >
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-base text-text-muted line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-xs font-semibold text-error">
                        Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Color */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Color</p>
                  <p className="text-xs text-text-muted">{selectedColor.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all',
                        selectedColor.name === color.name
                          ? 'border-text-primary scale-110'
                          : 'border-border hover:border-text-secondary'
                      )}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Size</p>
                  <button className="text-xs text-text-muted hover:text-text-primary underline transition-colors">
                    Size guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'py-3 rounded-xl text-sm font-medium border transition-all',
                        selectedSize === size
                          ? 'border-text-primary bg-text-primary text-background'
                          : 'border-border text-text-primary hover:border-text-secondary'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-text-muted mt-2">Please select a size</p>
                )}
              </div>

              {/* Quantity & Add to cart */}
              <div className="flex gap-3">
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent-light transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent-light transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || isAdding}
                  className={cn(
                    'flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all',
                    added
                      ? 'bg-success text-background'
                      : 'bg-text-primary text-background hover:opacity-90',
                    !selectedSize && 'opacity-40 cursor-not-allowed'
                  )}
                >
                  {isAdding ? (
                    'Adding...'
                  ) : added ? (
                    <>
                      <Check className="w-4 h-4" strokeWidth={2} />
                      Added to bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                      Add to Bag
                    </>
                  )}
                </button>
                <button
                  onClick={handleWishlist}
                  className={cn(
                    'w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors',
                    isInWishlist && 'border-error text-error bg-error/5'
                  )}
                  aria-label="Add to wishlist"
                >
                  <Heart className={cn('w-4 h-4', isInWishlist && 'fill-current')} strokeWidth={1.5} />
                </button>
              </div>

              {/* Customize shortcut */}
              <Link
                href={`/customize?product=${product.id}`}
                className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-text-primary transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm">Make it yours</p>
                  <p className="text-xs text-text-muted">Add custom artwork or text</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
              </Link>

              {/* Details */}
              <div className="h-px bg-border" />

              <div className="space-y-5 text-sm">
                <div>
                  <p className="font-medium mb-2">Story</p>
                  <p className="text-text-secondary leading-relaxed">{product.story}</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Details</p>
                  <ul className="space-y-1.5 text-text-secondary">
                    {product.details.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-1">Fabric</p>
                    <p className="text-text-secondary">{product.fabric}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Fit</p>
                    <p className="text-text-secondary">{product.fit}</p>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  { icon: Truck, label: 'Free shipping' },
                  { icon: RotateCcw, label: '30-day returns' },
                  { icon: Shield, label: 'Secure payment' },
                ].map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center text-center p-3 rounded-xl bg-background-alt">
                    <badge.icon className="w-4 h-4 text-text-secondary mb-1.5" strokeWidth={1.5} />
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider">{badge.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="border-t border-border py-20 md:py-28">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
              <div className="flex items-end justify-between mb-10">
                <h2
                  className="text-text-primary"
                  style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.025em',
                  }}
                >
                  Complete the look
                </h2>
                <Link href="/shop" className="text-sm text-text-primary hover:text-accent transition-colors flex items-center gap-1 group">
                  View all
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/product/${p.slug}`} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-background-alt mb-3">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="25vw"
                        />
                      </div>
                      <h3 className="font-medium text-sm">{p.name}</h3>
                      <p className="text-sm text-text-secondary mt-1">{formatPrice(p.price)}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}