import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleSlider from '../components/SimpleSlider';
import './Home.css';

import {
  FaHandsHelping,
  FaChurch,
  FaUsers,
  FaPrayingHands,
  FaBible,
  FaCross,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaBook,
  FaClock,
  FaUser,
  FaHeadphones,
  FaHeart,
  FaQuoteLeft
} from 'react-icons/fa';

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const VERSES = [
  {
    quote: "In God's hands, shattered lives find healing, weary souls find strength and every dawn carries the promise of His glory.",
    verse: 'Those who hope in the Lord will renew their strength. — Isaiah 40:31'
  },
  {
    quote: 'Every wilderness you survive becomes proof that God walks with you. And every storm that failed to drown you becomes evidence that grace fights harder than hell.',
    verse: 'When you pass through the waters, I will be with you. — Isaiah 43:2'
  },
  {
    quote: 'Every pain surrendered to Christ becomes a seed. And in the soil of His mercy, even the deepest wounds bloom into testimonies that hell cannot silence.',
    verse: 'He heals the brokenhearted and binds up their wounds. — Psalm 147:3'
  }
];

const WELCOME_FEATURES = [
  {
    icon: <FaChurch />,
    title: 'Traditional & Contemporary Worship',
    text: 'Experience meaningful worship that connects you with God in both traditional and contemporary styles.'
  },
  {
    icon: <FaBible />,
    title: 'Bible-Centered Teaching',
    text: "Engaging, relevant messages based on the timeless truth of God's Word."
  },
  {
    icon: <FaUsers />,
    title: 'Loving Community',
    text: 'Find authentic relationships and support in our small groups and ministries.'
  }
];

const WELCOME_PHOTOS = [
  { src: '/images/union (2).jpeg', alt: 'Church women fellowship group' },
  { src: '/images/kama.jpeg', alt: 'Church activities at St. Jude Miritini' },
  { src: '/images/congregant.jpeg', alt: 'St. Jude Miritini church community' },
  { src: '/images/PCC.jpeg', alt: 'Parish council members' },
  { src: '/images/theme.jpeg', alt: 'Church gathering' }
];

const BELIEFS = [
  {
    icon: <FaHeart />,
    title: "God's Transformative Love",
    text: 'We believe in the power of God\'s love — a love that transforms hearts, restores hope and unites us as one family in Christ, guided by His Word.'
  },
  {
    icon: <FaCross />,
    title: 'The Holy Trinity',
    text: 'We believe in one God — Father, Son and Holy Spirit — who works in us and through us to bring healing, peace and renewal to our community.'
  },
  {
    icon: <FaHandsHelping />,
    title: 'Faith in Action',
    text: 'True faith is expressed in acts of love and service. We are committed to building a caring, prayerful community where all can experience God\'s presence.'
  }
];

const QUICK_LINKS = [
  {
    title: 'Ministries',
    description: 'Discover opportunities to serve and grow in your faith journey.',
    icon: <FaHandsHelping />,
    link: '/ministries'
  },
  {
    title: 'Worship',
    description: 'Join us for uplifting worship services and spiritual growth.',
    icon: <FaPrayingHands />,
    link: '/services'
  },
  {
    title: 'Sermons',
    description: 'Watch or listen to our latest messages and teachings.',
    icon: <FaBible />,
    link: '/sermons'
  },
  {
    title: 'Get Connected',
    description: 'Become part of our church family and community.',
    icon: <FaUsers />,
    link: '/connect'
  }
];

const VERSE_INTERVAL_MS = 8000;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } }
};

const slideIn = (direction) => ({
  hidden: { opacity: 0, x: direction === 'left' ? -40 : 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } }
});

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

const SectionHeader = ({ eyebrow, title, description, light }) => (
  <motion.header
    className={`section-head${light ? ' section-head--light' : ''}`}
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.4 }}
  >
    <motion.p className="eyebrow" variants={rise}>{eyebrow}</motion.p>
    <motion.h2 className="section-head-title" variants={rise}>{title}</motion.h2>
    {description && <motion.p className="section-head-desc" variants={rise}>{description}</motion.p>}
  </motion.header>
);

