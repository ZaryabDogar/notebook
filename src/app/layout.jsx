import './globals.css';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NoteBook',
  description: 'Your notebook on the cloud to keep notes or other information to save',
  icons:{
    icon:["/favicon.ico?v=4"],
   apple:['/apple-touch-icon.png?v=4'],
   shortcut:['/apple-touch-icon.png']

  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
 
    <NoteState>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </NoteState>
  </html>
  );
}
