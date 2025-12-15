import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Suppress React DevTools and font loading messages in development
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  const suppressPatterns = [
    /Download the React DevTools/i,
    /react-?dev/i,
    /slow network.*font/i,
    /fallback font will be used/i,
    /failed to load.*font/i,
    /font.*loading/i
  ];
  
  const shouldSuppress = (message) => {
    if (typeof message !== 'string') return false;
    return suppressPatterns.some(pattern => pattern.test(message));
  };
  
  console.error = function (message, ...args) {
    if (shouldSuppress(message)) return;
    originalError.apply(console, [message, ...args]);
  };
  
  console.warn = function (message, ...args) {
    if (shouldSuppress(message)) return;
    originalWarn.apply(console, [message, ...args]);
  };
  
  // Suppress React DevTools message using a more aggressive approach
  Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
    value: {
      inject: () => {},
      on: () => {},
      _listeners: {},
      _fired: false
    },
    configurable: true
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
