import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaChurch,
  FaCross,
  FaUsers,
  FaHandsHelping,
  FaQuoteLeft,
  FaArrowRight,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { GiChurch } from 'react-icons/gi';
import { BsCalendarCheck } from 'react-icons/bs';
import PccLeaders from '../components/PccLeaders';
import '../styles/About.css';

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const LEADERSHIP_TEAM = [
  { id: 1, name: 'Rev. Canon Richard Otieno', role: 'Vicar', image: '/images/canonrev.jpg' },
  { id: 2, name: 'Rev. Canon George Kuza', role: 'Attached Clergy', image: '/images/george kuza.jpg', fit: 'contain' },
  { id: 3, name: 'Eng. Javan Wanga', role: "Vicar's Warden", image: '/images/javan.png' },
  { id: 4, name: 'Mr. Felton Mwatore', role: "People's Warden", image: '/images/mwatore.png' }
];

const PCC_LEADERS = [
  { id: 1, name: 'Henry Mwaura', role: 'Human Resource Chairperson', image: '/images/mwaura.png' },
  { id: 2, name: 'Mrs. Betty Muchilwa', role: 'Treasurer', image: '/images/mwachilwa.png' },
  { id: 3, name: 'Mr. Fredrick Wesonga', role: 'Honorary Secretary', image: '/images/wasonga.png' },
  { id: 4, name: 'Mr. Moses Obondo', role: 'Finance Chairman', image: '/images/moses.png' },
  { id: 5, name: 'Eng. Kenneth Njue', role: 'Procerument Chairman', image: '/images/njue.png' },
  { id: 6, name: 'Margaret Maina', role: 'Mothers Union Chairlady', image: '/images/maina.png' },
  { id: 7, name: 'Allan Odongo', role: 'Youth Chairman', image: '/images/allan.png' },
  { id: 8, name: 'Janet Wanjiku', role: 'Council Member', image: '/images/janet.png' },
  { id: 9, name: 'Mr. Silvernus Muchilwa', role: 'Property & Investment Chair', image: '/images/muchilwa.png' },
  { id: 10, name: 'William Keah', role: 'Evangelism Coordinator', image: '/images/keah.png' },
  { id: 11, name: 'Benard Righa', role: 'K.A.M.A. Chairman', image: '/images/benard.png' },
  { id: 12, name: 'Elizabeth Mbogho', role: 'Boys Brigade & Girls Brigade Chairman', image: '/images/mbogho.png' },
  { id: 13, name: 'Lydia Mwavita', role: 'Education Representative', image: '/images/lydia.png' },
  { id: 14, name: 'Betty Wesonga', role: 'Worship Coordinator', image: '/images/wesonga.png' },
  { id: 15, name: 'Paul Mbugua', role: 'Council Member', image: '/images/paul.png' },
  { id: 16, name: 'Kennedy Masha', role: 'Council Member', image: '/images/kennedy.png' },
  { id: 17, name: 'Anne Karasha', role: 'Council Member', image: '/images/anne.jpeg' },
  { id: 18, name: 'David Njenga', role: 'Council Member', image: '/images/david.png' },
  { id: 19, name: 'Julia Mwase', role: 'Council Member', image: '/images/julia.png' },
  { id: 20, name: 'Grace Rawinyo', role: 'Council Member', image: '/images/grace.png' },
  { id: 21, name: 'Lydia Muthoni', role: 'Council Member', image: '/images/muthoni.png' },
  { id: 22, name: 'Jackson Gitau', role: 'Council Member', image: '/images/jackson.png' },
  { id: 23, name: 'Jane Kibuba', role: 'Council Member', image: '/images/jane.png' },
  { id: 24, name: 'Nicholas Mbogho', role: 'Council Member', image: '/images/nicholas.png' },
  { id: 25, name: 'Canon Erick Owiti', role: 'Council Member', image: '/images/erick.jpeg' }
];

