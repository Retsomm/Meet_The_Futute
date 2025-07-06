const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 確保 icons 目錄存在
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 需要生成的圖標尺寸
const sizes = [
  { size: 57, name: 'icon-57x57.png' },
  { size: 60, name: 'icon-60x60.png' },
  { size: 72, name: 'icon-72x72.png' },
  { size: 76, name: 'icon-76x76.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 114, name: 'icon-114x114.png' },
  { size: 120, name: 'icon-120x120.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 180, name: 'icon-180x180.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' }
];

async function generateIcons() {
  try {
    const logoPath = path.join(__dirname, 'public', 'logo.png');
    
    for (const { size, name } of sizes) {
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(iconsDir, name));
      
      console.log(`✓ 已生成 ${name} (${size}x${size})`);
    }
    
    console.log('\n✅ 所有圖標已成功生成！');
  } catch (error) {
    console.error('❌ 生成圖標時出錯:', error);
  }
}

generateIcons();
