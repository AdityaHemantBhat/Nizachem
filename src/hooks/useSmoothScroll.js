import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/animations/setup'

let lenis = null

export function getLenis() {
  return lenis
}

/**
 * Lenis smooth scroll synced with GSAP's ticker and ScrollTrigger.
 * Skipped entirely for prefers-reduced-motion (native momentum stays).
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    // On touch-first mobile devices, disable touch hijacking to guarantee native 60fps/120fps buttery smoothness
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: isTouch ? 1 : 1.2,
    })
    lenis = instance

    const onScroll = () => ScrollTrigger.update()
    instance.on('scroll', onScroll)

    const raf = (time) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    // Intelligent lag smoothing to avoid jerky frames on 2GB mobile devices
    gsap.ticker.lagSmoothing(500, 33)

    const refresh = () => ScrollTrigger.refresh()
    const onLoad = () => setTimeout(refresh, 120)
    window.addEventListener('load', onLoad)
    window.addEventListener('orientationchange', onLoad)
    document.fonts?.ready.then(onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      window.removeEventListener('orientationchange', onLoad)
      instance.destroy()
      lenis = null
    }
  }, [enabled])
}
