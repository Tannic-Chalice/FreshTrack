// components/Header.tsx

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo-container">
        <h1 className="logo-text">Fresh Track</h1>
        <img src="https://i.ibb.co/wg1DNxJ/logo.jpg" alt="Logo" className="logo-image" />
      </div>

      {/* Navigation Links */}
      <ul className="nav-list">
        <li className="nav-item"><Link href="/">Home</Link></li>
        <li className="nav-item"><Link href="/about_us">About</Link></li>
        <li className="nav-item"><Link href="/contact">Contact</Link></li>
      </ul>

      <style jsx>{`
        .navbar {
          background-color: white;
          padding: 10px 20px;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo-text {
          margin-right: 10px;
          font-size: 2rem;
          color: #2E7D32;
        }

        .logo-image {
          width: 100px;
          height: 100px;
        }

        .nav-list {
          display: flex;
          gap: 30px;
          list-style: none;
        }

        .nav-item a {
          color: #2E7D32;
          text-decoration: none;
          font-weight: bold;
        }

        .nav-item a:hover {
          color: #388E3C;
        }
      `}</style>
    </nav>
  );
};

export default Header;
