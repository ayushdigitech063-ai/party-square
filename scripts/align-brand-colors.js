const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.next')) {
        results = results.concat(walk(full));
      }
    } else if (file.endsWith('.tsx')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('c:/party-square/party-square/app');
let modifiedCount = 0;

files.forEach(f => {
  let code = fs.readFileSync(f, 'utf8');
  let original = code;

  // 1. Standardize minor green hex variations to official brand green
  code = code.replace(/#7ba859/gi, '#8CBC67');
  code = code.replace(/#EEF6E8/gi, '#EEF6EB');

  // 2. Standardize Navratri colors to brand green/gold theme
  if (f.includes('navratri')) {
    code = code.replace(/bg-rose-600/g, 'bg-[#8CBC67]');
    code = code.replace(/hover:bg-rose-700/g, 'hover:bg-[#7AB055]');
    code = code.replace(/text-rose-400/g, 'text-[#8CBC67]');
    code = code.replace(/text-rose-300/g, 'text-[#8CBC67]');
    code = code.replace(/text-rose-600/g, 'text-[#8CBC67]');
    code = code.replace(/text-rose-700/g, 'text-[#8CBC67]');
    code = code.replace(/bg-rose-500\/20/g, 'bg-[#EEF6EB]');
    code = code.replace(/border-rose-500\/40/g, 'border-[#8CBC67]/40');
    code = code.replace(/bg-rose-100/g, 'bg-[#EEF6EB]');
    code = code.replace(/selection:bg-rose-600/g, 'selection:bg-[#8CBC67]');
  }

  // 3. Standardize Independence Day & Lohri colors to brand green/gold theme
  if (f.includes('independenceday') || f.includes('lohri')) {
    code = code.replace(/bg-orange-600/g, 'bg-[#8CBC67]');
    code = code.replace(/hover:bg-orange-700/g, 'hover:bg-[#7AB055]');
    code = code.replace(/bg-orange-500/g, 'bg-[#8CBC67]');
    code = code.replace(/text-orange-300/g, 'text-[#D7A84B]');
    code = code.replace(/text-orange-400/g, 'text-[#D7A84B]');
    code = code.replace(/border-orange-500\/40/g, 'border-[#8CBC67]/40');
    code = code.replace(/bg-orange-500\/20/g, 'bg-[#EEF6EB]');
    code = code.replace(/selection:bg-orange-600/g, 'selection:bg-[#8CBC67]');
  }

  // 4. Hero.tsx background: change #F3EFE9 to #FCFBF7 for seamless warm-cream blending
  if (f.includes('Hero.tsx')) {
    code = code.replace(/bg-\[#F3EFE9\]/g, 'bg-[#FCFBF7]');
  }

  if (code !== original) {
    fs.writeFileSync(f, code, 'utf8');
    modifiedCount++;
  }
});

console.log('Successfully aligned and standardized colors in ' + modifiedCount + ' files.');
