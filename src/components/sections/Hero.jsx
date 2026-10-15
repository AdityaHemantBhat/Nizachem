import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animations/setup'
import { site } from '@/content/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useGoogleReviews } from '@/hooks/useGoogleReviews'
import { Button } from '@/components/ui/Button'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import { AzulejoCorner } from '@/components/svg/AzulejoCorner'

/**
 * Awwwards-Caliber Monumental Hero Section for Nizachem.
 * Features a cinematic Goan culinary triptych, monumental Devanagari watermark,
 * and an interactive floating reservation command dock.
 */
export function Hero() {
  const section = useRef(null)
  const centerArch = useRef(null)
  const leftCard = useRef(null)
  const rightCard = useRef(null)
  const bannerType = useRef(null)

  const [activeTaste, setActiveTaste] = useState(0)
  const [leftLoaded, setLeftLoaded] = useState(false)
  const [centerLoaded, setCenterLoaded] = useState(() => {
    if (typeof window === 'undefined') return false
    const img = new Image()
    img.src = '/photos/hero-thali.webp'
    return img.complete
  })
  const [rightLoaded, setRightLoaded] = useState(false)
  const reduced = usePrefersReducedMotion()
  const { rating, reviewCount, isLive } = useGoogleReviews()
  const [animatedCount, setAnimatedCount] = useState(0)

  // Smooth count-up animation that increments dynamically to the real Google review count
  useEffect(() => {
    const target = reviewCount || site.reviews?.count || 12
    const duration = 1400
    const startTime = performance.now()
    const startVal = animatedCount

    let frameId
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo for high-end kinetic counter feel
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.round(startVal + (target - startVal) * easeProgress)
      setAnimatedCount(current)

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [reviewCount])

  useGSAP(
    () => {
      if (reduced) return

      // Fluid Multi-Depth Parallax on Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      // Background Devanagari typography drifts upward slowly
      if (bannerType.current) {
        tl.to(bannerType.current, { y: -65, opacity: 0.015, ease: 'none' }, 0)
      }

      // Centerpiece arch stays grounded while satellite portals float at contrasting speeds
      if (centerArch.current) {
        tl.to(centerArch.current, { y: -40, scale: 0.98, ease: 'none' }, 0)
      }
      if (leftCard.current) {
        tl.to(leftCard.current, { y: -85, x: -16, rotate: -6, ease: 'none' }, 0)
      }
      if (rightCard.current) {
        tl.to(rightCard.current, { y: -75, x: 16, rotate: 6, ease: 'none' }, 0)
      }
    },
    { scope: section, dependencies: [reduced] },
  )

  return (
    <section
      ref={section}
      aria-label="Welcome to Nizachem"
      className="relative min-h-[100svh] overflow-hidden bg-cream pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-36 lg:pb-18 flex flex-col justify-center"
    >
      {/* 1. Ambient Lighting & Atmospheric Sunset Warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[min(90vw,1100px)] rounded-full bg-gradient-to-b from-chilli/12 via-turmeric/10 to-transparent blur-2xl lg:blur-3xl opacity-80 gpu-layer"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -right-24 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-sea/8 via-turmeric/5 to-transparent blur-2xl lg:blur-3xl opacity-60 gpu-layer"
      />

      {/* 2. Monumental Background Devanagari Watermark (निजाचें) */}
      <div
        ref={bannerType}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[14%] flex justify-center select-none will-change-transform z-0 gpu-layer"
      >
        <span
          lang="kok"
          className="font-serif text-[clamp(8rem,24vw,25rem)] font-normal text-ink/[0.042] leading-none select-none tracking-wider"
        >
          निजाचें
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* ============================================================== */}
        {/* MASTER HEADLINE: Architectural & High-Contrast Editorial Style  */}
        {/* ============================================================== */}
        <div className="text-center max-w-[1100px] mx-auto">
          <HeritageBadge kok="नमस्कार" label="Curtorim, South Goa · Restaurant &amp; Bar" className="mb-4" />

          <h1 className="font-display text-[clamp(2.6rem,6.8vw,5.8rem)] font-light leading-[1.03] tracking-[-0.025em] text-ink display-wonk">
            A Goan restaurant where the food{' '}
            <span className="relative inline-block font-normal italic text-chilli">
              tastes like home
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-chilli/80 via-turmeric/70 to-transparent"
              />
            </span>
            .
          </h1>

          <p className="mt-5 mx-auto max-w-[60ch] text-[1.05rem] sm:text-[1.2rem] font-normal leading-relaxed text-ink-soft">
            Good vibes, chilled evenings, and honest Goan cooking right here in Curtorim.
            Fresh seafood, flavorful curries, and cold cashew feni — served with the comforting taste of a real home kitchen.
          </p>
        </div>

        {/* ============================================================== */}
        {/* THE VISUAL TRIPTYCH: 3 Sculpted Goan Portals with Parallax     */}
        {/* ============================================================== */}
        <div className="relative mt-12 sm:mt-16 flex items-center justify-center">
          {/* Background Azulejo Tile Accents */}
          <div className="pointer-events-none absolute -top-8 -left-4 sm:left-4 z-20">
            <AzulejoCorner position="top-left" size={54} className="text-chilli/60" />
          </div>
          <div className="pointer-events-none absolute -bottom-8 -right-4 sm:right-4 z-20">
            <AzulejoCorner position="bottom-right" size={54} className="text-chilli/60" />
          </div>

          <div className="relative w-full max-w-[1240px] flex items-center justify-center py-6">
            {/* 1. LEFT SATELLITE: Mud Crab Xec Xec (Simmering Red Masala) */}
            <div
              ref={leftCard}
              onClick={() => setActiveTaste(1)}
              className="hidden lg:block absolute left-2 xl:left-8 top-1/2 -translate-y-1/2 z-20 w-[240px] xl:w-[270px] cursor-pointer will-change-transform transition-transform duration-500 hover:scale-105 gpu-layer"
            >
              <div className="relative overflow-hidden rounded-[28px] border border-ink/15 bg-ivory/95 p-3 shadow-[0_22px_50px_-10px_rgba(24,18,12,0.22)] backdrop-blur-md">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-cream-deep">
                  {!leftLoaded && (
                    <div aria-hidden="true" className="absolute inset-0 z-10 bg-cream-deep overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  )}
                  <picture className="contents">
                    <source type="image/webp" srcSet="/photos/dish-crab-xec-xec.webp" />
                    <img
                      src="/photos/dish-crab-xec-xec.jpg"
                      alt="Goan Crab Xec Xec"
                      className={`size-full object-cover transition-all duration-700 ease-out-expo hover:scale-110 ${
                        leftLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => setLeftLoaded(true)}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-cream pointer-events-none">
                    <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-turmeric uppercase">
                      House Speciality
                    </span>
                    <p className="font-display text-base font-semibold leading-tight text-cream mt-0.5">
                      Mud Crab Xec Xec
                    </p>
                    <p className="text-[0.68rem] text-cream/75 mt-0.5">
                      Roasted red coconut masala
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CENTERPIECE: The Grand Portuguese Arch (Goan Fish Thali) */}
            <div
              ref={centerArch}
              onClick={() => setActiveTaste(0)}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] cursor-pointer will-change-transform gpu-layer"
            >
              {/* Cathedral Arch Frame */}
              <div className="relative overflow-hidden rounded-t-[260px] rounded-b-[44px] border-2 border-ivory bg-cream-deep p-2 shadow-[0_36px_90px_-18px_rgba(24,18,12,0.28)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[250px] rounded-b-[38px] bg-cream-deep">
                  {!centerLoaded && (
                    <div aria-hidden="true" className="absolute inset-0 z-10 bg-cream-deep overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  )}
                  <picture className="contents">
                    <source type="image/webp" srcSet="/photos/hero-thali.webp" />
                    <img
                      src="/photos/hero-thali.jpg"
                      alt="Authentic Goan Fish Thali on banana leaf with fresh kingfish fry, sol kadi, and crab curry"
                      className={`size-full object-cover transition-all duration-1000 ease-out-expo hover:scale-105 ${
                        centerLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      onLoad={() => setCenterLoaded(true)}
                    />
                  </picture>

                  {/* Gradient Rim & Shadow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-black/10"
                  />

                  {/* Live Daily Catch Artisanal Market Tag */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 rounded-[3px] border border-cream/35 bg-ink/85 px-3.5 py-1 text-cream shadow-md backdrop-blur-md select-none">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-turmeric animate-pulse" />
                      <span className="text-[0.66rem] font-semibold tracking-[0.18em] uppercase whitespace-nowrap">
                        Fresh Daily Catch · South Goa
                      </span>
                    </div>
                  </div>

                  {/* Center Base Plate Information */}
                  <div className="absolute bottom-5 inset-x-5 text-center text-cream">
                    <span className="inline-block rounded-[2px] bg-chilli border border-cream/25 px-2.5 py-0.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-cream shadow-xs mb-1.5">
                      Main Specialty
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold leading-tight text-cream">
                      Goan Fish Thali on Banana Leaf
                    </h3>
                    <p className="text-xs text-cream/80 mt-1">
                      Fried Kingfish · Prawn Curry · Sol Kadi · Earthen Clay Rice
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. RIGHT SATELLITE: Homestyle Chicken Xacuti */}
            <div
              ref={rightCard}
              onClick={() => setActiveTaste(2)}
              className="hidden lg:block absolute right-2 xl:right-8 top-1/2 -translate-y-1/2 z-20 w-[240px] xl:w-[270px] cursor-pointer will-change-transform transition-transform duration-500 hover:scale-105 gpu-layer"
            >
              <div className="relative overflow-hidden rounded-[28px] border border-ink/15 bg-ivory/95 p-3 shadow-[0_22px_50px_-10px_rgba(24,18,12,0.22)] backdrop-blur-md">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-cream-deep">
                  {!rightLoaded && (
                    <div aria-hidden="true" className="absolute inset-0 z-10 bg-cream-deep overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  )}
                  <picture className="contents">
                    <source type="image/webp" srcSet="/photos/dish-chicken-xacuti.webp" />
                    <img
                      src="/photos/dish-chicken-xacuti.jpg"
                      alt="Homestyle Chicken Xacuti"
                      className={`size-full object-cover transition-all duration-700 ease-out-expo hover:scale-110 ${
                        rightLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => setRightLoaded(true)}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-cream pointer-events-none">
                    <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-turmeric uppercase">
                      Homestyle Special
                    </span>
                    <p className="font-display text-base font-semibold leading-tight text-cream mt-0.5">
                      Chicken Xacuti
                    </p>
                    <p className="text-[0.68rem] text-cream/75 mt-0.5">
                      Roasted coconut &amp; aromatic spices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE FLOATING RESERVATION COMMAND DOCK                   */}
        {/* ============================================================== */}
        <div className="relative mt-8 sm:mt-12 z-20 mx-auto max-w-[880px]">
          <div className="rounded-2xl border border-ink/12 bg-ivory/95 p-2.5 sm:p-3 shadow-[0_20px_50px_-12px_rgba(24,18,12,0.15)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Live diner trust telemetry */}
            <a
              href="#reviews"
              className="flex items-center gap-3.5 pl-4 sm:pl-6 py-1 group cursor-pointer transition-opacity hover:opacity-90"
              title="Jump to verified diner reviews"
            >
              <div className="flex -space-x-2">
                <span className="size-8 rounded-full border-2 border-ivory bg-chilli text-cream flex items-center justify-center text-xs font-bold shadow-xs">
                  ★
                </span>
                <span className="size-8 rounded-full border-2 border-ivory bg-turmeric text-ink flex items-center justify-center text-xs font-bold shadow-xs transition-transform group-hover:scale-105">
                  {typeof rating === 'number' ? rating.toFixed(1) : '5.0'}
                </span>
              </div>
              <div>
                <p className="text-[0.78rem] font-semibold text-ink leading-tight flex items-center gap-1.5">
                  <span>{animatedCount > 0 ? `${animatedCount}+` : `${reviewCount || 12}+`} Verified Diner Reviews</span>
                  {isLive && (
                    <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" title="Live Google Maps sync active" />
                  )}
                </p>
                <p className="text-[0.68rem] text-ink-soft">
                  Four tables · Reservations recommended
                </p>
              </div>
            </a>

            {/* Primary & Secondary Dual CTAs */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto px-2 sm:px-0">
              <Button
                to="/book"
                variant="primary"
                showArrow
                className="w-full sm:w-auto !min-h-[46px] !px-7 text-[0.8rem] tracking-[0.15em] shadow-[0_4px_18px_rgba(194,65,12,0.36)]"
              >
                Reserve a Table
              </Button>

              <Button
                to="/menu"
                variant="cream"
                showArrow
                className="w-full sm:w-auto !min-h-[46px] !px-6 text-[0.8rem] tracking-[0.15em]"
              >
                Explore Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
