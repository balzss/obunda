export const MANUAL_EVENT_IDS = [
  'fogtisztitas',
  'karomvagas',
  'egeszsegugyi',
  'buzmirigy'
]

export function generateDiff(apiEvents, localEvents) {
  // Separate manual events from synced events
  const manualEvents = localEvents.filter((e) =>
    MANUAL_EVENT_IDS.includes(e.id)
  )
  const syncedEvents = localEvents.filter(
    (e) => !MANUAL_EVENT_IDS.includes(e.id)
  )

  // Create lookup maps
  const localBySlug = new Map(syncedEvents.map((e) => [e.slug, e]))
  const apiBySlug = new Map(apiEvents.map((e) => [`obunda/${e.slug}`, e]))

  // Find new events (in API but not in local)
  const newEvents = apiEvents.filter((e) => !localBySlug.has(`obunda/${e.slug}`))

  // Find removed events (in local but not in API, excluding manual)
  const removedEvents = syncedEvents.filter((e) => !apiBySlug.has(e.slug))

  // Find updated events
  const updatedEvents = []
  const unchangedEvents = []

  for (const apiEvent of apiEvents) {
    const slug = `obunda/${apiEvent.slug}`
    const localEvent = localBySlug.get(slug)

    if (!localEvent) continue // This is a new event, already handled

    const changes = detectChanges(apiEvent, localEvent)

    if (changes) {
      updatedEvents.push({
        existing: localEvent,
        apiEvent,
        changes
      })
    } else {
      unchangedEvents.push(localEvent)
    }
  }

  return {
    new: newEvents,
    updated: updatedEvents,
    removed: removedEvents,
    unchanged: unchangedEvents,
    manual: manualEvents
  }
}

function detectChanges(apiEvent, localEvent) {
  const changes = {}

  // Check name
  if (apiEvent.title !== localEvent.name) {
    changes.name = apiEvent.title
  }

  // Check duration
  if (apiEvent.lengthInMinutes !== localEvent.durationMinutes) {
    changes.durationMinutes = apiEvent.lengthInMinutes
  }

  // Parse API description to extract price and description
  const cleaned = apiEvent.description.replace(/<br\s*\/?>/gi, ' ').trim()
  const priceMatch = cleaned.match(/(\d{1,2}\.\d{3}\s+Ft-tól)/i)
  const apiPrice = priceMatch ? priceMatch[1] : apiEvent.description
  const apiDescription = priceMatch
    ? cleaned.substring(0, cleaned.indexOf(priceMatch[1])).trim()
    : ''

  // Check price
  if (apiPrice !== localEvent.price) {
    changes.price = apiPrice
  }

  // Check description
  if (apiDescription !== (localEvent.description || '')) {
    changes.description = apiDescription
  }

  // Return null if no changes
  return Object.keys(changes).length > 0 ? changes : null
}
