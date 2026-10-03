import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser, FaPhone, FaCalendarAlt, FaChurch, FaUsers, FaCheck, FaSpinner,
  FaTimes, FaWater, FaChild, FaBookOpen, FaPrayingHands, FaInfoCircle
} from 'react-icons/fa';
import '../styles/Baptism.css';

const KEY_POINTS = [
  {
    icon: FaWater,
    title: 'Significance',
    text: 'Cleansing from sin and spiritual rebirth in Christ.'
  },
  {
    icon: FaChild,
    title: 'Who Can Be Baptized',
    text: 'Infants, children and adults are all welcomed.'
  },
  {
    icon: FaBookOpen,
    title: 'Preparation',
    text: 'Catechesis and guidance from the church leaders.'
  },
  {
    icon: FaPrayingHands,
    title: 'Sacramental Promise',
    text: 'Commitment to follow Christ and live in His love.'
  }
];

const INITIAL_FORM = {
  // Parent/Guardian Information
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  parentAddress: '',

  // Candidate Information
  candidateName: '',
  candidateAge: '',
  candidateBirthDate: '',
  candidateGender: '',

  // Baptism Details
  preferredDate: '',
  preferredTime: '',
  baptismType: 'infant',

  // Additional Information
  godparents: '',
  additionalInfo: '',

  // Church Information
  isMember: false,
  hasAttendedClasses: false,

  // Agreement
  agreement: false
};

