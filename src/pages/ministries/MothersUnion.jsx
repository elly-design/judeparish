import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPray, FaHandsHelping, FaUsers, FaCross, FaHeart, FaChild, FaChurch, FaUsersCog, FaHandHoldingHeart, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import MinistryLayout from '../../components/MinistryLayout';
import './MinistryStyles.css';

const MothersUnion = () => {
  const ministryData = {
    id: 'mothers-union',
    title: 'Mothers\' Union',
    fullName: 'Mothers\' Union',
    description: 'A global Christian movement dedicated to supporting and strengthening family life through prayer, service, and community engagement.',
    meeting: 'Every Tuesday',
    time: '2:00 PM - 4:00 PM',
    contact: '+254 700 000001',
    email: 'mothersunion@ackstjude.org',
    image: '/images/mother.jpeg',
    style: {
      '--hero-bg-image': 'url(/images/mother.jpeg)',
      '--hero-overlay': 'rgba(0, 0, 0, 0.4)'
    },
    details: {
      mission: 'To promote Christian family life and support marriage and parenting through prayer, service, and fellowship.',
      activities: [
        'Weekly prayer meetings and Bible study',
        'Marriage enrichment and parenting programs',
        'Counselling and family support services',
        'Community outreach and charity work',
        'Skills development and income-generating activities',
        'Annual women\'s conference and retreats'
      ],
      requirements: 'Open to all women committed to Christian family values',
      leaders: <><div>Mrs. Jane Wanjiku (Chairlady)</div><div>Mrs. Mary Wambui (Secretary)</div></>
    }
  };

  const objectives = [
    {
      icon: <FaCross />,
      title: 'Scriptural Foundation',
      description: 'I can do all things through him (Christ) who strengthens me'
    },
    {
      icon: <FaHeart />,
      title: 'Vision',
      description: 'A Stable Family grounded in Christ'
    },
    {
      icon: <FaHandsHelping />,
      title: 'Mission',
      description: 'To promote programs that contribute to the holistic wellbeing of families'
    }
  ];

  const coreObjectives = [
    {
      icon: <FaCross />,
      title: 'Marriage and Family',
      description: 'To uphold Christ\'s teaching on the nature of marriage and to promote its wider understanding.'
    },
    {
      icon: <FaChild />,
      title: 'Child Rearing',
      description: 'To encourage parents to bring up their children in the faith and life of the Church.'
    },
    {
      icon: <FaChurch />,
      title: 'Christian Fellowship',
      description: 'To maintain a world-wide fellowship of Christians united in prayer, worship and service.'
    },
    {
      icon: <FaUsersCog />,
      title: 'Youth Responsibility',
      description: 'To help the church to understand her responsibility towards young people.'
    },
    {
      icon: <FaHandHoldingHeart />,
      title: 'Family Support',
      description: 'To promote conditions in society favorable to stable family life and the protection of children.'
    },
    {
      icon: <FaUsers />,
      title: 'Youth Empowerment',
      description: 'To empower young people to live responsible and meaningful lives spiritually, morally, socially, economically and politically.'
    },
    {
      icon: <FaPray />,
      title: 'Compassion',
      description: 'To help and comfort those met with adversity.'
    }
  ];

  const navigate = useNavigate();
  const [expandedObjective, setExpandedObjective] = useState(null);

  const handleLearnMore = (index) => {
    if (expandedObjective === index) {
      setExpandedObjective(null);
    } else {
      setExpandedObjective(index);
    }
  };

  const navigateToDetail = (title) => {
    // Convert title to URL-friendly format
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/ministries/mothers-union/${slug}`);
  };

  return (
    <MinistryLayout {...ministryData}>
      <div className="ministry-content">
        <section className="about-section">
          <div className="ministry-motto">
            <FaQuoteLeft className="quote-icon" />
            <p className="scripture">I can do all things through him (Christ) who strengthens me</p>
          </div>

          <div className="objectives-grid">
            {objectives.map((item, index) => (
              <div key={index} className="objective-card">
                <div className="objective-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button 
                  className="learn-more-btn"
                  onClick={() => navigateToDetail(item.title)}
                >
                  Learn More <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="core-objectives">
          <h2>Our Core Objectives</h2>
          <div className="objectives-container">
            {coreObjectives.map((item, index) => (
              <div key={index} className="objective-item">
                <div className="objective-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MinistryLayout>
  );
};

export default MothersUnion;
