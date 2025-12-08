import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaPray, FaHandsHelping, FaCross, FaStar } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import MinistryLayout from '../../components/MinistryLayout';

const sectionStyle = {
  marginBottom: '2.5rem',
  padding: '1.5rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
};

const headingStyle = {
  color: '#1a365d',
  borderBottom: '2px solid #e2e8f0',
  paddingBottom: '0.5rem',
  marginBottom: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const iconStyle = {
  color: '#2b6cb0',
  fontSize: '1.5rem'
};

const BoysBrigade = () => {
  const ministryData = {
    id: 'boys-brigade',
    title: 'Boys\' Brigade',
    fullName: 'The Boys\' Brigade',
    description: 'We have faith in young people and provide opportunities for children and young people to learn, grow and discover in a safe, fun and caring environment which is rooted in the Christian faith.',
    meeting: 'Every Saturday',
    time: '9:00 AM - 12:00 PM',
    contact: '+254 745002529',
    email: 'ackstjudemiritinichuch@gmail.com',
    image: '/images/boys.png',
    style: {
      '--hero-bg-image': 'url(/images/boys.png)',
      '--hero-overlay': 'rgba(0, 0, 0, 0.5)'
    },
    details: {
      motto: 'Sure & Steadfast',
      mottoVerse: 'Hebrews 6:19',
      objective: 'The advancement of Christ\'s kingdom among Boys and the promotion of habits of Obedience, Reverence, Discipline, Self-respect and all that tends towards a true Christian manliness.',
      vision: 'That children and young people experience "life to the full" (John 10:10). Our prayer and hope is that children and young people experience life to the full through coming to know Jesus for themselves.',
      mission: 'The Boys\' Brigade has faith in young people and provides them with opportunities to learn, grow and discover in a safe, fun and caring environment which is rooted in the Christian faith.',
      activities: [
        'Weekly meetings with games and activities',
        'Bible study and Christian teaching',
        'Drill and marching practice',
        'Camping and outdoor activities',
        'Community service projects',
        'Skills development workshops'
      ],
      requirements: 'Boys aged 6-18 years',
      leaders: <><div>Elizabeth Mbogho - Chairperson</div><div>Pauline Chadwick - Secretary</div></>
    }
  };

  return (
    <MinistryLayout {...ministryData}>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          <FaStar style={iconStyle} />
          Our Objective
        </h2>
        <p style={{ lineHeight: '1.7', fontSize: '1.1rem' }}>
          {ministryData.details.objective}
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          <FaStar style={iconStyle} />
          Our Motto
        </h2>
        <div style={{
          textAlign: 'center',
          padding: '1.5rem',
          backgroundColor: '#f7fafc',
          borderRadius: '6px',
          borderLeft: '4px solid #2b6cb0',
          margin: '1rem 0'
        }}>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#2b6cb0',
            marginBottom: '0.5rem'
          }}>"{ministryData.details.motto}"</p>
          <p style={{
            color: '#718096',
            fontStyle: 'italic'
          }}>{ministryData.details.mottoVerse}</p>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          <FaStar style={iconStyle} />
          Vision
        </h2>
        <p style={{ lineHeight: '1.7', fontSize: '1.1rem' }}>
          {ministryData.details.vision}
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          <FaStar style={iconStyle} />
          Mission
        </h2>
        <p style={{ lineHeight: '1.7', fontSize: '1.1rem' }}>
          {ministryData.details.mission}
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          <FaStar style={iconStyle} />
          Our Values
        </h2>
        <p style={{ lineHeight: '1.7', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Our Values describe who we are and what we believe...
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          {[
            'Faith in Jesus Christ',
            'Integrity and Honesty',
            'Respect for Others',
            'Discipline and Self-Control',
            'Service to Community',
            'Personal Development'
          ].map((value, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '6px',
              borderLeft: '3px solid #2b6cb0'
            }}>
              <FaCross style={{
                color: '#2b6cb0',
                marginTop: '0.25rem',
                flexShrink: 0
              }} />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sectionStyle}>
        
      </div>
    </MinistryLayout>
  );
};

export default BoysBrigade;
