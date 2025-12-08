import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '../node_modules/slick-carousel/slick/fonts');
const targetDir = join(__dirname, '../public/fonts/slick');

// Ensure target directory exists
await fs.ensureDir(targetDir);

// Copy font files
await fs.copy(sourceDir, targetDir, { overwrite: true });

console.log('Slick Carousel fonts copied successfully!');
