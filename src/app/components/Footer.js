import Image from 'next/image';
import '../../styles/globals.css';
import SDPLogo from '../../public/images/SDP_logo.png';
import styles from '../../styles/page.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo Section */}
        <div className={styles.logoContainer}>
          <Image
            src={SDPLogo}  
            alt="SDP Logo"
            width={150}
            height={45}
          />
        </div>

        {/* Contact Information */}
        <div className={styles.footerInfo}>
          <p className="font-bold">Mailing Address</p>
          <p>Boise State University</p>
          <p>1910 University Dr.</p>
          <p>Boise, ID 83725</p>

          <p className="mt-4 font-bold">Phone</p>
          <p>+1 (208) 426-1000</p>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyright}>
          <p>&copy; 2025 Boise State University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
