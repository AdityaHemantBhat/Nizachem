import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'

import { IntroContext } from '@/lib/intro'
import { ScrollTrigger } from '@/lib/animations/setup'
import { getLenis, useSmoothScroll } from '@/hooks/useSmoothScroll'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { SvgDefs } from '@/components/svg/SvgDefs'
import { Preloader } from '@/components/svg/Preloader'
import { PageTransition } from '@/components/ui/PageTransition'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'

import Home from '@/pages/Home'
const MenuPage = lazy(() => import('@/pages/MenuPage'))
const StoryPage = lazy(() => import('@/pages/StoryPage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const BookPage = lazy(() => import('@/pages/BookPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  
  // Instant render on revisit or refresh: bypass preloader on reload
  const [showPreloader, setShowPreloader] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const navEntries = window.performance?.getEntriesByType?.('navigation')
        const isReload = navEntries?.[0]?.type === 'reload'
        if (isReload) return false
      }
      return sessionStorage.getItem('nizachem:preloader_seen') !== '1'
    } catch {
      return false
    }
  })
  const [introDone, setIntroDone] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const navEntries = window.performance?.getEntriesByType?.('navigation')
        const isReload = navEntries?.[0]?.type === 'reload'
        if (isReload) return true
      }
      return sessionStorage.getItem('nizachem:preloader_seen') === '1'
    } catch {
      return true
    }
  })

  // Idle route prefetching: strictly deferred so it never contends with initial homepage LCP
  useEffect(() => {
    const idlePrefetch = () => {
      import('@/pages/MenuPage')
      import('@/pages/StoryPage')
      import('@/pages/GalleryPage')
      import('@/pages/ContactPage')
      import('@/pages/BookPage')
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(idlePrefetch, { timeout: 4000 })
      return () => window.cancelIdleCallback(handle)
    }

    const timer = setTimeout(idlePrefetch, 3500)
    return () => clearTimeout(timer)
  }, [])

  useSmoothScroll(!reduced)

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(refresh)
  }, [location.pathname])

  useEffect(() => {
    if (!location.hash) return
    const el = document.querySelector(location.hash)
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }), 250)
      return () => clearTimeout(t)
    }
  }, [location, reduced])

  const finishIntro = () => {
    try {
      sessionStorage.setItem('nizachem:preloader_seen', '1')
    } catch {}
    setIntroDone(true)
    setShowPreloader(false)
  }

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={{ done: introDone }}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <SvgDefs />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-30 paper-grain" />

        <Nav />

        <AnimatePresence mode="sync" initial={false} onExitComplete={() => ScrollTrigger.refresh()}>
          <motion.main
            key={location.pathname}
            id="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <Suspense fallback={<div className="min-h-[70svh] bg-cream" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/book" element={<BookPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.main>
        </AnimatePresence>

        <Footer />

        <PageTransition />

        {showPreloader && <Preloader onDone={finishIntro} />}
      </IntroContext.Provider>
    </MotionConfig>
  )
}
