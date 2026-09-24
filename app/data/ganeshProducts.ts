export interface Product {
  id: number;
  name: string;
  desc: string;
  fullDesc: string;
  price: string;
  image: string;
  features: string[];
  // Extra properties for special cards like Mumbai Cha Raja
  theme?: string;
  gradientBg?: string;
  badgeColor?: string;
  isSpecialCard?: boolean;
}

export const ganeshProducts: Product[] = [
  {
    id: 1,
    name: "Aarti Thali",
    desc: "Exquisite traditional brass aarti thali set for auspicious rituals.",
    fullDesc: "Enhance your daily prayers and festival celebrations with this beautifully crafted traditional aarti thali. Made with fine detailing to hold all your puja essentials securely.",
    price: "699",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqZ0VztZVjNogJmN3BINCH-6MY3DyVxcgxt9T2L_UFQ&s=10",
    features: [
      "Traditional ethnic design",
      "Durable high-quality finish",
      "Easy to clean and maintain",
      "Perfect for gifting and personal use"
    ]
  },
  {
    id: 2,
    name: "Decoration Deepak",
    desc: "Handcrafted decorative deepak to illuminate your home mandap.",
    fullDesc: "Bring divine radiance to your home during Ganesh Chaturthi with these artistic decoration deepaks, designed to cast a warm and peaceful glow.",
    price: "499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnblBi6vk_BdWwK2ltpRLvyeDpPXTl_7vdeRHzBAYrAQ&s",
    features: [
      "Hand-painted intricate details",
      "Long-burning capacity",
      "Safe and sturdy base",
      "Reusable festive decor item"
    ]
  },
  {
    id: 3,
    name: "Ganesh Palki",
    desc: "Majestic ornamental palki for welcoming Lord Ganesha home.",
    fullDesc: "Give Bappa a royal welcome with this grand and beautifully decorated Ganesh Palki, crafted specifically to elevate your mandap aesthetics.",
    price: "2499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmzaUCjMCI10fVRrGxr7hM3MyQ-2IRNQImXlKUyLXnyw&s",
    features: [
      "Sturdy structural support for idols",
      "Rich traditional decorations and drapes",
      "Lightweight and easy to set up",
      "Grand visual appeal for home mandaps"
    ]
  },
  {
    id: 4,
    name: "Decoration Items",
    desc: "Assorted floral and lighting items for vibrant mandap backdrops.",
    fullDesc: "Complete your festival decoration package with this curated set of vibrant floral hangings and matching aesthetic lighting elements.",
    price: "1299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxRtaBFbfmQxotAcqghndBTbjVYUoCnf31mZBCUUPL5A&s=10",
    features: [
      "Vibrant traditional colors",
      "Reusable synthetic fabric flowers",
      "Easy to hang on walls and pillars",
      "Instant festive transformation"
    ]
  },
  {
    id: 5,
    name: "Modak Prasad",
    desc: "Delicious sacred modak sweet box offering for Bappa.",
    fullDesc: "Complete your pooja rituals with authentic, premium quality modaks prepared especially as a divine offering for Lord Ganesha.",
    price: "399",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDiIyp_L2aKBiOXH0oG10W6GOpAU0ROmsnq74xFishCA&s=10",
    features: [
      "Prepared with pure and premium ingredients",
      "Traditional authentic taste",
      "Hygenic festive packaging",
      "Ideal for prasad distribution"
    ]
  },
  {
    id: 6,
    name: "Royal Lotus Mandap Decor",
    desc: "Traditional floral backdrop with auspicious marigold and fresh greens.",
    fullDesc: "A traditional lotus-themed mandap backdrop styled with fresh marigold garlands and lush greens, bringing an auspicious and vibrant atmosphere to your home pandal.",
    price: "4999",
    image: "/ganesh1.png",
    features: [
      "Fresh marigold and floral styling",
      "Traditional lotus motif backdrop",
      "Suitable for home mandap setups",
      "Professional on-site installation"
    ]
  },
  {
    id: 7,
    name: "Traditional Banana Leaf Arch",
    desc: "Eco-friendly natural banana trunk styling with ethnic elements.",
    fullDesc: "An eco-friendly entrance arch crafted from natural banana trunks and ethnic decorative elements, perfect for a traditional and sustainable festival look.",
    price: "6499",
    image: "/ganesh2.png",
    features: [
      "Eco-friendly natural banana trunk styling",
      "Ethnic traditional decor elements",
      "Great for entrance and mandap gates",
      "Sustainable festival decoration"
    ]
  },
  {
    id: 8,
    name: "Golden Glow Backdrop",
    desc: "Warm fairy lights and rich fabric drapes for a divine aura.",
    fullDesc: "A warm, glowing backdrop combining soft fairy lights with rich fabric drapes to create a divine and inviting aura around the mandap.",
    price: "5999",
    image: "/ganesh3.png",
    features: [
      "Warm ambient fairy lighting",
      "Rich fabric drape styling",
      "Creates a divine glowing aura",
      "Ideal for evening aarti sessions"
    ]
  },
  {
    id: 9,
    name: "Divine Floral Jhula Setup",
    desc: "Exquisite swing decoration adorned with exotic imported flowers.",
    fullDesc: "An exquisite floral swing (jhula) setup adorned with exotic imported flowers, adding a graceful and divine touch to your celebration.",
    price: "7999",
    image: "/ganesh4.png",
    features: [
      "Exotic imported floral styling",
      "Elegant swing (jhula) structure",
      "Premium finish and detailing",
      "Statement piece for grand mandaps"
    ]
  },
  {
    id: 10,
    name: "Peacock Theme Mandap",
    desc: "Vibrant blue and green color palette inspired by Lord Ganesha's favorite motifs.",
    fullDesc: "A vibrant peacock-themed mandap in rich blue and green tones, inspired by motifs close to Lord Ganesha, creating a striking festive centerpiece.",
    price: "8499",
    image: "/ganesh5.png",
    features: [
      "Vibrant peacock-inspired color palette",
      "Rich blue and green styling",
      "Eye-catching thematic backdrop",
      "Grand centerpiece for celebrations"
    ]
  },
  {
    id: 11,
    name: "Modak Special Floral Setup",
    desc: "Sweet and charming floral arrangements focusing on divine elegance.",
    fullDesc: "A charming modak-inspired floral arrangement designed with divine elegance, adding a sweet and festive touch to the mandap decor.",
    price: "5299",
    image: "/ganesh6.png",
    features: [
      "Modak-inspired floral styling",
      "Elegant and charming design",
      "Fresh floral arrangement",
      "Adds a festive sweetness to decor"
    ]
  },
  {
    id: 12,
    name: "Royal Velvet Drapes Decor",
    desc: "Rich velvet textures combined with brass bells and warm lighting.",
    fullDesc: "A regal decoration featuring rich velvet drapes, traditional brass bells, and warm ambient lighting for a truly royal mandap experience.",
    price: "6999",
    image: "/ganesh7.png",
    features: [
      "Rich velvet fabric drapes",
      "Traditional brass bell accents",
      "Warm ambient lighting",
      "Royal and regal styling"
    ]
  },
  {
    id: 13,
    name: "Eco-Friendly Traditional Decor",
    desc: "Sustainable elements designed to keep traditions alive with modern finesse.",
    fullDesc: "A thoughtfully designed eco-friendly decoration set that blends traditional aesthetics with sustainable materials and modern finesse.",
    price: "4599",
    image: "/ganesh8.png",
    features: [
      "Sustainable, eco-friendly materials",
      "Traditional design with a modern touch",
      "Environmentally conscious celebration",
      "Elegant and understated finish"
    ]
  },
  // Mumbai Cha Raja Special Cards (Shifted here with unique IDs 14 to 17)
  {
    id: 14,
    name: "The Golden Imperial Raja",
    desc: "Majestic golden fabric backdrops paired with royal heavy props fit for a grand celebration.",
    fullDesc: "Majestic golden fabric backdrops paired with royal heavy props fit for a grand celebration, complete with professional large-scale setup.",
    price: "11999",
    image: "/ganesh11.png",
    theme: "Golden Glow",
    gradientBg: "from-amber-950 via-amber-900 to-neutral-950",
    badgeColor: "bg-amber-400 text-neutral-950",
    isSpecialCard: true,
    features: [
      "Majestic golden fabric backdrops",
      "Royal heavy props",
      "Includes Professional Setup & Lighting",
      "Grand visual impact for large spaces"
    ]
  },
  {
    id: 15,
    name: "The Emerald Divine Green",
    desc: "Lush green foliage arrangements symbolizing nature and fresh beginnings.",
    fullDesc: "Lush green foliage arrangements symbolizing nature and fresh beginnings, meticulously styled for grand mandap environments.",
    price: "10999",
    image: "/ganesh12.png",
    theme: "Green Halka",
    gradientBg: "from-emerald-950 via-emerald-900 to-neutral-950",
    badgeColor: "bg-emerald-400 text-neutral-950",
    isSpecialCard: true,
    features: [
      "Lush green foliage arrangements",
      "Symbolizes nature and fresh beginnings",
      "Includes Professional Setup & Lighting",
      "Earthy and divine aesthetic"
    ]
  },
  {
    id: 16,
    name: "The Crimson Royal Red",
    desc: "Deep auspicious red drapes combined with traditional brass elements.",
    fullDesc: "Deep auspicious red drapes combined with traditional brass elements, creating an intense and divine festive atmosphere.",
    price: "12499",
    image: "/ganesh13.png",
    theme: "Red Theme",
    gradientBg: "from-rose-950 via-rose-900 to-neutral-950",
    badgeColor: "bg-rose-500 text-white",
    isSpecialCard: true,
    features: [
      "Deep auspicious red drapes",
      "Traditional brass elements combination",
      "Includes Professional Setup & Lighting",
      "Royal and vibrant look"
    ]
  },
  {
    id: 17,
    name: "The Sapphire Celestial Blue",
    desc: "Serene celestial blue styling creating a peaceful atmosphere for Bappa.",
    fullDesc: "Serene celestial blue styling creating a peaceful atmosphere for Bappa, adorned with matching floral accents.",
    price: "11499",
    image: "/ganesh14.png",
    theme: "Blue Theme",
    gradientBg: "from-sky-950 via-sky-900 to-neutral-950",
    badgeColor: "bg-sky-400 text-neutral-950",
    isSpecialCard: true,
    features: [
      "Serene celestial blue styling",
      "Peaceful atmosphere creation",
      "Includes Professional Setup & Lighting",
      "Unique and calming aesthetic"
    ]
  }
];