import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from '@/lib/animations/setup'
import { useIntro } from '@/lib/intro'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getLenis } from '@/hooks/useSmoothScroll'

// Clean, accurate route titles matching the navigation links exactly
const ROUTE_TITLES = {
  '/': 'NIZACHEM',
  '/menu': 'MENU',
  '/story': 'OUR STORY',
  '/gallery': 'GALLERY',
  '/contact': 'CONTACT',
  '/book': 'RESERVATIONS',
}

// Exact SVG path coordinates from the viral GSAP curve transition
const initial = 'M0,1005S175,995,500,995s500,5,500,5V0H0Z'
const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z'
const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z'

export function PageTransition() {
  const navigate = useNavigate()
  const location = useLocation()
  const intro = useIntro()
  const reduced = usePrefersReducedMotion()

  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const headingRef = useRef(null)
  const isBusyRef = useRef(false)

  const [currentTitle, setCurrentTitle] = useState('NIZACHEM')

  // Global click interceptor: catches link clicks and triggers the GSAP curve transition
  useEffect(() => {
    if (reduced || !intro.done) return

    const handleGlobalClick = (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

      const anchor = e.target.closest('a[href]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        anchor.target === '_blank'
      ) {
        return
      }

      if (href.startsWith('#')) return

      const targetUrl = new URL(anchor.href, window.location.href)
      if (targetUrl.origin !== window.location.origin) return

      if (targetUrl.pathname === location.pathname && !targetUrl.hash) {
        e.preventDefault()
        return
      }

      // Intercept navigation
      e.preventDefault()
      e.stopPropagation()

      if (isBusyRef.current) return
      isBusyRef.current = true

      const destination = targetUrl.pathname + targetUrl.search + targetUrl.hash
      const cleanPath = targetUrl.pathname || '/'
      const title = ROUTE_TITLES[cleanPath] || 'NIZACHEM'
      setCurrentTitle(title)

      // =========================================================================
      // GSAP TIMELINE: Same to same SVG curve transition as requested
      // =========================================================================
      const wrap = wrapRef.current
      const svgPath = svgRef.current
      const heading = headingRef.current
      if (!wrap || !svgPath) {
        navigate(destination)
        isBusyRef.current = false
        return
      }

      const tl = gsap.timeline({
        onComplete: () => {
          isBusyRef.current = false
        },
      })

      // 1. Enter: Seamlessly fade the solid Chilli Red curtain over the viewport (no awkward box jumping)
      tl.set(wrap, {
        display: 'flex',
        opacity: 0,
        y: 0,
        zIndex: 99999,
      })
      tl.set(svgPath, {
        attr: { d: initial },
      })
      tl.to(wrap, {
        opacity: 1,
        duration: 0.18,
        ease: 'power2.out',
      })

      // 2. Instant route change while 100% covered in solid red
      tl.add(() => {
        navigate(destination)
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(0, { immediate: true })
        else window.scrollTo(0, 0)
      })

      // 3. Exact heading text animation: clean, centered, elegant
      if (heading) {
        tl.fromTo(
          heading,
          { y: 55, skewY: 5, opacity: 0 },
          {
            y: 0,
            skewY: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
          }
        )
        tl.to(
          heading,
          {
            y: -55,
            skewY: 5,
            opacity: 0,
            duration: 0.28,
            ease: 'power2.in',
            delay: 0.12,
          }
        )
      }

      // 4. Exact SVG Curve Morph: from full to curve to flat (viral liquid rub)
      tl.to(
        svgPath,
        {
          duration: 0.52,
          attr: { d: curve },
          ease: 'power2.easeIn',
        },
        '-=0.12'
      )
      tl.to(svgPath, {
        duration: 0.52,
        attr: { d: flat },
        ease: 'power2.easeOut',
      })

      // 5. Wrap translates away to -1500 and resets cleanly
      tl.to(wrap, {
        y: -1500,
        duration: 0.04,
      })
      tl.set(wrap, {
        display: 'none',
        y: 0,
        zIndex: -1,
      })
    }

    document.addEventListener('click', handleGlobalClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [location.pathname, intro.done, reduced, navigate])

  if (reduced) return null

  return (
    <>
      <style>{`
        .loader-wrap {
          position: fixed;
          inset: 0;
          z-index: 99999;
          height: 100vh;
          height: 100dvh;
          width: 100vw;
          display: none;
          overflow: hidden;
          align-items: center;
          justify-content: center;
          background: transparent;
          pointer-events: auto;
          user-select: none;
          will-change: transform;
        }
        .loader-wrap svg {
          position: absolute;
          top: -4vh;
          left: -4vw;
          width: 108vw;
          height: 114vh;
          height: 114dvh;
          pointer-events: none;
          will-change: transform;
        }
        .loader-wrap .loader-wrap-heading {
          position: relative;
          z-index: 20;
          text-align: center;
          pointer-events: none;
          padding: 0 1.5rem;
        }
        .loader-wrap .loader-wrap-heading h1 {
          font-size: clamp(2.4rem, 7.5vw, 6rem);
          color: #FFF8EE;
          text-transform: uppercase;
          font-weight: 300;
          font-family: var(--font-display);
          letter-spacing: 0.04em;
          line-height: 1.1;
          margin: 0;
          padding: 0;
          will-change: transform, opacity;
        }
        .loader-wrap .loader-wrap-heading span {
          display: block;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .loader-wrap svg {
            top: -5vh;
            left: -10vw;
            width: 120vw;
            height: 116dvh;
          }
          .loader-wrap .loader-wrap-heading h1 {
            font-size: clamp(2.1rem, 9.5vw, 3.6rem);
            letter-spacing: 0.02em;
          }
        }
      `}</style>

      {/* Exact DOM Structure from user's snippet */}
      <div ref={wrapRef} className="loader-wrap">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            ref={svgRef}
            id="svg"
            d={initial}
            fill="#942016"
          />
        </svg>

        <div className="loader-wrap-heading">
          <span>
            <h1 ref={headingRef}>
              {currentTitle}
            </h1>
          </span>
        </div>
      </div>
    </>
  )
}

export default PageTransition
