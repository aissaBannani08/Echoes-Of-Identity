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

    // Standard Favicon (32x32)
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'icon.png'));
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('Created 32x32 icons');

    // Google SEO Favicons (Multiples of 48)
    await sharp(sourceImage)
      .resize(48, 48)
      .toFile(path.join(publicDir, 'icon-48.png'));
    await sharp(sourceImage)
      .resize(96, 96)
      .toFile(path.join(publicDir, 'icon-96.png'));
    console.log('Created Google SEO icons (48x48, 96x96)');

    // Apple Touch Icon (180x180)
    await sharp(sourceImage)
      .resize(180, 180)
      .toFile(path.join(publicDir, 'apple-icon.png'));
    console.log('Created apple-icon.png (180x180)');

    // Large Manifest Icon (512x512)
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
