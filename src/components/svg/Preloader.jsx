import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/animations/setup'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Hand-drawn restaurant sign: a cloche, plate, fork and spoon, then the
 * wordmark drawn on like a pen stroke and filled with ink, a terracotta
 * rule wipe, then the cream panel lifts to reveal the hero.
 * Progress hairline tracks real assets, not a timer.
 */
export function Preloader({ onDone }) {
  const root = useRef(null)
  const tlRef = useRef(null)
  const [drawn, setDrawn] = useState(false)
  const [assetsReady, setAssetsReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const reduced = usePrefersReducedMotion()
  const lifted = useRef(false)

  const lift = (instant = false) => {
    if (lifted.current) return
    lifted.current = true
    const node = root.current
    if (!node) return onDone()
    if (instant || reduced) {
      gsap.to(node, {
        autoAlpha: 0,
        duration: reduced ? 0.2 : 0.25,
        ease: 'power2.out',
        onComplete: onDone,
      })
      return
    }
    gsap.to(node, {
      yPercent: -100,
      duration: 0.45,
      ease: 'power3.inOut',
      onComplete: onDone,
    })
  }

  useEffect(() => {
    const node = root.current
    if (!node) return

    if (reduced) {
      gsap.set(
        node.querySelectorAll(
          '.pl-draw, .pl-draw path, .pl-draw ellipse, .pl-draw circle, .pl-fork path, .pl-spoon path',
        ),
        { strokeDashoffset: 0, drawSVG: '0% 100%' },
      )
      gsap.set(node.querySelectorAll('.pl-char'), { y: '0%', opacity: 1 })
      gsap.set(node.querySelector('.pl-sub'), { opacity: 1, y: 0 })
      gsap.set(node.querySelector('.pl-rule-wrap'), { opacity: 1 })
      gsap.set(node.querySelector('.pl-rule'), { scaleX: 1 })
      setDrawn(true)
      return
    }

    const q = (s) => node.querySelector(s)

    // Hide letters, subtitle and loading bar so culinary animation starts totally clean
    gsap.set(node.querySelectorAll('.pl-char'), { y: '115%', opacity: 0 })
    gsap.set(q('.pl-sub'), { opacity: 0, y: 8 })
    gsap.set(q('.pl-rule-wrap'), { opacity: 0 })
    gsap.set(q('.pl-rule'), { scaleX: 0 })

    const tl = gsap.timeline({ onComplete: () => setDrawn(true) })
    tlRef.current = tl

    // High-performance kinetic signature sequence (~0.75s total)
    tl.fromTo(
      q('.pl-plate'),
      { drawSVG: '0% 0%' },
      { drawSVG: '0% 100%', duration: 0.25, ease: 'power1.inOut' },
    )
      .fromTo(
        q('.pl-plate-inner'),
        { drawSVG: '0% 0%' },
        { drawSVG: '0% 100%', duration: 0.2, ease: 'power1.inOut' },
        '-=0.18',
      )
      .fromTo(
        q('.pl-dome-base'),
        { drawSVG: '0% 0%' },
        { drawSVG: '0% 100%', duration: 0.18, ease: 'power1.inOut' },
        '-=0.14',
      )
      .fromTo(
        q('.pl-dome'),
        { drawSVG: '0% 0%' },
        { drawSVG: '0% 100%', duration: 0.28, ease: 'power1.inOut' },
        '-=0.16',
      )
      .fromTo(
        q('.pl-accent'),
        { drawSVG: '0% 0%' },
        { drawSVG: '0% 100%', duration: 0.16, ease: 'power1.out' },
        '-=0.12',
      )
      .fromTo(
        [q('.pl-knob-base'), q('.pl-knob'), q('.pl-knob-inner')],
        { drawSVG: '0% 0%' },
        { drawSVG: '0% 100%', duration: 0.16, stagger: 0.03 },
        '-=0.12',
      )
      .fromTo(
        node.querySelectorAll('.pl-fork path, .pl-spoon path'),
        { drawSVG: '0% 0%' },
        { drawSVG: '0% 100%', duration: 0.22, stagger: 0.03 },
        '-=0.12',
      )
      .fromTo(
        q('.pl-steam').querySelectorAll('path'),
        { drawSVG: '0% 0%' },
        { drawSVG: '0% 100%', duration: 0.18, stagger: 0.04 },
        '-=0.1',
      )
      .to(
        node.querySelectorAll('.pl-char'),
        {
          y: '0%',
          opacity: 1,
          duration: 0.35,
          stagger: 0.02,
          ease: 'power3.out',
        },
        '-=0.1',
      )
      .to(
        q('.pl-sub'),
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          ease: 'power2.out',
        },
        '-=0.18',
      )
      .to(
        q('.pl-rule-wrap'),
        {
          opacity: 1,
          duration: 0.15,
          ease: 'power2.out',
        },
        '-=0.08',
      )
      .to(
        q('.pl-rule'),
        {
          scaleX: 1,
          duration: 0.25,
          ease: 'power2.inOut',
        },
        '-=0.08',
      )

    return () => tl.kill()
  }, [reduced])

  useEffect(() => {
    let cancelled = false
    const items = [{ key: 'fonts', promise: document.fonts ? document.fonts.ready : Promise.resolve() }]

    // Only wait for critical above-the-fold hero image if present
    const heroImg = document.querySelector('img[src*="hero-thali"]')
    if (heroImg && !heroImg.complete) {
      items.push({
        key: 'hero-img',
        promise: new Promise((res) => {
          heroImg.addEventListener('load', res, { once: true })
          heroImg.addEventListener('error', res, { once: true })
        }),
      })
    }

    // Safety timeout: max 800ms wait for assets, never block user
    const safety = setTimeout(() => {
      if (!cancelled) setAssetsReady(true)
    }, 800)

    Promise.all(items.map((i) => i.promise)).then(() => {
      if (!cancelled) setAssetsReady(true)
    })

    return () => {
      cancelled = true
      clearTimeout(safety)
    }
  }, [])

  useEffect(() => {
    if (!drawn || !assetsReady) return
    const t = setTimeout(() => lift(), 60)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawn, assetsReady])

  const skip = () => {
    tlRef.current?.progress(1)
    lift(true)
  }

  if (lifted.current) return null

  return (
    <div
      ref={root}
      aria-hidden="true"
      onPointerDown={skip}
      onKeyDown={(e) => {
        if (e.key === 'Escape') skip()
      }}
      className="fixed inset-0 z-80 flex cursor-pointer flex-col items-center justify-center bg-cream"
    >
      <svg
        viewBox="0 0 420 245"
        className="w-[min(94vw,520px)] max-h-[52svh] overflow-visible"
        role="presentation"
      >
        <g
          className="pl-draw"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        >
          {/* Outer Platter Charger Rim */}
          <path
            className="pl-plate"
            vectorEffect="non-scaling-stroke"
            d="M 82 206 C 82 193, 139 184, 210 184 C 281 184, 338 193, 338 206 C 338 219, 281 228, 210 228 C 139 228, 82 219, 82 206 Z"
          />
          {/* Inner Platter Reflection Rim */}
          <path
            className="pl-plate-inner"
            vectorEffect="non-scaling-stroke"
            strokeWidth="1.2"
            opacity="0.45"
            d="M 98 206 C 98 196, 148 189, 210 189 C 272 189, 322 196, 322 206 C 322 216, 272 223, 210 223 C 148 223, 98 216, 98 206 Z"
          />

          {/* Cloche Dome Base Collar Rim (rests on the platter) */}
          <path
            className="pl-dome-base"
            vectorEffect="non-scaling-stroke"
            strokeWidth="1.5"
            d="M 116 205 C 116 199, 158 195, 210 195 C 262 195, 304 199, 304 205 C 304 211, 262 215, 210 215 C 158 215, 116 211, 116 205 Z"
          />

          {/* Cloche Dome Bell Arch */}
          <path
            className="pl-dome"
            vectorEffect="non-scaling-stroke"
            d="M 117 203 C 119 152, 156 104, 210 104 C 264 104, 301 152, 303 203"
          />

          {/* Dome Shading Accent */}
          <path
            className="pl-accent"
            vectorEffect="non-scaling-stroke"
            strokeWidth="1.2"
            opacity="0.35"
            strokeDasharray="2 3"
            d="M 136 172 C 148 138, 177 116, 210 116"
          />

          {/* Brass Finial Knob */}
          <ellipse
            className="pl-knob-base"
            cx="210"
            cy="103"
            rx="6.5"
            ry="2"
            vectorEffect="non-scaling-stroke"
            strokeWidth="1.4"
          />
          <circle
            className="pl-knob"
            cx="210"
            cy="94"
            r="6.5"
            vectorEffect="non-scaling-stroke"
            strokeWidth="1.6"
          />
          <circle
            className="pl-knob-inner"
            cx="210"
            cy="94"
            r="2.5"
            vectorEffect="non-scaling-stroke"
            strokeWidth="1.2"
          />

          {/* Left: Fine Dining Fork (Vertical, proportional, authentic) */}
          <g className="pl-fork" vectorEffect="non-scaling-stroke">
            <path vectorEffect="non-scaling-stroke" strokeWidth="1.5" d="M 50 228 L 50 162" />
            <path
              vectorEffect="non-scaling-stroke"
              strokeWidth="1.4"
              d="M 42 122 L 42 154 C 42 163, 58 163, 58 154 L 58 122"
            />
            <path vectorEffect="non-scaling-stroke" strokeWidth="1.3" d="M 47.3 156 L 47.3 120" />
            <path vectorEffect="non-scaling-stroke" strokeWidth="1.3" d="M 52.7 156 L 52.7 120" />
          </g>

          {/* Right: Fine Dining Spoon (Vertical, proportional, authentic) */}
          <g className="pl-spoon" vectorEffect="non-scaling-stroke">
            <path vectorEffect="non-scaling-stroke" strokeWidth="1.5" d="M 370 228 L 370 164" />
            <path
              vectorEffect="non-scaling-stroke"
              strokeWidth="1.4"
              d="M 370 164 C 358 164, 356 140, 360 126 C 364 114, 370 110, 370 110 C 370 110, 376 114, 380 126 C 384 140, 382 164, 370 164 Z"
            />
          </g>

          {/* Rising Gourmet Steam Wisps */}
          <g className="pl-steam">
            <path vectorEffect="non-scaling-stroke" strokeWidth="1.4" opacity="0.75" d="M 182 78 C 174 65, 188 52, 180 38" />
            <path vectorEffect="non-scaling-stroke" strokeWidth="1.4" opacity="0.85" d="M 210 74 C 202 58, 218 46, 210 30" />
            <path vectorEffect="non-scaling-stroke" strokeWidth="1.4" opacity="0.75" d="M 238 78 C 230 65, 244 52, 236 38" />
          </g>
        </g>
      </svg>

      {/* Luxury Editorial Typography: Solid Black Letter-by-Letter Masked Reveal */}
      <div className="mt-5 text-center select-none">
        <div className="overflow-hidden py-1">
          <h1 className="font-display text-4xl sm:text-5xl font-light tracking-[0.22em] text-ink display-wonk flex justify-center">
            {'NIZACHEM'.split('').map((char, i) => (
              <span
                key={i}
                className="pl-char inline-block will-change-transform"
                style={{ transform: 'translateY(115%)', opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        <p className="pl-sub font-body text-[0.7rem] sm:text-[0.78rem] font-semibold tracking-[0.32em] uppercase text-ink-soft/90 mt-2 will-change-transform opacity-0">
          Restaurant &amp; Bar · Curtorim Goa
        </p>
      </div>

      {/* Minimalist Terracotta Loading Bar: Revealed strictly after all animations finish */}
      <div className="pl-rule-wrap mt-5 h-[2px] w-[min(50vw,260px)] origin-left bg-turmeric/35 overflow-hidden rounded-full opacity-0">
        <div className="pl-rule h-full origin-left bg-chilli" />
      </div>

      <span className="kicker absolute bottom-5 left-1/2 -translate-x-1/2 text-ink-soft/60">
        Tap to skip
      </span>
    </div>
  )
}

export default Preloader
