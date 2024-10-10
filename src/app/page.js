import Link from 'next/link';
import Image from 'next/image';
import '../styles/globals.css';

export default function Home() {
  return (
    <div>
      {/* Main Content */}
        <h1 className="text-center border-solid border-2">Header Content</h1>
        <div className="text-center border-solid border-2">Main Body Content</div>
        <footer className="text-center border-solid border-2">Footer Content</footer>
    </div>
  );
}