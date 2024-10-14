import '../styles/globals.css';
import Header from '../app/components/Header'
import Footer from '../app/components/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>STEM Festival</title>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}