#!/usr/bin/env node
// Conditional react-snap execution - skip in production/Vercel environments
import { execSync } from 'child_process';

console.log('=== CONDITIONAL REACT-SNAP EXECUTION ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CWD:', process.cwd());

// Multiple Vercel detection methods
const isVercel = 
  !!process.env.VERCEL ||
  !!process.env.VERCEL_ENV ||
  process.cwd().includes('/vercel') ||
  process.cwd().includes('\\vercel') ||
  process.env.PWD?.includes('/vercel') ||
  process.argv.some(arg => arg.includes('linux-686378'));

console.log('isVercel detected:', isVercel);

if (isVercel || process.env.NODE_ENV === 'production') {
  console.log('SKIPPING REACT-SNAP: Production/Vercel environment detected');
  console.log('This prevents Chrome library errors on Vercel build servers');
  process.exit(0);
}

console.log('RUNNING REACT-SNAP: Local development environment');

try {
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('React-snap completed successfully');
} catch (error) {
  console.warn('React-snap failed but build will continue');
  console.warn('Error:', error.message);
  process.exit(0); // Don't fail the build
}