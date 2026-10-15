import { SITE_URL, site } from '@/content/site'
import { Head } from '@/components/ui/Head'
import { Hero } from '@/components/sections/Hero'
import { SusegadExperience } from '@/components/sections/SusegadExperience'
import { SignatureDishes } from '@/components/sections/SignatureDishes'
import { MenuPreview } from '@/components/sections/MenuPreview'
import { Gallery } from '@/components/sections/Gallery'
import { Reviews } from '@/components/sections/Reviews'
import { VisitUs } from '@/components/sections/VisitUs'
import { restaurantJsonLd, faqJsonLd } from '@/lib/seo'

export default function Home() {
  return (
    <>
      <Head
        title="Goan family restaurant in South Goa"
        description={site.seo.description}
        path="/"
        jsonLd={[
          restaurantJsonLd(),
          faqJsonLd(site.faqs),
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url: SITE_URL,
          },
        ]}
      />

      <Hero />
      <SusegadExperience />
      <SignatureDishes />
      <MenuPreview />
      <Gallery limit={4} heading="A look inside." />
      <Reviews />
      <VisitUs />
    </>
  )
}

