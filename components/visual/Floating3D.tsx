'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FloatingElementProps {
  src: string
  alt: string
  className?: string
  speed?: number
  rotation?: number
  width: number
  height: number
  priority?: boolean
}

// Premium floating apparel element with parallax + rotation
export function FloatingElement({
  src,
  alt,
  className,
  speed = 0.5,
  rotation = 0,
  width,
  height,
  priority = false,
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed])
  const rotateAnimation = useTransform(scrollYProgress, [0, 1], [rotation - 5, rotation + 5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <motion.div
      ref={ref}
      className={cn('absolute pointer-events-none', className)}
      style={{ y, rotate: rotateAnimation, scale, willChange: 'transform' }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
        style={{ width, height }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-2xl shadow-2xl shadow-text-primary/20"
          sizes="300px"
          priority={priority}
        />
        {/* Subtle glow */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-text-primary/5" />
      </motion.div>
    </motion.div>
  )
}

// Atmospheric depth layers — radial gradients for depth
export function DepthLayers() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(123,107,90,0.06) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(13,13,13,0.03) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Premium gradient mesh for backgrounds
export function GradientMesh() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(at 27% 37%, rgba(123,107,90,0.08) 0px, transparent 50%),
            radial-gradient(at 97% 21%, rgba(212,201,190,0.12) 0px, transparent 50%),
            radial-gradient(at 52% 99%, rgba(74,85,56,0.04) 0px, transparent 50%)
          `,
        }}
      />
    </div>
  )
}

// Floating brand mark - positioned to upper-left, away from center logo
export function FloatingBrandMark({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.05 }}
      transition={{ duration: 2, delay: 0.5 + delay }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="text-[24rem] font-serif italic leading-none text-text-primary select-none"
        style={{ fontFamily: 'var(--font-serif), serif', fontWeight: 400 }}
      >
        f
      </motion.div>
    </motion.div>
  )
}

// Premium stacked floating image cards
export function FloatingImageStack({
  images,
  className,
  height = 'h-[420px]',
}: {
  images: { src: string; alt: string; offsetX?: number }[]
  className?: string
  height?: string
}) {
  return (
    <div className={cn(`relative ${height}`, className)}>
      {images.map((image, i) => {
        const offsetX = image.offsetX ?? 0
        const rotate = -3 + (i % 3) * 2
        return (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-text-primary/5"
            style={{ zIndex: images.length - i }}
            initial={{ opacity: 0, x: offsetX, y: 40, rotate }}
            whileInView={{ opacity: 1, x: offsetX, y: 0, rotate }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="400px"
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}