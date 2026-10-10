const fs = require('fs');
let c = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

c = c.replace(/const formattedTotalPrice = .*/g, 'const formattedTotalPrice = `₹${totalPrice.toLocaleString("en-IN")}`;');
c = c.replace(/const formattedGrandTotal = .*/g, 'const formattedGrandTotal = `₹${grandTotal.toLocaleString("en-IN")}`;');
c = c.replace(/A- \$\{quantity\}/g, '× ${quantity}');
c = c.replace(/\{formattedGrandTotal\} .*? Book now/, '{formattedGrandTotal} → Book now');

fs.writeFileSync('app/card/[id]/page.tsx', c, 'utf8');
console.log('Fixed formatting strings');
