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
      
      content = content.replace(/â‚¹/g, '₹');
      content = content.replace(/âˆ’/g, '-');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed symbols in: ${fullPath}`);
      }
    }
  }
}

fixPrices(directory);
console.log("Symbol fix complete.");
