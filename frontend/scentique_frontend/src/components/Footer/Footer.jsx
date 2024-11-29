import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import "./footer.css"; // Import the CSS file
import logo from "../../assets/logo1.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Branding Section */}
        <div className="footer-branding">
          <img src={logo} alt="Logo" className="logo" />
          <p className="footer-description">
            Your go-to source for sustainable living. Let's grow a greener future together!
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Company Links Section */}
        <div className="footer-links-section">
          <h2 className="footer-section-heading">Company</h2>
          <ul className="footer-link-list">
            <li><a href="/home" className="footer-link">Home</a></li>
            <li><a href="/about" className="footer-link">About Us</a></li>
            <li><a href="/delivery" className="footer-link">Delivery</a></li>
            <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-contact-section">
          <h2 className="footer-section-heading">Get In Touch</h2>
          <p className="footer-contact-item">+1-800-555-1234</p>
          <p className="footer-contact-item">support@greenleaf.com</p>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <p className="footer-copyright">
          Copyright © 2024 GreenLeaf - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
