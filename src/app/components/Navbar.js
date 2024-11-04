"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import boiseStateLogo from '../../public/images/Boise_State_University_logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between sticky top-0 z-50 p-4 bg-white shadow-md border-b border-gray-300">
      <div>
        <Link href="/">
          <Image
            src={boiseStateLogo}
            alt="Boise State University Logo"
            width={180}
            height={55}
            className="transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </div>

      {/* Mobile menu toggle button */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? (
            <XMarkIcon className="h-8 w-8 text-black" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-black" />
          )}
        </button>
      </div>

      {/* Navigation links */}
      <nav
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } flex-col lg:flex-row lg:flex space-y-4 lg:space-y-0 lg:space-x-6 ml-auto absolute lg:static top-16 right-4 lg:top-auto
         bg-white lg:bg-transparent p-4 lg:p-0 shadow-md lg:shadow-none rounded-lg lg:rounded-none`}
      >
        <Link href="/" onClick={handleLinkClick}>
          <button className="bg-transparent text-black text-lg font-bold hover:text-orange-500 hover:scale-110 duration-300 px-4 py-2">Home</button>
        </Link>
        <Link href="/vendors" onClick={handleLinkClick}>
          <button className="bg-transparent text-black text-lg font-bold hover:text-orange-500 hover:scale-110 duration-300 px-4 py-2">Activities</button>
        </Link>
        <Link href="/schedule" onClick={handleLinkClick}>
          <button className="bg-transparent text-black text-lg font-bold hover:text-orange-500 hover:scale-110 duration-300 px-4 py-2">Create a schedule</button>
        </Link>
        <div className="flex items-center">
          <Link href="/map" onClick={handleLinkClick}>
            <button className="bg-transparent text-black text-lg font-bold hover:text-orange-500 hover:scale-110 duration-300 px-4 py-2">Maps</button>
          </Link>
          <span className="hidden lg:block border-r-2 border-black h-3/4 mx-2"></span>
        </div>
        <Link href="/admin" onClick={handleLinkClick}>
          <button className="bg-black text-white text-lg font-bold hover:bg-orange-500 hover:scale-110 duration-300 px-4 py-2 rounded ml-2 mr-2">Admin Login</button>
        </Link>
      </nav>
    </header>
  );
}
