import React from 'react';
import { FaPray, FaHandsHelping, FaUsers, FaStar, FaHeart, FaFemale, FaRocket, FaUsers as FaUsersIcon, FaLaugh } from 'react-icons/fa';
import MinistryLayout from '../../components/MinistryLayout';

const sectionStyle = {
  marginBottom: '2.5rem',
  padding: '1.8rem',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
};

const headingStyle = {
  color: '#6b46c1',
  borderBottom: '2px solid #e9d8fd',
  paddingBottom: '0.6rem',
  marginBottom: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  fontSize: '1.5rem'
};

const iconStyle = {
  color: '#9f7aea',
  fontSize: '1.5rem'
};

const mottoStyle = {
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: '#faf5ff',
  borderRadius: '8px',
  borderLeft: '4px solid #9f7aea',
  margin: '1.5rem 0',
  fontStyle: 'italic',
  fontSize: '1.2rem',
  lineHeight: '1.8',
  color: '#553c9a'
};

const GFS = () => {
  const ministryData = {
    id: 'gfs',
    title: 'GFS',
    fullName: 'Girls\' Friendly Society',
    description: 'Empowering girls and young women through faith, friendship and personal growth.',
    meeting: 'Every Saturday',
    time: '10:00 AM - 12:30 PM',
    contact: '+254 745002529',
    email: 'ackstjudemiritinichuch@gmail.com',
    image: '/images/girls.png',
    style: {
      '--hero-bg-image': 'url(/images/girls.png)',
      '--hero-overlay': 'rgba(0, 0, 0, 0.5)'
    },
    details: {
      motto: '“Bear Ye One Another’s Burdens and so Fulfill the Law of Christ.”',
      mottoVerse: 'Galatians 6:2',
      vision: 'Our vision is of a world where girls and young women are free to be themselves and feel proud of who they are.',
      mission: 'Our mission is to support and inspire girls and young women. We will create spaces where they feel safe and valued, so that they can build strong foundations that will prepare them for life’s challenges.',
      values: [
        { name: 'Girl-focused', icon: <FaFemale /> },
        { name: 'Brave', icon: <FaStar /> },
        { name: 'Feminist', icon: <FaHeart /> },
        { name: 'Ambitious', icon: <FaRocket /> },
        { name: 'Inclusive', icon: <FaUsersIcon /> },
        { name: 'Fun', icon: <FaLaugh /> }
      ],
      activities: [
        'Bible study and prayer meetings',
        'Life skills and leadership training',
        'Community service projects',
        'Arts and crafts workshops',
        'Camping and outdoor activities',
        'Annual rallies and conferences'
      ],
      requirements: 'Girls aged 5-25 years',
      leaders: <><div>Elizabeth Mbogho - Chairperson</div><div>Pauline Chadwick - Secretary</div></>
    }
  };

  return (
    <MinistryLayout {...ministryData}>
      <div style={sectionStyle}>
        <div style={mottoStyle}>
          <p style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: '600' }}>
            {ministryData.details.motto}
          </p>
          <p style={{ fontSize: '1rem', opacity: '0.9' }}>{ministryData.details.mottoVerse}</p>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          <FaStar style={iconStyle} />
          Our Vision
        </h2>
        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#4a5568' }}>
          {ministryData.details.vision}
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          <FaStar style={iconStyle} />
          Our Mission
        </h2>
        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#4a5568' }}>
          {ministryData.details.mission}
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          <FaStar style={iconStyle} />
          Our Values
        </h2>
        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1.5rem', color: '#4a5568' }}>
          In everything we do, GFS will be:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.2rem',
          marginTop: '1.5rem'
        }}>
          {ministryData.details.values.map((value, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: '#faf5ff',
              padding: '1.2rem',
              borderRadius: '8px',
              borderLeft: '4px solid #9f7aea',
              transition: 'transform 0.2s, box-shadow 0.2s',
              ':hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}>
              <div style={{
                color: '#9f7aea',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                backgroundColor: '#f3e8ff',
                borderRadius: '50%',
                flexShrink: 0
              }}>
                {value.icon}
              </div>
              <span style={{
                fontWeight: '600',
                color: '#553c9a',
                fontSize: '1.1rem'
              }}>{value.name}</span>
            </div>
          ))}
        </div>
      </div>
    </MinistryLayout>
  );
};

export default GFS;
