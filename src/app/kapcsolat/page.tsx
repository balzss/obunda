import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react'
import { businessHours } from '@/data/hours'
import { BreadcrumbStructuredData } from '@/components/structured-data/breadcrumb'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kapcsolat',
  keywords: ['kapcsolat', 'elérhetőség', 'nyitvatartás', 'cím', 'telefon', 'Budapest Óbuda'],
  openGraph: {
    title: 'Kapcsolat | Óbunda Kutyakozmetika',
    url: 'https://obunda.hu/kapcsolat',
    type: 'website',
    images: [
      {
        url: 'https://obunda.hu/kati2.png',
        width: 1200,
        height: 630,
        alt: 'Óbunda Kutyakozmetika Kapcsolat',
      },
    ],
  },
  alternates: {
    canonical: 'https://obunda.hu/kapcsolat',
  },
}

export default function KapcsolatPage() {
  return (
    <section>
      <BreadcrumbStructuredData
        items={[
          { name: 'Kezdőlap', url: 'https://obunda.hu/' },
          { name: 'Kapcsolat', url: 'https://obunda.hu/kapcsolat' },
        ]}
      />
      <h2 className="text-3xl font-semibold mb-4">Kapcsolat</h2>

      <div className="flex flex-col gap-2">
        <p className="text-black flex gap-2 items-center">
          <Phone size={18} />
          <span className="font-bold">Telefon:</span>{' '}
          <Link href="tel:+36305866487">+36 30 586 6487</Link>
        </p>
        <p className="text-black flex gap-2 items-center">
          <Mail size={18} />
          <span className="font-bold">Email:</span>{' '}
          <Link href="mailto:bakacskatalin@gmail.com">bakacskatalin@gmail.com</Link>
        </p>
        <p className="text-black flex gap-2 items-center">
          <Facebook size={18} />
          <span className="font-bold">Facebook:</span>{' '}
          <Link href="https://www.facebook.com/profile.php?id=61576907870809" target="_blank">
            Óbunda kutyakozmetika
          </Link>
        </p>
        <p className="text-black flex gap-2 items-center">
          <Instagram size={18} />
          <span className="font-bold">Instagram:</span>{' '}
          <Link href="https://www.instagram.com/obunda_kutyakozmetika" target="_blank">
            @obunda_kutyakozmetika
          </Link>
        </p>
        <p className="text-black flex gap-2 items-center">
          <MapPin size={18} />
          <span className="font-bold">Cím:</span> Budapest, Tímár u. 31, 1034
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-3">Nyitva tartás</h3>
        <div className="flex flex-col gap-2">
          {businessHours.map((schedule, index) => (
            <p
              key={index}
              className={`flex gap-2 items-center ${schedule.isClosed ? 'text-gray-500' : 'text-black'}`}
            >
              <Clock size={18} />
              <span className="font-bold">{schedule.day}:</span> {schedule.hours}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d884.494633154932!2d19.035678955774635!3d47.534235705000626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d9503a5e570b%3A0x215866a61c3b51ec!2s%C3%93bunda%20kutyakozmetika!5e0!3m2!1sen!2shu!4v1750495364637!5m2!1sen!2shu"
          width="100%"
          height="450"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  )
}
