import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Typewriter from '../components/Typewriter';
import '../styles/Services.css';

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const SERVICE_TIMES = [
  {
    day: 'Sunday',
    image: '/images/sunday.jpg',
    services: [
      { name: 'Early Morning Service', time: '6.00am - 7.30am' },
      { name: 'Second Service', time: '8.00am - 9.30am' },
      { name: 'Youth Service', time: '10.00am - 11.00am' },
      { name: 'Main Service', time: '11.00am - 12.30pm' }
    ]
  },
  { day: 'Monday', image: '/images/weekly.jpg', services: [] },
  { day: 'Tuesday', image: '/images/home.jpg', services: [] },
  { day: 'Wednesday', image: '/images/study.jpg', services: [] },
  {
    day: 'Thursday',
    services: [
      { name: 'Choir Practice', time: '5.00pm - 6.30pm' },
      { name: 'Praise and Worship', time: '5.30pm - 6.00pm' }
    ]
  },
  { day: 'Friday', image: '/images/thanksgiving.jpg', services: [] },
  {
    day: 'Saturday',
    services: [
      { name: 'Praise & Worship', time: '5.30pm - 6.30pm' },
      { name: 'Choir Practice', time: '5.30pm - 7.00pm' }
    ]
  }
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } }
};

/* ------------------------------------------------------------------ */
/*  Services page                                                      */
/* ------------------------------------------------------------------ */

const Services = () => (
  <div className="services-page">
    {/* Hero */}
    <section className="svc-hero">
      <div className="svc-hero-media" aria-hidden="true">
        <img src="/images/church.jpg" alt="" />
      </div>
      <div className="svc-hero-overlay" aria-hidden="true" />
      <div className="container svc-hero-inner">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p className="svc-hero-eyebrow" variants={rise}>
            Worship With Us
          </motion.p>
          <motion.h1 className="svc-hero-title" variants={rise}>
            <Typewriter text="Our Services" speed={70} />
          </motion.h1>
          <motion.p className="svc-hero-lead" variants={rise}>
            Join us for worship, fellowship and the Word of God.
          </motion.p>
          <motion.div className="svc-hero-actions" variants={rise}>
            <Link to="/visit" className="btn btn-gold">
              <BsCalendarCheck aria-hidden="true" /> Plan Your Visit
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Weekly schedule */}
    <section className="svc-section">
      <div className="container">
        <motion.header
          className="svc-section-head"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p className="eyebrow" variants={rise}>When We Meet</motion.p>
          <motion.h2 variants={rise}>Service Times</motion.h2>
          <motion.p className="svc-section-desc" variants={rise}>
            We welcome you to join us for any of our weekly services and activities.
          </motion.p>
        </motion.header>

        <motion.div
          className="svc-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICE_TIMES.map((day) => (
            <motion.article
              key={day.day}
              className={`svc-day${day.day === 'Sunday' ? ' svc-day--featured' : ''}`}
              variants={rise}
            >
              {day.image && (
                <div className="svc-day-media">
                  <img src={day.image} alt={`${day.day} at ACK St. Jude`} loading="lazy" />
                </div>
              )}

              <div className="svc-day-head">
                <FaCalendarAlt className="svc-day-icon" aria-hidden="true" />
                <h3>{day.day}</h3>
              </div>

              {day.services.length > 0 ? (
                <ul className="svc-list">
                  {day.services.map((service) => (
                    <li key={service.name} className="svc-item">
                      <span className="svc-name">{service.name}</span>
                      <span className="svc-time">
                        <FaClock aria-hidden="true" /> {service.time}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="svc-note">See poster above for this week's gathering.</p>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>

    {/* CTA band */}
    <section className="svc-section">
      <div className="container">
        <motion.div
          className="svc-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="svc-cta-text">
            <p className="eyebrow eyebrow--light">Everyone Is Welcome</p>
            <h2>Come and Worship With Us</h2>
            <p>
              Whether it's your first Sunday or your hundredth, there's a seat
              saved for you at ACK St. Jude Miritini.
            </p>
          </div>
          <div className="svc-cta-actions">
            <Link to="/visit" className="btn btn-gold">
              Plan Your Visit <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-ghost-light">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Services;
