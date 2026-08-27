// Typos in the cal.com source data that we hold back rather than publish.
// Keyed by slug; the pinned fields win over whatever the API returns, so a pinned
// event shows up as unchanged in the diff instead of resurfacing every sync.
// Once the text is corrected in the cal.com admin, delete the entry.
// Currently empty — every known typo has been corrected upstream.
const TEXT_PINS = {}

export function parseDescription(apiDescription, slug) {
  const pricePattern = /\d{1,2}\.\d{3}\s+Ft-tól/i

  // Split by <br> or newlines into lines, then classify each line as price or description.
  // Splitting on <br> can leave orphan tags behind (cal.com's empty WYSIWYG value is
  // "<p><br></p>"), so strip markup per line and drop the ones that held nothing but tags.
  const lines = apiDescription
    .split(/<br\s*\/?>|\r?\n+/i)
    .map(l => l.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim())
    .filter(Boolean)

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
    description: descriptionLines.join(' '),
    ...TEXT_PINS[slug]
  }
}

export function transformToEventType(calEvent, category) {
  const { price, description } = parseDescription(calEvent.description, calEvent.slug)

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
