const fs = require('fs');
let c = fs.readFileSync('app/components/ProductCard.tsx', 'utf8');

c = c.replace(/const salePrice = Number\(product\.price\) \|\| 0;/, 'const salePrice = Number(product.price) || 0;');
c = c.replace(/const originalPrice = Number\(product\.originalPrice\) \|\| 0;/, 'const originalPrice = Number(product.originalPrice) || (salePrice * 1.25);');

fs.writeFileSync('app/components/ProductCard.tsx', c, 'utf8');
console.log('Fixed ProductCard originalPrice logic');
