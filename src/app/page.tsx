"use client";

import Image from 'next/image'
import PriceTable from '@/custom/price-table';
import { useRef } from 'react';
import { Instagram, Facebook } from 'lucide-react';

// Shadcn UI component imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default function Home() {
  // Create a ref for each section you want to scroll to
  const rolamRef = useRef(null);
  const araimRef = useRef(null);
  const kapcsolatRef = useRef(null);
  const hazirendRef = useRef(null);
  const idopontRef = useRef(null); // Ref for the booking section

  // Reusable function to handle the smooth scroll
  const scrollToSection = (e, ref) => {
    e.preventDefault();
    if (ref.current) {
      // We calculate the position to account for a potential fixed header
      const top = ref.current.offsetTop;
      window.scrollTo({
        top: top - 32, // Adjust this offset to your needs
        behavior: 'smooth',
      });
    }
  };

  // Handle form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form data,
    // for example, by sending it to a server or an API.
    alert("Köszönjük a megkeresést! Hamarosan felvesszük veled a kapcsolatot.");
    e.target.reset(); // Reset form fields after submission
  };


  return (
    <div className="flex flex-col min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]">
      <div className="flex flex-col items-center p-4 sm:p-8">
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">Óbunda Kutyakozmetika</h1>
            <nav className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="#rolam" onClick={(e) => scrollToSection(e, rolamRef)} className="hover:underline">Rólam</a>
              <a href="#araim" onClick={(e) => scrollToSection(e, araimRef)} className="hover:underline">Áraim</a>
              <a href="#idopont" onClick={(e) => scrollToSection(e, idopontRef)} className="hover:underline">Időpont foglalás</a>
              <a href="#kapcsolat" onClick={(e) => scrollToSection(e, kapcsolatRef)} className="hover:underline">Kapcsolat</a>
              <a href="#hazirend" onClick={(e) => scrollToSection(e, hazirendRef)} className="hover:underline">Házirend</a>
            </nav>
        </header>

        <main className="w-full max-w-2xl my-16 space-y-24">
          {/* -- Introduction Section -- */}
          <section ref={rolamRef} className="scroll-mt-24">
            <h2 className="text-3xl font-semibold mb-4">Rólam</h2>
            <div className="flex gap-4 flex-wrap sm:flex-nowrap">
            <p className="text-gray-700 leading-relaxed">
              Üdvözöllek a weboldalamon! A nevem Kati, és szenvedélyem a kutyák szépítése és jó közérzetének biztosítása. Célom, hogy minden kutya boldogan és felfrissülve távozzon a szalonomból, miközben a gazdik teljes mértékben elégedettek a végeredménnyel. Óbudai kutyakozmetikámban szeretettel várok minden méretű és fajtájú kutyust.
            </p>
              <Image src="/obunda/kati1.jpeg" alt="" width="180" height="180"/>
            </div>
          </section>

          {/* -- Pricing Section -- */}
          <section ref={araimRef} className="scroll-mt-24">
            <h2 className="text-3xl font-semibold mb-4">Áraim</h2>
            <PriceTable />
          </section>

          {/* -- Booking Section (with Shadcn UI) -- */}
          <section ref={idopontRef} className="scroll-mt-24">
            <h2 className="text-3xl font-semibold mb-4">Időpont foglalás</h2>
            <p className="text-sm text-muted-foreground mb-6 text-black">
                Az űrlap kitöltése nem minősül végleges foglalásnak. A megadott elérhetőségeken felvesszük veled a kapcsolatot az időpont egyeztetése céljából.
            </p>
            <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="ownerName">Gazdi neve</Label>
                    <Input type="text" id="ownerName" name="ownerName" required placeholder="Kovács János" />
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
                    <Textarea id="message" name="message" placeholder="Kérem írja le a kutyus fajtáját és a kért szolgáltatást..." />
                </div>
                <Button type="submit" className="w-full">
                    Időpontot kérek
                </Button>
            </form>
          </section>

          {/* -- Contact Section -- */}
          <section ref={kapcsolatRef} className="scroll-mt-24">
            <h2 className="text-3xl font-semibold mb-4">Kapcsolat</h2>
            <div className="text-gray-700 space-y-2">
                <p><strong>Cím:</strong> 1034 Budapest, Tímár utca 31.</p>
                <p><strong>Telefonszám:</strong> <a href="tel:+36301234567" className="text-main hover:underline">+36 30 123 4567</a></p>
                <p><strong>Email:</strong> <a href="mailto:kati@obunda.hu" className="text-main hover:underline">kati@obunda.hu</a></p>
                <p><strong>Nyitvatartás:</strong> Hétfő - Péntek, 9:00 - 17:00</p>
            </div>
          </section>

          {/* -- Rules Section -- */}
          <section ref={hazirendRef} className="scroll-mt-24">
            <h2 className="text-3xl font-semibold mb-4">Házirend</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Kérlek, érkezz pontosan a megbeszélt időpontra.</li>
              <li>A kutyus érvényes oltásokkal kell, hogy rendelkezzen.</li>
              <li>Ha kedvencednek különleges igényei vagy egészségügyi problémái vannak, kérlek jelezd előre.</li>
              <li>A kozmetika előtt legalább 2-3 órával már ne etesd meg a kutyát.</li>
              <li>Pórázon vezesd be a szalonba, és csak a kérésre engedd el.</li>
            </ul>
          </section>
        </main>
      </div>

      {/* -- Footer -- */}
      <footer className="w-full mt-auto bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-sm text-gray-600 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Óbunda Kutyakozmetika. Minden jog fenntartva.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-gray-800">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-gray-800">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
