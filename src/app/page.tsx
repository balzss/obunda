import { Dog, Scissors, HandHeart } from 'lucide-react'

export default function ObundaMinimalContent() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <section className="mb-10 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Új szalon, régi szakértelem, Óbunda megnyitotta kapuit!
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Több éves kutyakozmetikai tapasztalattal várlak Téged és kedvencedet a frissen megnyílt
          szalonomban, ahol a szeretet, türelem és profi gondoskodás garantált.
        </p>
      </section>

      <section className="mb-10">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-md border border-gray-200 flex flex-col items-center text-center gap-2">
            <Scissors size={36} />
            <h3 className="text-base font-semibold text-black">Fürdetés, trimmelés, nyírás</h3>
            <p className="text-gray-600 text-sm">Igény szerint, személyre szabva.</p>
          </div>

          <div className="p-4 bg-white rounded-md border border-gray-200 flex flex-col items-center text-center gap-2">
            <HandHeart size={36} />
            <h3 className="text-base font-semibold text-black">Kíméletes bánásmód</h3>
            <p className="text-gray-600 text-sm">Stresszmentes környezet a kedvencednek.</p>
          </div>

          <div className="p-4 bg-white rounded-md border border-gray-200 flex flex-col items-center text-center gap-2">
            <Dog size={36} />
            <h3 className="text-base font-semibold text-black">Minden fajta, minden méret</h3>
            <p className="text-gray-600 text-sm">A legjobbat érdemlik!</p>
          </div>
        </div>
      </section>

      <section className="text-center text-gray-600 text-lg">
        <p>✨ Óbunda – Minőségi alapanyagok, minőségi bánásmód ✨</p>
      </section>
    </div>
  )
}
