import React from 'react';
import Link from 'next/link';

const Main: React.FC = () => {
  return (
    <main className="main" style={{ backgroundColor: '#FAF3DC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Combined Header and Navigation Bar */}
      <nav className="navbar" style={{ backgroundColor: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo Section */}
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ marginRight: '10px', fontSize: '2rem', color: '#2E7D32' }}>Fresh Track</h1>
          <img src="https://i.ibb.co/wg1DNxJ/logo.jpg" alt="Logo" style={{ width: '100px', height: '100px' }} />
        </div>

        {/* Navigation Links */}
        <ul className="nav-list" style={{ display: 'flex', gap: '30px', fontSize: '1.5rem', listStyle: 'none' }}>
          <li className="nav-item"><Link href="/">Home</Link></li>
          <li className="nav-item"><Link href="/about_us">About</Link></li>
          <li className="nav-item"><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <section className="hero-section">
        <div className="content-box" style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '20px', margin: '20px auto', maxWidth: '1100px' }}>
          <div className="text-box" style={{ flex: '1' }}>
            <h1 className="hero-title" style={{ color: '#2E7D32' }}>FRESH TRACK</h1>
            <p className="hero-description" style={{ color: '#2E7D32' }}>
              FRESH TRACK is a systematic approach to efficiently track, store, and manage stock, ensuring optimal storage conditions and timely processing. It helps prevent spoilage of perishable items like fruits, vegetables, and groceries by monitoring expiry dates and streamlining inventory flow.
            </p>
          </div>
          <div className="image-content" style={{ flex: '1' }}>
            <img src="/photos/fruits_header.jpg" alt="Warehouse Inventory Management" className="description-image" />
          </div>
        </div>
      </section>

      {/* Button Section */}
      <div className="button-container">
        <Link href="/displaytable">
          <div className="button-box" style={{ backgroundColor: 'white', padding: '30px', fontSize: '1.2rem', borderRadius: '10px' }}>
            <h2>Inventory Report</h2>
            <img src="https://cdn.botpenguin.com/assets/website/Inventory_Management_7424602b6c.png" alt="Stock Report" className="button-image" style={{ width: '120px', height: '120px' }} />
          </div>
        </Link>

        <Link href="/fileUpload">
          <div className="button-box" style={{ backgroundColor: 'white', padding: '30px', fontSize: '1.2rem', borderRadius: '10px' }}>
            <h2>Check Freshness</h2>
            <img src="/photos/fresh.jpg" alt="Check Freshness" className="button-image" style={{ width: '120px', height: '120px' }} />
          </div>
        </Link>

        {/* New Order Box */}
        <Link href="/order">
        <div className="button-box" style={{ backgroundColor: 'white', padding: '30px', fontSize: '1.2rem', borderRadius: '10px' }}>
          <h2>Order</h2>
          <img src="https://t3.ftcdn.net/jpg/05/05/67/16/360_F_505671665_qVhB6wka1l6tPiu4IaG7OArZkc2gDOQF.jpg" alt="Order" className="button-image" style={{ width: '120px', height: '120px' }} />
        </div>
        </Link>
      </div>

      <style jsx>{`
        .main {
          font-family: Arial, sans-serif;
        }

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

        .hero-section {
          padding: 50px 20px;
          margin-top: 60px;
        }

        .content-box {
          position: relative;
          left: 30px;
        }

        .hero-title {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
        }

        .description-image {
          width: 100%;
          max-width: 400px;
          border-radius: 10px;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin: 30px 0;
        }

        .button-box {
          text-align: center;
          background: white;
          border-radius: 10px;
          transition: transform 0.2s;
          cursor: pointer;
        }

        .button-box:hover {
          transform: scale(1.05);
        }
      `}</style>
    </main>
  );
};

export default Main;
