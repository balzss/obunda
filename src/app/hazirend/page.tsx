import { Bone } from 'lucide-react'

export default function HazirendPage() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Házirend</h2>
      <ul className="space-y-2 text-black">
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>
            Kutyus átvétele: Alaposan átbeszéljük milyen legyen a kutyus fazonja, legjobb, ha
            mutatsz az elképzelt bundáról képet!
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>
            Amennyiben teheted kérlek hagyd nálam a kutyusodat, legtöbbször a kutyus rosszabbul
            viseli, ha gazdi jelen van! Természetesen vannak kivételek. Fontos a nyugodt,
            biztonságos környezet!
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>
            15-20 perc késés után új időpontot keresünk, hogy a következő időben érkező vendégtől ne
            vegyük el a kozmetikai időt!
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>
            Lemondás az időpont előtt 24 órával lehetséges, ezen belül a kozmetika árának 50%-a
            fizetendő.
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>
            Készpénzzel, vagy azonnali átutalással (banki applikáció/Revolut) tudtok fizetni,
            kártyás fizetési lehetőség nincsen!
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>Ha előbb hoznád, vagy később jönnél a kutyusodért, kérlek jelezd felém!</div>
        </li>
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>
            Bejelentkezni telefonon, a weboldalon, Facebookon, Instagramon lehetséges. Mindenképpen
            várd meg, míg visszajelzek az időponttal kapcsolatban!
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>
            A bejelentkezéssel a gazdi hozzájárul, hogy a kutyajáról képek, videók készülhetnek
            portfólió, social media felületek bővítése céljából.
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <Bone size={16} />
          <div>A kozmetika vége előtt hívlak, ha jöhetsz a kutyusért.</div>
        </li>
      </ul>
      <div className="text-lg font-bold my-4 text-black">Köszönöm a megértéseteket!</div>
    </section>
  )
}
