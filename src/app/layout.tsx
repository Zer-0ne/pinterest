import Navbar from '@/Components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/provider/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pinterest',
  description: 'make your pins with pinterest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider  >

          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
