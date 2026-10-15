import { site } from '@/content/site'
import { Head } from '@/components/ui/Head'
import { Lines } from '@/components/ui/Lines'
import { Button } from '@/components/ui/Button'
import { TileBorder } from '@/components/svg/TileBorder'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import { restaurantJsonLd, breadcrumbJsonLd } from '@/lib/seo'

const steps = [
  'Pick a date and a time between 7 pm and 11 pm.',
  'Tell us how many are eating and whether you want the big table.',
  'We confirm by phone or WhatsApp within the day.',
]

export default function BookPage() {
  return (
    <>
      <Head
        title="Reserve a table"
        description="Table bookings at Nizachem Restaurant and Bar are opening online soon. Until then, call or message us and we will keep a table."
        path="/book"
        jsonLd={[
          restaurantJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Reserve', path: '/book' },
          ]),
        ]}
      />

      <header className="pt-28 pb-16 sm:pt-36 lg:pt-40">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <HeritageBadge kok="आरक्षण" label="Reservations" />
          <Lines as="h1" className="mt-6 max-w-[20ch] text-display-1 display-wonk text-ink">
            Bookings open soon.
          </Lines>
          <p className="mt-7 max-w-[54ch] text-lead text-ink-soft">{site.booking.note}</p>
        </div>
      </header>

      <section aria-labelledby="how-heading" className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-[32px] border border-ink/15 bg-ivory shadow-xs">
            <TileBorder height={18} />
            <div className="grid gap-10 px-5 py-12 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-16">
              <div>
                <h2 id="how-heading" className="font-display text-[1.6rem] display-quiet text-ink">
                  How it will work.
                </h2>
                <ol className="mt-6 space-y-4">
                  {steps.map((step, i) => (
                    <li key={step} className="flex gap-4 text-[0.98rem] leading-relaxed text-ink-soft">
                      <span className="kicker mt-1 shrink-0 text-chilli font-bold">{`0${i + 1}`}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-ink/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <h2 className="font-display text-[1.6rem] display-quiet text-ink">Right now.</h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  Walk in and we will find you a table — or come around 7:30 pm on a weekday if you want the room to
                  yourselves. We seat families, travelers, and locals alike under the Goan evening sky.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href={site.mapsUrl} variant="outline" showArrow>
                    Get directions
                  </Button>
                  <Button to="/menu" variant="primary" showArrow>
                    View the menu
                  </Button>
                </div>
              </div>
            </div>
            <TileBorder height={18} />
          </div>
        </div>
      </section>
    </>
  )
}
