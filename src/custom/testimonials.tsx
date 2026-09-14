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
      'Végre egy kozmetika, ahonnan Yara nem feszült és túltöltve jön ki, hanem vidáman és gyönyörűen, fajtaszabályosan nyírva, a bundája pedig tökéletesen kezelve! 🐶✨\nKati elképesztően türelmes és kedves, látszik rajta, mennyire szereti az állatokat és amit csinál.',
    author: 'Mónika',
    petName: 'Yara',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Szerintem nagyon szép lettem a kozmetika után! Masnit is kaptam Katitól 💖 Nagyon szeretek hozzá járni, mindig kókuszillatom van utána, ezért még több puszit kapok otthon, mint amikor sajtszagúan, koszos szőrrel elmegyek Katihoz. Kösz Kati, jövök legközelebb is! 🦄🦢❤️',
    author: 'Orsi',
    petName: 'Millie, golden retriever',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Régóta járunk Katihoz kutyakozmetikára. Nem volt kérdés, hogy megyünk utána az új óbudai saját helyére is, mert Barack nem sok embert visel el sajnos, de Katit nagyon szereti, mindig nyugodt szívvel hagyom ott nála, és igazi minta kutyaként kapom vissza. Kati egyébként jófej, laza és nagyon lelkiismeretes, ajánlom mindenkinek!',
    author: 'Lili',
    petName: 'Barack, bichon',
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
            className="flex flex-col bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-103 hover:shadow-lg"
          >
            <div className="flex-1 px-4 py-6">
              <div className="flex justify-center items-center">
                <StarRating rating={testimonial.rating} />
              </div>
              <blockquote className="mt-6 text-gray-700">
                <p className="whitespace-pre-line">„{testimonial.quote}”</p>
              </blockquote>
            </div>

            <div className="bg-gray-100 p-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <User className="h-5 w-5 " />
                </div>
                <div className="text-gray-900">{testimonial.author}</div>
              </div>
              <div className="mt-2 flex items-center space-x-2 text-sm">
                <div className="flex-shrink-0">
                  <PawPrint className="h-5 w-5 " />
                </div>
                <span className="text-gray-900">{testimonial.petName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
