import { useState } from "react";
import { toast } from "react-toastify";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Thank you! Your message has been sent. We'll reply within 24 hours.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Get In Touch</h1>
        <p>Have questions? We'd love to hear from you!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Shop No. 12, Main Market Road<br />Karol Bagh, New Delhi - 110005</p>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>+91 98765 43210<br />(10 AM - 10 PM)</p>
            </div>
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <h3>Email Us</h3>
              <p>info@biteofindia.com<br />Response within 24 hrs</p>
            </div>
            <div className="info-item">
              <div className="info-icon">🕒</div>
              <h3>Hours</h3>
              <p>Mon-Sun: 8 AM - 11 PM<br />Open all festivals</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (Optional)"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <div className="contact-map">
        <h2>Find Us Here</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123456789!2d77.198745!3d28.645678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM4JzQ0LjQiTiA3N8KwMTEnNTYuMiJF!5e0!3m2!1sen!2sin!4v1699999999999"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "15px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bite of India Location"
        />
      </div>
    </div>
  );
}

export default Contact;
