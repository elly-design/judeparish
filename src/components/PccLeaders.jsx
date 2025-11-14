import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/PccLeaders.css';

const PccLeaders = ({ leaders, onClose }) => {
  return (
    <div className="pcc-leaders-overlay">
      <div className="pcc-leaders-container">
        <div className="pcc-leaders-header">
          <h2>Parish Church Council (PCC) Members</h2>
          <p className="pcc-leaders-description">
            Our dedicated PCC members work together to oversee the spiritual and practical affairs of our church,
            ensuring we fulfill our mission and vision as a faith community.
          </p>
          <button onClick={onClose} className="pcc-leaders-close">
            <FaArrowLeft /> Back to Leadership
          </button>
        </div>
        
        <div className="pcc-leaders-grid">
          {leaders.map(leader => (
            <div key={leader.id} className="pcc-leader-card">
              <div className="pcc-leader-image">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder-user.jpg';
                  }}
                />
              </div>
              <div className="pcc-leader-info">
                <h3>{leader.name}</h3>
                <span className="pcc-leader-role">{leader.role}</span>
                {leader.bio && <p>{leader.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PccLeaders;
