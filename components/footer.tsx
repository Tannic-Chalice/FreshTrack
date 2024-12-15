import React from 'react';
import { useRouter } from 'next/router';

const Footer: React.FC = () => {
  const router = useRouter();

  const navigateToPage = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <footer className="footer">
      <button className="footer-button" onClick={() => navigateToPage('contact')}>
        Contact
      </button>
      <span> | About Us</span>
    </footer>
  );
};

export default Footer;
