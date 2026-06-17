'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FloatingElement, DepthLayers, FloatingBrandMark } from '@/components/visual/Floating3D'

interface CinematicHeroProps {
  videoSrc: string
  mobileSrc?: string
}

export function CinematicHero({ videoSrc, mobileSrc }: CinematicHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = async () => {
      try {
        await video.play()
      } catch (e) {
        video.muted = true
        try {
          await video.play()
        } catch (e2) {}
      }
    }

    video.addEventListener('canplay', tryPlay)
    tryPlay()

    return () => {
      video.removeEventListener('canplay', tryPlay)
    }
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden bg-text-primary"
      style={{
        height: '100vh',
        borderRadius: '0 0 40px 40px',
      }}
    >
      {/* Background video - also has rounded bottom corners */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: '0 0 40px 40px', overflow: 'hidden' }}
      >
        <video
          ref={videoRef}
          src={isMobile ? (mobileSrc || videoSrc) : videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={() => setVideoReady(true)}
          className="w-full h-full object-cover"
          style={{ borderRadius: '0 0 40px 40px' }}
          aria-hidden="true"
        />
      </div>

      {/* Atmospheric depth layers */}
      <DepthLayers />

      {/* Large backdrop brand mark */}
      <FloatingBrandMark />

      {/* Floating apparel elements - placed in CORNERS only (away from logo center zone) */}
      {!isMobile && (
        <>
          {/* Top-left */}
          <FloatingElement
            src="/images/products/cool-bold-cream.jpg"
            alt="Premium oversized tee in cream"
            className="top-[8%] left-[3%] hidden lg:block"
            speed={0.6}
            rotation={-8}
            width={170}
            height={220}
            priority
          />
          {/* Top-right */}
          <FloatingElement
            src="/images/products/cool-bold-charcoal.jpg"
            alt="Premium oversized tee in charcoal"
            className="top-[12%] right-[4%] hidden lg:block"
            speed={0.5}
            rotation={6}
            width={160}
            height={210}
          />
          {/* Mid-left edge */}
          <FloatingElement
            src="/images/detail/fabric-cotton.jpg"
            alt="Premium cotton fabric detail"
            className="top-[42%] left-[2%] hidden xl:block"
            speed={0.4}
            rotation={4}
            width={120}
            height={120}
          />
          {/* Mid-right edge */}
          <FloatingElement
            src="/images/products/world-cup.jpg"
            alt="Festival collection piece"
            className="top-[38%] right-[3%] hidden xl:block"
            speed={0.7}
            rotation={-5}
            width={130}
            height={170}
          />
          {/* Far bottom-left (above stats) */}
          <FloatingElement
            src="/images/products/custom-attitude.jpg"
            alt="Custom print design"
            className="bottom-[34%] left-[5%] hidden xl:block"
            speed={0.3}
            rotation={-3}
            width={110}
            height={140}
          />
          {/* Far bottom-right */}
          <FloatingElement
            src="/images/detail/tag-closeup.jpg"
            alt="Brand tag detail"
            className="bottom-[36%] right-[6%] hidden xl:block"
            speed={0.5}
            rotation={8}
            width={100}
            height={100}
          />
        </>
      )}

      {/* Subtle premium overlay - vignette + bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: '0 0 40px 40px',
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.30) 100%),
            linear-gradient(180deg, rgba(13,13,13,0.40) 0%, rgba(13,13,13,0.10) 25%, rgba(13,13,13,0.15) 60%, rgba(13,13,13,0.60) 100%)
          `,
        }}
      />

      {/* Top edge darken for navbar contrast */}
      <div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-text-primary/50 to-transparent pointer-events-none"
        style={{ borderRadius: '0 0 40px 40px' }}
      />

      {/* Content - centered with vertical flex distribution */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-3 text-background/85 text-[11px] tracking-[0.25em] uppercase font-medium px-6">
            <span className="w-8 h-px bg-background/40" />
            A Fashtrend Film · 2026
            <span className="w-8 h-px bg-background/40" />
          </span>
        </motion.div>

        {/* Spacing */}
        <div className="h-6 md:h-8" />

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-background max-w-5xl px-6"
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            fontWeight: 400,
          }}
        >
          Print it. Wear it. Flaunt it.
        </motion.h1>

        {/* Spacing - clear gap before logo */}
        <div className="h-10 md:h-14" />

        {/* Dedicated logo space - clean, centered, with breathing room */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-background flex items-center justify-center shadow-2xl shadow-text-primary/30 ring-1 ring-background/20">
            <span
              className="text-text-primary font-serif italic"
              style={{ fontSize: '1.625rem', lineHeight: 1, fontWeight: 500 }}
            >
              F
            </span>
          </div>
          <p
            className="mt-3 tracking-[0.35em] uppercase text-background/75 text-[10px] md:text-[11px] font-medium"
          >
            Fashtrend
          </p>
        </motion.div>

        {/* Spacing - clear gap after logo */}
        <div className="h-10 md:h-14" />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="text-background/85 text-lg md:text-xl font-medium tracking-tight max-w-2xl px-6"
        >
          Designed by You. Crafted by Fashtrend.
        </motion.p>

        {/* Spacing */}
        <div className="h-10 md:h-14" />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center gap-3 px-6"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-background text-text-primary font-semibold text-sm hover:scale-[1.02] transition-transform"
          >
            Shop Collection
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
          <Link
            href="/customize"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-background/30 text-background font-medium text-sm hover:bg-background/10 transition-colors backdrop-blur-sm"
          >
            Customize Your Tee
          </Link>
        </motion.div>
      </div>

      {/* Hero stats bar - sits above scroll indicator with proper gap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:flex justify-center gap-16 absolute left-0 right-0 z-10 pointer-events-none"
        style={{ bottom: '92px' }}
      >
        {[
          { num: '10K+', label: 'Orders shipped' },
          { num: '50K+', label: 'Designs printed' },
          { num: '15+', label: 'Countries' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p
              className="text-background"
              style={{ fontFamily: 'var(--font-serif), serif', fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.02em' }}
            >
              {stat.num}
            </p>
            <p className="text-background/55 text-[10px] uppercase tracking-[0.2em] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Bottom: scroll indicator - pinned to bottom edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-7 md:bottom-9 left-0 right-0 z-10 flex flex-col items-center pointer-events-none"
      >
        <span className="text-background/70 text-[10px] tracking-[0.25em] uppercase font-medium mb-3">
          Scroll to Explore
        </span>
        <motion.div
          className="w-px h-9 bg-background/50 origin-top"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Loading state */}
      {!videoReady && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-text-primary z-20"
          style={{ borderRadius: '0 0 40px 40px' }}
        >
          <div className="text-background/40 text-xs tracking-[0.25em] uppercase font-medium animate-pulse">
            Loading film...
          </div>
        </div>
      )}
    </section>
  )
}