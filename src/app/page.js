import Link from 'next/link';
import Image from 'next/image';
import '../styles/globals.css';  // Ensure the global styles are imported
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <head>
        {/* Add the Google Font link for Lato */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      {/* Hero Section */}
      <div className="bg-blue-500 text-white text-center py-16">
        <h1 className="text-4xl font-bold">18th Annual Engineering and Science Festival</h1>
        <p className="mt-4 text-lg">
          Join us on Saturday, February 22, 2025, at Boise State for a day of exploration in STEM. Free event for K-12 students and families!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 text-center py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">Event Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg p-6 rounded">
            <h3 className="font-bold text-xl">Interactive Exhibits</h3>
            <p className="mt-2">
              Explore hands-on demonstrations from leading STEM fields, including robotics, space science, and more!
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded">
            <h3 className="font-bold text-xl">Workshops & Activities</h3>
            <p className="mt-2">
              Engage in workshops tailored for different age groups and interests, from coding basics to advanced engineering.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded">
            <h3 className="font-bold text-xl">Campus Tours</h3>
            <p className="mt-2">
              Take a guided tour of the Boise State campus and explore the engineering labs, research centers, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
