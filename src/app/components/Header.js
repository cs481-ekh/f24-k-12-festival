import Link from 'next/link';
import Image from 'next/image';
import boiseStateLogo from '../../public/images/Boise_State_University_logo.png';
import '../../styles/globals.css';
import styles from '../../styles/page.module.css';

const Header = () => {
  return (
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
  );
};

export default Header;