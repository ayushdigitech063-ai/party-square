const fs = require('fs');
let c = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

c = c.replace(/bg-\[#8B3F05\] hover:bg-\[#713200\]/g, 'bg-[#8CBC67] hover:bg-[#7AB055]');

fs.writeFileSync('app/card/[id]/page.tsx', c, 'utf8');
console.log('Fixed button color');
