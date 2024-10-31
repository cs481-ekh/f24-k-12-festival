import Link from 'next/link';
import Image from 'next/image';
import boiseStateLogo from '../../public/images/Boise_State_University_logo.png';

export default function Header() {
  return (
    <header className="flex items-center sticky top-0 z-50 p-4 bg-white shadow-md border-b border-gray-300">
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

      <nav className="flex space-x-6 ml-auto">
        <Link href="/">
          <button className="bg-transparent text-black text-lg font-bold hover:text-orange-500 hover:scale-110 duration-300 px-4 py-2">Home</button>
        </Link>
        <Link href="/vendors">
          <button className="bg-transparent text-black text-lg font-bold hover:text-orange-500 hover:scale-110 duration-300 px-4 py-2">Activities</button>
        </Link>
        <Link href="/schedule">
          <button className="bg-transparent text-black text-lg font-bold hover:text-orange-500 px-4 hover:scale-110 duration-300 py-2">Create a schedule</button>
        </Link>
        <div className="flex items-center">
          <Link href="/map">
            <button className="bg-transparent text-black text-lg font-bold hover:text-orange-500 hover:scale-110 duration-300 px-4 py-2 pr-6">Maps</button>
          </Link>
          <span className="border-r-2 border-black h-3/4"></span>
        </div>
        <Link href="/admin">
          <button className="bg-black text-white text-lg font-bold hover:bg-orange-500 hover:scale-110 duration-300 px-4 py-2 rounded ml-2 mr-2">Admin Login</button>
        </Link>
      </nav>
    </header>
  );
}