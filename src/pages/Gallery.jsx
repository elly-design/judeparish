import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
  // Photo gallery data
  const photoAlbums = [
    {
      id: 12,
      title: 'Parish Council',
      coverImage: '/images/PCC.jpeg',
      date: '2023-11-10',
    },
    {
      id: 1,
      title: 'Mother\'s Union',
      coverImage: '/images/mothers.jpeg',
      date: '2023-11-05',
    },
    {
      id: 2,
      title: 'M.U Fellowship',
      coverImage: '/images/mu.jpeg',
      date: '2023-10-29',
    },
    {
      id: 3,
      title: 'Parish Wardens',
      coverImage: '/images/warden.jpeg',
      date: '2023-10-22',
    },
    {
      id: 4,
      title: 'Children\'s Ministry',
      coverImage: '/images/child.jpeg',
      date: '2023-10-15',
    },
    {
      id: 5,
      title: 'Congregational Gathering',
      coverImage: '/images/congregant.jpeg',
      date: '2023-11-01',
    },
    {
      id: 6,
      title: 'KAMA Fellowship',
      coverImage: '/images/kama.jpeg',
      date: '2023-10-28',
    },
    {
      id: 7,
      title: 'KAMA Meeting',
      coverImage: '/images/kama1.jpeg',
      date: '2023-10-21',
    },
    {
      id: 8,
      title: 'KAMA Church Clean Up',
      coverImage: '/images/kama2.jpeg',
      date: '2023-10-14',
    },
    {
      id: 9,
      title: 'KAMA Gathering',
      coverImage: '/images/kama3.jpeg',
      date: '2023-10-07',
    },
    {
      id: 10,
      title: 'Choir Performance',
      coverImage: '/images/choir.jpeg',
      date: '2023-09-30',
    },
    {
      id: 11,
      title: 'Lay Leadership',
      coverImage: '/images/lay.jpeg',
      date: '2023-09-23',
    },
    // Add more albums here
  ];

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>Capturing moments of faith, fellowship, and community</p>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="photo-gallery">
        <div className="container">
          <div className="section-header">
            <h2>Photo Gallery</h2>
            <p>Browse through our collection of photos from various church events and services</p>
          </div>

          <div className="albums-grid">
            {photoAlbums.map(album => (
              <div key={album.id} className="album-card">
                <div className="album-cover">
                  <img src={album.coverImage} alt={album.title} />
                  <div className="album-overlay">
                    <span className="photo-count">{album.count} photos</span>
                  </div>
                </div>
                <div className="album-info">
                  <h3>{album.title}</h3>
                  <div className="album-meta">
                    <span><FaCalendarAlt /> {formatDate(album.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
