import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaChurch, FaUsers, FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';
import '../styles/Baptism.css';

const Baptism = () => {
  const [formData, setFormData] = useState({
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
    baptismType: 'infant', // infant, child, adult
    
    // Additional Information
    godparents: '',
    additionalInfo: '',
    
    // Church Information
    isMember: false,
    hasAttendedClasses: false,
    
    // Agreement
    agreement: false
  });
  
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
      const response = await fetch('http://localhost:5001/api/baptism', {
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
          message: data.message || 'Your baptism application has been submitted successfully! We will contact to discuss the next steps.' 
        });
        // Reset form
        setFormData({
          parentName: '',
          parentEmail: '',
          parentPhone: '',
          parentAddress: '',
          candidateName: '',
          candidateAge: '',
          candidateBirthDate: '',
          candidateGender: '',
          preferredDate: '',
          preferredTime: '',
          baptismType: 'infant',
          godparents: '',
          additionalInfo: '',
          isMember: false,
          hasAttendedClasses: false,
          agreement: false
        });
        // Hide form after successful submission
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
      <div className="baptism-container">
        <div className="baptism-header">
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
            {!showForm ? (
              <div className="cta-intro">
                <h3>Ready to Begin This Sacred Journey?</h3>
                <p>We welcome you to apply for baptism at ACK St. Jude Miritini Parish. Our team will guide you through every step of this meaningful sacrament.</p>
                <div className="cta-buttons">
                  <button 
                    onClick={() => setShowForm(true)}
                    className="cta-button primary"
                  >
                    <FaChurch style={{ marginRight: '0.5rem' }} />
                    Apply for Baptism
                  </button>
                  <Link to="/about/beliefs" className="cta-button secondary">
                    Learn More About Our Beliefs
                  </Link>
                </div>
              </div>
            ) : (
              <div className="baptism-form-container">
                <div className="form-header">
                  <h3>Baptism Application Form</h3>
                  <p style={{ fontSize: '1.2rem', fontWeight: '500', marginTop: '0.5rem', color: '#ffd700' }}>Please complete this form to apply for baptism at ACK St. Jude Miritini Parish</p>
                  <button 
                    className="close-form-btn"
                    onClick={() => setShowForm(false)}
                  >
                    <FaTimes />
                  </button>
                </div>

                {submitStatus && (
                  <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
                    {submitStatus.success ? <FaCheck /> : <FaTimes />}
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="baptism-form">
                  {/* Parent/Guardian Information Section */}
                  <div className="form-section">
                    <h4><FaUser /> Parent/Guardian Information</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="parentEmail"
                          value={formData.parentEmail}
                          onChange={handleInputChange}
                          required
                          placeholder="Email address"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          name="parentPhone"
                          value={formData.parentPhone}
                          onChange={handleInputChange}
                          required
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Residential Address</label>
                        <input
                          type="text"
                          name="parentAddress"
                          value={formData.parentAddress}
                          onChange={handleInputChange}
                          placeholder="Place of residence"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Candidate Information Section */}
                  <div className="form-section">
                    <h4><FaUsers /> Candidate Information</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Candidate's Full Name *</label>
                        <input
                          type="text"
                          name="candidateName"
                          value={formData.candidateName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter candidate's full name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Age *</label>
                        <input
                          type="text"
                          name="candidateAge"
                          value={formData.candidateAge}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., 6 months, 5 years, 25 years"
                        />
                      </div>
                      <div className="form-group">
                        <label>Date of Birth *</label>
                        <input
                          type="date"
                          name="candidateBirthDate"
                          value={formData.candidateBirthDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender *</label>
                        <select
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
                  </div>

                  {/* Baptism Details Section */}
                  <div className="form-section">
                    <h4><FaCalendarAlt /> Baptism Details</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Baptism Type *</label>
                        <select
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
                      <div className="form-group">
                        <label>Preferred Date *</label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Preferred Time *</label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Time</option>
                          <option value="8:00 AM">8:00 AM Service</option>
                          <option value="10:00 AM">10:00 AM Service</option>
                          <option value="12:00 PM">12:00 PM Service</option>
                          <option value="2:00 PM">2:00 PM Service</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information Section */}
                  <div className="form-section">
                    <h4>Additional Information</h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Godparents (Names and Contact)</label>
                        <textarea
                          name="godparents"
                          value={formData.godparents}
                          onChange={handleInputChange}
                          placeholder="List names and contact information for godparents"
                          rows="3"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Additional Information</label>
                        <textarea
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          placeholder="Any other information you would like to share with us"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Church Information Section */}
                  <div className="form-section">
                    <h4>Church Information</h4>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="isMember"
                          checked={formData.isMember}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        I am a member of ACK St. Jude Miritini Parish
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="hasAttendedClasses"
                          checked={formData.hasAttendedClasses}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        I have attended baptism preparation classes
                      </label>
                    </div>
                  </div>

                  {/* Agreement Section */}
                  <div className="form-section">
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="agreement"
                          checked={formData.agreement}
                          onChange={handleInputChange}
                          required
                        />
                        <span className="checkmark"></span>
                        I understand that baptism is a sacred sacrament and commit to raising the candidate in the Christian faith according to Anglican teachings. I agree to attend all required preparation classes and follow the guidelines of ACK St. Jude Miritini Parish. *
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="form-actions">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.agreement}
                      className="submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="spinning" />
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
        </div>
      </div>
    </div>
  );
};

export default Baptism;
