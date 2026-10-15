import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  LayoutGrid,
  Layers,
  Sparkles,
  RotateCcw,
} from 'lucide-react'
import { site } from '@/content/site'
import { Head } from '@/components/ui/Head'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import { AzulejoCorner } from '@/components/svg/AzulejoCorner'
import { PaperClip } from '@/components/svg/StoryArtifacts'
import { getLenis } from '@/hooks/useSmoothScroll'
import { restaurantJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { Link } from 'react-router-dom'

// 12 Curated Archival Prints of Nizachem with unique vibrant paperclips
const galleryItems = [
  {
    id: 'facade',
    file: 'outside-view.jpg',
    webp: 'outside-view.webp',
    num: '01',
    konkaniNum: '०१',
    konkani: 'मुखेल दार',
    tag: 'Santemol Road Frontage',
    title: 'Cobalt & Terracotta Facade',
    desc: 'Traditional 12-pane grid windows, deep indigo timber shutters, and Portuguese tiles greeting the evening breeze.',
    aspect: '16 / 10',
    location: 'Maina, Curtorim',
    clipTone: 'blue',
    clipRotation: '-rotate-4',
  },
  {
    id: 'bar',
    file: 'inside-view-1.jpg',
    webp: 'inside-view-1.webp',
    num: '02',
    konkaniNum: '०२',
    konkani: 'चिऱ्याचो बार',
    tag: 'The Hearth Bar',
    title: 'Red Laterite & River Cane',
    desc: '140 hand-carved chira stone blocks backlit in warm amber with woven river reed counter where the cold feni pours.',
    aspect: '4 / 5',
    location: 'Bar Tavern',
    clipTone: 'gold',
    clipRotation: 'rotate-3',
  },
  {
    id: 'thali',
    file: 'dish-goan-fish-thali.jpg',
    webp: 'dish-goan-fish-thali.webp',
    num: '03',
    konkaniNum: '०३',
    konkani: 'नुस्ते थाळी',
    tag: 'Signature Plate',
    title: 'The Goan Fish Thali',
    desc: 'Fresh bangdo cooked in stone-ground coconut curry, crisp semolina rava fry, local red rice, and chilled sol kadi.',
    aspect: '4 / 3',
    location: 'Kitchen Hearth',
    clipTone: 'chilli',
    clipRotation: '-rotate-3',
  },
  {
    id: 'dining-hall',
    file: 'inside-view.jpg',
    webp: 'inside-view.webp',
    num: '04',
    konkaniNum: '०४',
    konkani: 'जेवणाचो साल',
    tag: 'The Dining Hall',
    title: 'Portuguese Diamond Tile Floor',
    desc: 'Hand-laid geometric ceramic diamond tiles cool underfoot on warm nights, framed by exposed indigo roof beams.',
    aspect: '16 / 9',
    location: 'Main Dining Room',
    clipTone: 'teal',
    clipRotation: 'rotate-5',
  },
  {
    id: 'masala',
    file: 'gallery-3.jpg',
    webp: 'gallery-3.webp',
    num: '05',
    konkaniNum: '०५',
    konkani: 'मसालो',
    tag: 'Daily Prep',
    title: 'Freshly Ground Masala',
    desc: 'Whole coriander, freshly toasted coconut, and Kashmiri chillies prepared fresh for our evening curries.',
    aspect: '1 / 1',
    location: 'Tavern Kitchen',
    clipTone: 'orange',
    clipRotation: '-rotate-4',
  },
  {
    id: 'chicken-xacuti',
    file: 'dish-chicken-xacuti.jpg',
    webp: 'dish-chicken-xacuti.webp',
    num: '06',
    konkaniNum: '०६',
    konkani: 'शाकुती',
    tag: 'Homestyle Classic',
    title: 'Homestyle Chicken Xacuti',
    desc: 'Eleven roasted spices, freshly grated coconut, and white poppy seeds slow-simmered the authentic Goan way.',
    aspect: '4 / 3',
    location: 'Tavern Kitchen',
    clipTone: 'amber',
    clipRotation: 'rotate-4',
  },
  {
    id: 'booths',
    file: 'inside-view-2.jpg',
    webp: 'inside-view-2.webp',
    num: '07',
    konkaniNum: '०७',
    konkani: 'सांज वेळ',
    tag: 'The Evening Booths',
    title: 'Tile-Inlaid Teak Tables',
    desc: 'Solid teak dining tables with handcrafted azulejo center trivets and woven Goan tapestries for private dinners.',
    aspect: '16 / 10',
    location: 'Tavern Booths',
    clipTone: 'purple',
    clipRotation: '-rotate-5',
  },
  {
    id: 'crab',
    file: 'dish-crab-xec-xec.jpg',
    webp: 'dish-crab-xec-xec.webp',
    num: '08',
    konkaniNum: '०८',
    konkani: 'खारवी खाण',
    tag: 'From the Nets',
    title: 'Mud Crab Xec Xec',
    desc: 'Fresh whole mud crab steeped in roasted spiced coconut gravy with black pepper, cloves, and star anise.',
    aspect: '4 / 3',
    location: 'Coastal Catch',
    clipTone: 'coral',
    clipRotation: 'rotate-3',
  },
  {
    id: 'cafreal',
    file: 'dish-chicken-cafreal.jpg',
    webp: 'dish-chicken-cafreal.webp',
    num: '09',
    konkaniNum: '०९',
    konkani: 'काफ्रियाल',
    tag: 'Village Skillet',
    title: 'Chicken Cafreal',
    desc: 'Chicken marinated in dark green coriander, Goan rum, and cinnamon, slow-seared on hot iron until blistered.',
    aspect: '16 / 10',
    location: 'Iron Skillet',
    clipTone: 'green',
    clipRotation: '-rotate-4',
  },
  {
    id: 'vindaloo',
    file: 'dish-prawn-vindaloo.jpg',
    webp: 'dish-prawn-vindaloo.webp',
    num: '10',
    konkaniNum: '१०',
    konkani: 'विंदालू',
    tag: 'Ancestral Pot',
    title: 'Goan Prawn Vindaloo',
    desc: 'Coastal prawns simmered in fiery palm toddy vinegar and red chillies with golden fried potatoes.',
    aspect: '1 / 1',
    location: 'Ancestral Pot',
    clipTone: 'rose',
    clipRotation: 'rotate-5',
  },
  {
    id: 'cashew-feni',
    file: 'gallery-4.jpg',
    webp: 'gallery-4.webp',
    num: '11',
    konkaniNum: '११',
    konkani: 'काजू फेणी',
    tag: 'The Tavern Pour',
    title: 'Curtorim Cashew Feni',
    desc: 'Distilled from fresh local cashew apples, served over crushed ice with fresh lime, slitted green chillies, and kokum.',
    aspect: '16 / 10',
    location: 'Laterite Stone Bar',
    clipTone: 'lime',
    clipRotation: '-rotate-3',
  },
  {
    id: 'bebinca',
    file: 'dish-bebinca.jpg',
    webp: 'dish-bebinca.webp',
    num: '12',
    konkaniNum: '१२',
    konkani: 'बेबिका',
    tag: 'Queen of Goan Desserts',
    title: 'Seven-Layer Bebinca',
    desc: 'Seven delicate layers of pure coconut milk, egg yolks, fragrant nutmeg, and caramelized sugar baked one by one.',
    aspect: '4 / 5',
    location: 'Dessert Larder',
    clipTone: 'cyan',
    clipRotation: 'rotate-4',
  },
]

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [viewMode, setViewMode] = useState('deck') // 'deck' | 'spread'
  const [isZoomed, setIsZoomed] = useState(false)

  const touchStartX = useRef(0)
  const closeZoomRef = useRef(null)

  const peekIndex = (currentIndex + 1) % galleryItems.length
  const currentItem = galleryItems[currentIndex]
  const peekItem = galleryItems[peekIndex]

  // Advance photo in deck
  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
  }, [])

  // Retreat photo in deck
  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }, [])

  // Jump to specific photo
  const handleSelect = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1)
    setCurrentIndex(idx)
    if (viewMode === 'spread') {
      setViewMode('deck')
    }
  }

  // Susegad Autoplay (4.5s pace)
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      handleNext()
    }, 4500)
    return () => clearInterval(timer)
  }, [isPlaying, handleNext])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev, isZoomed])

  // Scroll lock when modal is open
  useEffect(() => {
    if (isZoomed) {
      document.documentElement.style.overflow = 'hidden'
      getLenis()?.stop()
      closeZoomRef.current?.focus()
    } else {
      document.documentElement.style.overflow = ''
      getLenis()?.start()
    }
  }, [isZoomed])

  // Mobile Swipe Gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 40) handleNext()
    else if (diff < -40) handlePrev()
  }

  return (
    <>
      <Head
        title="Visual Chronicle — Archival Photo Deck | Nizachem"
        description="A tactile visual chronicle inside Nizachem: Portuguese tiles, red laterite bar, and ancestral Goan cooking in Curtorim."
        path="/gallery"
        jsonLd={[
          restaurantJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/gallery' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `${site.name} gallery`,
          },
        ]}
      />

      {/* Outer Page Container: Uses the signature warm cream color matching the site & footer */}
      <article className="relative bg-cream min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden select-none">
        {/* Subtle Ambient Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[min(94vw,1100px)] rounded-full bg-gradient-to-b from-chilli/10 via-turmeric/8 to-transparent blur-3xl opacity-70"
        />

        {/* Azulejo Corner Ornaments */}
        <div className="absolute top-6 left-6 pointer-events-none opacity-30 hidden sm:block">
          <AzulejoCorner position="top-left" size={54} className="text-chilli" />
        </div>
        <div className="absolute top-6 right-6 pointer-events-none opacity-30 hidden sm:block">
          <AzulejoCorner position="top-right" size={54} className="text-chilli" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          {/* =========================================================================
              EDITORIAL HEADER & VIEW CONTROLS
             ========================================================================= */}
          <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-ink/10">
            <div>
              <HeritageBadge
                kok="आमची नदर"
                label="Physical Photo Archive"
                color="sea"
                className="mb-3"
              />
              <h1 className="font-display text-3xl sm:text-5xl font-light text-ink display-wonk leading-tight">
                A Visual Chronicle{' '}
                <span className="italic font-serif text-chilli font-normal">
                  on the Balcão.
                </span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-ink-soft max-w-xl">
                Click any photograph to deal the next print from our tavern archive, or spread them all across the table.
              </p>
            </div>

            {/* Deck vs Spread Mode & Autoplay */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isPlaying
                    ? 'bg-chilli text-cream shadow-sm scale-102'
                    : 'border border-ink/20 bg-ivory text-ink hover:bg-cream-deep'
                }`}
                title="Gently shuffle photos at susegad pace"
              >
                {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                <span>{isPlaying ? 'Susegad Playing' : 'Auto Shuffle'}</span>
              </button>

              <div className="inline-flex rounded-full border border-ink/15 bg-ivory p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('deck')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    viewMode === 'deck'
                      ? 'bg-ink text-cream shadow-xs'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <Layers className="size-3" />
                  <span>Photo Deck</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('spread')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    viewMode === 'spread'
                      ? 'bg-ink text-cream shadow-xs'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <LayoutGrid className="size-3" />
                  <span>Spread Table</span>
                </button>
              </div>
            </div>
          </header>

          {/* =========================================================================
              MODE 1: THE TACTILE SHUFFLING CARD DECK (CLICK TO REVEAL ONE BY ONE)
             ========================================================================= */}
          {viewMode === 'deck' ? (
            <div className="mt-8 sm:mt-14">
              {/* THE SHUFFLE STAGE */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative mx-auto w-full max-w-[880px] min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center py-4"
              >
                {/* 3. Deep Background Peek Card */}
                <div
                  aria-hidden="true"
                  className="absolute w-[86vw] max-w-[760px] aspect-[16/11] sm:aspect-[16/10] rounded-[28px] sm:rounded-[36px] bg-[#EFE9DC] border border-ink/15 shadow-[0_12px_28px_rgba(24,18,12,0.06)] transform translate-y-7 -rotate-3 scale-[0.92] opacity-50 pointer-events-none transition-transform duration-500"
                />

                {/* 2. Intermediate Peek Card — Always shows the incoming photo (e.g. Photo 2) during transition */}
                <div
                  aria-hidden="true"
                  className="absolute w-[88vw] max-w-[780px] aspect-[16/11] sm:aspect-[16/10] transform translate-y-3.5 rotate-2 scale-[0.96] opacity-80 pointer-events-none transition-transform duration-500 overflow-visible"
                >
                  {/* Incoming Card Paperclip Back Wire Layer (z-0, behind card) */}
                  <div className={`absolute -top-6 left-10 sm:left-14 z-0 pointer-events-none transform ${peekItem?.clipRotation || 'rotate-4'}`}>
                    <PaperClip layer="back" tone={peekItem?.clipTone || 'gold'} width={28} height={58} className="opacity-75" />
                  </div>

                  {/* Card Face (z-10) */}
                  <div className="relative z-10 p-3 sm:p-4 size-full overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#F5EFE3] border border-ink/15 shadow-[0_18px_38px_rgba(24,18,12,0.1)]">
                    <div className="size-full rounded-[22px] sm:rounded-[28px] overflow-hidden bg-cream-deep">
                      <img
                        src={`/photos/${peekItem.file}`}
                        alt=""
                        className="size-full object-cover filter blur-[0.5px] opacity-75"
                      />
                    </div>
                  </div>

                  {/* Incoming Card Paperclip Front Clamping Wire Layer (z-20, in front of card) */}
                  <div className={`absolute -top-6 left-10 sm:left-14 z-20 pointer-events-none transform ${peekItem?.clipRotation || 'rotate-4'}`}>
                    <PaperClip layer="front" tone={peekItem?.clipTone || 'gold'} width={28} height={58} className="opacity-75" />
                  </div>
                </div>

                {/* 1. TOP ACTIVE CARD IN DECK — CLICK DIRECTLY TO SHUFFLE/ADVANCE */}
                <div className="relative z-20 w-[90vw] max-w-[800px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentItem.id}
                      custom={direction}
                      variants={{
                        enter: (dir) => ({
                          x: dir > 0 ? 80 : -80,
                          opacity: 0,
                          scale: 0.95,
                          rotate: dir > 0 ? 2 : -2,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                          transition: {
                            x: { type: 'spring', stiffness: 280, damping: 28 },
                            opacity: { duration: 0.28 },
                            scale: { duration: 0.32 },
                          },
                        },
                        exit: (dir) => ({
                          x: dir > 0 ? -120 : 120,
                          opacity: 0,
                          scale: 0.94,
                          rotate: dir > 0 ? -4 : 4,
                          transition: { duration: 0.25 },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      onClick={handleNext}
                      role="button"
                      tabIndex={0}
                      aria-label="Click photo to shuffle to the next photograph"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleNext()
                      }}
                      className="group relative cursor-pointer overflow-visible"
                    >
                      {/* Photorealistic Metallic Wire Paperclip Back Wire Layer (z-0, behind card edge) */}
                      <div className={`absolute -top-7 sm:-top-8 left-10 sm:left-14 z-0 pointer-events-none transform ${currentItem.clipRotation || '-rotate-3'}`}>
                        <PaperClip layer="back" tone={currentItem.clipTone || 'gold'} width={32} height={66} />
                      </div>

                      {/* Card Body (z-10) — Solid Polaroid card mount physically sandwiched inside paperclip */}
                      <div className="relative z-10 rounded-[28px] sm:rounded-[38px] bg-[#FCFAF6] border border-ink/18 p-3.5 sm:p-5 pt-4 sm:pt-5.5 shadow-[0_28px_65px_-15px_rgba(24,18,12,0.22),0_6px_20px_rgba(24,18,12,0.08)] transition-all duration-300 group-hover:shadow-[0_36px_80px_-15px_rgba(24,18,12,0.28)] group-hover:scale-[1.01]">
                        {/* Photo Image Canvas */}
                        <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden rounded-[20px] sm:rounded-[28px] bg-cream-deep border border-ink/10">
                          <picture className="contents">
                            <source type="image/webp" srcSet={`/photos/${currentItem.webp}`} />
                            <img
                              src={`/photos/${currentItem.file}`}
                              alt={currentItem.title}
                              loading="eager"
                              decoding="async"
                              className="size-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-103"
                            />
                          </picture>

                          {/* Top Left Konkani Tag Badge */}
                          <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
                            <div className="flex items-center gap-2 rounded-full bg-cream/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-ink border border-ink/15 shadow-sm">
                              <span className="font-mono text-chilli">{currentItem.konkaniNum}</span>
                              <span className="size-1 rounded-full bg-ink/30" />
                              <span lang="kok" className="font-serif text-ink font-medium">
                                {currentItem.konkani}
                              </span>
                            </div>
                          </div>

                          {/* Top Right Zoom Fullscreen Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsZoomed(true)
                            }}
                            className="absolute top-3.5 right-3.5 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-ivory/95 backdrop-blur-md text-ink border border-ink/15 shadow-sm transition-transform duration-200 hover:scale-110 hover:bg-chilli hover:text-cream cursor-pointer"
                            title="View high-resolution"
                            aria-label="View high-resolution photograph"
                          >
                            <Maximize2 className="size-4" />
                          </button>

                          {/* Floating Click-To-Advance Tooltip Badge */}
                          <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none flex items-center gap-1.5 rounded-full bg-ink/85 backdrop-blur-md px-3.5 py-1.5 text-[0.72rem] font-medium text-cream shadow-md transition-transform duration-300 group-hover:scale-105">
                            <span className="text-turmeric">Click photo for next</span>
                            <span>→</span>
                          </div>
                        </div>

                        {/* Handwritten / Archival Note on the bottom white margin */}
                        <div className="mt-4 px-2 pb-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-ink/8 pt-3">
                          <div>
                            <div className="flex items-center gap-2 text-[0.7rem] font-mono text-sea font-bold uppercase tracking-wider">
                              <span>{currentItem.tag}</span>
                              <span>·</span>
                              <span className="text-ink-soft">{currentItem.location}</span>
                            </div>
                            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium mt-0.5">
                              {currentItem.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-ink-soft mt-1 leading-relaxed max-w-xl">
                              {currentItem.desc}
                            </p>
                          </div>

                          {/* Frame Counter Pill */}
                          <div className="shrink-0 self-end sm:self-center">
                            <span className="inline-flex items-center rounded-full bg-cream-deep px-3 py-1 font-mono text-xs font-bold text-ink border border-ink/10">
                              {currentItem.num} / {String(galleryItems.length).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Photorealistic Metallic Wire Paperclip Front Clamping Wire Layer (z-20, clamping in front) */}
                      <div className={`absolute -top-7 sm:-top-8 left-10 sm:left-14 z-20 pointer-events-none transform ${currentItem.clipRotation || '-rotate-3'}`}>
                        <PaperClip layer="front" tone={currentItem.clipTone || 'gold'} width={32} height={66} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Left & Right Physical Arrow Buttons */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photograph"
                  className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 flex size-11 sm:size-13 items-center justify-center rounded-full border border-ink/18 bg-ivory text-ink shadow-[0_8px_24px_rgba(24,18,12,0.12)] transition-all duration-200 hover:scale-110 hover:bg-ink hover:text-cream cursor-pointer"
                >
                  <ChevronLeft className="size-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photograph"
                  className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 flex size-11 sm:size-13 items-center justify-center rounded-full border border-ink/18 bg-ivory text-ink shadow-[0_8px_24px_rgba(24,18,12,0.12)] transition-all duration-200 hover:scale-110 hover:bg-ink hover:text-cream cursor-pointer"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>

              {/* TACTILE THUMBNAIL FILMSTRIP ALONG THE BOTTOM */}
              <div className="mx-auto mt-6 sm:mt-10 max-w-[880px]">
                <div className="flex items-center justify-between pb-2.5 px-1">
                  <span className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-soft font-bold">
                    Archival Deck Index
                  </span>
                  <span className="text-xs text-ink-soft">
                    Tap any print to pull it to the top
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-3 pt-1">
                  {galleryItems.map((item, idx) => {
                    const isSelected = currentIndex === idx
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        aria-label={`Select frame ${item.num}: ${item.title}`}
                        className={`group relative w-[calc((100%-3*0.5rem)/4)] sm:w-[calc((100%-5*0.625rem)/6)] lg:w-[calc((100%-6*0.625rem)/7)] aspect-[16/10] overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'border-chilli ring-2 ring-chilli/35 scale-105 shadow-md z-10 opacity-100'
                            : 'border-ink/15 opacity-60 hover:opacity-100 hover:border-ink/35 hover:scale-102'
                        }`}
                      >
                        <img
                          src={`/photos/${item.file}`}
                          alt=""
                          className="size-full object-cover select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
                        <span className={`absolute bottom-1 left-1.5 font-mono text-[0.65rem] font-bold ${isSelected ? 'text-turmeric' : 'text-cream'}`}>
                          {item.num}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
                MODE 2: SPREAD OUT ON TABLE (ALL 12 PRINTS SPREAD ON CREAM CANVAS)
               ========================================================================= */
            <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {galleryItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  className={`group relative cursor-pointer overflow-visible transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 transform ${
                    idx % 3 === 0 ? '-rotate-1' : idx % 3 === 1 ? 'rotate-1' : '-rotate-0.5'
                  }`}
                >
                  {/* Paperclip Back Wire Layer (z-0, behind card edge) */}
                  <div className={`absolute -top-5 left-6 z-0 pointer-events-none transform ${item.clipRotation || '-rotate-3'}`}>
                    <PaperClip layer="back" tone={item.clipTone || 'gold'} width={26} height={54} />
                  </div>

                  {/* Card Body (z-10, sandwiched inside clip) */}
                  <div className="relative z-10 rounded-[24px] bg-[#FCFAF6] border border-ink/15 p-3.5 sm:p-4 shadow-[0_14px_36px_-10px_rgba(24,18,12,0.12)] transition-shadow duration-300 group-hover:shadow-[0_24px_55px_-12px_rgba(24,18,12,0.22)]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-cream-deep border border-ink/10">
                      <picture className="contents">
                        <source type="image/webp" srcSet={`/photos/${item.webp}`} />
                        <img
                          src={`/photos/${item.file}`}
                          alt={item.title}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </picture>

                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-cream/95 backdrop-blur-md px-2.5 py-1 text-[0.68rem] font-bold text-ink border border-ink/10">
                        <span className="font-mono text-chilli">{item.num}</span>
                        <span>·</span>
                        <span lang="kok">{item.konkani}</span>
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-chilli text-cream font-semibold px-2.5 py-1 text-[0.68rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                        <span>Deal This</span>
                        <span>→</span>
                      </div>
                    </div>

                    <div className="mt-3 px-1 pb-1">
                      <span className="font-mono text-[0.68rem] uppercase tracking-wider text-sea font-bold block">
                        {item.tag}
                      </span>
                      <h3 className="font-display text-lg text-ink font-medium mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-ink-soft line-clamp-2 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Paperclip Front Clamping Wire Layer (z-20, in front of card) */}
                  <div className={`absolute -top-5 left-6 z-20 pointer-events-none transform ${item.clipRotation || '-rotate-3'}`}>
                    <PaperClip layer="front" tone={item.clipTone || 'gold'} width={26} height={54} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =========================================================================
              BOTTOM INVITATION TRANSITION (SEAMLESSLY MEETS FOOTER WAVE)
             ========================================================================= */}
          <section className="mt-16 sm:mt-24 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-serif italic text-lg text-ink font-medium">
                Come sit at our table in Maina, Curtorim.
              </p>
              <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
                Dinner 7:00 pm – 11:00 pm · Closed Thursdays
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/story"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-ivory px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink hover:bg-cream-deep hover:border-ink/40 transition-colors shadow-xs"
              >
                <span>Read our story</span>
                <span className="text-chilli">→</span>
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-1.5 rounded-full bg-chilli text-cream px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-chilli/90 transition-colors shadow-sm"
              >
                <span>View menu</span>
                <span>→</span>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* =========================================================================
          FULL-SCREEN HIGH-RES LIGHTBOX MODAL
         ========================================================================= */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer — ${currentItem.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-80 flex flex-col bg-ink/95 backdrop-blur-xl px-4 py-4 sm:px-8 sm:py-6"
          >
            {/* Top Modal Header */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-turmeric animate-pulse" />
                <p className="kicker text-cream/90 text-xs sm:text-sm">
                  {currentItem.tag}
                </p>
                <span className="text-cream/40 hidden sm:inline">·</span>
                <p className="text-sm font-medium text-cream hidden sm:inline">
                  {currentItem.title}
                </p>
              </div>

              <button
                ref={closeZoomRef}
                type="button"
                onClick={() => setIsZoomed(false)}
                aria-label="Close photo viewer"
                className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full border border-cream/30 bg-cream/10 text-cream transition-all duration-300 hover:bg-cream hover:text-ink cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Center Stage: Photo Display & Controls */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden py-3 sm:py-4">
              <motion.div
                key={currentItem.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-[min(980px,94vw)] flex items-center justify-center"
              >
                <picture className="contents">
                  <source type="image/webp" srcSet={`/photos/${currentItem.webp}`} />
                  <img
                    src={`/photos/${currentItem.file}`}
                    alt={currentItem.title}
                    className="max-h-[70svh] sm:max-h-[76svh] w-auto max-w-full object-contain rounded-[18px] sm:rounded-[24px] border border-cream/20 shadow-2xl"
                  />
                </picture>
              </motion.div>

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="absolute left-2 sm:left-6 flex size-11 sm:size-13 items-center justify-center rounded-full border border-cream/25 bg-ink/75 backdrop-blur-sm text-cream transition-all duration-300 hover:bg-cream hover:text-ink cursor-pointer shadow-lg"
              >
                <ChevronLeft className="size-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photograph"
                className="absolute right-2 sm:right-6 flex size-11 sm:size-13 items-center justify-center rounded-full border border-cream/25 bg-ink/75 backdrop-blur-sm text-cream transition-all duration-300 hover:bg-cream hover:text-ink cursor-pointer shadow-lg"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            {/* Bottom Caption & Counter */}
            <div className="flex flex-col items-center text-center gap-2">
              <div className="max-w-xl px-2">
                <p className="text-xs sm:text-sm text-cream font-medium">
                  {currentItem.title}
                </p>
                <p className="text-[0.74rem] sm:text-xs text-cream/70 line-clamp-2 mt-0.5">
                  {currentItem.desc}
                </p>
              </div>

              <span className="text-[0.72rem] font-mono text-cream/50 tabular-nums">
                {currentIndex + 1} / {galleryItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
