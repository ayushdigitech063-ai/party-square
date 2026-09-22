export interface Product {
  id: string;
  name: string;
  desc: string;
  fullDesc: string;
  price: number;
  image: string;
  features: string[];
}

export const lohriProducts: Product[] = [
  // --- Purane Products (Apni purani IDs ke sath safe hain) ---
  {
    id: "1",
    name: "Traditional Lohri Food Setup",
    desc: "Authentic festive revdi, popcorn, peanuts, and traditional sweet arrangement.",
    fullDesc: "Celebrate the warmth of Lohri with our authentic traditional food hamper, featuring sacred offerings and delicacies essential for the holy bonfire rituals.",
    price: 899,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHLkNYjpE_dhvWe90uNARAdmSF4wifoLR0fynT970mwQ&s=10",
    features: [
      "Traditional items included (Revdi, Peanut, Popcorn)",
      "Hygenic and festive packaging",
      "Perfect for bonfire offerings",
      "Authentic Punjabi taste"
    ]
  },
  {
    id: "2",
    name: "Festive Aarti Thali",
    desc: "Exquisite decorative brass thali for Lohri evening prayers.",
    fullDesc: "Complete your bonfire rituals and prayers with this beautifully crafted traditional aarti thali, designed to hold all pooja essentials gracefully.",
    price: 699,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDC6xChT7SI0-UPwH5Hycz2kPvv8XviMqrIMrZwrO5pA&s=10",
    features: [
      "Ethnic traditional craftsmanship",
      "Durable metal finish",
      "Easy to clean",
      "Ideal for festive gifting and rituals"
    ]
  },
  {
    id: "3",
    name: "Lohri Special Dhol Prop",
    desc: "Decorative traditional dhol prop for vibrant Lohri photography & entry decor.",
    fullDesc: "Bring the true Punjabi beat and festive spirit to your party space with this artistic decorative dhol setup, perfect for background styling.",
    price: 1999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST9mC_wGMerl9a7NZpeeSfbMw6JC6raIAbz3f1g0QgMA&s=10",
    features: [
      "Traditional Punjabi dhol design",
      "Lightweight and easy to place anywhere",
      "Enhances festive photography backdrop",
      "Sturdy build quality"
    ]
  },
  {
    id: "4",
    name: "Handcrafted Wooden Utility Set",
    desc: "Ethnic wooden decorative items to elevate your winter festival setup.",
    fullDesc: "Add a touch of rustic rural warmth to your home decor with these fine handcrafted wooden utility pieces tailored for festive gatherings.",
    price: 1299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDobNo9h1Mh5Pyy2EQDo5GEWhc53FYp_ltMxdiHctzg&s=10",
    features: [
      "Made from premium quality wood",
      "Eco-friendly and durable",
      "Traditional rustic look",
      "Multi-purpose usage"
    ]
  },
  {
    id: "5",
    name: "Lohri Bonfire & Decor Kit",
    desc: "Complete assortment of decorative items and festive hangings for Lohri night.",
    fullDesc: "Transform your lawn or balcony into a vibrant Lohri venue with our all-in-one decoration package packed with colorful cultural elements.",
    price: 2499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqC9WDLXeSDzxeoxnJM7H9SxhleabUUR1lEW5h2tJuYw&s=10",
    features: [
      "Complete venue styling package",
      "Vibrant cultural colors",
      "Weather-resistant hanging items",
      "Easy installation support"
    ]
  },

  // --- Specific IDs wali lohripic items ---
  {
    id: "100",
    name: "Traditional Bonfire & Seating Setup",
    desc: "Authentic traditional bonfire arrangement with comfortable ethnic floor seating for family.",
    fullDesc: "Celebrate the warmth of Lohri with our authentic traditional bonfire arrangement, featuring comfortable ethnic floor seating for family and complete festive setup.",
    price: 6499,
    image: "/loripic1.png",
    features: [
      "Authentic traditional bonfire arrangement",
      "Comfortable ethnic floor seating for family",
      "Safe and managed setup",
      "Perfect festive ambiance"
    ]
  },
  {
    id: "102",
    name: "Peanuts, Popcorn & Revri Station",
    desc: "Traditional festive snacking station decorated with rustic Punjabi elements and bells.",
    fullDesc: "Traditional festive snacking station decorated with rustic Punjabi elements and bells, offering fresh popcorn, peanuts, and revri.",
    price: 3999,
    image: "/loripic2.png",
    features: [
      "Traditional festive snacking station",
      "Decorated with rustic Punjabi elements",
      "Hygienic arrangement",
      "Includes revdi, popcorn, and peanuts"
    ]
  },
  {
    id: "103",
    name: "Dhol & Folk Music Corner",
    desc: "Vibrant cultural corner styling featuring traditional Dhol, phulkari props, and folk elements.",
    fullDesc: "Bring the true Punjabi beat and festive spirit to your party space with this vibrant cultural corner styling featuring traditional Dhol and phulkari props.",
    price: 8499,
    image: "/loripic3.png",
    features: [
      "Traditional Punjabi dhol setup",
      "Phulkari props and folk elements",
      "Enhances festive photography backdrop",
      "Sturdy build quality"
    ]
  },

  // --- Baki bachi Hui lohripic items (104 se 108) ---
  {
    id: "104",
    name: "Warm Marigold & Sugarcane Arch",
    desc: "Fresh sugarcane stalks intertwined with bright marigold flowers for auspicious welcomes.",
    fullDesc: "Fresh sugarcane stalks intertwined with bright marigold flowers for auspicious welcomes, adding a traditional touch to your entrance.",
    price: 5899,
    image: "/loripic4.png",
    features: [
      "Fresh sugarcane stalks styling",
      "Bright marigold flower decorations",
      "Auspicious entrance arch",
      "Vibrant festive look"
    ]
  },
  {
    id: "105",
    name: "Royal Phulkari Backdrop & Mandap",
    desc: "Exquisite handmade colorful phulkari cloth backdrop curated for grand Lohri celebrations.",
    fullDesc: "Exquisite handmade colorful phulkari cloth backdrop curated for grand Lohri celebrations, giving a royal ethnic look to the venue.",
    price: 12499,
    image: "/loripic5.png",
    features: [
      "Exquisite handmade phulkari cloth backdrop",
      "Curated for grand Lohri celebrations",
      "Vibrant ethnic colors",
      "Royal seating setup support"
    ]
  },
  {
    id: "106",
    name: "Bhangra & Folk Dance Stage Decor",
    desc: "High-energy stage decoration with traditional Punjabi props, lights, and vibrant drapes.",
    fullDesc: "High-energy stage decoration with traditional Punjabi props, lights, and vibrant drapes designed specifically for dance performances and celebrations.",
    price: 16999,
    image: "/loripic6.png",
    features: [
      "High-energy stage decoration",
      "Traditional Punjabi props and lights",
      "Vibrant drapes and backdrops",
      "Ideal for live folk music and dance"
    ]
  },
  {
    id: "107",
    name: "Desi Ghee & Til Sweets Station",
    desc: "Traditional winter festive counter highlighting sesame sweets, jaggery, and festive treats.",
    fullDesc: "Traditional winter festive counter highlighting sesame sweets, jaggery, desi ghee treats, and winter delicacies for guests.",
    price: 4999,
    image: "/loripic7.png",
    features: [
      "Traditional winter festive counter",
      "Sesame sweets and jaggery treats",
      "Desi ghee delicacies",
      "Beautiful rustic food counter styling"
    ]
  },
  {
    id: "108",
    name: "Grand Bonfire & Lighting Canopy",
    desc: "Spectacular overhead canopy lights and bonfire enclosure for community and family feasts.",
    fullDesc: "Spectacular overhead canopy lights and bonfire enclosure designed for large community and family feasts with complete safety measures.",
    price: 19999,
    image: "/loripic8.png",
    features: [
      "Spectacular overhead canopy lights",
      "Secure large bonfire enclosure",
      "Ideal for community and family feasts",
      "Professional installation and management"
    ]
  }
];