const ModalShell = ({ titleId, onClose, wide, children }) =>
  createPortal(
    <div className="home-modal-overlay" onClick={onClose} role="presentation">
      <div
        className={`home-modal-card${wide ? ' home-modal-card--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="home-modal-close" onClick={onClose} aria-label="Close dialog">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );

// Locks body scroll while the modal is mounted
const useBodyScrollLock = (isOpen) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);
};

/* ------------------------------------------------------------------ */
/*  Modals                                                             */
/* ------------------------------------------------------------------ */

const BeliefsModal = ({ isOpen, onClose }) => {
  useBodyScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <ModalShell titleId="beliefs-modal-title" onClose={onClose} wide>
      <p className="home-modal-eyebrow">What We Believe</p>
      <h2 id="beliefs-modal-title" className="home-modal-title">Our Core Beliefs</h2>

      <div className="home-modal-body">
        <p>
          At ACK St. Jude Miritini Parish, we believe in the power of God's love — a love that
          transforms hearts, restores hope, and unites us as one family in Christ. We are guided by
          the Word of God and the teachings of our Lord Jesus Christ, who calls us to live in faith,
          obedience and compassion toward one another.
        </p>
        <p>
          We believe in one God — Father, Son and Holy Spirit — who works in us and through us to
          bring healing, peace and renewal in our community. Through the grace of Christ, we are
          saved, sanctified and sent forth to shine His light wherever we go.
        </p>
        <p>
          We believe that true faith is expressed not only in words but in acts of love and service.
          As a parish, we are committed to building a caring, prayerful and supportive community
          where every person can experience the transforming presence of God.
        </p>
        <p>
          In our journey of faith, we continue to grow together through worship, fellowship and
          ministry. Our ongoing church development projects are expressions of our shared vision to
          make God's house a place of excellence, outreach and impact.
        </p>
        <p>
          We invite you to be part of this divine mission through your thanksgiving, tithes,
          offerings and development donations — giving cheerfully and prayerfully as an act of love
          and gratitude to God. Every contribution helps us expand God's work, nurture faith and
          serve our community in deeper ways.
        </p>
      </div>

      <div className="home-modal-actions">
        <Link to="/give" className="btn btn-primary">
          Give Now <FaArrowRight aria-hidden="true" />
        </Link>
        <button type="button" className="btn btn-outline" onClick={onClose}>
          Close
        </button>
      </div>
    </ModalShell>
  );
};

const AppointmentModal = ({ isOpen, onClose, formData, onChange, onSubmit, isSubmitting, status }) => {
  useBodyScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <ModalShell titleId="appointment-modal-title" onClose={onClose}>
      <div className="home-modal-logo">
        <img src="/images/cropped-LOGOmsa.png" alt="ACK St. Jude Miritini Parish logo" />
      </div>
      <p className="home-modal-eyebrow">Pastoral Care</p>
      <h2 id="appointment-modal-title" className="home-modal-title">Book an Appointment</h2>
      <p className="home-modal-subtitle">Request a meeting with Rev. Canon Richard Otieno</p>

      {status && (
        <div className={`home-modal-alert ${status.success ? 'home-modal-alert--success' : 'home-modal-alert--error'}`} role="status">
          {status.message}
        </div>
      )}

      <form className="home-modal-form" onSubmit={onSubmit}>
        <div className="modal-field">
          <label htmlFor="appt-name">Name *</label>
          <input id="appt-name" type="text" name="name" value={formData.name} onChange={onChange} required />
        </div>

        <div className="modal-field">
          <label htmlFor="appt-email">Email *</label>
          <input id="appt-email" type="email" name="email" value={formData.email} onChange={onChange} required />
        </div>

        <div className="modal-field">
          <label htmlFor="appt-phone">Phone</label>
          <input id="appt-phone" type="tel" name="phone" value={formData.phone} onChange={onChange} />
        </div>

        <div className="modal-row">
          <div className="modal-field">
            <label htmlFor="appt-date">Preferred Date *</label>
            <input id="appt-date" type="date" name="preferredDate" value={formData.preferredDate} onChange={onChange} required />
          </div>
          <div className="modal-field">
            <label htmlFor="appt-time">Preferred Time *</label>
            <input id="appt-time" type="time" name="preferredTime" value={formData.preferredTime} onChange={onChange} required />
          </div>
        </div>

        <div className="modal-field">
          <label htmlFor="appt-reason">Reason for meeting *</label>
          <textarea
            id="appt-reason"
            name="reason"
            value={formData.reason}
            onChange={onChange}
            required
            rows={4}
            placeholder="Please describe why you'd like to meet with Rev. Canon Richard..."
          />
        </div>

        <div className="home-modal-actions home-modal-actions--end">
          <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send Request'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */

const Home = () => {
  const [activeVerse, setActiveVerse] = useState(0);
  const [isBeliefsModalOpen, setIsBeliefsModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '', email: '', phone: '', preferredDate: '', preferredTime: '', reason: ''
  });

  // Rotate scripture verses
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVerse((prev) => (prev + 1) % VERSES.length);
    }, VERSE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingAppointment(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appointmentForm.name,
          email: appointmentForm.email,
          phone: appointmentForm.phone,
          subject: 'Book Appointment with Rev. Canon Richard Otieno',
          message: `Preferred Date: ${appointmentForm.preferredDate}\nPreferred Time: ${appointmentForm.preferredTime}\nReason: ${appointmentForm.reason}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setAppointmentForm({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', reason: '' });
        setAppointmentStatus({
          success: true,
          message: 'Your appointment request has been sent successfully! Rev. Richard will contact you soon.'
        });
        setTimeout(() => {
          setIsAppointmentModalOpen(false);
          setAppointmentStatus(null);
        }, 2000);
      } else {
        setAppointmentStatus({
          success: false,
          message: data.message || 'Failed to send appointment request. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setAppointmentStatus({
        success: false,
        message: 'Failed to connect to server. Please try again later.'
      });
    } finally {
      setIsSubmittingAppointment(false);
    }
  };

  /* No scheduled events at the moment — kept so cards render automatically when populated.
     Event shape: { id, title, date: Date, time, location, excerpt, image } */
  const upcomingEvents = [];

  const getDayOfMonth = (date) => date.getDate();
  const getMonthName = (date) => date.toLocaleString('default', { month: 'short' });
  const formatTime = (time) => time.replace(/^0/, '');

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero-slider">
        <SimpleSlider onBeliefsClick={() => setIsBeliefsModalOpen(true)} />
      </section>

      {/* Welcome */}
      <section className="section-block welcome">
        <div className="container">
          <div className="welcome-grid">
            <motion.div
              className="welcome-copy"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p className="eyebrow" variants={rise}>Welcome to St. Jude Miritini</motion.p>
              <motion.h2 className="welcome-title" variants={rise}>
                A Place to Belong, Believe and Become
              </motion.h2>
              <motion.p className="welcome-lead" variants={rise}>
                At St. Jude Miritini Anglican Church, we are a diverse community united by our
                faith in Jesus Christ. Our mission is to make disciples who love God, love
                others and serve the world.
              </motion.p>

              <motion.ul className="welcome-features" variants={rise}>
                {WELCOME_FEATURES.map((feature) => (
                  <li className="welcome-feature" key={feature.title}>
                    <span className="welcome-feature-icon" aria-hidden="true">{feature.icon}</span>
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>
                  </li>
                ))}
              </motion.ul>

              <motion.div className="welcome-actions" variants={rise}>
                <Link to="/about" className="btn btn-primary">
                  Our Story <FaArrowRight aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsBeliefsModalOpen(true)}
                >
                  Our Beliefs
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className="welcome-media"
              variants={slideIn('right')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="welcome-collage" aria-hidden="true">
                {WELCOME_PHOTOS.map((photo, index) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    className="welcome-photo"
                    style={{ '--photo-index': index }}
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="welcome-badge">
                <span className="welcome-badge-icon" aria-hidden="true"><FaCross /></span>
                <span className="welcome-badge-text">
                  A Parish of the<br />Anglican Church of Kenya
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="section-block beliefs">
        <div className="container">
          <SectionHeader
            eyebrow="Our Foundation"
            title="What We Believe"
            description="The convictions that shape our worship, our community and our mission"
          />

          <motion.div
            className="belief-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {BELIEFS.map((belief, index) => (
              <motion.article className="belief-card" variants={rise} key={belief.title}>
                <span className="belief-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="belief-icon" aria-hidden="true">{belief.icon}</span>
                <h3>{belief.title}</h3>
                <p>{belief.text}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="mission-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mission-cta-text">
              <h3>Join Us in Our Mission</h3>
              <p>
                Our church development projects express our shared vision to make God's house a
                place of excellence, outreach and impact. Be part of it through your thanksgiving,
                tithes, offerings and donations.
              </p>
            </div>
            <div className="mission-cta-actions">
              <Link to="/give" className="btn btn-gold">
                Give Now <FaArrowRight aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="btn btn-ghost-light"
                onClick={() => setIsBeliefsModalOpen(true)}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vicar's welcome */}
      <section className="section-block vicar">
        <div className="container">
          <div className="vicar-grid">
            <motion.figure
              className="vicar-photo"
              variants={slideIn('left')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img src="/images/canonrev.jpg" alt="Rev. Canon Richard Otieno, Vicar of St. Jude Miritini" loading="lazy" />
            </motion.figure>

            <motion.div
              className="vicar-copy"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p className="eyebrow" variants={rise}>A Message from Our Vicar</motion.p>
              <motion.blockquote className="vicar-quote" variants={rise}>
                "Grace and peace to you in Jesus Christ."
              </motion.blockquote>
              <motion.div className="vicar-body" variants={rise}>
                <p>
                  You have not come here by chance. This is a house of prayer, truth, and
                  transformation. Here, lives are shaped by the Word, faith is strengthened and
                  hope is restored through Christ. Our calling is clear: to raise believers who
                  live the Gospel with conviction, compassion and purpose.
                </p>
                <p>
                  As you explore this space, may your heart be stirred, your faith awakened and
                  your journey with God renewed. We invite you to walk with us, worship with us
                  and be transformed with us. Welcome home.
                </p>
              </motion.div>

              <motion.div className="vicar-signature" variants={rise}>
                <strong>Rev. Canon Richard Otieno</strong>
                <span>Vicar, St. Jude Miritini Parish</span>
              </motion.div>

              <motion.div variants={rise}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsAppointmentModalOpen(true)}
                >
                  <FaHandsHelping aria-hidden="true" /> Book a Session with the Vicar
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="section-block links">
        <div className="container">
          <SectionHeader
            eyebrow="How to Connect"
            title="Get Involved"
            description="Discover ways to grow in faith and serve our community"
          />

          <motion.div
            className="links-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {QUICK_LINKS.map((link) => (
              <motion.div variants={rise} key={link.title}>
                <Link to={link.link} className="link-card">
                  <span className="link-icon" aria-hidden="true">{link.icon}</span>
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                  <span className="link-more">
                    Learn more <FaArrowRight className="link-arrow" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="section-foot">
            <Link to="/ministries" className="btn btn-outline">
              View All Ministries <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="section-block events">
        <div className="container">
          <SectionHeader
            eyebrow="Join Us"
            title="Upcoming Events"
            description="Be part of our growing community through these gatherings"
          />

          {upcomingEvents.length === 0 ? (
            <motion.div
              className="events-empty"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="events-empty-media">
                <img src="/images/gfsprayer.jpeg" alt="Prayer gathering at St. Jude Miritini" loading="lazy" />
              </div>
              <div className="events-empty-body">
                <h3>More Gatherings Are on the Way</h3>
                <p>
                  We are preparing our next season of services, fellowships and outreach events.
                  Visit the events page for the full calendar — or simply join us this Sunday.
                </p>
                <Link to="/events" className="btn btn-primary">
                  View All Events <FaArrowRight aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="events-grid"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {upcomingEvents.slice(0, 3).map((event) => (
                <motion.article key={event.id} className="event-card" variants={rise}>
                  <div
                    className="event-image"
                    style={{ backgroundImage: `url(${event.image || '/images/events/default.jpg'})` }}
                  >
                    <div className="event-date">
                      <span className="event-day">{getDayOfMonth(event.date)}</span>
                      <span className="event-month">{getMonthName(event.date)}</span>
                    </div>
                  </div>
                  <div className="event-content">
                    <div className="event-meta">
                      <span className="meta-item">
                        <FaClock className="meta-icon" aria-hidden="true" />
                        {formatTime(event.time)}
                      </span>
                      <span className="meta-item">
                        <FaMapMarkerAlt className="meta-icon" aria-hidden="true" />
                        {event.location}
                      </span>
                    </div>
                    <h3 className="event-title">
                      <Link to={`/events/${event.id}`}>{event.title}</Link>
                    </h3>
                    <p className="event-excerpt">{event.excerpt}</p>
                    <Link to={`/events/${event.id}`} className="event-link">
                      Learn More <FaArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {upcomingEvents.length > 0 && (
            <div className="section-foot">
              <Link to="/events" className="btn btn-outline">
                View All Events <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Scripture rotator */}
      <section className="verse-section">
        <div className="container verse-inner">
          <FaQuoteLeft className="verse-mark" aria-hidden="true" />
          <div className="verse-stage">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeVerse}
                className="verse-quote"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <p className="verse-text">{VERSES[activeVerse].quote}</p>
                <cite className="verse-ref">{VERSES[activeVerse].verse}</cite>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="verse-dots" role="tablist" aria-label="Scripture verses">
            {VERSES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`verse-dot${activeVerse === index ? ' is-active' : ''}`}
                onClick={() => setActiveVerse(index)}
                aria-label={`Verse ${index + 1}`}
                aria-selected={activeVerse === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest sermon */}
      <section className="section-block sermon">
        <div className="container">
          <div className="sermon-grid">
            <motion.div
              className="sermon-video"
              variants={slideIn('left')}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <iframe
                src="https://www.youtube.com/embed/wD4XnFTCB1E"
                title="Featured sermon — Revive Us Oh Lord!"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            <motion.div
              className="sermon-details"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p className="eyebrow" variants={rise}>Featured Message</motion.p>
              <motion.h2 className="sermon-title" variants={rise}>Revive Us Oh Lord!</motion.h2>
              <motion.div className="sermon-meta" variants={rise}>
                <span className="meta-item"><FaCalendarAlt className="meta-icon" aria-hidden="true" /> 05/07/2026</span>
                <span className="meta-item"><FaUser className="meta-icon" aria-hidden="true" /> Rev. Esther Mrenje</span>
                <span className="meta-item"><FaBook className="meta-icon" aria-hidden="true" /> Psalms 85</span>
              </motion.div>
              <motion.p className="sermon-excerpt" variants={rise}>
                Jumapili Ya Tano Baada ya Siku Ya Utatu — a message of renewal and restoration.
              </motion.p>
              <motion.div className="sermon-actions" variants={rise}>
                <a
                  href="https://www.youtube.com/watch?v=wD4XnFTCB1E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Watch on YouTube
                </a>
                <a href="#" className="btn btn-outline">
                  <FaHeadphones aria-hidden="true" /> Listen
                </a>
                <div className="sermon-qr">
                  <img src="/images/renewed churches sermon.png" alt="QR code for sermon notes" loading="lazy" />
                  <span>Scan for notes</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <BeliefsModal isOpen={isBeliefsModalOpen} onClose={() => setIsBeliefsModalOpen(false)} />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        formData={appointmentForm}
        onChange={handleAppointmentChange}
        onSubmit={handleAppointmentSubmit}
        isSubmitting={isSubmittingAppointment}
        status={appointmentStatus}
      />
    </div>
  );
};

export default Home;
