#!/usr/bin/env node

// 生成安全的 NEXTAUTH_SECRET
const crypto = require('crypto');

function generateSecret() {
  return crypto.randomBytes(32).toString('base64');
}

console.log('生成安全的 NEXTAUTH_SECRET:');
console.log(generateSecret());
console.log('\n請將此值複製到您的 Vercel 環境變數中！');
