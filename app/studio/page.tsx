'use client'

import { motion } from 'framer-motion'
import { Sparkles, Users, Heart, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FloatingNav } from '@/components/nav/FloatingNav'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SiteFooter } from '@/components/ui/SiteFooter'

export default function StudioPage() {
  return (
    <>
      <FloatingNav />
      <CartDrawer />
      <main>
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 px-6 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="eyebrow text-text-muted mb-5"
                >
                  The Studio
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
                  A studio in Pune.
                  <br />
                  <span className="text-text-muted italic">A wardrobe for the world.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-text-secondary text-lg leading-relaxed mt-8 max-w-xl"
                >
                  We started Fashtrend with a single screen-printing press and a belief: premium custom apparel should be accessible, considered, and made with care.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="lg:col-span-5"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/editorial/studio-still.jpg"
                    alt="The Studio"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src="/images/detail/collar-stitching.jpg" alt="Craft" fill className="object-cover" sizes="200px" />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src="/images/detail/fabric-weave.jpg" alt="Fabric" fill className="object-cover" sizes="200px" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-32 px-6 border-t border-border">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-16">
              <p className="eyebrow text-text-muted mb-5">What we believe</p>
              <h2
                className="text-text-primary max-w-3xl"
                style={{
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                }}
              >
                Three principles guide every stitch, print, and order.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'Craft',
                  text: 'Heavyweight cotton, twin-needle hems, hand-screened graphics. The details matter.',
                },
                {
                  icon: Users,
                  title: 'Community',
                  text: 'From college fests to corporate teams, we exist for the people who wear our work.',
                },
                {
                  icon: Heart,
                  title: 'Care',
                  text: 'Made locally, shipped globally. Every order handled by people who care about the result.',
                },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-background-alt"
                >
                  <v.icon className="w-6 h-6 mb-5 text-accent" strokeWidth={1.5} />
                  <h3 className="text-xl font-medium mb-3">{v.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{v.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-20 md:py-32 px-6 bg-text-primary text-background">
          <div className="max-w-[1400px] mx-auto">
            <p className="eyebrow text-background/50 mb-12 text-center">By the numbers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { number: '10K+', label: 'Orders shipped' },
                { number: '50K+', label: 'Designs printed' },
                { number: '15+', label: 'Countries' },
                { number: '4.9', label: 'Average rating' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <p
                    className="text-background mb-2"
                    style={{
                      fontFamily: 'var(--font-serif), serif',
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {stat.number}
                  </p>
                  <p className="text-sm text-background/60 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-text-primary mb-6"
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                fontWeight: 400,
              }}
            >
              Join the wardrobe.
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              Every piece we make is a chapter. Become part of the story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-primary inline-flex">
                Shop the Collection
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link href="/customize" className="btn-secondary inline-flex">
                Start Customizing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}