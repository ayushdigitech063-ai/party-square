const fs = require('fs');
const p = 'party-square/app/card/[id]/page.tsx';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/toast\(`Removed \${addon\.name}`[\s\S]*?\);/, 'toast(`Removed ${addon.name}`);');
fs.writeFileSync(p, c, 'utf8');
console.log('Fixed card toast');
