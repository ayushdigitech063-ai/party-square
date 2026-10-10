const fs = require('fs');
let c = fs.readFileSync('app/card/page.tsx', 'utf8');

c = c.replace(
  'const originalPrice = toNumber(item.originalPrice);',
  'const originalPrice = toNumber(item.originalPrice) || (salePrice * 1.25);'
);

fs.writeFileSync('app/card/page.tsx', c, 'utf8');
console.log('Fixed pricing fallback in card page');
