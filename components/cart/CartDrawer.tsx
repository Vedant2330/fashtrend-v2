'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/store/cart'
import { formatPrice, cn } from '@/lib/utils'

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen)
  const closeCart = useCart((s) => s.closeCart)
  const items = useCart((s) => s.items)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeFromCart = useCart((s) => s.removeFromCart)
  const subtotal = useCart((s) => s.getSubtotal())
  const itemCount = useCart((s) => s.getItemCount())

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-text-primary/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-background border-l border-border flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <h2 id="cart-title" className="text-base font-semibold">
                  Your Bag
                </h2>
                <span className="text-text-muted text-sm">({itemCount})</span>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent-light transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent-light/50 flex items-center justify-center mb-5">
                    <ShoppingBag className="w-7 h-7 text-accent" strokeWidth={1.2} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Your wardrobe awaits</h3>
                  <p className="text-sm text-text-muted mb-6 max-w-[260px]">
                    Discover pieces that speak to you. Every order is a chapter in your story.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="btn-primary"
                  >
                    Explore Collection
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.color}-${item.size}`} className="p-6 flex gap-4">
                      <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-background-alt flex-shrink-0">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <h3 className="font-medium text-[15px] truncate">{item.name}</h3>
                        <p className="text-xs text-text-muted mt-0.5">
                          {item.color} · {item.size}
                        </p>
                        {item.customDesign && (
                          <p className="text-xs text-accent mt-0.5">Custom design</p>
                        )}
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1 border border-border rounded-full">
                            <button
                              onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-accent-light transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" strokeWidth={2} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-accent-light transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" strokeWidth={2} />
                            </button>
                          </div>
                          <p className="font-semibold text-[15px]">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.color, item.size)}
                        className="self-start w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-accent-light transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4 bg-background">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-semibold text-base">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-text-muted">
                  Shipping & taxes calculated at checkout. Free shipping on orders over ₹1,500.
                </p>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn-primary w-full"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-sm text-text-muted hover:text-text-primary transition-colors py-2"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}