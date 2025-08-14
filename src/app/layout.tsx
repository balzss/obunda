import type { Metadata } from 'next'
import { Heading, Footer } from '@/custom'
import './globals.css'

export const metadata: Metadata = {
  title: 'Óbunda Kutyakozmetika',
  icons: {
    icon: `/icon1.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hu">
      <body>
        <div className="flex flex-col min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] items-center">
          <Heading />
          <main className="w-full max-w-4xl p-4 my-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
