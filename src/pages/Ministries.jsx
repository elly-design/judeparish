import React, { useState } from 'react';
import {
  FaUsers,
  FaHandsHelping,
  FaFemale,
  FaMale,
  FaArrowRight,
  FaSearch,
  FaPray,
  FaChild,
  FaStar
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Ministries.css';

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const MINISTRIES = [
  {
    id: 'kama',
    title: 'KAMA',
    fullName: "Kenya Anglican Men's Association",
    tagline: 'Strengthening Men in Faith & Leadership',
    description: 'A vibrant fellowship of men dedicated to spiritual growth, leadership development and community transformation through Christ-centered initiatives and brotherhood.',
    logo: "images/men's association.jpeg",
    category: 'men',
    color: '#1a4d8f'
  },
  {
    id: 'mothers-union',
    title: "Mothers' Union",
    fullName: "Mothers' Union",
    tagline: 'Strengthening Family Life',
    description: 'A global Christian movement that has been supporting and promoting married life for decades through prayer, programs and practical support.',
    logo: 'images/union.jpeg',
    category: 'women',
    color: '#8e44ad'
  },
  {
    id: 'kayo',
    title: 'KAYO',
    fullName: 'Kenya Anglican Youth Organization',
    tagline: 'Empowering the Next Generation',
    description: 'A dynamic movement of young Christians committed to spiritual growth, leadership development and community transformation through innovative programs and activities.',
    logo: 'images/KAYOLOGO.png',
    category: 'youth',
    color: '#e74c3c'
  },
  {
    id: 'boys-brigade',
    title: "Boys' Brigade",
    fullName: "The Boys' Brigade",
    tagline: 'Sure & Steadfast',
    description: "The world's first uniformed youth organization, providing a balanced program of activities for boys to develop physically, mentally and spiritually in a Christian environment.",
    logo: 'images/boysbrigade.jpg',
    category: 'children',
    color: '#27ae60'
  },
  {
    id: 'gfs',
    title: 'GFS',
    fullName: "Girls' Friendly Society",
    tagline: 'Friendship, Faith & Fun',
    description: 'A global movement within the Anglican Church providing a safe space for girls to grow in faith, develop life skills and build lasting friendships in a Christian environment.',
    logo: 'images/Girls-Friendly-SocietyLogo.webp',
    category: 'children',
    color: '#e91e63'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Ministries', icon: <FaStar /> },
  { id: 'men', name: 'Men', icon: <FaMale /> },
  { id: 'women', name: 'Women', icon: <FaFemale /> },
  { id: 'youth', name: 'Youth', icon: <FaUsers /> },
  { id: 'children', name: 'Children', icon: <FaChild /> }
];

const REASONS = [
  {
    icon: <FaUsers />,
    title: 'Community',
    text: 'Connect with like-minded believers, build meaningful relationships and experience the love of Christ through fellowship.'
  },
  {
    icon: <FaHandsHelping />,
    title: 'Serving',
    text: 'Discover and use your God-given gifts and talents to serve others and make a lasting impact in your community.'
  },
  {
    icon: <FaPray />,
    title: 'Spiritual Growth',
    text: 'Deepen your relationship with God through Bible study, prayer, worship and discipleship in a supportive environment.'
  }
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } }
};

const SectionHead = ({ eyebrow, title, description }) => (
  <motion.header
    className="min-section-head"
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.4 }}
  >
    <motion.p className="eyebrow" variants={rise}>{eyebrow}</motion.p>
    <motion.h2 variants={rise}>{title}</motion.h2>
    {description && <motion.p className="min-section-desc" variants={rise}>{description}</motion.p>}
  </motion.header>
);

/* ------------------------------------------------------------------ */
/*  Ministries page                                                    */
/* ------------------------------------------------------------------ */

const Ministries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredMinistries = MINISTRIES.filter((ministry) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      ministry.title.toLowerCase().includes(q) ||
      ministry.fullName.toLowerCase().includes(q) ||
      ministry.description.toLowerCase().includes(q);
    const matchesTab = activeTab === 'all' || ministry.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="ministries-page">
      {/* Hero */}
      <section className="min-hero">
        <div className="min-hero-media" aria-hidden="true">
          <img src="/images/sunday.jpeg" alt="" />
        </div>
        <div className="min-hero-overlay" aria-hidden="true" />
        <div className="container min-hero-inner">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p className="min-hero-eyebrow" variants={rise}>
              Anglican Church of Kenya · ACK St. Jude Miritini
            </motion.p>
            <motion.h1 className="min-hero-title" variants={rise}>
              Our Ministries
            </motion.h1>
            <motion.p className="min-hero-lead" variants={rise}>
              Discover your place in God's family — find a ministry where you can
              grow, serve and belong.
            </motion.p>
            <motion.div className="min-search" variants={rise}>
              <FaSearch className="min-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search ministries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search ministries"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ministries grid */}
      <section className="min-section">
        <div className="container">
          <SectionHead
            eyebrow="Our Ministries"
            title="Find Your Place to Serve and Grow in Faith"
          />

          {/* Category filters */}
          <div className="min-filters" role="group" aria-label="Filter ministries">
            {CATEGORIES.map((category) => (
              <button
                type="button"
                key={category.id}
                className={`min-filter${activeTab === category.id ? ' is-active' : ''}`}
                onClick={() => setActiveTab(category.id)}
                aria-pressed={activeTab === category.id}
              >
                <span className="min-filter-icon" aria-hidden="true">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {filteredMinistries.length === 0 ? (
            <div className="min-empty">
              <h3>No ministries found</h3>
              <p>Try adjusting your search or filter criteria.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              className="min-grid"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {filteredMinistries.map((ministry) => (
                <motion.article className="min-card" variants={rise} key={ministry.id}>
                  <div
                    className="min-card-head"
                    style={{ '--min-color': ministry.color }}
                  >
                    <span className="min-card-logo">
                      <img src={ministry.logo} alt={`${ministry.fullName} logo`} loading="lazy" />
                    </span>
                    <span className="min-card-fullname">{ministry.fullName}</span>
                  </div>
                  <div className="min-card-body">
                    <h3 className="min-card-title">{ministry.title}</h3>
                    <p className="min-card-tagline">{ministry.tagline}</p>
                    <p className="min-card-desc">{ministry.description}</p>
                    <div className="min-card-actions">
                      <Link to={`/ministries/${ministry.id}`} className="btn btn-primary">
                        Learn More <FaArrowRight aria-hidden="true" />
                      </Link>
                      <Link
                        to={`/contact?ministry=${encodeURIComponent(ministry.title)}`}
                        className="btn btn-outline"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why join */}
      <section className="min-why">
        <div className="container">
          <SectionHead
            eyebrow="Why Join a Ministry?"
            title="Grow in Faith and Make a Difference"
          />
          <motion.div
            className="min-reasons"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {REASONS.map((reason) => (
              <motion.article className="min-reason" variants={rise} key={reason.title}>
                <span className="min-reason-icon" aria-hidden="true">{reason.icon}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Get involved CTA */}
      <section className="min-cta">
        <div className="container">
          <motion.div
            className="min-cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="min-cta-text">
              <p className="eyebrow eyebrow--light">Get Involved</p>
              <h2>Ready to Join a Ministry?</h2>
              <p>
                Every believer has a place in God's family. Come and discover the joy
                of serving, growing and belonging at ACK St. Jude.
              </p>
            </div>
            <div className="min-cta-actions">
              <Link to="/visit" className="btn btn-gold">
                Plan Your Visit <FaArrowRight aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn btn-ghost-light">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ministries;
