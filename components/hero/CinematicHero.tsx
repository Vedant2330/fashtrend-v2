'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

interface CinematicHeroProps {
  videoSrc: string
  mobileSrc?: string
}

// Three act frames - "PRINT IT." "WEAR IT." "FLAUNT IT."
const ACTS = [
  { id: 'print', text: 'PRINT IT.', sub: 'Premium craftsmanship' },
  { id: 'wear', text: 'WEAR IT.', sub: 'Effortless style' },
  { id: 'flaunt', text: 'FLAUNT IT.', sub: 'Own the moment' },
]

export function CinematicHero({ videoSrc, mobileSrc }: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentAct, setCurrentAct] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Scrub video time as user scrolls
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const video = videoRef.current
    if (!video || !video.duration || isNaN(video.duration)) return
    try {
      video.currentTime = video.duration * Math.max(0, Math.min(1, v))
    } catch (e) {
      // Ignore
    }
    // Determine current act
    if (v < 0.33) setCurrentAct(0)
    else if (v < 0.66) setCurrentAct(1)
    else setCurrentAct(2)
  })

  // Caption opacity
  const captionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [1, 1, 1, 0])

  // Video scale
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.05])

  // Overlay opacity
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.15, 0.4])

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      {/* Sticky video stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-text-primary">
        {/* Video */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: videoScale }}
        >
          {!isMobile ? (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
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
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={() => setVideoReady(true)}
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          )}
        </motion.div>

        {/* Cinematic gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(13,13,13,0.35) 0%, rgba(13,13,13,0.05) 35%, rgba(13,13,13,0.05) 65%, rgba(13,13,13,0.55) 100%)',
            opacity: overlayOpacity,
          }}
        />

        {/* Bottom fade to background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />

        {/* Top eyebrow */}
        <motion.div
          className="absolute top-28 left-0 right-0 flex justify-center pointer-events-none z-10"
          style={{ opacity: captionOpacity }}
        >
          <div className="flex items-center gap-3 text-background/80">
            <div className="w-8 h-px bg-background/40" />
            <span className="eyebrow">A Fashtrend Film · 2026</span>
            <div className="w-8 h-px bg-background/40" />
          </div>
        </motion.div>

        {/* ACT cinematic text - animated by scroll */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6"
          style={{ opacity: captionOpacity }}
        >
          {ACTS.map((act, i) => (
            <motion.div
              key={act.id}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
              initial={false}
              animate={{
                opacity: currentAct === i ? 1 : 0,
                scale: currentAct === i ? 1 : 0.95,
                y: currentAct === i ? 0 : 20,
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="eyebrow text-background/70 mb-4 md:mb-6">{act.sub}</p>
              <h1
                className="text-center text-background"
                style={{
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: 'clamp(3.5rem, 11vw, 11rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  fontWeight: 400,
                }}
              >
                {act.text}
              </h1>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
          style={{ opacity: captionOpacity }}
        >
          <span className="eyebrow text-background/60">Scroll to unfold</span>
          <motion.div
            className="w-px h-12 bg-background/40 origin-top"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Chapter progress indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          {ACTS.map((act, i) => (
            <div
              key={act.id}
              className="flex items-center gap-3"
            >
              <span
                className={cn(
                  'text-[10px] font-mono transition-all duration-300',
                  currentAct === i ? 'text-background opacity-100' : 'text-background/50 opacity-50'
                )}
              >
                0{i + 1}
              </span>
              <div
                className={cn(
                  'w-px transition-all duration-500',
                  currentAct === i ? 'h-8 bg-background' : 'h-4 bg-background/30'
                )}
              />
            </div>
          ))}
        </div>

        {/* Loading state */}
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-text-primary z-20">
            <div className="text-background/40 text-xs eyebrow animate-pulse">
              Loading film...
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Helper cn if not imported elsewhere
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}