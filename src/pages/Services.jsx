import React, { useState, useEffect } from 'react';
import { FaChurch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaPlayCircle, FaDownload, FaUser, FaBook, FaFacebook, FaYoutube, FaWhatsapp, FaTiktok, FaPaperPlane } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { BiChurch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const Typewriter = ({ text, speed = 50, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    // Typewriter effect
    let currentIndex = 0;
    const typeWriter = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, speed);
      }
    };
    
    const timer = setTimeout(typeWriter, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [text, speed, delay]);
  
  return (
    <span className={`typewriter-text ${className}`}>
      {displayText}
    </span>
  )
};

const Services = () => {
  // Service times data
  const serviceTimes = [
    {
      day: 'Sunday',
      services: [
        { name: 'Early Morning Service', time: '7:00 AM - 8:30 AM' },
        { name: 'Main Service', time: '9:00 AM - 11:30 AM' },
        { name: 'Evening Service', time: '4:00 PM - 6:00 PM' }
      ]
    },
    {
      day: 'Wednesday',
      services: [
        { name: 'Bible Study', time: '5:30 PM - 7:00 PM' },
        { name: 'Prayer Meeting', time: '7:00 PM - 8:00 PM' }
      ]
    },
    {
      day: 'Friday',
      services: [
        { name: 'Youth Service', time: '5:00 PM - 7:00 PM' },
        { name: 'Overnight Prayer', time: '10:00 PM - 6:00 AM', note: 'First Friday of the month' }
      ]
    },
    {
      day: 'Saturday',
      services: [
        { name: 'Choir Practice', time: '10:00 AM - 12:00 PM' },
        { name: 'Men\'s Fellowship', time: '8:00 AM - 10:00 AM', note: '1st Saturday' },
        { name: 'Women\'s Fellowship', time: '9:00 AM - 11:00 AM', note: '2nd Saturday' }
      ]
    }
  ];

  // Recent sermons data
  const recentSermons = [
    {
      id: 1,
      title: 'Walking in Faith',
      preacher: 'Rev. John Mwangi',
      date: 'June 5, 2023',
      reference: 'Hebrews 11:1-6',
      image: '/images/sermons/sermon1.jpg',
      audio: '/audio/sermon1.mp3',
      video: 'https://www.youtube.com/embed/example1'
    },
    {
      id: 2,
      title: 'The Power of Prayer',
      preacher: 'Pastor Sarah Wanjiku',
      date: 'May 29, 2023',
      reference: 'James 5:13-18',
      image: '/images/sermons/sermon2.jpg',
      audio: '/audio/sermon2.mp3',
      video: 'https://www.youtube.com/embed/example2'
    },
    {
      id: 3,
      title: 'Living by Grace',
      preacher: 'Rev. Peter Kamau',
      date: 'May 22, 2023',
      reference: 'Ephesians 2:8-10',
      image: '/images/sermons/sermon3.jpg',
      audio: '/audio/sermon3.mp3',
      video: 'https://www.youtube.com/embed/example3'
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero" style={{ backgroundImage: 'url("/images/services-banner.jpg")' }}>
        <div className="container">
          <h1><Typewriter text="Our Services" speed={100} delay={500} /></h1>
          <p><Typewriter 
            text="Join us for worship, fellowship, and the Word of God" 
            speed={50} 
            delay={1500} 
          /></p>
        </div>
        <div className="overlay"></div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          {/* Service Times Section */}
          <section className="service-times section">
            <div className="section-header">
              <span className="subtitle">When We Meet</span>
              <h2 className="section-title">Service Times</h2>
              <p className="section-description">
                We welcome you to join us for any of our weekly services and activities.
              </p>
            </div>
            
            <div className="service-times-grid">
              {serviceTimes.map((day, index) => (
                <div key={index} className="service-day">
                  <div className="day-header">
                    <FaCalendarAlt className="day-icon" />
                    <h3>{day.day}</h3>
                  </div>
                  <ul className="service-list">
                    {day.services.map((service, i) => (
                      <li key={i} className="service-item">
                        <div className="service-name">
                          <BiChurch className="service-icon" />
                          <span>{service.name}</span>
                        </div>
                        <div className="service-time">
                          <FaClock className="time-icon" />
                          <span>{service.time}</span>
                        </div>
                        {service.note && <div className="service-note">{service.note}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Services;
