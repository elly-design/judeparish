import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    opacity: 0
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type || 'spring',
      delay: delay || 0,
      duration: duration || 0.7,
      ease: 'easeOut'
    }
  }
});
import SimpleSlider from '../components/SimpleSlider';
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
  FaCross,
  FaHeart
} from 'react-icons/fa';
import { FaBible } from 'react-icons/fa';
import './Home.css';
import '../styles/hero-buttons.css';

// Beliefs Modal Component
const BeliefsModal = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  // Set mounted state when component mounts
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      ref={modalRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        backdropFilter: 'blur(4px)',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
          transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          opacity: isOpen ? 1 : 0
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#64748b',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            ':hover': {
              backgroundColor: '#f1f5f9',
              color: '#1e293b'
            }
          }}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#1e293b',
          marginBottom: '1.5rem',
          textAlign: 'center',
          position: 'relative',
          paddingBottom: '1rem'
        }}>
          Our Core Beliefs
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #2563eb, #6366f1, #ec4899)',
            borderRadius: '2px'
          }}></div>
        </h2>
        
        <div style={{
          lineHeight: '1.8',
          color: '#475569',
          fontSize: '1.1rem'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            At ACK St. Jude Miritini Parish, we believe in the power of God's love  a love that transforms hearts, restores hope, and unites us as one family in Christ. We are guided by the Word of God and the teachings of our Lord Jesus Christ, who calls us to live in faith, obedience and compassion toward one another.
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            We believe in one God  Father, Son and Holy Spirit  who works in us and through us to bring healing, peace and renewal in our community. Through the grace of Christ, we are saved, sanctified and sent forth to shine His light wherever we go.
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            We believe that true faith is expressed not only in words but in acts of love and service. As a parish, we are committed to building a caring, prayerful and supportive community where every person can experience the transforming presence of God.
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            In our journey of faith, we continue to grow together through worship, fellowship and ministry. Our ongoing church development projects are expressions of our shared vision to make God's house a place of excellence, outreach and impact.
          </p>
          
          <p>
            We invite you to be part of this divine mission through your thanksgiving, tithes, offerings and development donations  giving cheerfully and prayerfully as an act of love and gratitude to God. Every contribution helps us expand God's work, nurture faith and serve our community in deeper ways.
          </p>
        </div>
        
        <div style={{
          marginTop: '2.5rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link 
            to="/give" 
            className="btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.75rem',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#1d4ed8',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Give Now <FaArrowRight style={{ marginLeft: '0.5rem' }} />
          </Link>
          
          <button 
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.75rem',
              backgroundColor: 'transparent',
              color: '#2563eb',
              border: '2px solid #2563eb',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.05)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Appointment Modal Component
const AppointmentModal = ({ isOpen, onClose, formData, onChange, onSubmit, isSubmitting, status }) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  // Set mounted state when component mounts
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      ref={modalRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        backdropFilter: 'blur(4px)',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
          transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          opacity: isOpen ? 1 : 0
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#64748b',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            ':hover': {
              backgroundColor: '#f1f5f9',
              color: '#1e293b'
            }
          }}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <img 
            src="/cropped-LOGOmsa.png" 
            alt="Church Logo" 
            style={{
              maxWidth: '80px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
        
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#1e293b',
          marginBottom: '1.5rem',
          textAlign: 'center',
          position: 'relative',
          paddingBottom: '1rem'
        }}>
          ACK St. Jude Miritini Parish 
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #2563eb, #6366f1, #ec4899)',
            borderRadius: '2px'
          }}></div>
        </h2>
        
        <p style={{
          textAlign: 'center',
          color: '#475569',
          marginBottom: '1.5rem',
          fontSize: '1.1rem'
        }}>
          Request an appointment with Rev. Canon Richard Otieno
        </p>

        {status && (
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            backgroundColor: status.success ? '#dcfce7' : '#fee2e2',
            color: status.success ? '#166534' : '#991b1b',
            border: `1px solid ${status.success ? '#bbf7d0' : '#fecaca'}`,
            textAlign: 'center'
          }}>
            {status.message}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    outline: 'none',
                    borderColor: '#2563eb',
                    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                  }
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    outline: 'none',
                    borderColor: '#2563eb',
                    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                  }
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    outline: 'none',
                    borderColor: '#2563eb',
                    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                  }
                }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={onChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#2563eb',
                      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                    }
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Preferred Time *
                </label>
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={onChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#2563eb',
                      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Reason for Meeting *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={onChange}
                required
                rows={4}
                placeholder="Please describe why you'd like to meet with Rev. Canon  Richard..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    outline: 'none',
                    borderColor: '#2563eb',
                    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                  }
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button 
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 1.75rem',
                backgroundColor: 'transparent',
                color: '#2563eb',
                border: '2px solid #2563eb',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isSubmitting ? 0.5 : 1,
                ':hover': {
                  backgroundColor: isSubmitting ? 'transparent' : 'rgba(37, 99, 235, 0.05)',
                  transform: isSubmitting ? 'none' : 'translateY(-2px)'
                }
              }}
            >
              Cancel
            </button>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 1.75rem',
                backgroundColor: isSubmitting ? '#94a3b8' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isSubmitting ? 0.7 : 1,
                ':hover': {
                  backgroundColor: isSubmitting ? '#94a3b8' : '#1d4ed8',
                  transform: isSubmitting ? 'none' : 'translateY(-2px)'
                }
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

