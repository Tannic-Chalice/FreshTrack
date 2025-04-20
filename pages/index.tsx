// pages/index.tsx

import React from 'react';
import Link from 'next/link';  // Import Link for navigation
import H from '../components/header';  // Import your Header component
import Footer from '../components/footer';  // Import your Footer component
import MainContent from '../components/Main';  // Import your MainContent component

const Home = () => {
  return (
    <>
      {/* <H /> */}
      <MainContent />
      
      {/* Corrected Link without <a> */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* <Link href="/check-freshness">
          Go to Check Freshness
        </Link> */}
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
