const fs = require('fs');
const path = require('path');

const directory = 'c:/party-square/party-square/app';

const replacements = [
  { regex: /from-amber-50/g, replacement: 'from-[#EEF6EB]' },
  { regex: /via-amber-50/g, replacement: 'via-[#EEF6EB]' },
  { regex: /to-amber-50/g, replacement: 'to-[#EEF6EB]' },
  { regex: /from-amber-100/g, replacement: 'from-[#EEF6EB]' },
  { regex: /via-amber-100/g, replacement: 'via-[#EEF6EB]' },
  { regex: /to-amber-100/g, replacement: 'to-[#EEF6EB]' },
  { regex: /from-amber-200/g, replacement: 'from-[#F7D6C7]' },
  { regex: /via-amber-200/g, replacement: 'via-[#F7D6C7]' },
  { regex: /to-amber-200/g, replacement: 'to-[#F7D6C7]' },
  { regex: /from-amber-300/g, replacement: 'from-[#D7A84B]' },
  { regex: /via-amber-300/g, replacement: 'via-[#D7A84B]' },
  { regex: /to-amber-300/g, replacement: 'to-[#D7A84B]' },
  { regex: /from-amber-400/g, replacement: 'from-[#8CBC67]' },
  { regex: /via-amber-400/g, replacement: 'via-[#8CBC67]' },
  { regex: /to-amber-400/g, replacement: 'to-[#8CBC67]' },
  { regex: /from-amber-500/g, replacement: 'from-[#8CBC67]' },
  { regex: /via-amber-500/g, replacement: 'via-[#8CBC67]' },
  { regex: /to-amber-500/g, replacement: 'to-[#8CBC67]' },
  { regex: /from-amber-600/g, replacement: 'from-[#8CBC67]' },
  { regex: /via-amber-600/g, replacement: 'via-[#8CBC67]' },
  { regex: /to-amber-600/g, replacement: 'to-[#8CBC67]' },
  { regex: /from-amber-900/g, replacement: 'from-[#202522]' },
  { regex: /via-amber-900/g, replacement: 'via-[#202522]' },
  { regex: /to-amber-900/g, replacement: 'to-[#202522]' },
  { regex: /shadow-amber-500/g, replacement: 'shadow-[#8CBC67]' },
  { regex: /shadow-amber-400/g, replacement: 'shadow-[#8CBC67]' },
  { regex: /ring-amber-100/g, replacement: 'ring-[#EEF6EB]' },
  { regex: /ring-amber-200/g, replacement: 'ring-[#F7D6C7]' },
  { regex: /text-amber-800/g, replacement: 'text-[#202522]' },
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
console.log("Final gradients replacement complete.");
