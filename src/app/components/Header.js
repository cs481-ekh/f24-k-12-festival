import Link from 'next/link';
import Image from 'next/image';
import boiseStateLogo from '../../public/images/Boise_State_University_logo.png';

export default function Header() {
  return (
    <header className="flex items-center sticky top-0 z-50 p-2 bg-white pr-5 shadow-md">
      <div>
        <Link href="/">
          <Image
            src={boiseStateLogo}
            alt="Boise State University Logo"
            width={180}
            height={55}
          />
        </Link>
      </div>

      <nav className="flex flex-grow justify-center space-x-4">
        <Link href="/about">
          <button className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-sky-800">About</button>
        </Link>
        <Link href="/schedule">
          <button className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-sky-800">Schedule</button>
        </Link>
        <Link href="/map">
          <button className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-sky-800">Map</button>
        </Link>
        <Link href="/vendors">
          <button className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-sky-800">Vendors</button>
        </Link>
        <Link href="/admin">
          <button className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-sky-800">Admin</button>
        </Link>
      </nav>
    </header>
  );
}