
export interface Product {
  id: number;
  name: string;
  desc: string;
  fullDesc: string;
  price: string;
  image: string;
  features: string[];
}

export const janmashtamiProducts: Product[] = [
  // Aapka pehle ka 1 se 7 tak ka data bilkul safe aur waisa hi hai:
  {
    id: 1,
    name: "Chota Jhula for Kanha",
    desc: "Compact and beautifully carved decorative swing for Laddu Gopal.",
    fullDesc: "Welcome little Kanha with this exquisite miniature wooden and metal-crafted swing, specially designed for Janmashtami home celebrations.",
    price: "599",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQItwwvnZ2Jrx4iJMgrod5CeQ-AFGhH3It8O6J7MOlNTw&s",
    features: [
      "Compact size perfect for home temples",
      "Intricate traditional carving",
      "Smooth swinging mechanism",
      "Durable golden finish"
    ]
  },
  {
    id: 2,
    name: "Janmashtami Aarti Thali",
    desc: "Decorative brass aarti thali adorned with festive motifs.",
    fullDesc: "Perform midnight prayers and celebrations with this specially styled traditional aarti thali tailored for Janmashtami rituals.",
    price: "699",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESn2QfExDQ6Hl4FTF_NchW0_nO6PSkoREklkwMFcsow&s",
    features: [
      "Ethnic embossed design",
      "High-grade brass material",
      "Includes matching katori and diya slots",
      "Easy to clean"
    ]
  },
  {
    id: 3,
    name: "Dahi Handi Setup",
    desc: "Traditional hanging dahi handi matki decorated with vibrant colors.",
    fullDesc: "Recreate the joyful spirit of Krishna's childhood with this decorative hanging dahi handi setup complete with traditional motifs and ghungroos.",
    price: "899",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WELxulUCtKIopBxVsrqPllhKh7aP6GMAoTrxZCT0wA&s",
    features: [
      "Authentic festive look with ghungroos",
      "Lightweight decorative matki",
      "Easy to hang anywhere in the house",
      "Vibrant traditional colors"
    ]
  },
  {
    id: 4,
    name: "Grand Kanha Jhula",
    desc: "Large ornamental floral swing setup for main Janmashtami mandap.",
    fullDesc: "An elaborate and grand swing decoration setup adorned with fresh-looking artificial flowers and fairy lights for Kanha ji's birth celebrations.",
    price: "2499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY90INzDlN6onZxVAmmRGXaGCvFcitb7a4LKi8nOp3og&s=10",
    features: [
      "Large scale grand appearance",
      "Floral decorations included",
      "Sturdy base and structural support",
      "Ideal for community and home mandals"
    ]
  },
  {
    id: 5,
    name: "Laddu Gopal Designer Dress",
    desc: "Exquisite heavy-work poshak and vastra set for Laddu Gopal.",
    fullDesc: "Dress your deity in absolute splendor with this handcrafted designer dress featuring vibrant colors, stones, and Zari work.",
    price: "499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdIgEfLcLuoyxLOgrWtHeSu2U3YCUwyPhBBp3mzJ9HvQ&s=10",
    features: [
      "Intricate zari and stone work",
      "Soft skin-friendly fabric for idols",
      "Available in multiple divine colors",
      "Perfect fit for standard idol sizes"
    ]
  },
  {
    id: 6,
    name: "Janmashtami Prasad Hamper",
    desc: "Traditional sacred sweet box featuring Makhan Mishri and panjiri.",
    fullDesc: "Complete your midnight celebrations with authentic sacred bhog items, hygienically packed for offering and distribution.",
    price: "399",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEaUBYfznkhmESVNpH1VOZwxsDDLGod6gRi0aWFVrofg&s=10",
    features: [
      "Prepared with pure desi ghee and love",
      "Traditional taste (Makhan Mishri special)",
      "Hygienic festive packaging",
      "Ideal for midnight bhog"
    ]
  },
  {
    id: 7,
    name: "Kids Festive Traditional Wear",
    desc: "Comfortable and vibrant ethnic clothing set for kids for Janmashtami.",
    fullDesc: "Dress up your little ones as Kanha or Radha in these comfortable, skin-friendly, and vibrant ethnic outfits.",
    price: "1199",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7gVYZc4hOxbmlVMuQHR3b7uEnVZ6obfocdlGuLYk2RQ&s=10",
    features: [
      "Soft cotton-silk blended fabric",
      "Easy to wear and lightweight",
      "Traditional ethnic patterns",
      "Skin-friendly for kids"
    ]
  },

  // Ab yahan se ID 8, 9, 10... mein main page wali saari pics add kar di gayi hain:
  {
    id: 8,
    name: "Divine Jhulan & Laddu Gopal Swing",
    desc: "Exquisitely decorated floral swings (jhula) adorned with fragrant flowers and golden bells.",
    fullDesc: "Exquisitely decorated floral swings (jhula) adorned with fragrant flowers and golden bells for an enchanting Janmashtami celebration.",
    price: "5499",
    image: "/janmasthmmi.png",
    features: [
      "Exquisite floral decoration",
      "Adorned with golden bells",
      "Perfect for home and temple mandaps",
      "Sturdy structural support"
    ]
  },
  {
    id: 9,
    name: "Makhan Handi & Ethnic Decor Setup",
    desc: "Traditional hanging handis, peacock feathers, and vibrant butter pot arrangements.",
    fullDesc: "Traditional hanging handis, peacock feathers, and vibrant butter pot arrangements bringing Gokul vibes to your home.",
    price: "4299",
    image: "/janmasthmmi1.png",
    features: [
      "Traditional hanging handis",
      "Peacock feathers included",
      "Vibrant butter pot arrangements",
      "Easy installation"
    ]
  },
  {
    id: 10,
    name: "Vibrant Raas Leela Backdrop",
    desc: "Colorful traditional backdrop depicting Lord Krishna's divine leelas and pastimes.",
    fullDesc: "Colorful traditional backdrop depicting Lord Krishna's divine leelas and pastimes to elevate your festive aesthetics.",
    price: "7899",
    image: "/janmasthmmi2.png",
    features: [
      "High-resolution traditional art print",
      "Durable fabric material",
      "Rich and vibrant festive colors",
      "Ideal for main stage backdrops"
    ]
  },
  {
    id: 11,
    name: "Peacock Motif Festive Arch",
    desc: "Grand entrance arch styled with peacock feathers, blue drapes, and glowing fairy lights.",
    fullDesc: "Grand entrance arch styled with peacock feathers, blue drapes, and glowing fairy lights to welcome your guests in style.",
    price: "6499",
    image: "/janmasthmmi4.png",
    features: [
      "Peacock feather theme styling",
      "Includes glowing fairy lights",
      "Graceful blue drapes",
      "Grand entrance appeal"
    ]
  },
  {
    id: 12,
    name: "Grand Mandir Floral Sanctum",
    desc: "Heavy marigold and orchid flower decorations transforming your home mandir into Gokul.",
    fullDesc: "Heavy marigold and orchid flower decorations transforming your home mandir into a heavenly Gokul sanctum.",
    price: "14999",
    image: "/janmasthmmi6.png",
    features: [
      "Heavy marigold and orchid arrangement",
      "Complete mandir transformation",
      "Fresh floral aesthetics",
      "Professional setup support"
    ]
  },
  {
    id: 13,
    name: "Janmotsav Midnight Glow Illumination",
    desc: "Special midnight celebration lighting setup with serial lights, diyas, and spotlights.",
    fullDesc: "Special midnight celebration lighting setup with serial lights, diyas, and spotlights for the divine birth moment.",
    price: "11599",
    image: "/janmasthmmi7.png",
    features: [
      "Special midnight glow lighting",
      "Includes decorative diyas and spotlights",
      "Serial lights arrangement",
      "Creates a divine spiritual ambiance"
    ]
  },
  {
    id: 14,
    name: "Radha-Krishna Phoolon ki Holi Setup",
    desc: "Auspicious flower petal arrangements and divine deity chowki decoration.",
    fullDesc: "Auspicious flower petal arrangements and divine deity chowki decoration for celebrating Phoolon ki Holi with Kanha.",
    price: "9299",
    image: "/janmasthmmi8.png",
    features: [
      "Auspicious flower petal patterns",
      "Divine deity chowki styling",
      "Fragrant traditional setup",
      "Perfect for rituals and pooja"
    ]
  },
  {
    id: 15,
    name: "Braj Style Vrindavan Street Theme",
    desc: "Complete thematic temple compound decoration recreating the magical lanes of Vrindavan.",
    fullDesc: "Complete thematic temple compound decoration recreating the magical lanes and rustic charm of Vrindavan.",
    price: "18499",
    image: "/janmasthmmi9.png",
    features: [
      "Complete thematic compound setup",
      "Recreates Vrindavan street lanes",
      "Immersive traditional props",
      "Grand community celebration design"
    ]
  }
];