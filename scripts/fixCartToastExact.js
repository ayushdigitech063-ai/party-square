const fs = require('fs');
const p = 'party-square/app/context/CartContext.tsx';
let c = fs.readFileSync(p, 'utf8');

// The line is c3a2 c593 e280a2 (\u00e2\u0153\u2022)
c = c.replace(/aria-label="Close"[\r\n\s>]+[^\n<]+[\r\n\s]+<\/button>/, 'aria-label="Close">\n          <X size={16} />\n        </button>');

fs.writeFileSync(p, c, 'utf8');
console.log('Cleaned up CartContext toast icon!');
