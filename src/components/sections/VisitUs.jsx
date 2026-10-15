import { useEffect, useRef, useState } from 'react'
import { site } from '@/content/site'
import { Lines } from '@/components/ui/Lines'
import { Button } from '@/components/ui/Button'
import { WaveDivider } from '@/components/svg/WaveDivider'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import { useOpenStatus } from '@/hooks/useOpenStatus'
import { STATIC_STATUS } from '@/lib/hours'

export function VisitUs({ fill = 'var(--color-cream)' }) {
  const status = useOpenStatus()
  const mapWrap = useRef(null)
  const [showMap, setShowMap] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const node = mapWrap.current
    if (!node) return

    // Predictive observer: loads map when user scrolls within 600px of section
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowMap(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const contactLinks = [
    site.contact.whatsapp && { label: 'WhatsApp Us', href: site.contact.whatsapp },
    site.contact.phone && { label: `Call ${site.contact.phone}`, href: `tel:${site.contact.phone}` },
    site.contact.instagram && { label: 'Instagram', href: site.contact.instagram },
  ].filter(Boolean)

  return (
    <section id="visit" aria-labelledby="visit-heading" className="relative bg-cream-deep text-ink overflow-hidden">
      {/* Wave cutout transition into warm earthen cream tone */}
      <div className="absolute -top-px inset-x-0 z-10 pointer-events-none">
        <WaveDivider fill={fill} inverted height={46} />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pt-12 pb-12 sm:px-8 sm:pt-16 sm:pb-16 lg:px-12 lg:pt-20 lg:pb-20">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-5 min-w-0">
            <HeritageBadge kok="भेट" label={site.visit.kicker} />

            <Lines as="h2" id="visit-heading" className="mt-4 sm:mt-5 text-display-2 display-wonk text-ink">
              {site.visit.heading}
            </Lines>

            <address className="mt-6 sm:mt-8 text-lead leading-relaxed text-ink-soft not-italic break-words">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} {site.address.postalCode}
            </address>

            <p className="mt-5 sm:mt-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-ink/15 bg-ivory/95 px-3.5 py-1.5 text-xs sm:text-[0.88rem] text-ink shadow-xs backdrop-blur-xs">
              <span
                aria-hidden
                className={`inline-block size-2 rounded-full shrink-0 ${status?.open ? 'bg-turmeric animate-pulse' : 'bg-ink/30'}`}
              />
              <span className="font-medium text-ink">{status?.label ?? STATIC_STATUS}</span>
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button href={site.mapsUrl} variant="primary" showArrow className="w-full sm:w-auto text-center justify-center">
                {site.visit.directionsLabel}
              </Button>
              <Button to="/book" variant="outline" className="w-full sm:w-auto text-center justify-center">
                Book a table
              </Button>
            </div>

            {contactLinks.length > 0 && (
              <ul className="mt-6 sm:mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-[0.95rem]">
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border-b border-ink/30 pb-0.5 text-ink-soft font-medium transition-colors hoverable:hover:border-chilli hoverable:hover:text-chilli"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-6 lg:col-start-7 min-w-0">
            <div className="rounded-[22px] sm:rounded-[28px] border border-ink/12 bg-ivory/95 p-2 sm:p-4 shadow-[0_18px_45px_-12px_rgba(24,18,12,0.12)] backdrop-blur-md">
              <div
                ref={mapWrap}
                className="relative h-[290px] sm:h-[380px] lg:h-[480px] w-full overflow-hidden rounded-[16px] sm:rounded-[20px] border border-ink/10 bg-cream shadow-inner"
              >
                {!mapLoaded && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 bg-cream-deep/90 flex flex-col items-center justify-center p-4 text-center overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative mb-2.5 flex size-11 items-center justify-center rounded-full bg-chilli/10 text-chilli shadow-sm border border-chilli/20">
                        <span className="size-3 rounded-full bg-chilli animate-ping absolute" />
                        <span className="size-2.5 rounded-full bg-chilli relative z-10" />
                      </div>
                      <p className="font-display font-medium text-sm sm:text-base text-ink">Nizachem Restaurant &amp; Bar</p>
                      <p className="text-[0.72rem] sm:text-xs text-ink-muted mt-0.5">Loading Google Maps live navigation…</p>
                    </div>
                  </div>
                )}

                {showMap && (
                  <iframe
                    title={`Map showing ${site.name}`}
                    src={site.visit.mapEmbed}
                    allowFullScreen
                    fetchPriority="high"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                    className={`size-full border-0 transition-opacity duration-500 ease-out ${
                      mapLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}

                {/* Direct 1-Tap Native Navigation Badge */}
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-ivory/95 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[0.72rem] sm:text-xs font-semibold text-ink shadow-sm backdrop-blur-md transition-all hover:bg-cream hover:border-chilli hover:text-chilli"
                >
                  <span>Open Maps</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisitUs
