import Image from 'next/image'
import { Testimonials } from '@/custom'

export default function RolamPage() {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Rólam</h2>
      <div className="flex gap-4 flex-wrap sm:flex-nowrap mb-8 items-center sm:items-start">
        <p className="text-gray-700 leading-relaxed">
          A nevem Kati, és szenvedélyem a kutyák szépítése és jó közérzetének biztosítása. Célom,
          hogy minden kutya boldogan és felfrissülve távozzon a szalonomból, miközben a gazdik
          teljes mértékben elégedettek a végeredménnyel. Óbudai kutyakozmetikámban szeretettel várok
          minden méretű és fajtájú kutyust.
        </p>
        <Image
          src="/kati2.png"
          alt=""
          width="180"
          height="180"
          style={{
            transform: 'scale(-1.3, 1.3)',
            filter: 'drop-shadow(2px 2px 2px #444)',
          }}
          className="sm:-mt-10 mb-8 mx-auto"
        />
      </div>
      <Testimonials />
    </section>
  )
}
