import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaYoutube, 
  FaWhatsapp, 
  FaInstagram, 
  FaTwitter,
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaChevronRight,
  FaPrayingHands,
  FaCalendarAlt,
  FaNewspaper,
  FaPhoneVolume,
  FaHome,
  FaInfoCircle,
  FaImages
} from 'react-icons/fa';
import './Footer.css';

// Logo is in the public folder, so we can reference it directly
const churchLogo = '/images/cropped-LOGOmsa.png';
import { Link as ScrollLink } from 'react-scroll';
import Chatbot from './Chatbot/Chatbot';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const isHome = location.pathname === '/';
  
  // Add global styles to remove all decorative lines
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .footer * {
        border-bottom: none !important;
        border-top: none !important;
        box-shadow: none !important;
        background-image: none !important;
      }
      .footer:before, .footer:after,
      .footer *:before, .footer *:after {
        display: none !important;
        content: none !important;
      }
      .footer {
        border: none !important;
      }
      .footer-heading:after, .footer-heading:before,
      .links-category:after, .links-category:before,
      .contact-item:after, .contact-item:before,
      .footer-bottom:after, .footer-bottom:before {
        display: none !important;
        content: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Navigation links
  const mainNav = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'About Us', path: '/about', icon: <FaInfoCircle /> },
    { name: 'Ministries', path: '/ministries', icon: <FaPrayingHands /> },
    { name: 'Services', path: '/services', icon: <FaCalendarAlt /> },
    { name: 'Gallery', path: '/gallery', icon: <FaImages /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope /> },
  ];

  return (
    <>
      <Chatbot />
      <footer className="footer" style={{ 
        overflow: 'visible',
        position: 'relative',
        zIndex: 1000
      }}>
      <div className="footer-content" style={{ 
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <div className="footer-grid" style={{ 
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '2rem 1rem 1rem',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          {/* About Section */}
          <div className="footer-column footer-about">
            <div className="footer-logo" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              maxWidth: '280px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.5rem'
              }}>
                <img 
                  src={churchLogo} 
                  alt="St. Jude's Anglican Church Logo" 
                  className="church-logo"
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
              <div className="logo-text">
                <h2 style={{ 
                  fontSize: '1rem', 
                  margin: '0 0 2px', 
                  fontWeight: 600,
                  textAlign: 'center'
                }}>St. Jude Miritini</h2>
                <span style={{ 
                  fontSize: '0.8rem', 
                  opacity: 0.9,
                  textAlign: 'center',
                  display: 'block'
                }}>Anglican Church</span>
              </div>
            </div>
            <p style={{
              fontSize: '0.85rem',
              lineHeight: '1.6',
              color: 'var(--footer-text)',
              opacity: 0.9,
              margin: '10px auto 0',
              maxWidth: '280px',
              textAlign: 'center',
              padding: '0 10px'
            }}>
             Proclaiming the risen Christ; establishing and strengthening the church on the mission frontier.
            </p>
            
            <div className="footer-social" style={{
              marginTop: '0.25rem',
              paddingTop: '0.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div className="social-links" style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <a 
                  href="https://web.facebook.com/p/ACK-St-Jude-Miritini-Parish-100080488849535/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook" 
                  title="Facebook"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.8rem',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#1877F2';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FaFacebookF />
                </a>
                <a 
                  href="http://www.youtube.com/@miritiniparishackstjude6572" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube" 
                  title="YouTube"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.8rem',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#FF0000';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FaYoutube />
                </a>
                <a 
                  href="https://www.instagram.com/explore/locations/241566813167470/ack-st-jude-parish-miritini/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram" 
                  title="Instagram"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.8rem',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#E4405F';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column footer-links">
            <h3 className="footer-heading" style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              margin: '0 0 0.8rem',
              color: 'var(--footer-heading)',
              paddingBottom: '0.5rem',
              border: 'none !important',
              boxShadow: 'none !important',
              backgroundImage: 'none !important',
              position: 'static',
              overflow: 'visible'
            }}>Quick Links</h3>
            <div className="links-container" style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div className="links-group">
                <h4 className="links-category" style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  margin: '0 0 0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--footer-accent)',
                  paddingBottom: '0.25rem',
                  borderBottom: 'none',
                  textAlign: 'left',
                  width: '100%'
                }}>Quick Links</h4>
                <ul className="footer-nav" style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {mainNav.slice(0, 3).map((item) => (
                    <li key={item.name} className="footer-nav-item" style={{
                      margin: '0.25rem 0'
                    }}>
                      <Link to={item.path} className="footer-link" style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'rgba(255, 255, 255, 0.85)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        lineHeight: '1.4'
                      }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                       onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                        <span style={{
                          fontSize: '0.7rem',
                          marginRight: '0.5rem',
                          opacity: 0.8
                        }}>{item.icon}</span>
                        <span className="link-text">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="links-group">
                <h4 className="links-category" style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  margin: '0 0 0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--footer-accent)',
                  paddingBottom: '0.25rem',
                  borderBottom: 'none',
                  textAlign: 'left',
                  width: '100%'
                }}>More</h4>
                <ul className="footer-nav" style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {mainNav.slice(3).map((item) => (
                    <li key={item.name} className="footer-nav-item" style={{
                      margin: '0.25rem 0'
                    }}>
                      <Link to={item.path} className="footer-link" style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'rgba(255, 255, 255, 0.85)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        lineHeight: '1.4'
                      }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                       onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                        <span style={{
                          fontSize: '0.7rem',
                          marginRight: '0.5rem',
                          opacity: 0.8
                        }}>{item.icon}</span>
                        <span className="link-text">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-column footer-contact" style={{
            padding: '1.5rem',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            margin: '1rem 0 0',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 className="footer-heading" style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: '0 0 1.25rem',
              color: 'var(--footer-heading)',
              paddingBottom: '0.5rem',
              border: 'none !important',
              boxShadow: 'none !important',
              backgroundImage: 'none !important',
              position: 'static',
              overflow: 'visible',
              textAlign: 'left',
              width: '100%'
            }}>
              Contact Information
            </h3>
            <ul className="contact-info" style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 -0.5rem',
              width: 'calc(100% + 1rem)',
              display: 'block',
              overflow: 'visible'
            }}>
              <li className="contact-item" style={{
                display: 'flex',
                alignItems: 'flex-start',
                margin: '0.5rem',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                transition: 'all 0.2s ease',
                width: 'calc(100% - 1rem)'
              }} onMouseOver={(e) => e.currentTarget.background = 'rgba(255, 255, 255, 0.05)'}
                 onMouseOut={(e) => e.currentTarget.background = 'rgba(255, 255, 255, 0.03)'}>
                <span className="contact-icon" style={{
                  color: 'var(--footer-accent)',
                  fontSize: '1rem',
                  marginRight: '0.75rem',
                  marginTop: '0.2rem',
                  flexShrink: 0,
                  minWidth: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  borderRadius: '50%',
                  padding: '0.25rem'
                }}>
                  <FaMapMarkerAlt />
                </span>
                <div className="contact-text">
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    margin: '0 0 0.4rem',
                    color: 'var(--footer-heading)',
                    lineHeight: '1.3'
                  }}>Our Location</h4>
                  <p style={{
                    fontSize: '0.85rem',
                    margin: '0.2rem 0',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.9)',
                    wordBreak: 'break-word'
                  }}>Miritini, Kenya</p>
                  <p style={{
                    fontSize: '0.75rem',
                    margin: '0.2rem 0 0',
                    lineHeight: '1.5',
                    color: 'rgba(255, 255, 255, 0.85)'
                  }}></p>
                </div>
              </li>
              <li className="contact-item" style={{
                display: 'flex',
                alignItems: 'flex-start',
                margin: '0.5rem',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                transition: 'all 0.2s ease',
                width: 'calc(100% - 1rem)'
              }} onMouseOver={(e) => e.currentTarget.background = 'rgba(255, 255, 255, 0.05)'}
                 onMouseOut={(e) => e.currentTarget.background = 'rgba(255, 255, 255, 0.03)'}>
                <span className="contact-icon" style={{
                  color: 'var(--footer-accent)',
                  fontSize: '1rem',
                  marginRight: '0.75rem',
                  marginTop: '0.2rem',
                  flexShrink: 0,
                  minWidth: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  borderRadius: '50%',
                  padding: '0.25rem'
                }}>
                  <FaPhoneAlt />
                </span>
                <div className="contact-text">
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    margin: '0 0 0.4rem',
                    color: 'var(--footer-heading)',
                    lineHeight: '1.3'
                  }}>Call Us</h4>
                  <p style={{
                    margin: '0.2rem 0',
                    lineHeight: '1.5'
                  }}>
                    <a href="tel:+254745002529" style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      transition: 'color 0.2s ease'
                    }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--footer-accent)'}
                       onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}>
                      +254 745002529
                    </a>
                  </p>
                </div>
              </li>
              <li className="contact-item" style={{
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <span className="contact-icon" style={{
                  color: 'var(--footer-accent)',
                  fontSize: '1rem',
                  marginRight: '0.75rem',
                  marginTop: '0.2rem',
                  flexShrink: 0,
                  minWidth: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  borderRadius: '50%',
                  padding: '0.25rem'
                }}>
                  <FaEnvelope />
                </span>
                <div className="contact-text">
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    margin: '0 0 0.4rem',
                    color: 'var(--footer-heading)',
                    lineHeight: '1.3'
                  }}>Email Us</h4>
                  <p style={{
                    margin: '0.2rem 0',
                    lineHeight: '1.5'
                  }}>
                    <a href="mailto:ackstjudemiritinichuch@gmail.com" style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      wordBreak: 'break-word',
                      transition: 'color 0.2s ease'
                    }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--footer-accent)'}
                       onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}>
                      ackstjudemiritinichuch@gmail.com
                    </a>
                    <br />
                    <a href="mailto:revotieno4christ@gmail.com" style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      wordBreak: 'break-word',
                      transition: 'color 0.2s ease'
                    }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--footer-accent)'}
                       onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}>
                      revotieno4christ@gmail.com
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ 
        width: '100%',
        padding: '1.5rem 0',
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
      }}>
        <div className="container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <div className="footer-bottom-content" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <p className="copyright" style={{
              margin: 0,
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 400,
              lineHeight: '1.5'
            }}>
              Copyright &copy; St. Jude Miritini Anglican Church. All Rights Reserved.
              <span style={{ display: 'block', marginTop: '0.25rem' }}>Designed by Eliot Ivy Solutions™</span>
            </p>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
};

export default Footer;
