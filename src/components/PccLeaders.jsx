import React, { useEffect, useCallback } from 'react';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import '../styles/PccLeaders.css';

const PccLeaders = ({ leaders, onClose }) => {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  return (
    <div
      className="pcc-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Parish Church Council Members"
      onClick={handleClose}
    >
      <div className="pcc-panel" onClick={(e) => e.stopPropagation()}>
        <button className="pcc-close-x" onClick={handleClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className="pcc-header">
          <p className="pcc-eyebrow"><span className="pcc-eyebrow-line" />Our Council</p>
          <h2 className="pcc-title">Parish Church Council Members</h2>
          <p className="pcc-lead">
            Our dedicated PCC members work together to oversee the spiritual and
            practical affairs of our church, ensuring we fulfill our mission and
            vision as a faith community.
          </p>
        </div>

        <div className="pcc-grid">
          {leaders.map(leader => (
            <div key={leader.id} className="pcc-card">
              <div className="pcc-card-img">
                <img src={leader.image} alt={leader.name} loading="lazy" />
              </div>
              <div className="pcc-card-body">
                <h3>{leader.name}</h3>
                <span className="pcc-role">{leader.role}</span>
                {leader.bio && <p className="pcc-bio">{leader.bio}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="pcc-footer">
          <button onClick={handleClose} className="pcc-back">
            <FaArrowLeft /> Back to Leadership
          </button>
        </div>
      </div>
    </div>
  );
};

export default PccLeaders;
