import Navbar from '@/Components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/provider/SessionProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
