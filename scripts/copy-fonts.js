import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change to the project directory
process.chdir(path.join(__dirname, '..'));

// Push to GitHub function
const pushToGitHub = () => {
  try {
    // Check git status
    console.log('Checking git status...');
    const status = execSync('git status', { encoding: 'utf8' });
    console.log(status);
    
    // Add all changes
    console.log('Adding changes...');
    execSync('git add .', { encoding: 'utf8' });
    
    // Commit changes
    console.log('Committing changes...');
    execSync('git commit -m "Make membership modal mobile-responsive"', { encoding: 'utf8' });
    
    // Push to GitHub
    console.log('Pushing to GitHub...');
    execSync('git push origin main', { encoding: 'utf8' });
    
    console.log('Successfully pushed changes to GitHub!');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.message.includes('nothing to commit')) {
      console.log('No changes to commit.');
    } else if (error.message.includes('Authentication failed')) {
      console.log('Please check your GitHub credentials.');
    } else {
      console.log('Please check the error above and try again.');
    }
  }
};

// Execute push to GitHub immediately
pushToGitHub();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { pushToGitHub };
}
