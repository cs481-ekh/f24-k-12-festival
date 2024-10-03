import Link from "next/link";
import "./globals.css"
import styles from "./page.module.css"

export default function Home() {
  return (
      <div>
          <h1 className={styles.headers}>This is the home page.</h1>
          <Link href="/schedule">
              Click here to go to the schedule page.
          </Link>
          <div> {/* New line for this link */}
              <Link href="/about">
                  Click here to go to the about page.
              </Link>
          </div>
          <div> {/* New line for this link */}
              <Link href="/map">
                  Click here to go to the map page.
              </Link>
          </div>
          <div> {/* New line for this link */}
              <Link href="/vendors">
                  Click here to go to the vendors page.
              </Link>
          </div>
      </div>
  );
}