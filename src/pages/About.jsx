import React, { useState, useEffect } from 'react';
import { FaChurch, FaCross, FaUsers, FaHandsHelping, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { GiChurch } from 'react-icons/gi';
import { BsCalendarCheck } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  // Leadership team data
  const leadershipTeam = [
    {
      id: 1,
      name: 'Rev. Canon Richard Otieno',
      role: 'Vicar',
      image: 'images/richard.jpg',
      bio: 'Rev. Canon Richard has been serving as our Vicar. He is passionate about preaching the Gospel and shepherding the flock.'
    },
    {
      id: 2,
      name: 'Elder Sarah Wanjiku',
      role: 'Church Warden',
      image: 'images/team/elder1.jpg',
      bio: 'Elder Sarah has been a dedicated member of our church for over 20 years, serving in various leadership capacities.'
    },
    {
      id: 3,
      name: 'Deacon Peter Kamau',
      role: 'Youth Leader',
      image: 'images/team/youth-leader.jpg',
      bio: 'Deacon Peter leads our vibrant youth ministry, helping young people grow in their faith and relationship with Christ.'
    },
    {
      id: 4,
      name: 'Mrs. Grace Achieng',
      role: 'Women\'s Ministry',
      image: 'images/team/women-leader.jpg',
      bio: 'Mrs. Grace coordinates the women\'s fellowship and various outreach programs to support women in our community.'
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
  const location = useLocation();

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
    const getPath = (tabId) => {
      switch(tabId) {
        case 'our-beliefs': return '/about/beliefs';
        case 'leadership': return '/about/leadership';
        case 'our-journey': return '/about/journey';
        default: return '/about';
      }
    };

    return (
      <Link
        to={getPath(id)}
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
              <img src="images/church-building.jpg" alt="ACK St. Jude Church" />
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
              <Link to="/beliefs" className="btn btn-outline">
                Read More <FaArrowRight />
              </Link>
            </div>
            <div className="statement-image">
              <img src="images/bible-study.jpg" alt="Bible Study" />
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
                <div className="leader-image">
                  <img src={member.image} alt={member.name} />
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
          
          <div className="elders-deacons">
            <h3>Church Council & Elders</h3>
            <p>
              Our church is also served by a dedicated team of elders and deacons who provide spiritual 
              leadership, guidance, and care for our congregation. They work alongside our pastoral staff 
              to ensure the spiritual health and growth of our church family.
            </p>
            <Link to="/leadership" className="btn btn-outline">
              Meet the Full Team <FaArrowRight />
            </Link>
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
