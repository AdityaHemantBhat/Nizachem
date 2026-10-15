import { site } from '@/content/site'
import { Head } from '@/components/ui/Head'
import { Lines } from '@/components/ui/Lines'
import { MenuItem } from '@/components/ui/MenuItem'
import { Button } from '@/components/ui/Button'
import { TileBorder } from '@/components/svg/TileBorder'
import { HeritageBadge } from '@/components/ui/HeritageBadge'
import { restaurantJsonLd, breadcrumbJsonLd } from '@/lib/seo'

export default function MenuPage() {
  const dishCount = site.menu.reduce((sum, category) => sum + category.items.length, 0)

  return (
    <>
      <Head
        title="Menu — fish thali, chicken cafreal and xacuti"
        description={`The full Nizachem menu: ${dishCount} Goan dishes — fish thali, chicken cafreal, chicken xacuti, crab xec xec, bebinca and more. Prices in rupees.`}
        path="/menu"
        jsonLd={[
          restaurantJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Menu',
            name: `${site.name} menu`,
            hasMenuSection: site.menu.map((category) => ({
              '@type': 'MenuSection',
              name: category.category,
              hasMenuItem: category.items.map((item) => ({
                '@type': 'MenuItem',
                name: item.name,
                description: item.desc,
                offers: { '@type': 'Offer', price: item.price, priceCurrency: 'INR' },
              })),
            })),
          },
        ]}
      />

      <header className="pt-28 pb-12 sm:pt-36 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <HeritageBadge kok="जेवण" label="Authentic Goan Menu" />
          <Lines as="h1" className="mt-6 max-w-[20ch] text-display-1 display-wonk text-ink">
            Everything we cook.
          </Lines>
          <p className="mt-7 max-w-[54ch] text-lead text-ink-soft">
            {dishCount} dishes, cooked to order. Prices in rupees. Tell us if you don&rsquo;t eat chilli — we
            cook to your table, not to a recipe card.
          </p>
        </div>
      </header>

      <section aria-label="Full menu" className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-[32px] border border-ink/15 bg-ivory shadow-xs">
            <TileBorder height={18} />
            <div className="px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
              <div className="grid gap-x-20 gap-y-14 lg:grid-cols-2">
                {site.menu.map((category) => (
                  <section key={category.category} aria-label={category.category}>
                    <h2 className="font-display text-[1.55rem] display-quiet text-ink">
                      {category.category}
                    </h2>
                    <span aria-hidden className="mt-3 block h-px w-full bg-ink/15" />
                    <div className="mt-2">
                      {category.items.map((item) => (
                        <MenuItem key={item.name} {...item} className="border-b border-ink/10 last:border-0" />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
            <TileBorder height={18} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-[52ch] text-[0.88rem] leading-relaxed text-ink-soft">
              Prices and dish list confirmed for the season. Ask about the day&rsquo;s fresh catch — it
              changes with the morning Cutbona and Betul markets.
            </p>
            <Button to="/book" variant="primary" showArrow>
              Reserve a table
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
