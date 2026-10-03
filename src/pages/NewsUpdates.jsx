import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaQuoteLeft,
  FaUsers,
  FaChurch,
  FaHeart,
  FaBible,
  FaHandsHelping,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { GiChurch } from 'react-icons/gi';
import '../styles/NewsUpdates.css';

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const NEWS_ITEMS = [
  {
    id: 1,
    date: '12th April 2026',
    title: 'A Blessed Sunday School Sunday',
    category: 'Children Ministry',
    image: '/images/child.jpeg',
    content: 'A blessed Sunday School Sunday was well done by the Children Ministry. We give thanks to God for the Gift of Children and their dedication to love and serve God in their tender age.',
    scripture: 'Proverbs 22:6',
    scriptureText: '"Start children off on the way they should go, and even when they are old they will not turn from it."',
    theme: 'Christ-Centered Families, Renewed Churches and Transformed Neighbourhood'
  }
];

const ARTICLES = [
  {
    id: 'evangelists',
    sectionEyebrow: 'Latest Celebration',
    sectionTitle: 'Evangelists Commissioned',
    sectionDesc: 'Celebrating the commissioning of our new evangelists in Mombasa Diocese',
    date: '14th May 2026',
    category: 'Ministry',
    title: 'Evangelists Commissioned in Mombasa Diocese',
    content: 'Our Lord Bishop commissioned and licensed three of our own as evangelists in Mombasa Diocese namely Betty Wesonga, Rophus Ngala and Janet Mwangi. Congratulations to them on this significant milestone in their ministry journey.',
    scripture: 'Matthew 28:19-20',
    scriptureText: '"Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you."',
    theme: 'Christ-Centered Families, Renewed Churches and Transformed Neighbourhood',
    image: '/images/theme.jpeg'
  },
  {
    id: 'business-forum',
    sectionEyebrow: 'New Initiative',
    sectionTitle: 'Business Forum Launch',
    sectionDesc: 'Launching the Business Forum of Great Business Owners — Vision, Impact and Purpose',
    date: '14th May 2026',
    category: 'Business & Ministry',
    title: 'Business Forum of Great Business Owners Launch',
    content: "On this day, 14th May 2026, we officially launched the Business Forum of Great Business Owners, a platform founded on vision, impact and purpose. As we mark this significant milestone, we affirm that business transcends the mere pursuit of profit. We are called to be solution providers to societal challenges, creators of employment opportunities and faithful witnesses to God's amazing grace within the marketplace. This forum stands as a commitment to excellence, responsibility and transformative leadership.",
    speakers: [
      { name: 'Mrs. Peninah Kilalo', role: 'Director of Joroben Insurance Agency' },
      { name: 'Mr. Samuel Kilalo', role: 'Business Expert and Entrepreneur' }
    ],
    keynote: 'Vicar Rev. Canon Richard Otieno, who delivered the keynote address on the vital role of business owners in advancing God\'s Kingdom.',
    scripture: 'Colossians 3:23',
    scriptureText: '"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."',
    image: '/images/business.jpg'
  }
];

const HIGHLIGHTS = [
  {
    icon: <FaUsers />,
    title: 'Children Ministry',
    text: 'Nurturing young hearts and minds in the love of Christ, teaching them biblical foundations that will guide them throughout their lives.',
    verseIcon: <FaBible />,
    verse: 'Train up a child in the way he should go'
  },
  {
    icon: <FaChurch />,
    title: 'Family Ministries',
    text: 'Building Christ-centered families through fellowship, teaching, and mutual support in our shared journey of faith.',
    verseIcon: <FaHandsHelping />,
    verse: 'Renewed Churches, Transformed Neighbourhood'
  },
  {
    icon: <FaHeart />,
    title: 'Community Outreach',
    text: "Extending God's love beyond our walls through service, compassion, and transformation of our local community.",
    verseIcon: <GiChurch />,
    verse: 'Christ-Centered Families'
  }
];

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

const SectionHead = ({ eyebrow, title, description }) => (
  <motion.header
    className="nu-section-head"
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.4 }}
  >
    <motion.p className="eyebrow" variants={rise}>{eyebrow}</motion.p>
    <motion.h2 variants={rise}>{title}</motion.h2>
    {description && <motion.p className="nu-section-desc" variants={rise}>{description}</motion.p>}
  </motion.header>
);

/* ------------------------------------------------------------------ */
/*  Shared article card                                                */
/* ------------------------------------------------------------------ */

