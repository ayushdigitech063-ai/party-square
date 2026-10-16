const fs = require('fs');
const path = require('path');

function fixFile(file) {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');
  // Remove all 'use client' occurrences
  code = code.replace(/['"]use client['"];?\s*/g, '');
  // Prepend 'use client' at line 1
  code = '"use client";\n\n' + code.trimStart();
  fs.writeFileSync(file, code, 'utf8');
  console.log('Fixed use client for:', file);
}

const dir = 'c:/party-square/party-square/app';
function walk(d) {
  const list = fs.readdirSync(d);
  for (const item of list) {
    const full = path.join(d, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.tsx')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('useState') || c.includes('useEffect') || c.includes('useWishlist') || c.includes('useCart') || c.includes('useRouter')) {
        fixFile(full);
      }
    }
  }
}

walk(dir);
console.log('All files verified with use client at line 1!');
