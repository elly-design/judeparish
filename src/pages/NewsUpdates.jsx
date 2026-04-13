import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaQuoteLeft, FaUsers, FaChurch, FaHeart, FaBible, FaHandsHelping } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import { GiChurch } from 'react-icons/gi';
import '../styles/NewsUpdates.css';

const NewsUpdates = () => {
  const [activeNews, setActiveNews] = useState(0);

  // News items data
  const newsItems = [
    {
      id: 1,
      date: '12th April 2026',
      title: 'A Blessed Sunday School Sunday',
      category: 'Children Ministry',
      image: '/images/sunday-school.jpg',
      content: 'A blessed Sunday School Sunday was well done by the Children Ministry. We give thanks to God for the Gift of Children and their dedication to love and serve God in their tender age.',
      scripture: 'Proverbs 22:6',
      scriptureText: '"Start children off on the way they should go, and even when they are old they will not turn from it."',
      theme: 'Christ-Centered Families, Renewed Churches and Transformed Neighbourhood',
      icon: <FaUsers className="news-icon" />
    }
  ];

  // Auto-rotate news items
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNews((prev) => (prev + 1) % newsItems.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [newsItems.length]);

  const handleNewsChange = (index) => {
    setActiveNews(index);
  };

  return (
    <div className="news-updates-page">
      {/* Hero Section */}
      <section className="news-hero">
        <div className="hero-background" style={{ backgroundImage: 'url("images/news-banner.jpg")' }}>
          <div className="overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">News & Updates</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main News Section */}
      <section className="news-main section-padding">
        <div className="container">
          <div className="news-showcase">
            <div className="news-carousel">
              {newsItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`news-slide ${index === activeNews ? 'active' : ''}`}
                >
                  <div className="news-content">
                    <div className="news-header">
                      <div className="news-date">
                        <FaCalendarAlt className="date-icon" />
                        <span>{item.date}</span>
                      </div>
                      <div className="news-category">
                        <span className="category-badge">{item.category}</span>
                      </div>
                    </div>
                    
                    <div className="news-body">
                      <h2 className="news-title">{item.title}</h2>
                      <p className="news-description">{item.content}</p>
                      
                      <div className="news-scripture">
                        <FaQuoteLeft className="quote-icon" />
                        <div className="scripture-content">
                          <h4 className="scripture-reference">{item.scripture}</h4>
                          <p className="scripture-text">{item.scriptureText}</p>
                        </div>
                      </div>
                      
                      <div className="news-theme">
                        <GiChurch className="theme-icon" />
                        <div className="theme-content">
                          <h4>Diocesan Theme</h4>
                          <p>{item.theme}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="news-visual">
                    <div className="news-image-container">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="news-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/grace.jpeg';
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* News Navigation */}
            <div className="news-navigation">
              {newsItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`news-nav-btn ${index === activeNews ? 'active' : ''}`}
                  onClick={() => handleNewsChange(index)}
                  aria-label={`View ${item.title}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
            
            {/* News Indicators */}
            <div className="news-indicators">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeNews ? 'active' : ''}`}
                  onClick={() => handleNewsChange(index)}
                  aria-label={`Go to news item ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Highlights */}
      <section className="ministry-highlights section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ministry Highlights</h2>
            <p className="section-description">
              Celebrating the dedication and growth of our various ministries
            </p>
          </div>
          
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">
                <FaUsers className="icon" />
              </div>
              <h3>Children Ministry</h3>
              <p>
                Nurturing young hearts and minds in the love of Christ, teaching them biblical foundations 
                that will guide them throughout their lives.
              </p>
              <div className="highlight-verse">
                <FaBible className="verse-icon" />
                <span>Train up a child in the way he should go</span>
              </div>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">
                <FaChurch className="icon" />
              </div>
              <h3>Family Ministries</h3>
              <p>
                Building Christ-centered families through fellowship, teaching, and mutual support 
                in our shared journey of faith.
              </p>
              <div className="highlight-verse">
                <FaHandsHelping className="verse-icon" />
                <span>Renewed Churches, Transformed Neighbourhood</span>
              </div>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">
                <FaHeart className="icon" />
              </div>
              <h3>Community Outreach</h3>
              <p>
                Extending God's love beyond our walls through service, compassion, and transformation 
                of our local community.
              </p>
              <div className="highlight-verse">
                <GiChurch className="verse-icon" />
                <span>Christ-Centered Families</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsUpdates;
