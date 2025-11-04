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

// Logo is in the public folder, so we can reference it directly
const churchLogo = '/cropped-LOGOmsa.png';
import { Link as ScrollLink } from 'react-scroll';
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
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-column footer-about" style={{ textAlign: 'center' }}>
              <div className="footer-logo" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
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
                fontSize: '0.75rem',
                lineHeight: '1.5',
                color: 'var(--footer-text)',
                opacity: 0.85,
                margin: '10px 0 0',
                maxWidth: '250px'
              }}>
                A vibrant community of believers dedicated to worship, fellowship 
                and service in the Anglican tradition.
              </p>
              
              <div className="footer-social" style={{
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="social-links" style={{
                  display: 'flex',
                  gap: '0.75rem',
                  justifyContent: 'flex-start',
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
            <div className="footer-column footer-links" style={{
              padding: '0 15px'
            }}>
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
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    margin: '0 0 0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'var(--footer-accent)',
                    paddingBottom: '0.25rem',
                    borderBottom: 'none'
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
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    margin: '0 0 0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'var(--footer-accent)',
                    paddingBottom: '0.25rem',
                    borderBottom: 'none'
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
              padding: '0 15px'
            }}>
              <h3 className="footer-heading" style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                margin: '0 0 1rem',
                color: 'var(--footer-heading)',
                paddingBottom: '0.5rem',
                border: 'none !important',
                boxShadow: 'none !important',
                backgroundImage: 'none !important',
                position: 'static',
                overflow: 'visible'
              }}>Contact Information</h3>
              <ul className="contact-info" style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li className="contact-item" style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  paddingBottom: '0',
                  borderBottom: 'none'
                }}>
                  <span className="contact-icon" style={{
                    color: 'var(--footer-accent)',
                    fontSize: '0.9rem',
                    marginRight: '0.75rem',
                    marginTop: '0.2rem',
                    flexShrink: 0
                  }}>
                    <FaMapMarkerAlt />
                  </span>
                  <div className="contact-text">
                    <h4 style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      margin: '0 0 0.3rem',
                      color: 'var(--footer-heading)'
                    }}>Our Location</h4>
                    <p style={{
                      fontSize: '0.75rem',
                      margin: '0.2rem 0',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.85)'
                    }}>Mombasa,Kenya</p>
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
                  marginBottom: '1rem',
                  paddingBottom: '0',
                  borderBottom: 'none'
                }}>
                  <span className="contact-icon" style={{
                    color: 'var(--footer-accent)',
                    fontSize: '0.9rem',
                    marginRight: '0.75rem',
                    marginTop: '0.2rem',
                    flexShrink: 0
                  }}>
                    <FaPhoneAlt />
                  </span>
                  <div className="contact-text">
                    <h4 style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      margin: '0 0 0.3rem',
                      color: 'var(--footer-heading)'
                    }}>Call Us</h4>
                    <p style={{
                      margin: '0.2rem 0',
                      lineHeight: '1.5'
                    }}>
                      <a href="tel:+254700000000" style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        transition: 'color 0.2s ease'
                      }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--footer-accent)'}
                         onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}>
                        +254 700 000000
                      </a>
                    </p>
                    <p style={{
                      margin: '0.2rem 0 0',
                      lineHeight: '1.5'
                    }}>
                      <a href="tel:+254711000000" style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        transition: 'color 0.2s ease'
                      }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--footer-accent)'}
                         onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}>
                        +254 711 000000
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
                    fontSize: '0.9rem',
                    marginRight: '0.75rem',
                    marginTop: '0.2rem',
                    flexShrink: 0
                  }}>
                    <FaEnvelope />
                  </span>
                  <div className="contact-text">
                    <h4 style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      margin: '0 0 0.3rem',
                      color: 'var(--footer-heading)'
                    }}>Email Us</h4>
                    <p style={{
                      margin: '0.2rem 0',
                      lineHeight: '1.5'
                    }}>
                      <a href="mailto:info@stfaithsanglican.org" style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        wordBreak: 'break-word',
                        transition: 'color 0.2s ease'
                      }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--footer-accent)'}
                         onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}>
                        info@stjudeanglican.org
                      </a>
                    </p>
                    <p style={{
                      margin: '0.2rem 0 0',
                      lineHeight: '1.5'
                    }}>
                      <a href="mailto:contact@stfaithsanglican.org" style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        wordBreak: 'break-word',
                        transition: 'color 0.2s ease'
                      }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--footer-accent)'}
                         onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}>
                        contact@stjudeanglican.org
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{
        padding: '1.5rem 0',
        borderTop: 'none',
        marginTop: '2rem',
        background: 'transparent',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div className="footer-bottom-content" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1rem'
          }}>
            <p className="copyright" style={{
              margin: 0,
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              &copy; {currentYear} St. Jude Miritini Anglican Church. All Rights Reserved.
            </p>
            <div className="footer-credits" style={{
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <p style={{ margin: 0 }}>Designed &amp; Engineered by E.I Tech Innovations</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
