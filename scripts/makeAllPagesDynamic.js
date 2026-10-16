const fs = require('fs');
const path = require('path');

const PAGES = [
  // Ganesh Chaturthi
  {
    file: 'c:/party-square/party-square/app/Festivals/ganeshchaturthi/page.tsx',
    varName: 'ganeshProducts',
    searchQuery: "{ search: 'ganesh', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/Festivals/ganeshchaturthi/all-products/page.tsx',
    varName: 'ganeshProducts',
    searchQuery: "{ search: 'ganesh', limit: 100 }",
  },
  // Navratri
  {
    file: 'c:/party-square/party-square/app/Festivals/navratri/page.tsx',
    varName: 'navratriProducts',
    searchQuery: "{ search: 'navratri', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/Festivals/navratri/all-products/page.tsx',
    varName: 'navratriProducts',
    searchQuery: "{ search: 'navratri', limit: 100 }",
  },
  // Christmas
  {
    file: 'c:/party-square/party-square/app/Festivals/christmas/page.tsx',
    varName: 'christmasProducts',
    searchQuery: "{ search: 'christmas', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/Festivals/christmas/all-products/page.tsx',
    varName: 'christmasProducts',
    searchQuery: "{ search: 'christmas', limit: 100 }",
  },
  // Janmashtami
  {
    file: 'c:/party-square/party-square/app/Festivals/janmasthmi/page.tsx',
    varName: 'janmashtamiProducts',
    searchQuery: "{ search: 'janmashtami', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/Festivals/janmasthmi/all-products/page.tsx',
    varName: 'janmashtamiProducts',
    searchQuery: "{ search: 'janmashtami', limit: 100 }",
  },
  // Independence Day
  {
    file: 'c:/party-square/party-square/app/Festivals/independenceday/page.tsx',
    varName: 'independencedayProducts',
    searchQuery: "{ search: 'independence', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/Festivals/independenceday/all-products/page.tsx',
    varName: 'independencedayProducts',
    searchQuery: "{ search: 'independence', limit: 100 }",
  },
  // Birthday
  {
    file: 'c:/party-square/party-square/app/services/birthday/page.tsx',
    varName: 'kidsbirthdayProducts',
    searchQuery: "{ category: 'birthday', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/services/birthday/all-products/page.tsx',
    varName: 'kidsbirthdayProducts',
    searchQuery: "{ category: 'birthday', limit: 100 }",
  },
  // Baby Welcome
  {
    file: 'c:/party-square/party-square/app/services/birthday/babaywelcom/page.tsx',
    varName: 'babyWelcomeDecor',
    searchQuery: "{ search: 'welcome', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/services/birthday/babaywelcom/all-products/page.tsx',
    varName: 'babyWelcomeDecor',
    searchQuery: "{ search: 'welcome', limit: 100 }",
  },
  // Father Birthday
  {
    file: 'c:/party-square/party-square/app/services/birthday/father/page.tsx',
    varName: 'fatherbirthdayproduct',
    searchQuery: "{ search: 'father', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/services/birthday/father/all-products/page.tsx',
    varName: 'fatherbirthdayproduct',
    searchQuery: "{ search: 'father', limit: 100 }",
  },
  // Mother Birthday
  {
    file: 'c:/party-square/party-square/app/services/birthday/mother/page.tsx',
    varName: 'motherbirthdayProducts',
    searchQuery: "{ search: 'mother', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/services/birthday/mother/all-products/page.tsx',
    varName: 'motherbirthdayProducts',
    searchQuery: "{ search: 'mother', limit: 100 }",
  },
  // Ring Decoration
  {
    file: 'c:/party-square/party-square/app/services/ring-decoration/page.tsx',
    varName: 'ringDecorationProducts',
    searchQuery: "{ category: 'ring-decoration', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/services/ring-decoration/all-products/page.tsx',
    varName: 'ringDecorationProducts',
    searchQuery: "{ category: 'ring-decoration', limit: 100 }",
  },
  // Wall Decoration
  {
    file: 'c:/party-square/party-square/app/services/wall-decoration/page.tsx',
    varName: 'wallDecorationProducts',
    searchQuery: "{ category: 'wall-decoration', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/services/wall-decoration/all-products/page.tsx',
    varName: 'wallDecorationProducts',
    searchQuery: "{ category: 'wall-decoration', limit: 100 }",
  },
  // Corporate Planner / About
  {
    file: 'c:/party-square/party-square/app/about/page.tsx',
    varName: 'corporateProducts',
    searchQuery: "{ category: 'corporate-planner', limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/about/all-products/page.tsx',
    varName: 'corporateProducts',
    searchQuery: "{ category: 'corporate-planner', limit: 100 }",
  },
  // Services Theme Decoration
  {
    file: 'c:/party-square/party-square/app/services/page.tsx',
    varName: 'decorationItems',
    searchQuery: "{ limit: 100 }",
  },
  {
    file: 'c:/party-square/party-square/app/services/all-products/page.tsx',
    varName: 'decorationItems',
    searchQuery: "{ limit: 100 }",
  },
];

