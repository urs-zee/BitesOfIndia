import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Bite of India</h1>
        <p>Authentic Indian Mithai since 1995</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Bite of India was founded by <strong>Mohit Rai</strong> in 1995 with
            a simple vision - to bring the authentic taste of traditional Indian
            sweets to every home. Starting from a small shop in Karol Bagh, New
            Delhi, we have grown into one of the most trusted names in mithai
            making.
          </p>
          <p>
            Every sweet is made fresh daily using the finest ingredients and
            time-honored recipes passed down through generations. From crispy
            Jalebi to melt-in-mouth Rasgulla, we preserve the true essence of
            Indian mithai.
          </p>
        </section>

        <section className="about-features">
          <div className="feature-grid">
            <div className="feature-card">
              <h3>21+ Varieties</h3>
              <p>Gulab Jamun, Rasgulla, Jalebi, Kaju Katli and many more</p>
            </div>
            <div className="feature-card">
              <h3>Fresh Daily</h3>
              <p>Made with pure ghee, fresh milk and premium ingredients</p>
            </div>
            <div className="feature-card">
              <h3>Fast Delivery</h3>
              <p>Order online and get sweets delivered to your doorstep</p>
            </div>
            <div className="feature-card">
              <h3>Trusted Quality</h3>
              <p>30+ years of mithai making expertise</p>
            </div>
          </div>
        </section>

        <section className="about-founder">
          <div className="founder-content">
            <div className="founder-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="founder-info">
              <h2>Meet Our Founder</h2>
              <h3>Mohit Rai</h3>
              <p>
                With over 30 years of experience in the sweet making industry,
                Mohit Rai has dedicated his life to perfecting the art of Indian
                mithai. His passion for quality and tradition drives Bite of
                India to excellence.
              </p>
              <div className="founder-stats">
                <div className="stat">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">21</span>
                  <span className="stat-label">Sweet Varieties</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-promise">
          <h2>Our Promise</h2>
          <div className="promise-grid">
            <div className="promise-item">
              <div className="promise-icon">✅</div>
              <h4>100% Pure Ingredients</h4>
              <p>No artificial colors or preservatives</p>
            </div>
            <div className="promise-item">
              <div className="promise-icon">⭐</div>
              <h4>Made Fresh Daily</h4>
              <p>Every batch prepared same day</p>
            </div>
            <div className="promise-item">
              <div className="promise-icon">🚚</div>
              <h4>Fast Delivery</h4>
              <p>Within 2 hours in Delhi NCR</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
