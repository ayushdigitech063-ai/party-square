const fs = require('fs');
const path = require('path');

const directory = 'c:/party-square/party-square/app';

const replacements = [
  { regex: /\#1A1A1A/gi, replacement: '#202522' },
  { regex: /\#8C6D24/gi, replacement: '#8CBC67' },
  { regex: /\#E6DEC9/gi, replacement: '#E8E8E3' },
  { regex: /\#E2D2B0/gi, replacement: '#E8E8E3' },
  { regex: /\#F3EAD3/gi, replacement: '#EEF6EB' },
  { regex: /\#EEDCB9/gi, replacement: '#EEF6EB' },
  { regex: /\#7B6220/gi, replacement: '#8CBC67' },
  { regex: /\#5A5A5A/gi, replacement: '#6B706C' },
  { regex: /\#FBF8F2/gi, replacement: '#FCFBF7' },
  { regex: /\#FFFDF9/gi, replacement: '#FFFFFF' },
  { regex: /\#C5A059/gi, replacement: '#D7A84B' },
  // Also any remaining "amber" specific cases in MostLovedDecor or Work
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(directory);
console.log("Custom hex replacement complete.");
