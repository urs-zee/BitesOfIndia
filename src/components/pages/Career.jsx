import "./Career.css";

function Career() {
  const jobOpenings = [
    {
      title: "Mithai Chef",
      type: "Full Time",
      salary: "₹25,000 - ₹35,000/month",
      experience: "2+ years",
      description:
        "Expert in traditional Indian sweet making. Must know Gulab Jamun, Rasgulla, Jalebi preparation.",
    },
    {
      title: "Production Supervisor",
      type: "Full Time",
      salary: "₹30,000 - ₹45,000/month",
      experience: "3+ years",
      description:
        "Manage daily production, quality control, inventory. 50+ staff supervision.",
    },
    {
      title: "Delivery Executive",
      type: "Full Time",
      salary: "₹18,000 - ₹25,000/month + incentives",
      experience: "1+ year",
      description:
        "Two-wheeler license required. Delhi NCR delivery within 2 hours.",
    },
    {
      title: "Cashier/Sales",
      type: "Full Time",
      salary: "₹15,000 - ₹20,000/month",
      experience: "1+ year",
      description:
        "Customer handling, billing, order taking. Good communication skills.",
    },
    {
      title: "Kitchen Helper",
      type: "Full Time",
      salary: "₹12,000 - ₹16,000/month",
      experience: "Freshers welcome",
      description:
        "Basic cleaning, ingredient preparation, packaging assistance.",
    },
  ];

  const benefits = [
    "Free meals during shifts",
    "PF + ESIC + Bonus",
    "Festival bonuses",
    "Weekly off + Paid leaves",
    "Uniform provided",
    "Training provided",
  ];

  return (
    <div className="career-page">
      <div className="career-hero">
        <h1>Join Our Team</h1>
        <p>Be part of Delhi's favorite mithai family</p>
      </div>

      <div className="career-content">
        <section className="career-intro">
          <h2>Why Work With Us?</h2>
          <p>
            Join <strong>Bite of India</strong> - where tradition meets
            opportunity. Work with passionate team members and grow your career
            in the heart of Delhi's most loved mithai brand. Founded by{" "}
            <strong>Mohit Rai</strong>, we value hard work, dedication and sweet
            tooth!
          </p>
        </section>

        <section className="job-openings">
          <h2>Current Openings</h2>
          <div className="jobs-grid">
            {jobOpenings.map((job, index) => (
              <div key={index} className="job-card">
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span
                    className={`job-type ${
                      job.type === "Full Time" ? "full" : "part"
                    }`}
                  >
                    {job.type}
                  </span>
                </div>
                <div className="job-details">
                  <div className="detail">
                    <span className="label">Salary:</span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Experience:</span>
                    <span>{job.experience}</span>
                  </div>
                </div>
                <p className="job-description">{job.description}</p>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        </section>

        <section className="benefits">
          <h2>What We Offer</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <div className="benefit-check">✓</div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="apply-section">
          <h2>How to Apply</h2>
          <div className="apply-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Send Resume</h4>
              <p>
                Email your resume to <strong>careers@biteofindia.com</strong>
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Walk-in Interview</h4>
              <p>Visit our shop: Shop No. 12, Karol Bagh, New Delhi</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Join Team</h4>
              <p>Start your sweet journey with us!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Career;
