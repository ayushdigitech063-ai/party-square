export interface AddOnItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  details?: string;
  popular?: boolean;
}

export interface AddOnCategory {
  id: string;
  name: string;
  iconName: string;
}

export const ADDON_CATEGORIES: AddOnCategory[] = [
  { id: "all", name: "All", iconName: "Sparkles" },
  { id: "recommended", name: "Recommended", iconName: "Star" },
  { id: "alphabet-foil", name: "Alphabet Foil Balloons", iconName: "Type" },
  { id: "shape-foil", name: "Shape Foil Balloons", iconName: "Heart" },
  { id: "cake-table", name: "Cake Table", iconName: "Cake" },
  { id: "digit-foil", name: "Digit Foil Balloons", iconName: "Hash" },
  { id: "entry-arch", name: "Entry Gate Arch", iconName: "DoorOpen" },
  { id: "lights", name: "Lights", iconName: "Lightbulb" },
  { id: "buntings", name: "Occasion Buntings", iconName: "Flag" },
  { id: "occasion-foil", name: "Occasion Foil Balloons", iconName: "Gift" },
  { id: "led-digit", name: "Led Digit", iconName: "Zap" },
  { id: "neon-lights", name: "Neon Lights", iconName: "SunMedium" },
];

export const ADDON_PRODUCTS: AddOnItem[] = [
  {
    id: "addon-reel",
    name: "Instagram Reel (Collaboration)",
    category: "recommended",
    price: 2499,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    description: "A professional 30-50 second reel for Instagram, edited with trending audio and color grading.",
    details: "Shot on latest iPhone in 4K 60fps. Delivered within 24 hours of setup completion.",
    popular: true,
  },
  {
    id: "addon-board",
    name: "Personalized Welcome Board",
    category: "recommended",
    price: 1500,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
    description: "A customised and classic 30*20 inches wooden easel board with personalised theme artwork.",
    details: "Includes wooden tripod easel stand, printed theme chalkboard/acrylic board with custom names.",
    popular: true,
  },
  {
    id: "addon-balloons-25",
    name: "Add 25 Balloons",
    category: "recommended",
    price: 150,
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
    description: "Add 10 metallic balloons to the ceiling and 15 balloons scattered playfully on the floor.",
    details: "High quality 12-inch metallic latex balloons matching your chosen event theme colors.",
    popular: true,
  },
  {
    id: "addon-roses",
    name: "Bouquet of 15 Fresh Roses",
    category: "recommended",
    price: 899,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    description: "Bouquet of 15 hand-picked fresh red Dutch roses wrapped in elegant waterproof matte paper.",
    details: "Delivered fresh at the time of decoration setup. Includes personalized gift note.",
    popular: true,
  },
  {
    id: "addon-lanterns",
    name: "Add 8 Lanterns with Fairy Lights",
    category: "lights",
    price: 1799,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    description: "Add 8 warm paper/metal lanterns suspended with 4 strings of glowing fairy rice lights.",
    details: "Gives a warm vintage aesthetic. Perfect for dinner, terrace, and evening setups.",
    popular: false,
  },
  {
    id: "addon-guitarist",
    name: "Live Guitarist Performance",
    category: "recommended",
    price: 3000,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    description: "Professional live guitarist performing 4-5 romantic/celebration songs for 30 minutes.",
    details: "Guitarist arrives punctually at surprise time with acoustic guitar and cordless microphone.",
    popular: true,
  },
  {
    id: "addon-standee",
    name: "Add a Happy Birthday Balloon Bouquet",
    category: "occasion-foil",
    price: 499,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
    description: "Make the occasion zestful with a freestanding bouquet of vibrant foil & latex balloons.",
    details: "Freestanding bouquet placed next to cake table or entrance. Height approx 4 feet.",
    popular: false,
  },
  {
    id: "addon-bunting",
    name: "Add Theme Name Bunting",
    category: "buntings",
    price: 150,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    description: "Add a customized name bunting banner, handcrafted to spell out the celebrant's name.",
    details: "Laser cut paper bunting in matching color scheme attached with satin ribbon.",
    popular: false,
  },
  {
    id: "addon-alpha-foil",
    name: "Gold Alphabet Foil Balloons (Custom Name)",
    category: "alphabet-foil",
    price: 299,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    description: "16-inch golden metallic alphabet foil balloons spelling custom name (up to 8 letters).",
    details: "Air-filled metallic letters carefully placed on wall or backdrop using non-damaging tape.",
    popular: false,
  },
  {
    id: "addon-heart-foil",
    name: "Heart Shape Foil Balloons (Set of 5)",
    category: "shape-foil",
    price: 349,
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
    description: "18-inch metallic red & rose-gold heart foil balloons for romantic and anniversary vibes.",
    details: "Shiny reflective finish. Can be taped to wall or floated with ribbons.",
    popular: false,
  },
  {
    id: "addon-cake-table",
    name: "Decorated Round Cake Table Plinth",
    category: "cake-table",
    price: 1200,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
    description: "Aesthetic round cylinder pedestal cake plinth with floral base arrangement.",
    details: "Rental item collected after event. Safe load capacity up to 10kg.",
    popular: false,
  },
  {
    id: "addon-digit-foil",
    name: "Giant Milestone Digit Foil Balloon",
    category: "digit-foil",
    price: 199,
    image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80",
    description: "32-inch giant metallic number foil balloon celebrating age (e.g., 1, 18, 25, 50).",
    details: "Available in Gold, Rose Gold, and Silver. Please specify number during booking.",
    popular: false,
  },
  {
    id: "addon-entry-arch",
    name: "Spiral Balloon Entry Gate Arch",
    category: "entry-arch",
    price: 2199,
    image: "https://images.unsplash.com/photo-1502635380703-cfed21882429?auto=format&fit=crop&w=600&q=80",
    description: "Full 8-foot spiral balloon arch framing the main entrance for grand guest arrivals.",
    details: "Includes freestanding frame structure and approx 150-180 dual-tone metallic balloons.",
    popular: false,
  },
  {
    id: "addon-fairy-lights",
    name: "Warm Fairy Rice Lights (Set of 3)",
    category: "lights",
    price: 399,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    description: "20-meter warm golden LED fairy lights across walls, curtains, and canopies.",
    details: "Plug-and-play low power LED lights with multiple twinkling modes.",
    popular: true,
  },
  {
    id: "addon-led-digit",
    name: "Warm White LED Marquee Number",
    category: "led-digit",
    price: 799,
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80",
    description: "4-foot freestanding illuminated marquee digit with warm vintage Edison bulbs.",
    details: "Rental item setup and powered by our decorator. Safe, low voltage operation.",
    popular: false,
  },
  {
    id: "addon-neon",
    name: "Neon 'Happy Birthday' Acrylic Sign",
    category: "neon-lights",
    price: 999,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    description: "Bright warm-white or vibrant pink neon sign mounted on transparent acrylic sheet.",
    details: "Hangs securely on backdrop frame or curtain rod. Includes 12V adapter.",
    popular: true,
  },
];
