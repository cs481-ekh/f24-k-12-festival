import Link from "next/link";
import styles from "./about.module.css";

export default function About() {
    return (
        <div className={styles.aboutContainer}>
            {/* Back to Home Button */}
            <div className={styles.backButtonContainer}>
                <Link href="/" className={styles.backButton}>
                    Back to Home
                </Link>
            </div>

            <h1 className={styles.header}>About the K-12 STEM Festival Web App</h1>

            {/* Abstract */}
            <section className={styles.section}>
                <h2 className={styles.subHeader}>Abstract</h2>
                <p className={styles.text}>
                    The College of Engineering at Boise State University will host the 18th Annual Engineering and Science Festival on February 22, 2025. 
                    This event aims to inspire over 4,000 K-12 students and their families to explore STEM fields. Our team is developing a mobile-friendly web 
                    application to enhance the festival experience by providing comprehensive navigation of activities and campus facilities.
                </p>
                <p className={styles.text}>
                    The platform will feature internal building maps, customizable schedules, filters by age and topic, and push notifications for real-time 
                    updates. By offering these interactive tools, we aim to replace the current static websites and create a seamless, accessible experience for 
                    festival attendees.
                </p>
            </section>

            {/* Introduction */}
            <section className={styles.section}>
                <h2 className={styles.subHeader}>Introduction</h2>
                <p className={styles.text}>
                    The 18th Annual Engineering and Science Festival, hosted by Boise State University’s College of Engineering’s Micron Student Success Center, 
                    will bring together over 4,000 K-12 students and their families on February 22, 2025. This one-day event, free to the public, encourages curiosity 
                    in science, technology, engineering, and mathematics (STEM).
                </p>
                <p className={styles.text}>
                    Our team is developing a mobile-friendly website to help attendees navigate the festival’s diverse offerings, including campus facilities and 
                    dining options. The current festival setup includes separate, static websites, but our app will integrate new interactive features such as building 
                    maps, customizable schedules, and push notifications, creating a more dynamic user experience.
                </p>
            </section>

            {/* What We Do */}
            <section className={styles.section}>
                <h2 className={styles.subHeader}>What We Do</h2>
                <ul className={styles.list}>
                    <li>Provide internal building maps to assist in navigating the event’s locations and sessions.</li>
                    <li>Offer customizable schedules to help attendees plan their day based on personal interests.</li>
                    <li>Include filtering options for activities by age group and topic.</li>
                    <li>Implement push notifications to deliver real-time updates during the event.</li>
                </ul>
            </section>

            {/* Team section */}
            <section className={styles.section}>
                <h2 className={styles.subHeader}>Meet the Team</h2>
                <div className={styles.team}>
                    <div className={styles.teamMember}>
                        <h3>Josh Martin</h3>
                        <p>Backend Developer</p>
                    </div>
                    <div className={styles.teamMember}>
                        <h3>Rachel Lawrence</h3>
                        <p>Lead Developer</p>
                    </div>
                    <div className={styles.teamMember}>
                        <h3>Will England</h3>
                        <p>UI/UX Specialist</p>
                    </div>
                    <div className={styles.teamMember}>
                        <h3>Anthony Malang</h3>
                        <p>Project Manager</p>
                    </div>
                </div>
            </section>

            {/* Sponsor section */}
            <section className={styles.section}>
                <h2 className={styles.subHeader}>Sponsor</h2>
                <p className={styles.text}>Adriana Facundo, College of Engineering, Boise State University</p>
            </section>

            {/* Contact info */}
            <section className={styles.section}>
                <h2 className={styles.subHeader}>Contact Us</h2>
                <p className={styles.text}>
                    For more information, please contact us at <a href="mailto:adrianafacundo@boisestate.edu" className="text-blue-500">adrianafacundo@boisestate.edu</a>.
                </p>
            </section>
        </div>
    );
}