import React, { useState, useEffect, useCallback } from 'react';
import { FaCalendarAlt, FaTimes, FaExpandAlt } from 'react-icons/fa';
import './Gallery.css';

// Photo gallery data
const PHOTO_ALBUMS = [
  { id: 12, title: 'Parish Council', coverImage: '/images/PCC.jpeg', date: '2023-11-10' },
  { id: 1, title: "Mother's Union", coverImage: '/images/mothers.jpeg', date: '2023-11-05' },
  { id: 2, title: 'M.U Fellowship', coverImage: '/images/mu.jpeg', date: '2023-10-29' },
  { id: 3, title: 'Parish Wardens', coverImage: '/images/warden.jpeg', date: '2023-10-22' },
  { id: 4, title: "Children's Ministry", coverImage: '/images/child.jpeg', date: '2023-10-15' },
  { id: 5, title: 'Congregational Gathering', coverImage: '/images/congregant.jpeg', date: '2023-11-01' },
  { id: 6, title: 'KAMA Fellowship', coverImage: '/images/kama.jpeg', date: '2023-10-28' },
  { id: 7, title: 'KAMA Meeting', coverImage: '/images/kama1.jpeg', date: '2023-10-21' },
  { id: 8, title: 'KAMA Church Clean Up', coverImage: '/images/kama2.jpeg', date: '2023-10-14' },
  { id: 9, title: 'KAMA Gathering', coverImage: '/images/kama3.jpeg', date: '2023-10-07' },
  { id: 10, title: 'Choir Performance', coverImage: '/images/choir.jpeg', date: '2023-09-30' },
  { id: 11, title: 'Lay Leadership', coverImage: '/images/lay.jpeg', date: '2023-09-23' }
];

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Gallery = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  const closeLightbox = useCallback(() => setActivePhoto(null), []);

  // Escape to close + body scroll lock while lightbox is open
  useEffect(() => {
    if (!activePhoto) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activePhoto, closeLightbox]);

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gl-hero">
        <img src="/images/photo.jpeg" alt="" className="gl-hero-img" aria-hidden="true" />
        <div className="gl-hero-overlay" aria-hidden="true" />
        <div className="gl-hero-inner">
          <p className="gl-eyebrow"><span className="gl-eyebrow-line" />Our Memories</p>
          <h1 className="gl-title">Gallery</h1>
          <p className="gl-lead">
            Capturing moments of faith, fellowship, and community.
          </p>
        </div>
      </section>

      {/* Albums */}
      <section className="gl-section">
        <div className="gl-container">
          <div className="gl-section-head">
            <p className="gl-eyebrow gl-eyebrow-center"><span className="gl-eyebrow-line" />Browse</p>
            <h2 className="gl-section-title">Photo Gallery</h2>
            <p className="gl-section-lead">
              Browse through our collection of photos from church events, services
              and ministry gatherings. Click any photo to view it in full.
            </p>
          </div>

          <div className="gl-grid">
            {PHOTO_ALBUMS.map(album => (
              <button
                key={album.id}
                className="gl-card"
                onClick={() => setActivePhoto(album)}
                aria-label={`View photo: ${album.title}`}
              >
                <div className="gl-card-media">
                  <img src={album.coverImage} alt={album.title} loading="lazy" />
                  <span className="gl-card-zoom"><FaExpandAlt /></span>
                </div>
                <div className="gl-card-body">
                  <h3>{album.title}</h3>
                  <span className="gl-card-date">
                    <FaCalendarAlt /> {formatDate(album.date)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activePhoto && (
        <div
          className="gl-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={closeLightbox}
        >
          <button className="gl-lightbox-close" onClick={closeLightbox} aria-label="Close">
            <FaTimes />
          </button>
          <figure className="gl-lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={activePhoto.coverImage} alt={activePhoto.title} />
            <figcaption>
              <h3>{activePhoto.title}</h3>
              <p><FaCalendarAlt /> {formatDate(activePhoto.date)}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default Gallery;