const Baptism = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/baptism', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          success: true,
          message: data.message || 'Your baptism application has been submitted successfully! We will contact you to discuss the next steps.'
        });
        setFormData(INITIAL_FORM);
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Failed to submit application. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting baptism form:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to connect to server. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="baptism-page">
      {/* Hero */}
      <section className="bp-hero">
        <img src="/images/baptism.jpeg" alt="" className="bp-hero-img" aria-hidden="true" />
        <div className="bp-hero-overlay" aria-hidden="true" />
        <div className="bp-hero-inner">
          <p className="bp-eyebrow"><span className="bp-eyebrow-line" />Sacrament of Baptism</p>
          <h1 className="bp-title">Begin Your Journey of Faith in Christ</h1>
          <p className="bp-lead">
            Through water and the Holy Spirit, baptism marks entry into God's family
            and a new life in Jesus.
          </p>
          <button className="bp-btn bp-btn-gold" onClick={() => setShowForm(true)}>
            <FaChurch /> Apply for Baptism
          </button>
        </div>
      </section>

      {/* About the sacrament */}
      <section className="bp-section">
        <div className="bp-container">
          <div className="bp-section-head">
            <p className="bp-eyebrow bp-eyebrow-dark"><span className="bp-eyebrow-line" />The Sacrament</p>
            <h2 className="bp-section-title">What is Baptism?</h2>
            <p className="bp-section-lead">
              Baptism in the Anglican Church is the sacred rite of initiation into the Body of Christ.
              It symbolizes cleansing from sin, new life in Jesus, and entry into God's family.
              Through water and the Holy Spirit, believers are called to live in faith, hope and love,
              guided by Christ.
            </p>
          </div>

          <div className="bp-points-grid">
            {KEY_POINTS.map(({ icon: Icon, title, text }) => (
              <div className="bp-point" key={title}>
                <span className="bp-point-icon"><Icon /></span>
                <h3 className="bp-point-title">{title}</h3>
                <p className="bp-point-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply / Form */}
      <section className="bp-section bp-section-alt" id="apply">
        <div className="bp-container">
          {!showForm ? (
            <div className="bp-apply-card">
              <div className="bp-apply-intro">
                <p className="bp-eyebrow bp-eyebrow-dark"><span className="bp-eyebrow-line" />Next Steps</p>
                <h2 className="bp-section-title">Ready to Begin This Sacred Journey?</h2>
                <p className="bp-section-lead">
                  We welcome you to apply for baptism at ACK St. Jude Miritini Parish.
                  Our team will guide you through every step of this meaningful sacrament.
                </p>
              </div>

              <div className="bp-fee-card">
                <div className="bp-fee-amount">
                  <span className="bp-fee-value">KES 500</span>
                  <span className="bp-fee-label">Baptism Fee · Kenya Shillings</span>
                </div>
                <div className="bp-fee-body">
                  <p className="bp-fee-desc">
                    This fee covers the baptism certificate, administration costs
                    and preparation materials.
                  </p>
                  <div className="bp-fee-actions">
                    <Link to="/give" className="bp-btn bp-btn-navy">
                      <FaUser /> Pay Baptism Fee Online
                    </Link>
                    <span className="bp-fee-or">or</span>
                    <span className="bp-fee-office"><FaInfoCircle /> Pay at the Church Office</span>
                  </div>
                </div>
              </div>

              <div className="bp-apply-actions">
                <button className="bp-btn bp-btn-gold bp-btn-lg" onClick={() => setShowForm(true)}>
                  <FaChurch /> Apply for Baptism
                </button>
                <Link to="/about/beliefs" className="bp-btn bp-btn-outline bp-btn-lg">
                  Learn More About Our Beliefs
                </Link>
              </div>
            </div>
          ) : (
            <div className="bp-form-card">
              <div className="bp-form-head">
                <h2>Baptism Application Form</h2>
                <p>Please complete this form to apply for baptism at ACK St. Jude Miritini Parish</p>
                <button
                  type="button"
                  className="bp-form-close"
                  onClick={() => setShowForm(false)}
                  aria-label="Close form"
                >
                  <FaTimes />
                </button>
              </div>

              {submitStatus && (
                <div className={`bp-status ${submitStatus.success ? 'bp-status-success' : 'bp-status-error'}`} role="alert">
                  {submitStatus.success ? <FaCheck /> : <FaTimes />}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bp-form">
                {/* Parent/Guardian Information */}
                <fieldset className="bp-fieldset">
                  <legend className="bp-legend"><FaUser /> Parent/Guardian Information</legend>
                  <div className="bp-grid">
                    <div className="bp-field">
                      <label htmlFor="parentName">Full Name *</label>
                      <input
                        id="parentName"
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="bp-field">
                      <label htmlFor="parentEmail">Email Address *</label>
                      <input
                        id="parentEmail"
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        required
                        placeholder="Email address"
                      />
                    </div>
                    <div className="bp-field">
                      <label htmlFor="parentPhone">Phone Number *</label>
                      <input
                        id="parentPhone"
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        required
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="bp-field bp-field-wide">
                      <label htmlFor="parentAddress">Residential Address</label>
                      <input
                        id="parentAddress"
                        type="text"
                        name="parentAddress"
                        value={formData.parentAddress}
                        onChange={handleInputChange}
                        placeholder="Place of residence"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Candidate Information */}
                <fieldset className="bp-fieldset">
                  <legend className="bp-legend"><FaUsers /> Candidate Information</legend>
                  <div className="bp-grid">
                    <div className="bp-field">
                      <label htmlFor="candidateName">Candidate's Full Name *</label>
                      <input
                        id="candidateName"
                        type="text"
                        name="candidateName"
                        value={formData.candidateName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter candidate's full name"
                      />
                    </div>
                    <div className="bp-field">
                      <label htmlFor="candidateAge">Age *</label>
                      <input
                        id="candidateAge"
                        type="text"
                        name="candidateAge"
                        value={formData.candidateAge}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 6 months, 5 years, 25 years"
                      />
                    </div>
                    <div className="bp-field">
                      <label htmlFor="candidateBirthDate">Date of Birth *</label>
                      <input
                        id="candidateBirthDate"
                        type="date"
                        name="candidateBirthDate"
                        value={formData.candidateBirthDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="bp-field">
                      <label htmlFor="candidateGender">Gender *</label>
                      <select
                        id="candidateGender"
                        name="candidateGender"
                        value={formData.candidateGender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Baptism Details */}
                <fieldset className="bp-fieldset">
                  <legend className="bp-legend"><FaCalendarAlt /> Baptism Details</legend>
                  <div className="bp-grid">
                    <div className="bp-field">
                      <label htmlFor="baptismType">Baptism Type *</label>
                      <select
                        id="baptismType"
                        name="baptismType"
                        value={formData.baptismType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="infant">Infant Baptism (0-2 years)</option>
                        <option value="child">Child Baptism (3-12 years)</option>
                        <option value="adult">Adult Baptism (13+ years)</option>
                      </select>
                    </div>
                    <div className="bp-field">
                      <label htmlFor="preferredDate">Preferred Date *</label>
                      <input
                        id="preferredDate"
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="bp-field">
                      <label htmlFor="preferredTime">Preferred Time *</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Time</option>
                        <option value="06:00 AM">06:00 AM Service</option>
                        <option value="08:00 AM">08:00 AM Service</option>
                        <option value="10:00 AM">10:00 AM Service</option>
                        <option value="11:00 AM">11:00 AM Service</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Additional Information */}
                <fieldset className="bp-fieldset">
                  <legend className="bp-legend"><FaBookOpen /> Additional Information</legend>
                  <div className="bp-grid">
                    <div className="bp-field bp-field-wide">
                      <label htmlFor="godparents">Godparents (Names and Contact)</label>
                      <textarea
                        id="godparents"
                        name="godparents"
                        value={formData.godparents}
                        onChange={handleInputChange}
                        placeholder="List names and contact information for godparents"
                        rows="3"
                      />
                    </div>
                    <div className="bp-field bp-field-wide">
                      <label htmlFor="additionalInfo">Additional Information</label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Any other information you would like to share with us"
                        rows="3"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Church Information */}
                <fieldset className="bp-fieldset">
                  <legend className="bp-legend"><FaChurch /> Church Information</legend>
                  <div className="bp-checks">
                    <label className="bp-check">
                      <input
                        type="checkbox"
                        name="isMember"
                        checked={formData.isMember}
                        onChange={handleInputChange}
                      />
                      <span>I am a member of ACK St. Jude Miritini Parish</span>
                    </label>
                    <label className="bp-check">
                      <input
                        type="checkbox"
                        name="hasAttendedClasses"
                        checked={formData.hasAttendedClasses}
                        onChange={handleInputChange}
                      />
                      <span>I have attended baptism preparation classes</span>
                    </label>
                  </div>
                </fieldset>

                {/* Agreement */}
                <fieldset className="bp-fieldset">
                  <div className="bp-checks">
                    <label className="bp-check">
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleInputChange}
                        required
                      />
                      <span>
                        I understand that baptism is a sacred sacrament and commit to raising the
                        candidate in the Christian faith according to Anglican teachings. I agree to
                        attend all required preparation classes and follow the guidelines of ACK
                        St. Jude Miritini Parish. *
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div className="bp-form-actions">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreement}
                    className="bp-btn bp-btn-gold bp-btn-lg bp-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="bp-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        Submit Baptism Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Baptism;
