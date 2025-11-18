import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Időpontfoglalás',
  keywords: ['időpontfoglalás', 'kutyakozmetika', 'online foglalás', 'Budapest', 'Óbuda'],
  openGraph: {
    title: 'Időpontfoglalás | Óbunda Kutyakozmetika',
    url: 'https://obunda.hu/idopontfoglalas',
    type: 'website',
    images: [
      {
        url: 'https://obunda.hu/kati2.png',
        width: 1200,
        height: 630,
        alt: 'Óbunda Kutyakozmetika Időpontfoglalás',
      },
    ],
  },
  alternates: {
    canonical: 'https://obunda.hu/idopontfoglalas',
  },
}

export default function IdopontFoglalasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
