export async function fetchCalEvents() {
  try {
    const response = await fetch(
      'https://api.cal.com/v2/event-types?username=obunda',
      {
        headers: {
          'cal-api-version': '2024-06-14'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error(`API returned status: ${data.status}`)
    }

    return data.data
  } catch (error) {
    console.error('Failed to fetch cal.com events:', error)
    throw error
  }
}
