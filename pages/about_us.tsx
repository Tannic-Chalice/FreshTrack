import React from "react";
import styles from "../styles/about_us.module.css";  // Import the CSS Module

const AboutUs: React.FC = () => {
  return (
    <div className={styles["about-us-page"]}>
      <header className={styles["about-us-header"]}>
        <h1>About Us</h1>
        <p>
          We are developing an innovative inventory management system for
          fruits and vegetables warehouse to minimize spoilage, improve
          efficiency, reduce waste, and address the challenge of perishability
          by utilizing technologies like "data analytics", "IoT sensors" for
          real-time inventory tracking, optimize ordering, and predict demand.
        </p>
      </header>

      <section className={styles["team-section"]}>
        <h2>Our Team</h2>
        <div className={styles["team-members"]}>
          {/* Example Team Members */}
          <div className={styles["team-member"]}>
            <h3>Aniket R T</h3>
            <p>1RV23AI017</p>
          </div>
          <div className={styles["team-member"]}>
            <h3>Amogh A P</h3>
            <p>1RV23AI012</p>
          </div>
          <div className={styles["team-member"]}>
            <h3>Anika Vidya Raghav</h3>
            <p>1RV23AI016</p>
          </div>
          <div className={styles["team-member"]}>
            <h3>Anupama</h3>
            <p>1RV23AI018</p>
          </div>
          <div className={styles["team-member"]}>
            <h3>Bheemraj Doddamani</h3>
            <p>1RV23AI028</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
