import React from "react";
import "../styles/about_us.module.css"; // Add the corresponding CSS file for styling

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-page">
      {/* Header Section */}
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>
          We are developing an innovative inventory management system for
          fruits and vegetables warehouses to minimize spoilage, improve
          efficiency, reduce waste, and address the challenge of perishability
          by utilizing technologies like <strong>Data Analytics</strong> and{" "}
          <strong>IoT Sensors</strong> for real-time inventory tracking. Our
          system aims to optimize ordering and predict demand effectively.
        </p>
      </header>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Aniket R T</h3>
            <p>1RV23AI017</p>
          </div>
          <div className="team-member">
            <h3>Amogh A P</h3>
            <p>1RV23AI012</p>
          </div>
          <div className="team-member">
            <h3>Anika Vidya Raghav</h3>
            <p>1RV23AI016</p>
          </div>
          <div className="team-member">
            <h3>Anupama</h3>
            <p>1RV23AI018</p>
          </div>
          <div className="team-member">
            <h3>Bheemraj Doddamani</h3>
            <p>1RV23AI028</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
