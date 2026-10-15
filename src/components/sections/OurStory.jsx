import { site } from '@/content/site'
import { Lines } from '@/components/ui/Lines'
import { Reveal } from '@/components/ui/Reveal'
import { Photo } from '@/components/ui/Photo'
import { Button } from '@/components/ui/Button'
import { AzulejoCorner } from '@/components/svg/AzulejoCorner'
import { WaveDivider } from '@/components/svg/WaveDivider'
import { HeritageBadge } from '@/components/ui/HeritageBadge'

export function OurStory() {
  const [first, second, third] = site.story.paragraphs

  return (
    <section id="story" className="relative bg-cream-deep py-24 sm:py-32 overflow-hidden">
      {/* Decorative top wave transition */}
      <div className="absolute top-0 inset-x-0">
        <WaveDivider fill="var(--color-cream)" inverted height={36} />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <HeritageBadge kok="आमची गोष्ट" label={site.story.kicker} />
            <Lines as="h2" className="mt-5 text-display-2 display-wonk text-ink">
              {site.story.heading}
            </Lines>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <Lines as="p" mode="scrub" className="text-lead text-ink-soft leading-relaxed">
              {first}
            </Lines>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-12 lg:items-center">
          <Reveal variant="settle" duration={1.15} className="lg:col-span-5 relative">
            {/* Azulejo corners framing the founder photo */}
            <div className="absolute -top-3 -left-3 z-20 pointer-events-none">
              <AzulejoCorner position="top-left" size={36} className="text-chilli/50" />
            </div>
            <div className="absolute -bottom-3 -right-3 z-20 pointer-events-none">
              <AzulejoCorner position="bottom-right" size={36} className="text-chilli/50" />
            </div>

            <div className="relative overflow-hidden rounded-[24px] border border-ink/15 shadow-[0_20px_50px_-10px_rgba(24,18,12,0.15)] bg-ivory">
              <Photo
                photo={site.story.photo}
                ratio="4 / 5"
                sizes="(min-width: 1024px) 40vw, 88vw"
                imgClassName="scale-[1.02] hover:scale-105 transition-transform duration-700 ease-out-expo"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5 text-cream">
                <p className="font-display text-[1.1rem] italic leading-tight text-cream">
                  {site.story.credit}
                </p>
                <p className="mt-0.5 text-[0.72rem] tracking-widest text-cream/70 uppercase">
                  Founder & Head of Kitchen · Curtorim
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Lines as="p" mode="scrub" className="text-lead text-ink-soft leading-relaxed">
              {second}
            </Lines>
            <Lines as="p" mode="scrub" className="mt-6 text-lead text-ink-soft leading-relaxed">
              {third}
            </Lines>

            <blockquote className="mt-10 relative overflow-hidden rounded-[24px] border border-ink/12 bg-ivory p-7 sm:p-8 shadow-xs">
              <span className="font-serif text-5xl leading-none text-chilli/30 block mb-2">
                &ldquo;
              </span>
              <p className="font-display text-quote italic display-quiet text-ink leading-snug">
                {site.story.pullQuote}
              </p>
              <footer className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="kicker text-ink-soft font-semibold">{site.story.credit}</span>
                <span lang="kok" className="text-[1rem] text-chilli">मन भरून खा</span>
              </footer>
            </blockquote>

            <div className="mt-10">
              <Button to="/story" variant="outline" showArrow>
                Read our full journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStory

