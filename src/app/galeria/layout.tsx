import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galéria',
  keywords: ['galéria', 'képek', 'munkák', 'kutyakozmetika', 'előtte-utána', 'Budapest'],
  openGraph: {
    title: 'Galéria | Óbunda Kutyakozmetika',
    url: 'https://obunda.hu/galeria',
    type: 'website',
    images: [
      {
        url: 'https://obunda.hu/photo1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Óbunda Kutyakozmetika Galéria',
      },
    ],
  },
  alternates: {
    canonical: 'https://obunda.hu/galeria',
  },
}

export default function GaleriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
