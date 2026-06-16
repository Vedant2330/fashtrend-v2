'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function InvitationAct() {
  return (
    <section className="relative bg-text-primary text-background py-32 md:py-48 overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-background/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="eyebrow text-background/50 mb-6"
        >
          Act VI · The Invitation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-background mb-8"
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            fontWeight: 400,
          }}
        >
          The wardrobe is yours.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-background/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Every piece crafted in our Pune studio. Every order, a chapter. Step into the world of Fashtrend.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-text-primary font-semibold hover:scale-[1.02] transition-transform"
          >
            Shop the Collection
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
          <Link
            href="/customize"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-background/30 text-background font-medium hover:bg-background/10 transition-colors"
          >
            Start Customizing
          </Link>
        </motion.div>
      </div>
    </section>
  )
}