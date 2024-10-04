// pages/index.js (or wherever your Home component is located)

import Link from 'next/link';
import Image from 'next/image';
import boiseStateLogo from '/public/images/Boise_State_University_logo.png'; // Adjust path as necessary
import './globals.css';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src={boiseStateLogo}
              alt="Boise State University Logo"
              width={180}
              height={55}
            />
          </Link>
        </div>
        <nav className={styles.navbar}>
          <Link href="/schedule">
            <button className={styles.navButton}>Schedule</button>
          </Link>
          <Link href="/map">
            <button className={styles.navButton}>Map</button>
          </Link>
          <Link href="/vendors">
            <button className={styles.navButton}>Vendors</button>
          </Link>
          <Link href="/about">
            <button className={styles.navButton}>About</button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <h1 className={styles.headers}>K-12 Engineering Festival</h1>
        {/* Rest of your content */}
      </main>
    </div>
  );
}
