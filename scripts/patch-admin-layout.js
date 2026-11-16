const fs = require('fs');
const file = 'c:/party-square/party-square/app/admin/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add Sparkles or PlusCircle to lucide imports if not there
if (!content.includes('Sparkles,')) {
  content = content.replace('LayoutDashboard,', 'LayoutDashboard,\n  Sparkles,');
}

// Add Add-ons Manager to navItems
if (!content.includes('/admin/addons')) {
  content = content.replace(
    '{ name: "Pricing Packages", href: "/admin/packages", icon: PackageIcon },',
    '{ name: "Pricing Packages", href: "/admin/packages", icon: PackageIcon },\n    { name: "Add-ons Manager", href: "/admin/addons", icon: Sparkles },'
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log('Added Add-ons Manager to navItems');
} else {
  console.log('Already includes /admin/addons');
}
