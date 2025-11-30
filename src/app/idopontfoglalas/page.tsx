'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { events } from '@/data/events'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, Search, X, CalendarCheck, Phone } from 'lucide-react'
// TODO: Uncomment when ready to enable category tabs
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Utility function to remove Hungarian accents for search
function removeAccents(str: string): string {
  return str
    .normalize('NFD') // Decompose characters (e.g., á -> a + accent)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase()
}

// Utility function to format duration in Hungarian
function formatDurationHungarian(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes} perc`
  } else if (remainingMinutes === 0) {
    return `${hours} óra`
  } else {
    return `${hours} óra ${remainingMinutes} perc`
  }
}

const CATEGORIES = [
  'Kistestűek',
  'Közepes testűek',
  'Nagytestűek',
  'Rövidszőrűek',
  'Uszkárok',
  'Schnauzerek',
  'Cicák',
  'További szolgáltatások',
] as const

export default function IdopontFoglalasPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)
  const [calLoaded, setCalLoaded] = useState(false)
  // TODO: Uncomment when ready to enable category tabs
  // const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Initialize Cal.com API
  useEffect(() => {
    ;(async function () {
      try {
        const cal = await getCalApi({ namespace: 'schnauzer-orias-nyirva' })
        cal('ui', {
          theme: 'light',
          cssVarsPerTheme: {
            light: { 'cal-brand': '#c670f4' },
            dark: { 'cal-brand': '#c670f4' },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        })
        setCalLoaded(true)
      } catch (error) {
        console.error('Failed to load Cal.com API:', error)
      }
    })()
  }, [])

  // Filter events based on search query (accent-insensitive)
  // TODO: Uncomment category filtering when ready to enable category tabs
  const filteredEvents = events
    .filter((event) => {
      // const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
      const matchesSearch = removeAccents(event.name).includes(removeAccents(searchQuery))
      return matchesSearch // return matchesCategory && matchesSearch
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  // Group events by category
  const groupedEvents = CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = filteredEvents.filter((event) => event.category === category)
      return acc
    },
    {} as Record<string, typeof events>
  )

  const toggleEvent = (eventId: string) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null)
    } else {
      setExpandedEventId(eventId)
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Időpontfoglalás</h2>

      {/* Contact Options List */}
      <ul className="space-y-2 text-black mb-6">
        <li className="flex gap-2 items-center">
          <CalendarCheck className="w-4 h-4" />
          <div>
            <button
              onClick={() => {
                const firstEvent = document.querySelector('[class*="border-gray-200"]')
                firstEvent?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
              className="text-left"
            >
              Online (lentebb)
            </button>
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <CalendarCheck className="w-4 h-4" />
          <div>
            Telefonon vagy SMS-ben: <Link href="tel:+36305866487">+36 30 586 6487</Link>
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <CalendarCheck className="w-4 h-4" />
          <div>
            Messenger üzenetben:{' '}
            <Link
              href="https://www.facebook.com/profile.php?id=61576907870809"
              target="_blank"
              rel="noopener noreferrer"
            >
              Óbunda kutyakozmetika
            </Link>
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <CalendarCheck className="w-4 h-4" />
          <div>
            Instagram üzenetben:{' '}
            <Link
              href="https://www.instagram.com/obunda_kutyakozmetika"
              target="_blank"
              rel="noopener noreferrer"
            >
              @obunda_kutyakozmetika
            </Link>
          </div>
        </li>
      </ul>

      {/* Additional Info - Pricing note */}
      <div className="mb-6 p-4 bg-brand-purple-50 rounded-lg border border-brand-purple-100">
        <p className="text-sm text-gray-700">
          <strong>Megjegyzés:</strong> Az árak a rendszeresen, 4-8 hetente ápolt kutyákra
          vonatkoznak. Elhanyagolt szőrzet esetén felár számítható fel.
        </p>
      </div>

      {/* TODO: Uncomment when ready to enable category tabs */}
      {/* Category Filter Tabs */}
      {/* <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all">Összes</TabsTrigger>
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs> */}

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Keresés szolgáltatások között..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Events List Grouped by Category */}
      <div>
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nem található ilyen szolgáltatás</div>
        ) : (
          CATEGORIES.map((category) => {
            const categoryEvents = groupedEvents[category]
            if (categoryEvents.length === 0) return null

            return (
              <div key={category} className="mb-8">
                {/* Category Heading - matching pricing page style */}
                <h3 className="mt-8 first:mt-0">{category}</h3>

                {/* Events in this category */}
                <div className="space-y-4 mt-4">
                  {categoryEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                    >
                      {/* Event Info */}
                      <div className="p-4 bg-white hover:bg-brand-purple-50/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {event.name}
                            </h4>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{formatDurationHungarian(event.durationMinutes)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-brand-purple-600">
                                  {event.price}
                                </span>
                              </div>
                            </div>

                            {event.description && event.description !== '' && (
                              <p className="text-sm text-gray-600 italic">{event.description}</p>
                            )}
                          </div>

                          {!event.slug || event.slug === '' ? (
                            <Button asChild variant="neutral">
                              <Link href="/kapcsolat">
                                <Phone className="w-4 h-4 mr-2" />
                                Kapcsolat
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              onClick={() => toggleEvent(event.id)}
                              variant={expandedEventId === event.id ? 'neutral' : 'default'}
                            >
                              {expandedEventId === event.id ? (
                                <>
                                  <X />
                                  Bezár
                                </>
                              ) : (
                                <>
                                  <Calendar />
                                  Foglalás
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Expanded Cal.com Embed */}
                      {expandedEventId === event.id && calLoaded && (
                        <Cal
                          calLink={event.slug}
                          style={{
                            width: '100%',
                            height: '580px',
                            overflow: 'auto',
                            background: 'white',
                            padding: '0px 8px',
                          }}
                          config={{
                            layout: 'month_view',
                            theme: 'light',
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
