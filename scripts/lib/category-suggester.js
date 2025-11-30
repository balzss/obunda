export const CATEGORIES = [
  'Kistestűek',
  'Közepes testűek',
  'Nagytestűek',
  'Rövidszőrűek',
  'Uszkárok',
  'Schnauzerek',
  'Cicák',
  'További szolgáltatások'
]

export function suggestCategory(eventName, slug) {
  const name = eventName.toLowerCase()

  // Exact category matches
  if (name.includes('schnauzer')) return 'Schnauzerek'
  if (name.includes('uszkár')) return 'Uszkárok'
  if (name.includes('cica')) return 'Cicák'

  // Size indicators for Poodles
  if (name.includes('uszkár')) {
    if (
      name.includes('toy') ||
      name.includes('törpe') ||
      name.includes('miniatur')
    ) {
      return 'Uszkárok'
    }
    if (name.includes('óriás') || name.includes('nagy')) {
      return 'Uszkárok'
    }
    if (name.includes('közép')) {
      return 'Uszkárok'
    }
    return 'Uszkárok'
  }

  // Size indicators for general breeds
  if (
    name.includes('toy') ||
    name.includes('törpe') ||
    name.includes('kis') ||
    name.includes('mini')
  ) {
    return 'Kistestűek'
  }

  if (
    name.includes('óriás') ||
    name.includes('nagy') ||
    name.includes('large')
  ) {
    return 'Nagytestűek'
  }

  if (name.includes('közép') || name.includes('medium')) {
    return 'Közepes testűek'
  }

  // Known short-haired breeds
  const shortHaired = [
    'tacskó',
    'bulldog',
    'mopsz',
    'beagle',
    'vizsla',
    'csivava',
    'boston terrier',
    'boston',
    'labrador',
    'shiba',
    'rottweiler',
    'doberman',
    'boxer',
    'dalmata'
  ]
  if (shortHaired.some((breed) => name.includes(breed))) {
    return 'Rövidszőrűek'
  }

  // Known large breeds
  const large = [
    'husky',
    'malamut',
    'szamojed',
    'berni',
    'golden',
    'németjuhász',
    'skótjuhász',
    'akita',
    'leonbergi',
    'newfoundland'
  ]
  if (large.some((breed) => name.includes(breed))) {
    return 'Nagytestűek'
  }

  // Known medium breeds
  const medium = [
    'spániel',
    'cocker',
    'springer',
    'collie',
    'border',
    'corgi',
    'sheltie'
  ]
  if (medium.some((breed) => name.includes(breed))) {
    return 'Közepes testűek'
  }

  // Default to "További szolgáltatások"
  return 'További szolgáltatások'
}
