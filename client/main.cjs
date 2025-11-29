const fs = require('fs');
const path = require('path');

// Images path inside public folder
const imagesDir = path.join(__dirname, 'public/images');

const imageFiles = fs.readdirSync(imagesDir);

const arrayContent = `export const imageNames = ${JSON.stringify(imageFiles, null, 2)};`;

fs.writeFileSync(path.join(__dirname, 'src/imageArray.js'), arrayContent);

console.log("✅ imageArray.js file created successfully!");