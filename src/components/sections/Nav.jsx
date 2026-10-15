import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { site } from '@/content/site'
import { getLenis } from '@/hooks/useSmoothScroll'
import { Button } from '@/components/ui/Button'
import { NizachemForkLogo } from '@/components/svg/NizachemForkLogo'
import { WashiTape } from '@/components/svg/StoryArtifacts'

const links = [
  { label: 'Menu', to: '/menu', kok: 'जेवण', num: '01', desc: 'Family thalis & ancestral recipes' },
  { label: 'Story', to: '/story', kok: 'आमची गोष्ट', num: '02', desc: 'Generations of home cooking' },
  { label: 'Gallery', to: '/gallery', kok: 'चित्रां', num: '03', desc: 'The tavern, courtyard & kitchen' },
  { label: 'Contact', to: '/contact', kok: 'संपर्क', num: '04', desc: 'Directions, hours & inquiries' },
]

const preloadMap = {
  '/menu': () => import('@/pages/MenuPage'),
  '/story': () => import('@/pages/StoryPage'),
  '/gallery': () => import('@/pages/GalleryPage'),
  '/contact': () => import('@/pages/ContactPage'),
  '/book': () => import('@/pages/BookPage'),
}

export function preloadRoute(path) {
  try {
    preloadMap[path]?.()
  } catch { }
}

/**
 * Sculpted Goan coastal wave SVG path — 3-pod organic fluid dock.
 * Both top and bottom edges feature continuous, harmonic wave crests and troughs
 * across the Brand, Nav Links, and Reserve Table sections, giving an authentic
 * sculpted liquid-glass feel with ample breathing room above and below Reserve Table.
 */
const PATH_DEFAULT =
  'M 18,43 C 18,22 35,5 62,5 C 130,5 190,4 270,4 C 330,4 370,8.5 425,8.5 C 480,8.5 535,5 615,5 C 695,5 750,8.5 805,8.5 C 860,8.5 915,4 985,4 C 1055,4 1105,4 1138,5 C 1170,5 1192,22 1192,43 C 1192,64 1170,81 1138,81 C 1105,82 1055,82 985,82 C 915,82 860,77.5 805,77.5 C 750,77.5 695,81 615,81 C 535,81 480,77.5 425,77.5 C 370,77.5 330,82 270,82 C 190,82 130,81 62,81 C 35,81 18,64 18,43 Z'

