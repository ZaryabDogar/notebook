import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NoteBook',
  description: 'your notrbook on the cloud to keep notes or other information to save',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    
      <body className={inter.className}>
        <NoteState>
      <Navbar/>
        {children}
        </NoteState>
        </body>
       

        
    </html>
  )
}
