import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Baptism.css';

const Baptism = () => {
  return (
    <div className="baptism-page">
      <div className="baptism-container">
        <div className="baptism-header">
          <span className="pre-title">Discover Baptism</span>
          <h1>Begin Your Journey of Faith in Christ</h1>
        </div>
        
        <div className="baptism-content">
          <div className="baptism-description">
            <p>
              Baptism in the Anglican Church is the sacred rite of initiation into the Body of Christ. 
              It symbolizes cleansing from sin, new life in Jesus, and entry into God's family. 
              Through water and the Holy Spirit, believers are called to live in faith, hope, and love, 
              guided by Christ.
            </p>
          </div>
          
          <div className="baptism-key-points">
            <div className="key-point">
              <h3>Significance</h3>
              <p>Cleansing from sin and spiritual rebirth.</p>
            </div>
            
            <div className="key-point">
              <h3>Who Can Be Baptized</h3>
              <p>Infants, children, and adults are welcomed.</p>
            </div>
            
            <div className="key-point">
              <h3>Preparation</h3>
              <p>Catechesis and guidance from the church leaders.</p>
            </div>
            
            <div className="key-point">
              <h3>Sacramental Promise</h3>
              <p>Commitment to follow Christ and live in His love.</p>
            </div>
          </div>
          
          <div className="baptism-cta">
            <Link to="/contact?inquiry=baptism" className="cta-button primary">
              Schedule a Baptism
            </Link>
            <Link to="/about/beliefs" className="cta-button secondary">
              Learn More About Our Beliefs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baptism;
