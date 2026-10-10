const fs = require('fs');
const path = require('path');

const directory = 'c:/party-square/party-square/app';

function rebrand(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      rebrand(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      content = content.replace(/DreamDeco/g, 'Party Square');
      content = content.replace(/dreamdeco/g, 'partysquare');
      content = content.replace(/Dreamdeco/g, 'Party Square');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Rebranded in: ${fullPath}`);
      }
    }
  }
}

rebrand(directory);
console.log("Rebranding complete.");
