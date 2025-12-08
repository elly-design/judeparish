import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Typewriter = ({ text, speed = 30, tag: Tag = 'span', className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Reset the animation if the text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  // Only show cursor while typing
  const showCursor = currentIndex < text.length;
  
  return (
    <Tag className={className}>
      {displayedText}
      {showCursor && <span className="blinking-cursor">|</span>}
    </Tag>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.elementType]),
  className: PropTypes.string
};

export default Typewriter;
