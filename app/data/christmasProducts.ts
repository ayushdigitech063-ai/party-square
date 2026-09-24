export interface Product {
  id: number;
  name: string;
  desc: string;
  fullDesc: string;
  price: string;
  image: string;
  features: string[];
}

export const christmasProducts: Product[] = [
  {
    id: 1,
    name: "Grand Decorated Christmas Tree",
    desc: "Exquisitely adorned festive fir tree with ornaments, baubles, and fairy lights.",
    fullDesc: "Bring home the true magic of Christmas with our fully decorated grand holiday tree featuring sparkling LED lights, golden stars, and festive baubles.",
    price: "3499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1N6QA6-7p2IKCkf-yZo46P-pmQLQc8jxuwTbDhRmdA&s",
    features: [
      "Comes with pre-installed warm fairy lights",
      "Includes assorted premium shatterproof baubles",
      "Sturdy metallic base support included",
      "Available in multiple height options"
    ]
  },
  {
    id: 2,
    name: "Santa Claus Festive Welcome Setup",
    desc: "Delightful holiday arrangement with Santa props, gift boxes, and snow decor.",
    fullDesc: "Create an enchanting entrance or living room corner with life-like Santa props, decorative gift boxes, and snowy winter aesthetics.",
    price: "4999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRakgC-6HSoieTRFWSQxjEubmcJrlOqEDQWb1yLtamPzg&s=10",
    features: [
      "Life-sized or medium Santa props available",
      "Decorative wrapped gift boxes included",
      "Snow-spray winter floor mat finish",
      "Great photo-booth background for families"
    ]
  },
  {
    id: 3,
    name: "Winter Wonderland Snow Lighting",
    desc: "Magical icicle lights and snowfall illumination for home and office exterior.",
    fullDesc: "Transform your space into a snowy North Pole retreat with sparkling icicle LED strings and ambient winter blue-white lighting.",
    price: "2199",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIrBsoqBI_UhUpejHXZaKauup7FBs9iLKtsTW0YzQ7rA&s=10",
    features: [
      "Energy-efficient cascading LED icicles",
      "Weather-resistant outdoor wiring",
      "Soft warm-white and cool-blue glow",
      "Easy installation for balconies and rooftops"
    ]
  },
  {
    id: 4,
    name: "Holiday Wreath & Door Garland",
    desc: "Handcrafted pinecone and red berry door wreath with festive ribbons.",
    fullDesc: "Welcome your Christmas guests with a traditional evergreen door wreath embellished with frosted pinecones, red berries, and velvet bows.",
    price: "1299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavhIazReGQ78tZRL97UxzfPydNbZjhMmXXLfSyngLQw&s",
    features: [
      "Premium artificial evergreen pine needles",
      "Adorned with natural pinecones & berries",
      "Durable indoor/outdoor hanging loop",
      "Classic Christmas red bow accent"
    ]
  },
  {
    id: 5,
    name: "Festive Dining & Candlelit Centerpiece",
    desc: "Elegant holiday table runner, candles, and centerpiece arrangement for Christmas dinner.",
    fullDesc: "Set the ultimate Christmas feast table with a gorgeous candlelit floral centerpiece, festive runners, and gold-accented dinner decor.",
    price: "1899",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKfGkRYmyr4lCLEUaXQ5MwHG3nuWnbGszl13hl27rUQ&s=10",
    features: [
      "Includes aromatic festive candles",
      "Luxurious holiday table runner",
      "Pine and holly leaf decorative accents",
      "Perfect for family Christmas Eve dinners"
    ]
  },
  {
    id: 6,
    name: "Christmas Sweet Treats & Plum Cake Hamper",
    desc: "Traditional rich plum cake, gingerbread cookies, and holiday chocolates.",
    fullDesc: "Indulge in seasonal sweetness with an authentic festive hamper packed with rich dry fruit plum cake, cookies, and gourmet chocolates.",
    price: "999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTeDKcLIqCTpbf2g5jJjov8qEVfQ0cuv_xoIscQtM-Dw&s=10",
    features: [
      "Authentic rich plum cake included",
      "Freshly baked gingerbread cookies",
      "Beautifully gift-wrapped festive box",
      "Ideal for gifting friends and family"
    ]
  },
  {
    id: 7,
    name: "Grand Christmas Tree & Lighting Setup",
    desc: "Exquisitely decorated giant Christmas tree adorned with glittering baubles, stars, and fairy lights.",
    fullDesc: "Exquisitely decorated giant Christmas tree adorned with glittering baubles, stars, and fairy lights for grand celebrations.",
    price: "6499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGNDDxdate3wKiX02hMXWRLTVGaun1kQpFGELKfORzOTZF-mVOHUWG9hs&s=10",
    features: ["Giant decorative tree", "Glittering baubles & stars", "Fairy lights included", "Professional setup"]
  },
  {
    id: 8,
    name: "Snowy Winter Wonderland Theme",
    desc: "Magical artificial snow sprays, white faux fur accents, and frosty winter decor elements.",
    fullDesc: "Magical artificial snow sprays, white faux fur accents, and frosty winter decor elements to give a real snowy feel.",
    price: "8999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwBYs6LfDeJ58ZmW5HwEZNKn_qpAjwdWdzCnVcbiJhLg&s=10",
    features: ["Artificial snow sprays", "Faux fur accents", "Frosty elements", "Winter wonderland vibe"]
  },
  {
    id: 9,
    name: "Santa's Grotto & Gift Corner",
    desc: "Festive corner setup with Santa props, gift boxes, stockings, and warm festive backdrops.",
    fullDesc: "Festive corner setup with Santa props, gift boxes, stockings, and warm festive backdrops for kids and family photos.",
    price: "5899",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxK90e4AlKRqbOnIp93VEWcG9F1JeDc4Bx74lFVstsyw&s=10",
    features: ["Santa props", "Wrapped gift boxes", "Stockings & backdrops", "Perfect photo corner"]
  },
  {
    id: 10,
    name: "Merry & Bright Entrance Archway",
    desc: "Grand holiday entrance arch decorated with red-gold ornaments, pine cones, and green garlands.",
    fullDesc: "Grand holiday entrance arch decorated with red-gold ornaments, pine cones, and green garlands to welcome guests.",
    price: "7499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9B2yevJe49MW_IGD1rIyizOIXX7aKGfcqTaOY9nEDLg&s=10",
    features: ["Holiday entrance arch", "Red-gold ornaments", "Pine cones & green garlands", "Sturdy structure"]
  },
  {
    id: 11,
    name: "Classic Christmas Tree Setup",
    desc: "Beautifully styled festive Christmas tree adorned with ornaments and glowing fairy lights.",
    fullDesc: "Beautifully styled festive Christmas tree adorned with ornaments and glowing fairy lights for your living room.",
    price: "2999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNpF-N-ORl2VSyHFlkFw0hadAloYxEr1HaV88lzHaiA&s=10",
    features: ["Festive Christmas tree", "Ornaments included", "Glowing fairy lights", "Compact & elegant"]
  },
  {
    id: 12,
    name: "Festive Gift Box Hamper",
    desc: "Exquisitely wrapped holiday gift boxes filled with seasonal surprises and festive treats.",
    fullDesc: "Exquisitely wrapped holiday gift boxes filled with seasonal surprises and festive treats for your loved ones.",
    price: "1499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rtYWF8eVTmkemyLGUIVHYl6Y9v4zqSq0BIFfw-w9rA&s=10",
    features: ["Wrapped gift boxes", "Seasonal surprises", "Festive treats", "Beautiful packaging"]
  },
  {
    id: 13,
    name: "Premium Christmas Decoration Pack",
    desc: "Complete winter decoration collection featuring hanging baubles, ribbons, and star accents.",
    fullDesc: "Complete winter decoration collection featuring hanging baubles, ribbons, and star accents for complete room decoration.",
    price: "1999",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20nDAak0Bp07QwjqSoWK5U8M-CXEQlkx7zRgOdM2mNA&s=10",
    features: ["Complete decoration pack", "Hanging baubles & ribbons", "Star accents", "Easy to setup"]
  }
];