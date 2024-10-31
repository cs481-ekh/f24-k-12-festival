import Image from 'next/image';
import '../../styles/globals.css';
import SDPLogo from '../../public/images/SDP_logo.png';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-5">
        <div className="w-1/3 text-center">
          <p className="font-bold mb-2">Mailing Address</p>
          <p>Boise State University</p>
          <p>1910 University Dr.</p>
          <p>Boise, ID 83725</p>
        </div>

        <div className="flex-grow text-right">
          <Image
            src={SDPLogo}
            alt="SDP Logo"
            width={100}
            height={45}
            className="mx-auto"
          />
        </div>

        <div className="w-1/3 text-center">
          <p className="font-bold mb-2">Phone</p>
          <p>(208) 426-1000</p>
        </div>
      </div>

      <div className="bg-blue-700 text-center">
        <p>&copy; 2025 Boise State University. All rights reserved.</p>
      </div>
    </footer>
  );
};