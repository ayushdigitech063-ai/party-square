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
    } else if (file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const allFiles = walk('c:/party-square/party-square/app');
const results = {
  fontImports: [],
  inlineFonts: [],
  differentGreens: new Set(),
  differentBackgrounds: new Set()
};

allFiles.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  const rel = f.replace(/\\/g, '/').replace('c:/party-square/party-square/app/', '');
  
  // Font imports
  const fontMatches = code.match(/fonts\.googleapis\.com[^\s"']+/g);
  if (fontMatches) {
    results.fontImports.push({ file: rel, fonts: fontMatches });
  }

  // Inline fontFamily
  const inline = code.match(/fontFamily\s*:\s*["'][^"']+["']/g);
  if (inline) {
    results.inlineFonts.push({ file: rel, styles: inline });
  }

  // Colors
  const hexes = code.match(/#[a-fA-F0-9]{6}/g);
  if (hexes) {
    hexes.forEach(h => {
      const lower = h.toLowerCase();
      // check greens
      if (['#8cbc67', '#7ab055', '#7ba859', '#558234', '#132c20', '#10b981', '#059669', '#15803d', '#16a34a', '#22c55e'].includes(lower)) {
        results.differentGreens.add(lower);
      }
      // check backgrounds
      if (['#fcfbf7', '#eef6eb', '#eef6e8', '#f3efe9', '#faf8f5', '#faf5eb', '#faf7f2', '#f9f9f9', '#ffffff'].includes(lower)) {
        results.differentBackgrounds.add(lower);
      }
    });
  }
});

console.log('Font Imports found:', JSON.stringify(results.fontImports, null, 2));
console.log('Inline Font Families found:', JSON.stringify(results.inlineFonts, null, 2));
console.log('Different Greens used across pages:', Array.from(results.differentGreens));
console.log('Different Warm/Light Backgrounds used across pages:', Array.from(results.differentBackgrounds));
