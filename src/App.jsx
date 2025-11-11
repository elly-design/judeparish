import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/slick-fix.css'; // Slick Carousel font fix
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Ministries from './pages/Ministries.jsx';
import Services from './pages/Services.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Import ministry pages
import KAMA from './pages/ministries/KAMA';
import MothersUnion from './pages/ministries/MothersUnion';
import KAYO from './pages/ministries/KAYO';
import BoysBrigade from './pages/ministries/BoysBrigade';
import GFS from './pages/ministries/GFS';
import Give from './pages/Give.jsx';
import Baptism from './pages/Baptism.jsx';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}>
            <Route index element={<About defaultTab="our-story" />} />
            <Route path="beliefs" element={<About defaultTab="our-beliefs" />} />
            <Route path="leadership" element={<About defaultTab="leadership" />} />
            <Route path="journey" element={<About defaultTab="our-journey" />} />
          </Route>
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/ministries/kama" element={<KAMA />} />
          <Route path="/ministries/mothers-union" element={<MothersUnion />} />
          <Route path="/ministries/kayo" element={<KAYO />} />
          <Route path="/ministries/boys-brigade" element={<BoysBrigade />} />
          <Route path="/ministries/gfs" element={<GFS />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/give" element={<Give />} />
          <Route path="/visit" element={<Contact isVisitPage={true} />} />
          <Route path="/baptism" element={<Baptism />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
