#!/usr/bin/env node

import { fetchCalEvents } from './lib/cal-api.js'
import { transformToEventType } from './lib/event-parser.js'
import { generateDiff } from './lib/diff-generator.js'
import {
  reviewNewEvent,
  reviewUpdatedEvent,
  reviewRemovedEvent,
  confirmFinalChanges
} from './lib/cli-prompts.js'
import { updateEventsFile } from './lib/file-updater.js'

// Load local events from the source file
async function loadLocalEvents() {
  const { readFileSync } = await import('fs')
  const fileContent = readFileSync('./src/data/events.ts', 'utf-8')

  // Extract the events array using regex
  const match = fileContent.match(/export const events:\s*EventType\[\]\s*=\s*(\[[\s\S]*\])/m)
  if (!match) {
    throw new Error('Could not parse events from events.ts')
  }

  // Use eval to parse the array (safe since it's our own code)
  // eslint-disable-next-line no-eval
  const events = eval(match[1])
  return events
}

function displaySummary(diff) {
  console.log('\n' + '='.repeat(60))
  console.log('Cal.com Event Sync')
  console.log('='.repeat(60))
  console.log(
    `\nTotal API Events: ${diff.new.length + diff.updated.length + diff.unchanged.length}`
  )
  console.log(
    `Current Local Events: ${diff.new.length + diff.updated.length + diff.unchanged.length + diff.manual.length + diff.removed.length}`
  )
  console.log(`  - Cal.com synced: ${diff.updated.length + diff.unchanged.length}`)
  console.log(`  - Manual (preserved): ${diff.manual.length}`)
  console.log('\nChanges Detected:')
  console.log(`  - NEW: ${diff.new.length} events`)
  console.log(`  - UPDATED: ${diff.updated.length} events`)
  console.log(`  - REMOVED: ${diff.removed.length} events`)
  console.log(`  - UNCHANGED: ${diff.unchanged.length} events`)
  console.log(`  - MANUAL (preserved): ${diff.manual.length} events`)
}

async function main() {
  try {
    console.log('Cal.com Event Sync Tool')
    console.log('=======================\n')

    // 1. Fetch from API
    console.log('Fetching events from cal.com API...')
    const apiEvents = await fetchCalEvents()
    console.log(`✓ Fetched ${apiEvents.length} events\n`)

    // 2. Load local events
    console.log('Loading local events from events.ts...')
    const localEvents = await loadLocalEvents()
    console.log(`✓ Loaded ${localEvents.length} local events\n`)

    // 3. Generate diff
    const diff = generateDiff(apiEvents, localEvents)
    displaySummary(diff)

    // Check if there are any changes
    if (
      diff.new.length === 0 &&
      diff.updated.length === 0 &&
      diff.removed.length === 0
    ) {
      console.log('\n✓ No changes detected. Everything is in sync!')
      return
    }

    console.log('\n' + '='.repeat(60))
    console.log('Starting interactive review...')
    console.log('='.repeat(60))

    // 4. Review new events
    const acceptedNewEvents = []
    if (diff.new.length > 0) {
      console.log(`\n--- Reviewing ${diff.new.length} NEW events ---`)
      for (let i = 0; i < diff.new.length; i++) {
        const result = await reviewNewEvent(diff.new[i], i, diff.new.length)
        if (result.accepted) {
          acceptedNewEvents.push({
            event: result.event,
            category: result.category
          })
        }
      }
      console.log(
        `\n✓ Accepted ${acceptedNewEvents.length}/${diff.new.length} new events`
      )
    }

    // 5. Review updated events
    const acceptedUpdates = []
    if (diff.updated.length > 0) {
      console.log(`\n--- Reviewing ${diff.updated.length} UPDATED events ---`)
      for (let i = 0; i < diff.updated.length; i++) {
        const result = await reviewUpdatedEvent(diff.updated[i], i, diff.updated.length)
        if (result.accepted) {
          acceptedUpdates.push(result.event)
        }
      }
      console.log(
        `\n✓ Accepted ${acceptedUpdates.length}/${diff.updated.length} updates`
      )
    }

    // 6. Review removed events
    const eventsToRemove = []
    if (diff.removed.length > 0) {
      console.log(`\n--- Reviewing ${diff.removed.length} REMOVED events ---`)
      for (let i = 0; i < diff.removed.length; i++) {
        const result = await reviewRemovedEvent(diff.removed[i], i, diff.removed.length)
        if (result.remove) {
          eventsToRemove.push(result.event)
        }
      }
      console.log(
        `\n✓ Marked ${eventsToRemove.length}/${diff.removed.length} events for removal`
      )
    }

    // 7. Build final event list
    const finalEvents = []

    // Add manual events (always preserved)
    finalEvents.push(...diff.manual)

    // Add unchanged events
    finalEvents.push(...diff.unchanged)

    // Add accepted new events
    for (const { event, category } of acceptedNewEvents) {
      finalEvents.push(transformToEventType(event, category))
    }

    // Add accepted updates
    for (const update of acceptedUpdates) {
      finalEvents.push({
        ...update.existing,
        name: update.changes.name ?? update.existing.name,
        durationMinutes:
          update.changes.durationMinutes ?? update.existing.durationMinutes,
        price: update.changes.price ?? update.existing.price,
        description:
          update.changes.description !== undefined
            ? update.changes.description
            : update.existing.description
      })
    }

    // Add non-removed events (ones the user chose to keep)
    const removedIds = new Set(eventsToRemove.map((e) => e.id))
    for (const event of diff.removed) {
      if (!removedIds.has(event.id)) {
        finalEvents.push(event)
      }
    }

    // 8. Show summary and confirm
    console.log('\n' + '='.repeat(60))
    console.log('SUMMARY OF CHANGES')
    console.log('='.repeat(60))
    console.log(`New events to add: ${acceptedNewEvents.length}`)
    console.log(`Events to update: ${acceptedUpdates.length}`)
    console.log(`Events to remove: ${eventsToRemove.length}`)
    console.log(`Total events in result: ${finalEvents.length}`)

    const confirmed = await confirmFinalChanges()

    if (!confirmed) {
      console.log('\n❌ Sync cancelled. No changes were made.')
      return
    }

    // 9. Write to events2.ts
    await updateEventsFile(finalEvents)

    console.log('\n✓ Sync completed successfully!')
    console.log('\nNext steps:')
    console.log('  1. Review the changes in src/data/events2.ts')
    console.log(
      '  2. Compare with events.ts: git diff --no-index src/data/events.ts src/data/events2.ts'
    )
    console.log('  3. If satisfied, rename events2.ts to events.ts')
  } catch (error) {
    console.error('\n❌ Error during sync:', error)
    process.exit(1)
  }
}

main()