for (const p of PAGES) {
  if (!fs.existsSync(p.file)) {
    console.warn(`File not found: ${p.file}`);
    continue;
  }
  let content = fs.readFileSync(p.file, 'utf8');

  // Skip if already has liveProducts state
  if (content.includes('liveProducts')) {
    console.log(`Skipping (already dynamic): ${p.file}`);
    continue;
  }

  // 1. Ensure fetchProducts is imported
  if (!content.includes('fetchProducts')) {
    content = `import { fetchProducts } from "@/app/lib/api";\n` + content;
  }

  // 2. Ensure useState, useEffect are imported
  if (!content.includes('useState')) {
    content = `import { useState, useEffect } from "react";\n` + content;
  } else if (!content.includes('useEffect')) {
    content = content.replace(/import\s*\{\s*useState\s*\}\s*from\s*["']react["'];?/, 'import { useState, useEffect } from "react";');
    content = content.replace(/import\s*React,\s*\{\s*useState\s*\}\s*from\s*["']react["'];?/, 'import React, { useState, useEffect } from "react";');
  }

  // 3. Insert liveProducts state and useEffect inside the default export function
  const funcMatch = content.match(/export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{/);
  if (!funcMatch) {
    console.warn(`Could not find export default function in ${p.file}`);
    continue;
  }

  const funcHeader = funcMatch[0];
  const hookCode = `
  const [liveProducts, setLiveProducts] = useState<any[]>(${p.varName});

  useEffect(() => {
    let active = true;
    async function loadDynamic() {
      try {
        const res = await fetchProducts(${p.searchQuery});
        let list: any[] = res.products || [];
        if (active && list.length > 0) {
          const mapped = list.map((item: any) => ({
            ...item,
            id: item._id || item.id || item.slug,
          }));
          const existingIds = new Set(mapped.map((m: any) => String(m.id)));
          const fallbackList = Array.isArray(${p.varName}) ? ${p.varName} : [];
          const combined = [...mapped, ...fallbackList.filter((x: any) => !existingIds.has(String(x.id)))];
          setLiveProducts(combined);
        }
      } catch (err) {
        console.warn("Could not load dynamic products for ${path.basename(path.dirname(p.file))}:", err);
      }
    }
    loadDynamic();
    return () => {
      active = false;
    };
  }, []);
`;

  content = content.replace(funcHeader, funcHeader + hookCode);

  // 4. Replace [...p.varName] with [...liveProducts]
  const regex = new RegExp(`\\[\\s*\\.\\.\\.${p.varName}\\s*\\]`, 'g');
  content = content.replace(regex, '[...liveProducts]');

  // Also replace ${p.varName}.length with liveProducts.length if found in text
  const lenRegex = new RegExp(`\\{\\s*${p.varName}\\.length\\s*\\}`, 'g');
  content = content.replace(lenRegex, '{liveProducts.length}');

  // In main pages with productsToDisplay = sortBy === "recommended" ? LOVED : sortedProducts,
  // ensure productsToDisplay = sortedProducts; so new items appear immediately!
  content = content.replace(
    /const productsToDisplay =\s*sortBy === "recommended" \? \w+ : sortedProducts;/g,
    'const productsToDisplay = sortedProducts;'
  );

  fs.writeFileSync(p.file, content, 'utf8');
  console.log(`Successfully made dynamic: ${p.file}`);
}

console.log("\nALL TARGET PAGES UPDATED TO DYNAMIC FETCHING!");
