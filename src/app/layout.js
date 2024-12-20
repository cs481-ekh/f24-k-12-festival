import '../styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head className={`${lato.variable} font-sans`}>
        <title>STEM Festival</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Join us for the STEM Festival" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.ico`} />
      </head>
      <body className={`${lato.variable} flex flex-col min-h-screen`}>
        <Navbar />
        <main id="mainContent" className="flex-grow">{children}</main>
        <Footer />
        <AccessibilityWidget />
      </body>
    </html>
  );
}