import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaUsers,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaBullseye,
  FaClipboardList,
  FaArrowRight
} from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import Typewriter from './Typewriter';
import '../styles/MinistryPage.css';
import '../styles/Typewriter.css';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } }
};

const MinistryLayout = ({
  title,
  fullName,
  description,
  meeting,
  time,
  contact,
  email,
  image,
  children,
  details
}) => (
  <div className="ministry-page">
    {/* Hero */}
    <section className="ministry-hero">
      <div className="ministry-hero-media" aria-hidden="true">
        <img src={image || '/images/stjude.jpg'} alt="" />
      </div>
      <div className="ministry-hero-overlay" aria-hidden="true" />
      <div className="container ministry-hero-inner">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={rise}>
            <Link to="/ministries" className="ministry-back">
              <FaArrowLeft aria-hidden="true" /> All Ministries
            </Link>
          </motion.div>
          {fullName && fullName !== title && (
            <motion.p className="ministry-hero-eyebrow" variants={rise}>
              {fullName}
            </motion.p>
          )}
          <motion.h1 className="ministry-hero-title" variants={rise}>
            {title || fullName}
          </motion.h1>
          {description && (
            <motion.p className="ministry-hero-desc" variants={rise}>
              <Typewriter text={description} speed={30} />
            </motion.p>
          )}
          {(meeting || time) && (
            <motion.div className="ministry-hero-meta" variants={rise}>
              <BsCalendarCheck aria-hidden="true" />
              <span>{meeting}{meeting && time ? ' · ' : ''}{time}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>

    <div className="container">
      <div className="ministry-content">
        {/* Main column */}
        <div className="ministry-main">
          {details?.mission && (
            <motion.section
              className="mp-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55 }}
            >
              <span className="mp-card-icon" aria-hidden="true"><FaBullseye /></span>
              <h2>Our Mission</h2>
              <p>{details.mission}</p>
            </motion.section>
          )}

          {details?.activities?.length > 0 && (
            <motion.section
              className="mp-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
            >
              <span className="mp-card-icon" aria-hidden="true"><FaClipboardList /></span>
              <h2>What We Do</h2>
              <ul className="mp-activities">
                {details.activities.map((activity, index) => (
                  <li key={index}>
                    <FaCheck className="mp-check" aria-hidden="true" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Page-specific content */}
          <div className="content-section">
            {children}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="ministry-sidebar">
          <motion.div
            className="sidebar-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <h3>Meeting Details</h3>

            {(meeting || time) && (
              <div className="detail-item">
                <span className="detail-icon" aria-hidden="true"><BsCalendarCheck /></span>
                <div>
                  <p className="detail-label">When</p>
                  <p className="detail-value">{meeting}{meeting && time ? ' · ' : ''}{time}</p>
                </div>
              </div>
            )}

            {details?.requirements && (
              <div className="detail-item">
                <span className="detail-icon" aria-hidden="true"><FaInfoCircle /></span>
                <div>
                  <p className="detail-label">Requirements</p>
                  <p className="detail-value">{details.requirements}</p>
                </div>
              </div>
            )}

            {details?.leaders && (
              <div className="detail-item">
                <span className="detail-icon" aria-hidden="true"><FaUsers /></span>
                <div>
                  <p className="detail-label">Leaders</p>
                  <div className="detail-value leaders-content">{details.leaders}</div>
                </div>
              </div>
            )}

            <div className="contact-actions">
              <a href={`mailto:${email || contact}`} className="btn btn-primary">
                <FaEnvelope aria-hidden="true" /> Email Us
              </a>
              {contact && (
                <a href={`tel:${contact}`} className="btn btn-outline">
                  <FaPhone aria-hidden="true" /> Call Us
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            className="sidebar-cta"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h3>Get Involved</h3>
            <p>Come and experience {title} firsthand — we'd love to welcome you.</p>
            <Link to="/visit" className="btn btn-gold">
              Plan Your Visit <FaArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </aside>
      </div>
    </div>
  </div>
);

export default MinistryLayout;
