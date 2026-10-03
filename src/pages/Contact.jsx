import React, { useState } from 'react';
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaSpinner,
  FaFacebookF, FaYoutube, FaInstagram, FaCheck, FaTimes, FaClock
} from 'react-icons/fa';
import './Contact.css';

const CONTACT_METHODS = [
  {
    icon: FaMapMarkerAlt,
    title: 'Our Location',
    lines: [{ label: 'Miritini, Mombasa — Kenya' }]
  },
  {
    icon: FaPhone,
    title: 'Phone',
    lines: [{ label: '+254 745 002 529', href: 'tel:+254745002529' }]
  },
  {
    icon: FaEnvelope,
    title: 'Email',
    lines: [
      { label: 'ackstjudemiritinichurch@gmail.com', href: 'mailto:ackstjudemiritinichurch@gmail.com' },
      { label: 'revotieno4christ@gmail.com', href: 'mailto:revotieno4christ@gmail.com' }
    ]
  },
  {
    icon: FaClock,
    title: 'Service Times',
    lines: [{ label: 'Sundays · 6:00am — 12:30pm' }]
  }
];

const SOCIALS = [
  {
    name: 'Facebook',
    icon: FaFacebookF,
    href: 'https://web.facebook.com/p/ACK-St-Jude-Miritini-Parish-100080488849535/'
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    href: 'http://www.youtube.com/@miritiniparishackstjude6572'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: 'https://www.instagram.com/explore/locations/241566813167470/ack-st-jude-parish-miritini/'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        setSubmitStatus({
          success: true,
          message: data.message || 'Your message has been sent successfully!'
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to connect to server. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);

      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="ct-hero">
        <img src="/images/congregant.jpeg" alt="" className="ct-hero-img" aria-hidden="true" />
        <div className="ct-hero-overlay" aria-hidden="true" />
        <div className="ct-hero-inner">
          <p className="ct-eyebrow"><span className="ct-eyebrow-line" />Get in Touch</p>
          <h1 className="ct-title">Contact Us</h1>
          <p className="ct-lead">
            We'd love to hear from you — whether you have a question, a prayer request,
            or you'd like to plan a visit.
          </p>
        </div>
      </section>

      {/* Info + form */}
      <section className="ct-section">
        <div className="ct-container">
          <div className="ct-grid">
            {/* Contact details */}
            <div className="ct-details">
              <p className="ct-eyebrow ct-eyebrow-dark"><span className="ct-eyebrow-line" />Reach Us</p>
              <h2 className="ct-section-title">Get in Touch</h2>
              <p className="ct-section-lead">
                Have questions or need more information? Reach out through any of
                these channels — we're always glad to hear from you.
              </p>

              <div className="ct-methods">
                {CONTACT_METHODS.map(({ icon: Icon, title, lines }) => (
                  <div className="ct-method" key={title}>
                    <span className="ct-method-icon"><Icon /></span>
                    <div className="ct-method-text">
                      <h3>{title}</h3>
                      {lines.map((line, i) =>
                        line.href ? (
                          <p key={i}><a href={line.href}>{line.label}</a></p>
                        ) : (
                          <p key={i}>{line.label}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="ct-socials-block">
                <h3>Follow Us</h3>
                <div className="ct-socials">
                  {SOCIALS.map(({ name, icon: Icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      title={name}
                      className="ct-social"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="ct-form-card">
              <div className="ct-form-head">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="ct-form">
                {submitStatus && (
                  <div className={`ct-status ${submitStatus.success ? 'ct-status-success' : 'ct-status-error'}`} role="alert">
                    {submitStatus.success ? <FaCheck /> : <FaTimes />}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <div className="ct-field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="ct-field-row">
                  <div className="ct-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email"
                    />
                  </div>

                  <div className="ct-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="ct-field">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject...</option>
                    <option value="I'm new here">I'm new here</option>
                    <option value="Prayer Request">Prayer Request</option>
                    <option value="Inquiry">Inquiry</option>
                    <option value="Book Appointment with Rev. Canon Richard Otieno">Book Appointment with Rev. Canon Richard Otieno</option>
                    <option value="Baptism">Baptism</option>
                  </select>
                </div>

                <div className="ct-field">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button type="submit" className="ct-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="ct-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="ct-map-section">
        <div className="ct-container">
          <div className="ct-map-head">
            <p className="ct-eyebrow ct-eyebrow-dark"><span className="ct-eyebrow-line" />Find Us</p>
            <h2 className="ct-section-title">Visit Us in Miritini</h2>
          </div>
          <div className="ct-map-frame">
            <iframe
              title="ACK St. Jude Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8000000000006!2d39.65000000000001!3d-4.050000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDAnMDAuMCJTIDM5wrAzOScwMC4wIkU!5e0!3m2!1sen!2ske!4v1630000000000!5m2!1sen!2ske"
              // Using Plus Code: XHVH+WJ4, Mombasa
              // The Plus Code is embedded in the map URL
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
