export interface Product {
  id: string;
  name: string;
  desc: string;
  fullDesc: string;
  price: number;
  image: string;
  features: string[];
}

export const christmasProducts: Product[] = [
  {
    id: "1",
    name: "Grand Decorated Christmas Tree",
    desc: "Exquisitely adorned festive fir tree with ornaments, baubles, and fairy lights.",
    fullDesc: "Bring home the true magic of Christmas with our fully decorated grand holiday tree featuring sparkling LED lights, golden stars, and festive baubles.",
    price: 3499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1N6QA6-7p2IKCkf-yZo46P-pmQLQc8jxuwTbDhRmdA&s",
    features: [
      "Comes with pre-installed warm fairy lights",
      "Includes assorted premium shatterproof baubles",
      "Sturdy metallic base support included",
      "Available in multiple height options"
    ]
  },
  {
    id: "2",
    name: "Santa Claus Festive Welcome Setup",
    desc: "Delightful holiday arrangement with Santa props, gift boxes, and snow decor.",
    fullDesc: "Create an enchanting entrance or living room corner with life-like Santa props, decorative gift boxes, and snowy winter aesthetics.",
    price: 4999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRakgC-6HSoieTRFWSQxjEubmcJrlOqEDQWb1yLtamPzg&s=10",
    features: [
      "Life-sized or medium Santa props available",
      "Decorative wrapped gift boxes included",
      "Snow-spray winter floor mat finish",
      "Great photo-booth background for families"
    ]
  },
  {
    id: "3",
    name: "Winter Wonderland Snow Lighting",
    desc: "Magical icicle lights and snowfall illumination for home and office exterior.",
    fullDesc: "Transform your space into a snowy North Pole retreat with sparkling icicle LED strings and ambient winter blue-white lighting.",
    price: 2199,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIrBsoqBI_UhUpejHXZaKauup7FBs9iLKtsTW0YzQ7rA&s=10",
    features: [
      "Energy-efficient cascading LED icicles",
      "Weather-resistant outdoor wiring",
      "Soft warm-white and cool-blue glow",
      "Easy installation for balconies and rooftops"
    ]
  },
  {
    id: "4",
    name: "Holiday Wreath & Door Garland",
    desc: "Handcrafted pinecone and red berry door wreath with festive ribbons.",
    fullDesc: "Welcome your Christmas guests with a traditional evergreen door wreath embellished with frosted pinecones, red berries, and velvet bows.",
    price: 1299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavhIazReGQ78tZRL97UxzfPydNbZjhMmXXLfSyngLQw&s",
    features: [
      "Premium artificial evergreen pine needles",
      "Adorned with natural pinecones & berries",
      "Durable indoor/outdoor hanging loop",
      "Classic Christmas red bow accent"
    ]
  },
  {
    id: "5",
    name: "Festive Dining & Candlelit Centerpiece",
    desc: "Elegant holiday table runner, candles, and centerpiece arrangement for Christmas dinner.",
    fullDesc: "Set the ultimate Christmas feast table with a gorgeous candlelit floral centerpiece, festive runners, and gold-accented dinner decor.",
    price: 1899,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKfGkRYmyr4lCLEUaXQ5MwHG3nuWnbGszl13hl27rUQ&s=10",
    features: [
      "Includes aromatic festive candles",
      "Luxurious holiday table runner",
      "Pine and holly leaf decorative accents",
      "Perfect for family Christmas Eve dinners"
    ]
  },
  {
    id: "6",
    name: "Christmas Sweet Treats & Plum Cake Hamper",
    desc: "Traditional rich plum cake, gingerbread cookies, and holiday chocolates.",
    fullDesc: "Indulge in seasonal sweetness with an authentic festive hamper packed with rich dry fruit plum cake, cookies, and gourmet chocolates.",
    price: 999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTeDKcLIqCTpbf2g5jJjov8qEVfQ0cuv_xoIscQtM-Dw&s=10",
    features: [
      "Authentic rich plum cake included",
      "Freshly baked gingerbread cookies",
      "Beautifully gift-wrapped festive box",
      "Ideal for gifting friends and family"
    ]
  }
];