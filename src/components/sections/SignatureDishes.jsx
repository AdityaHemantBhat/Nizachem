import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/animations/setup'
import { site } from '@/content/site'
import { Photo } from '@/components/ui/Photo'
import { HeritageBadge } from '@/components/ui/HeritageBadge'

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const dishBadges = {
  'Goan Fish Thali': 'Everyday Staple',
  'Chicken Xacuti': 'Stone-Ground Masala',
  'Chicken Cafreal': 'Green Coriander',
  'Crab Xec Xec': 'Fresh Mud Crab',
  'Prawn Vindaloo': 'Fiery & Tart',
  Bebinca: '8-Layer Dessert',
}

export function SignatureDishes() {
  const section = useRef(null)
  const track = useRef(null)
  const [pinned, setPinned] = useState(false)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current
      const scroller = el.parentElement
      const amount = () => Math.max(0, el.scrollWidth - scroller.clientWidth)

      const tween = gsap.to(el, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top 72px',
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      setPinned(true)

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        setPinned(false)
      }
    })

    return () => mm.revert()
  }, { scope: section })

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [pinned])

  return (
    <section
      ref={section}
      aria-labelledby="signature-heading"
      className="relative overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-8 lg:pb-16 bg-cream"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <HeritageBadge
              kok="खाशेली खाणां"
              label="Signature Plates"
              color="turmeric"
            />
            <h2 id="signature-heading" className="mt-4 sm:mt-5 text-display-2 display-wonk text-ink">
              The ones people drive for.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="kicker text-ink-soft hidden lg:inline-block">Scroll to explore</span>
            <p className="kicker text-ink-soft lg:hidden">Swipe to explore →</p>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 sm:mt-8 lg:mt-8 ${
          pinned
            ? 'overflow-hidden'
            : 'overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        }`}
      >
        <ul
          ref={track}
          className="flex w-max gap-6 px-5 sm:px-8 lg:gap-8 lg:px-12 pb-4"
        >
          {site.signature.map((dish, i) => (
            <li
              key={dish.name}
              className="group relative w-[78vw] shrink-0 snap-start sm:w-[50vw] lg:w-[350px] rounded-[28px] border border-ink/12 bg-ivory p-4 shadow-xs transition-all duration-500 hoverable:hover:-translate-y-2 hoverable:hover:shadow-[0_20px_40px_-10px_rgba(24,18,12,0.12)] hoverable:hover:border-chilli/30"
            >
              <div className="relative overflow-hidden rounded-[20px] bg-cream-deep">
                <Photo
                  photo={{
                    file: `dish-${slug(dish.name)}.jpg`,
                    alt: `${dish.name} served at Nizachem`,
                    label: `Photo: ${dish.name}`,
                  }}
                  ratio="4 / 5"
                  sizes="(min-width: 1024px) 350px, 78vw"
                  className="border-0"
                  imgClassName="transition-transform duration-700 ease-out-expo group-hover:scale-106"
                />

                {/* Preparation Pill Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-block rounded-full bg-cream/90 backdrop-blur-xs px-3 py-1 font-body text-[0.68rem] font-semibold tracking-wider text-ink uppercase shadow-xs border border-ink/5">
                    {dishBadges[dish.name] ?? 'House Special'}
                  </span>
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-3.5 right-3.5 z-10">
                  <span className="inline-block rounded-full bg-ink/80 backdrop-blur-xs px-3.5 py-1 text-[0.85rem] font-semibold text-cream shadow-md">
                    ₹{dish.price}
                  </span>
                </div>
              </div>

              <div className="px-2 pt-5 pb-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="kicker text-chilli font-bold text-[0.72rem]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-[1.32rem] leading-snug font-medium text-ink">
                    {dish.name}
                  </h3>
                </div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                  {dish.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SignatureDishes

