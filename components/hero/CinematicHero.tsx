'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
    <section className="relative h-screen w-full overflow-hidden bg-text-primary">
      {/* Background video */}
      <div className="absolute inset-0">
        {!isMobile ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={() => setVideoReady(true)}
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <video
            ref={videoRef}
            src={mobileSrc || videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={() => setVideoReady(true)}
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Atmospheric depth layers */}
      <DepthLayers />

      {/* Large backdrop brand mark */}
      <FloatingBrandMark />

      {/* Floating apparel elements - desktop only */}
      {!isMobile && (
        <>
          <FloatingElement
            src="/images/products/cool-bold-cream.jpg"
            alt="Premium oversized tee in cream"
            className="top-[15%] left-[6%] hidden lg:block"
            speed={0.6}
            rotation={-8}
            width={200}
            height={260}
            priority
          />
          <FloatingElement
            src="/images/products/cool-bold-charcoal.jpg"
            alt="Premium oversized tee in charcoal"
            className="top-[20%] right-[8%] hidden lg:block"
            speed={0.5}
            rotation={6}
            width={180}
            height={240}
          />
          <FloatingElement
            src="/images/detail/fabric-cotton.jpg"
            alt="Premium cotton fabric detail"
            className="bottom-[18%] left-[12%] hidden lg:block"
            speed={0.4}
            rotation={4}
            width={160}
            height={160}
          />
          <FloatingElement
            src="/images/products/world-cup.jpg"
            alt="Festival collection piece"
            className="bottom-[20%] right-[14%] hidden xl:block"
            speed={0.7}
            rotation={-5}
            width={170}
            height={220}
          />
          <FloatingElement
            src="/images/products/custom-attitude.jpg"
            alt="Custom print design"
            className="top-[45%] right-[20%] hidden xl:block"
            speed={0.3}
            rotation={-3}
            width={120}
            height={160}
          />
          <FloatingElement
            src="/images/detail/tag-closeup.jpg"
            alt="Brand tag detail"
            className="top-[55%] left-[20%] hidden xl:block"
            speed={0.5}
            rotation={8}
            width={120}
            height={120}
          />
        </>
      )}

      {/* Subtle premium overlay - vignette + bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.30) 100%),
            linear-gradient(180deg, rgba(13,13,13,0.40) 0%, rgba(13,13,13,0.10) 25%, rgba(13,13,13,0.15) 60%, rgba(13,13,13,0.60) 100%)
          `,
        }}
      />

      {/* Top edge darken for navbar contrast */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-text-primary/50 to-transparent pointer-events-none" />

      {/* Content - centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-3 text-background/85 text-[11px] tracking-[0.25em] uppercase font-medium">
            <span className="w-8 h-px bg-background/40" />
            A Fashtrend Film · 2026
            <span className="w-8 h-px bg-background/40" />
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-background max-w-5xl"
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            fontWeight: 400,
          }}
        >
          Print it. Wear it. Flaunt it.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 md:mt-8 text-background/85 text-lg md:text-xl font-medium tracking-tight max-w-2xl"
        >
          Designed by You. Crafted by Fashtrend.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-3"
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

        {/* Hero stats bar - subtle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="absolute bottom-32 md:bottom-40 left-0 right-0 hidden lg:flex justify-center gap-16 pointer-events-none"
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
      </div>

      {/* Bottom: scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-8 md:bottom-10 left-0 right-0 z-10 flex flex-col items-center pointer-events-none"
      >
        <span className="text-background/70 text-[10px] tracking-[0.25em] uppercase font-medium mb-3">
          Scroll to Explore
        </span>
        <motion.div
          className="w-px h-10 bg-background/50 origin-top"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Loading state */}
      {!videoReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-text-primary z-20">
          <div className="text-background/40 text-xs tracking-[0.25em] uppercase font-medium animate-pulse">
            Loading film...
          </div>
        </div>
      )}
    </section>
  )
}