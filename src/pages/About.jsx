import React, { useState, useEffect } from 'react';
import { FaChurch, FaCross, FaUsers, FaHandsHelping, FaQuoteLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { GiChurch } from 'react-icons/gi';
import { BsCalendarCheck } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PccLeaders from '../components/PccLeaders';
import '../styles/About.css';

const About = () => {
  // Leadership team data
  const leadershipTeam = [
    {
      id: 1,
      name: 'Rev. Canon Richard Otieno',
      role: 'Vicar',
      image: '/images/canonrev.jpg',
    },
    {
      id: 2,
      name: 'Rev. Canon George Kuza',
      role: 'Attached Clergy',
      image: '/images/george kuza.jpg',
    },
    {
      id: 3,
      name: 'Eng. Javan Wanga',
      role: 'Vicar\'s Warden',
      image: '/images/javan.png',
    },
    {
      id: 4,
      name: 'Mr. Felton Mwatore',
      role: 'People\'s  Warden',
      image: '/images/mwatore.png',
    }
  ];

  // PCC Leaders data
  const pccLeaders = [
    {
      id: 1,
      name: 'Henry Mwaura',
      role: 'Human Resource Chairperson',
      image: '/images/mwaura.png',
    },
    {
      id: 2,
      name: 'Mrs. Betty Mwachilwa',
      role: 'Treasurer',
      image: '/images/mwachilwa.png',
    },
    {
      id: 3,
      name: 'Mr. Fredrick Wasonga',
      role: 'Honorary Secretary',
      image: '/images/wasonga.png',
    },
    {
      id: 4,
      name: 'Mr. Moses Obondo',
      role: 'Finance Chairman',
      image: '/images/moses.png',
    },
    {
      id: 5,
      name: 'Eng. Kenneth Njue',
      role: 'Procerument Chairman',
      image: '/images/njue.png',
    },
    {
      id: 6,
      name: 'Margaret Maina',
      role: 'Mothers Union Chairlady',
      image: '/images/maina.png',
    },
    {
      id: 7,
      name: 'Allan Odongo',
      role: 'Youth Chairman',
      image: '/images/allan.png',
    },
    {
      id: 8,
      name: 'Naomi Warui',
      role: 'Health & Environment Chairperson',
      image: '/images/warui.png',
    },
    {
      id: 9,
      name: 'Mr. Silvernus Muchilwa',
      role: 'Property & Investment Chair',
      image: '/images/muchilwa.png',
    },
    {
      id: 10,
      name: 'William Keah',
      role: 'Evangelism Coordinator',
      image: '/images/keah.png',
    },
    {
      id: 11,
      name: 'Benard Righa',
      role: 'K.A.M.A. Chairman',
      image: '/images/benard.png',
    },
    {
      id: 12,
      name: 'Elizabeth Mbogho',
      role: 'Boys Brigade & Girls Brigade Chairman',
      image: '/images/mbogho.png',
    },
    {
      id: 13,
      name: 'Lydia Mwavita',
      role: 'Education Representative',
      image: '/images/lydia.png',
    },
    {
      id: 14,
      name: 'Betty Wasonga',
      role: 'Worship Representative',
      image: '/images/betty.png',
    },
    {
      id: 15,
      name: 'Paul Mbugua',
      role: 'Council Member',
      image: '/images/paul.png',
    }
  ];

  // Core values
  const coreValues = [
    {
      icon: <FaChurch />,
      title: 'Biblical Teaching',
      description: 'We are committed to the faithful teaching of God\'s Word as the foundation for all we do.'
    },
    {
      icon: <FaUsers />,
      title: 'Community',
      description: 'We believe in doing life together, supporting and encouraging one another in faith.'
    },
    {
      icon: <FaHandsHelping />,
      title: 'Service',
      description: 'We are called to serve others with love, following the example of Jesus Christ.'
    },
    {
      icon: <FaCross />,
      title: 'Worship',
      description: 'We exist to glorify God through heartfelt worship in spirit and in truth.'
    }
  ];

  // Church history timeline
  const historyTimeline = [
    {
      year: '1975',
      title: 'Founding of the Church',
      description: 'ACK St. Jude was established with just 15 members meeting in a small rented space.'
    },
    {
      year: '1982',
      title: 'First Permanent Structure',
      description: 'The first church building was constructed through the generous contributions of members.'
    },
    {
      year: '1995',
      title: 'Expansion Project',
      description: 'The sanctuary was expanded to accommodate the growing congregation.'
    },
    {
      year: '2010',
      title: 'Community Center',
      description: 'A multipurpose community center was added to better serve the local community.'
    },
    {
      year: '2020',
      title: 'Digital Ministry',
      description: 'Launched online services and digital outreach programs to connect with more people.'
    }
  ];

  const [activeTab, setActiveTab] = useState('our-story');
  const [showPccLeaders, setShowPccLeaders] = useState(false);
  const [showConstructionMission, setShowConstructionMission] = useState(false);
  const location = useLocation();

  // Church construction mission content
  const constructionMissionContent = [
    "About Our Church Construction Mission",
    "Across the world, God is raising communities that carry His light, His compassion and His truth. Our parish is one of those places planted by grace, growing by faith and now stepping into a defining moment in our kingdom journey. The construction of our new church is not simply a local project; it is a global calling. It is a sacred work that invites believers everywhere to join hands in building a sanctuary that will echo the praise of God for generations.",
    "This house of worship will be a refuge for the broken, a training ground for disciples, a home for children of faith and a beacon of hope for our community and beyond. Every wall raised, every stone laid will testify of God's faithfulness and the unity of His people across nations, cultures and continents.",
    "We believe that the Church of Christ is one body and when one part builds, the whole body stands stronger. That is why we open our hearts to friends, partners and believers around the world. Your prayers, your generosity and your love can cross oceans and borders to shape this holy place. Your giving becomes a legacy an eternal footprint in a mission that will touch lives, transform hearts and uplift families long after we are gone.",
    "When you support this construction, you are not only helping us build a physical structure; you are participating in a divine assignment. You are investing in a sanctuary where worship will rise, where children will learn Christ, where the hungry will find compassion, where the lost will find direction and where communities will be restored.",
    "We invite you to stand with us.",
    "We invite you to give with us.",
    "We invite you to build with us.",
    "Be part of this global mission.",
    "Be part of God's unfolding story.",
    "Be part of a sanctuary that will shine Christ to the world.",
    "Your partnership matters. Your gift has impact. Your faith builds futures."
  ];
  
  // Handle modals
  const closeAllModals = () => {
    setShowPccLeaders(false);
    setShowConstructionMission(false);
    document.body.style.overflow = 'auto';
  };

  const handleClosePccLeaders = () => closeAllModals();
  
  const handleOpenConstructionMission = () => {
    setShowConstructionMission(true);
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseConstructionMission = () => closeAllModals();
  
  // Handle PCC leaders modal open
  const handleOpenPccLeaders = () => {
    setShowPccLeaders(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Sync active tab with URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('beliefs')) {
      setActiveTab('our-beliefs');
    } else if (path.includes('leadership')) {
      setActiveTab('leadership');
    } else if (path.includes('journey')) {
      setActiveTab('our-journey');
    } else {
      setActiveTab('our-story');
    }
  }, [location]);

  // Handle hash-based navigation on component mount
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#our-story') {
        const element = document.getElementById('our-story');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Check for hash on initial load
    if (window.location.hash === '#our-story') {
      // Small timeout to ensure DOM is fully loaded
      setTimeout(handleHashChange, 100);
    }

    // Add hash change event listener
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigate = useNavigate();

  const TabButton = ({ id, label, icon: Icon }) => {
    const handleTabChange = (tabId) => {
      setActiveTab(tabId);
      // Update URL without page reload
      let path = '/about';
      if (tabId === 'our-beliefs') path = '/about/beliefs';
      else if (tabId === 'leadership') path = '/about/leadership';
      else if (tabId === 'our-journey') path = '/about/journey';
      
      window.history.pushState({}, '', path);
    };

    return (
      <Link
        to={handleTabChange(id)}
        className={`tab-button ${activeTab === id ? 'active' : ''}`}
        role="tab"
        aria-selected={activeTab === id}
      >
        {Icon && <Icon className="tab-icon" />}
        {label}
      </Link>
    );
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background" style={{ backgroundImage: 'url("images/about-banner.jpg")' }}>
          <div className="overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title" style={{
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                color: '#fff',
                position: 'relative',
                display: 'block',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                margin: '0 0 1.5rem',
                fontWeight: '700',
                lineHeight: '1.2',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Get to Know Us
              </h1>
              <div className="hero-cta">
                <Link to="/visit" className="btn btn-primary">
                  Plan Your Visit <FaArrowRight className="ms-2" />
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('our-story');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      // Update URL without page reload
                      window.history.pushState({}, '', '#our-story');
                    }
                  }} 
                  className="btn btn-outline-light ms-3"
                >
                  Our Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Construction Mission Modal */}
      {showConstructionMission && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#ffffff',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: '880px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e0f2fe',
            background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)'
          }}>
            <button 
              onClick={handleCloseConstructionMission}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <FaTimes />
            </button>
            
            <div className="construction-mission-content" style={{ color: '#1a365d' }}>
              <h2 style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 2rem 0',
                textAlign: 'center',
                fontSize: '2.2rem',
                lineHeight: '1.3',
                fontWeight: '800',
                fontFamily: '"Poppins", sans-serif',
                paddingBottom: '1rem',
                borderBottom: '2px solid #dbeafe'
              }}>
                {constructionMissionContent[0]}
              </h2>
              
              <div style={{ 
                margin: '1.5rem 0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {constructionMissionContent.slice(1).map((paragraph, index) => {
                  const isHighlighted = index >= constructionMissionContent.length - 4;
                  return (
                    <p key={index} style={{
                      margin: '0 0 1.8rem 0',
                      fontSize: '1.05rem',
                      lineHeight: '1.8',
                      color: isHighlighted ? '#1e40af' : '#1f2937',
                      fontWeight: isHighlighted ? '600' : '400',
                      fontStyle: isHighlighted ? 'italic' : 'normal',
                      textAlign: isHighlighted ? 'center' : 'left',
                      letterSpacing: '0.01em',
                      maxWidth: '800px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      padding: isHighlighted ? '1.4rem' : '0',
                      backgroundColor: isHighlighted ? '#eff6ff' : 'transparent',
                      borderRadius: isHighlighted ? '12px' : '0',
                      borderLeft: isHighlighted ? '4px solid #3b82f6' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isHighlighted ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'
                    }}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <Link 
                  to="/give" 
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#1a4d8f',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={handleCloseConstructionMission}
                >
                  Donate Now <FaArrowRight />
                </Link>
                <button 
                  onClick={handleCloseConstructionMission}
                  className="btn btn-outline"
                  style={{
                    border: '1px solid #1a4d8f',
                    color: '#1a4d8f',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tab Content */}
      <div className="tab-content">
        {/* Our Story Tab */}
        <section 
          className={`tab-pane ${activeTab === 'our-story' ? 'active' : ''}`} 
          id="our-story" 
          role="tabpanel"
          aria-labelledby="our-story-tab"
        >
          <div className="welcome-section section">
        <div className="container">
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
            }}>Our Story</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Welcome to ACK St. Jude</h2>
          </div>
          
          <div className="welcome-content">
            <div className="welcome-text">
              <p>
                ACK St. Jude was founded in 1975 with a vision to be a beacon of hope and transformation in our community. 
                What began as a small gathering of believers has grown into a vibrant faith community impacting lives across 
                our city and beyond.
              </p>
              <p>
                We are a Bible-believing, Christ-centered church affiliated with the Anglican Church of Kenya, 
                Diocese of Mombasa. Our mission is to make disciples of Jesus Christ who love God, love people 
                and serve the world with compassion and excellence.
              </p>
              <div className="mission-vision">
                <div className="mission-box">
                  <GiChurch className="icon" />
                  <h3>Our Mission</h3>
                  <p>To lead people into a growing relationship with Jesus Christ through worship, discipleship, and service.</p>
                </div>
                <div className="vision-box">
                  <FaCross className="icon" />
                  <h3>Our Vision</h3>
                  <p>To be a thriving, multi-generational church that transforms lives and communities with the love of Christ.</p>
                </div>
              </div>
            </div>
            <div className="welcome-image">
              <img src="/images/stjude.jpg" alt="ACK St. Jude Church" />
            </div>
          </div>
        </div>
          </div>
        </section>

        {/* Our Beliefs Tab */}
        <section 
          className={`tab-pane ${activeTab === 'our-beliefs' ? 'active' : ''}`} 
          id="our-beliefs" 
          role="tabpanel"
          aria-labelledby="our-beliefs-tab"
        >
          <div className="values-section section bg-light">
        <div className="container">
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
            }}>What We Believe</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Our Core Values</h2>
            <p className="section-description">
              These values guide everything we do as a church and as followers of Christ.
            </p>
          </div>
          
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
          
          <div className="statement-of-faith">
            <div className="statement-content">
              <FaQuoteLeft className="quote-icon" />
              <h3>Our Statement of Faith</h3>
              <p>
               We believe in the one true God Father, Son and Holy Spirit  who loves, restores and transforms.
