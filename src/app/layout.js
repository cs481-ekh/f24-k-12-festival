import '../styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>STEM Festival</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main id="mainContent">{children}</main>
        <Footer />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
