export interface OpeningHours {
  day: string
  hours: string
  isClosed?: boolean
}

export const businessHours: OpeningHours[] = [
  { day: 'Hétfő', hours: '10:00 - 18:00' },
  { day: 'Kedd', hours: '09:00 - 17:30' },
  { day: 'Szerda', hours: '11:00 - 19:00' },
  { day: 'Csütörtök', hours: '11:00 - 19:00' },
  { day: 'Péntek', hours: '09:00 - 17:30' },
  { day: 'Szombat - Vasárnap', hours: 'Zárva', isClosed: true },
]
