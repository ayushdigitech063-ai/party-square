const fs = require('fs');
const p = 'party-square/app/context/CartContext.tsx';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/aria-label="Close">[\s\S]*?<\/button>/, 'aria-label="Close">\n      <X size={16} />\n    </button>');
fs.writeFileSync(p, c, 'utf8');
console.log('Fixed close button icon cleanly');
