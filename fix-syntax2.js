const fs = require('fs');
let c = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

let lines = c.split('\n');
let newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const formattedOriginalPrice = ')) {
    newLines.push('  const formattedOriginalPrice = `₹${Math.round(originalPrice).toLocaleString("en-IN")}`;');
    skip = true;
    continue;
  }
  
  if (skip) {
    if (lines[i].includes(')}`;')) {
      skip = false;
    }
    continue;
  }
  
  newLines.push(lines[i]);
}

fs.writeFileSync('app/card/[id]/page.tsx', newLines.join('\n'), 'utf8');
console.log('Fixed dangling code');
