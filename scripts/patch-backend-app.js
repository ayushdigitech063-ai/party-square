const fs = require('fs');
const file = 'c:/party-square/decoration-backend/src/app.js';
let content = fs.readFileSync(file, 'utf8');
if (!content.includes('addOnRoutes')) {
  content = content.replace(
    "const staffRoutes = require('./routes/staffRoutes');",
    "const staffRoutes = require('./routes/staffRoutes');\nconst addOnRoutes = require('./routes/addOnRoutes');"
  );
  content = content.replace(
    "app.use('/api/staff', staffRoutes);",
    "app.use('/api/staff', staffRoutes);\napp.use('/api/addons', addOnRoutes);"
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log('addOnRoutes added to app.js');
} else {
  console.log('Already includes addOnRoutes');
}
