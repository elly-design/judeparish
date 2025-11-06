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

  // Close mobile menu and dropdowns when route changes or window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        // Reset mobile menu state when resizing to desktop
        setIsMobileMenuOpen(false);
        setAboutDropdownOpen(false);
        setMinistriesDropdownOpen(false);
        document.body.classList.remove('menu-open');
        document.body.style.overflow = 'auto';
      }
    };

    // Close menus on route change
    setIsMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setMinistriesDropdownOpen(false);
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';

    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
    e.stopPropagation();
    
    if (type === 'about') {
      const newState = !aboutDropdownOpen;
      setAboutDropdownOpen(newState);
      setMinistriesDropdownOpen(false);
      
      // Scroll to show the dropdown on mobile
      if (window.innerWidth <= 992 && newState) {
        const dropdownButton = e.currentTarget.closest('.nav-item');
        setTimeout(() => {
          dropdownButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          // Ensure the dropdown content is visible
          const dropdownContent = dropdownButton.querySelector('.dropdown-menu');
          if (dropdownContent) {
            dropdownContent.style.display = 'block';
            dropdownContent.style.visibility = 'visible';
            dropdownContent.style.opacity = '1';
          }
        }, 50);
      }
    } else if (type === 'ministries') {
      const newState = !ministriesDropdownOpen;
      setMinistriesDropdownOpen(newState);
      setAboutDropdownOpen(false);
      
      // Scroll to show the dropdown on mobile
      if (window.innerWidth <= 992 && newState) {
        const dropdownButton = e.currentTarget.closest('.nav-item');
        setTimeout(() => {
          dropdownButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          // Ensure the dropdown content is visible
          const dropdownContent = dropdownButton.querySelector('.dropdown-menu');
          if (dropdownContent) {
            dropdownContent.style.display = 'block';
            dropdownContent.style.visibility = 'visible';
            dropdownContent.style.opacity = '1';
          }
        }, 50);
      }
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
      <div 
        className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        role="button"
        aria-label="Close menu"
        tabIndex={isMobileMenuOpen ? 0 : -1}
        onKeyDown={(e) => e.key === 'Enter' && toggleMobileMenu()}
      />
      
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo" aria-label="Home" onClick={closeAllMenus}>
            <img 
              src="/cropped-LOGOmsa.png" 
              alt="Church Logo" 
              className="logo-image"
            />
            <div className="logo-text">
              <h1>ACK St. Jude</h1>
              <p>Miritini Parish</p>
            </div>
          </Link>

          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="main-navigation"
          >
            <div className="hamburger">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <span className="sr-only">Menu</span>
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
                    className={`nav-item ${link.subItems ? 'has-dropdown' : ''}`}
                  >
                    {link.subItems ? (
                      <div className="dropdown-wrapper">
                        <button 
                          className={`nav-link ${link.subItems.some(item => item.path === location.pathname) ? 'active' : ''}`}
                          onClick={(e) => toggleDropdown(e, link.label === 'About Us' ? 'about' : 'ministries')}
                          onMouseEnter={() => !isMobileMenuOpen && (link.label === 'About Us' ? setAboutDropdownOpen(true) : setMinistriesDropdownOpen(true))}
                          aria-expanded={link.label === 'About Us' ? aboutDropdownOpen : ministriesDropdownOpen}
                          aria-haspopup="true"
                        >
                          {link.label}
                          <span className="dropdown-arrow">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </button>
                        <ul 
                          className={`dropdown-menu ${link.label === 'About Us' ? (aboutDropdownOpen ? 'open' : '') : (ministriesDropdownOpen ? 'open' : '')}`}
                          onMouseLeave={() => !isMobileMenuOpen && (link.label === 'About Us' ? setAboutDropdownOpen(false) : setMinistriesDropdownOpen(false))}
                        >
                          {link.subItems.map((subItem) => (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={`dropdown-link ${location.pathname === subItem.path ? 'active' : ''}`}
                                onClick={closeAllMenus}
                                aria-current={location.pathname === subItem.path ? 'page' : undefined}
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
                        aria-current={location.pathname === link.path ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              
              <div className="cta-buttons">
                <Link to="/give" className="btn btn-outline" onClick={closeAllMenus}>
                  Give Online
                </Link>
                <Link to="/visit" className="btn btn-primary" onClick={closeAllMenus}>
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
