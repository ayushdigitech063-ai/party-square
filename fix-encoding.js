const fs = require('fs');
const path = require('path');

const directory = 'c:/party-square/party-square/app';

function fixEncoding(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixEncoding(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      content = content.replace(/â‚¹/g, '₹');
      content = content.replace(/Â·/g, '·');
      content = content.replace(/Â/g, ''); // lingering Â from nbsp or similar
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed encoding in: ${fullPath}`);
      }
    }
  }
}

fixEncoding(directory);
console.log("Encoding fix complete.");
