import Image from 'next/image'
import { Testimonials } from '@/custom'

export default function RolamPage() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Rólam</h2>
      <div className="relative mb-8">
        <div className="hidden sm:block float-right ml-6 mb-4">
          <Image
            src="/kati4.jpeg"
            alt="Kati - Kutyakozmetikus"
            width="300"
            height="300"
            className="rounded-lg shadow-md object-cover w-72 h-72"
          />
        </div>
        <p className="text-gray-700 leading-relaxed text-lg mt-4">
          Örülök, hogy bemutatkozhatok azoknak, akik még nem jártak nálam! Sziasztok, Bakács Kati
          vagyok, az Óbunda megalapítója.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg mt-4">
          2021-ben szereztem meg a kutyakozmetikus képesítésemet, és azóta több ezer kutyus
          szépülhetett a kezeim között. Nem szeretnék sablonos bemutatkozással kezdeni – elég annyi,
          hogy a kutyák egész életem meghatározó részei, és számomra természetes, hogy velük
          dolgozhatok.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg mt-4">
          Ez az első munkám, amit ennyire szenvedéllyel és lelkiismeretesen végzek. Végre valóra
          ovált az álmom, és megnyithattam a saját kutyakozmetikámat! Úgy tekintek erre a szakmára,
          mint egy folyamatosan fejlődő, izgalmas és motiváló hivatásra – amiben mindig van új
          dolog, amit tanulhatok.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg mt-4">
          Különösen közel áll a szívemhez a mentett kutyusok segítése, hiszen sokszor méltatlanul
          alulértékeljük a bennük rejlő csodálatos lehetőségeket.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg mt-4">
          Szeretettel várok mindenkit Óbundában – gyertek, ismerkedjünk meg, és tegyük szebbé
          kutyusotok mindennapjait!
        </p>
        <div className="sm:hidden mt-6 flex justify-center">
          <Image
            src="/kati4.jpeg"
            alt="Kati - Kutyakozmetikus"
            width="300"
            height="300"
            className="rounded-lg shadow-md object-cover w-64 h-64"
          />
        </div>
      </div>
      <Testimonials />
    </section>
  )
}
