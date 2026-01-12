#!/usr/bin/env node
// Skip react-snap when running on CI/Vercel to avoid missing system libs for Chromium.
import { execSync } from 'child_process';

const vercelEnvVars = ['VERCEL', 'VERCEL_ENV', 'VERCEL_URL', 'NOW', 'NOW_BUILDER', 'VERCEL_GIT_PROVIDER'];
const isVercel = vercelEnvVars.some((v) => !!process.env[v]);
const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS || !!process.env.GITLAB_CI || !!process.env.CI_NAME || !!process.env.BUILDER || !!process.env.BUILD;

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
  console.warn('react-snap failed locally but will not fail the build:', err.message);
  process.exit(0);
}
