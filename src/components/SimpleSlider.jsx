import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/simple-slider.css';

// Direct paths to images in public directory
const slides = [
  {
    id: 1,
    preTitle: 'Welcome to',
    title: "St. Jude Miritini Anglican Church",
    subtitle: "Miritini Anglican Church",
    image: 'images/lay.jpeg',
    buttons: [
      { text: 'Our Story', to: '/about', variant: 'primary' },
      { text: 'Our Beliefs', to: '/what-we-believe', variant: 'outline' }
    ]
  },
  {
    id: 2,
    preTitle: 'Rise in God’s Glory',
    title: 'Transformed Neighbourhoods',
    subtitle: "Where Love Meets Action",
    image: 'images/mu.jpeg',
    buttons: [
      { text: 'Explore Our Ministries', to: '/ministries', variant: 'primary' },
      { text: 'Connect With Us', to: '/contact', variant: 'outline' }
    ]
  },
  {
    id: 3,
    preTitle: 'Faith That Moves',
    title: 'Christ-Centered Community',
    subtitle: "Join Our Faith Journey",
    image: 'images/sunday.jpeg',
    buttons: [
      { text: "I'm New Here", to: '/new-here', variant: 'primary' },
      { text: 'Discover Baptism', to: '/baptism', variant: 'outline' }
    ]
  }
];

const AUTOPLAY_MS = 6000;

// Slide wrapper that mirrors the active state so content can animate in
const Slide = ({ children, isActive, ...props }) => (
  <div
    {...props}
    className={`hero-slide${isActive ? ' is-active' : ''}`}
    aria-hidden={!isActive}
  >
    {children}
  </div>
);

const SimpleSlider = ({ onBeliefsClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [membershipForm, setMembershipForm] = useState({
    names: '',
    email: '',
    phone: '',
    placeofresidence: '',
    membershipType: 'regular',
    previousChurch: '',
    baptismStatus: 'not-baptized',
    interests: []
  });
  const [isSubmittingMembership, setIsSubmittingMembership] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState(null);

  // Handle membership form input changes
  const handleMembershipChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setMembershipForm(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, value]
          : prev.interests.filter(interest => interest !== value)
      }));
    } else {
      setMembershipForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle membership form submission
  const handleMembershipSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingMembership(true);
    
    try {
      // Send membership request to backend API
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: membershipForm.names,
          email: membershipForm.email,
          phone: membershipForm.phone,
          subject: 'I\'m new here',
          message: `Place of Residence: ${membershipForm.placeofresidence}\nMembership Type: ${membershipForm.membershipType}\nPrevious Church: ${membershipForm.previousChurch}\nBaptism Status: ${membershipForm.baptismStatus}\nInterests: ${membershipForm.interests.join(', ')}`
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reset form on successful submission
        setMembershipForm({
          names: '',
          email: '',
          phone: '',
          placeofresidence: '',
          membershipType: 'regular',
          previousChurch: '',
          baptismStatus: 'not-baptized',
          interests: []
        });
        
        setMembershipStatus({ 
          success: true, 
          message: 'Your membership application has been submitted successfully! We will contact you soon.' 
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsMembershipModalOpen(false);
          setMembershipStatus(null);
        }, 2000);
      } else {
        setMembershipStatus({ 
          success: false, 
          message: data.message || 'Failed to submit membership application. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting membership:', error);
      setMembershipStatus({ 
        success: false, 
        message: 'Failed to connect to server. Please try again later.' 
      });
    } finally {
      setIsSubmittingMembership(false);
    }
  };

  useEffect(() => {
    // Preload images for smoother transitions
    const preloadImages = () => {
      slides.forEach(slide => {
        const img = new Image();
        img.src = `/${slide.image}`;
      });
    };
    
    // Small delay to ensure smooth initial render
    const timer = setTimeout(() => {
      setIsMounted(true);
      window.dispatchEvent(new Event('resize'));
      preloadImages();
    }, 50); // Reduced delay for faster initialization
    
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: AUTOPLAY_MS,
    pauseOnHover: true,
    pauseOnFocus: true,
    cssEase: 'ease',
    arrows: false,
    accessibility: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 12,
    waitForAnimate: false,
    beforeChange: (_, next) => setCurrentSlide(next)
  };

  const renderSlideButton = (button, index) => {
    const className = `slider-btn slider-btn--${button.variant === 'primary' ? 'primary' : 'ghost'}`;
    const icon = button.variant === 'primary'
      ? <FaArrowRight className="slider-btn-icon" aria-hidden="true" />
      : null;

    if (button.text === 'Our Beliefs') {
      return (
        <button key={index} type="button" className={className} onClick={onBeliefsClick}>
          {button.text}
          {icon}
        </button>
      );
    }

    if (button.text === "I'm New Here") {
      return (
        <button key={index} type="button" className={className} onClick={() => setIsMembershipModalOpen(true)}>
          {button.text}
          {icon}
        </button>
      );
    }

    return (
      <Link key={index} to={button.to} className={className}>
        {button.text}
        {icon}
      </Link>
    );
  };

  if (!isMounted) {
    return <div className="simple-slider" aria-hidden="true" />;
  }

  return (
    <div
      className="simple-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Welcome highlights"
    >
      <Slider {...settings}>
        {slides.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            <Slide
              key={slide.id}
              isActive={isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
              <div className="hero-slide-media" aria-hidden="true">
                <div
                  className="hero-slide-bg"
                  style={{ backgroundImage: `url(/${slide.image})` }}
                />
                <div className="hero-slide-overlay" />
              </div>

              <div className="hero-slide-inner">
                <div className="hero-slide-content">
                  {slide.preTitle && (
                    <span className="hero-slide-eyebrow">{slide.preTitle}</span>
                  )}
                  <h1 className="hero-slide-title">{slide.title}</h1>
                  {slide.subtitle && (
                    <p className="hero-slide-subtitle">{slide.subtitle}</p>
                  )}
                  <div className="hero-slide-buttons">
                    {slide.buttons.map(renderSlideButton)}
                  </div>
                </div>
              </div>
            </Slide>
          );
        })}
      </Slider>

      {/* Membership Modal */}
      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
        formData={membershipForm}
        onChange={handleMembershipChange}
        onSubmit={handleMembershipSubmit}
        isSubmitting={isSubmittingMembership}
        status={membershipStatus}
      />
    </div>
  );
};

