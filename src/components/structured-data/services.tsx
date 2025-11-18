import { events } from '@/data/events'

export function ServicesStructuredData() {
  const services = events
    .filter((event) => event.slug) // Only include services with slugs (bookable services)
    .map((event) => ({
      '@type': 'Service',
      name: event.name,
      serviceType: 'Kutyakozmetika',
      description: event.description || `${event.name} kutyakozmetikai szolgáltatás`,
      provider: {
        '@id': 'https://obunda.hu/#business',
      },
      offers: {
        '@type': 'Offer',
        price: event.price.replace(' Ft-tól', '').replace('.', ''),
        priceCurrency: 'HUF',
      },
    }))

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': services,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
