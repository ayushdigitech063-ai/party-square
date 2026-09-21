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
  }
];