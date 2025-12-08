import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUserFriends } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/simple-slider.css';

// Direct paths to images in public directory
const slides = [
  {
    id: 1,
    preTitle: 'Welcome to',
    title: "St. Jude Miritini Anglican Church",
    image: 'images/lay.jpeg',
    buttons: [
      { text: 'Our Story', to: '/about', variant: 'primary' },
      { text: 'Our Beliefs', to: '/what-we-believe', variant: 'outline' }
    ]
  },
  {
    id: 2,
    preTitle: 'Transforming Lives',
    title: 'A Home of Faith, Love and Service',
    image: 'images/choir.jpeg',
    buttons: [
      { text: 'Explore Our Ministries', to: '/ministries', variant: 'primary' },
      { text: 'Connect With Us', to: '/contact', variant: 'outline' }
    ]
  },
  {
    id: 3,
    preTitle: 'Guided by the Holy Spirit',
    title: 'Rooted in Christ',
    image: 'images/sunday.jpeg',
    buttons: [
      { text: "I'm New Here", to: '/new-here', variant: 'primary' },
      { text: 'Discover Baptism', to: '/baptism', variant: 'outline' }
    ]
  }
];

// Custom arrow components
const SampleNextArrow = ({ className, style, onClick }) => {
  return (
    <button
      type="button"
      className={`${className} custom-arrow`}
      style={{ 
        ...style, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        zIndex: 10,
        right: '20px',
        transition: 'all 0.3s ease',
        border: 'none',
        outline: 'none',
        cursor: 'pointer'
      }}
      onClick={onClick}
      aria-label="Next slide"
    >
      <span style={{ color: 'white', fontSize: '24px' }}>→</span>
    </button>
  );
};

const SamplePrevArrow = ({ className, style, onClick }) => {
  return (
    <button
      type="button"
      className={`${className} custom-arrow`}
      style={{ 
        ...style, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        zIndex: 10,
        left: '20px',
        transition: 'all 0.3s ease',
        border: 'none',
        outline: 'none',
        cursor: 'pointer'
      }}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <span style={{ color: 'white', fontSize: '24px' }}>←</span>
    </button>
  );
};

const SimpleSlider = ({ onBeliefsClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [membershipForm, setMembershipForm] = useState({
    firstName: '',
    lastName: '',
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
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: membershipForm.names,
          email: membershipForm.email,
          phone: membershipForm.phone,
          subject: 'Membership Application - ACK St. Jude Miritini',
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

  // Custom slide component to prevent aria-hidden on active slide
  const Slide = ({ children, isActive, ...props }) => (
    <div 
      {...props}
      className={`slide ${isActive ? 'slick-active' : ''}`}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 450, // Balanced transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500, // 3.5 seconds per slide
    pauseOnHover: false, // Disable hover pause for continuous flow
    fade: true,
    cssEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Natural easing
    arrows: true,
    accessibility: true,
    draggable: true,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    touchThreshold: 10, // More responsive touch
    edgeFriction: 0.25, // Smoother edge friction
    waitForAnimate: false, // Don't wait for animation to complete
    pauseOnFocus: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
    // Add accessibility improvements
    adaptiveHeight: false,
    // Remove aria-hidden from slides with focusable elements
    customPaging: i => (
      <button
        aria-label={`Go to slide ${i + 1}`}
        style={{
          width: '12px',
          height: '12px',
          padding: 0,
          margin: '0 5px',
          border: 'none',
          borderRadius: '50%',
          backgroundColor: currentSlide === i ? '#4a6cf7' : '#ccc',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          dots: true,
          arrows: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          dots: true,
          arrows: false,
          speed: 600
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          arrows: false,
          speed: 500,
          touchThreshold: 15
        }
      }
    ]
  };




  // Add screen reader only class for accessibility
  const srOnlyStyle = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0
  };

  if (!isMounted) {
    return <div style={{ height: '100vh', minHeight: '600px' }} />;
  }

  // Calculate dynamic styles based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  const sliderStyle = {
    position: 'relative',
    width: '100%',
    height: isMobile ? '70vh' : '100vh',
    minHeight: isMobile ? '350px' : '500px',
    marginTop: '0',
    paddingTop: '0',
    overflow: 'hidden',
    willChange: 'transform' // Optimize for hardware acceleration
  };

  const slideContentStyle = {
    marginTop: isMobile ? '-3rem' : '0',
    padding: isMobile ? '0 1rem 1rem' : '2rem',
    width: '100%',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    transition: 'opacity 0.5s ease-in-out',
    willChange: 'opacity'
  };

  return (
    <div className="simple-slider" style={sliderStyle}>
      <Slider {...settings}>
        {slides.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            <Slide
              key={slide.id}
              isActive={isActive}
              tabIndex={isActive ? 0 : -1}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
            <div 
              className="slide-bg"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(/${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                height: '100%',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem'
              }}
            >
              <div className="slide-content" style={slideContentStyle}>
                {slide.preTitle && <span className="slide-pre-title">{slide.preTitle}</span>}
                <h2>{slide.title}</h2>
                {slide.description && <p>{slide.description}</p>}
                <div className="slide-buttons">
                  {slide.buttons.map((button, btnIndex) => {
                    if (button.text === 'Our Beliefs') {
                      return (
                        <button
                          key={btnIndex}
                          onClick={onBeliefsClick}
                          className={`btn ${button.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            ...(button.variant === 'primary' ? {
                              backgroundColor: '#4a6cf7',
                              color: 'white',
                              border: '2px solid #4a6cf7'
                            } : {
                              backgroundColor: 'transparent',
                              color: 'white',
                              border: '2px solid white'
                            })
                          }}
                        >
                          {button.text}
                          {button.variant === 'primary' && <FaArrowRight className="btn-icon" />}
                        </button>
                      );
                    }
                    if (button.text === "I'm New Here") {
                      return (
                        <button
                          key={btnIndex}
                          onClick={() => setIsMembershipModalOpen(true)}
                          className={`btn ${button.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            ...(button.variant === 'primary' ? {
                              backgroundColor: '#4a6cf7',
                              color: 'white',
                              border: '2px solid #4a6cf7'
                            } : {
                              backgroundColor: 'transparent',
                              color: 'white',
                              border: '2px solid white'
                            })
                          }}
                        >
                          {button.text}
                          {button.variant === 'primary' && <FaArrowRight className="btn-icon" />}
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={btnIndex}
                        to={button.to}
                        className={`btn ${button.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}
                        style={{
                          ...(button.variant === 'primary' ? {
                            backgroundColor: '#4a6cf7',
                            color: 'white',
                            border: '2px solid #4a6cf7'
                          } : {
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '2px solid white'
                          })
                        }}
                      >
                        {button.text}
                        {button.variant === 'primary' && <FaArrowRight className="btn-icon" />}
                      </Link>
                    );
                  })}
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
          <FaUserFriends style={{ marginRight: '0.5rem', color: '#2563eb' }} />
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
              <option value="regular">Regular Member</option>
              <option value="associate">Associate Member</option>
              <option value="student">Student Member</option>
              <option value="family">Family Membership</option>
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
