import '../styles/globals.css';
import Header from './components/Header';
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
      </head>
      <body className={`${lato.variable} font-sans`}>
        <Header />
        <main id="mainContent">{children}</main>
        <Footer />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
