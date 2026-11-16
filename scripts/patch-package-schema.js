const fs = require('fs');
const file = 'c:/party-square/decoration-backend/src/models/Package.js';
let content = fs.readFileSync(file, 'utf8');
if (!content.includes('serviceablePincodes')) {
  content = content.replace(
    'features: [{ type: String }]',
    'features: [{ type: String }],\n  serviceablePincodes: [{ type: String }]'
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log('Added serviceablePincodes to Package schema');
} else {
  console.log('Package schema already includes serviceablePincodes');
}
