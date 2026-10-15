import { SITE_URL, site } from '@/content/site'

const OG_IMAGE = `${SITE_URL}/og.png`

export function restaurantJsonLd() {
  const days = site.hours
    .filter((h) => !h.closed)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: '19:00',
      closes: '23:00',
    }))

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: site.name,
    description: site.seo.description,
    url: SITE_URL,
    image: [OG_IMAGE],
    servesCuisine: site.cuisine,
    priceRange: site.priceRange,
    hasMenu: `${SITE_URL}/menu`,
    acceptsReservations: 'False',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: 'Curtorim',
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: days,
    sameAs: [site.mapsUrl, site.contact.instagram].filter(Boolean),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    // aggregateRating is intentionally omitted until the real Google rating is confirmed.
  }
}

export function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  }
}

export { OG_IMAGE }
