import { execSync } from 'child_process';
import fs from 'fs';

// Deteksi apakah sedang berjalan di CI / Cloudflare Build Container
const isCI =
  Boolean(process.env.CI) ||
  Boolean(process.env.CF_PAGES) ||
  Boolean(process.env.CLOUDFLARE_PAGES) ||
  fs.existsSync('/opt/buildhome');

console.log(`[cloudflare-postinstall] Environment check: isCI=${isCI}`);

if (isCI) {
  console.log('[cloudflare-postinstall] 🚀 Cloudflare CI detected.');
  try {
    console.log('[cloudflare-postinstall] Running prisma generate...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('[cloudflare-postinstall] Triggering opennextjs-cloudflare build...');
    execSync('npx opennextjs-cloudflare build', { stdio: 'inherit' });

    console.log('[cloudflare-postinstall] ✅ OpenNext build successfully completed!');
  } catch (error) {
    console.error('[cloudflare-postinstall] ❌ Build step failed in CI:', error);
    process.exit(1);
  }
} else {
  console.log('[cloudflare-postinstall] Local environment detected. Skipping automatic CI build hook.');
}
