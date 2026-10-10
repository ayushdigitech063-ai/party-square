const fs = require('fs');
let c = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

c = c.replace(/const numericPrice.*/, 'const numericPrice = Number(String(foundItem.price).replace(/[^0-9]/g, ""));');
c = c.replace(/const formattedTotalPrice.*/, 'const formattedTotalPrice = `₹${totalPrice.toLocaleString("en-IN")}`;');
c = c.replace(/const formattedOriginalPrice.*/, 'const formattedOriginalPrice = `₹${Math.round(originalPrice).toLocaleString("en-IN")}`;');
c = c.replace(/const formattedGrandTotal.*/, 'const formattedGrandTotal = `₹${grandTotal.toLocaleString("en-IN")}`;');
c = c.replace(/\{formattedGrandTotal\} .*? Book now/, '{formattedGrandTotal} → Book now');
c = c.replace(/A- \$\{quantity\}/, '× ${quantity}');
c = c.replace(/\{quantity > 1 \? ` .*? \$\{quantity\}` : ""\}/, '{quantity > 1 ? ` × ${quantity}` : ""}');

fs.writeFileSync('app/card/[id]/page.tsx', c, 'utf8');
console.log('Fixed script');
