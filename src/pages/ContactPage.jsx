import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Clock,
  MapPin,
  UtensilsCrossed,
  Wine,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  Car,
  Sparkles,
} from 'lucide-react'
import { site } from '@/content/site'
import { Head } from '@/components/ui/Head'
import { Lines } from '@/components/ui/Lines'
import { Button } from '@/components/ui/Button'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import { AzulejoCorner } from '@/components/svg/AzulejoCorner'
import { restaurantJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'

const FAQ_ITEMS = [
  {
    id: 'timing',
    icon: Clock,
    q: 'What time does Nizachem open?',
    a: 'We serve dinner from 7:00 pm to 11:00 pm every evening except Thursday, when our kitchen takes a rest day. Last kitchen orders are taken at 10:30 pm.',
    details: [
      { icon: Clock, text: '7:00 pm – 11:00 pm' },
      { icon: UtensilsCrossed, text: 'Last orders at 10:30 pm' },
      { icon: Calendar, text: 'Closed on Thursdays' },
    ],
  },
  {
    id: 'location',
    icon: MapPin,
    q: 'Where is Nizachem Restaurant and Bar located?',
    a: 'We are in Maina, Sonsodo, Gogol, Curtorim (South Goa 403720), approximately 12 minutes by road from Margao Railway Station. Ample private courtyard parking is available for cars and two-wheelers.',
    details: [
      { icon: MapPin, text: 'Maina, Curtorim, South Goa 403720' },
      { icon: Car, text: 'Free private courtyard parking' },
    ],
    action: { label: 'Open in Google Maps', href: site.mapsUrl },
  },
  {
    id: 'food',
    icon: UtensilsCrossed,
    q: 'What should I order on a first visit?',
    a: 'The Goan Fish Thali is our house staple — local red rice, fresh fish curry, pan-fried catch of the day, sol kadi, and papad. Our slow-simmered Chicken Xacuti and Chicken Cafreal are also local favourites.',
    details: [
      { icon: Sparkles, text: 'House Fish Curry Thali' },
      { icon: Sparkles, text: 'Stone-Ground Chicken Xacuti' },
    ],
    action: { label: 'View the full menu', to: '/menu' },
  },
  {
    id: 'bar',
    icon: Wine,
    q: 'Do you have a bar?',
    a: 'Yes. We serve authentic local cashew feni, chilled draught beer, and our house-brewed kokum sherbet alongside dinner.',
    details: [
      { icon: Wine, text: 'Traditional cashew feni' },
      { icon: Sparkles, text: 'Chilled draught beer & house kokum' },
    ],
  },
]

export default function ContactPage() {
  const mapWrap = useRef(null)
  const [showMap, setShowMap] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [openFaqId, setOpenFaqId] = useState('timing')

  // Current day index (0 = Monday, 6 = Sunday to match site.hours array)
  const todayIndex = (new Date().getDay() + 6) % 7

  useEffect(() => {
    const node = mapWrap.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowMap(true)
          observer.disconnect()
        }
      },
      { rootMargin: '800px' }
    )

    if (node) observer.observe(node)

    // Warm up map on idle thread
    let timerId = setTimeout(() => setShowMap(true), 1500)

    return () => {
      observer.disconnect()
      clearTimeout(timerId)
    }
  }, [])

  return (
    <>
      <Head
        title="Contact & Directions — Nizachem Restaurant & Bar"
        description="Find Nizachem Restaurant and Bar in Maina, Sonsodo, Gogol, Curtorim, Goa 403720. Open 7–11 pm, closed Thursdays. Directions, hours and how to reach us."
        path="/contact"
        jsonLd={[
          restaurantJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          faqJsonLd(site.faqs),
        ]}
      />

      {/* Main Container */}
      <main className="pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 bg-cream text-ink overflow-x-hidden">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          
          {/* ============================================================== */}
          {/* 1. ARCHITECTURAL HEADER                                         */}
          {/* ============================================================== */}
          <header className="max-w-[850px]">
            <HeritageBadge kok="संपर्क" label="Find Our Kitchen" className="mb-4" />
            <Lines as="h1" className="mt-4 sm:mt-6 text-display-1 display-wonk text-ink break-words">
              Come for dinner.
            </Lines>
            <p className="mt-5 sm:mt-7 text-lead text-ink-soft leading-relaxed max-w-[56ch]">
              We are located in Maina, South Goa. Slow-simmered home recipes,
              fresh morning catch, and an unhurried table waiting for you every evening from 
              7:00 pm to 11:00 pm (Kitchen rest day: Thursday).
            </p>
          </header>

          {/* ============================================================== */}
          {/* 2. DEDICATED LIVE GOOGLE MAP CONTAINER                         */}
          {/* ============================================================== */}
          <section aria-label="Interactive map" className="mt-10 sm:mt-14">
            <div className="rounded-[22px] sm:rounded-[32px] border border-ink/12 bg-ivory p-2.5 sm:p-4 shadow-[0_18px_45px_-12px_rgba(24,18,12,0.12)]">
              <div
                ref={mapWrap}
                className="relative h-[290px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden rounded-[16px] sm:rounded-[24px] border border-ink/10 bg-cream shadow-inner"
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
                      <p className="font-display font-medium text-sm sm:text-base text-ink">
                        Nizachem Restaurant &amp; Bar
                      </p>
                      <p className="text-[0.72rem] sm:text-xs text-ink-muted mt-0.5">
                        Loading Google Maps live navigation &amp; directions…
                      </p>
                    </div>
                  </div>
                )}

                {showMap && (
                  <iframe
                    title={`Google Map location of ${site.name}`}
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
                  className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-ivory/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur-md transition-all hover:bg-cream hover:border-chilli hover:text-chilli"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 3. WEEKLY OPERATING SCHEDULE (TABLE CARD)                       */}
          {/* ============================================================== */}
          <section aria-labelledby="hours-heading" className="mt-12 sm:mt-18">
            <div className="relative rounded-[22px] sm:rounded-[32px] border border-ink/12 bg-ivory p-6 sm:p-10 shadow-xs overflow-hidden">
              <div className="absolute top-3.5 right-3.5 opacity-25 pointer-events-none">
                <AzulejoCorner position="top-right" size={28} className="text-chilli" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-ink/10">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-chilli block">
                    आठवड्याचो वेळापत्रक
                  </span>
                  <h2 id="hours-heading" className="mt-1 font-display text-2xl sm:text-3xl font-medium text-ink">
                    Weekly Kitchen Hours
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-ink-soft max-w-sm">
                  {site.hoursNote} Spices ground fresh daily on stone rogddo.
                </p>
              </div>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-7">
                {site.hours.map((h, i) => {
                  const isToday = i === todayIndex
                  return (
                    <div
                      key={h.day}
                      className={`rounded-2xl p-4 border transition-all ${
                        isToday
                          ? 'border-chilli/40 bg-chilli/5 shadow-xs ring-1 ring-chilli/20'
                          : 'border-ink/8 bg-cream/50'
                      }`}
                    >
                      <div className="flex items-center justify-between sm:block">
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-medium text-sm sm:text-base text-ink">
                            {h.day}
                          </span>
                          {isToday && (
                            <span className="text-[0.65rem] font-bold uppercase tracking-wider bg-chilli text-cream px-1.5 py-0.2 rounded-full">
                              Today
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-xs">
                          {h.closed ? (
                            <span className="text-chilli font-medium">Closed (Rest)</span>
                          ) : (
                            <span className="text-ink-soft font-mono font-medium">
                              {h.open} – {h.close}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 4. "BEFORE YOU COME" FAQ SECTION                                */}
          {/* ============================================================== */}
          <section aria-labelledby="questions-heading" className="mt-16 sm:mt-24 pt-4">
            {/* Clean Section Header */}
            <div className="max-w-2xl">
              <HeritageBadge kok="माहिती" label="Good to Know" className="mb-4" />
              <h2 id="questions-heading" className="text-display-2 display-wonk text-ink">
                Before you come.
              </h2>
              <p className="mt-3 text-lead text-ink-soft leading-relaxed">
                Helpful details for dinner guests pulling up a chair at our family tavern.
              </p>
            </div>

            {/* Clean Editorial Accordion */}
            <div className="mt-10 sm:mt-12 divide-y divide-ink/10 border-y border-ink/10 w-full">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id
                const Icon = item.icon
                return (
                  <div key={item.id} className="py-2 transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="w-full text-left py-5 sm:py-6 flex items-center justify-between gap-4 select-none cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chilli rounded-lg"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
                        <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink-soft transition-colors group-hover:bg-chilli/10 group-hover:text-chilli">
                          <Icon className="size-4 sm:size-4.5" />
                        </span>
                        <h3 className="font-display text-[1.12rem] sm:text-[1.3rem] font-medium text-ink group-hover:text-chilli transition-colors leading-snug">
                          {item.q}
                        </h3>
                      </div>

                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-all duration-300 ${
                          isOpen ? 'rotate-180 bg-ink/5 text-ink border-ink/30' : 'group-hover:border-chilli/40 group-hover:text-chilli'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="size-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="pl-12 sm:pl-14 pr-4 pb-6 pt-1 text-ink-soft">
                            <p className="text-[0.94rem] sm:text-[1rem] leading-relaxed">
                              {item.a}
                            </p>

                            {item.details && (
                              <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
                                {item.details.map((detail, idx) => {
                                  const DetailIcon = detail.icon
                                  return (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-ivory/80 px-3 py-1 text-xs font-medium text-ink-soft"
                                    >
                                      <DetailIcon className="size-3.5 text-chilli shrink-0" />
                                      <span>{detail.text}</span>
                                    </span>
                                  )
                                })}
                              </div>
                            )}

                            {item.action && (
                              <div className="mt-4 pt-2">
                                {item.action.to ? (
                                  <Button to={item.action.to} variant="outline" showArrow className="!py-1.5 !px-4 !text-xs">
                                    {item.action.label}
                                  </Button>
                                ) : (
                                  <a
                                    href={item.action.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-chilli hover:underline"
                                  >
                                    <span>{item.action.label}</span>
                                    <ArrowUpRight className="size-3.5" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Bottom Action Banner */}
            <div className="mt-12 sm:mt-16 w-full rounded-[22px] sm:rounded-[28px] border border-ink/12 bg-ivory p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-xs">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-chilli block">
                  खाण · Home Cooking
                </span>
                <h3 className="font-display text-lg sm:text-xl font-medium text-ink mt-1">
                  Ready to join us for dinner?
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft mt-1">
                  Tables held for family feasts, casual tavern evenings &amp; gatherings.
                </p>
              </div>
              <div className="shrink-0">
                <Button to="/menu" variant="outline" showArrow className="w-full sm:w-auto text-center justify-center !text-xs sm:!text-sm">
                  View the Menu
                </Button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}

