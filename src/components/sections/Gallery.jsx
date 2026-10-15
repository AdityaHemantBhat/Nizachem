import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/animations/setup'
import { site } from '@/content/site'
import { getLenis } from '@/hooks/useSmoothScroll'
import { Photo } from '@/components/ui/Photo'
import { Button } from '@/components/ui/Button'
import { HeritageBadge } from '@/components/ui/HeritageBadge'

// Rich architectural metadata for tavern spaces
const architecturalSpaces = [
  {
    num: '01',
    konkani: 'मुखेल दार',
    tag: 'Santemol Road Frontage',
    title: 'Cobalt & Terracotta Facade',
    desc: 'Hand-painted Portuguese Azulejo tiles and traditional 12-pane wooden grid windows facing the paddy breeze.',
    file: 'outside-view.jpg',
    alt: 'Nizachem Restaurant & Bar building with cobalt blue windows in Curtorim',
    label: 'Photo: our newly opened tavern',
  },
  {
    num: '02',
    konkani: 'चिऱ्याचो बार',
    tag: 'The Hearth Bar',
    title: 'Red Laterite & River Cane',
    desc: '140 hand-carved chira stone blocks backlit in warm twilight amber with woven river cane counter.',
    file: 'inside-view-1.jpg',
    alt: 'Cane wicker bar counter with backlit red laterite stone arch',
    label: 'Photo: the laterite stone bar',
  },
  {
    num: '03',
    konkani: 'जेवणाचो साल',
    tag: 'The Dining Hall',
    title: 'Portuguese Diamond Tile Floor',
    desc: 'Geometric diamond ceramic tiles naturally cool underfoot, framed by indigo-timber rafters.',
    file: 'inside-view.jpg',
    alt: 'Dining room with Portuguese tile floor and blue ceiling beams',
    label: 'Photo: the dining hall',
  },
  {
    num: '04',
    konkani: 'सांज वेळ',
    tag: 'The Evening Booths',
    title: 'Tile-Inlaid Teak Tables',
    desc: 'Solid teak with handcrafted azulejo center trivets, framed by woven Goan kunbi tapestries.',
    file: 'inside-view-2.jpg',
    alt: 'Booth seating with Goan woven tapestries and tile-inlaid tables',
    label: 'Photo: evening booths',
  },
  {
    num: '05',
    konkani: 'मसालो',
    tag: 'Kitchen Prep',
    title: 'Freshly Ground Masala',
    desc: 'Freshly ground coriander, roasted coconut, and dry Kashmiri chillies prepared fresh for our curries.',
    file: 'gallery-3.jpg',
    alt: 'Masala prepared fresh for the evening curries',
    label: 'Photo: fresh masala prep',
  },
  {
    num: '06',
    konkani: 'नुस्ते थाळी',
    tag: 'The Daily Table',
    title: 'The Goan Fish Thali',
    desc: 'Fresh bangdo curry, semolina rava fry, local boiled red rice, pickle, and digestive sol kadi.',
    file: 'dish-goan-fish-thali.jpg',
    alt: 'Goan fish thali with curry, rice and fried fish',
    label: 'Photo: fish thali',
  },
  {
    num: '07',
    konkani: 'काफ्रियाल',
    tag: 'Village Skillet',
    title: 'Chicken Cafreal',
    desc: 'Chicken marinated in dark green coriander, rum, and cinnamon, slow-seared on hot iron until blistered.',
    file: 'dish-chicken-cafreal.jpg',
    alt: 'Chicken Cafreal seared in green coriander masala',
    label: 'Photo: chicken cafreal',
  },
  {
    num: '08',
    konkani: 'खारवी खाण',
    tag: 'From the Nets',
    title: 'Mud Crab Xec Xec',
    desc: 'Fresh whole mud crab steeped in roasted spiced coconut gravy with black pepper and cloves.',
    file: 'dish-crab-xec-xec.jpg',
    alt: 'Crab Xec Xec in roasted red coconut masala',
    label: 'Photo: crab xec xec',
  },
]

