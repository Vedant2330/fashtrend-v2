'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Heart } from 'lucide-react'
import { useCart } from '@/lib/store/cart'
import { cn } from '@/lib/utils'

type NavLink = {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: Array<{ label: string; href: string; description?: string }>
}

const NAV_LINKS: NavLink[] = [
  {
    label: 'Shop',
    href: '/shop',
    hasDropdown: true,
    dropdownItems: [
      { label: 'All Tees', href: '/shop', description: 'Browse the full collection' },
      { label: 'Oversized', href: '/shop?collection=oversized', description: 'Relaxed silhouettes' },
      { label: 'Custom', href: '/customize', description: 'Your design, our craft' },
      { label: 'Kids', href: '/shop?collection=kids', description: 'For the next generation' },
      { label: 'Festival', href: '/shop?collection=festival', description: 'Limited drops' },
    ],
  },
  {
    label: 'Customize',
    href: '/customize',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Start Designing', href: '/customize', description: 'Premium custom apparel' },
      { label: 'Bulk Orders', href: '/customize?mode=bulk', description: '10+ units, volume pricing' },
      { label: 'Corporate', href: '/customize?mode=corporate', description: 'Branded merch for teams' },
      { label: 'Events', href: '/customize?mode=events', description: 'Concerts, festivals, more' },
    ],
  },
  { label: 'Studio', href: '/studio' },
]

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const itemCount = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const openCart = useCart((s) => s.openCart)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    if (openDropdown) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [openDropdown])

  return (
    <>
      {/* Desktop Floating Navbar */}
      <motion.header
        ref={navRef}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className={cn(
          'fixed top-5 left-1/2 -translate-x-1/2 z-50',
          'rounded-full transition-all duration-500',
          'hidden md:flex items-center',
          scrolled ? 'py-1.5 pl-2 pr-1.5' : 'py-2 pl-2.5 pr-2',
          'glass-strong shadow-2xl shadow-text-primary/[0.08]'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 pl-3 pr-4 py-2 group">
          <div className="w-7 h-7 rounded-full bg-text-primary flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
            <span className="text-background font-serif italic text-[15px] leading-none">F</span>
          </div>
          <span className="font-semibold text-text-primary tracking-tight text-[15px]">
            ashtrend
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-border" />

        {/* Nav Links with dropdowns */}
        <nav className="flex items-center" role="menubar">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.label)}
              onMouseLeave={() => link.hasDropdown && setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className={cn(
                  'relative inline-flex items-center gap-1 px-4 py-2.5 text-[13px] font-medium transition-colors',
                  openDropdown === link.label
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
                role="menuitem"
                aria-haspopup={link.hasDropdown || undefined}
                aria-expanded={link.hasDropdown ? openDropdown === link.label : undefined}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    className={cn(
                      'w-3 h-3 transition-transform duration-300',
                      openDropdown === link.label && 'rotate-180'
                    )}
                    strokeWidth={2}
                  />
                )}
              </Link>

              {/* Dropdown panel */}
              <AnimatePresence>
                {link.hasDropdown && openDropdown === link.label && link.dropdownItems && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[260px] glass-strong rounded-2xl shadow-2xl shadow-text-primary/[0.08] border border-border overflow-hidden"
                    role="menu"
                  >
                    <div className="p-2">
                      {link.dropdownItems.map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.2 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-3 rounded-xl hover:bg-accent-light/50 transition-colors group"
                            role="menuitem"
                          >
                            <div className="font-medium text-sm text-text-primary">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-xs text-text-muted mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-px h-5 bg-border" />

        {/* Right side icons */}
        <div className="flex items-center">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-accent-light/50 transition-all"
            aria-label="Search"
          >
            <Search className="w-[15px] h-[15px]" strokeWidth={1.5} />
          </button>

          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-accent-light/50 transition-all"
            aria-label="Account"
          >
            <User className="w-[15px] h-[15px]" strokeWidth={1.5} />
          </button>

          <button
            onClick={openCart}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-accent-light/50 transition-all"
            aria-label="Cart"
          >
            <ShoppingBag className="w-[15px] h-[15px]" strokeWidth={1.5} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-text-primary text-background text-[10px] font-semibold flex items-center justify-center px-1.5"
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
              <span className="text-background font-serif italic text-[15px] leading-none">F</span>
            </div>
            <span className="font-semibold text-[15px]">ashtrend</span>
          </Link>
          <div className="flex items-center gap-1">
            <button onClick={openCart} className="relative w-9 h-9 flex items-center justify-center" aria-label="Cart">
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-[16px] rounded-full bg-text-primary text-background text-[9px] font-semibold flex items-center justify-center px-1">
                  {itemCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className="w-9 h-9 flex items-center justify-center" aria-label="Menu">
              <Menu className="w-[18px] h-[18px]" strokeWidth={1.5} />
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
              className="fixed right-0 top-0 bottom-0 z-50 w-[85%] max-w-sm bg-background p-6 md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-text-muted">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent-light transition-colors" aria-label="Close">
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-2xl font-medium text-text-primary hover:text-accent transition-colors"
                      style={{ fontFamily: 'var(--font-serif), serif', letterSpacing: '-0.02em' }}
                    >
                      {link.label}
                    </Link>
                    {link.dropdownItems && (
                      <div className="pl-4 mb-3 space-y-1.5">
                        {link.dropdownItems.slice(0, 4).map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}