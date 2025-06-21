import { Star, User, PawPrint } from 'lucide-react'

type Testimonial = {
  id: number
  quote: string
  author: string
  petName: string
  rating: number
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote:
      'Molly kutyusom sosem volt még ilyen puha és illatos! Profi hely, maximálisan elégedettek vagyunk. Csak ajánlani tudom mindenkinek!',
    author: 'Anna',
    petName: 'Molly, bichon',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Nagyon félős kiskutyával érkeztünk, de a türelmes és szakszerű hozzáállás csodát tett. A végeredmény gyönyörű lett, és Mancs is jól érezte magát.',
    author: 'Péter',
    petName: 'Mancs, keverék',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'A legjobb kutyakozmetika a városban! Mindig precíz, tiszta munka. Rex már alig várja a következő alkalmat, ami mindent elárul.',
    author: 'Lilla',
    petName: 'Rex, németjuhász',
    rating: 5,
  },
]

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section>
      <h3 className="text-2xl font-bold tracking-tight">Elégedett Gazdik Mondták</h3>
      <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-4 lg:max-w-none lg:grid-cols-3 text-sm">
        {testimonialsData.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col bg-white shadow-lg transition-transform duration-300 hover:scale-103 hover:shadow-xl"
          >
            <div className="flex-1 px-4 py-6">
              <div className="flex justify-center items-center">
                <StarRating rating={testimonial.rating} />
              </div>
              <blockquote className="mt-6 text-gray-700">
                <p>„{testimonial.quote}”</p>
              </blockquote>
            </div>

            <div className="bg-gray-100 p-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <User className="h-5 w-5 " />
                </div>
                <div className="text-black">{testimonial.author}</div>
              </div>
              <div className="mt-2 flex items-center space-x-2 text-sm">
                <div className="flex-shrink-0">
                  <PawPrint className="h-5 w-5 " />
                </div>
                <span className="text-black">{testimonial.petName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
