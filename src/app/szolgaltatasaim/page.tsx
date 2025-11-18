import { PawPrint, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BreadcrumbStructuredData } from '@/components/structured-data/breadcrumb'
import { ServicesStructuredData } from '@/components/structured-data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Szolgáltatások',
  keywords: [
    'kutyakozmetika',
    'fésülés',
    'nyírás',
    'trimmelés',
    'karomvágás',
    'fogtisztítás',
    'árak',
    'Budapest',
  ],
  openGraph: {
    title: 'Szolgáltatások | Óbunda Kutyakozmetika',
    url: 'https://obunda.hu/szolgaltatasaim',
    type: 'website',
    images: [
      {
        url: 'https://obunda.hu/kati2.png',
        width: 1200,
        height: 630,
        alt: 'Óbunda Kutyakozmetika Szolgáltatások',
      },
    ],
  },
  alternates: {
    canonical: 'https://obunda.hu/szolgaltatasaim',
  },
}

export default function SzolgaltatasaimPage() {
  return (
    <section>
      <BreadcrumbStructuredData
        items={[
          { name: 'Kezdőlap', url: 'https://obunda.hu/' },
          { name: 'Szolgáltatások', url: 'https://obunda.hu/szolgaltatasaim' },
        ]}
      />
      <ServicesStructuredData />
      <h2 className="text-3xl font-semibold mb-4">Szolgáltatásaim</h2>
      <ul className="space-y-2 text-black mb-4 mt-8">
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Fürdetés-szárítás, fésülés, csomóbontás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Nyírás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Trimmelés</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Karomvágás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Fültisztítás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Bűzmirigy nyomás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Egészségügyi nyírás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Mancsnyírás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Babaszoktatás</div>
        </li>
        <li className="flex gap-2 items-center">
          <PawPrint size={16} className="flex-shrink-0" />
          <div>Ultrahangos fogtisztítás</div>
        </li>
        <Button asChild size="lg" className="mt-4" variant="neutral">
          <Link href="/idopontfoglalas">
            <Calendar className="w-5 h-5" />
            Időpontfoglalás
          </Link>
        </Button>
      </ul>
    </section>
  )
}
