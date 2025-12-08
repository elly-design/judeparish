// Font Face Observer for better font loading control
const loadFonts = () => {
  // Only run in the browser
  if (typeof window !== 'undefined') {
    // Load Font Face Observer dynamically
    const FontFaceObserver = require('fontfaceobserver');
    
    // Define the fonts we want to load
    const roboto = new FontFaceObserver('Roboto');
    const montserrat = new FontFaceObserver('Montserrat');
    
    // Add a class to the HTML element when fonts are loaded
    Promise.all([
      roboto.load(null, 5000), // 5 second timeout
      montserrat.load(null, 5000)
    ]).then(() => {
      document.documentElement.classList.add('fonts-loaded');
    }).catch((err) => {
      console.warn('Some fonts failed to load:', err);
      document.documentElement.classList.add('fonts-failed');
    });
  }
};

// Export the function
export default loadFonts;
