export interface GalleryItem {
  id: string;
  categoryTitle: string;
  src: string;
  name: string;
  desc: string;
  price: string;
  numericPrice: number;
}

export interface GalleryCategory {
  title: string;
  note: string;
  items: GalleryItem[];
}

export const galleryCategories: GalleryCategory[] = [
  {
    title: "Wedding Decoration",
    note: "Grand mandaps, floral aisles & royal setups",
    items: [
      { id: "wedding-1", categoryTitle: "Wedding Decoration", src: "/wedding1.png", name: "Royal Mandap Setup", desc: "Floral mandap with drapes & chandeliers", price: "₹45,000", numericPrice: 45000 },
      { id: "wedding-2", categoryTitle: "Wedding Decoration", src: "/wedding2.png", name: "Entrance Gate Decor", desc: "Grand floral welcome gate", price: "₹18,000", numericPrice: 18000 },
      { id: "wedding-3", categoryTitle: "Wedding Decoration", src: "/wedding3.png", name: "Stage Backdrop", desc: "Elegant floral & fairy-light backdrop", price: "₹22,000", numericPrice: 22000 },
      { id: "wedding-4", categoryTitle: "Wedding Decoration", src: "/wedding4.png", name: "Aisle Walkway", desc: "Petal-lined aisle with lanterns", price: "₹15,000", numericPrice: 15000 },
      { id: "wedding-5", categoryTitle: "Wedding Decoration", src: "/wedding5.png", name: "Reception Setup", desc: "Full reception hall styling", price: "₹35,000", numericPrice: 35000 },
    ],
  },
  {
    title: "Home Decoration",
    note: "Everyday spaces, made a little more special",
    items: [
      { id: "home-1", categoryTitle: "Home Decoration", src: "/home1.png", name: "Living Room Refresh", desc: "Seasonal florals & accent styling", price: "₹6,000", numericPrice: 6000 },
      { id: "home-2", categoryTitle: "Home Decoration", src: "/home2.png", name: "Balcony Makeover", desc: "Fairy lights & potted greens", price: "₹4,500", numericPrice: 4500 },
      { id: "home-3", categoryTitle: "Home Decoration", src: "/home3.png", name: "Puja Room Decor", desc: "Traditional festive styling", price: "₹5,000", numericPrice: 5000 },
      { id: "home-4", categoryTitle: "Home Decoration", src: "/home4.png", name: "Dining Setup", desc: "Table centerpiece & lighting", price: "₹3,500", numericPrice: 3500 },
      { id: "home-5", categoryTitle: "Home Decoration", src: "/home5.png", name: "Entrance Decor", desc: "Doorway rangoli & floral toran", price: "₹2,500", numericPrice: 2500 },
    ],
  },
  {
    title: "Anniversary Decoration",
    note: "Candlelight, florals & romantic themes",
    items: [
      { id: "anniversary-1", categoryTitle: "Anniversary Decoration", src: "/aniversarry1.png", name: "Candlelight Setup", desc: "Romantic candle & rose petal path", price: "₹8,000", numericPrice: 8000 },
      { id: "anniversary-2", categoryTitle: "Anniversary Decoration", src: "/aniversarry2.png", name: "Balloon Backdrop", desc: "Themed balloon wall with lights", price: "₹6,500", numericPrice: 6500 },
      { id: "anniversary-3", categoryTitle: "Anniversary Decoration", src: "/aniversarry3.png", name: "Floral Arch", desc: "Rose & fairy-light arch", price: "₹9,500", numericPrice: 9500 },
      { id: "anniversary-4", categoryTitle: "Anniversary Decoration", src: "/aniversarry4.png", name: "Table for Two", desc: "Private dinner setup", price: "₹7,000", numericPrice: 7000 },
      { id: "anniversary-5", categoryTitle: "Anniversary Decoration", src: "/aniversarry5.png", name: "Terrace Theme", desc: "Fairy-lit terrace celebration", price: "₹11,000", numericPrice: 11000 },
    ],
  },
  {
    title: "Child Birthday",
    note: "Playful themes, balloons & bright colours",
    items: [
      { id: "birthday-1", categoryTitle: "Child Birthday", src: "/childbirthday1.png", name: "Balloon Theme Party", desc: "Colourful balloon arch & backdrop", price: "₹7,500", numericPrice: 7500 },
      { id: "birthday-2", categoryTitle: "Child Birthday", src: "/childbirthday2.png", name: "Cartoon Theme Setup", desc: "Character cutouts & banners", price: "₹9,000", numericPrice: 9000 },
      { id: "birthday-3", categoryTitle: "Child Birthday", src: "/childbirthday3.png", name: "Photo Booth Corner", desc: "Themed props & backdrop", price: "₹4,000", numericPrice: 4000 },
      { id: "birthday-4", categoryTitle: "Child Birthday", src: "/childbirthday4.png", name: "Table & Cake Decor", desc: "Themed cake table styling", price: "₹5,500", numericPrice: 5500 },
      { id: "birthday-5", categoryTitle: "Child Birthday", src: "/childbirthday5.png", name: "Full Venue Setup", desc: "Complete themed venue styling", price: "₹15,000", numericPrice: 15000 },
    ],
  },
];