Our faith is rooted in Jesus Christ who saves, heals, redeems and will return in glory.
His Word is our truth, His Spirit is our strength and His Kingdom is our calling.

In Christ, we live by faith, walk in power and shine His light to the world.
              </p>
              <button 
                onClick={handleOpenConstructionMission}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.8rem',
                  borderRadius: '8px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3), 0 2px 4px -1px rgba(37, 99, 235, 0.1)',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  letterSpacing: '0.3px',
                  textTransform: 'none',
                  marginTop: '1rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px -1px rgba(37, 99, 235, 0.3), 0 2px 4px -1px rgba(37, 99, 235, 0.1)';
                }}
              >
                Read More About Our Construction Mission <FaArrowRight style={{ transition: 'transform 0.3s ease' }} />
              </button>
            </div>
            <div className="statement-image">
              <img src="/images/stjude.jpg" alt="Bible Study" />
            </div>
          </div>
        </div>
          </div>
        </section>

        {/* Leadership Team Tab */}
        <section 
          className={`tab-pane ${activeTab === 'leadership' ? 'active' : ''}`} 
          id="leadership" 
          role="tabpanel"
          aria-labelledby="leadership-tab"
        >
          <div className="leadership-section section">
        <div className="container">
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
            }}>Meet Our</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Leadership Team</h2>
            <p className="section-description">
              God has blessed us with dedicated leaders who shepherd our congregation with wisdom and love.
            </p>
          </div>
          
          <div className="leadership-grid">
            {leadershipTeam.map(member => (
              <div key={member.id} className="leader-card">
                <div className="leader-image" style={member.id === 2 ? { 
                  position: 'relative', 
                  overflow: 'hidden', 
                  height: '250px',
                  backgroundColor: '#f8f9fa'
                } : {}}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    style={member.id === 2 ? {
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block'
                    } : {}}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder-user.jpg';
                    }}
                  />
                  <div className="leader-overlay">
                    <div className="social-links">
                      <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                      <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                      <a href="#" aria-label="Email"><i className="far fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
                <div className="leader-info">
                  <h3>{member.name}</h3>
                  <span className="role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Parish Staff Section */}
          <div className="parish-staff">
            <h3>Parish Staff</h3>
            <p>
              Our dedicated parish staff work tirelessly to ensure the smooth operation of our church ministries 
              and provide support to our congregation. They are committed to serving with excellence and love.
            </p>
            
            <div className="staff-grid">
              <div className="staff-card">
                <div className="staff-image" style={{ position: 'relative', overflow: 'hidden', height: '350px' }}>
                  <img 
                    src="/images/canonrev.jpg" 
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 30%',
                      display: 'block'
                    }}
                  />
                </div>
                <div className="staff-details">
                  <h4>Rev. Canon Richard Otieno</h4>
                  <span className="staff-role">Parish Vicar</span>
                  <div className="staff-social">
                    <a href="mailto:vicar@ackstjude.org" aria-label="Email"><i className="fas fa-envelope"></i></a>
                    <a href="tel:+254700000000" aria-label="Phone"><i className="fas fa-phone"></i></a>
                  </div>
                </div>
              </div>

              <div className="staff-card">
                <div className="staff-image" style={{ position: 'relative', overflow: 'hidden', height: '350px' }}>
                  <img 
                    src="/images/diana.jpeg" 
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#f8f9fa',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                </div>
                <div className="staff-details">
                  <h4>Ms. Diana Dawa</h4>
                  <span className="staff-role">Office Administrator</span>
                  <div className="staff-social">
                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                    <a href="#" aria-label="Phone"><i className="fas fa-phone"></i></a>
                  </div>
                </div>
              </div>

              <div className="staff-card">
                <div className="staff-image" style={{ position: 'relative', overflow: 'hidden', height: '350px' }}>
                  <img 
                    src="/images/verger.jpeg" 
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#f8f9fa',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                </div>
                <div className="staff-details">
                  <h4>Mr. Ronald Katana</h4>
                  <span className="staff-role">Verger / Driver</span>
                  <div className="staff-social">
                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                    <a href="#" aria-label="Phone"><i className="fas fa-phone"></i></a>
                  </div>
                </div>
              </div>
              
              <div className="staff-card">
                <div className="staff-image">
                  <img 
                    src="/images/lewa.png" 
                    alt=""
                  />
                </div>
                <div className="staff-details">
                  <h4>Mr. Nick Lewa</h4>
                  <span className="staff-role">Assistant Office Administrator / Music Trainer</span>
                  <div className="staff-social">
                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                    <a href="#" aria-label="Phone"><i className="fas fa-phone"></i></a>
                  </div>
                </div>
              </div>

              <div className="staff-card">
                <div className="staff-image">
                  <img 
                    src="/images/staff-placeholder.jpg" 
                    alt="Evangelist"
                  />
                </div>
                <div className="staff-details">
                  <h4>Ev. Rophus Ngala</h4>
                  <span className="staff-role">Evangelist</span>
                  <div className="staff-social">
                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                    <a href="#" aria-label="Phone"><i className="fas fa-phone"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="elders-deacons">
            <h3>Church Council & Elders</h3>
            <p>
              Our church is also served by a dedicated team of elders who provide spiritual 
              leadership, guidance and care for our congregation. They work alongside our pastoral staff 
              to ensure the spiritual health and growth of our church family.
            </p>
            <button 
              onClick={handleOpenPccLeaders}
              className="btn btn-outline"
              aria-expanded={showPccLeaders}
              aria-controls="pcc-leaders-section"
            >
              Meet the Full Team <FaArrowRight />
            </button>
            
            {/* PCC Leaders Modal */}
            {showPccLeaders && (
              <PccLeaders 
                leaders={pccLeaders}
                onClose={handleClosePccLeaders}
              />
            )}
          </div>
        </div>
          </div>
        </section>

        {/* Our Journey Tab */}
        <section 
          className={`tab-pane ${activeTab === 'our-journey' ? 'active' : ''}`} 
          id="our-journey" 
          role="tabpanel"
          aria-labelledby="our-journey-tab"
        >
          <div className="history-section section bg-light">
        <div className="container">
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
            }}>Our Journey</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Church History</h2>
            <p className="section-description">
              A brief look at God's faithfulness through the years at ACK St. Jude.
            </p>
          </div>
          
          <div className="timeline">
            {historyTimeline.map((item, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="story-cta">
            <div className="container">
              <div className="story-content">
                <div className="story-text">
                  <span className="subtitle">Join Our Journey</span>
                  <h2>Become Part of Our Story</h2>
                  <div className="divider"></div>
                  <p className="lead">Join us for worship this Sunday and become part of what God is doing at ACK St. Jude.</p>
                  <p>Experience the warmth of our community, the power of worship and the truth of God's Word in a welcoming environment.</p>
                  <div className="cta-buttons">
                    <Link to="/visit" className="btn btn-primary">
                      <BsCalendarCheck className="me-2" /> Plan Your Visit
                    </Link>
                    <Link to="/ministries" className="btn btn-outline-light ms-3">
                      Explore Ministries <FaArrowRight className="ms-2" />
                    </Link>
                  </div>
                </div>
                <div className="story-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaUsers />
                    </div>
                    <h4>Vibrant Community</h4>
                    <p>Connect with others on the same spiritual journey</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaChurch />
                    </div>
                    <h4>Meaningful Worship</h4>
                    <p>Experience God's presence in our services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
