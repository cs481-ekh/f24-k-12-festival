import localFont from "next/font/local";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>BSU STEM Festival</title>
      </head>
      <body>{children}</body>
    </html>
  );
}