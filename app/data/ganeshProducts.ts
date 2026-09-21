export interface Product {
  id: string;
  name: string;
  desc: string;
  fullDesc: string;
  price: number;
  image: string;
  features: string[];
}

export const ganeshProducts: Product[] = [
  {
    id: "1",
    name: "Aarti Thali",
    desc: "Exquisite traditional brass aarti thali set for auspicious rituals.",
    fullDesc: "Enhance your daily prayers and festival celebrations with this beautifully crafted traditional aarti thali. Made with fine detailing to hold all your puja essentials securely.",
    price: 699,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqZ0VztZVjNogJmN3BINCH-6MY3DyVxcgxt9T2L_UFQ&s=10",
    features: [
      "Traditional ethnic design",
      "Durable high-quality finish",
      "Easy to clean and maintain",
      "Perfect for gifting and personal use"
    ]
  },
  {
    id: "2",
    name: "Decoration Deepak",
    desc: "Handcrafted decorative deepak to illuminate your home mandap.",
    fullDesc: "Bring divine radiance to your home during Ganesh Chaturthi with these artistic decoration deepaks, designed to cast a warm and peaceful glow.",
    price: 499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnblBi6vk_BdWwK2ltpRLvyeDpPXTl_7vdeRHzBAYrAQ&s",
    features: [
      "Hand-painted intricate details",
      "Long-burning capacity",
      "Safe and sturdy base",
      "Reusable festive decor item"
    ]
  },
  {
    id: "3",
    name: "Ganesh Palki",
    desc: "Majestic ornamental palki for welcoming Lord Ganesha home.",
    fullDesc: "Give Bappa a royal welcome with this grand and beautifully decorated Ganesh Palki, crafted specifically to elevate your mandap aesthetics.",
    price: 2499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmzaUCjMCI10fVRrGxr7hM3MyQ-2IRNQImXlKUyLXnyw&s",
    features: [
      "Sturdy structural support for idols",
      "Rich traditional decorations and drapes",
      "Lightweight and easy to set up",
      "Grand visual appeal for home mandaps"
    ]
  },
  {
    id: "4",
    name: "Decoration Items",
    desc: "Assorted floral and lighting items for vibrant mandap backdrops.",
    fullDesc: "Complete your festival decoration package with this curated set of vibrant floral hangings and matching aesthetic lighting elements.",
    price: 1299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxRtaBFbfmQxotAcqghndBTbjVYUoCnf31mZBCUUPL5A&s=10",
    features: [
      "Vibrant traditional colors",
      "Reusable synthetic fabric flowers",
      "Easy to hang on walls and pillars",
      "Instant festive transformation"
    ]
  },
  {
    id: "5",
    name: "Modak Prasad",
    desc: "Delicious sacred modak sweet box offering for Bappa.",
    fullDesc: "Complete your pooja rituals with authentic, premium quality modaks prepared especially as a divine offering for Lord Ganesha.",
    price: 399,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDiIyp_L2aKBiOXH0oG10W6GOpAU0ROmsnq74xFishCA&s=10",
    features: [
      "Prepared with pure and premium ingredients",
      "Traditional authentic taste",
      "Hygenic festive packaging",
      "Ideal for prasad distribution"
    ]
  }
];