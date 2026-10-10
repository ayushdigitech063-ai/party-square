const fs = require('fs');
let c = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

c = c.replace(/\ufffd,1/g, '₹');
c = c.replace(/,1/g, '₹');
c = c.replace(/\?,1/g, '₹');

// Fix ` A- ${quantity}` specifically
c = c.replace(/ A- \$\{quantity\}/g, ' × ${quantity}');

// Fix `A Book now`
c = c.replace(/A\ufffd Book now/g, '→ Book now');
c = c.replace(/A\? Book now/g, '→ Book now');

fs.writeFileSync('app/card/[id]/page.tsx', c, 'utf8');
console.log('Fixed script');
