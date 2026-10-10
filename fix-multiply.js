const fs = require('fs');
const path = require('path');

const filePath = 'c:/party-square/party-square/app/card/[id]/page.tsx';

let content = fs.readFileSync(filePath, 'utf8');

// Replace corrupted multiply sign
content = content.replace(/A[^\$]*?"/g, '×');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed multiply sign.");
