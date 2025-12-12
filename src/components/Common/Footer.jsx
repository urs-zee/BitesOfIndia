import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact-info">
          <h3>Bite of India</h3>
          <p>
            <strong>Mohit Rai</strong> - Founder & Owner
          </p>
          <div className="contact-details">
            <p>
              📍 Shop No. 12, Main Market Road
              <br />
              Karol Bagh, New Delhi - 110005
            </p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@biteofindia.com</p>
          </div>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/career">Career</Link>
            </li>
            <li>
              <Link to="/">Sweets</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section map">
          <h4>Our Location</h4>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123456789!2d77.198745!3d28.645678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM4JzQ0LjQiTiA3N8KwMTEnNTYuMiJF!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="150"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bite of India Location"
            />
          </div>
          <p className="map-note">Visit us today!</p>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Bite of India. All rights reserved. Made with ❤️ in
            India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