export function Gallery({
  photos = site.gallery,
  limit,
  showHeader = true,
  heading = 'A look inside.',
}) {
  const rawList = limit ? (photos || site.gallery).slice(0, limit) : photos || site.gallery

  // Merge photo data with architectural metadata
  const list = rawList.map((photo, i) => {
    const meta =
      architecturalSpaces.find((s) => s.file === photo.file) ||
      architecturalSpaces[i] ||
      {}
    return {
      ...meta,
      ...photo,
      num: String(i + 1).padStart(2, '0'),
      title: meta.title || photo.label || `Space 0${i + 1}`,
      konkani: meta.konkani || 'नदर',
      tag: meta.tag || 'Curtorim Tavern',
      desc: meta.desc || photo.alt || 'Captured at Nizachem in Curtorim, Goa.',
    }
  })

  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [pinned, setPinned] = useState(false)

  // Lightbox state
  const [index, setIndex] = useState(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  const close = useCallback(() => {
    setIndex(null)
    lastFocused.current?.focus?.()
  }, [])

  const step = useCallback(
    (dir) => setIndex((current) => (current + dir + list.length) % list.length),
    [list.length],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    getLenis()?.stop()
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      getLenis()?.start()
    }
  }, [index, close, step])

  const open = (i, event) => {
    lastFocused.current = event.currentTarget
    setIndex(i)
  }

  // GSAP ScrollTrigger: Horizontal scrub pinned to vertical page scroll
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const el = trackRef.current
        const section = sectionRef.current
        if (!el || !section) return
        const scroller = el.parentElement

        // Precise horizontal travel calculation so all cards glide completely across
        const amount = () => Math.max(0, el.scrollWidth - scroller.clientWidth)

        const tween = gsap.to(el, {
          x: () => -amount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 72px',
            end: () => `+=${Math.max(650, Math.round(amount() * 0.8))}`,
            pin: true,
            scrub: 0.25,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress)
              const idx = Math.min(
                list.length - 1,
                Math.max(0, Math.round(self.progress * (list.length - 1))),
              )
              setActiveIndex(idx)
            },
          },
        })

        scrollTriggerRef.current = tween.scrollTrigger
        setPinned(true)

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          scrollTriggerRef.current = null
          setPinned(false)
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [list.length] },
  )

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [pinned])

  const scrollerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Mobile horizontal scroll tracking
  const handleMobileScroll = (e) => {
    if (pinned) return
    const el = e.currentTarget
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll > 0) {
      const prog = el.scrollLeft / maxScroll
      setProgress(prog)
      const idx = Math.min(list.length - 1, Math.max(0, Math.round(prog * (list.length - 1))))
      setActiveIndex(idx)
      setCanScrollLeft(el.scrollLeft > 10)
      setCanScrollRight(el.scrollLeft < maxScroll - 10)
    }
  }

  const scrollByCard = (dir) => {
    const el = scrollerRef.current
    if (!el) return

    if (pinned) {
      window.scrollBy({ top: dir * 320, behavior: 'smooth' })
      return
    }

    const card = el.querySelector('[data-gallery-card]')
    const step = card ? card.offsetWidth + 24 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // Pointer drag to scroll for mouse & touch
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeftPos = useRef(0)

  const onPointerDown = (e) => {
    if (pinned) return
    isDown.current = true
    startX.current = e.pageX - (scrollerRef.current?.offsetLeft || 0)
    scrollLeftPos.current = scrollerRef.current?.scrollLeft || 0
  }

  const onPointerMove = (e) => {
    if (!isDown.current || pinned) return
    const x = e.pageX - (scrollerRef.current?.offsetLeft || 0)
    const walk = (x - startX.current) * 1.4
    if (scrollerRef.current) scrollerRef.current.scrollLeft = scrollLeftPos.current - walk
  }

  const onPointerUp = () => {
    isDown.current = false
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden bg-cream pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {showHeader && (
          <div className="flex flex-wrap items-end justify-between gap-6 pb-6 sm:pb-8">
            <div className="max-w-xl">
              <HeritageBadge
                kok="नदर"
                label="A Glimpse of Nizachem"
                color="sea"
              />
              <h2 id="gallery-heading" className="mt-4 text-display-2 display-wonk text-ink">
                {heading}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-ink-muted">
                Wander through the spaces built by our own hands in Curtorim — swipe or scroll to explore each room.
              </p>
            </div>

            {/* Interactive Navigation & Swipe Indicator */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Prominent Swipe Pill: Never wraps */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-sea/25 bg-ivory/95 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-2xs select-none whitespace-nowrap shrink-0">
                <span className="inline-block size-2 rounded-full bg-sea animate-ping shrink-0" />
                <span>Swipe to explore</span>
                <span className="font-bold text-sea ml-0.5 animate-pulse">→</span>
              </div>

              {/* Tap Arrow Buttons for Quick Horizontal Browsing */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  disabled={!pinned && !canScrollLeft}
                  aria-label="Previous room photo"
                  className="size-9 sm:size-10 rounded-full border border-ink/15 bg-ivory text-ink flex items-center justify-center hover:bg-cream hover:border-sea/40 active:scale-95 transition-all shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="size-4.5 stroke-current stroke-2 fill-none"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  disabled={!pinned && !canScrollRight}
                  aria-label="Next room photo"
                  className="size-9 sm:size-10 rounded-full border border-ink/15 bg-ivory text-ink flex items-center justify-center hover:bg-cream hover:border-sea/40 active:scale-95 transition-all shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="size-4.5 stroke-current stroke-2 fill-none"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          MIDDLE STAGE: HORIZONTAL BOX CARDS WITH SOFT LEFT & RIGHT FADING
         ========================================================================= */}
      <div className="relative w-full overflow-hidden mt-4 sm:mt-6 py-2">
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
        <div
          ref={scrollerRef}
          data-lenis-prevent="true"
          onScroll={handleMobileScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
            overscrollBehaviorX: 'contain',
          }}
          className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2 cursor-grab active:cursor-grabbing"
        >
          {/* Horizontal Track with Intrinsic Max Width for Flawless ScrollTrigger Travel */}
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 w-max px-6 sm:px-12 lg:px-24"
          >
            {list.map((item, i) => {
              const isCenter = activeIndex === i

              return (
                <div
                  key={item.file || i}
                  data-gallery-card
                  className="flex-none snap-center"
                >
                  <button
                    type="button"
                    onClick={(event) => open(i, event)}
                    aria-label={`Inspect ${item.title} (${item.tag})`}
                    className="group relative block text-left cursor-zoom-in focus:outline-hidden"
                  >
                    {/* Clean Box-Type Architectural Frame (Zero Arch Cutouts) */}
                    <div
                      className={`relative w-[82vw] max-w-[480px] sm:w-[440px] lg:w-[480px] rounded-[24px] sm:rounded-[28px] bg-ivory p-3 sm:p-3.5 border transition-all duration-500 ease-out ${isCenter
                          ? 'border-ink/25 shadow-[0_20px_48px_-12px_rgba(24,18,12,0.18)] scale-100'
                          : 'border-ink/10 shadow-[0_10px_28px_-10px_rgba(24,18,12,0.1)] opacity-90 hover:opacity-100 hover:border-ink/20'
                        }`}
                    >
                      {/* Image Box with Landscape Ratio */}
                      <div className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[22px] bg-cream-deep aspect-[16/10]">
                        <Photo
                          photo={item}
                          ratio={null}
                          sizes="(min-width: 1024px) 480px, 85vw"
                          className="size-full"
                          imgClassName="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Top Left Space Tag Badge */}
                        <div className="absolute top-3 left-3 z-10 pointer-events-none">
                          <div className="flex items-center gap-2 rounded-full bg-cream/92 backdrop-blur-md px-3 py-1 text-[0.7rem] font-bold text-ink shadow-xs border border-ink/10">
                            <span className="font-mono text-terracotta">{item.num}</span>
                            <span className="size-1 rounded-full bg-ink/30" />
                            <span lang="kok" className="font-medium text-ink/80">
                              {item.konkani}
                            </span>
                          </div>
                        </div>

                        {/* Top Right Zoom Badge */}
                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-ink/75 backdrop-blur-md px-2.5 py-1 text-[0.68rem] font-medium text-cream shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs">⤢</span>
                          <span>Inspect</span>
                        </div>
                      </div>

                      {/* Clean Architectural Placard (Box Type Typography) */}
                      <div className="mt-3.5 px-2 pb-1.5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[0.68rem] sm:text-[0.72rem] font-bold uppercase tracking-wider text-sea">
                            {item.tag}
                          </span>
                          <span className="text-[0.68rem] font-mono font-medium text-ink/40">
                            Space {item.num} of 0{list.length}
                          </span>
                        </div>

                        <h3 className="mt-1 font-display text-lg sm:text-xl font-medium text-ink leading-snug">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs sm:text-[0.82rem] text-ink-muted leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>



      {/* =========================================================================
          HIGH-RES LIGHTBOX MODAL
         ========================================================================= */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer — ${list[index].title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-80 flex flex-col bg-ink/95 backdrop-blur-md px-4 py-4 sm:px-8 sm:py-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-turmeric" />
                <p className="kicker text-cream/90">{list[index].tag}</p>
                <span className="text-cream/40">·</span>
                <p className="text-sm font-medium text-cream">{list[index].title}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close photo viewer"
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/30 bg-cream/10 text-cream transition-all duration-300 hoverable:hover:bg-cream hoverable:hover:text-ink cursor-pointer"
              >
                <span aria-hidden className="text-xl leading-none">
                  ×
                </span>
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden py-4">
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-[min(940px,94vw)]"
              >
                <Photo
                  photo={list[index]}
                  ratio="16 / 10"
                  priority
                  sizes="94vw"
                  imgClassName="object-contain rounded-[20px]"
                  className="max-h-[76svh] border border-cream/20 rounded-[20px] shadow-2xl"
                />
              </motion.div>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-6 flex size-12 items-center justify-center rounded-full border border-cream/25 bg-ink/60 backdrop-blur-sm text-cream transition-all duration-300 hoverable:hover:bg-cream hoverable:hover:text-ink cursor-pointer"
              >
                <span aria-hidden className="text-lg">
                  ←
                </span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-2 sm:right-6 flex size-12 items-center justify-center rounded-full border border-cream/25 bg-ink/60 backdrop-blur-sm text-cream transition-all duration-300 hoverable:hover:bg-cream hoverable:hover:text-ink cursor-pointer"
              >
                <span aria-hidden className="text-lg">
                  →
                </span>
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-cream/80 max-w-lg mx-auto">
                {list[index].desc}
              </p>
              <p className="mt-1 text-[0.8rem] tabular-nums text-cream/50">
                {index + 1} / {list.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
