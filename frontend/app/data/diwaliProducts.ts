

export interface Product {
  id: number;
  name: string;
  desc: string;
  fullDesc: string;
  price: string;
  image: string;
  features: string[];
}

export const diwaliProducts: Product[] = [
  // --- Regular Products (ID 1 to 12) ---
  {
    id: 1,
    name: "Royal Diwali Jhumar Decor",
    desc: "Beautiful hanging light decoration for perfect festive ambience.",
    fullDesc: "Bring home the ethereal glow of traditional festivities with our Royal Diwali Jhumar Decor. Handcrafted with precision, this stunning hanging piece combines warm LED lighting with rich traditional motifs to instantly elevate your living room or balcony decor.",
    price: "1499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWXyfF9nfnroUuX6Av8SOfExGrXBhPPk_p0m1ziMXIA&s=10",
    features: [
      "Energy-efficient warm LED lights included",
      "Durable weather-resistant hanging structure",
      "Easy to install and dismantle",
      "Handcrafted traditional golden finish"
    ]
  },
  {
    id: 2,
    name: "Traditional Marigold Toran",
    desc: "Auspicious artificial marigold door hanging for welcoming guests.",
    fullDesc: "Welcome Goddess Lakshmi and your guests with vibrant, everlasting artificial marigold torans. Designed to replicate fresh flowers without the hassle of wilting, it adds an authentic festive charm to your main entrance.",
    price: "799",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIcLI0T0papxZtiedcH-Q-qMwsYze3OdeSj65U9bVsQ&s=10",
    features: [
      "Made from premium reusable fabric material",
      "Standard size fits most main doors perfectly",
      "Washable and long-lasting quality",
      "Bright, auspicious yellow and orange hues"
    ]
  },
  {
    id: 3,
    name: "Designer Clay Diya Set",
    desc: "Hand-painted colorful earthen diyas for a glowing festival night.",
    fullDesc: "Light up every corner of your home with our exclusive set of hand-painted terracotta diyas. Each piece is uniquely crafted and painted by traditional artisans to add a colorful, ethnic touch to your Diwali celebrations.",
    price: "599",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsozqhCTvAr8JKXKeYznC9ZUWFuR8qes1fU8lDML8TfQ&s=10",
    features: [
      "Hand-painted by skilled rural artisans",
      "Eco-friendly natural clay material",
      "Reusable for multiple festive occasions",
      "Deep base to hold oil and wicks securely"
    ]
  },
  {
    id: 4,
    name: "Golden Fairy Light Curtain",
    desc: "Dazzling warm LED string lights to create a magical background.",
    fullDesc: "Transform your walls and backdrops into a cascading waterfall of golden lights. This fairy light curtain is ideal for creating stunning backdrops for puja spaces, living rooms, or festive photography.",
    price: "1299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgk_3j39VAteYS_TiWDdBHSEBHaUd6naw2kLwlqpabpA&s",
    features: [
      "Multiple lighting flash modes available",
      "Low power consumption LED bulbs",
      "Safe to touch, does not heat up quickly",
      "Covers wide wall areas seamlessly"
    ]
  },
  {
    id: 5,
    name: "Luxury Laxmi Pujan Mandap",
    desc: "Exquisite floral and fabric backdrop styling for auspicious prayers.",
    fullDesc: "Create a divine sanctum for Goddess Lakshmi with our Luxury Laxmi Pujan Mandap setup. Featuring rich fabrics, floral garlands, and subtle lighting, it provides a majestic setting for your family prayers.",
    price: "4999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO192jZsJKPNVAM00tqiDTQHuHqubkhGW8d2AmGsY1Xw&s=10",
    features: [
      "Complete backdrop and seating styling package",
      "Premium quality synthetic florals and fabrics",
      "Professional setup support included",
      "Auspicious color combinations"
    ]
  },
  {
    id: 6,
    name: "Crystal Tea Light Holders",
    desc: "Elegant glass candle holders reflecting sparkling golden lights.",
    fullDesc: "Add a touch of modern elegance to your traditional decor with these crystal-cut glass tea light holders. They catch the candle flame and refract mesmerizing patterns across your tables and corners.",
    price: "899",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2tnBN8VNbVUt13peyI-qs2j_y2h-rhXtSLfNQVMe4iQ&s=10",
    features: [
      "Heavy-duty premium crystal glass",
      "Heat resistant and safe for burning candles",
      "Enhances candle brightness multi-fold",
      "Pack of multiple shimmering pieces"
    ]
  },
  {
    id: 7,
    name: "Festive Rangoli LED Mat",
    desc: "Ready-to-place reusable decorative mat with embedded warm lights.",
    fullDesc: "Skip the hassle of elaborate powder rangolis with our ready-to-use illuminated rangoli mat. Simply place it at your doorstep or mandap entrance for an instant festive greeting.",
    price: "999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTYnqbSGyyAridzgJtj6zw5KIbPWs1cEABW4HpUeCh8Q&s=10",
    features: [
      "Embedded energy-efficient LED glow",
      "Lightweight, flexible, and waterproof material",
      "Reusable year after year",
      "Stunning traditional rangoli patterns"
    ]
  },
  {
    id: 8,
    name: "Royal Velvet Pujaasan",
    desc: "Premium velvet seating cloth with golden borders for idols.",
    fullDesc: "Give your idols a royal throne with our plush velvet pujaasan. Embellished with intricate golden lace borders, it adds dignity and reverence to your deity installations.",
    price: "649",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2tgfJLanIdkogxXq8Onup53NjiICqxv8qf3WwIChIg&s=10",
    features: [
      "Soft high-density velvet fabric",
      "Tarnish-resistant zari golden lace border",
      "Easy to fold and store",
      "Available in auspicious festive colors"
    ]
  },
  {
    id: 9,
    name: "Deepawali Gift Hamper",
    desc: "Curated gift box filled with scented candles, idols, and treats.",
    fullDesc: "Express your love and gratitude to family, friends, and colleagues with our luxury Deepawali gift hamper. Thoughtfully packed with aromatic candles, divine idols, and festive delights.",
    price: "2199",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZNjv_DwKadQA5CRD4inNcvnfH18D924s2j4w0Eiedrg&s=10",
    features: [
      "Beautifully packaged luxury gift box",
      "Includes scented soy wax candles & idol",
      "Premium presentation ready for gifting",
      "Customizable greeting card included"
    ]
  },
  {
    id: 10,
    name: "Society Entrance Arch Light",
    desc: "Massive welcoming entrance gate styling with heavy festive lights.",
    fullDesc: "Make your residential society or commercial complex stand out this festive season with our grand entrance arch lighting package, complete with heavy illumination and structural decorations.",
    price: "12499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToE2W6Df_O_E_h1T7GGPTSGPFLHQlqBIQRPXLyESavHw&s=10",
    features: [
      "Heavy-duty outdoor safe decorative lighting",
      "Professional installation and teardown service",
      "Grand visual impact for societies",
      "Custom banner space integration available"
    ]
  },
  {
    id: 11,
    name: "Hanging Star Lanterns",
    desc: "Paper and foil geometric star lamps for balcony and ceiling decor.",
    fullDesc: "Create a starry night right on your balcony with our geometric paper and foil star lanterns. When lit from inside, they cast a warm, breathtaking celestial glow across your outdoor spaces.",
    price: "499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVLIjm2500oUgLcD4DSBM-Lx0CHmE2nl5xBvlKtc5vYQ&s=10",
    features: [
      "Foldable 3D geometric design",
      "Durable weather-resistant foil finish",
      "Comes with bulb holder cord slot",
      "Stunning multi-color reflections"
    ]
  },
  {
    id: 12,
    name: "Premium Ethnic Flower Setup",
    desc: "Fresh-looking artistic floral arrangements for grand celebrations.",
    fullDesc: "Enhance your venue aesthetics with our premium ethnic floral setup. Expertly arranged floral strings and centerpieces designed to breathe life and elegance into your festive venue.",
    price: "3499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWRPaOIH1RG_DKgPz6cIJn12ZKPpXpLR19snjcN-eJlQ&s=10",
    features: [
      "Artistic professional floral arrangement",
      "Long-lasting fresh appearance",
      "Suitable for indoor and semi-outdoor venues",
      "Adds rich royal fragrance and look"
    ]
  },

  // --- Home Page Highlighted Products (ID 111 to 118) ---
  {
    id: 111,
    name: "Royal Marigold & Diya Mandap",
    desc: "Auspicious marigold strings combined with traditional clay diyas.",
    fullDesc: "Bring home the ethereal glow of traditional festivities with our Royal Marigold & Diya Mandap. Handcrafted with precision, this stunning arrangement combines warm LED lighting and fresh-look marigold strings with rich traditional motifs to instantly elevate your festive mandap or living room decor.",
    price: "5499",
    image: "/diwali1.png",
    features: [
      "Energy-efficient warm LED lights included",
      "Durable weather-resistant structure",
      "Easy to install and dismantle",
      "Handcrafted traditional golden finish"
    ]
  },
  {
    id: 112,
    name: "Grand Floral Laxmi Pujan Setup",
    desc: "Exquisite backdrop styling specially curated for auspicious Laxmi Pujan.",
    fullDesc: "Create a divine sanctum for Goddess Lakshmi with our Grand Floral Laxmi Pujan Setup. Featuring rich fabrics, designer floral garlands, and subtle warm lighting, it provides a majestic setting for your family prayers and festive celebrations.",
    price: "7999",
    image: "/diwali2.png",
    features: [
      "Complete backdrop and seating styling package",
      "Premium quality synthetic florals and fabrics",
      "Professional setup support included",
      "Auspicious color combinations"
    ]
  },
  {
    id: 113,
    name: "Golden Fairy Light Arch",
    desc: "Dazzling warm fairy lights creating a magical festive aura for your home.",
    fullDesc: "Transform your walls, arches, and backdrops into a cascading waterfall of golden lights. This fairy light setup is ideal for creating stunning backdrops for puja spaces, living rooms, or festive photography.",
    price: "6299",
    image: "/diwali3.png",
    features: [
      "Multiple lighting flash modes available",
      "Low power consumption LED bulbs",
      "Safe to touch, does not heat up quickly",
      "Covers wide wall areas seamlessly"
    ]
  },
  {
    id: 114,
    name: "Traditional Lotus & Toran Decor",
    desc: "Handcrafted torans and fresh lotus motifs to welcome Goddess Lakshmi.",
    fullDesc: "Welcome Goddess Lakshmi and your guests with vibrant, everlasting artificial marigold torans and lotus motifs. Designed to replicate fresh flowers without the hassle of wilting, it adds an authentic festive charm to your main entrance.",
    price: "4899",
    image: "/diwali4.png",
    features: [
      "Made from premium reusable fabric material",
      "Standard size fits most main doors perfectly",
      "Washable and long-lasting quality",
      "Bright, auspicious yellow and orange hues"
    ]
  },
  {
    id: 115,
    name: "Grand Gate & Entrance Arch",
    desc: "Massive welcoming entrance gate styling with heavy lights and floral pillars for housing societies.",
    fullDesc: "Make your residential society or commercial complex stand out this festive season with our grand entrance arch lighting package, complete with heavy illumination and structural decorations.",
    price: "18499",
    image: "/socity.png",
    features: [
      "Heavy-duty outdoor safe decorative lighting",
      "Professional installation and teardown service",
      "Grand visual impact for societies",
      "Custom banner space integration available"
    ]
  },
  {
    id: 116,
    name: "Society Compound Lighting & Stage",
    desc: "Complete community area illumination, stage decoration, and festive photo booths.",
    fullDesc: "Illuminate your entire society compound and community stage with synchronized festive lights, grand decorative structures, and specialized photo booths for residents.",
    price: "24999",
    image: "/socity2.png",
    features: [
      "Complete community area illumination",
      "Dedicated festive photo booth setup",
      "Safe outdoor wiring and professional management",
      "Energy-efficient LED setups"
    ]
  },
  {
    id: 117,
    name: "Community Center Floral Mandap",
    desc: "Vibrant traditional decor setup for grand community celebrations and gatherings.",
    fullDesc: "Vibrant traditional decor setup specially crafted for large community gatherings, society functions, and grand Diwali events.",
    price: "15499",
    image: "/socity1.png",
    features: [
      "Large-scale traditional floral arrangements",
      "Stage backdrop and seating decor",
      "Professional setup team included",
      "Durable festive materials"
    ]
  },
  {
    id: 118,
    name: "Festive Pathway & Tree Wrapping",
    desc: "Stunning fairy light tree wraps and illuminated pathways across the society complex.",
    fullDesc: "Enhance your campus walkways and trees with mesmerizing fairy light wraps, guiding residents through a brilliantly illuminated pathway.",
    price: "12999",
    image: "/socity4.png",
    features: [
      "Weather-proof outdoor fairy lights",
      "Professional tree trunk and branch wrapping",
      "Pathway marker illumination",
      "Low maintenance and high glow impact"
    ]
  }
];