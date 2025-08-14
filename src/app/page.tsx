import { Dog, Scissors, HandHeart, Star, Heart, Award, Phone, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ObundaMinimalContent() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative mb-16 -mx-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50"></div>
        <div className="relative z-10 px-8 py-16 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Új szalon, régi szakértelem Óbudán
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Óbunda megnyitotta
              <br />
              <span className="text-purple-600">kapuit!</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Több éves kutyakozmetikai tapasztalattal várlak Téged és kedvencedet Óbuda szívében a
              frissen megnyílt szalonomban, ahol a szeretet, türelem és profi gondoskodás garantált.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 !text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Időpont foglalás
              </Link>
              <Link
                href="/araim"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-purple-600 px-8 py-3 rounded-full font-semibold border-2 border-purple-600 transition-colors"
              >
                Árak megtekintése
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16 px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Miért válassz engem?</h3>
          <p className="text-gray-600 text-lg">
            Professzionális szolgáltatások szeretetteljes környezetben
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
              <Scissors className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Fürdetés, trimmelés, nyírás
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Igény szerint, személyre szabva. Minden kutyus egyedi, ezért az ápolás is az.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
              <HandHeart className="w-8 h-8 text-pink-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Kíméletes bánásmód</h4>
            <p className="text-gray-600 leading-relaxed">
              Stresszmentes környezet a kedvencednek. Türelem és szeretet minden pillanatban.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              <Dog className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Minden fajta, minden méret</h4>
            <p className="text-gray-600 leading-relaxed">
              A legjobbat érdemlik! Kicsi chihuahuától a nagy newfundlandig.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery Preview */}
      <section className="mb-16 px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Munkáim</h3>
          <p className="text-gray-600 text-lg">
            Nézd meg, milyen gyönyörűek lehetnek a szőrös barátaink
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/photo1.jpeg"
              alt="Kutyakozmetikai munka"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/photo2.jpeg"
              alt="Kutyakozmetikai munka"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/photo3.jpeg"
              alt="Kutyakozmetikai munka"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
          >
            További képek megtekintése
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-16 px-4">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <Heart className="w-12 h-12 mx-auto mb-6 fill-current" />
          <h3 className="text-3xl font-bold mb-4">
            ✨ Óbunda – Minőségi alapanyagok, minőségi bánásmód ✨
          </h3>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Tapasztald meg a különbséget! Professzionális kutyakozmetikai szolgáltatásaim a
            legmodernebb eszközökkel és a legjobb termékekkel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Kapcsolat felvétel
            </Link>
            <Link
              href="/szolgaltatasaim"
              className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 !text-white px-8 py-3 rounded-full font-semibold transition-colors border border-purple-500"
            >
              <Award className="w-5 h-5" />
              Szolgáltatásaim
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
