const fs = require('fs');
const file = 'c:/party-square/party-square/app/components/AddOneSection.tsx';
let code = fs.readFileSync(file, 'utf8');

// Import fetchAddOns from api
if (!code.includes('fetchAddOns')) {
  code = code.replace(
    'import {',
    'import { fetchAddOns } from "@/app/lib/api";\nimport {'
  );
}

// Add state for dynamic addons
if (!code.includes('dynamicAddons')) {
  code = code.replace(
    'const [showAllAddons, setShowAllAddons] = useState(false);',
    `const [showAllAddons, setShowAllAddons] = useState(false);
  const [dynamicAddons, setDynamicAddons] = useState<AddOnItem[]>(ADDON_PRODUCTS);

  useEffect(() => {
    async function loadLiveAddons() {
      try {
        const live = await fetchAddOns();
        if (Array.isArray(live) && live.length > 0) {
          const mapped: AddOnItem[] = live.map((item: any) => ({
            id: item._id || item.id,
            name: item.name,
            category: item.category || "recommended",
            price: Number(item.price) || 0,
            image: item.image,
            description: item.description || "",
            details: item.details || "",
            popular: !!item.popular
          }));
          setDynamicAddons(mapped);
        }
      } catch (e) {
        // Fallback to static ADDON_PRODUCTS
      }
    }
    loadLiveAddons();
  }, []);`
  );

  // Replace filteredProducts to use dynamicAddons
  code = code.replace(
    'if (activeCategory === "all") return ADDON_PRODUCTS;',
    'if (activeCategory === "all") return dynamicAddons;'
  );
  code = code.replace(
    'return ADDON_PRODUCTS.filter((item) => item.category === "recommended" || item.popular);',
    'return dynamicAddons.filter((item) => item.category === "recommended" || item.popular);'
  );
  code = code.replace(
    'return ADDON_PRODUCTS.filter((item) => item.category === activeCategory);',
    'return dynamicAddons.filter((item) => item.category === activeCategory);'
  );
  code = code.replace(
    '}, [activeCategory]);',
    '}, [activeCategory, dynamicAddons]);'
  );

  fs.writeFileSync(file, code, 'utf8');
  console.log('AddOneSection updated to use dynamic API add-ons');
} else {
  console.log('Already includes dynamicAddons');
}
