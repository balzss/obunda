import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-gray-100 border-t border-gray-200">
      <div className="max-w-2xl mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm text-gray-600 mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Óbunda Kutyakozmetika. Minden jog fenntartva.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="https://www.instagram.com/obunda_kutyakozmetika"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-500 hover:text-gray-800"
          >
            <Instagram size={24} />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61576907870809"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-500 hover:text-gray-800"
          >
            <Facebook size={24} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
