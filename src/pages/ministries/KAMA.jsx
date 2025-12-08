import React from 'react';
import { FaPray, FaUsers, FaHandsHelping, FaChurch, FaHandHoldingHeart, FaUserTie, FaCalendarAlt, FaMapMarkerAlt, FaBible, FaQuoteLeft } from 'react-icons/fa';
import { GiFamilyHouse } from 'react-icons/gi';
import { BsCalendarCheck } from 'react-icons/bs';
import MinistryLayout from '../../components/MinistryLayout';
import './MinistryStyles.css';

const KAMA = () => {
  const ministryData = {
    id: 'kama',
    title: 'KAMA',
    fullName: 'Kenya Anglican Men\'s Association',
    description: 'A fellowship of men committed to spiritual growth, leadership development, and community service.',
    meeting: '1st & 3rd Sundays',
    time: '8:00 AM - 10:00 AM',
    contact: '+254 745002529',
    email: 'ackstjudemiritinichuch@gmail.com',
    image: '/images/bible-scripture.jpg',
    details: {
      mission: 'To help men grow in spirit, mind, and body, and to nurture them in faith for every good work.',
      activities: [
        'Weekly Bible study and prayer meetings',
        'Community service and outreach programs',
        'Leadership and mentorship initiatives',
        'Family support and counseling',
        'Annual conferences and retreats',
        'Spiritual growth workshops'
      ],
      requirements: 'Open to all Anglican men',
      leaders: <>
        <div>Bernard Righa - Chairman</div>
        <div>Nicholas Mbogho - Secretary</div>
      </>
    }
  };

  const objectives = [
    {
      icon: <FaPray />,
      title: 'Spiritual Growth',
      description: 'Help members grow in spirit, mind and body to be nurtured in faith for every good work.'
    },
    {
      icon: <FaChurch />,
      title: 'Church Mission',
      description: 'Encourage active participation in the mission of the Church.'
    },
    {
      icon: <FaUserTie />,
      title: 'Christian Principles',
      description: 'Promote Christian principles in national, civic, and community life.'
    },
    {
      icon: <FaHandsHelping />,
      title: 'Christian Service',
      description: 'Undertake acts of Christian service for the distressed, disadvantaged, or disabled.'
    },
    {
      icon: <FaBible />,
      title: 'Stewardship',
      description: 'Encourage using resources and gifts as good stewards of God\'s grace.'
    },
    {
      icon: <GiFamilyHouse />,
      title: 'Family Values',
      description: 'Honor the institution of marriage and promote Christian family values.'
    }
  ];

  const upcomingEvents = [
  ];

  return (
    <div data-ministry="kama">
      <MinistryLayout 
        {...ministryData}
        style={{
          '--hero-bg-image': 'url(/images/bible-scripture.jpg)'
        }}
      >
      {/* History Section */}
      <section className="history-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Our History</h2>
            <div className="divider"></div>
          </div>
          <div className="history-content">
            <div className="history-text">
              <p>
                The Kenya Anglican Men's Association traces its roots from the Mother's Union operations. Retired Archbishop 
                Manasses Kuria was so impressed by the work of the Mothers' Union that he felt it right to start what was 
                formerly referred to as the Fathers' Union. The union first started in the same parish where the first pioneer 
                Mothers' Union members had been enrolled, namely Mwongoiya in Anglican Diocese of Mount Kenya South. 
              </p>
              <p>
                It has over the years grown and spread to all the ACK Dioceses across the Country, becoming part and parcel 
                of the Church ministry.
              </p>
              <div className="motto-box">
                <FaQuoteLeft className="quote-icon" />
                <p className="motto">"As for me and my household will serve the Lord"</p>
                <p className="bible-verse">Joshua 24:15-16</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="objectives-section section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Our Objectives</h2>
            <div className="divider"></div>
          </div>
          <div className="objectives-grid">
            {objectives.map((objective, index) => (
              <div key={index} className="objective-card">
                <div className="objective-icon">{objective.icon}</div>
                <h3>{objective.title}</h3>
                <p>{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="activities-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Our Activities</h2>
            <div className="divider"></div>
          </div>
          <div className="activities-content">
            <div className="activities-text">
              <p>KAMA is actively involved in various activities that help fulfill its mission and objectives:</p>
              <ul className="activities-list">
                <li>Organizes and holds regular meetings for prayer, Bible study, and fellowship</li>
                <li>Conducts conferences, seminars, and educational trips for capacity building</li>
                <li>Engages in community service and social responsibility programs</li>
                <li>Provides mentorship and guidance to young men in the church</li>
                <li>Supports the church's mission and ministry through various initiatives</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="upcoming-events section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Upcoming Events</h2>
            <div className="divider"></div>
          </div>
          <div className="event-list">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-card">
                <div className="event-date">
                  <span className="day">{event.date}</span>
                  <span className="month">{event.month}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span><FaCalendarAlt /> {event.time}</span>
                    <span><FaMapMarkerAlt /> {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </MinistryLayout>
    </div>
  );
};

export default KAMA;
