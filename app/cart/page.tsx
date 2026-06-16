'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Lock } from 'lucide-react'
import { useCart } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { SiteFooter } from '@/components/ui/SiteFooter'
import { CartDrawer } from '@/components/cart/CartDrawer'

export default function CartPage() {
  const items = useCart((s) => s.items)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeFromCart = useCart((s) => s.removeFromCart)
  const clearCart = useCart((s) => s.clearCart)
  const subtotal = useCart((s) => s.getSubtotal())
  const itemCount = useCart((s) => s.getItemCount())

  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 99
  const total = subtotal + shipping

  return (
    <>
      <FloatingNav />
      <CartDrawer />
      <main className="pt-24 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow text-text-muted mb-5"
          >
            Your Bag
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-primary"
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              fontWeight: 400,
            }}
          >
            {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? 'item' : 'items'}` : 'Your wardrobe awaits'}
          </motion.h1>

          {items.length === 0 ? (
            <div className="mt-20 max-w-md">
              <p className="text-text-secondary mb-8">
                Your bag is empty. Start exploring the collection to find your next piece.
              </p>
              <Link href="/shop" className="btn-primary inline-flex">
                Shop the Collection
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
              {/* Items */}
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.color}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 rounded-2xl bg-background-alt"
                    >
                      <Link href={`/product/${item.slug}`} className="relative w-24 h-28 md:w-32 md:h-36 rounded-xl overflow-hidden bg-background flex-shrink-0">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        )}
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-base md:text-lg">{item.name}</h3>
                            <p className="text-xs text-text-muted mt-0.5">
                              {item.color} · {item.size}
                            </p>
                            {item.customDesign && (
                              <p className="text-xs text-accent mt-0.5">Custom design</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId, item.color, item.size)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-background transition-colors"
                            aria-label="Remove"
                          >
                            <X className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1 border border-border rounded-full bg-background">
                            <button
                              onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent-light transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" strokeWidth={2} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent-light transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" strokeWidth={2} />
                            </button>
                          </div>
                          <p className="font-semibold text-base">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={clearCart}
                  className="mt-6 text-sm text-text-muted hover:text-text-primary underline transition-colors"
                >
                  Clear bag
                </button>
              </div>

              {/* Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 p-6 rounded-2xl bg-background-alt space-y-4">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-text-muted">
                        Add {formatPrice(1500 - subtotal)} for free shipping
                      </p>
                    )}
                    <div className="h-px bg-border my-3" />
                    <div className="flex justify-between text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <button className="btn-primary w-full">
                    <Lock className="w-3.5 h-3.5" strokeWidth={2} />
                    Secure Checkout
                  </button>
                  <p className="text-xs text-text-muted text-center">
                    Tax included. Shipping calculated at checkout.
                  </p>
                  <div className="pt-2 border-t border-border">
                    <Link
                      href="/shop"
                      className="block text-center text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}