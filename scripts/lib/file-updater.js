import { writeFileSync } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const CATEGORY_ORDER = [
  'Kistestűek',
  'Közepes testűek',
  'Nagytestűek',
  'Rövidszőrűek',
  'Uszkárok',
  'Schnauzerek',
  'Cicák',
  'További szolgáltatások'
]

function sortEventsByCategory(events) {
  return events.slice().sort((a, b) => {
    const catIndexA = CATEGORY_ORDER.indexOf(a.category)
    const catIndexB = CATEGORY_ORDER.indexOf(b.category)

    // Sort by category first
    if (catIndexA !== catIndexB) {
      return catIndexA - catIndexB
    }

    // Then by name
    return a.name.localeCompare(b.name, 'hu')
  })
}

function escapeString(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function formatEventObject(event) {
  const lines = [
    '{',
    `    id: '${escapeString(event.id)}',`,
    `    name: '${escapeString(event.name)}',`,
    `    durationMinutes: ${event.durationMinutes},`,
    `    price: '${escapeString(event.price)}',`,
    `    slug: '${escapeString(event.slug)}',`
  ]

  if (event.description) {
    lines.push(`    description: '${escapeString(event.description)}',`)
  }

  lines.push(`    category: '${escapeString(event.category)}',`)
  lines.push('  }')

  return lines.join('\n')
}

export async function updateEventsFile(
  finalEvents,
  targetFile = '/var/home/bazsi/prog/obunda/src/data/events.ts'
) {
  console.log('\nGenerating TypeScript file...')

  // Sort events by category, then by name
  const sortedEvents = sortEventsByCategory(finalEvents)

  // Generate event objects
  const eventsArray = sortedEvents.map((e) => formatEventObject(e)).join(',\n  ')

  // Generate file content
  const content = `export interface EventType {
  id: string
  name: string
  durationMinutes: number
  price: string
  slug: string
  description?: string
  category: string
}

export const events: EventType[] = [
  ${eventsArray}
]
`

  // Write file
  console.log(`Writing to ${targetFile}...`)
  writeFileSync(targetFile, content, 'utf-8')

  // Run prettier
  console.log('Running prettier...')
  try {
    await execAsync(`npx prettier --write "${targetFile}"`)
    console.log(`✓ Successfully updated ${targetFile}`)
  } catch (error) {
    console.warn('Warning: prettier failed, but file was written:', error)
  }
}
