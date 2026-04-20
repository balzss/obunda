export function parseDescription(apiDescription) {
  const pricePattern = /\d{1,2}\.\d{3}\s+Ft-tól/i

  // Split by <br> into lines, then classify each line as price or description
  const lines = apiDescription.split(/<br\s*\/?>/i).map(l => l.trim()).filter(Boolean)

  const priceLines = []
  const descriptionLines = []

  for (const line of lines) {
    if (pricePattern.test(line)) {
      priceLines.push(line)
    } else {
      descriptionLines.push(line)
    }
  }

  return {
    price: priceLines.join(' / '),
    description: descriptionLines.join(' ')
  }
}

export function transformToEventType(calEvent, category) {
  const { price, description } = parseDescription(calEvent.description)

  return {
    id: calEvent.slug,
    name: calEvent.title,
    durationMinutes: calEvent.lengthInMinutes,
    price,
    slug: `obunda/${calEvent.slug}`,
    description: description || undefined,
    category
  }
}
