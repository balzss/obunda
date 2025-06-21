'use client'

import type { SyntheticEvent } from 'react'
import { useRef } from 'react'

// Shadcn UI component imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function Home() {
  // Create a ref for each section you want to scroll to
  const kapcsolatRef = useRef(null)
  const hazirendRef = useRef(null)
  const idopontRef = useRef(null) // Ref for the booking section

  // Reusable function to handle the smooth scroll
  // Handle form submission
  const handleBookingSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Here you would typically handle the form data,
    // for example, by sending it to a server or an API.
    alert('Köszönjük a megkeresést! Hamarosan felvesszük veled a kapcsolatot.')
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]">
      <div className="flex flex-col items-center p-4 sm:p-8">
        <main className="w-full max-w-2xl my-16 space-y-24">
          <section ref={idopontRef} className="scroll-mt-16">
            <h2 className="text-3xl font-semibold mb-4">Időpont foglalás</h2>
            <p className="text-sm text-muted-foreground mb-6 text-black">
              Az űrlap kitöltése nem minősül végleges foglalásnak. A megadott elérhetőségeken
              felvesszük veled a kapcsolatot az időpont egyeztetése céljából.
            </p>
            <div className="flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="ownerName">Gazdi neve</Label>
                <Input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  required
                  placeholder="Kovács János"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="dogName">Kutya neve</Label>
                <Input type="text" id="dogName" name="dogName" required placeholder="Buksi" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Telefonszám</Label>
                <Input type="tel" id="phone" name="phone" required placeholder="+36 30 123 4567" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="message">Üzenet (pl. kutya fajtája, igényelt szolgáltatás)</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Kérem írja le a kutyus fajtáját és a kért szolgáltatást..."
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleBookingSubmit}>
                Időpontot kérek
              </Button>
            </div>
          </section>

          {/* -- Contact Section -- */}
          <section ref={kapcsolatRef} className="scroll-mt-16">
            <h2 className="text-3xl font-semibold mb-4">Kapcsolat</h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Cím:</strong> 1034 Budapest, Tímár utca 31.
              </p>
              <p>
                <strong>Telefonszám:</strong>{' '}
                <a href="tel:+36301234567" className="text-main hover:underline">
                  +36 30 123 4567
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:kati@obunda.hu" className="text-main hover:underline">
                  kati@obunda.hu
                </a>
              </p>
              <p>
                <strong>Nyitvatartás:</strong> Hétfő - Péntek, 9:00 - 17:00
              </p>
            </div>
          </section>

          {/* -- Rules Section -- */}
          <section ref={hazirendRef} className="scroll-mt-16">
            <h2 className="text-3xl font-semibold mb-4">Házirend</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Kérlek, érkezz pontosan a megbeszélt időpontra.</li>
              <li>A kutyus érvényes oltásokkal kell, hogy rendelkezzen.</li>
              <li>
                Ha kedvencednek különleges igényei vagy egészségügyi problémái vannak, kérlek jelezd
                előre.
              </li>
              <li>A kozmetika előtt legalább 2-3 órával már ne etesd meg a kutyát.</li>
              <li>Pórázon vezesd be a szalonba, és csak a kérésre engedd el.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}
