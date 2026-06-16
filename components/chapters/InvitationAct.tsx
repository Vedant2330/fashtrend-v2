'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function InvitationAct() {
  return (
    <section className="relative bg-text-primary text-background py-32 md:py-40 overflow-hidden">
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

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden order-2 lg:order-1"
          >
            <Image
              src="/images/editorial/walk-arch.jpg"
              alt="Fashtrend world"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/30 to-transparent" />
          </motion.div>

          {/* Text side */}
          <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2">
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
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
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
              className="text-background/70 text-lg max-w-xl lg:max-w-none mb-10 leading-relaxed"
            >
              Every piece crafted in our Pune studio. Every order, a chapter. Step into the world of Fashtrend.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
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
        </div>
      </div>
    </section>
  )
}