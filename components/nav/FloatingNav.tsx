'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/store/cart'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Customize', href: '/customize' },
  { label: 'Studio', href: '/studio' },
]

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const itemCount = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const openCart = useCart((s) => s.openCart)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Desktop Floating Navbar */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className={cn(
          'fixed top-5 left-1/2 -translate-x-1/2 z-50',
          'rounded-full transition-all duration-500',
          'hidden md:flex items-center gap-1',
          scrolled ? 'py-2 px-2' : 'py-2.5 px-3',
          'glass-strong shadow-2xl shadow-text-primary/5'
        )}
        style={{ minWidth: scrolled ? '540px' : '600px' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 group"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-7 h-7 rounded-full bg-text-primary flex items-center justify-center"
          >
            <span className="text-background font-serif italic text-base">F</span>
          </motion.div>
          <span className="font-semibold text-text-primary tracking-tight text-[15px]">
            ashtrend
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-border mx-1" />

        {/* Nav Links */}
        <nav className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-text-primary group-hover:w-1/2 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-px h-5 bg-border mx-1" />

        {/* Right side icons */}
        <div className="flex items-center gap-0.5">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-accent-light/50 transition-all"
            aria-label="Search"
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </button>
          
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-accent-light/50 transition-all"
            aria-label="Account"
          >
            <User className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <button
            onClick={openCart}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-accent-light/50 transition-all"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-text-primary text-background text-[10px] font-semibold flex items-center justify-center px-1"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden glass-strong border-b border-border">
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-text-primary flex items-center justify-center">
              <span className="text-background font-serif italic text-base">F</span>
            </div>
            <span className="font-semibold text-[15px]">ashtrend</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={openCart} className="relative w-9 h-9 flex items-center justify-center" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-text-primary text-background text-[10px] font-semibold flex items-center justify-center px-1">
                  {itemCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className="w-9 h-9 flex items-center justify-center" aria-label="Menu">
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-text-primary/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[85%] max-w-sm bg-background p-6 md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs eyebrow text-text-muted">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center" aria-label="Close">
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-2xl font-medium text-text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}