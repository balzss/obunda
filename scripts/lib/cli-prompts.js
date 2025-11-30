import * as readline from 'readline'
import { CATEGORIES, suggestCategory } from './category-suggester.js'

function createReadline() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
}

function question(rl, query) {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

export async function reviewNewEvent(event, index, total) {
  const rl = createReadline()

  console.log(`\n${'='.repeat(60)}`)
  console.log(`NEW EVENT (${index + 1}/${total})`)
  console.log('='.repeat(60))
  console.log(`Name: ${event.title}`)
  console.log(`Duration: ${event.lengthInMinutes} min`)
  console.log(`Price/Description: ${event.description}`)
  console.log(`Slug: obunda/${event.slug}`)

  const suggested = suggestCategory(event.title, event.slug)
  console.log(`Suggested Category: ${suggested}`)

  console.log('\nOptions:')
  console.log('  1. Accept with suggested category')
  console.log('  2. Choose different category')
  console.log('  3. Skip this event')

  const answer = await question(rl, '\nYour choice (1-3): ')
  rl.close()

  if (answer.trim() === '1') {
    return { event, category: suggested, accepted: true }
  } else if (answer.trim() === '2') {
    const category = await chooseCategoryPrompt()
    return { event, category, accepted: true }
  } else {
    return { event, category: suggested, accepted: false }
  }
}

async function chooseCategoryPrompt() {
  const rl = createReadline()

  console.log('\nAvailable categories:')
  CATEGORIES.forEach((cat, i) => {
    console.log(`  ${i + 1}. ${cat}`)
  })

  const answer = await question(rl, `\nSelect category (1-${CATEGORIES.length}): `)
  rl.close()

  const index = parseInt(answer.trim()) - 1
  if (index >= 0 && index < CATEGORIES.length) {
    return CATEGORIES[index]
  }

  console.log('Invalid selection, using default: További szolgáltatások')
  return 'További szolgáltatások'
}

export async function reviewUpdatedEvent(update, index, total) {
  const rl = createReadline()

  console.log(`\n${'='.repeat(60)}`)
  console.log(`UPDATED EVENT (${index + 1}/${total})`)
  console.log('='.repeat(60))
  console.log(`Name: ${update.existing.name}`)
  console.log('\nChanges:')

  if (update.changes.name) {
    console.log(`  Name: ${update.existing.name} → ${update.changes.name}`)
  }
  if (update.changes.durationMinutes !== undefined) {
    console.log(
      `  Duration: ${update.existing.durationMinutes} min → ${update.changes.durationMinutes} min`
    )
  }
  if (update.changes.price) {
    console.log(`  Price: ${update.existing.price} → ${update.changes.price}`)
  }
  if (update.changes.description !== undefined) {
    console.log(
      `  Description: ${update.existing.description || '(none)'} → ${update.changes.description || '(none)'}`
    )
  }

  const answer = await question(rl, '\nAccept changes? (y/n): ')
  rl.close()

  return {
    event: update,
    accepted: answer.trim().toLowerCase() === 'y'
  }
}

export async function reviewRemovedEvent(event, index, total) {
  const rl = createReadline()

  console.log(`\n${'='.repeat(60)}`)
  console.log(`REMOVED EVENT (${index + 1}/${total})`)
  console.log('='.repeat(60))
  console.log(`Name: ${event.name}`)
  console.log(`Category: ${event.category}`)
  console.log(`Price: ${event.price}`)
  console.log('\nThis event no longer exists in cal.com but is in your local file.')

  const answer = await question(rl, '\nRemove from local file? (y/n): ')
  rl.close()

  return {
    event,
    remove: answer.trim().toLowerCase() === 'y'
  }
}

export async function confirmFinalChanges() {
  const rl = createReadline()

  console.log('\n' + '='.repeat(60))
  console.log('FINAL CONFIRMATION')
  console.log('='.repeat(60))

  const answer = await question(rl, '\nApply all approved changes to events2.ts? (y/n): ')
  rl.close()

  return answer.trim().toLowerCase() === 'y'
}
