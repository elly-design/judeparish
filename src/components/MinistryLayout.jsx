import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaUsers, FaInfoCircle, FaEnvelope, FaPhone } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import Typewriter from './Typewriter';
import '../styles/MinistryPage.css';
import '../styles/Typewriter.css';

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
}) => {
  return (
    <div className="ministry-page">
      {/* Back Button */}
      <div className="container">
        <Link to="/ministries" className="back-button">
          <FaArrowLeft /> Back to Ministries
        </Link>
      </div>

      {/* Hero Section */}
      <section className="ministry-hero" style={{ backgroundImage: `url(${image || '/images/ministry-default.jpg'})` }}>
        <div className="overlay"></div>
        <div className="container">
          <h1>{title || fullName}</h1>
          <div className="ministry-description">
            <Typewriter text={description} speed={60} />
          </div>
        </div>
      </section>

      <div className="container">
        <div className="ministry-content">
          {/* Main Content */}
          <div className="ministry-main">
            {/* Mission & Vision */}
            {details?.mission && (
              <section className="mission-section">
                <h2>Our Mission</h2>
                <p>{details.mission}</p>
              </section>
            )}

            {/* Activities */}
            {details?.activities?.length > 0 && (
              <section className="activities-section">
                <h2>What We Do</h2>
                <ul className="activities-list">
                  {details.activities.map((activity, index) => (
                    <li key={index}>
                      <span className="activity-icon">•</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Additional Content */}
            <div className="content-section">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="ministry-sidebar">
            <div className="sidebar-card">
              <h3>Meeting Details</h3>
              <div className="detail-item">
                <BsCalendarCheck className="detail-icon" />
                <div>
                  <p className="detail-label">When</p>
                  <p>{meeting} at {time}</p>
                </div>
              </div>
              
              {details?.requirements && (
                <div className="detail-item">
                  <FaInfoCircle className="detail-icon" />
                  <div>
                    <p className="detail-label">Requirements</p>
                    <p>{details.requirements}</p>
                  </div>
                </div>
              )}

              {details?.leaders && (
                <div className="detail-item">
                  <FaUsers className="detail-icon" />
                  <div>
                    <p className="detail-label">Leaders</p>
                    <div className="leaders-content">
                      {details.leaders}
                    </div>
                  </div>
                </div>
              )}

              <div className="contact-actions">
                <a href={`mailto:${email || contact}`} className="btn btn-primary">
                  <FaEnvelope /> Email Us
                </a>
                <a href={`tel:${contact}`} className="btn btn-outline">
                  <FaPhone /> Call Us
                </a>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default MinistryLayout;
