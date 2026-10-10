const fs = require('fs');
const path = require('path');

const directory = 'c:/party-square/party-square/app';

function fixPrices(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixPrices(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      content = content.replace(/Ã¢â€š¹/g, '₹');
      // Just in case it's Â· for dot
      content = content.replace(/Â·/g, '·');
      content = content.replace(/A,/g, '·'); // the breadcrumb separator in app/card/[id]/page.tsx
      content = content.replace(/A\?"/g, '×'); // A?" in quantity
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed prices in: ${fullPath}`);
      }
    }
  }
}

fixPrices(directory);
console.log("Price fix complete.");
