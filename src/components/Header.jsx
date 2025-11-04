import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes,
  FaMapMarkerAlt,
  FaBookOpen,
  FaCross,
  FaUsers,
  FaRoad,
  FaChurch,
  FaMale,
  FaFemale,
  FaUserFriends
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
  }, [location]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Toggle body class and overflow
    if (newState) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = 'auto';
    }
  };
  
  // Close menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
  };

  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const [ministriesDropdownOpen, setMinistriesDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { 
      label: 'About Us',
      subItems: [
        { path: '/about', label: 'Our Story', icon: <FaBookOpen className="submenu-icon" /> },
        { path: '/about/beliefs', label: 'What We Believe', icon: <FaCross className="submenu-icon" /> },
        { path: '/about/leadership', label: 'Leadership Team', icon: <FaUsers className="submenu-icon" /> },
        { path: '/about/journey', label: 'Our Journey', icon: <FaRoad className="submenu-icon" /> }
      ]
    },
    { 
      label: 'Ministries',
      subItems: [
        { path: '/ministries', label: 'All Ministries', icon: <FaChurch className="submenu-icon" /> },
        { path: '/ministries/kama', label: 'KAMA', icon: <FaMale className="submenu-icon" /> },
        { path: '/ministries/mothers-union', label: 'Mothers Union', icon: <FaFemale className="submenu-icon" /> },
        { path: '/ministries/kayo', label: 'KAYO', icon: <FaUsers className="submenu-icon" /> },
        { path: '/ministries/boys-brigade', label: 'Boys Brigade', icon: <FaUsers className="submenu-icon" /> },
        { path: '/ministries/gfs', label: 'Girls Friendly Society', icon: <FaFemale className="submenu-icon" /> }
      ]
    },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  const toggleDropdown = (e, type) => {
    e.preventDefault();
    if (type === 'about') {
      setAboutDropdownOpen(!aboutDropdownOpen);
      setMinistriesDropdownOpen(false);
    } else if (type === 'ministries') {
      setMinistriesDropdownOpen(!ministriesDropdownOpen);
      setAboutDropdownOpen(false);
    }
  };

  const closeAllMenus = () => {
    setAboutDropdownOpen(false);
    setMinistriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
  };

  return (
    <header 
      ref={headerRef} 
      className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
      role="banner"
    >
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-backdrop" 
          onClick={toggleMobileMenu}
          role="button"
          aria-label="Close menu"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleMobileMenu()}
        />
      )}
      
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo" aria-label="Home">
            <div className="logo-content">
              <img 
                src="/cropped-LOGOmsa.png" 
                alt="Church Logo" 
                className="logo-image"
              />
            </div>
          </Link>

          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="main-navigation"
          >
            <span className="menu-icon">
              <FaBars className="menu-open" />
              <FaTimes className="menu-close" />
            </span>
            <span className="sr-only">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>

          <div 
            id="main-navigation"
            className={`nav-container ${isMobileMenuOpen ? 'mobile-visible' : ''}`}
          >
            <div className="nav-content">
              <ul className="nav-links">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.path || `nav-${index}`}
                    className={`nav-item ${link.subItems ? 'has-dropdown' : ''} ${aboutDropdownOpen ? 'dropdown-open' : ''}`}
                  >
                    {link.subItems ? (
                      <>
                        <button 
                          className={`nav-link ${link.subItems.some(item => item.path === location.pathname) ? 'active' : ''}`}
                          onClick={(e) => toggleDropdown(e, link.label === 'About Us' ? 'about' : 'ministries')}
                          onMouseEnter={() => link.label === 'About Us' ? setAboutDropdownOpen(true) : setMinistriesDropdownOpen(true)}
                          aria-expanded={link.label === 'About Us' ? aboutDropdownOpen : ministriesDropdownOpen}
                          aria-haspopup="true"
                        >
                          {link.label}
                          <span 
                            className="dropdown-arrow" 
                            style={{ 
                              fontSize: '1.2em',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '1em',
                              height: '1em',
                              marginLeft: '5px',
                              transform: 'none !important',
                              transition: 'none !important'
                            }}
                          >
                            {link.label === 'About Us' ? '✝' : '✝'}
                          </span>
                        </button>
                        <ul 
                          className="dropdown-menu"
                          onMouseLeave={() => link.label === 'About Us' ? setAboutDropdownOpen(false) : setMinistriesDropdownOpen(false)}
                          style={{ display: link.label === 'About Us' ? (aboutDropdownOpen ? 'block' : 'none') : (ministriesDropdownOpen ? 'block' : 'none') }}
                        >
                          {link.subItems.map((subItem) => (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={`dropdown-link ${location.pathname === subItem.path ? 'active' : ''}`}
                                onClick={closeAllMenus}
                                aria-current={location.pathname === subItem.path ? 'page' : undefined}
                              >
                                <span className="submenu-item">
                                  {subItem.icon}
                                  <span>{subItem.label}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link 
                        to={link.path} 
                        className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        onClick={closeAllMenus}
                        aria-current={location.pathname === link.path ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              
              <div className="cta-buttons">
                <Link to="/give" className="btn btn-outline" onClick={closeMobileMenu}>
                  Give Online
                </Link>
                <Link to="/visit" className="btn btn-primary" onClick={closeMobileMenu}>
                  Plan a Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
