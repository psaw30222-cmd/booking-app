#!/usr/bin/env node
// Skip react-snap when running on CI/Vercel to avoid missing system libs for Chromium.
const { execSync } = require('child_process');

const vercelEnvVars = ['VERCEL', 'VERCEL_ENV', 'VERCEL_URL', 'NOW', 'NOW_BUILDER', 'VERCEL_GIT_PROVIDER', 'VERCEL_REGION', 'VERCEL_PROJECT_ID', 'VERCEL_ORG_ID', 'VERCEL_BUILDER'];
const isVercel = vercelEnvVars.some((v) => !!process.env[v]) || process.cwd().includes('/vercel');
const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS || !!process.env.GITLAB_CI || !!process.env.CI_NAME || !!process.env.BUILDER || !!process.env.BUILD;

console.log('cwd: ' + process.cwd());
console.log('isVercel: ' + isVercel);
console.log('isCI: ' + isCI);

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
