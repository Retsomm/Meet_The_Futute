#!/usr/bin/env node

console.log('\n🔧 NextAuth OAuth 設定檢查工具\n');

// 檢查環境變數
console.log('📋 當前環境變數:');
console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || '❌ 未設定'}`);
console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? '✅ 已設定' : '❌ 未設定'}`);
console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? '✅ 已設定' : '❌ 未設定'}`);
console.log(`GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? '✅ 已設定' : '❌ 未設定'}`);

console.log('\n🌐 需要設定的重定向 URI:');
console.log('開發環境: http://localhost:3000/api/auth/callback/google');
console.log('生產環境: https://meetthefuture.vercel.app/api/auth/callback/google');

console.log('\n📝 Google Cloud Console 設定步驟:');
console.log('1. 前往: https://console.cloud.google.com/');
console.log('2. 選擇你的專案');
console.log('3. 前往 APIs & Services > Credentials');
console.log('4. 找到你的 OAuth 2.0 Client IDs');
console.log('5. 在 "Authorized redirect URIs" 中添加:');
console.log('   - http://localhost:3000/api/auth/callback/google');
console.log('   - https://meetthefuture.vercel.app/api/auth/callback/google');

console.log('\n🚀 完成設定後重新啟動開發伺服器:');
console.log('npm run dev');
