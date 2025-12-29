import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes,
  FaBookOpen,
  FaUsers,
  FaRoad,
  FaCross
} from 'react-icons/fa';
import './Header.css';

const SCROLL_THRESHOLD = 50;
const DESKTOP_BREAKPOINT = 992;
const MOBILE_MENU_WIDTH = 80;
const MAX_MOBILE_MENU_WIDTH = 400;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [ministriesDropdownOpen, setMinistriesDropdownOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  // Handle scroll effect with throttling for performance
  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > SCROLL_THRESHOLD);
    };

    const throttledHandleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Close mobile menu and dropdowns when route changes or window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > DESKTOP_BREAKPOINT) {
        closeAllMenus();
      }
    };

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [location]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
  }, []);

  const closeAllMenus = useCallback(() => {
    setAboutDropdownOpen(false);
    setMinistriesDropdownOpen(false);
    closeMobileMenu();
  }, [closeMobileMenu]);

  const toggleMobileMenu = useCallback(() => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    if (newState) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      closeMobileMenu();
    }
  }, [isMobileMenuOpen, closeMobileMenu]);

  const toggleDropdown = useCallback((e, type) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === 'about') {
      setAboutDropdownOpen(prev => !prev);
      setMinistriesDropdownOpen(false);
    } else if (type === 'ministries') {
      setMinistriesDropdownOpen(prev => !prev);
      setAboutDropdownOpen(false);
    }
  }, []);

  const handleDropdownMouseEnter = useCallback((type) => {
    if (!isMobileMenuOpen) {
      if (type === 'about') {
        setAboutDropdownOpen(true);
      } else if (type === 'ministries') {
        setMinistriesDropdownOpen(true);
      }
    }
  }, [isMobileMenuOpen]);

  const handleDropdownMouseLeave = useCallback((type) => {
    if (!isMobileMenuOpen) {
      if (type === 'about') {
        setAboutDropdownOpen(false);
      } else if (type === 'ministries') {
        setMinistriesDropdownOpen(false);
      }
    }
  }, [isMobileMenuOpen]);

  const navLinks = useMemo(() => [
    { path: '/', label: 'Home' },
    { 
      label: 'About Us',
      subItems: [
        { path: '/about', label: 'Our Story', icon: <FaBookOpen className="submenu-icon" aria-hidden="true" /> },
        { path: '/about/beliefs', label: 'Core Values', icon: <FaCross className="submenu-icon" aria-hidden="true" /> },
        { path: '/about/leadership', label: 'Leadership Team', icon: <FaUsers className="submenu-icon" aria-hidden="true" /> },
        { path: '/about/journey', label: 'Our Journey', icon: <FaRoad className="submenu-icon" aria-hidden="true" /> }
      ]
    },
    { 
      label: 'Ministries',
      subItems: [
        { path: '/ministries/kama', label: 'KAMA'},
        { path: '/ministries/mothers-union', label: 'Mothers Union'},
        { path: '/ministries/kayo', label: 'KAYO'},
        { path: '/ministries/boys-brigade', label: 'Boys Brigade'},
        { path: '/ministries/gfs', label: 'Girls Friendly Society'}
      ]
    },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
  ], []);

  return (
    <header 
      ref={headerRef} 
      className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
      role="banner"
    >
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeAllMenus}>
            <img 
              src="/images/cropped-LOGOmsa.png" 
              alt="ACK St. Jude Miritini Parish" 
              className="logo-image" 
            />
            <div className="logo-text">
              <h1>ACK ST. JUDE MIRITINI PARISH</h1>
            </div>
          </Link>

          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`nav-container ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="nav-links">
              {navLinks.map((link, index) => (
                <li 
                  key={link.path || `nav-${index}`}
                  className={`nav-item ${link.subItems ? 'has-dropdown' : ''}`}
                >
                  {link.subItems ? (
                    <div className="dropdown-wrapper">
                      <button 
                        className={`nav-link ${link.subItems.some(item => item.path === location.pathname) ? 'active' : ''}`}
                        onClick={(e) => toggleDropdown(e, link.label === 'About Us' ? 'about' : 'ministries')}
                        onMouseEnter={() => handleDropdownMouseEnter(link.label === 'About Us' ? 'about' : 'ministries')}
                        aria-expanded={link.label === 'About Us' ? aboutDropdownOpen : ministriesDropdownOpen}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <span className="dropdown-arrow" aria-hidden="true">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </button>
                      <ul 
                        className={`dropdown-menu ${link.label === 'About Us' ? (aboutDropdownOpen ? 'open' : '') : (ministriesDropdownOpen ? 'open' : '')}`}
                        onMouseLeave={() => handleDropdownMouseLeave(link.label === 'About Us' ? 'about' : 'ministries')}
                      >
                        {link.subItems.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              className={`dropdown-link ${location.pathname === subItem.path ? 'active' : ''}`}
                              onClick={closeAllMenus}
                            >
                              {subItem.icon}
                              <span>{subItem.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                      onClick={closeAllMenus}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="nav-cta">
                <Link 
                  to="/give" 
                  className="contact-btn"
                  onClick={closeAllMenus}
                >
                  Give Online
                </Link>
                <Link 
                  to="/contact" 
                  className="contact-btn"
                  onClick={closeAllMenus}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;