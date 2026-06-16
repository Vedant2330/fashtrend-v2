'use client'

import { Instagram, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Tees', href: '/shop' },
    { label: 'Oversized', href: '/shop?collection=oversized' },
    { label: 'Custom', href: '/customize' },
    { label: 'Kids', href: '/shop?collection=kids' },
    { label: 'Festival', href: '/shop?collection=festival' },
  ],
  Studio: [
    { label: 'Our Story', href: '/studio' },
    { label: 'Custom Printing', href: '/customize' },
    { label: 'Bulk Orders', href: '/customize?mode=bulk' },
    { label: 'Press', href: '/studio' },
  ],
  Support: [
    { label: 'Shipping & Returns', href: '#' },
    { label: 'Size Guide', href: '#' },
    { label: 'Care Instructions', href: '#' },
    { label: 'Contact', href: 'mailto:hello@fashtrend.com' },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12 mb-16">
          <div className="col-span-2 md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-text-primary flex items-center justify-center">
                <span className="text-background font-serif italic text-base">F</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">ashtrend</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Premium custom apparel. Made in Pune, shipped worldwide. Print it. Wear it. Flaunt it.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/fash__trend"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:hello@fashtrend.com"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="eyebrow text-text-muted mb-5">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-border pt-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-medium mb-1">Join the studio</h3>
              <p className="text-sm text-text-muted">First access to drops, editorial stories, and more.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-72 px-4 py-3 rounded-full bg-background-alt border border-border text-sm focus:outline-none focus:border-text-primary"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-text-primary text-background text-sm font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                Join
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 Fashtrend Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-text-primary transition-colors">Terms</Link>
            <span>Made in Pune, India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  )
}