// Hook to detect mobile screen size
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
};

// Membership Modal Component
const MembershipModal = ({ isOpen, onClose, formData, onChange, onSubmit, isSubmitting, status }) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);
  const isMobile = useIsMobile();

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
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close modal on background click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: isMobile ? '1rem' : '1rem'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        style={{
          backgroundColor: 'white',
          borderRadius: isMobile ? '8px 8px 0 0' : '12px',
          maxWidth: '600px',
          width: '100%',
          height: isMobile ? 'calc(70vh - 80px)' : 'auto',
          maxHeight: isMobile ? 'calc(70vh - 80px)' : '85vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
          marginTop: isMobile ? '1rem' : '0',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          opacity: isOpen ? 1 : 0,
          padding: isMobile ? '0' : '0'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: isMobile ? '0.75rem' : '1rem',
            right: isMobile ? '0.75rem' : '1rem',
            background: 'none',
            border: 'none',
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            cursor: 'pointer',
            color: '#64748b',
            padding: isMobile ? '0.4rem' : '0.5rem',
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
          fontSize: isMobile ? '1.5rem' : '2rem',
          fontWeight: '800',
          color: '#1e293b',
          marginBottom: '1rem',
          textAlign: 'center',
          padding: isMobile ? '1.5rem 1rem 0 1rem' : '2rem 2rem 0 2rem'
        }}>
          Join Our Church Family
        </h2>
        
        
        <p style={{
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          padding: isMobile ? '0 1rem' : '0 2rem',
          fontSize: isMobile ? '0.9rem' : '1rem'
        }}>
          We're excited to welcome you to ACK St. Jude Miritini! Please fill out this form to start your membership journey.
        </p>
        
        <form onSubmit={onSubmit} style={{ 
          padding: isMobile ? '0 1rem 2rem 1rem' : '0 2rem 2rem 2rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
              Names *
            </label>
            <input
              type="text"
              name="names"
              value={formData.names || ''}
              onChange={onChange}
              required
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                ':focus': {
                  outline: 'none',
                  borderColor: '#2563eb'
                }
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
              Email Address *
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
                ':focus': {
                  outline: 'none',
                  borderColor: '#2563eb'
                }
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                ':focus': {
                  outline: 'none',
                  borderColor: '#2563eb'
                }
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
              Place of Residence
            </label>
            <textarea
              name="placeofresidence"
              value={formData.placeofresidence}
              onChange={onChange}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                resize: 'vertical',
                ':focus': {
                  outline: 'none',
                  borderColor: '#2563eb'
                }
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
              Membership Type *
            </label>
            <select
              name="membershipType"
              value={formData.membershipType}
              onChange={onChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                ':focus': {
                  outline: 'none',
                  borderColor: '#2563eb'
                }
              }}
            >
              <option value="full">Full Member</option>
              <option value="associate">Associate Member</option>
              <option value="visiting">Visiting Member</option>
              <option value="youth">Youth Membership</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
              Previous Church (if any)
            </label>
            <input
              type="text"
              name="previousChurch"
              value={formData.previousChurch}
              onChange={onChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                ':focus': {
                  outline: 'none',
                  borderColor: '#2563eb'
                }
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
              Baptism Status *
            </label>
            <select
              name="baptismStatus"
              value={formData.baptismStatus}
              onChange={onChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                ':focus': {
                  outline: 'none',
                  borderColor: '#2563eb'
                }
              }}
            >
              <option value="not-baptized">Not Baptized</option>
              <option value="baptized">Already Baptized</option>
              <option value="interested">Interested in Baptism</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
              Areas of Interest
            </label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: isMobile ? '0.75rem' : '0.5rem'
            }}>
              {['Sunday School', 'Youth Ministry', 'Women\'s Ministry', 'Men\'s Ministry', 'Choir/Music'].map(interest => (
                <label key={interest} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={onChange}
                    style={{ margin: 0 }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#374151' }}>{interest}</span>
                </label>
              ))}
            </div>
          </div>
          
          {status && (
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              backgroundColor: status.success ? '#dcfce7' : '#fee2e2',
              color: status.success ? '#166534' : '#dc2626',
              border: `1px solid ${status.success ? '#bbf7d0' : '#fecaca'}`,
              textAlign: 'center'
            }}>
              {status.message}
            </div>
          )}
          
          <div style={{
            display: 'flex',
            gap: isMobile ? '0.75rem' : '1rem',
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            marginTop: '2rem',
            marginBottom: '1rem',
            padding: isMobile ? '0 1rem' : '0 2rem'
          }}>
            <button 
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: isMobile ? '0.875rem 1.25rem' : '0.875rem 2rem',
                backgroundColor: 'transparent',
                color: '#2563eb',
                border: '2px solid #2563eb',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: isMobile ? '0.95rem' : '1rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isSubmitting ? 0.5 : 1,
                width: '100%',
                justifyContent: 'center',
                letterSpacing: '0.025em',
                ':hover': {
                  backgroundColor: isSubmitting ? 'transparent' : 'rgba(37, 99, 235, 0.08)',
                  transform: isSubmitting ? 'none' : 'translateY(-1px)',
                  borderColor: isSubmitting ? '#2563eb' : '#1d4ed8',
                  boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.15)'
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
                padding: isMobile ? '0.875rem 1.25rem' : '0.875rem 2rem',
                backgroundColor: isSubmitting ? '#94a3b8' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: isMobile ? '0.95rem' : '1rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isSubmitting ? 0.7 : 1,
                width: '100%',
                justifyContent: 'center',
                letterSpacing: '0.025em',
                boxShadow: isSubmitting ? 'none' : '0 4px 14px rgba(37, 99, 235, 0.3)',
                ':hover': {
                  backgroundColor: isSubmitting ? '#94a3b8' : '#1d4ed8',
                  transform: isSubmitting ? 'none' : 'translateY(-1px)',
                  boxShadow: isSubmitting ? 'none' : '0 6px 20px rgba(37, 99, 235, 0.4)'
                }
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Join Our Family'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleSlider;
