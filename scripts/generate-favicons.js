const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceImage = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\2f611b7a-6407-43dc-9957-e44b8f40ca65\\media__1776724911085.png';
const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generateFavicons() {
  try {
    console.log('Generating favicons from:', sourceImage);

    // 32x32 PNG for standard favicon
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'icon.png'));
    console.log('Created icon.png (32x32)');

    // 32x32 "ICO" (using PNG format which is widely supported even with .ico extension)
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('Created favicon.ico (32x32)');

    // 180x180 for Apple devices
    await sharp(sourceImage)
      .resize(180, 180)
      .toFile(path.join(publicDir, 'apple-icon.png'));
    console.log('Created apple-icon.png (180x180)');

    // 512x512 for high-res / manifest
    await sharp(sourceImage)
      .resize(512, 512)
      .toFile(path.join(publicDir, 'icon-512.png'));
    console.log('Created icon-512.png (512x512)');

    console.log('Favicon generation complete!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
