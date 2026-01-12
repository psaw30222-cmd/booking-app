#!/usr/bin/env node
// Skip react-snap when running on CI/Vercel to avoid missing system libs for Chromium.
import { execSync } from 'child_process';

const isVercelEnv = String(process.env.VERCEL || '').toLowerCase();
const isVercel = isVercelEnv === '1' || isVercelEnv === 'true' || isVercelEnv === 'yes';
const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS || !!process.env.GITLAB_CI || !!process.env.CI_NAME;

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