const ArticleCard = ({ article, flip = false }) => (
  <motion.article
    className={`nu-article${flip ? ' nu-article--flip' : ''}`}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.65 }}
  >
    <div className="nu-article-body">
      <div className="nu-article-meta">
        <span className="nu-meta-date">
          <FaCalendarAlt aria-hidden="true" /> {article.date}
        </span>
        <span className="nu-badge">{article.category}</span>
      </div>

      <h3 className="nu-article-title">{article.title}</h3>
      <p className="nu-article-text">{article.content}</p>

      {article.speakers && (
        <div className="nu-speakers">
          <h4>Distinguished Guest Speakers</h4>
          <ul>
            {article.speakers.map((speaker) => (
              <li key={speaker.name}>
                <strong>{speaker.name}</strong>
                <span>{speaker.role}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {article.keynote && (
        <div className="nu-keynote">
          <h4>Keynote Address</h4>
          <p>{article.keynote}</p>
        </div>
      )}

      <blockquote className="nu-scripture">
        <FaQuoteLeft className="nu-quote-icon" aria-hidden="true" />
        <div>
          <cite>{article.scripture}</cite>
          <p>{article.scriptureText}</p>
        </div>
      </blockquote>

      {article.theme && (
        <div className="nu-theme">
          <GiChurch className="nu-theme-icon" aria-hidden="true" />
          <div>
            <h4>Diocesan Theme</h4>
            <p>{article.theme}</p>
          </div>
        </div>
      )}
    </div>

    <div className="nu-article-media">
      <img
        src={article.image}
        alt={article.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/images/grace.jpeg';
        }}
      />
    </div>
  </motion.article>
);

/* ------------------------------------------------------------------ */
/*  News & Updates page                                                */
/* ------------------------------------------------------------------ */

const NewsUpdates = () => {
  const [activeNews, setActiveNews] = useState(0);
  const multi = NEWS_ITEMS.length > 1;

  // Auto-rotate when there are multiple items
  useEffect(() => {
    if (!multi) return undefined;
    const timer = setInterval(() => {
      setActiveNews((prev) => (prev + 1) % NEWS_ITEMS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [multi]);

  const next = () => setActiveNews((prev) => (prev + 1) % NEWS_ITEMS.length);
  const prev = () => setActiveNews((prev) => (prev - 1 + NEWS_ITEMS.length) % NEWS_ITEMS.length);

  return (
    <div className="news-page">
      {/* Hero */}
      <section className="nu-hero">
        <div className="nu-hero-media" aria-hidden="true">
          <img src="/images/thanksgiving.jpg" alt="" />
        </div>
        <div className="nu-hero-overlay" aria-hidden="true" />
        <div className="container nu-hero-inner">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p className="nu-hero-eyebrow" variants={rise}>
              Stay Connected
            </motion.p>
            <motion.h1 className="nu-hero-title" variants={rise}>
              News &amp; Updates
            </motion.h1>
            <motion.p className="nu-hero-lead" variants={rise}>
              The latest stories, celebrations and announcements from our church family.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured news carousel */}
      <section className="nu-section">
        <div className="container">
          <SectionHead
            eyebrow="Featured"
            title="From Our Church Family"
          />

          <div className="nu-featured">
            {NEWS_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className={`nu-featured-slide${index === activeNews ? ' is-active' : ''}`}
                aria-hidden={index !== activeNews}
              >
                <ArticleCard article={item} />
              </div>
            ))}

            {multi && (
              <>
                <button type="button" className="nu-carousel-arrow nu-carousel-arrow--prev" onClick={prev} aria-label="Previous news">
                  <FaChevronLeft aria-hidden="true" />
                </button>
                <button type="button" className="nu-carousel-arrow nu-carousel-arrow--next" onClick={next} aria-label="Next news">
                  <FaChevronRight aria-hidden="true" />
                </button>
                <div className="nu-carousel-dots">
                  {NEWS_ITEMS.map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`nu-dot${index === activeNews ? ' is-active' : ''}`}
                      onClick={() => setActiveNews(index)}
                      aria-label={`Go to news item ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature articles */}
      {ARTICLES.map((article, index) => (
        <section
          className={`nu-section${index % 2 === 0 ? ' nu-section--alt' : ''}`}
          key={article.id}
        >
          <div className="container">
            <SectionHead
              eyebrow={article.sectionEyebrow}
              title={article.sectionTitle}
              description={article.sectionDesc}
            />
            <ArticleCard article={article} flip={index % 2 === 1} />
          </div>
        </section>
      ))}

      {/* Ministry highlights */}
      <section className="nu-section nu-section--alt">
        <div className="container">
          <SectionHead
            eyebrow="Our Ministries"
            title="Ministry Highlights"
            description="Celebrating the dedication and growth of our various ministries."
          />
          <motion.div
            className="nu-highlights"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {HIGHLIGHTS.map((item) => (
              <motion.article className="nu-highlight" variants={rise} key={item.title}>
                <span className="nu-highlight-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="nu-highlight-verse">
                  {item.verseIcon}
                  <span>{item.verse}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsUpdates;
