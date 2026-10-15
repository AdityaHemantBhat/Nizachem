import { site } from '@/content/site'
import { Head } from '@/components/ui/Head'
import { AzulejoCorner } from '@/components/svg/AzulejoCorner'
import { Users, Fish, Clock } from 'lucide-react'
import {
  WashiTape,
  BrassPaperclip,
  HandDrawnUnderline,
  PushPin,
} from '@/components/svg/StoryArtifacts'
import { StoryCurveDivider } from '@/components/svg/StoryCurveDivider'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import { restaurantJsonLd, breadcrumbJsonLd } from '@/lib/seo'

export default function StoryPage() {
  return (
    <>
      <Head
        title="Our Story — Generations of Goan Home Cooking"
        description="The story of Nizachem: newly opened in Maina, Curtorim. Hand-built with red laterite stone, Portuguese tiles, and generations of unhurried Goan home cooking."
        path="/story"
        jsonLd={[
          restaurantJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Story', path: '/story' },
          ]),
        ]}
      />

      <article className="relative bg-cream overflow-hidden">
        {/* =========================================================================
            HERO MASTHEAD: High-Fashion Editorial Spread Matching Homepage Vibe
           ========================================================================= */}
        <header className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden">
          {/* Ambient Sunset Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[min(90vw,1100px)] rounded-full bg-gradient-to-b from-chilli/12 via-turmeric/10 to-transparent blur-3xl opacity-80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1/4 -right-24 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-sea/8 via-turmeric/5 to-transparent blur-3xl opacity-60"
          />

          {/* Monumental Watermark (निजाचें) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[12%] flex justify-center select-none z-0"
          >
            <span
              lang="kok"
              className="font-serif text-[clamp(8rem,24vw,25rem)] font-normal text-ink/[0.042] leading-none select-none tracking-wider"
            >
              निजाचें
            </span>
          </div>

          <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            {/* Master Headline: Architectural & High-Contrast Editorial Style */}
            <div className="text-center max-w-[1100px] mx-auto">
              <HeritageBadge
                kok="आमची नवी सुरुवात"
                label="Newly Opened Tavern"
                className="mb-5"
              />

              <h1 className="font-display text-[clamp(2.6rem,6.8vw,5.8rem)] font-light leading-[1.03] tracking-[-0.025em] text-ink display-wonk">
                A newly opened tavern,{' '}
                <span className="relative inline-block font-normal italic text-chilli">
                  for a family table
                  <HandDrawnUnderline className="text-chilli/60 absolute -bottom-3 left-0 w-full" />
                </span>{' '}
                that has always been here.
              </h1>

              <p className="mt-7 mx-auto max-w-[62ch] text-[1.05rem] sm:text-[1.2rem] font-normal leading-relaxed text-ink-soft">
                We didn&rsquo;t open Nizachem to build an empire. We opened it so everyone could taste
                genuine, home-cooked Goan food &mdash; the kind of authentic Goan fish curry, slow-roasted
                chicken cafreal, and chilled sol kadi our family has loved for generations. Right here on
                the Santemol road, blending Portuguese heritage charm with a fresh, new-era tavern warmth,
                we opened our doors for you.
              </p>
            </div>

            {/* =========================================================================
                THE VISUAL TRIPTYCH: 3 Real Tavern Portals Matching Homepage Vibe
               ========================================================================= */}
            <div className="relative mt-12 sm:mt-16 flex items-center justify-center">
              {/* Azulejo Corner Accents */}
              <div className="pointer-events-none absolute -top-8 -left-4 sm:left-4 z-20">
                <AzulejoCorner position="top-left" size={54} className="text-chilli/60" />
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-4 sm:right-4 z-20">
                <AzulejoCorner position="bottom-right" size={54} className="text-chilli/60" />
              </div>

              <div className="relative w-full max-w-[1240px] flex items-center justify-center py-6">
                {/* 1. LEFT SATELLITE: The Red Laterite Bar */}
                <div className="hidden lg:block absolute left-2 xl:left-8 top-1/2 -translate-y-1/2 z-20 w-[250px] xl:w-[280px] transform -rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <div className="relative overflow-hidden rounded-[28px] border border-ink/15 bg-ivory/95 p-3 shadow-[0_22px_50px_-10px_rgba(24,18,12,0.2)] backdrop-blur-md">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-cream-deep">
                      <picture className="contents">
                        <source type="image/webp" srcSet="/photos/inside-view-1.webp" />
                        <img
                          src="/photos/inside-view-1.jpg"
                          alt="Hand-carved red laterite bar"
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover transition-transform duration-700 ease-out-expo hover:scale-108"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-cream pointer-events-none">
                        <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-turmeric uppercase">
                          The Hearth Bar
                        </span>
                        <p className="font-display text-base font-semibold leading-tight text-cream mt-0.5">
                          Laterite &amp; Cane
                        </p>
                        <p className="text-[0.68rem] text-cream/80 mt-0.5">
                          140 hand-carved chira stones
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CENTERPIECE ARCH: The Cobalt & Terracotta Facade */}
                <div className="relative z-10 w-full max-w-[620px] px-2 sm:px-4">
                  <div className="relative overflow-hidden rounded-t-[220px] rounded-b-[36px] border-2 border-ink/15 bg-ivory p-3.5 sm:p-5 shadow-[0_30px_70px_-15px_rgba(24,18,12,0.28)]">
                    <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden rounded-t-[200px] rounded-b-[28px] bg-cream-deep">
                      <picture className="contents">
                        <source type="image/webp" srcSet="/photos/outside-view.webp" />
                        <img
                          src="/photos/outside-view.jpg"
                          alt="Nizachem exterior with cobalt blue windows on Santemol road"
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                          className="size-full object-cover transition-transform duration-1000 ease-out-expo hover:scale-105"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent pointer-events-none" />

                      {/* Center Caption Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 text-cream pointer-events-none">
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-turmeric animate-pulse" />
                          <span className="font-mono text-[0.68rem] font-bold tracking-[0.22em] text-turmeric uppercase">
                            Santemol Road · Curtorim
                          </span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-medium text-cream mt-1">
                          The Tavern Doors
                        </h2>
                        <p className="text-xs sm:text-sm text-cream/85 mt-1 max-w-[42ch]">
                          Cobalt blue grid windows and hand-painted Portuguese Azulejo tiles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. RIGHT SATELLITE: The Portuguese Tile Dining Hall */}
                <div className="hidden lg:block absolute right-2 xl:right-8 top-1/2 -translate-y-1/2 z-20 w-[250px] xl:w-[280px] transform rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <div className="relative overflow-hidden rounded-[28px] border border-ink/15 bg-ivory/95 p-3 shadow-[0_22px_50px_-10px_rgba(24,18,12,0.2)] backdrop-blur-md">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-cream-deep">
                      <picture className="contents">
                        <source type="image/webp" srcSet="/photos/inside-view.webp" />
                        <img
                          src="/photos/inside-view.jpg"
                          alt="Portuguese tile flooring and exposed indigo beams"
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover transition-transform duration-700 ease-out-expo hover:scale-108"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-cream pointer-events-none">
                        <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-sea uppercase">
                          Dining Hall
                        </span>
                        <p className="font-display text-base font-semibold leading-tight text-cream mt-0.5">
                          Portuguese Tiles
                        </p>
                        <p className="text-[0.68rem] text-cream/80 mt-0.5">
                          Cool underfoot · Eight tables
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Fact Strip */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[960px] mx-auto">
              <div className="rounded-2xl border border-ink/10 bg-ivory/80 backdrop-blur-sm p-4 text-center sm:text-left">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-chilli">Location</span>
                <p className="font-display font-medium text-ink mt-0.5 text-sm sm:text-base">Maina, Curtorim</p>
                <p className="text-[0.72rem] text-ink-soft">Santemol paddy fields</p>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-ivory/80 backdrop-blur-sm p-4 text-center sm:text-left">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-turmeric-deep">Capacity</span>
                <p className="font-display font-medium text-ink mt-0.5 text-sm sm:text-base">Eight Tables</p>
                <p className="text-[0.72rem] text-ink-soft">Yours for the whole night</p>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-ivory/80 backdrop-blur-sm p-4 text-center sm:text-left">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-sea">Craft</span>
                <p className="font-display font-medium text-ink mt-0.5 text-sm sm:text-base">Laterite &amp; Cane</p>
                <p className="text-[0.72rem] text-ink-soft">Hand-quarried chira stone</p>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-ivory/80 backdrop-blur-sm p-4 text-center sm:text-left">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-[#852648]">Kitchen</span>
                <p className="font-display font-medium text-ink mt-0.5 text-sm sm:text-base">Dawn Rogddo</p>
                <p className="text-[0.72rem] text-ink-soft">Cold granite stone masala</p>
              </div>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION TRANSITION I: Sweeping Landscape Curve from Hero into Founder
           ========================================================================= */}
        <StoryCurveDivider
          variant="sweep-right"
          bg="var(--color-cream)"
          fill="var(--color-ivory)"
          height={64}
          className="-mb-px"
        />

        {/* =========================================================================
            THE FOUNDER'S TABLE — CHETAN ACHARYA
            Intimate restaurant founder presence: honest food, warm hospitality,
            and the heart behind Nizachem.
           ========================================================================= */}
        <section id="founder" aria-labelledby="founder-heading" className="relative pb-24 sm:pb-32 lg:pb-36 pt-6 sm:pt-10 bg-ivory overflow-hidden">
          {/* Ambient warm glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -left-20 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-chilli/6 via-turmeric/5 to-transparent blur-3xl opacity-60"
          />

          <div className="relative z-10 mx-auto max-w-[1340px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              {/* Left: The Founder Photograph — Pinned to the Page */}
              <div className="lg:col-span-6 relative flex justify-center">
                {/* Physical Photo Frame & Mount */}
                <div className="relative group w-full max-w-[500px] p-3.5 sm:p-4 pb-7 sm:pb-8 bg-[#FCFAF6] rounded-2xl border border-ink/15 shadow-[0_26px_55px_-12px_rgba(24,18,12,0.22),0_4px_16px_rgba(24,18,12,0.06)] transform -rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
                  {/* Realistic 3D Push Pin piercing through the top of the photo frame */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-sm">
                    <PushPin size={48} tone="red" />
                  </div>

                  {/* Clean Original Photograph */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F8F5EE] border border-ink/10 flex items-end justify-center">
                    <picture className="contents">
                      <source type="image/webp" srcSet="/photos/Chetan_Acharya.webp" />
                      <img
                        src="/photos/Chetan_Acharya.png"
                        alt="Chetan Acharya — Founder & Host of Nizachem"
                        loading="lazy"
                        decoding="async"
                        className="relative z-10 size-full object-contain object-bottom select-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </picture>
                  </div>

                  {/* Archival Caption on the bottom border */}
                  <div className="mt-3.5 px-1.5 flex items-baseline justify-between select-none">
                    <div>
                      <p className="font-display font-medium text-base sm:text-lg text-ink leading-tight">
                        Chetan Acharya
                      </p>
                      <p className="text-[0.72rem] sm:text-xs font-mono text-ink-soft mt-0.5 tracking-wider uppercase">
                        Founder &amp; Host · Curtorim, Goa
                      </p>
                    </div>
                    <span lang="kok" className="text-sm sm:text-base font-serif text-chilli font-medium">
                      आमचो यजमान
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: The Founder's Voice & Philosophy */}
              <div className="lg:col-span-6">
                <HeritageBadge
                  kok="आमचो यजमान"
                  label="A Note from the Founder"
                  className="mb-5"
                />

                <h2 id="founder-heading" className="font-display text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.08] tracking-[-0.025em] text-ink display-wonk">
                  &ldquo;I wanted a table where our elders{' '}
                  <span className="relative inline-block font-normal italic text-chilli">
                    would feel at home.&rdquo;
                    <HandDrawnUnderline className="text-chilli/60 absolute -bottom-2.5 left-0 w-full" />
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-lead text-ink-soft leading-relaxed">
                  <p>
                    For years, friends across Goa would ask me: between writing in Konkani, advocating for our
                    cultural roots, and running our Monginis bakeries across South Goa, why build a tavern?
                  </p>
                  <p>
                    The answer was always very simple: our food is where Goan soul lives deepest. I wanted a hearth
                    in Curtorim where the fish curry is slow-simmered on clay kunddis with freshly grated coconut,
                    where the red laterite stone breathes with the evening paddy breeze, and where nobody ever rushes you from your table.
                  </p>
                  <p>
                    In Konkani, <em>Nizachem</em> means genuine — real, honest, of our own soil. That is all we cook here.
                    When you step through our door, you are not a customer; you are sitting at our family table.
                  </p>
                </div>

                {/* Personal Signature Block */}
                <div className="mt-10 pt-6 border-t border-ink/10">
                  <span lang="kok" className="font-serif text-base text-chilli block font-medium">
                    देव बरें करूं,
                  </span>
                  <p className="font-display text-2xl font-medium text-ink mt-0.5">
                    Chetan Acharya
                  </p>
                  <p className="text-xs text-ink-soft font-mono uppercase tracking-wider mt-0.5">
                    Founder, Nizachem Restaurant &amp; Bar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION TRANSITION II: Harmonious Counter-Sweep from Founder into Scrapbook
           ========================================================================= */}
        <StoryCurveDivider
          variant="sweep-left"
          bg="var(--color-ivory)"
          fill="var(--color-cream)"
          height={64}
          className="-mb-px"
        />

        {/* =========================================================================
            EDITORIAL CHAPTER II: OPENING WEEK FIELD SCRAPBOOK & ARTIFACTS
            Authentic Polaroids, washi tape, and the hand-written opening docket
           ========================================================================= */}
        <section aria-labelledby="scrapbook-heading" className="py-20 lg:py-28 bg-cream">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-[700px]">
              <HeritageBadge
                kok="पयलो आठवडो"
                label="Opening Week Notes"
                className="mb-4"
              />
              <h2 id="scrapbook-heading" className="font-display text-display-2 display-wonk text-ink">
                Fresh paint and unhurried evenings.
              </h2>
              <p className="mt-3 text-lead text-ink-soft">
                Candid snapshots and notes from our very first week of welcoming guests into Nizachem.
              </p>
            </div>

            {/* Asymmetric Pinboard Collage */}
            <div className="mt-14 grid gap-8 md:grid-cols-12 items-start">
              {/* Polaroid 1: Facade (Span 4) */}
              <div className="md:col-span-4 relative group p-4 bg-ivory rounded-2xl shadow-[0_16px_36px_-10px_rgba(24,18,12,0.12)] border border-ink/12 transform md:rotate-[-2deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <WashiTape tone="turmeric" width={80} />
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream-deep">
                  <picture className="contents">
                    <source type="image/webp" srcSet="/photos/outside-view.webp" />
                    <img
                      src="/photos/outside-view.jpg"
                      alt="Terracotta facade with blue grid windows"
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out-expo"
                    />
                  </picture>
                </div>
                <div className="pt-4 pb-1">
                  <p className="font-display font-medium text-base text-ink">The Day the Signboard Went Up</p>
                  <p className="text-xs text-ink-soft/80 mt-1 italic">
                    Azulejo tiles mounted on Santemol road. School children stopped their bicycles to look.
                  </p>
                  <div className="mt-3 pt-2 border-t border-ink/8 flex items-center justify-between font-mono text-[0.66rem] text-chilli font-bold uppercase">
                    <span>Maina · Oct 2026</span>
                    <span>Opening Day</span>
                  </div>
                </div>
              </div>

              {/* Artifact 2: The Hand-Written Kitchen Ticket (Span 4) */}
              <div className="md:col-span-4 relative p-6 bg-cream rounded-2xl shadow-[0_16px_36px_-10px_rgba(24,18,12,0.1)] border-2 border-dashed border-ink/20 transform md:rotate-[1deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute -top-5 right-8 z-20">
                  <BrassPaperclip />
                </div>

                <div className="border-b border-ink/12 pb-3">
                  <span className="font-mono text-[0.68rem] font-bold text-chilli uppercase tracking-widest block">
                    Docket #014 · Table 04 · Opening Night
                  </span>
                  <p className="font-display text-lg font-medium text-ink mt-0.5">A Family Dinner</p>
                </div>

                <ul className="mt-4 space-y-2 font-mono text-xs text-ink-soft">
                  <li className="flex justify-between border-b border-ink/6 pb-1">
                    <span>2x Kingfish Rava Fry</span>
                    <span className="text-ink font-bold">Crisp semolina crust</span>
                  </li>
                  <li className="flex justify-between border-b border-ink/6 pb-1">
                    <span>1x Sungta (Prawn) Curry</span>
                    <span className="text-ink font-bold">Mild kokum tang</span>
                  </li>
                  <li className="flex justify-between border-b border-ink/6 pb-1">
                    <span>4x Hot Poee Breads</span>
                    <span className="text-ink font-bold">From village bakery</span>
                  </li>
                  <li className="flex justify-between pb-1">
                    <span>2x Cold Sol Kadi</span>
                    <span className="text-ink font-bold">Double garlic</span>
                  </li>
                </ul>

                <div className="mt-5 pt-3 border-t border-ink/10 text-xs italic text-ink-soft/90">
                  &ldquo;They stayed until 11:30 PM talking about old football matches at Curtorim ground. Nobody brought the bill until they stood up.&rdquo;
                </div>
              </div>

              {/* Polaroid 3: The Carved Stone Bar (Span 4) */}
              <div className="md:col-span-4 relative group p-4 bg-ivory rounded-2xl shadow-[0_16px_36px_-10px_rgba(24,18,12,0.12)] border border-ink/12 transform md:rotate-[2deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <WashiTape tone="chilli" width={80} />
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream-deep">
                  <picture className="contents">
                    <source type="image/webp" srcSet="/photos/inside-view-1.webp" />
                    <img
                      src="/photos/inside-view-1.jpg"
                      alt="Red laterite bar and woven cane"
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out-expo"
                    />
                  </picture>
                </div>
                <div className="pt-4 pb-1">
                  <p className="font-display font-medium text-base text-ink">First Glow of the Chira Arch</p>
                  <p className="text-xs text-ink-soft/80 mt-1 italic">
                    Raw red stone absorbing the amber lighting. The cane counter smelled of fresh river reed.
                  </p>
                  <div className="mt-3 pt-2 border-t border-ink/8 flex items-center justify-between font-mono text-[0.66rem] text-turmeric-deep font-bold uppercase">
                    <span>Bar Stills</span>
                    <span>Cashew Feni</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION TRANSITION III: Architectural Arch Curve from Scrapbook into Invitation
           ========================================================================= */}
        <StoryCurveDivider
          variant="arch"
          bg="var(--color-cream)"
          fill="var(--color-ivory)"
          height={64}
          className="-mb-px"
        />

        {/* =========================================================================
            INVITATION / COME SIT AT OUR TABLE IN CURTORIM
           ========================================================================= */}
        <section aria-label="Visit Nizachem" className="py-24 sm:py-32 bg-ivory">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden rounded-[38px] border border-ink/15 bg-gradient-to-br from-cream-deep via-ivory to-cream-deep p-8 sm:p-14 lg:p-16 shadow-[0_24px_60px_-15px_rgba(24,18,12,0.12)]">
              <div className="absolute top-4 left-4 pointer-events-none opacity-45">
                <AzulejoCorner position="top-left" size={44} className="text-chilli" />
              </div>
              <div className="absolute bottom-4 right-4 pointer-events-none opacity-45">
                <AzulejoCorner position="bottom-right" size={44} className="text-chilli" />
              </div>

              <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <span lang="kok" className="text-2xl sm:text-3xl text-chilli block font-serif">
                    येयात, आमी वाट पळयतात
                  </span>
                  <h2 className="mt-2 font-display text-3xl sm:text-5xl text-ink font-normal leading-[1.06] display-wonk">
                    Come sit at our table.
                  </h2>
                  <p className="mt-4 text-[0.98rem] text-ink-soft leading-relaxed max-w-[54ch]">
                    We are right on the Santemol-Maina road. We&rsquo;ll pour the sol kadi cold, fry your
                    catch fresh, and welcome you into our newly opened home.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    <span className="rounded-full bg-cream px-3 py-1 border border-ink/10">
                      Maina, Curtorim, South Goa 403720
                    </span>
                    <span>·</span>
                    <span className="rounded-full bg-cream px-3 py-1 border border-ink/10">
                      Dinner 7:00 pm – 11:00 pm
                    </span>
                    <span>·</span>
                    <span className="rounded-full bg-chilli/10 text-chilli px-3 py-1 border border-chilli/20">
                      Closed Thursdays
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl border border-ink/15 bg-[#FCFAF6] p-6 sm:p-7 pt-7 sm:pt-8 shadow-[0_20px_45px_-12px_rgba(24,18,12,0.16),0_4px_16px_rgba(24,18,12,0.06)] transform sm:rotate-[0.8deg] hover:rotate-0 transition-transform duration-300 ease-out">
                    {/* Single tape sticker holding the card */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none transform -rotate-1">
                      <WashiTape tone="chilli" width={100} height={24} className="shadow-xs" />
                    </div>

                    <div className="border-b border-ink/10 pb-3">
                      <span className="font-mono text-[0.66rem] font-bold uppercase tracking-widest text-chilli block">
                        Table Customs
                      </span>
                      <p className="font-display text-lg font-medium text-ink mt-0.5">
                        What to expect at our table
                      </p>
                    </div>

                    <ul className="mt-4 space-y-3.5 text-xs text-ink-soft">
                      <li className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-chilli/10 text-chilli">
                          <Users className="size-3" />
                        </div>
                        <div>
                          <strong className="block text-ink font-medium">Walk-Ins Always Welcome</strong>
                          <span>
                            Veranda and taverna seats are kept open every evening. If you&rsquo;re on the Santemol road, just step in.
                          </span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sea/15 text-sea">
                          <Fish className="size-3" />
                        </div>
                        <div>
                          <strong className="block text-ink font-medium">Daily Coastal Catch</strong>
                          <span>
                            Sourced fresh from local fishing boats every morning. Cooked over flame until today&rsquo;s catch runs out.
                          </span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-turmeric/25 text-turmeric-deep">
                          <Clock className="size-3" />
                        </div>
                        <div>
                          <strong className="block text-ink font-medium">Unhurried Dining (Susegad)</strong>
                          <span>
                            Gravies simmer slow in claypots. We pour cold sol kadi on arrival and never rush you to turn the table.
                          </span>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-5 pt-3.5 border-t border-ink/8 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] font-mono text-ink-soft/80 uppercase tracking-wider">
                      <span>Roadside Parking</span>
                      <span>·</span>
                      <span>UPI &amp; Cards</span>
                      <span>·</span>
                      <span>Family Friendly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
