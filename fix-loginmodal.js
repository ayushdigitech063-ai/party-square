const fs = require('fs');
const path = require('path');

const filePath = 'c:/party-square/party-square/app/components/LoginModal.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace button background and text
content = content.replace(/bg-\[\#F5C542\] text-sm font-bold text-\[\#302823\]/g, 'bg-[#8CBC67] text-sm font-bold text-[#FCFBF7]');
content = content.replace(/hover:bg-\[\#E8B52F\]/g, 'hover:bg-[#7AB055]');

// Replace borders and shadows
content = content.replace(/border-\[\#DCCFAF\]/g, 'border-[#E8E8E3]');
content = content.replace(/focus-within:border-\[\#D99A00\]/g, 'focus-within:border-[#8CBC67]');
content = content.replace(/focus-within:ring-\[\#F5C542\]\/20/g, 'focus-within:ring-[#8CBC67]/20');
content = content.replace(/border-\[\#E7DED1\]/g, 'border-[#E8E8E3]');

// Replace shadows
content = content.replace(/rgba\(217,154,0,0\.18\)/g, 'rgba(140,188,103,0.3)');
content = content.replace(/rgba\(217,154,0,0\.25\)/g, 'rgba(140,188,103,0.4)');

// Replace general text colors
content = content.replace(/text-\[\#756D66\]/g, 'text-[#6B706C]');
content = content.replace(/text-\[\#302823\]/g, 'text-[#202522]');
content = content.replace(/text-\[\#4D443D\]/g, 'text-[#202522]');
content = content.replace(/text-\[\#A69C92\]/g, 'text-[#6B706C]');

// Verify OTP input boxes
content = content.replace(/bg-\[\#FFFDF9\]/g, 'bg-white');
content = content.replace(/bg-\[\#FFF2C7\]/g, 'bg-[#EEF6EB]');
content = content.replace(/text-\[\#A66A00\]/g, 'text-[#8CBC67]');

fs.writeFileSync(filePath, content, 'utf8');
console.log("LoginModal colors updated.");
