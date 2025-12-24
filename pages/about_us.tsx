import React from "react";
import Link from "next/link";

const AboutUs: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#FAF3DC', minHeight: '100vh', color: '#2E7D32', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {/* Combined Header and Navigation Bar */}
      <nav style={{ backgroundColor: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', left: 0, right: 0, top: 0, zIndex: 1000 }}>
        
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ marginRight: '10px', fontSize: '2rem', color: '#2E7D32' }}>Fresh Track</h1>
          <img src="https://i.ibb.co/wg1DNxJ/logo.jpg" alt="Logo" style={{ width: '100px', height: '100px' }} />
        </div>

        {/* Navigation Links */}
        <ul style={{ display: 'flex', gap: '30px', fontSize: '1.5rem', listStyle: 'none' }}>
          <li><Link href="/" style={{ textDecoration: 'none', color: '#2E7D32', fontWeight: 'bold' }}>Home</Link></li>
          <li><Link href="/about_us" style={{ textDecoration: 'none', color: '#2E7D32', fontWeight: 'bold' }}>About</Link></li>
          <li><Link href="/contact" style={{ textDecoration: 'none', color: '#2E7D32', fontWeight: 'bold' }}>Contact</Link></li>
        </ul>
      </nav>

      {/* About Us Header */}
      <header style={{ textAlign: 'center', marginTop: '80px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#2E7D32', marginBottom: '15px' }}>Fresh Track</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#2E7D32', marginBottom: '20px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          We are developing an innovative inventory management system for fruits and vegetables warehouse to minimize spoilage, improve efficiency, reduce waste, and address the challenge of perishability by utilizing technologies like "data analytics", "IoT sensors" for real-time inventory tracking, optimize ordering, and predict demand.
        </p>
      </header>

      

    </div>
  );
};

export default AboutUs;
