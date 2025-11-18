export function LocalBusinessStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'PetGrooming',
    '@id': 'https://obunda.hu/#business',
    name: 'Óbunda Kutyakozmetika',
    description: 'Professzionális kutyakozmetika Budapest III. kerületében',
    image: 'https://obunda.hu/kati2.png',
    url: 'https://obunda.hu',
    telephone: '+36305866487',
    email: 'bakacskatalin@gmail.com',
    priceRange: '2000-22000 HUF',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tímár u. 31',
      addressLocality: 'Budapest',
      addressRegion: 'Budapest',
      postalCode: '1034',
      addressCountry: 'HU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.534235705,
      longitude: 19.035678955,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Monday',
        opens: '10:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Tuesday',
        opens: '09:00',
        closes: '17:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Wednesday',
        opens: '11:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '11:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '09:00',
        closes: '17:30',
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61576907870809',
      'https://www.instagram.com/obunda_kutyakozmetika',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