const PARISH_STAFF = [
  {
    name: 'Rev. Canon Richard Otieno',
    role: 'Parish Vicar',
    image: '/images/canonrev.jpg',
    fit: 'cover',
    email: 'vicar@ackstjude.org',
    phone: '+254700000000'
  },
  { name: 'Ms. Diana Dawa', role: 'Office Administrator', image: '/images/diana.jpeg', fit: 'contain' },
  { name: 'Mr. Ronald Katana', role: 'Verger / Driver', image: '/images/verger.jpeg', fit: 'contain' },
  { name: 'Mr. Nick Lewa', role: 'Assistant Office Administrator / Music Trainer', image: '/images/lewa.png', fit: 'cover' },
  { name: 'Ev. Rophus Ngala', role: 'Evangelist', image: '/images/ngala.jpeg', fit: 'cover' }
];

const CORE_VALUES = [
  {
    icon: <FaChurch />,
    title: 'Servant Leadership',
    description: 'We lead by empowering others, showing compassion and supporting the weak and disadvantaged. Through this Christ-like service, leaders earn trust and inspire growth in both individuals and the community.'
  },
  {
    icon: <FaUsers />,
    title: 'Integrity',
    description: 'We pursue Christ-like holiness, sound doctrine and excellence. We uphold transparency and accountability to God, His Word, one another and the government.'
  },
  {
    icon: <FaHandsHelping />,
    title: 'Transformation',
    description: "We disciple, serve and lead through God's Word, empowered by the Holy Spirit. We honor the diverse gifts in Christ's Body as we pursue true spiritual and social change."
  },
  {
    icon: <FaCross />,
    title: 'Innovation & Creativity',
    description: 'We embrace new ideas and technologies, including Artificial Intelligence, to enhance communication and strengthen ministry in today’s creative age.'
  }
];

const HISTORY_TIMELINE = [
  {
    year: '1975',
    title: 'Founding of the Church',
    description: 'ACK St. Jude was established with just 15 members meeting in a small rented space.'
  },
  {
    year: '1982',
    title: 'First Permanent Structure',
    description: 'The first church building was constructed through the generous contributions of members.'
  },
  {
    year: '1995',
    title: 'Expansion Project',
    description: 'The sanctuary was expanded to accommodate the growing congregation.'
  },
  {
    year: '2010',
    title: 'Community Center',
    description: 'A multipurpose community center was added to better serve the local community.'
  },
  {
    year: '2020',
    title: 'Digital Ministry',
    description: 'Launched online services and digital outreach programs to connect with more people.'
  }
];

const CONSTRUCTION_MISSION = [
  'About Our Church Construction Mission',
  'Across the world, God is raising communities that carry His light, His compassion and His truth. Our parish is one of those places planted by grace, growing by faith and now stepping into a defining moment in our kingdom journey. The construction of our new church is not simply a local project; it is a global calling. It is a sacred work that invites believers everywhere to join hands in building a sanctuary that will echo the praise of God for generations.',
  "This house of worship will be a refuge for the broken, a training ground for disciples, a home for children of faith and a beacon of hope for our community and beyond. Every wall raised, every stone laid will testify of God's faithfulness and the unity of His people across nations, cultures and continents.",
  'We believe that the Church of Christ is one body and when one part builds, the whole body stands stronger. That is why we open our hearts to friends, partners and believers around the world. Your prayers, your generosity and your love can cross oceans and borders to shape this holy place. Your giving becomes a legacy — an eternal footprint in a mission that will touch lives, transform hearts and uplift families long after we are gone.',
  'When you support this construction, you are not only helping us build a physical structure; you are participating in a divine assignment. You are investing in a sanctuary where worship will rise, where children will learn Christ, where the hungry will find compassion, where the lost will find direction and where communities will be restored.',
  'We invite you to stand with us. We invite you to give with us. We invite you to build with us. Be part of this global mission.'
];

const VERSE_ROTATE_MS = 5000;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } }
};

const slideIn = (direction) => ({
  hidden: { opacity: 0, x: direction === 'left' ? -40 : 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } }
});

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

const SectionHead = ({ eyebrow, title, description }) => (
  <motion.header
    className="about-section-head"
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.4 }}
  >
    <motion.p className="eyebrow" variants={rise}>{eyebrow}</motion.p>
    <motion.h2 variants={rise}>{title}</motion.h2>
    {description && <motion.p className="about-section-desc" variants={rise}>{description}</motion.p>}
  </motion.header>
);

// Locks body scroll while a modal is mounted
const useBodyScrollLock = (isOpen) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);
};

