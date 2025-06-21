import Image from 'next/image'
import { Testimonials } from '@/custom'

export default function RolamPage() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Rólam</h2>
      <div className="flex gap-2 flex-wrap sm:flex-nowrap mb-8 items-center sm:items-start">
        <p className="text-gray-700 leading-relaxed">
          Sziasztok kedves Vendégeim! Hadd mutatkozzam be pár szóban, de nem írnám le a sablonos
          szöveget, hogy mindig is kutyákkal akartam foglakozni, mert nem is tudtam hogy ez
          lehetséges. Sokat tengődtem ifjabb koromban mi is szeretnék lenni, irigykedve néztem
          osztálytársaimat, hogy fiatalon tudták, hogy orvosok, ügyvédek vagy efféle komoly
          dolgokkal szeretnének foglalkozni. Elmentem, elvégeztem egy egyetemet, de közben is
          éreztem, hogy ez nem az amit keresek. Agyaltam, hogy mi az vagy ki az aki tényleg szívből
          örömet tud okozni nekem, így esett a választás erre a pályára, amit 2021 óta folyamatosan
          művelek mióta megkaptam az oklevelem. Nem mondom hogy könnyű utat jártam be, mire elértem,
          hogy saját szalont nyithassak, de erre igazán büszke vagyok. Sose választanék más szakmát,
          hiszen ebben érzem magam sikeresnek és kiteljesedettnek. Szívügyem a mentett és kóbor
          kutyusok sorsa, mivel velük nőttem fel amióta az eszemet tudom. Ezer szónak is egy a vége,
          gyertek és ismerjük meg egymást, hogy egy kölcsönösen alapuló bizalmat tudjunk létrehozni
          Veled és a kutyusoddal! 💖
        </p>
        <Image
          src="/kati2.png"
          alt=""
          width="180"
          height="180"
          style={{
            transform: 'scale(-1.4, 1.4)',
            filter: 'drop-shadow(2px 2px 2px #444)',
          }}
          className="sm:mt-10 mb-8 mx-auto"
        />
      </div>
      <Testimonials />
    </section>
  )
}
