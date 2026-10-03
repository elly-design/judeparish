import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaPrayingHands,
  FaCalendarAlt,
  FaImages
} from 'react-icons/fa';
import './Footer.css';

const churchLogo = '/images/cropped-LOGOmsa.png';

const SOCIALS = [
  {
    name: 'Facebook',
    icon: FaFacebookF,
    href: 'https://web.facebook.com/p/ACK-St-Jude-Miritini-Parish-100080488849535/'
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    href: 'http://www.youtube.com/@miritiniparishackstjude6572'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: 'https://www.instagram.com/explore/locations/241566813167470/ack-st-jude-parish-miritini/'
  }
];

const NAV_LINKS = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'About Us', path: '/about', icon: FaInfoCircle },
  { name: 'Ministries', path: '/ministries', icon: FaPrayingHands },
  { name: 'Services', path: '/services', icon: FaCalendarAlt },
  { name: 'Gallery', path: '/gallery', icon: FaImages },
  { name: 'Contact', path: '/contact', icon: FaEnvelope }
];

const CONTACT_ITEMS = [
  {
    icon: FaMapMarkerAlt,
    title: 'Our Location',
    lines: ['Miritini, Kenya']
  },
  {
    icon: FaPhoneAlt,
    title: 'Call Us',
    lines: [{ label: '+254 745002529', href: 'tel:+254745002529' }]
  },
  {
    icon: FaEnvelope,
    title: 'Email Us',
    lines: [
      { label: 'ackstjudemiritinichurch@gmail.com', href: 'mailto:ackstjudemiritinichurch@gmail.com' },
      { label: 'revotieno4christ@gmail.com', href: 'mailto:revotieno4christ@gmail.com' }
    ]
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="footer">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-col footer-about">
            <div className="footer-brand">
              <img src={churchLogo} alt="St. Jude Miritini Anglican Church Logo" className="footer-logo" />
              <div className="footer-brand-text">
                <h2>St. Jude Miritini</h2>
                <span>Anglican Church</span>
              </div>
            </div>
            <p className="footer-tagline">
              Proclaiming the risen Christ; establishing and strengthening the
              church on the mission frontier.
            </p>
            <div className="footer-socials">
              {SOCIALS.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="footer-social"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav className="footer-col footer-nav-col" aria-label="Footer">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-nav">
              {NAV_LINKS.map(({ name, path, icon: Icon }) => (
                <li key={name}>
                  <Link to={path} className="footer-link">
                    <Icon className="footer-link-icon" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer-col footer-contact-col">
            <h3 className="footer-heading">Contact Information</h3>
            <ul className="footer-contact">
              {CONTACT_ITEMS.map(({ icon: Icon, title, lines }) => (
                <li key={title} className="footer-contact-item">
                  <span className="footer-contact-icon">
                    <Icon />
                  </span>
                  <div>
                    <h4>{title}</h4>
                    {lines.map((line, i) =>
                      typeof line === 'string' ? (
                        <p key={i}>{line}</p>
                      ) : (
                        <p key={i}>
                          <a href={line.href}>{line.label}</a>
                        </p>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            Copyright &copy; {currentYear} St. Jude Miritini Anglican Church. All Rights Reserved.
          </p>
          <p className="footer-credit">Developed by Owiti TechAfrica Solutions</p>
        </div>
      </footer>
  );
};

export default Footer;
