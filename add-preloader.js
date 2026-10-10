const fs = require('fs');

let c = fs.readFileSync('app/layout.tsx', 'utf8');

if (!c.includes('import Preloader')) {
  c = c.replace(
    'import WhatsAppFloat from "./components/WhatsAppFloat";',
    'import WhatsAppFloat from "./components/WhatsAppFloat";\nimport Preloader from "./components/Preloader";'
  );
}

if (!c.includes('<Preloader />')) {
  c = c.replace(
    '<Toaster position="top-right" />',
    '<Preloader />\n        <Toaster position="top-right" />'
  );
}

fs.writeFileSync('app/layout.tsx', c, 'utf8');
console.log('Added Preloader to layout.tsx');
