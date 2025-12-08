import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMobileAlt, FaMoneyBillWave, FaHammer } from 'react-icons/fa';
import Typewriter from '../components/Typewriter';
import './Give.css';

const Give = () => {
  const [activeTab, setActiveTab] = useState('mpesa'); // 'mpesa', 'bank' and 'development' tabs

  return (
    <div className="give-page">
      <div className="give-container">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
        
        <div className="give-header">
          <h1><Typewriter text="Give Online" speed={100} /></h1>
          <p>Your generous giving helps us spread the Gospel and serve our community.</p>
        </div>

        <div className="give-tabs">
          <button 
            className={`tab-button ${activeTab === 'mpesa' ? 'active' : ''}`}
            onClick={() => setActiveTab('mpesa')}
          >
            <FaMobileAlt className="tab-icon" /> M-Pesa
          </button>
          <button 
            className={`tab-button ${activeTab === 'bank' ? 'active' : ''}`}
            onClick={() => setActiveTab('bank')}
          >
            <FaMoneyBillWave className="tab-icon" /> Bank Transfer
          </button>
          <button 
            className={`tab-button ${activeTab === 'development' ? 'active' : ''}`}
            onClick={() => setActiveTab('development')}
          >
            <FaHammer className="tab-icon" /> Development Account
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'mpesa' && (
            <div className="mpesa-payment">
              <div className="mpesa-instructions">
                <h2>Give via M-Pesa</h2>
                <p>Use the following details to make your donation via M-Pesa:</p>
                
                <div className="mpesa-details">
                  <div className="detail-item">
                    <span className="detail-label">Paybill Number:</span>
                    <span className="detail-value">522533</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Account Number:</span>
                    <span className="detail-value">9500066</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Account Name:</span>
                    <span className="detail-value">ACK St. Jude Miritini</span>
                  </div>
                </div>

                <div className="mpesa-steps">
                  <h3>How to Pay:</h3>
                  <ol>
                    <li>Go to M-Pesa on your phone</li>
                    <li>Select <strong>Lipa na M-Pesa</strong></li>
                    <li>Select <strong>Pay Bill</strong></li>
                    <li>Enter Business No: <strong>522533</strong></li>
                    <li>Enter Account No: <strong>9500066</strong></li>
                    <li>Enter the Amount</li>
                    <li>Enter your M-Pesa PIN and press OK</li>
                    <li>You will receive a confirmation message</li>
                  </ol>
                </div>
              </div>
              
              <div className="mpesa-image-container">
                <img 
                  src="images/mpesa.png" 
                  alt="M-Pesa Payment" 
                  className="mpesa-image"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/400x600?text=M-Pesa+Payment';
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="bank-transfer">
              <h2>Bank Transfer</h2>
              <p>For bank transfers, please use the following details:</p>
              <div className="bank-details">
                <div className="detail-item">
                  <span className="detail-label">Bank:</span>
                  <span className="detail-value">K.C.B</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account Name:</span>
                  <span className="detail-value">ACK St. Jude Miritini</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account Number:</span>
                  <span className="detail-value">1272160718</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Branch:</span>
                  <span className="detail-value">Changamwe</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'development' && (
            <div className="development-account">
              <h2>Development Account</h2>
              <p>Support our church development projects and infrastructure improvements through the development account.</p>
              
              <div className="development-content">
                <div className="development-details">
                  <div className="development-note">
                    <p>Your generous contributions to our development fund help us maintain and improve our church facilities and support community development projects.</p>
                  </div>
                </div>
                
                <div className="development-image-container">
                  <img 
                    src="/images/Developmentacc.jpeg" 
                    alt="Church Development Project"
                    className="development-image"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/600x400?text=Development+Account';
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="giving-note">
          <p>Thank you for your generous giving. Your support helps us continue our mission and ministry.</p>
          <p>For any assistance, please contact us at <a href="tel:+254745002529">+254 745 002 529</a>, <a href="mailto:ackstjudemiritinichuch@gmail.com">ackstjudemiritinichuch@gmail.com</a> or <a href="mailto:revotieno4christ@gmail.com">revotieno4christ@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Give;
