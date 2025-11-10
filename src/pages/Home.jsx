import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/slick-overrides.css";
import "./Home.css";
import { 
  FaArrowRight, 
  FaBook, 
  FaCalendarAlt, 
  FaClock,
  FaUser,
  FaMapMarkerAlt, 
  FaUsers,
  FaChurch,
  FaImages,
  FaPhone,
  FaPrayingHands,
  FaHandsHelping,
  FaHeadphones,
  FaDownload,
  FaCross
} from 'react-icons/fa';
import { FaBible } from 'react-icons/fa';
import './Home.css';
import '../styles/hero-buttons.css';

const Home = () => {
  // Mobile styles with !important flags
  const mobileStyles = {
    ctaSection: {
      padding: '3rem 1rem !important',
      minHeight: 'auto !important',
      position: 'relative !important',
      zIndex: '1 !important',
      overflow: 'visible !important'
    },
    ctaContent: {
      position: 'relative !important',
      zIndex: '2 !important',
      maxWidth: '100% !important',
      padding: '0 !important',
      margin: '0 auto !important'
    },
    ctaButtons: {
      display: 'flex !important',
      flexDirection: 'column !important',
      gap: '1rem !important',
      width: '100% !important',
      maxWidth: '400px !important',
      margin: '0 auto !important',
      padding: '0 1rem !important',
      position: 'relative !important',
      zIndex: '10 !important'
    },
    button: {
      display: 'flex !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
      width: '100% !important',
      minHeight: '3.5rem !important',
      padding: '1rem 1.5rem !important',
      fontSize: '1.1rem !important',
      borderRadius: '8px !important',
      textDecoration: 'none !important',
      fontWeight: '600 !important',
      boxSizing: 'border-box !important',
      border: 'none !important',
      cursor: 'pointer !important',
      transition: 'all 0.3s ease !important',
      position: 'relative !important',
      zIndex: '20 !important'
    },
    primaryButton: {
      backgroundColor: '#ffffff !important',
      color: '#1a4d8f !important',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1) !important'
    },
    secondaryButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
      color: '#ffffff !important',
      border: '2px solid rgba(255, 255, 255, 0.8) !important',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1) !important'
    }
  };
  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Trigger animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start('show');
    }
  }, [controls, isInView]);

  // Custom Arrow Components with better accessibility and error handling
  const SamplePrevArrow = React.forwardRef(({ className, style, onClick, 'aria-label': ariaLabel = 'Previous slide' }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`${className} slick-arrow slick-prev`}
        style={style}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-controls="hero-slider"
      >
        <span className="sr-only">{ariaLabel}</span>
      </button>
    );
  });

  const SampleNextArrow = React.forwardRef(({ className, style, onClick, 'aria-label': ariaLabel = 'Next slide' }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`${className} slick-arrow slick-next`}
        style={style}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-controls="hero-slider"
      >
        <span className="sr-only">{ariaLabel}</span>
      </button>
    );
  });

  // Slider settings with enhanced accessibility and mobile support
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    accessibility: true,
    focusOnSelect: false,
    adaptiveHeight: true,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    edgeFriction: 0.35,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    // Custom slide component to handle accessibility
    customPaging: (i) => (
      <button aria-label={`Go to slide ${i + 1}`}>
        <span className="sr-only">Go to slide {i + 1}</span>
      </button>
    ),
    // Handle slide changes and focus management
    beforeChange: (current, next) => {
      // Get all slides and their contents
      const allSlides = document.querySelectorAll('.slick-slide');
      const allSlideContents = document.querySelectorAll('.slick-slide > div');
      
      // Update all slides
      allSlides.forEach((slide, index) => {
        const isActive = index === next;
        
        // Only update aria-hidden on the slide content, not the slide itself
        // This prevents the aria-hidden conflict with focusable elements
        const slideContent = slide.querySelector('.slick-slide > div');
        if (slideContent) {
          slideContent.setAttribute('aria-hidden', !isActive);
        }
        
        // Update tabindex for keyboard navigation
        slide.setAttribute('tabindex', isActive ? '0' : '-1');
        
        // Manage focusable elements in non-active slides
        if (!isActive) {
          const focusableElements = slide.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          focusableElements.forEach(el => {
            el.setAttribute('tabindex', '-1');
            el.setAttribute('aria-hidden', 'true');
          });
        }
      });
      
      // Ensure the slide content div has the correct aria-hidden state
      allSlideContents.forEach((content, index) => {
        content.setAttribute('aria-hidden', index !== next);
      });
    },
    // Initialize tabindex on mount and after slide changes
    afterChange: (current) => {
      const slides = document.querySelectorAll('.slick-slide');
      const slideContents = document.querySelectorAll('.slick-slide > div');
      
      slides.forEach((slide, index) => {
        const isActive = index === current;
        
        // Only update aria-hidden on the slide content, not the slide itself
        const slideContent = slide.querySelector('.slick-slide > div');
        if (slideContent) {
          slideContent.setAttribute('aria-hidden', !isActive);
        }
        
        slide.setAttribute('tabindex', isActive ? '0' : '-1');
        
        // Make interactive elements in active slide focusable
        if (isActive) {
          const focusableElements = slide.querySelectorAll('button, [href], input, select, textarea, [tabindex="-1"]');
          focusableElements.forEach(el => {
            el.removeAttribute('aria-hidden');
            // Only set tabindex to 0 if it was previously -1
            if (el.getAttribute('tabindex') === '-1') {
              el.setAttribute('tabindex', '0');
            }
          });
        }
      });
      
      // Ensure the slide content div has the correct aria-hidden state
      slideContents.forEach((content, index) => {
        content.setAttribute('aria-hidden', index !== current);
      });
      
      // Set focus to the current slide for better keyboard navigation
      if (slides[current]) {
        slides[current].focus({ preventScroll: true });
      }
    },
    // Initialize the slider with proper accessibility attributes
    onInit: () => {
      const slides = document.querySelectorAll('.slick-slide');
      const slideContents = document.querySelectorAll('.slick-slide > div');
      
      slides.forEach((slide, index) => {
        const isActive = index === 0; // First slide is active by default
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `Slide ${index + 1}`);
        slide.setAttribute('aria-hidden', !isActive);
        slide.setAttribute('tabindex', isActive ? '0' : '-1');
        
        // Make only the active slide's content focusable
        if (!isActive) {
          const focusableElements = slide.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          focusableElements.forEach(el => {
            el.setAttribute('tabindex', '-1');
            el.setAttribute('aria-hidden', 'true');
          });
        }
      });
      
      // Set initial aria-hidden state for slide contents
      slideContents.forEach((content, index) => {
        content.setAttribute('aria-hidden', index !== 0);
      });
    },
    appendDots: dots => (
      <div className="slick-dots" role="tablist" aria-label="Carousel navigation">
        <ul style={{ display: 'flex' }}>{dots}</ul>
      </div>
    )
  };

  // Sample data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay()) % 7)),
      time: '8:00 AM',
      location: 'Main Sanctuary',
      excerpt: 'Join us for our weekly Sunday worship service with Holy Communion.',
      image: '/images/events/worship-service.jpg'
    },
    {
      id: 2,
      title: 'Bible Study & Prayer',
      date: new Date(new Date().setDate(new Date().getDate() + (2 - new Date().getDay() + 7) % 7)),
      time: '5:30 PM',
      location: 'Fellowship Hall',
      excerpt: 'Mid-week Bible study and prayer meeting. All are welcome!',
      image: '/images/events/bible-study.jpg'
    },
    {
      id: 3,
      title: 'Youth Fellowship',
      date: new Date(new Date().setDate(new Date().getDate() + (5 - new Date().getDay() + 7) % 7)),
      time: '4:00 PM',
      location: 'Youth Center',
      excerpt: 'An evening of worship, games, and fellowship for youth (ages 13-18).',
      image: '/images/events/youth-group.jpg'
    },
    {
      id: 4,
      title: 'Men\'s Breakfast',
      date: new Date(new Date().setDate(new Date().getDate() + (6 - new Date().getDay() + 7) % 7)),
      time: '8:00 AM',
      location: 'Church Hall',
      excerpt: 'Monthly men\'s breakfast with guest speaker and fellowship.',
      image: '/images/events/mens-breakfast.jpg'
    }
  ];

  // Quick links data
  const quickLinks = [
    {
      id: 1,
      title: 'Ministries',
      description: 'Discover opportunities to serve and grow in your faith journey.',
      icon: <FaHandsHelping />,
      link: '/ministries'
    },
    {
      id: 2,
      title: 'Worship',
      description: 'Join us for uplifting worship services and spiritual growth.',
      icon: <FaPrayingHands />,
      link: '/services'
    },
    {
      id: 3,
      title: 'Sermons',
      description: 'Watch or listen to our latest messages and teachings.',
      icon: <FaBible />,
      link: '/sermons'
    },
    {
      id: 4,
      title: 'Get Connected',
      description: 'Become part of our church family and community.',
      icon: <FaUsers />,
      link: '/connect'
    }
  ];

  // Format date
  const formatDate = (date) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Format time
  const formatTime = (time) => {
    return time.replace(/^0/, '');
  };

  // Get day of month
  const getDayOfMonth = (date) => {
    return date.getDate();
  };

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <div className="home">
      {/* Hero Slider */}
      <section className="hero-slider" aria-roledescription="carousel" aria-label="Featured Content">
        <Slider {...sliderSettings}>
          <div 
            className="slide slide-1" 
            role="group" 
            aria-roledescription="slide" 
            aria-label="Slide 1 of 3"
            tabIndex="-1"
          >
            <div className="slide-overlay" aria-hidden="true"></div>
            <div className="container">
              <motion.div 
                className="slide-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1
                }}
              >
                <span className="slide-pre-title">Welcome to</span>
                <h1>St. Jude's Anglican Church</h1>
                <p className="lead">Growing in Faith, Serving with Love, Building Community</p>
                <div className="slide-buttons">
                  <Link to="/about" className="btn btn-primary">
                    Our Story <FaArrowRight className="btn-icon" aria-hidden="true" />
                  </Link>
                  <Link to="/what-we-believe" className="btn btn-outline">
                    Our Beliefs
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="slide slide-2" role="group" aria-roledescription="slide" aria-label="Slide 2 of 3">
            <div className="slide-overlay"></div>
            <div className="container">
              <motion.div 
                className="slide-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="slide-pre-title">Experience</span>
                <h1>Authentic Community</h1>
                <p className="lead">Join us as we grow together in faith and service</p>
                <div className="slide-buttons">
                  <Link to="/ministries" className="btn btn-primary">
                    Our Ministries <FaArrowRight className="btn-icon" />
                  </Link>
                  <Link to="/contact" className="btn btn-outline">
                    Get Connected
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="slide slide-3" role="group" aria-roledescription="slide" aria-label="Slide 3 of 3">
            <div className="slide-overlay"></div>
            <div className="container">
              <motion.div 
                className="slide-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="slide-pre-title">Next Steps</span>
                <h1>Start Your Journey</h1>
                <p className="lead">Discover how you can get involved in our church family</p>
                <div className="slide-buttons">
                  <Link to="/new-here" className="btn btn-primary">
                    I'm New Here
                  </Link>
                  <Link to="/baptism" className="btn btn-outline">
                    Learn About Baptism
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </Slider>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section" style={{
        borderTop: 'none !important',
        borderBottom: 'none !important',
        boxShadow: 'none !important',
        backgroundImage: 'none !important',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#fff',
        padding: '4rem 0'
      }}>
        <div className="container">
          <motion.div 
            className="welcome-content"
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
          >
            <motion.div className="welcome-text" variants={item}>
              <h2 className="section-title">A Place to Belong, Believe and Become</h2>
              <p className="lead">At St. Jude's Anglican Church, we are a diverse community united by our faith in Jesus Christ. Our mission is to make disciples who love God, love others, and serve the world.</p>
              
              <div className="welcome-features">
                <div className="feature">
                  <div className="feature-icon">
                    <FaChurch style={{ color: '#2563eb' }} />
                  </div>
                  <div className="feature-content">
                    <h4>Traditional & Contemporary Worship</h4>
                    <p>Experience meaningful worship that connects you with God in both traditional and contemporary styles.</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <FaBible style={{ color: '#2563eb' }} />
                  </div>
                  <div className="feature-content">
                    <h4>Bible-Centered Teaching</h4>
                    <p>Engaging, relevant messages based on the timeless truth of God's Word.</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <FaUsers style={{ color: '#2563eb' }} />
                  </div>
                  <div className="feature-content">
                    <h4>Loving Community</h4>
                    <p>Find authentic relationships and support in our small groups and ministries.</p>
                  </div>
                </div>
              </div>
              
              <div className="welcome-buttons">
                <Link to="/about" className="btn btn-primary">
                  Our Story <FaArrowRight className="btn-icon" />
                </Link>
                <Link to="/what-we-believe" className="btn btn-outline">
                  Our Beliefs
                </Link>
              </div>
            </motion.div>
            
            <motion.div className="welcome-image" variants={item}>
              <div className="image-container">
                <img 
                  src="/images/church/welcome-image.jpg" 
                  alt="St. Jude's Anglican Church community" 
                  className="main-image"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vicar's Welcome - Redesigned */}
      <section className="vicar-welcome" style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 0',
        borderTop: '1px solid rgba(203, 213, 225, 0.3)',
        borderBottom: '1px solid rgba(203, 213, 225, 0.3)'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 70%)',
            zIndex: -1
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 70%)',
            zIndex: -1
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '4rem',
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* Vicar's Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
                aspectRatio: '4/5',
                maxHeight: '600px'
              }}
            >
              <img 
                src="/images/richard.jpg" 
                alt="Rev. Canon Richard Otieno"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </motion.div>
            
            {/* Vicar's Welcome Section */}
            <motion.div 
              className="vicar-message"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ width: '100%' }}
            >
              <motion.div 
                className="vicar-subtitle"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.1,
                    duration: 0.5
                  }
                }}
                viewport={{ once: true }}
              >
                A Message From Our Vicar
              </motion.div>
              
              <motion.h2 
                className="vicar-title"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.2,
                    duration: 0.5
                  }
                }}
                viewport={{ once: true }}
              >
                Welcome to St. Jude Miritini Anglican Church
              </motion.h2>
              
              <div style={{
                marginBottom: '2rem',
                position: 'relative'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#475569',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  zIndex: 1,
                  paddingLeft: '1.5rem',
                  borderLeft: '2px solid #e2e8f0',
                  fontStyle: 'italic'
                }}>
                  "It is with great joy that I welcome you to our church family, where we grow together in God's love and grace."
                </p>
              </div>
              
              <div style={{
                marginBottom: '2rem'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#475569',
                  marginBottom: '1.5rem',
                  paddingLeft: '0',
                  textIndent: '0'
                }}>
                  Whether you're visiting for the first time or have been with us for years, you are an important part of our church family.
                </p>
                
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#475569',
                  marginBottom: '1.5rem',
                  paddingLeft: '0',
                  textIndent: '0'
                }}>
                  Our doors are always open to you as we worship, serve and grow together in our journey of faith.
                </p>
              </div>
              
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f1f5f9',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#e2e8f0',
                  transform: 'translateY(-2px)'
                }
              }}>
                <FaHandsHelping style={{ color: '#2563eb' }} />
                <span style={{
                  fontWeight: '600',
                  color: '#1e293b',
                  fontSize: '0.95rem'
                }}>
                  Schedule a Meeting with Rev. Richard
                </span>
              </div>
              
              <div style={{
                marginTop: '2.5rem',
                paddingTop: '2rem',
              }}>
                <div style={{
                  marginTop: '1rem'
                }}>
                  <div style={{
                    color: '#2563eb',
                    fontWeight: '600',
                    fontSize: '1rem',
                    marginBottom: '0.25rem'
                  }}>
                    Rev. Canon Richard Otieno
                  </div>
                  <div style={{
                    color: '#64748b',
                    fontSize: '0.9rem'
                  }}>
                    Vicar, St. Jude's Anglican Church
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links section-padding bg-light">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">How to Connect</span>
            <h2 className="section-title">Get Involved</h2>
            <p className="section-description">Discover ways to grow in faith and serve our community</p>
          </div>
          
          <motion.div 
            className="links-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {quickLinks.map((link, index) => (
              <motion.div 
                key={link.id} 
                className="link-card"
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link to={link.link} className="link-card-inner">
                  <div className="link-icon">
                    {React.cloneElement(link.icon, { className: 'icon' })}
                  </div>
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                  <span className="link-arrow">
                    <FaArrowRight className="arrow-icon" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-5">
            <Link to="/ministries" className="btn btn-outline">
              View All Ministries <FaArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="upcoming-events section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Join Us</span>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-description">Be part of our growing community through these upcoming gatherings</p>
          </div>
          
          <motion.div 
            className="events-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <motion.article 
                key={event.id} 
                className="event-card"
                variants={item}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              >
                <div className="event-image" style={{ backgroundImage: `url(${event.image || '/images/events/default.jpg'})` }}>
                  <div className="event-date">
                    <span className="event-day">{getDayOfMonth(event.date)}</span>
                    <span className="event-month">{getMonthName(event.date)}</span>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-meta">
                    <span className="meta-item">
                      <FaClock className="meta-icon" />
                      {formatTime(event.time)}
                    </span>
                    <span className="meta-item">
                      <FaMapMarkerAlt className="meta-icon" />
                      {event.location}
                    </span>
                  </div>
                  <h3 className="event-title">
                    <Link to={`/events/${event.id}`}>{event.title}</Link>
                  </h3>
                  <p className="event-excerpt">{event.excerpt}</p>
                  <Link to={`/events/${event.id}`} className="event-link">
                    Learn More <FaArrowRight className="link-arrow" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
          
          <div className="text-center mt-5">
            <Link to="/events" className="btn btn-outline">
              View All Events <FaArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section section-padding bg-primary text-white" style={mobileStyles.ctaSection}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cta-content text-center" style={mobileStyles.ctaContent}>
            <div className="cta-icon" style={{
              width: '80px',
              height: '80px',
              fontSize: '2.25rem',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              <FaCross />
            </div>
            <h2 className="cta-title" style={{
              fontSize: '1.75rem',
              margin: '0 auto 1.25rem',
              padding: '0 0.5rem',
              lineHeight: '1.3',
              fontWeight: '700',
              position: 'relative',
              zIndex: 2
            }}>Experience God's Love With Us</h2>
            <p className="cta-text" style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              margin: '0 auto 2rem',
              padding: '0 0.5rem',
              maxWidth: '600px',
              position: 'relative',
              zIndex: 2
            }}>
              No matter where you are on your spiritual journey, you are welcome here. 
              Join us this Sunday and experience the joy of worshiping God in community.
            </p>
            <div className="cta-buttons" style={mobileStyles.ctaButtons}>
              <Link 
                to="/services" 
                className="btn btn-light btn-lg"
                style={{ 
                  ...mobileStyles.button, 
                  ...mobileStyles.primaryButton,
                  backgroundColor: '#ffffff',
                  color: '#1a4d8f'
                }}
              >
                Service Times
              </Link>
              <Link 
                to="/new-here" 
                className="btn btn-outline-light btn-lg"
                style={{ 
                  ...mobileStyles.button, 
                  ...mobileStyles.secondaryButton,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '2px solid rgba(255, 255, 255, 0.8)'
                }}
              >
                I'm New Here
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Sermon */}
      <section className="latest-sermon section-padding bg-light">
        <div className="container">
          <div className="sermon-content">
            <div className="sermon-media">
              <div className="sermon-image">
                <img src="/images/sermons/latest-sermon.jpg" alt="Latest Sermon" />
                <div className="play-button">
                  <span className="play-icon">▶</span>
                </div>
              </div>
            </div>
            <div className="sermon-details">
              <span className="section-subtitle">Featured Message</span>
              <h2 className="section-title">The Power of Faith in Difficult Times</h2>
              <div className="sermon-meta">
                <span className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  {formatDate(new Date())}
                </span>
                <span className="meta-item">
                  <FaUser className="meta-icon" />
                  Rev. John Smith
                </span>
                <span className="meta-item">
                  <FaBook className="meta-icon" />
                  Hebrews 11:1-6
                </span>
              </div>
              <p className="sermon-excerpt">
                In this message, we explore how faith can sustain us through life's most challenging moments. 
                Discover how to trust God's plan even when the path ahead seems uncertain.
              </p>
              <div className="sermon-actions">
                <a href="#" className="btn btn-primary">
                  Watch Now
                </a>
                <a href="#" className="btn btn-outline">
                  <FaHeadphones className="btn-icon" /> Listen
                </a>
                <a href="#" className="btn btn-text">
                  Download Notes <FaDownload className="btn-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
