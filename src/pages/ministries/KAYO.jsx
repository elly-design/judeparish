import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaPray, FaHandsHelping, FaMusic } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import MinistryLayout from '../../components/MinistryLayout';

const KAYO = () => {
  const ministryData = {
    id: 'kayo',
    title: 'KAYO',
    fullName: 'Kenya Anglican Youth Organization',
    description: 'The youth are the most energetic group both physically and emotionally. If their energies are tapped, harnessed and well utilized they can be a great blessing to church and society. If not, they are the most vulnerable group because their energies can be abused.',
    meeting: 'Every Friday',
    time: '4:30 PM - 6:30 PM',
    contact: '+254 745002529',
    email: 'ackstjudemiritinichuch@gmail.com',
    image: '/images/youth2.jpeg',
    details: {
      motto: 'Be strong in the Lord',
      vision: 'A growing, caring Anglican Youth boldly Proclaiming Christ.',
      mission: 'To reach and Equip the youth to Transform the Society with the Gospel',
      activities: [
        'Weekly fellowship and Bible study',
        'Talent development and mentorship programs',
        'Community service and outreach projects',
        'Worship and creative arts ministry',
        'Sports and recreational activities',
        'Annual youth conferences and camps'
      ],
      requirements: 'Ages 13-35 years',
      leaders: (
        <>
          <div className="leaders-list">
            <div>Allan Odongo - Chairperson</div>
            <div>Marion Wambui - Secretary</div>
          </div>
        </>
      )
    }
  };

  return (
    <MinistryLayout 
      title={ministryData.title}
      fullName={ministryData.fullName}
      description={ministryData.description}
      meeting={ministryData.meeting}
      time={ministryData.time}
      contact={ministryData.contact}
      email={ministryData.email}
      image={ministryData.image}
      details={ministryData.details}
    >
      <section className="about-section">
        <div className="motto-box">
          <h3>Our Motto</h3>
          <p className="motto">"{ministryData.details.motto}"</p>
        </div>

        <div className="vision-mission">
          <div className="vision">
            <h3>Vision</h3>
            <p>{ministryData.details.vision}</p>
          </div>
          <div className="mission">
            <h3>KAYO Promise</h3>
            <p>I promise to serve Jesus Christ all the days of my life, pray and read the Bible daily, encourage other young people to join KAYO, and abide by its rules.</p>
          </div>
        </div>

        <div className="objectives">
          <h3>Objectives of KAYO</h3>
          <ol>
            <li>To bring up young people to know, to love and serve Jesus Christ as Savior and Lord.</li>
            <li>To build up young People in the knowledge of the Christian Faith, the bible being the foundation.</li>
            <li>To build consensus and cohesion among young people.</li>
            <li>To help the church to understand her responsibility towards young people.</li>
            <li>To work in close partnership with other Anglican provinces, churches and organization with sound Christian doctrine in Kenya and abroad.</li>
            <li>To empower young people to live responsible and meaningful lives spiritually, morally, socially, economically and politically.</li>
          </ol>
        </div>
      </section>

      <section className="upcoming-events">
        
      </section>
    </MinistryLayout>
  );
};

export default KAYO;
