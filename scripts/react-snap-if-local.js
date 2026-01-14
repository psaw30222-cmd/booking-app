#!/usr/bin/env node
// Skip react-snap when running on CI/Vercel to avoid missing system libs for Chromium.
// Also skip when NODE_ENV is production and not explicitly marked as local dev
import { execSync } from 'child_process';

const vercelEnvVars = ['VERCEL', 'VERCEL_ENV', 'VERCEL_URL', 'NOW', 'NOW_BUILDER', 'VERCEL_GIT_PROVIDER', 'VERCEL_REGION', 'VERCEL_PROJECT_ID', 'VERCEL_ORG_ID', 'VERCEL_BUILDER'];
const isVercel = vercelEnvVars.some((v) => !!process.env[v]) || 
                 process.cwd().includes('/vercel') || 
                 process.cwd().includes('\\vercel') || // Windows path
                 process.env.PWD?.includes('/vercel') || // Vercel build environment
                 (process.env.NODE_ENV === 'production' && !process.env.LOCAL_DEV) ||
                 !!process.env.NOW_BUILDER || // Legacy Vercel
                 process.argv.includes('--vercel') || // Manual flag
                 process.env.DEPLOYMENT_URL?.includes('.vercel.app') ||
                 // Aggressive production detection
                 (process.env.NODE_ENV === 'production' && !process.env.REACT_SNAP_LOCAL) ||
                 !!process.env.SKIP_REACT_SNAP || // Explicit skip flag
                 !!process.env.VERCEL_GIT_COMMIT_REF; // Vercel git environment
const isCI = !!process.env.CI || 
             !!process.env.GITHUB_ACTIONS || 
             !!process.env.GITLAB_CI || 
             !!process.env.CI_NAME || 
             !!process.env.BUILDER || 
             !!process.env.BUILD || 
             !!process.env.CONTINUOUS_INTEGRATION;

console.log('=== ENVIRONMENT DEBUG INFO ===');
console.log('cwd: ' + process.cwd());
console.log('NODE_ENV: ' + process.env.NODE_ENV);
console.log('VERCEL: ' + process.env.VERCEL);
console.log('VERCEL_ENV: ' + process.env.VERCEL_ENV);
console.log('CI: ' + process.env.CI);
console.log('SKIP_REACT_SNAP: ' + process.env.SKIP_REACT_SNAP);
console.log('VERCEL_GIT_COMMIT_REF: ' + process.env.VERCEL_GIT_COMMIT_REF);
console.log('PWD: ' + process.env.PWD);
console.log('DEPLOYMENT_URL: ' + process.env.DEPLOYMENT_URL);
console.log('isVercel: ' + isVercel);
console.log('isCI: ' + isCI);
console.log('===============================');

if (isVercel || isCI) {
  const detectedVercel = vercelEnvVars.filter((v) => !!process.env[v]);
  const detectedCI = ['CI','GITHUB_ACTIONS','GITLAB_CI','CI_NAME','BUILDER','BUILD'].filter((v) => !!process.env[v]);
  console.log('Skipping react-snap prerender on CI/Vercel environment.' +
    (detectedVercel.length ? ` Detected Vercel vars: ${detectedVercel.join(',')}.` : '') +
    (detectedCI.length ? ` Detected CI vars: ${detectedCI.join(',')}.` : ''));
  process.exit(0);
}

try {
  console.log('Running react-snap prerender...');
  execSync('npx react-snap', { stdio: 'inherit' });
} catch (err) {
  console.warn('react-snap failed locally but will not fail the build');
  process.exit(0);
}
