const fs = require('fs');
let c = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

c = c.replace(/,1/g, '₹');
c = c.replace(/â‚¹/g, '₹');
c = c.replace(/A—/g, '—');
c = c.replace(/A\?/g, '→');
c = c.replace(/A-/g, '×');

fs.writeFileSync('app/card/[id]/page.tsx', c, 'utf8');
console.log('Fixed script');
