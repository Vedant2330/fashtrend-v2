'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Type, Palette, ShoppingBag, Check, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/data/products'
import { useCart } from '@/lib/store/cart'
import { formatPrice, cn } from '@/lib/utils'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SiteFooter } from '@/components/ui/SiteFooter'

const STEPS = [
  { id: 1, label: 'Product', icon: ShoppingBag },
  { id: 2, label: 'Design', icon: Sparkles },
  { id: 3, label: 'Preview', icon: Palette },
  { id: 4, label: 'Add to Bag', icon: Check },
]

function CustomizerContent() {
  const searchParams = useSearchParams()
  const productIdParam = searchParams.get('product')
  const initialProduct = PRODUCTS.find(p => p.id === productIdParam) || PRODUCTS[0]

  const [step, setStep] = useState(1)
  const [product, setProduct] = useState(initialProduct)
  const [color, setColor] = useState(initialProduct.colors[0])
  const [size, setSize] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const addToCart = useCart((s) => s.addToCart)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleAddToCart = () => {
    if (!size) return
    setIsAdding(true)
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: `${product.name} ${text || uploadedImage ? '(Custom)' : ''}`,
      price: product.price + (text || uploadedImage ? 100 : 0),
      image: product.images[0],
      color: color.name,
      size,
      customDesign: { text, imageUrl: uploadedImage || undefined },
    })
    setTimeout(() => {
      setIsAdding(false)
      setAdded(true)
    }, 400)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-text-muted mb-5"
          >
            The Workshop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-text-primary"
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              fontWeight: 400,
            }}
          >
            Design something
            <br />
            <span className="text-text-muted italic">uniquely yours.</span>
          </motion.h1>
        </div>
      </section>

      {/* Wizard */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 md:gap-6 mb-12 md:mb-16">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 md:gap-6">
                <div className="flex flex-col items-center">
                  <motion.div
                    className={cn(
                      'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors',
                      step >= s.id
                        ? 'bg-text-primary text-background'
                        : 'bg-background-alt text-text-muted'
                    )}
                    animate={{ scale: step === s.id ? 1.05 : 1 }}
                  >
                    {step > s.id ? <Check className="w-4 h-4" strokeWidth={2} /> : <s.icon className="w-4 h-4" strokeWidth={1.5} />}
                  </motion.div>
                  <p className={cn(
                    'text-[10px] md:text-xs mt-2 whitespace-nowrap',
                    step >= s.id ? 'text-text-primary font-medium' : 'text-text-muted'
                  )}>
                    {s.label}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    'h-px w-8 md:w-16 transition-colors -mt-6',
                    step > s.id ? 'bg-text-primary' : 'bg-border'
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Form */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-medium mb-6">Choose your base</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {PRODUCTS.slice(0, 6).map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setProduct(p)
                              setColor(p.colors[0])
                              setSize(null)
                            }}
                            className={cn(
                              'group p-3 rounded-xl border transition-all text-left',
                              product.id === p.id ? 'border-text-primary bg-accent-light/30' : 'border-border hover:border-text-secondary'
                            )}
                          >
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-background-alt mb-2">
                              <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="200px" />
                            </div>
                            <p className="text-xs font-medium truncate">{p.name}</p>
                            <p className="text-xs text-text-muted">{formatPrice(p.price)}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">Color</p>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setColor(c)}
                            className={cn(
                              'w-10 h-10 rounded-full border-2 transition-all',
                              color.name === c.name ? 'border-text-primary scale-110' : 'border-border'
                            )}
                            style={{ backgroundColor: c.hex }}
                            aria-label={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">Size</p>
                      <div className="grid grid-cols-5 gap-2">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={cn(
                              'py-2.5 rounded-xl text-sm font-medium border transition-all',
                              size === s
                                ? 'border-text-primary bg-text-primary text-background'
                                : 'border-border text-text-primary hover:border-text-secondary'
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-medium mb-3">Add your design</h2>
                      <p className="text-text-secondary text-sm mb-8">Upload artwork or add custom text. We&apos;ll handle the rest.</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Type className="w-4 h-4" strokeWidth={1.5} />
                        Add text
                      </p>
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Your text here..."
                        maxLength={20}
                        className="w-full px-4 py-3 rounded-xl bg-background-alt border border-border text-base focus:outline-none focus:border-text-primary"
                      />
                      <p className="text-xs text-text-muted mt-2">{text.length}/20 characters</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Upload className="w-4 h-4" strokeWidth={1.5} />
                        Upload artwork
                      </p>
                      <label className="block">
                        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-text-primary transition-colors">
                          {uploadedImage ? (
                            <div className="space-y-2">
                              <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden">
                                <Image src={uploadedImage} alt="Uploaded" fill className="object-contain" />
                              </div>
                              <p className="text-sm text-text-primary">Click to change</p>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mx-auto mb-3 text-text-muted" strokeWidth={1.5} />
                              <p className="text-sm text-text-primary mb-1">Drop your design here</p>
                              <p className="text-xs text-text-muted">PNG, JPG, SVG · Max 10MB</p>
                            </>
                          )}
                        </div>
                      </label>
                    </div>

                    <div className="p-4 rounded-xl bg-accent-light/30 border border-accent/20">
                      <p className="text-xs text-text-secondary">
                        <span className="font-medium text-text-primary">Pricing note:</span> Custom designs add ₹100 to the base price. Bulk discounts available for 10+ units.
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-medium mb-3">Review your design</h2>
                      <p className="text-text-secondary text-sm">Make sure everything looks right before adding to your bag.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between p-4 rounded-xl bg-background-alt">
                        <span className="text-sm text-text-secondary">Product</span>
                        <span className="text-sm font-medium">{product.name}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-background-alt">
                        <span className="text-sm text-text-secondary">Color</span>
                        <span className="text-sm font-medium">{color.name}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-background-alt">
                        <span className="text-sm text-text-secondary">Size</span>
                        <span className="text-sm font-medium">{size || '—'}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-background-alt">
                        <span className="text-sm text-text-secondary">Custom text</span>
                        <span className="text-sm font-medium">{text || '—'}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-background-alt">
                        <span className="text-sm text-text-secondary">Custom artwork</span>
                        <span className="text-sm font-medium">{uploadedImage ? 'Yes' : '—'}</span>
                      </div>
                      <div className="flex justify-between p-4 rounded-xl bg-text-primary text-background">
                        <span>Total</span>
                        <span className="font-semibold text-lg">
                          {formatPrice(product.price + (text || uploadedImage ? 100 : 0))}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-12"
                  >
                    {added ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-20 h-20 rounded-full bg-success text-background flex items-center justify-center mx-auto mb-6"
                        >
                          <Check className="w-10 h-10" strokeWidth={2} />
                        </motion.div>
                        <h2 className="text-3xl font-medium mb-3">Added to your bag</h2>
                        <p className="text-text-secondary mb-8">Your custom design is ready for checkout.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button onClick={() => useCart.getState().openCart()} className="btn-primary">
                            View Bag
                            <ArrowRight className="w-4 h-4" strokeWidth={2} />
                          </button>
                          <Link href="/shop" className="btn-secondary">
                            Continue Shopping
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl font-medium mb-3">Ready to add?</h2>
                        <p className="text-text-secondary mb-8">Click below to add your custom design to your bag.</p>
                        <button
                          onClick={handleAddToCart}
                          disabled={!size || isAdding}
                          className={cn(
                            'inline-flex items-center gap-2 px-8 py-4 rounded-full bg-text-primary text-background font-semibold',
                            (!size) && 'opacity-40 cursor-not-allowed'
                          )}
                        >
                          {isAdding ? 'Adding...' : 'Add to Bag'}
                          <ArrowRight className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              {!added && (
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
                  <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                    Back
                  </button>
                  {step < 4 && (
                    <button
                      onClick={() => setStep(step + 1)}
                      disabled={step === 1 && !size}
                      className={cn(
                        'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text-primary text-background font-semibold text-sm',
                        (step === 1 && !size) && 'opacity-40 cursor-not-allowed'
                      )}
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-4">
                <p className="eyebrow text-text-muted text-center">Live Preview</p>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-background-alt">
                  <Image
                    src={product.images[0]}
                    alt="Preview"
                    fill
                    className="object-cover"
                    style={{ filter: color.hex !== '#FAFAF5' ? `hue-rotate(${getHueRotation(color.hex)}deg)` : undefined }}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  
                  {/* Overlay custom text */}
                  {text && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p 
                        className="font-bold text-text-primary"
                        style={{ 
                          fontSize: 'clamp(1.5rem, 6vw, 3rem)',
                          textShadow: '0 2px 8px rgba(255,255,255,0.4)',
                        }}
                      >
                        {text}
                      </p>
                    </div>
                  )}

                  {/* Overlay uploaded image */}
                  {uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative w-1/2 aspect-square">
                        <Image src={uploadedImage} alt="Custom" fill className="object-contain" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm text-text-secondary">
                    {product.name} · {color.name} · {size || 'Select size'}
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    {formatPrice(product.price + (text || uploadedImage ? 100 : 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Helper to get hue rotation based on color
function getHueRotation(hex: string): number {
  const colorMap: Record<string, number> = {
    '#FAFAF5': 0,
    '#F5F0E8': 30,
    '#1C1C1C': 0,
    '#0A0A0A': 0,
    '#D4C9BE': 30,
    '#4A5538': 90,
    '#6B2D3D': 340,
  }
  return colorMap[hex.toUpperCase()] || 0
}

export default function CustomizePage() {
  return (
    <>
      <FloatingNav />
      <CartDrawer />
      <main>
        <Suspense fallback={<div className="min-h-screen pt-32 px-6">Loading...</div>}>
          <CustomizerContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}