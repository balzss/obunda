'use client'

import { useState, useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { events } from '@/data/events'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, Search, X } from 'lucide-react'

export default function IdopontFoglalasPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)
  const [calLoaded, setCalLoaded] = useState(false)

  // Initialize Cal.com API
  useEffect(() => {
    (async function () {
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

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <h2 className="text-3xl font-semibold mb-4">Időpont Foglalás</h2>

      <p className="text-gray-700 mb-4">
        Válassza ki a kívánt szolgáltatást és foglaljon időpontot egyszerűen online!
      </p>

      {/* Additional Info - Moved to top */}
      <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
        <p className="text-sm text-gray-700">
          <strong>Megjegyzés:</strong> Az árak a rendszeresen, 4-8 hetente ápolt
          kutyákra vonatkoznak. Elhanyagolt szőrzet esetén felár számítható fel.
        </p>
      </div>

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

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nem található ilyen szolgáltatás
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
            >
              {/* Event Info */}
              <div className="p-4 bg-white hover:bg-purple-50/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {event.name}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-purple-600">
                          {event.price}
                        </span>
                      </div>
                    </div>

                    {event.description && event.description !== '' && (
                      <p className="text-sm text-gray-600 italic">
                        {event.description}
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={() => toggleEvent(event.id)}
                    variant={expandedEventId === event.id ? 'outline' : 'default'}
                    className={
                      expandedEventId === event.id
                        ? ''
                        : 'bg-purple-600 hover:bg-purple-700'
                    }
                  >
                    {expandedEventId === event.id ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Bezár
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Foglalás
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Expanded Cal.com Embed */}
              {expandedEventId === event.id && calLoaded && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-4">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <Cal
                        namespace="schnauzer-orias-nyirva"
                        calLink={event.slug}
                        style={{
                          width: '100%',
                          height: '600px',
                          overflow: 'auto',
                        }}
                        config={{
                          layout: 'month_view',
                          theme: 'light',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
