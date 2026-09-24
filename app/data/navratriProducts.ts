export interface Product {
  id: number;
  name: string;
  desc: string;
  fullDesc: string;
  price: string;
  image: string;
  features: string[];
}

export const navratriProducts: Product[] = [
  // Existing Products (ID 1 to 7)
  {
    id: 1,
    name: "Royal Golden Puja Thali Set",
    desc: "Exquisitely crafted brass puja thali with matching katoris and diya.",
    fullDesc: "Enhance your Navratri rituals with this premium designer brass puja thali, specially crafted for Ashtami and Navami prayers.",
    price: "799",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVHcU6-giSFZscF73kHAXMgYqEpej-UN7EkqmR71bQg&s=10",
    features: [
      "Pure brass material with anti-tarnish finish",
      "Includes diya, katori, and kumkum holders",
      "Traditional ethnic embossed design",
      "Ideal for daily puja and festival gifting"
    ]
  },
  {
    id: 2,
    name: "Silver Plated Auspicious Puja Thali",
    desc: "Traditional silver-finish decorated thali for Durga Puja.",
    fullDesc: "A stunning silver-plated ritual thali featuring intricate floral patterns to bring divine grace to your home mandir.",
    price: "1299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScN3MIZXfSdZ4zoHwhMNmg45jnmX48FccqpusG4amWig&s=10",
    features: [
      "Elegant silver-plated polish",
      "Rust-resistant sturdy build",
      "Complete set for ritual offerings",
      "Easy to maintain and store"
    ]
  },
  {
    id: 3,
    name: "Designer Navratri Lehenga Choli",
    desc: "Vibrant traditional garba outfit with heavy mirror and embroidery work.",
    fullDesc: "Step into the festive Garba nights with confidence in this colorful, lightweight, and heavily embroidered traditional chaniya choli.",
    price: "2499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3dPhDDvGA92oPYVCAXgj9rzLqUwXOEWVbNaFHulkLQ&s=10",
    features: [
      "Authentic mirror work and thread embroidery",
      "Comfortable breathable fabric for long dancing hours",
      "Vibrant traditional color combinations",
      "Available in multiple sizes"
    ]
  },
  {
    id: 4,
    name: "Traditional Bandhani Garba Dress",
    desc: "Classic Gujarati bandhani print outfit tailored for Navratri celebrations.",
    fullDesc: "Celebrate the nine nights of devotion and dance with this authentic bandhani print ensemble designed for ultimate comfort and style.",
    price: "1899",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2Q9l8Rx5PVy4hui1YjCLOsIfHg_uAH5qrf6ZlZUU1Q&s=10",
    features: [
      "Traditional Bandhani print design",
      "Soft cotton-blend fabric",
      "Durable stitching with beautiful flair",
      "Perfect for Garba and Dandiya nights"
    ]
  },
  {
    id: 5,
    name: "Navratri Special Prasad & Halwa Box",
    desc: "Pure ghee halwa, chana, and traditional sweets for Kanya Pujan.",
    fullDesc: "Delightful and pure traditional bhog box prepared specially for Ashtami/Navami Kanya Pujan and family offerings.",
    price: "499",
    image: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/03/bhog-1618802779-1648232428.jpg",
    features: [
      "Prepared in pure desi ghee",
      "Hygienically packed festive assortment",
      "Traditional taste for divine offerings",
      "Freshly prepared for festival days"
    ]
  },
  {
    id: 6,
    name: "Mata Rani Heavy Zari Chunni",
    desc: "Divine red velvet chunni adorned with gold lace and sequins.",
    fullDesc: "Offer your reverence to Goddess Durga with this premium heavy golden zari work red chunni, designed specifically for Mata ki Chowki.",
    price: "349",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxQq1hWiGdvfAMW-qyQhLp-45rzXiEY_P_d3fwrLfzQ&s=10",
    features: [
      "Rich velvet and net fabric",
      "Intricate golden lace border",
      "Durable and vibrant red color",
      "Suitable for all idol sizes"
    ]
  },
  {
    id: 7,
    name: "Fresh Marigold & Rose Flower Mala",
    desc: "Fragrant artificial-look decorative garland for Mata Rani's idol.",
    fullDesc: "Adorn the divine deity with this vibrant, long-lasting yellow and red floral garland that adds immense grace to your temple setup.",
    price: "299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNsfe4mdcmKAmZ08zceYizz1yNARdYGn1P0d1HUvh_wg&s=10",
    features: [
      "Fresh floral appearance",
      "Durable and reusable material",
      "Vibrant contrasting colors",
      "Perfect length for large and medium idols"
    ]
  },

  // Newly Added Pandal & Essentials Products (ID 8 to 18)
  {
    id: 8,
    name: "Divine Festive Flower Decoration",
    desc: "Fresh-look ornamental floral arrangements and decorative strings for temple sanctum.",
    fullDesc: "Transform your home temple with these beautiful, fresh-looking ornamental floral arrangements designed specifically for Navratri sanctum decorations.",
    price: "1299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJaZ1rs3P1NjRNAHiBEB7mDIa-vYBsdT6osygPyiU0yA&s=10",
    features: [
      "Fresh floral aesthetics without maintenance",
      "Durable decorative strings and hangings",
      "Easy to install across temple arches",
      "Adds auspicious festive charm"
    ]
  },
  {
    id: 9,
    name: "Mata Ji Heavy Zari Poshak",
    desc: "Exquisite designer attire and vastra set adorned with rich gold embroidery for Goddess Durga.",
    fullDesc: "Dress Goddess Durga in absolute grandeur with this exquisite designer vastra set featuring heavy gold zari embroidery and vibrant colors.",
    price: "1899",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZPiEhDgiTwnUG61tRbvZ76NvWeotRitwJclxG7hNEgg&s=10",
    features: [
      "Rich metallic zari embroidery work",
      "Premium fabric with vibrant finish",
      "Tailored fit for standard idol sizes",
      "Durable and lustrous appearance"
    ]
  },
  {
    id: 10,
    name: "Sacred Navratri Prasad Hamper",
    desc: "Pure traditional sweets and bhog essentials hygienically packaged for daily offerings.",
    fullDesc: "Offer pure devotion with this hygienically packaged festive assortment containing traditional sweets and sacred bhog items.",
    price: "599",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTanhSePMZJEwsmiFFf7T-eCYKewx84kaSKKSWVD-Q83A&s=10",
    features: [
      "Prepared with pure ingredients",
      "Hygienically sealed festive hamper",
      "Ideal for daily puja and family distribution",
      "Traditional authentic taste"
    ]
  },
  {
    id: 11,
    name: "Divine Mata Ji Royal Darbar Setup",
    desc: "Auspicious flower backdrops and traditional chowki setup for divine Mata Ji worship.",
    fullDesc: "Create a breathtaking royal darbar for Goddess Durga with auspicious flower backdrops and an elegantly styled traditional chowki setup.",
    price: "8499",
    image: "/mata.png",
    features: [
      "Complete royal chowki and backdrop arrangement",
      "Auspicious floral aesthetics",
      "Professional setup support available",
      "Ideal for home and society pandals"
    ]
  },
  {
    id: 12,
    name: "Grand Navdurga Floral Mandap",
    desc: "Exquisite floral decorations and lighting dedicated to the nine forms of Goddess Durga.",
    fullDesc: "Celebrate the nine divine forms with a grand floral mandap decorated with intricate lighting and vibrant traditional hangings.",
    price: "12999",
    image: "/mata1.png",
    features: [
      "Comprehensive mandap decoration design",
      "Integrated festive lighting elements",
      "Dedicated styling for Navdurga forms",
      "High-durability decorative materials"
    ]
  },
  {
    id: 13,
    name: "Akhand Jyoti & Prasad Station",
    desc: "Sacred corner arrangement for sacred flames, traditional offerings, and bhog.",
    fullDesc: "A dedicated sacred corner styling setup specifically curated to house the Akhand Jyoti lamp and organized traditional bhog stations.",
    price: "4599",
    image: "/mata2.png",
    features: [
      "Safe and aesthetic flame station layout",
      "Organized tiers for prasad offerings",
      "Fire-resistant decorative accents",
      "Easy to maintain cleanliness"
    ]
  },
  {
    id: 14,
    name: "Traditional Ghatasthapana Decor",
    desc: "Authentic ritualistic setup for Kalash sthapana with fresh mango leaves and holy coconuts.",
    fullDesc: "Perform your Ghatasthapana rituals with this authentic setup complete with traditional motifs, Kalash elements, and sacred foliage styling.",
    price: "6299",
    image: "/mata3.png",
    features: [
      "Authentic ritualistic design accuracy",
      "Includes sacred decorative Kalash elements",
      "Traditional mango leaf motifs",
      "Perfect centerpiece for Navratri puja"
    ]
  },
  {
    id: 15,
    name: "Vibrant Garba Night Stage & Backdrop",
    desc: "High-energy colorful stage styling with traditional hangings and ethnic motifs for dandiya nights.",
    fullDesc: "Set the floor on fire with this high-energy vibrant stage backdrop featuring traditional hangings and lively ethnic motifs for Garba nights.",
    price: "18999",
    image: "/garba.png",
    features: [
      "Energetic and colorful ethnic styling",
      "Durable stage backdrops and drapes",
      "Optimized for dance event visibility",
      "Quick assembly structure"
    ]
  },
  {
    id: 16,
    name: "Society Dandiya Ground Illumination",
    desc: "Complete ground fairy lighting, colorful umbrellas, and traditional dandiya event setup.",
    fullDesc: "Light up your society grounds with extensive fairy lights, colorful decorative umbrellas, and complete festive event infrastructure.",
    price: "24999",
    image: "/garba1.png",
    features: [
      "Extensive fairy lighting and canopy lights",
      "Colorful traditional umbrellas included",
      "Weather-resistant outdoor setup",
      "Ideal for large community gatherings"
    ]
  },
  {
    id: 17,
    name: "Traditional Chaniya Choli Photo Booth",
    desc: "Stunning ethnic photo corner styled with traditional props and colourful Gujarati prints.",
    fullDesc: "Capture unforgettable festive memories with an ethnic photo booth corner styled using authentic Gujarati prints and traditional props.",
    price: "9499",
    image: "/garba2.png",
    features: [
      "Instagram-friendly festive backdrop",
      "Includes traditional seating and props",
      "Vibrant Gujarati print elements",
      "Compact footprint for event venues"
    ]
  },
  {
    id: 18,
    name: "Dhol & Folk Beats Pandal Canopy",
    desc: "Overhead canopy drapes and vibrant cultural elements for community Garba celebrations.",
    fullDesc: "Enhance your community Garba celebrations with overhead canopy drapes and rich cultural elements designed for dhol and folk beats zones.",
    price: "15499",
    image: "/garba3.png",
    features: [
      "Overhead decorative fabric drapes",
      "Cultural folk-inspired motifs",
      "Sturdy canopy framework",
      "Creates an immersive festive ambiance"
    ]
  }
];