const ConstructionMissionModal = ({ isOpen, onClose }) => {
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="about-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="about-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="construction-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="about-modal-close" onClick={onClose} aria-label="Close dialog">
          <FaTimes aria-hidden="true" />
        </button>

        <h2 id="construction-modal-title" className="about-modal-title">
          {CONSTRUCTION_MISSION[0]}
        </h2>

        <div className="about-modal-body">
          {CONSTRUCTION_MISSION.slice(1, -1).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="about-modal-highlight">{CONSTRUCTION_MISSION[CONSTRUCTION_MISSION.length - 1]}</p>
        </div>

        <div className="about-modal-actions">
          <Link to="/give" className="btn btn-primary" onClick={onClose}>
            Donate Now <FaArrowRight aria-hidden="true" />
          </Link>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  About page                                                         */
/* ------------------------------------------------------------------ */

const About = () => {
  const location = useLocation();

  // Active tab is derived from the URL — /about, /about/beliefs, /about/leadership, /about/journey
  const path = location.pathname;
  const activeTab = path.includes('beliefs')
    ? 'our-beliefs'
    : path.includes('leadership')
      ? 'leadership'
      : path.includes('journey')
        ? 'our-journey'
        : 'our-story';

  const [showPccLeaders, setShowPccLeaders] = useState(false);
  const [showConstructionMission, setShowConstructionMission] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const valueCardsRef = useRef([]);

  useBodyScrollLock(showPccLeaders);

  /* --- Values carousel ------------------------------------------------ */

  const scrollToCard = (index) => {
    const container = scrollContainerRef.current;
    const card = valueCardsRef.current[index];
    if (!container || !card) return;

    container.scrollTo({
      left: card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX ?? e.touches[0].pageX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX ?? e.touches[0].pageX;
    scrollContainerRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestCard = null;
    let minDistance = Infinity;

    valueCardsRef.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = index;
      }
    });

    if (closestCard !== null) scrollToCard(closestCard);
  };

  const nextCard = () => scrollToCard((currentIndex + 1) % CORE_VALUES.length);
  const prevCard = () => scrollToCard((currentIndex - 1 + CORE_VALUES.length) % CORE_VALUES.length);

  // Auto-advance values while the beliefs tab is open
  useEffect(() => {
    if (activeTab !== 'our-beliefs') return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % CORE_VALUES.length;
        scrollToCard(next);
        return next;
      });
    }, VERSE_ROTATE_MS);
    return () => clearInterval(timer);
  }, [activeTab, currentIndex]);

  const scrollToContent = () => {
    document.getElementById('about-panels')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* --- Render ----------------------------------------------------------- */

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-media" aria-hidden="true">
          <img src="/images/about.jpg" alt="" />
        </div>
        <div className="about-hero-overlay" aria-hidden="true" />
        <div className="container about-hero-inner">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p className="about-hero-eyebrow" variants={rise}>
              Anglican Church of Kenya · Diocese of Mombasa
            </motion.p>
            <motion.h1 className="about-hero-title" variants={rise}>
              Get to Know Us
            </motion.h1>
            <motion.p className="about-hero-lead" variants={rise}>
              A Christ-centered community in Miritini, making disciples who love God,
              love people and serve the world.
            </motion.p>
            <motion.div className="about-hero-actions" variants={rise}>
              <Link to="/visit" className="btn btn-gold">
                <BsCalendarCheck aria-hidden="true" /> Plan Your Visit
              </Link>
              <button type="button" className="btn btn-ghost-light" onClick={scrollToContent}>
                Our Story
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="about-panels" id="about-panels">
        {/* ------- Our Story ------- */}
        {activeTab === 'our-story' && (
          <section className="about-panel" id="our-story">
            <div className="container">
              <div className="story-grid">
                <motion.div
                  className="story-copy"
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.p className="eyebrow" variants={rise}>Who We Are</motion.p>
                  <motion.h2 className="story-title" variants={rise}>
                    A Community Built on Faith Since 1975
                  </motion.h2>
                  <motion.div variants={rise}>
                    <p>
                      ACK St. Jude was founded in 1975 with a vision to become a beacon of hope
                      and transformation within our community. What began as a small gathering
                      of devoted believers has grown into a vibrant and dynamic faith community,
                      impacting lives across our city and beyond.
                    </p>
                    <p>
                      We are a Bible-believing, Christ-centered church under the Anglican Church
                      of Kenya, Diocese of Mombasa, led by Rt. Rev. Dr. Alphonce Mwaro Baya, our
                      Diocesan Bishop. Our mission is to make disciples of Jesus Christ who love
                      God, love people, and serve the world with compassion and excellence.
                    </p>
                  </motion.div>

                  <motion.div className="mv-grid" variants={rise}>
                    <div className="mv-card">
                      <span className="mv-icon" aria-hidden="true"><GiChurch /></span>
                      <h3>Our Mission</h3>
                      <p>To lead people into a growing relationship with Jesus Christ through worship, discipleship and service.</p>
                    </div>
                    <div className="mv-card">
                      <span className="mv-icon" aria-hidden="true"><FaCross /></span>
                      <h3>Our Vision</h3>
                      <p>To empower God's people to transform society through Christ for holistic life.</p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.figure
                  className="story-photo"
                  variants={slideIn('right')}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <img src="/images/stjude.jpg" alt="ACK St. Jude Miritini church building" loading="lazy" />
                  <figcaption className="story-photo-badge">
                    <span className="story-photo-year">1975</span>
                    <span>Founded</span>
                  </figcaption>
                </motion.figure>
              </div>
            </div>
          </section>
        )}

        {/* ------- Our Beliefs ------- */}
        {activeTab === 'our-beliefs' && (
          <section className="about-panel" id="our-beliefs">
            <div className="container">
              <SectionHead
                eyebrow="What We Believe"
                title="Our Core Values"
                description="These values guide everything we do as a church and as followers of Christ."
              />

              <div className="values-carousel">
                <button
                  type="button"
                  className="values-arrow values-arrow--prev"
                  onClick={prevCard}
                  aria-label="Previous value"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>

                <div
                  className={`values-viewport${isDragging ? ' is-dragging' : ''}`}
                  ref={scrollContainerRef}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  onMouseMove={handleDragMove}
                  onTouchMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchEnd={handleDragEnd}
                >
                  <div className="values-track">
                    {CORE_VALUES.map((value, index) => (
                      <button
                        type="button"
                        key={value.title}
                        ref={(el) => { valueCardsRef.current[index] = el; }}
                        className={`value-card${index === currentIndex ? ' is-active' : ''}`}
                        onClick={() => scrollToCard(index)}
                        aria-current={index === currentIndex}
                      >
                        <span className="value-icon" aria-hidden="true">{value.icon}</span>
                        <h3>{value.title}</h3>
                        <p>{value.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="values-arrow values-arrow--next"
                  onClick={nextCard}
                  aria-label="Next value"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </div>

              <div className="values-dots">
                {CORE_VALUES.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`values-dot${index === currentIndex ? ' is-active' : ''}`}
                    onClick={() => scrollToCard(index)}
                    aria-label={`Go to value ${index + 1}`}
                  />
                ))}
              </div>

              {/* Statement of faith */}
              <motion.div
                className="faith-band"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="faith-band-text">
                  <FaQuoteLeft className="faith-band-icon" aria-hidden="true" />
                  <h3>Our Statement of Faith</h3>
                  <p>
                    We believe in the one true God — Father, Son and Holy Spirit — who loves,
                    restores and transforms. Our faith is rooted in Jesus Christ who saves, heals,
                    redeems and will return in glory. His Word is our truth, His Spirit is our
                    strength and His Kingdom is our calling. In Christ, we live by faith, walk in
                    power and shine His light to the world.
                  </p>
                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={() => setShowConstructionMission(true)}
                  >
                    Our Construction Mission <FaArrowRight aria-hidden="true" />
                  </button>
                </div>
                <div className="faith-band-media">
                  <img src="/images/stjude.jpg" alt="Inside St. Jude church" loading="lazy" />
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ------- Leadership ------- */}
        {activeTab === 'leadership' && (
          <section className="about-panel" id="leadership">
            <div className="container">
              <SectionHead
                eyebrow="Meet Our"
                title="Leadership Team"
                description="God has blessed us with dedicated leaders who shepherd our congregation with wisdom and love."
              />

              <motion.div
                className="leader-grid"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {LEADERSHIP_TEAM.map((member) => (
                  <motion.article className="leader-card" variants={rise} key={member.id}>
                    <div className={`leader-photo${member.fit === 'contain' ? ' leader-photo--contain' : ''}`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/placeholder-user.jpg';
                        }}
                      />
                    </div>
                    <div className="leader-info">
                      <h3>{member.name}</h3>
                      <span className="leader-role">{member.role}</span>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {/* Parish staff */}
              <div className="staff-block">
                <SectionHead
                  eyebrow="Behind the Scenes"
                  title="Parish Staff"
                  description="Our parish staff serve with excellence, keeping every ministry running smoothly."
                />
                <motion.div
                  className="staff-grid"
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {PARISH_STAFF.map((member) => (
                    <motion.article className="staff-card" variants={rise} key={member.name}>
                      <div className={`staff-photo${member.fit === 'contain' ? ' staff-photo--contain' : ''}`}>
                        <img src={member.image} alt={member.name} loading="lazy" />
                      </div>
                      <div className="staff-info">
                        <h4>{member.name}</h4>
                        <span>{member.role}</span>
                        {(member.email || member.phone) && (
                          <div className="staff-contact">
                            {member.email && (
                              <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                                <FaEnvelope aria-hidden="true" />
                              </a>
                            )}
                            {member.phone && (
                              <a href={`tel:${member.phone}`} aria-label={`Call ${member.name}`}>
                                <FaPhone aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>

              {/* Council & elders */}
              <motion.div
                className="council-band"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="council-band-text">
                  <h3>Church Council & Elders</h3>
                  <p>
                    A dedicated team of elders and council members provide spiritual leadership,
                    guidance and care for our congregation, working alongside our pastoral staff.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-gold"
                  onClick={() => setShowPccLeaders(true)}
                  aria-expanded={showPccLeaders}
                >
                  Meet the Full Team <FaArrowRight aria-hidden="true" />
                </button>
              </motion.div>
            </div>
          </section>
        )}

        {/* ------- Our Journey ------- */}
        {activeTab === 'our-journey' && (
          <section className="about-panel" id="our-journey">
            <div className="container">
              <SectionHead
                eyebrow="Our Journey"
                title="Church History"
                description="A brief look at God's faithfulness through the years at ACK St. Jude."
              />

              <div className="timeline">
                {HISTORY_TIMELINE.map((item, index) => (
                  <motion.div
                    className="timeline-item"
                    key={item.year}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <div className="timeline-card">
                      <span className="timeline-year">{item.year}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Join-us band */}
            <div className="container">
              <motion.div
                className="join-band"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="join-band-text">
                  <p className="eyebrow eyebrow--light">Join Our Journey</p>
                  <h3>Become Part of Our Story</h3>
                  <p className="join-band-lead">
                    Join us for worship this Sunday and become part of what God is doing at ACK St. Jude.
                  </p>
                  <p>
                    Experience the warmth of our community, the power of worship and the truth
                    of God's Word in a welcoming environment.
                  </p>
                  <div className="join-band-actions">
                    <Link to="/visit" className="btn btn-gold">
                      <BsCalendarCheck aria-hidden="true" /> Plan Your Visit
                    </Link>
                    <Link to="/ministries" className="btn btn-ghost-light">
                      Explore Ministries <FaArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="join-band-features">
                  <div className="join-feature">
                    <span className="join-feature-icon" aria-hidden="true"><FaUsers /></span>
                    <div>
                      <h4>Vibrant Community</h4>
                      <p>Connect with others on the same spiritual journey</p>
                    </div>
                  </div>
                  <div className="join-feature">
                    <span className="join-feature-icon" aria-hidden="true"><FaChurch /></span>
                    <div>
                      <h4>Meaningful Worship</h4>
                      <p>Experience God's presence in our services</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>

      {/* Modals */}
      <ConstructionMissionModal
        isOpen={showConstructionMission}
        onClose={() => setShowConstructionMission(false)}
      />
      {showPccLeaders && (
        <PccLeaders leaders={PCC_LEADERS} onClose={() => setShowPccLeaders(false)} />
      )}
    </div>
  );
};

export default About;
