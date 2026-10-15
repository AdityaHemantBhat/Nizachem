import { useState } from 'react'
import { site } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import {
  HandDrawnUnderline,
  HandDrawnArrow,
} from '@/components/svg/StoryArtifacts'

export function SusegadExperience() {
  const [activeStory, setActiveStory] = useState(0)

  const moments = [
    {
      num: '०१',
      title: 'The Paddy Breeze',
      kok: 'वाऱ्याची झुळूक',
      subtitle: 'Eight Unhurried Tables',
      text: 'Cobalt blue shutters swing open over the Curtorim fields. Portuguese diamond tiles cool underfoot, and the village quiet settles in. No highway horns, no rush to vacate your table.',
      photo: '/photos/inside-view.jpg',
      alt: 'Dining room with Portuguese tiles and warm wooden tables',
      badge: 'Curtorim Susegad',
    },
    {
      num: '०२',
      title: 'The Laterite Bar',
      kok: 'चिऱ्याचो बार',
      subtitle: '140 Hand-Carved Chira Stones',
      text: 'Pull up a cane stool at the red laterite stone counter. Cold Curtorim Cashew Feni poured over crushed ice with fresh lime and a slit green chilli, cold beers, and honest banter.',
      photo: '/photos/inside-view-1.jpg',
      alt: 'Hand-carved red laterite stone bar with amber bottles and cane front',
      badge: 'Cold Cashew Feni',
    },
    {
      num: '०३',
      title: 'The Family Kitchen',
      kok: 'घरगुती जेवण',
      subtitle: 'Morning Catch & Fresh Coconut',
      text: 'Bangdo, Surmai, and Prawns brought straight from the morning boat, coated in seasoned rawa, and crisp-fried on cast iron. Curries slow-simmered with recipes from mothers and aunts. Strictly no beef, no pork.',
      photo: '/photos/dish-goan-fish-thali.jpg',
      alt: 'Fresh Goan fish thali on banana leaf with crisp rawa fried fish',
      badge: 'Mother’s Recipes',
    },
  ]

  const current = moments[activeStory]

  return (
    <section
      id="susegad"
      aria-labelledby="susegad-heading"
      className="relative overflow-hidden bg-cream py-16 sm:py-24 lg:py-28"
    >
      {/* 1. Atmospheric Ambient Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[min(92vw,1100px)] rounded-full bg-gradient-to-b from-chilli/10 via-turmeric/8 to-transparent blur-3xl opacity-75"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -right-24 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-sea/6 via-turmeric/5 to-transparent blur-3xl opacity-60"
      />

      {/* 2. Monumental Background Devanagari Calligraphy Watermark (सुशेगाद) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[10%] flex justify-center select-none z-0"
      >
        <span
          lang="kok"
          className="font-serif text-[clamp(7.5rem,22vw,22rem)] font-normal text-ink/[0.032] leading-none select-none tracking-wider"
        >
          सुशेगाद
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* ============================================================== */}
        {/* HEADER: Flowing Editorial Typography (No Box!)                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-[900px] mx-auto">
          <HeritageBadge
            kok="आमची सुशेगाद सांज"
            label="An Evening in Curtorim"
            className="mb-5"
          />

          <h2
            id="susegad-heading"
            className="font-display text-[clamp(2.35rem,5.6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.025em] text-ink display-wonk"
          >
            Step off the village road into{' '}
            <span className="relative inline-block font-normal italic text-chilli font-serif">
              an evening that refuses
              <HandDrawnUnderline className="text-chilli/70 absolute -bottom-2 left-0 w-full" />
            </span>{' '}
            to be rushed.
          </h2>

          <p className="mt-6 text-[1.1rem] sm:text-[1.25rem] text-ink-soft leading-relaxed max-w-[58ch] mx-auto">
            Tucked along the paddy fields of Maina-Curtorim, Nizachem is where slow village susegad meets hot cast-iron skillets, laughter at the laterite bar, and food cooked with the comforting taste of home.
          </p>
        </div>

        {/* ============================================================== */}
        {/* THE CIRCULAR OCULUS & ORBITAL COMPOSITION (NOT SQUARE SQUARE!) */}
        {/* ============================================================== */}
        <div className="mt-14 sm:mt-20 grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT 6 COLS: The Monumental Circular Oculus & Floating Orbits */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-10">
            {/* Outer Decorative Dashed Ring */}
            <div
              aria-hidden="true"
              className="absolute size-[320px] sm:size-[440px] lg:size-[490px] rounded-full border border-dashed border-chilli/25 animate-spin-slower pointer-events-none"
            />
            {/* Secondary Amber Ring */}
            <div
              aria-hidden="true"
              className="absolute size-[340px] sm:size-[465px] lg:size-[515px] rounded-full border border-turmeric/20 pointer-events-none"
            />

            {/* Central Master Circle (The Living Tavern Window) */}
            <div className="relative size-[290px] sm:size-[400px] lg:size-[440px] rounded-full overflow-hidden p-2.5 bg-ivory shadow-[0_25px_60px_-15px_rgba(24,18,12,0.22)] border-2 border-ivory">
              <div className="size-full rounded-full overflow-hidden bg-cream-deep relative">
                <img
                  src={current.photo}
                  alt={current.alt}
                  key={current.photo}
                  className="size-full object-cover transition-all duration-1000 ease-out-expo hover:scale-108 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />



                {/* Floating Bottom Pill Inside the Circle (Centered, will never clip) */}
                <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                  <div className="inline-flex items-center gap-2 rounded-full bg-ink/85 backdrop-blur-md px-4 py-1.5 text-center border border-white/20 shadow-lg whitespace-nowrap">
                    <span className="size-1.5 rounded-full bg-turmeric animate-pulse shrink-0" />
                    <span className="font-display text-xs sm:text-sm text-cream font-medium tracking-wide">
                      {current.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top-Right Orbital Satellite (Round Mini Photo Orb) */}
            <div className="absolute -top-3 right-4 sm:right-8 z-20 size-20 sm:size-26 rounded-full overflow-hidden p-1.5 bg-ivory shadow-xl border border-ink/15 transform rotate-3 hover:scale-110 transition-transform duration-300 pointer-events-none">
              <div className="size-full rounded-full overflow-hidden">
                <img
                  src="/photos/inside-view-1.jpg"
                  alt="Red laterite bar"
                  className="size-full object-cover"
                />
              </div>
            </div>

            {/* Bottom-Left Orbital Satellite (Round Mini Photo Orb) */}
            <div className="absolute -bottom-3 left-4 sm:left-8 z-20 size-22 sm:size-28 rounded-full overflow-hidden p-1.5 bg-ivory shadow-xl border border-ink/15 transform -rotate-6 hover:scale-110 transition-transform duration-300 pointer-events-none">
              <div className="size-full rounded-full overflow-hidden">
                <img
                  src="/photos/dish-goan-fish-thali.jpg"
                  alt="Fresh Goan Fish Thali"
                  className="size-full object-cover"
                />
              </div>
            </div>


          </div>

          {/* RIGHT 6 COLS: The Flowing Stories (Curved / Organic Rhythm) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[0.72rem] font-mono tracking-widest text-chilli uppercase font-semibold block">
              सांजेचो ताल &bull; Three Moments of an Evening
            </span>

            {/* Interactive Moment Selector Rows (Flowing lines, NOT boxes!) */}
            <div className="space-y-4">
              {moments.map((item, idx) => {
                const isSelected = activeStory === idx
                return (
                  <div
                    key={item.num}
                    onClick={() => setActiveStory(idx)}
                    className={`group cursor-pointer rounded-[24px] p-5 sm:p-6 transition-all duration-300 relative border ${
                      isSelected
                        ? 'bg-ivory border-chilli/35 shadow-[0_12px_32px_-10px_rgba(194,65,12,0.12)] translate-x-2'
                        : 'bg-transparent border-ink/8 hover:bg-ivory/60 hover:border-ink/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Number Callout */}
                      <span
                        className={`font-mono text-lg sm:text-xl font-bold transition-colors ${
                          isSelected ? 'text-chilli' : 'text-ink-soft/40 group-hover:text-ink-soft'
                        }`}
                      >
                        {item.num}
                      </span>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-[1.25rem] sm:text-[1.4rem] font-medium text-ink">
                            {item.title}
                          </h3>
                          <span
                            lang="kok"
                            className={`font-serif text-sm ${
                              isSelected ? 'text-chilli' : 'text-ink-soft/60'
                            }`}
                          >
                            {item.kok}
                          </span>
                        </div>

                        <p className="mt-1 text-[0.78rem] font-mono uppercase tracking-wider text-turmeric-deep font-semibold">
                          {item.subtitle}
                        </p>

                        <p className="mt-2.5 text-[0.88rem] sm:text-[0.94rem] text-ink-soft leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Verified Hours & Table Note */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[0.78rem] font-medium text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-turmeric animate-pulse" />
                Dinner 7:00 pm &ndash; 11:00 pm
              </span>
              <span className="text-ink/25">&bull;</span>
              <span>Closed Thursdays</span>
              <span className="text-ink/25">&bull;</span>
              <span>Santemol Road, Curtorim</span>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* 3. FLUID TRANSITION TO SIGNATURE DISHES                        */}
        {/* ============================================================== */}
        <div className="mt-16 sm:mt-24 pt-8 sm:pt-10 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="font-display text-[1.1rem] sm:text-[1.25rem] text-ink font-medium">
              Ready to sit at our family table tonight?
            </p>
            <p className="text-[0.84rem] text-ink-soft mt-1">
              Fresh seafood, cold drinks, and unhurried Goan hospitality.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              to="/book"
              variant="primary"
              showArrow
              className="!py-2.5 !px-6 text-[0.8rem]"
            >
              Reserve a Table
            </Button>

            <div className="flex items-center gap-2 text-chilli/85">
              <span className="font-serif italic text-sm text-ink-soft">
                see what we cook every evening
              </span>
              <HandDrawnArrow width={32} height={20} className="transform rotate-45 text-chilli" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SusegadExperience
