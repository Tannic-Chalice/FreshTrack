// pages/contact.tsx
import React, { useState } from 'react';
import styles from '../styles/contact.module.css'; // Importing CSS Module
import Header from '../components/header'; // Import Header component

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission (could be an API call, for example)
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <div className={styles.contactPageWrapper}> {/* Gradient wrapper for the page */}
      <Header /> {/* Adding the Header and Navbar here */}
      
      <div className={styles.contactPage}>
        <header className={styles.contactHeader}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Please fill out the form below to get in touch with us.</p>
        </header>

        <div className={styles.contactInfo}>
          <h2>FreshTrack Contact Information</h2>
          <p>
            <strong>Email:</strong> <a href="mailto:freshtrack@gmail.com">freshtrack@gmail.com</a>
          </p>
          <p>
            <strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a>
          </p>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={5}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