const PATH_SCROLLED =
  'M 18,43 C 18,22 35,5.5 62,5.5 C 130,5.5 190,4.5 270,4.5 C 330,4.5 370,8 425,8 C 480,8 535,5.5 615,5.5 C 695,5.5 750,8 805,8 C 860,8 915,4.5 985,4.5 C 1055,4.5 1105,4.5 1138,5.5 C 1170,5.5 1192,22 1192,43 C 1192,64 1170,80.5 1138,80.5 C 1105,81.5 1055,81.5 985,81.5 C 915,81.5 860,78 805,78 C 750,78 695,80.5 615,80.5 C 535,80.5 480,78 425,78 C 370,78 330,81.5 270,81.5 C 190,81.5 130,80.5 62,80.5 C 35,80.5 18,64 18,43 Z'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const firstLink = useRef(null)
  const { scrollY } = useScroll()
  const { pathname } = useLocation()

  // Navbar NEVER hides — smoothly adapts depth and subtle shadow when scrolled
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 20)
  })

  // Close mobile drawer on route change
  const prevPath = useRef(pathname)
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname
      setOpen(false)
    }
  }, [pathname])

  // Manage body scroll lock during mobile menu open & prefetch all links
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      firstLink.current?.focus()
      // Predictive prefetch when drawer opens
      links.forEach((l) => preloadRoute(l.to))
      preloadRoute('/book')
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Floating Morphed SVG Navbar Container — Always Fixed & Visible */}
      <header className="fixed inset-x-0 top-3 sm:top-5 z-50 pointer-events-none flex justify-center px-3 sm:px-6">
        <div
          className={`relative pointer-events-auto w-full max-w-[1180px] transition-all duration-500 ${scrolled
            ? 'drop-shadow-[0_18px_38px_rgba(24,18,12,0.13)]'
            : 'drop-shadow-[0_10px_28px_rgba(24,18,12,0.07)]'
            }`}
        >
          {/* Artisanal Washi Tape Stickers — Precisely 35% Overlap */}
          <div
            style={{ top: '-9px' }}
            className="absolute left-6 sm:left-12 z-30 pointer-events-none drop-shadow-xs"
          >
            <WashiTape
              tone="turmeric"
              width={76}
              height={22}
              className="-rotate-5 opacity-90 transition-opacity"
            />
          </div>
          <div
            style={{ top: '-8.5px' }}
            className="absolute right-14 sm:right-28 z-30 pointer-events-none drop-shadow-xs"
          >
            <WashiTape
              tone="chilli"
              width={70}
              height={20}
              className="rotate-4 opacity-90 transition-opacity"
            />
          </div>

          {/* Full SVG Morph Canvas Background */}
          <div className="absolute inset-0 size-full pointer-events-none">
            <svg
              viewBox="0 0 1200 86"
              preserveAspectRatio="none"
              className="size-full overflow-visible"
            >
              <defs>
                <linearGradient id="nav-coastal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor="var(--color-ivory)"
                    stopOpacity={scrolled ? 0.96 : 0.92}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-cream)"
                    stopOpacity={scrolled ? 0.98 : 0.95}
                  />
                </linearGradient>

                <linearGradient id="nav-rim-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-ink)" stopOpacity="0.14" />
                  <stop offset="50%" stopColor="var(--color-chilli)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--color-ink)" stopOpacity="0.14" />
                </linearGradient>

                <linearGradient id="nav-top-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="15%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="85%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Sculpted Organic SVG Coastal Wave Plate with continuous harmonic curves */}
              <path
                d={scrolled ? PATH_SCROLLED : PATH_DEFAULT}
                fill="url(#nav-coastal-grad)"
                stroke="url(#nav-rim-grad)"
                strokeWidth="1.25"
                className="backdrop-blur-xl transition-[d] duration-500 ease-out"
              />

              {/* Delicate Top Edge Liquid Glaze Highlight */}
              <path
                d="M 62,6 C 130,6 190,5 270,5 C 330,5 370,9.5 425,9.5 C 480,9.5 535,6 615,6 C 695,6 750,9.5 805,9.5 C 860,9.5 915,5 985,5 C 1055,5 1105,5 1138,6"
                fill="none"
                stroke="url(#nav-top-shimmer)"
                strokeWidth="1.2"
                strokeLinecap="round"
                className="opacity-75 pointer-events-none"
              />
            </svg>
          </div>

          {/* Navbar Content Layout */}
          <div className="relative z-10 flex h-[74px] sm:h-[82px] lg:h-[88px] items-center justify-between px-6 sm:px-10 lg:pl-10 lg:pr-8">
            {/* Brand Lockup: Konkani left (Chilli Red), Official Fork Logo middle (Black), English right (Chilli Red) */}
            <Link
              to="/"
              className="group inline-flex items-center gap-2 sm:gap-2.5 lg:gap-3 transition-transform duration-300 hover:scale-102 focus:outline-hidden select-none"
              aria-label="Nizachem Restaurant & Bar — Home"
            >
              {/* Left: Konkani in Chilli Red oklch(54.65% 0.153 35.4) */}
              <span
                lang="kok"
                className="font-kok text-[1.2rem] sm:text-[1.38rem] lg:text-[1.52rem] font-bold text-chilli !leading-none tracking-normal inline-flex items-center translate-y-[4.5px] sm:translate-y-[5px] group-hover:opacity-85 transition-opacity"
              >
                निजाचें
              </span>

              {/* Middle: Official Fork Logo Emblem in Black Only */}
              <div className="flex items-center justify-center shrink-0">
                <NizachemForkLogo size={30} className="sm:hidden" color="#000000" />
                <NizachemForkLogo size={34} className="hidden sm:block lg:hidden" color="#000000" />
                <NizachemForkLogo size={36} className="hidden lg:block" color="#000000" />
              </div>

              {/* Right: English in Chilli Red oklch(54.65% 0.153 35.4) */}
              <span className="font-display text-[1.2rem] sm:text-[1.38rem] lg:text-[1.52rem] font-bold text-chilli leading-none display-wonk tracking-[-0.015em] inline-flex items-center group-hover:opacity-85 transition-opacity">
                Nizachem
              </span>
            </Link>

            {/* Desktop Navigation Links (Stable, smooth hover) */}
            <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
              {links.map((l) => {
                const active = pathname === l.to
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onPointerEnter={() => preloadRoute(l.to)}
                    onTouchStart={() => preloadRoute(l.to)}
                    onFocus={() => preloadRoute(l.to)}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative rounded-full px-4 py-1.5 text-[0.8rem] font-medium tracking-[0.15em] uppercase transition-all duration-300 ${active ? 'text-chilli font-semibold' : 'text-ink-soft hoverable:hover:text-ink'
                      }`}
                  >
                    {/* Active Pill Bubble */}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-chilli/10 border border-chilli/25"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Right Action — Generous space above and below Reserve Table button */}
            <div className="flex items-center gap-4">
              <span
                className="hidden lg:inline-block"
                onPointerEnter={() => preloadRoute('/book')}
                onTouchStart={() => preloadRoute('/book')}
              >
                <Button
                  to="/book"
                  variant="primary"
                  showArrow
                  className="!px-6 !py-2 !min-h-[40px] !h-[40px] text-[0.76rem] tracking-[0.14em]"
                >
                  Reserve Table
                </Button>
              </span>

              {/* Luxury Icon-Only Hamburger / Close Morpher (No text) */}
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className={`group relative flex size-11 items-center justify-center rounded-full transition-colors duration-200 active:scale-95 lg:hidden shadow-xs select-none ${open
                  ? 'bg-chilli text-cream border border-chilli-deep'
                  : 'bg-cream/90 text-ink border border-ink/15 hoverable:hover:bg-ivory'
                  }`}
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {/* Clean Hardware-Accelerated Hamburger / Close Icon */}
                <div className="relative size-5 flex items-center justify-center pointer-events-none">
                  <span
                    className="absolute h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-out will-change-transform"
                    style={{
                      transform: open ? 'rotate(45deg)' : 'translateY(-4px)',
                    }}
                  />
                  <span
                    className="absolute h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-out will-change-transform"
                    style={{
                      transform: open ? 'rotate(-45deg)' : 'translateY(4px)',
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Silky Fast GPU Transition — Zero Flicker */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-cream px-5 sm:px-8 pt-24 sm:pt-28 pb-8 lg:hidden overflow-y-auto overscroll-contain will-change-[transform,opacity]"
          >
            {/* Organic Wave Cutout Canopy at bottom of mobile menu */}
            <div className="absolute bottom-0 inset-x-0 pointer-events-none opacity-20">
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-24 fill-chilli">
                <path d="M0,40 C320,90 640,10 960,70 C1200,110 1360,30 1440,50 L1440,120 L0,120 Z" />
              </svg>
            </div>

            {/* Staggered Kinetic Menu Links */}
            <nav aria-label="Mobile Navigation" className="flex flex-col relative z-10 pt-2">
              {links.map((l, i) => {
                const active = pathname === l.to
                return (
                  <motion.div
                    key={l.to}
                    initial={{ y: 28, opacity: 0, x: -8 }}
                    animate={{ y: 0, opacity: 1, x: 0 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ delay: 0.045 * i + 0.08, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      ref={i === 0 ? firstLink : undefined}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      onPointerEnter={() => preloadRoute(l.to)}
                      onTouchStart={() => preloadRoute(l.to)}
                      className={`group flex items-center justify-between border-b border-ink/10 py-3.5 sm:py-4 transition-all duration-300 active:scale-[0.98] select-none ${active ? 'text-chilli' : 'text-ink'
                        }`}
                    >
                      <div className="flex items-baseline gap-3 sm:gap-4">
                        <span className="font-mono text-xs font-semibold text-chilli/80 tracking-wider">
                          {l.num}
                        </span>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-display text-[1.85rem] sm:text-[2.2rem] leading-none display-quiet group-hover:text-chilli transition-colors">
                              {l.label}
                            </span>
                            <span
                              lang="kok"
                              className="font-kok text-sm text-ink-soft/75 group-hover:text-chilli/80 transition-colors"
                            >
                              · {l.kok}
                            </span>
                          </div>
                          <p className="text-[0.78rem] text-ink-soft/70 mt-0.5 line-clamp-1">
                            {l.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-chilli text-xl font-sans transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Mobile Footer & Instant Reservation Dock */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ delay: 0.28, duration: 0.42 }}
              className="mt-auto pt-6 space-y-5 relative z-10"
            >
              <Button
                to="/book"
                onClick={() => setOpen(false)}
                variant="primary"
                showArrow
                className="w-full !py-3.5 !text-sm"
              >
                Reserve a Table
              </Button>

              <div className="space-y-1.5 text-xs sm:text-sm text-ink-soft pt-1">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink flex items-center gap-1.5 hover:text-chilli transition-colors"
                >
                  <span>{site.address.full}</span>
                  <span className="text-xs">↗</span>
                </a>
                <p className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-turmeric animate-pulse shrink-0" />
                  <span>Open 7:00 pm – 11:00 pm · Closed Thursday</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Nav


