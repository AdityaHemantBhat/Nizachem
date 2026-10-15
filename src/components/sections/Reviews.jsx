import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/animations/setup'
import { site } from '@/content/site'
import { AzulejoCorner } from '@/components/svg/AzulejoCorner'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import { Star } from 'lucide-react'
import { useGoogleReviews } from '@/hooks/useGoogleReviews'

// Official Multi-Color Google "G" Logo Icon
function GoogleIcon({ className = 'size-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function Reviews() {
  const widgetId = import.meta.env.VITE_GOOGLE_REVIEWS_WIDGET_ID || site.reviews?.widgetId
  const { reviews, rating, reviewCount } = useGoogleReviews()

  const reelSectionRef = useRef(null)
  const trackRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  // Lazy load Google Reviews widget script only when the section enters viewport
  useEffect(() => {
    if (!widgetId) return

    const section = reelSectionRef.current
    let scriptLoaded = false

    const loadScript = () => {
      if (scriptLoaded) return
      scriptLoaded = true

      const existing = document.querySelector('script[src*="platform.js"]')
      if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://elfsightcdn.com/platform.js'
        script.async = true
        document.body.appendChild(script)
      }

      // Purge badge scoped to widget container
      const purgeBadge = () => {
        const wrap = document.querySelector(`[class*="elfsight-app-${widgetId}"]`)
        if (!wrap) return

        wrap.querySelectorAll('a, div, span, button, svg').forEach((el) => {
          const text = (el.textContent || '').trim().toLowerCase()
          const href = el.getAttribute?.('href') || ''
          const cls = el.className?.toString?.() || ''
          if (
            href.includes('elfsight') ||
            href.includes('pricing?claim') ||
            text.includes('free google') ||
            text.includes('google reviews widget') ||
            text.includes('remove branding') ||
            cls.includes('e-badge') ||
            cls.includes('BadgeContainer') ||
            cls.includes('eapps-widget-toolbar') ||
            cls.includes('FloatingBadge')
          ) {
            el.style.setProperty('display', 'none', 'important')
            el.remove?.()
          }
        })
      }

      const timer = setInterval(purgeBadge, 500)
      setTimeout(() => clearInterval(timer), 6000)
    }

    if (!section) {
      loadScript()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadScript()
          observer.disconnect()
        }
      },
      { rootMargin: '600px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [widgetId])

  // Featured spotlight review (Barkha Naik's culinary praise or first review)
  const featuredReview =
    reviews.find((r) => r.quote && r.quote.toLowerCase().includes('fish curry')) || reviews[0]

  // Remaining reviews for the horizontal ScrollTrigger reel
  const gridReviews = reviews.filter((r) => r !== featuredReview)

  // GSAP ScrollTrigger: Smooth horizontal scrub as user scrolls naturally (zero blank space!)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const el = trackRef.current
        const section = reelSectionRef.current
        if (!el || !section) return
        const scroller = el.parentElement

        // Calculate precise horizontal travel distance
        const amount = () => Math.max(0, el.scrollWidth - scroller.clientWidth)

        const tween = gsap.to(el, {
          x: () => -amount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })

        scrollTriggerRef.current = tween.scrollTrigger

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          scrollTriggerRef.current = null
        }
      })

      return () => mm.revert()
    },
    { scope: reelSectionRef, dependencies: [gridReviews.length] },
  )

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [gridReviews.length])

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-14 lg:pb-18 bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section Header with Goan Tavern Plaque */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-ink/10">
          <div className="max-w-2xl">
            <HeritageBadge kok="उलोवणी" label="In Their Words" />

            <h2 id="reviews-heading" className="mt-4 text-display-2 display-wonk text-ink leading-[1.08]">
              What people say after dinner.
            </h2>

            <p className="mt-3 text-base sm:text-lg text-ink-muted leading-relaxed">
              Unvarnished words from guests who pulled up a chair at our Curtorim tavern.
              All ratings are verified live from our Google Maps tavern listing.
            </p>
          </div>

          {/* Goan Tavern Google Plaque */}
          <div className="relative group shrink-0 rounded-[28px] border border-ink/12 bg-ivory p-6 sm:p-7 shadow-[0_12px_32px_-12px_rgba(24,18,12,0.09)] transition-all hoverable:hover:shadow-md hoverable:hover:border-chilli/40 max-w-sm w-full">
            <div className="absolute top-3.5 right-3.5 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
              <AzulejoCorner position="top-right" size={26} className="text-chilli" />
            </div>

            {/* Top row: Google Icon + Live Sync indicator */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2">
                <GoogleIcon className="size-4.5" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink/80">
                  Google Maps
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-emerald-800">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Listing</span>
              </div>
            </div>

            {/* Rating Number & Golden Stars */}
            <div className="flex items-baseline gap-3">
              <span className="font-display font-medium text-4xl sm:text-5xl text-ink tracking-tight">
                {typeof rating === 'number' ? rating.toFixed(1) : '5.0'}
              </span>
              <div>
                <div className="flex items-center gap-0.5 text-turmeric">
                  {Array.from({ length: Math.round(rating || 5) }).map((_, i) => (
                    <Star key={i} className="size-4.5 fill-current" />
                  ))}
                </div>
                <div className="mt-1 text-xs font-semibold text-ink-muted">
                  {reviewCount} Verified Reviews on Google
                </div>
              </div>
            </div>

            {/* Direct Interactive Actions */}
            <div className="mt-5 pt-4 border-t border-ink/10 flex items-center gap-2.5">
              <a
                href={site.writeReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-chilli px-4 py-2.5 text-xs font-semibold text-cream shadow-xs transition-all hover:bg-chilli/90 hoverable:hover:shadow-md"
              >
                <span>+ Write a Review</span>
                <span className="text-[0.75rem]">↗</span>
              </a>

              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1 rounded-full border border-ink/20 bg-cream/70 px-3.5 py-2.5 text-xs font-medium text-ink hover:border-chilli hover:text-chilli transition-all"
                title="Open Nizachem on Google Maps"
              >
                <span>Maps</span>
                <span className="text-[0.7rem]">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Featured Diner Spotlight Card */}
        {featuredReview && (
          <div className="mt-8 sm:mt-10 relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-chilli/25 bg-gradient-to-br from-ivory via-cream/80 to-ivory p-6 sm:p-8 lg:p-10 shadow-sm transition-all hoverable:hover:shadow-md">
            <div className="absolute top-4 right-4 opacity-25 pointer-events-none">
              <AzulejoCorner position="top-right" size={38} className="text-chilli" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-chilli/10 px-3 py-1 text-[0.72rem] font-semibold text-chilli uppercase tracking-wider mb-4">
                  <span>★</span>
                  <span>Featured Guest Experience</span>
                </div>

                <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl italic text-ink leading-snug">
                  &ldquo;{featuredReview.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {featuredReview.photo ? (
                    <img
                      src={featuredReview.photo}
                      alt={featuredReview.author}
                      className="size-12 rounded-full object-cover border-2 border-chilli/20 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-chilli text-cream font-bold text-base shadow-xs">
                      {featuredReview.initials || featuredReview.author[0]}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink text-base sm:text-lg">
                        {featuredReview.author}
                      </span>
                      <GoogleIcon className="size-4 shrink-0" />
                      <div className="flex items-center gap-0.5 text-turmeric">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-ink-muted flex items-center gap-2 mt-0.5">
                      <span>Google Maps Diner</span>
                      <span>·</span>
                      <span>{featuredReview.time || 'Verified Visit'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:pl-8 lg:border-l lg:border-ink/10 flex items-center">
                <a
                  href={featuredReview.authorUrl || site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-ivory px-5 py-2.5 text-xs font-semibold text-ink hover:border-chilli hover:text-chilli transition-all shadow-xs"
                >
                  <span>Read on Google Maps</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Sub-header cue for the horizontal reel */}
        <div className="mt-8 sm:mt-10 mb-3 flex items-center justify-between px-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            <span className="size-1.5 rounded-full bg-chilli" />
            <span>More Diner Impressions from Curtorim</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-ink/40 font-medium">
            <span>Scroll vertically to glide through reviews</span>
            <span>→</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          HORIZONTAL REVIEWS REEL WITH SCROLLTRIGGER & ATMOSPHERIC FADE CURTAINS
         ========================================================================= */}
      <div ref={reelSectionRef} className="relative w-full overflow-hidden mt-4 pb-2">
        {/* Left Atmospheric Gradient Curtain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 sm:w-24 lg:w-36 bg-gradient-to-r from-cream via-cream/80 to-transparent"
        />

        {/* Right Atmospheric Gradient Curtain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 sm:w-24 lg:w-36 bg-gradient-to-l from-cream via-cream/80 to-transparent"
        />

        {/* Scroller Container */}
        <div className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-none py-2">
          {/* Horizontal Track in One Line with w-max for Flawless ScrollTrigger Travel */}
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 sm:gap-7 w-max px-6 sm:px-12 lg:px-20"
          >
            {gridReviews.map((review, i) => (
              <div
                key={review.author + i}
                data-review-card
                className="w-[85vw] max-w-[420px] sm:w-[380px] lg:w-[410px] shrink-0 snap-center flex flex-col justify-between rounded-[26px] border border-ink/12 bg-ivory p-7 sm:p-8 shadow-xs transition-all duration-300 hoverable:hover:-translate-y-1.5 hoverable:hover:shadow-[0_20px_40px_-10px_rgba(24,18,12,0.12)] hoverable:hover:border-chilli/35 relative"
              >
                <div className="absolute top-3.5 right-3.5 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
                  <AzulejoCorner position="top-right" size={24} className="text-chilli" />
                </div>

                <div>
                  {/* Reviewer Header: Avatar + Name + Google Verification */}
                  <div className="flex items-center gap-3 mb-4">
                    {review.photo ? (
                      <img
                        src={review.photo}
                        alt={review.author}
                        className="size-11 rounded-full object-cover border border-ink/10 shadow-2xs"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-turmeric/15 text-turmeric-deep font-bold text-sm border border-turmeric/20">
                        {review.initials || review.author[0]}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-ink text-[0.95rem] truncate">
                          {review.author}
                        </span>
                        <GoogleIcon className="size-3.5 shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 text-[0.72rem] text-ink-muted">
                        <span>Google Maps</span>
                        <span>·</span>
                        <span>{review.time || 'Verified Visit'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-turmeric mb-3.5">
                    {Array.from({ length: Math.round(review.rating || 5) }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <blockquote className="font-display text-[1.12rem] sm:text-[1.18rem] leading-snug italic text-ink line-clamp-5">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Card Footer with Verified Diner & Link to Google Maps */}
                <footer className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-xs">
                  <div className="inline-flex items-center gap-1.5 text-sea font-medium text-[0.75rem]">
                    <span className="size-1.5 rounded-full bg-sea" />
                    <span>Verified Diner</span>
                  </div>
                  <a
                    href={review.authorUrl || site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-ink-soft hover:text-chilli transition-colors font-medium text-[0.75rem]"
                  >
                    <span>View on Google</span>
                    <span className="text-[0.7rem]">↗</span>
                  </a>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden Elfsight Container to maintain live script hydration without layout disruption */}
      {widgetId && (
        <div className="hidden" aria-hidden="true">
          <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy />
        </div>
      )}
    </section>
  )
}

export default Reviews
