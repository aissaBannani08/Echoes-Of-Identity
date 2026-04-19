const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/sequence');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function processImages() {
  console.log(`Found ${files.length} images to optimize...`);
  let count = 0;
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const baseName = path.basename(file, '.png');
    const outputPath = path.join(dir, `${baseName}.webp`);
    
    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(outputPath);
      
    // Delete original png
    fs.unlinkSync(inputPath);
    
    count++;
    if (count % 20 === 0) {
      console.log(`Processed ${count} / ${files.length}`);
    }
  }
  console.log('All images optimized perfectly!');
}

processImages().catch(console.error);
