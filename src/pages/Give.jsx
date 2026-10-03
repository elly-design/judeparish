import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaUniversity, FaHammer, FaHeart, FaCheck } from 'react-icons/fa';
import Typewriter from '../components/Typewriter';
import './Give.css';

const TABS = [
  { id: 'mpesa', label: 'M-Pesa', icon: FaMobileAlt },
  { id: 'bank', label: 'Bank Transfer', icon: FaUniversity },
  { id: 'development', label: 'Development Account', icon: FaHammer }
];

const MPESA_DETAILS = [
  { label: 'Paybill Number', value: '522533' },
  { label: 'Account Number', value: '9500066' },
  { label: 'Account Name', value: 'ACK St. Jude Miritini' }
];

const MPESA_STEPS = [
  'Go to M-Pesa on your phone',
  'Select Lipa na M-Pesa',
  'Select Pay Bill',
  'Enter Business No: 522533',
  'Enter Account No: 9500066',
  'Enter the Amount',
  'Enter your M-Pesa PIN and press OK',
  'You will receive a confirmation message'
];

const BANK_DETAILS = [
  { label: 'Bank', value: 'K.C.B' },
  { label: 'Account Name', value: 'ACK St. Jude Miritini' },
  { label: 'Account Number', value: '1272160718' },
  { label: 'Branch', value: 'Changamwe' }
];

const Give = () => {
  const [activeTab, setActiveTab] = useState('mpesa');

  return (
    <div className="give-page">
      {/* Hero */}
      <section className="gv-hero">
        <img src="/images/thanksgiving.jpg" alt="" className="gv-hero-img" aria-hidden="true" />
        <div className="gv-hero-overlay" aria-hidden="true" />
        <div className="gv-hero-inner">
          <p className="gv-eyebrow"><span className="gv-eyebrow-line" />Support Our Mission</p>
          <h1 className="gv-title"><Typewriter text="Give Online" speed={100} /></h1>
          <p className="gv-lead">
            Your generous giving helps us spread the Gospel and serve our community.
          </p>
        </div>
      </section>

      {/* Giving options */}
      <section className="gv-section">
        <div className="gv-container">
          <div className="gv-tabs" role="tablist" aria-label="Giving methods">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                className={`gv-tab ${activeTab === id ? 'gv-tab-active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon /> {label}
              </button>
            ))}
          </div>

          {activeTab === 'mpesa' && (
            <div className="gv-panel" role="tabpanel">
              <div className="gv-panel-body">
                <h2 className="gv-panel-title">Give via M-Pesa</h2>
                <p className="gv-panel-lead">Use the following details to make your donation via M-Pesa:</p>

                <div className="gv-details">
                  {MPESA_DETAILS.map(({ label, value }) => (
                    <div className="gv-detail" key={label}>
                      <span className="gv-detail-label">{label}</span>
                      <span className="gv-detail-value">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="gv-steps">
                  <h3>How to Pay</h3>
                  <ol>
                    {MPESA_STEPS.map((step, i) => {
                      const business = step.replace(/(522533|9500066|Lipa na M-Pesa|Pay Bill)/g, '**$1**');
                      return (
                        <li key={i}>
                          {business.split('**').map((part, j) =>
                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              <div className="gv-panel-media">
                <img src="/images/mpesa.png" alt="M-Pesa payment guide" />
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="gv-panel" role="tabpanel">
              <div className="gv-panel-body gv-panel-body-full">
                <h2 className="gv-panel-title">Bank Transfer</h2>
                <p className="gv-panel-lead">For bank transfers, please use the following details:</p>

                <div className="gv-details">
                  {BANK_DETAILS.map(({ label, value }) => (
                    <div className="gv-detail" key={label}>
                      <span className="gv-detail-label">{label}</span>
                      <span className="gv-detail-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'development' && (
            <div className="gv-panel" role="tabpanel">
              <div className="gv-panel-body">
                <h2 className="gv-panel-title">Development Account</h2>
                <p className="gv-panel-lead">
                  Support our church development projects and infrastructure
                  improvements through the development account.
                </p>
                <div className="gv-note">
                  <p>
                    Your generous contributions to our development fund help us maintain
                    and improve our church facilities and support community development
                    projects.
                  </p>
                </div>
              </div>

              <div className="gv-panel-media">
                <img src="/images/Developmentacc.jpeg" alt="Church development project" />
              </div>
            </div>
          )}

          {/* Closing note */}
          <div className="gv-thanks">
            <span className="gv-thanks-icon"><FaHeart /></span>
            <div>
              <p className="gv-thanks-title">
                Thank you for your generous giving.
              </p>
              <p className="gv-thanks-text">
                Your support helps us continue our mission and ministry. For any
                assistance, contact us at{' '}
                <a href="tel:+254745002529">+254 745 002 529</a>,{' '}
                <a href="mailto:ackstjudemiritinichurch@gmail.com">ackstjudemiritinichurch@gmail.com</a>{' '}
                or{' '}
                <a href="mailto:revotieno4christ@gmail.com">revotieno4christ@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Give;
