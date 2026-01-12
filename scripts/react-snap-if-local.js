#!/usr/bin/env node
// Skip react-snap when running on CI/Vercel to avoid missing system libs for Chromium.
const { execSync } = require('child_process');

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
const isCI = process.env.CI === 'true';

if (isVercel || isCI) {
  console.log('Skipping react-snap prerender on CI/Vercel environment.');
  process.exit(0);
}

try {
  console.log('Running react-snap prerender...');
  execSync('npx react-snap', { stdio: 'inherit' });
} catch (err) {
  console.warn('react-snap failed locally but will not fail the build:', err.message);
  process.exit(0);
}