const Home = () => {
  const [isBeliefsModalOpen, setIsBeliefsModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    reason: ''
  });
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState(null);

  // Handle appointment form input changes
  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle appointment form submission
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingAppointment(true);
    
    try {
      // Send appointment request to backend API
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: appointmentForm.name,
          email: appointmentForm.email,
          phone: appointmentForm.phone,
          subject: 'Appointment Request with Rev. Richard',
          message: `Preferred Date: ${appointmentForm.preferredDate}\nPreferred Time: ${appointmentForm.preferredTime}\nReason: ${appointmentForm.reason}`
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reset form on successful submission
        setAppointmentForm({
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          reason: ''
        });
        
        setAppointmentStatus({ 
          success: true, 
          message: 'Your appointment request has been sent successfully! Rev. Richard will contact you soon.' 
        });
        
        // Close modal after 2 seconds
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

  // Track active slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Slider settings with proper accessibility
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
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
    adaptiveHeight: false,
    draggable: true,
    swipe: true,
    touchThreshold: 5,
    edgeFriction: 0.35,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
    afterChange: (current) => {
      // Focus for accessibility
      const slides = document.querySelectorAll('.slick-slide');
      if (slides[current]) {
        slides[current].focus({ preventScroll: true });
      }
    },
    customPaging: (i) => (
      <button type="button" aria-label={`Go to slide ${i + 1}`}>
        <span className="sr-only">Go to slide {i + 1}</span>
      </button>
    ),
    appendDots: dots => (
      <div className="slick-dots" role="tablist" aria-label="Carousel navigation">
        <ul style={{ display: 'flex', justifyContent: 'center', margin: 0, padding: 0 }}>{dots}</ul>
      </div>
    )
  };

  // Currently no upcoming events
  const upcomingEvents = [];
  /* Example event format:
  [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: new Date(),
      time: '8:00 AM',
      location: 'Main Sanctuary',
      excerpt: 'Join us for worship',
      image: '/images/events/worship-service.jpg'
    },
    {
      id: 2,
      title: 'Bible Study & Prayer',
      date: new Date(),
      time: '5:30 PM',
      location: 'Fellowship Hall',
      excerpt: 'Mid-week Bible study and prayer meeting. All are welcome!',
      image: '/images/events/bible-study.jpg'
    },
    {
      id: 3,
      title: 'Youth Fellowship',
      date: new Date(),
      time: '4:00 PM',
      location: 'Youth Center',
      excerpt: 'Fun and fellowship for youth ages 12-18',
      image: '/images/events/youth-fellowship.jpg'
    }
  ]
  */

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

  // Set up the carousel after component mounts
  useEffect(() => {
      // Initialize slides with proper ARIA attributes and styles
    const slides = document.querySelectorAll('.slick-slide');
    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${index + 1}`);
      slide.setAttribute('aria-hidden', index !== 0);
      slide.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      // Set initial visibility and styles
      if (index === 0) {
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
        slide.style.position = 'relative';
        slide.style.zIndex = '2';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.transition = 'opacity 1s ease-in-out';
      } else {
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.position = 'absolute';
        slide.style.zIndex = '1';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.top = '0';
        slide.style.left = '0';
      }
    });
  }, []);

  return (
    <div className="home">
      {/* Hero Slider */}
      <section className="hero-slider">
        <SimpleSlider onBeliefsClick={() => setIsBeliefsModalOpen(true)} />
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
              <p className="lead">At St. Jude Miritini Anglican Church, we are a diverse community united by our faith in Jesus Christ. Our mission is to make disciples who love God, love others, and serve the world.</p>
              
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
                <button 
                  onClick={() => setIsBeliefsModalOpen(true)}
                  className="btn btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'transparent',
                    color: '#2563eb',
                    border: '2px solid #2563eb',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.05)',
                      transform: 'translateY(-2px)'
                    },
                    fontFamily: 'inherit',
                    fontSize: '1rem'
                  }}
                >
                  Our Beliefs
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={item}
              style={{
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '0 1rem',
                boxShadow: 'none !important',
                WebkitBoxShadow: 'none !important',
                MozBoxShadow: 'none !important',
                filter: 'none',
                border: 'none',
                outline: 'none'
              }}
            >
              {/* Image Slideshow with Ken Burns Effect */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '60%',
                  borderRadius: '0px',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  margin: '0 auto'
                }}
              >
                {/* Congregant Image */}
                <motion.img
                  src="/images/congregant.jpeg"
                  alt="St. Jude's Anglican Church community"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    boxShadow: 'none !important',
                    WebkitBoxShadow: 'none !important',
                    MozBoxShadow: 'none !important',
                    filter: 'none'
                  }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    opacity: [1, 1, 0, 0, 0],
                    scale: [1, 1.1, 1.1, 1, 1]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Kama Image */}
                <motion.img
                  src="/images/kama.jpeg"
                  alt="Church activities"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    boxShadow: 'none !important',
                    WebkitBoxShadow: 'none !important',
                    MozBoxShadow: 'none !important',
                    filter: 'none'
                  }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ 
                    opacity: [0, 0, 1, 1, 0],
                    scale: [1, 1, 1, 1.12, 1.12]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Mothers Image */}
                <motion.img
                  src="/images/purple.jpeg"
                  alt="Church mothers group"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    boxShadow: 'none !important',
                    WebkitBoxShadow: 'none !important',
                    MozBoxShadow: 'none !important',
                    filter: 'none'
                  }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ 
                    opacity: [0, 0, 0, 1, 1, 0],
                    scale: [1, 1, 1, 1, 1.08, 1.08]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* PCC Image */}
                <motion.img
                  src="/images/PCC.jpeg"
                  alt="PCC activities"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    boxShadow: 'none !important',
                    WebkitBoxShadow: 'none !important',
                    MozBoxShadow: 'none !important',
                    filter: 'none'
                  }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ 
                    opacity: [0, 0, 0, 0, 0, 1],
                    scale: [1, 1, 1, 1, 1, 1.1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Beliefs Section */}
      <section className="beliefs-section" style={{
        backgroundColor: '#f8fafc',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 70%)',
            zIndex: -1
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0) 70%)',
            zIndex: -1
          }}></div>

          <motion.div 
            className="section-header text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header" style={{ textAlign: 'center' }}>
            <div style={{
              display: 'block',
              color: '#1a4d8f',
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: '0 auto 0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              position: 'relative',
              padding: 0
            }}>Our Foundation</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Our Beliefs</h2>
            </div>
          </motion.div>

          <div className="beliefs-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {/* Belief Card 1 */}
            <motion.div 
              className="belief-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2.5rem 2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }}
              whileHover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="belief-icon" style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <FaHeart style={{ color: '#2563eb', fontSize: '1.75rem' }} />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem',
                lineHeight: '1.3'
              }}>God's Transformative Love</h3>
              <p style={{
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontSize: '1.05rem'
              }}>
                We believe in the power of God's love  a love that transforms hearts, restores hope and unites us as one family in Christ. We are guided by the Word of God and the teachings of our Lord Jesus Christ.
              </p>
              <div className="belief-number" style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                fontSize: '3.5rem',
                fontWeight: '800',
                color: 'rgba(37, 99, 235, 0.05)',
                lineHeight: 1,
                userSelect: 'none'
              }}></div>
            </motion.div>

            {/* Belief Card 2 */}
            <motion.div 
              className="belief-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2.5rem 2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }}
              whileHover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="belief-icon" style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <FaCross style={{ color: '#6366f1', fontSize: '1.75rem' }} />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem',
                lineHeight: '1.3'
              }}>The Holy Trinity</h3>
              <p style={{
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontSize: '1.05rem'
              }}>
                We believe in one God  Father, Son and Holy Spirit  who works in us and through us to bring healing, peace and renewal in our community. Through the grace of Christ, we are saved, sanctified and sent forth.
              </p>
              <div className="belief-number" style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                fontSize: '3.5rem',
                fontWeight: '800',
                color: 'rgba(99, 102, 241, 0.05)',
                lineHeight: 1,
                userSelect: 'none'
              }}></div>
            </motion.div>

            {/* Belief Card 3 */}
            <motion.div 
              className="belief-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2.5rem 2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }}
              whileHover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="belief-icon" style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <FaHandsHelping style={{ color: '#ec4899', fontSize: '1.75rem' }} />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem',
                lineHeight: '1.3'
              }}>Faith in Action</h3>
              <p style={{
                color: '#475569',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontSize: '1.05rem'
              }}>
                We believe that true faith is expressed in acts of love and service. We're committed to building a caring, prayerful community where every person can experience God's presence.
              </p>
              <div className="belief-number" style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                fontSize: '3.5rem',
                fontWeight: '800',
                color: 'rgba(236, 72, 153, 0.05)',
                lineHeight: 1,
                userSelect: 'none'
              }}></div>
            </motion.div>
          </div>

          {/* Full Width CTA */}
          <motion.div 
            className="beliefs-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              marginTop: '4rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '3rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(226, 232, 240, 0.8)'
            }}
          >
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '1.5rem',
              lineHeight: '1.3',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Join Us in Our Mission
            </h3>
            <p style={{
              color: '#475569',
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontSize: '1.1rem',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Our ongoing church development projects are expressions of our shared vision to make God's house a place of excellence, outreach and impact. We invite you to be part of this divine mission through your thanksgiving, tithes, offerings and development donations.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                to="/give" 
                className="btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.75rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: '#1d4ed8',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Give Now <FaArrowRight style={{ marginLeft: '0.5rem' }} />
              </Link>
              <button 
                onClick={() => setIsBeliefsModalOpen(true)}
                className="btn btn-outline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.75rem',
                  backgroundColor: 'transparent',
                  color: '#2563eb',
                  border: '2px solid #2563eb',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Learn More About Our Beliefs
              </button>
              <BeliefsModal 
                isOpen={isBeliefsModalOpen} 
                onClose={() => setIsBeliefsModalOpen(false)} 
              />
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
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, #2563eb, #6366f1, #ec4899)'
            }}></div>
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
                src="images/canonrev.jpg" 
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
                  "Beloved in Christ, welcome to our church family. Here, we are committed to growing in faith, walking in love and standing together in unity."
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
                  This is a place where hope is renewed, lives are transformed and every person is valued. I warmly invite you to worship with us, join a home fellowship zones group and be part of what God is doing in our community.
                </p>
                
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#475569',
                  marginBottom: '1.5rem',
                  paddingLeft: '0',
                  textIndent: '0'
                }}>
                  Through our shared prayers, service, tithes, thanksgiving and support for church projects, we build a stronger, caring and generous church that reflects Christ's heart. May you find belonging, purpose and encouragement as we journey together in God's love.
                </p>
              </div>
              
              <div 
                onClick={() => setIsAppointmentModalOpen(true)}
                style={{
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
                  Schedule a Meeting with Rev. Canon Richard Otieno
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
                    Vicar
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
            <div style={{
              display: 'block',
              color: '#1a4d8f',
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: '0 auto 0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              position: 'relative',
              padding: 0
            }}>How to Connect</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Get Involved</h2>
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
            <div style={{
              display: 'block',
              color: '#1a4d8f',
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: '0 auto 0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              position: 'relative',
              padding: 0
            }}>Join Us</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Upcoming Events</h2>
            <p className="section-description">Be part of our growing community through these upcoming gatherings</p>
          </div>
          
          <div className="events-grid">
            <motion.div 
              className="events-container"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              style={{ width: '100%' }}
            >
              {upcomingEvents.length === 0 ? (
                <div className="no-events-message">
                  <div className="no-events-content">
                    <h3 className="no-events-title">No Upcoming Events</h3>
                    <p className="no-events-text">
                      We have no upcoming events right now, but our team is joyfully preparing new opportunities for worship, fellowship and community growth. Stay tuned for updates in the upcoming events section on this page.
                    </p>
                  </div>
                </div>
              ) : (
                upcomingEvents.slice(0, 3).map((event, index) => (
                  <motion.article 
                    key={event.id} 
                    className="event-card"
                    variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
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
                ))
              )}
            </motion.div>
          </div>
          
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
            }}>
              "In God's hands, shattered lives find healing, weary souls find strength and every dawn carries the promise of His glory."
            </h2>
            <p className="cta-text" style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              margin: '0 auto 2rem',
              padding: '0 0.5rem',
              maxWidth: '600px',
              position: 'relative',
              zIndex: 2,
              fontStyle: 'italic'
            }}>
              "Those who hope in the Lord will renew their strength.”  Isaiah 40:31
            </p>
          </div>
        </div>
      </section>
      
      {/* Latest Sermon */}
      <section className="latest-sermon section-padding bg-light">
        <div className="container">
          <div className="sermon-content">
            <div className="sermon-media">
              <div className="sermon-video">
                <iframe 
                  width="100%" 
                  height="315" 
                  src="https://www.youtube.com/embed/5Co3rY25pek" 
                  title="Featured Sermon" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
            <div className="sermon-details">
              <span className="section-subtitle">Featured Message</span>
              <h2 className="section-title">Christ the Blue Print</h2>
              <div className="sermon-meta">
                <span className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  23rd March, 2025
                </span>
                <span className="meta-item">
                  <FaUser className="meta-icon" />
                  Rev. Canon Richard Otieno
                </span>
                <span className="meta-item">
                  <FaBook className="meta-icon" />
                  John 13:12-17
                </span>
              </div>
              <p className="sermon-excerpt">
                Principles & Practices for Christian Leadership
              </p>
              <div className="sermon-actions">
                <a href="https://youtu.be/5Co3rY25pek" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Watch on YouTube
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
