import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readdirSync, existsSync, mkdirSync, copyFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to copy Slick Carousel fonts to public directory
function copySlickFonts() {
  const sourceDir = resolve(__dirname, 'node_modules/slick-carousel/slick/fonts');
  const targetDir = resolve(__dirname, 'public/fonts/slick');
  
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
  
  try {
    const files = readdirSync(sourceDir);
    files.forEach(file => {
      if (file.endsWith('.woff') || file.endsWith('.eot') || 
          file.endsWith('.ttf') || file.endsWith('.svg')) {
        copyFileSync(
          resolve(sourceDir, file),
          resolve(targetDir, file)
        );
      }
    });
    console.log('Slick Carousel fonts copied successfully!');
  } catch (error) {
    console.error('Error copying Slick Carousel fonts:', error);
  }
}

// Copy fonts when the config is loaded
copySlickFonts();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true, // Listen on all network interfaces
    strictPort: true, // Exit if port 5173 is in use
    hmr: {
      overlay: true // Show error overlay in the browser
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  // Ensure Vite serves files from the public directory
  publicDir: 'public',
  build: {
    // Copy assets to the output directory
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  // Configure how Vite handles certain assets
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf', '**/*.svg'],
});
