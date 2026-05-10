import React from 'react';
import Button from '../components/Button';
import './Contact.css';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <div className="contact-page" style={{ paddingTop: '160px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="container">
        <div className="contact-header text-center fade-in glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Whether you have a question about our products, shipping, or just want to say hi!</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <div className="info-card glassmorphism fade-in" style={{animationDelay: '0.2s'}}>
              <MapPin className="info-icon" size={32} />
              <h3>Visit Us</h3>
              <p>123 Tradition Lane, Spice District<br/>Culinary City, 456789</p>
            </div>
            <div className="info-card glassmorphism fade-in" style={{animationDelay: '0.3s'}}>
              <Phone className="info-icon" size={32} />
              <h3>Call Us</h3>
              <p>+91 98765 43210<br/>Mon-Fri, 9am to 6pm</p>
            </div>
            <div className="info-card glassmorphism fade-in" style={{animationDelay: '0.4s'}}>
              <Mail className="info-icon" size={32} />
              <h3>Email Us</h3>
              <p>hello@jozeffoods.com<br/>support@jozeffoods.com</p>
            </div>
          </div>

          <div className="contact-form-container fade-in glassmorphism" style={{animationDelay: '0.4s'}}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send a Message</h2>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Jane Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="jane@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="How can we help?" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Your message here..." required></textarea>
              </div>
              <Button variant="primary" type="submit" className="submit-btn">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
