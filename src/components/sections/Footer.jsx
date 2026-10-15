import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '@/content/site'
import { RotatingBadge } from '@/components/svg/RotatingBadge'
import { WaveDivider } from '@/components/svg/WaveDivider'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const navLinks = [
  { label: 'Menu', to: '/menu' },
  { label: 'Story', to: '/story' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
  { label: 'Reserve', to: '/book' },
]

export function Footer() {
  const location = useLocation()
  const [isKonkani, setIsKonkani] = useState(false)
  const footerRef = useRef(null)
  const isVisible = useRef(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const node = footerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(node)

    // Smoothly alternate between English and Konkani every 3.5s when footer is in view
    const timer = setInterval(() => {
      if (isVisible.current) {
        setIsKonkani((prev) => !prev)
      }
    }, 3500)

    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [reduced])

  // Preceding section background color:
  // - On Home ('/'): VisitUs is bg-cream-deep
  // - On Story ('/story'): Invitation is bg-ivory
  // - On all other pages (Gallery, Contact, Menu, Book): preceding section is bg-cream
  const isHome = location.pathname === '/'
  const isStory = location.pathname === '/story'
  const precedingFill = isHome
    ? 'var(--color-cream-deep)'
    : isStory
    ? 'var(--color-ivory)'
    : 'var(--color-cream)'

  const socials = [
    site.contact.instagram && { label: 'Instagram', href: site.contact.instagram },
    site.contact.whatsapp && { label: 'WhatsApp', href: site.contact.whatsapp },
    site.contact.phone && { label: `Call ${site.contact.phone}`, href: `tel:${site.contact.phone}` },
  ].filter(Boolean)

  return (
    <footer ref={footerRef} className="relative bg-sea text-cream overflow-hidden">
      {/* Dynamic Curvy Wave Transition seamlessly connecting preceding section to footer */}
      <div className="relative -top-px inset-x-0 z-10 pointer-events-none">
        <WaveDivider fill={precedingFill} inverted height={82} curvy />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pt-6 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] sm:px-8 lg:px-12 lg:pt-10">
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          {/* Monumental Wordmark: Seamlessly alternates between English and Konkani in the EXACT same spot */}
          <div className="grid [grid-template-areas:'stack'] items-end min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              {isKonkani ? (
                <motion.h2
                  key="kok"
                  lang="kok"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'relative', top: '0.26em', lineHeight: 0.92 }}
                  className="[grid-area:stack] font-kok text-[clamp(2.5rem,11.5vw,10.2rem)] text-cream select-none tracking-normal block will-change-transform"
                >
                  निजाचें
                </motion.h2>
              ) : (
                <motion.h2
                  key="en"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ lineHeight: 0.92 }}
                  className="[grid-area:stack] font-display text-[clamp(2.5rem,11.5vw,10.2rem)] display-wonk text-cream select-none tracking-tight block will-change-transform"
                >
                  {site.wordmark}
                </motion.h2>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:block shrink-0">
            <RotatingBadge
              text="★ NIZACHEM RESTAURANT & BAR ★ CURTORIM GOA ★ "
              size={120}
              tone="cream"
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-10 border-t border-cream/20 pt-10 sm:grid-cols-2 lg:mt-16 lg:flex lg:justify-between lg:items-start lg:gap-8 xl:gap-12">
          <div className="lg:max-w-[240px]">
            <h3 className="kicker text-cream/60">Visit</h3>
            <address className="mt-4 text-[0.95rem] leading-relaxed text-cream/90 not-italic break-words">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} {site.address.postalCode}
            </address>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block border-b border-cream/40 pb-0.5 text-[0.9rem] text-cream transition-colors hoverable:hover:border-turmeric hoverable:hover:text-turmeric"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="w-full sm:max-w-[280px] lg:w-[270px] shrink-0">
            <h3 className="kicker text-cream/60">Hours</h3>
            <dl className="mt-4 space-y-1 text-[0.95rem]">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 border-b border-cream/10 pb-1">
                  <dt className="text-cream/80">{h.short}</dt>
                  <dd className={h.closed ? 'text-cream/50' : 'tabular-nums text-cream/90 whitespace-nowrap'}>
                    {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="shrink-0">
            <h3 className="kicker text-cream/60">Pages</h3>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="border-b border-transparent transition-colors hoverable:hover:border-turmeric hoverable:hover:text-turmeric"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:max-w-[260px]">
            <h3 className="kicker text-cream/60">Elsewhere</h3>
            {socials.length > 0 ? (
              <ul className="mt-4 space-y-2 text-[0.95rem]">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border-b border-transparent transition-colors hoverable:hover:border-turmeric hoverable:hover:text-turmeric"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[0.9rem] leading-relaxed text-cream/60">
                Social links coming soon.
              </p>
            )}
            <p lang="kok" className="mt-6 text-[1.05rem] text-cream">
              {site.konkani.signOff}
            </p>
            <p className="mt-1 text-[0.9rem] text-cream/70">{site.konkani.signOffEn}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/20 pt-6 text-[0.82rem] text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="inline-flex items-center gap-1.5 text-cream/85">
            <span>Made with</span>
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 fill-chilli text-chilli inline-block shrink-0"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Love</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
