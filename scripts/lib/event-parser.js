function parseDescription(apiDescription) {
  // Remove HTML tags (replace <br> with space)
  const cleaned = apiDescription.replace(/<br\s*\/?>/gi, ' ').trim()

  // Extract price pattern: "X.XXX Ft-tól" or "XX.XXX Ft-tól"
  const priceMatch = cleaned.match(/(\d{1,2}\.\d{3}\s+Ft-tól)/i)

  if (!priceMatch) {
    // No price found, treat entire string as description
    return { price: '', description: cleaned }
  }

  const price = priceMatch[1]
  const priceIndex = cleaned.indexOf(price)

  // Everything before price is description
  const description = cleaned.substring(0, priceIndex).trim()

  return { price, description }
}

export function transformToEventType(calEvent, category) {
  const { price, description } = parseDescription(calEvent.description)

  return {
    id: calEvent.slug,
    name: calEvent.title,
    durationMinutes: calEvent.lengthInMinutes,
    price: price || calEvent.description, // Fallback to raw description if no price found
    slug: `obunda/${calEvent.slug}`,
    description: description || undefined,
    category
  }
}
