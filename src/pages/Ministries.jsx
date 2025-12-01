import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaHandsHelping, 
  FaPrayingHands, 
  FaCalendarAlt,
  FaFemale, 
  FaMale, 
  FaArrowRight,
  FaSearch,
  FaChurch,
  FaUserFriends,
  FaHands,
  FaCross,
  FaBookOpen,
  FaMusic,
  FaPray
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Ministries.css';
import '../styles/MinistryPage.css';

const Ministries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [error, setError] = useState(null);
  
  // Categories for tabs
  const categories = [
  ];
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Main ministries data
  const mainMinistries = [
    {
      id: 'kama',
      title: 'KAMA',
      fullName: 'Kenya Anglican Men\'s Association',
      tagline: 'Strengthening Men in Faith & Leadership',
      description: 'A vibrant fellowship of men dedicated to spiritual growth, leadership development and community transformation through Christ-centered initiatives and brotherhood.',
      cardClass: 'kama-card',
      icon: <FaMale className="ministry-icon" />,
      category: 'men',
      contact: 'ackstjudemiritinichuch@gmail.com',
      image: 'images/ministries/kama.jpg',
      color: '#1a4d8f',
      features: [
        { icon: <FaBookOpen />, text: 'Bible Study' },
        { icon: <FaHands />, text: 'Mentorship' },
        { icon: <FaUserFriends />, text: 'Fellowship' }
      ],
      details: {
        mission: 'To nurture men in their Christian faith and develop them into responsible leaders in church and society.',
        activities: [
          'Monthly Bible study and prayer meetings',
          'Community service projects',
          'Mentorship programs',
          'Annual men\'s conference and retreats',
          'Leadership development workshops',
          'Family support initiatives'
        ],
        requirements: 'Open to all men 18 years and above',
        leaders: 'Bernard Righa (Chairman), Nicholas Mbogho (Secretary)'
      }
    },
    {
      id: 'mothers-union',
      title: 'Mother\'s Union',
      fullName: 'Mothers\' Union',
      tagline: 'Strengthening Family Life',
      description: 'A global Christian movement that has been supporting and promoting married life for decades through prayer, programs and practical support.',
      icon: <FaFemale className="ministry-icon" />,
      category: 'women',
      contact: 'ackstjudemiritinichuch@gmail.com',
      image: 'images/ministries/mothers-union.jpg',
      color: '#8e44ad',
      features: [
        { icon: <FaPray />, text: 'Prayer' },
        { icon: <FaHandsHelping />, text: 'Support' },
        { icon: <FaUsers />, text: 'Community' }
      ],
      details: {
        mission: 'To demonstrate the Christian faith in action by the transformation of communities worldwide through the nurture of family life in all its forms.',
        activities: [
          'Weekly prayer and Bible study meetings',
          'Marriage enrichment and parenting programs',
          'Counselling and family support services',
          'Community outreach and charity work',
          'Skills development training',
          'Annual women\'s conference and retreats'
        ],
        requirements: 'Open to all women committed to Christian family values',
        leaders: 'Mrs. Jane Wanjiku (Chairlady), Mrs. Mary Wambui (Secretary)'
      }
    },
    {
      id: 'kayo',
      title: 'KAYO',
      fullName: 'Kenya Anglican Youth Organization',
      tagline: 'Empowering the Next Generation',
      description: 'A dynamic movement of young Christians committed to spiritual growth, leadership development and community transformation through innovative programs and activities.',
      icon: <FaUsers className="ministry-icon" />,
      category: 'youth',
      contact: 'ackstjudemiritinichuch@gmail.com',
      image: 'images/ministries/youth.jpg',
      color: '#e74c3c',
      features: [
        { icon: <FaMusic />, text: 'Worship' },
        { icon: <FaHandsHelping />, text: 'Service' },
        { icon: <FaUsers />, text: 'Fellowship' }
      ],
      details: {
        'KAYO Promise': 'I promise to serve Jesus Christ all the days of my life, pray and read the Bible daily, encourage other young people to join KAYO, and abide by its rules.',
        activities: [
          'Weekly fellowship and Bible study sessions',
          'Talent development and mentorship programs',
          'Community service and outreach projects',
          'Worship and creative arts ministry',
          'Sports and recreational activities',
          'Annual youth conferences and camps'
        ],
        requirements: 'Ages 18-35 years',
        leaders: 'Allan Odongo - Chairperson, Marion Wambui (Secretary)'
      }
    },
    {
      id: 'boys-brigade',
      title: 'Boys\' Brigade',
      fullName: 'The Boys\' Brigade',
      tagline: 'Sure & Steadfast',
      description: 'The world\'s first uniformed youth organization, providing a balanced program of activities for boys to develop physically, mentally and spiritually in a Christian environment.',
      icon: <FaMale className="ministry-icon" />,
      category: 'children',
      contact: 'ackstjudemiritinichuch@gmail.com',
      image: 'images/ministries/boys-brigade.jpg',
      color: '#27ae60',
      features: [
        { icon: <FaCross />, text: 'Discipleship' },
        { icon: <FaHandsHelping />, text: 'Service' },
        { icon: <FaUsers />, text: 'Teamwork' }
      ],
      details: {
        mission: 'To develop boys into responsible Christian men through a balanced program of activities that support their physical, educational, spiritual and social needs.',
        activities: [
          'Drill and marching practice',
          'Camping and outdoor adventure activities',
          'Skills development workshops',
          'Bible study and character development',
          'Sports and physical training',
          'Community service projects',
          'Annual competitions and awards'
        ],
        requirements: 'Boys aged 6-18 years',
        leaders: 'Elizabeth Mbogho - Chairperson, Pauline Chadwick - Secretary'
      }
    },
    {
      id: 'gfs',
      title: 'GFS',
      fullName: 'Girls\' Friendly Society',
      tagline: 'Friendship, Faith & Fun',
      description: 'A global movement within the Anglican Church providing a safe space for girls to grow in faith, develop life skills and build lasting friendships in a Christian environment.',
      icon: <FaFemale className="ministry-icon" />,
      category: 'children',
      contact: 'ackstjudemiritinichuch@gmail.com',
      image: 'images/ministries/gfs.jpg',
      color: '#e91e63',
      features: [
        { icon: <FaPray />, text: 'Prayer' },
        { icon: <FaBookOpen />, text: 'Learning' },
        { icon: <FaUsers />, text: 'Friendship' }
      ],
      details: {
        mission: 'To help girls and young women develop spiritually, mentally and physically through a balanced program of activities that promote Christian values, leadership, and service to others.',
        activities: [
          'Bible study and prayer meetings',
          'Life skills and leadership training',
          'Arts, crafts, and creative workshops',
          'Community service and outreach projects',
          'Camping and outdoor activities',
          'Annual rallies and conferences'
        ],
        requirements: 'Girls aged 5-25 years',
        leaders: 'Elizabeth Mbogho - Chairperson, Pauline Chadwick - Secretary'
      }
    }
  ];

  // Filter ministries based on search term and active tab
  const filteredMinistries = mainMinistries.filter(ministry => {
    const matchesSearch = 
      ministry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ministry.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ministry.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      (ministry.category && ministry.category === activeTab);
    
    return matchesSearch && matchesTab;
  });

  // Categories are now defined at the top of the component

  return (
    <div className="ministries-page">
      {/* Hero Section */}
      <section className="ministries-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Our Ministries</h1>
            <p className="hero-subtitle">Discover Your Place in God's Family</p>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search ministries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ministry-search"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="category-tabs">
        <div className="container">
          <div className="tabs-container">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`tab-btn ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-text">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ministries Grid */}
      <section className="ministries-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2 }}
          >
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
            }}>Our Ministries</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Find your place to serve and grow in faith</h2>
          </motion.div>

          {filteredMinistries.length === 0 ? (
            <div className="no-results">
              <h3>No ministries found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm('');
                  setActiveTab('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div 
              className="ministries-grid"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredMinistries.map((ministry) => (
                <motion.div 
                  key={ministry.id}
                  className={`ministry-card ${ministry.id === 'kama' ? 'kama-card' : ''} ${ministry.id === 'mothers-union' ? 'mothers-union-card' : ''} ${ministry.id === 'kayo' ? 'kayo-card' : ''} ${ministry.id === 'gfs' ? 'gfs-card' : ''} ${ministry.id === 'boys-brigade' ? 'boys-brigade-card' : ''}`}
                  variants={item}
                  whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                >
                  <div 
                    className="card-header"
                    style={{ backgroundColor: ministry.color }}
                  >
                    {['kama', 'mothers-union', 'kayo', 'boys-brigade', 'gfs'].includes(ministry.id) ? (
                      <div className="ministry-logo-container" style={{ 
                        background: 'none', 
                        boxShadow: 'none',
                        width: '100%',
                        padding: '15px 0 10px'
                      }}>
                        <img 
                          src={
                            ministry.id === 'kama' ? "images/KAMA_LOGO.bmp" :
                            ministry.id === 'mothers-union' ? "images/union.jpeg" :
                            ministry.id === 'kayo' ? "images/KAYOLOGO.png" :
                            ministry.id === 'boys-brigade' ? "images/boysbrigade.jpg" :
                            "images/Girls-Friendly-SocietyLogo.webp"
                          } 
                          alt={`${ministry.fullName}`} 
                          style={{
                            height: '80px',
                            width: 'auto',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            backgroundColor: ministry.id === 'gfs' ? 'white' : 'transparent',
                            padding: ministry.id === 'gfs' ? '5px' : '0',
                            borderRadius: '4px',
                            margin: '0 auto',
                            display: 'block'
                          }}
                        />
                        <h3 className="ministry-title" style={{ 
                          margin: '10px 0 0',
                          textAlign: 'center',
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: 'rgba(255, 255, 255, 0.95)'
                        }}>
                          <span className="ministry-fullname" style={{ 
                            display: 'block', 
                            fontSize: '0.75rem',
                            letterSpacing: '0.3px',
                            textTransform: 'uppercase',
                            opacity: 0.9,
                            marginTop: '4px',
                            fontWeight: 400
                          }}>
                            {ministry.fullName}
                          </span>
                        </h3>
                      </div>
                    ) : (
                      <div className="ministry-icon-container">
                        {/* Icon removed as requested */}
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h4 className="ministry-tagline">{ministry.tagline}</h4>
                    <div className="ministry-description">{ministry.description}</div>
                    
                    {/* Features section removed as requested */}
                    {/* Meeting Time section removed as requested */}
                    
                    <div className="card-actions">
                      <Link 
                        to={`/ministries/${ministry.id === 'kama' ? 'kama' : ministry.id}`} 
                        className="btn btn-primary"
                        style={{ 
                          backgroundColor: ministry.id === 'boys-brigade' ? '#FF6B35' : ministry.color,
                          color: ministry.id === 'boys-brigade' ? '#FFFFFF' : 'inherit',
                          textShadow: ministry.id === 'boys-brigade' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                          border: ministry.id === 'boys-brigade' ? 'none' : 'inherit'
                        }}
                      >
                        Learn More <FaArrowRight style={{ marginLeft: '5px' }} />
                      </Link>
                      <Link 
                        to={`/contact?ministry=${encodeURIComponent(ministry.title)}`}
                        className="btn btn-outline contact-button"
                        style={{ 
                          color: 'white', 
                          backgroundColor: ministry.id === 'boys-brigade' ? '#FF6B35' : ministry.color,
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="why-join">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2 }}
          >
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
            }}>Why Join a Ministry?</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Grow in faith and make a difference</h2>
          </motion.div>
          
          <motion.div 
            className="reasons-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div 
              className="reason-card"
              whileHover={{ y: -10 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="reason-icon" style={{ backgroundColor: 'rgba(26, 77, 143, 0.1)' }}>
                <FaUsers style={{ color: '#1a4d8f' }} />
              </div>
              <h3>Community</h3>
              <p>Connect with like-minded believers, build meaningful relationships and experience the love of Christ through fellowship.</p>
            </motion.div>
            
            <motion.div 
              className="reason-card"
              whileHover={{ y: -10 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="reason-icon" style={{ backgroundColor: 'rgba(233, 30, 99, 0.1)' }}>
                <FaHandsHelping style={{ color: '#e91e63' }} />
              </div>
              <h3>Serving</h3>
              <p>Discover and use your God-given gifts and talents to serve others and make a lasting impact in your community.</p>
            </motion.div>
            
            <motion.div 
              className="reason-card"
              whileHover={{ y: -10 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="reason-icon" style={{ backgroundColor: 'rgba(39, 174, 96, 0.1)' }}>
                <FaPray style={{ color: '#27ae60' }} />
              </div>
              <h3>Spiritual Growth</h3>
              <p>Deepen your relationship with God through Bible study, prayer, worship and discipleship in a supportive environment.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="get-involved">
        <div className="container">
        </div>
      </section>
    </div>
  );
};

export default Ministries;
