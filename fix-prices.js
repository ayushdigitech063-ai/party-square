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
      
      // Match `A...s1${` or `A...s1 `
      content = content.replace(/A[^\$]*?s1/g, '₹');
      // Fix instances where it got replaced incorrectly
      content = content.replace(/₹\$/g, '₹$');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed prices in: ${fullPath}`);
      }
    }
  }
}

fixPrices(directory);
console.log("Price fix complete.");
