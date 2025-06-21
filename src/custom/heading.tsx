'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    label: 'Rólam',
    href: '/rolam',
  },
  {
    label: 'Áraim',
    href: '/araim',
  },
  {
    label: 'Kapcsolat',
    href: '/kapcsolat',
  },
  {
    label: 'Házirend',
    href: '/hazirend',
  },
]

export function Heading() {
  const pathName = usePathname()

  return (
    <div className="flex flex-col items-center p-4 mt-4 w-full">
      <h1>
        <Link href="/" className="text-4xl sm:text-5xl text-center font-bold">
          Óbunda Kutyakozmetika
        </Link>
      </h1>
      <nav className="flex gap-4 mt-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            // Compare the current router.pathname with the item's href
            className={`${pathName === item.href ? 'underline' : 'hover:underline'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
