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
import { suggestCategory } from './lib/category-suggester.js'

// Manual category overrides for events where the suggester is unreliable.
// Match by substring of the slug (lowercased).
const CATEGORY_OVERRIDES = [
  { match: 'munsterlandi', category: 'Közepes testűek' },
  { match: 'pincser', category: 'Kistestűek' },
  { match: 'dalmata', category: 'Rövidszőrűek' },
  { match: 'dalmát', category: 'Rövidszőrűek' },
  { match: 'basset', category: 'Rövidszőrűek' },
  { match: 'kozep-spicc', category: 'Közepes testűek' },
  { match: 'közép-spicc', category: 'Közepes testűek' },
  { match: 'spicc-kozep', category: 'Közepes testűek' },
  { match: 'nyuszi', category: 'További szolgáltatások' },
  { match: 'nyúl', category: 'További szolgáltatások' }
]

function pickCategory(event) {
  const haystack = `${event.title} ${event.slug}`.toLowerCase()
  for (const { match, category } of CATEGORY_OVERRIDES) {
    if (haystack.includes(match)) return category
  }
  return suggestCategory(event.title, event.slug)
}

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

function reportDiffDetails(diff, acceptedNewEvents) {
  console.log('\n' + '='.repeat(60))
  console.log('DETAIL: NEW EVENTS')
  console.log('='.repeat(60))
  for (const { event, category } of acceptedNewEvents) {
    console.log(`+ [${category}] ${event.title}  (obunda/${event.slug})`)
    console.log(`    duration: ${event.lengthInMinutes} min`)
    console.log(`    raw desc: ${event.description}`)
  }

  console.log('\n' + '='.repeat(60))
  console.log('DETAIL: UPDATED EVENTS')
  console.log('='.repeat(60))
  for (const u of diff.updated) {
    console.log(`~ ${u.existing.name}  (${u.existing.slug})`)
    if (u.changes.name) {
      console.log(`    name: "${u.existing.name}" -> "${u.changes.name}"`)
    }
    if (u.changes.durationMinutes !== undefined) {
      console.log(
        `    duration: ${u.existing.durationMinutes} -> ${u.changes.durationMinutes}`
      )
    }
    if (u.changes.price !== undefined) {
      console.log(`    price: "${u.existing.price}" -> "${u.changes.price}"`)
    }
    if (u.changes.description !== undefined) {
      console.log(
        `    description: "${u.existing.description || ''}" -> "${u.changes.description || ''}"`
      )
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('DETAIL: REMOVED EVENTS (kept in local, NOT removed)')
  console.log('='.repeat(60))
  for (const e of diff.removed) {
    console.log(`- ${e.name}  (${e.slug})  [${e.category}]`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const autoMode = args.includes('--auto') || args.includes('-y')
  const outputArg = args.find((a) => a.startsWith('--out='))
  const outputFile = outputArg
    ? outputArg.slice('--out='.length)
    : autoMode
      ? './src/data/events2.ts'
      : './src/data/events.ts'

  try {
    console.log('Cal.com Event Sync Tool')
    console.log('=======================')
    if (autoMode) {
      console.log('Mode: AUTO (non-interactive)')
      console.log(`Output: ${outputFile}`)
    }
    console.log('')

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

    let acceptedNewEvents = []
    let acceptedUpdates = []
    let eventsToRemove = []

    if (autoMode) {
      // Auto-accept everything except removals (skip removals to be safe).
      acceptedNewEvents = diff.new.map((event) => ({
        event,
        category: pickCategory(event)
      }))
      acceptedUpdates = diff.updated.map((update) => update)
      eventsToRemove = [] // never auto-remove

      console.log(`\n[auto] Accepted ${acceptedNewEvents.length} new events`)
      console.log(`[auto] Accepted ${acceptedUpdates.length} updates`)
      console.log(`[auto] Kept ${diff.removed.length} would-be-removed events`)

      reportDiffDetails(diff, acceptedNewEvents)
    } else {
      console.log('\n' + '='.repeat(60))
      console.log('Starting interactive review...')
      console.log('='.repeat(60))

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
      }

      if (diff.updated.length > 0) {
        console.log(`\n--- Reviewing ${diff.updated.length} UPDATED events ---`)
        for (let i = 0; i < diff.updated.length; i++) {
          const result = await reviewUpdatedEvent(diff.updated[i], i, diff.updated.length)
          if (result.accepted) {
            acceptedUpdates.push(result.event)
          }
        }
      }

      if (diff.removed.length > 0) {
        console.log(`\n--- Reviewing ${diff.removed.length} REMOVED events ---`)
        for (let i = 0; i < diff.removed.length; i++) {
          const result = await reviewRemovedEvent(diff.removed[i], i, diff.removed.length)
          if (result.remove) {
            eventsToRemove.push(result.event)
          }
        }
      }
    }

    // Build final event list
    const finalEvents = []

    // Manual events (always preserved)
    finalEvents.push(...diff.manual)
    // Unchanged events
    finalEvents.push(...diff.unchanged)
    // New events
    for (const { event, category } of acceptedNewEvents) {
      finalEvents.push(transformToEventType(event, category))
    }
    // Accepted updates
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
    // Non-removed events (kept locally)
    const removedIds = new Set(eventsToRemove.map((e) => e.id))
    for (const event of diff.removed) {
      if (!removedIds.has(event.id)) {
        finalEvents.push(event)
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('SUMMARY OF CHANGES')
    console.log('='.repeat(60))
    console.log(`New events to add: ${acceptedNewEvents.length}`)
    console.log(`Events to update: ${acceptedUpdates.length}`)
    console.log(`Events to remove: ${eventsToRemove.length}`)
    console.log(`Total events in result: ${finalEvents.length}`)

    if (!autoMode) {
      const confirmed = await confirmFinalChanges()
      if (!confirmed) {
        console.log('\n❌ Sync cancelled. No changes were made.')
        return
      }
    }

    await updateEventsFile(finalEvents, outputFile)

    console.log('\n✓ Sync completed successfully!')
    console.log('\nNext steps:')
    console.log(`  1. Review the output in ${outputFile}`)
    console.log(
      `  2. Diff vs current: git diff --no-index src/data/events.ts ${outputFile.replace('./', '')}`
    )
    console.log(
      `  3. If satisfied, replace events.ts with the new file.`
    )
  } catch (error) {
    console.error('\n❌ Error during sync:', error)
    process.exit(1)
  }
}

main()
