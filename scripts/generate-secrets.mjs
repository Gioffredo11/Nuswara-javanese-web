import crypto from 'node:crypto';

// Generate a cryptographically secure random string with given character set
function generateSecurePassword(length = 32) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}';
  const bytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[bytes[i] % charset.length];
  }
  return result;
}

// Generate high-entropy hex secret (48-64 bytes)
function generateHexSecret(bytes = 48) {
  return crypto.randomBytes(bytes).toString('hex');
}

export function generateSecrets() {
  const sessionSecret = generateHexSecret(48); // 96 hex chars
  const adminPassword = generateSecurePassword(32);
  
  return {
    sessionSecret,
    adminPassword,
    timestamp: new Date().toISOString(),
  };
}

if (process.argv[1]?.endsWith('generate-secrets.mjs')) {
  const secrets = generateSecrets();
  console.log('\n======================================================');
  console.log('   NUSWARA PRODUCTION SECRETS GENERATOR');
  console.log('======================================================\n');
  console.log('Salin nilai di bawah ini ke Environment Variables hosting (Vercel / VPS / Cloudflare):\n');
  console.log(`SESSION_SECRET="${secrets.sessionSecret}"`);
  console.log(`ADMIN_PASSWORD="${secrets.adminPassword}"`);
  console.log('\n======================================================\n');
}
