const fs = require('fs');
let c = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

c = c.replace(/const formattedOriginalPrice[\s\S]*?\)\}`;/g, 'const formattedOriginalPrice = `₹${Math.round(originalPrice).toLocaleString("en-IN")}`;');

fs.writeFileSync('app/card/[id]/page.tsx', c, 'utf8');
console.log('Fixed dangling brace');
