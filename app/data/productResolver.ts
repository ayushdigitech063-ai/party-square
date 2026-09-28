

// import { Product } from "../types/product";
// import { diwaliProducts } from "./diwaliProducts";
// import { christmasProducts } from "./christmasProducts";
// import { ganeshProducts } from "./ganeshProducts";
// import { independencedayProducts } from "./independencedayProducts";
// import { janmashtamiProducts } from "./janmashtamiProducts";
// import { lohriProducts } from "./lohriProducts";
// import { navratriProducts } from "./navratriProducts";
// import { birthdayProducts as kidsBirthdayProducts } from "../services/birthday/data/kidsbirthdayproduct";
// import { birthdayProducts as motherBirthdayProducts } from "../services/birthday/data/motherbirthdayproduct";
// import { fatherCards } from "../services/birthday/father/page";
// import { newYearCards, hotelCards, outdoorCards } from "../services/birthday/young/page";
// import { babyWelcomeDecor, cartoonAndToyDecor } from "../services/birthday/babaywelcom/page";

// export interface UnifiedProduct {
//   id: string;
//   slug?: string;
//   name: string;
//   price: string;
//   rawPrice: number;
//   originalPrice?: number;
//   discount?: string;
//   desc: string;
//   fullDesc?: string;
//   image: string;
//   images?: string[];
//   category: string;
//   rating: number;
//   reviewsCount: number;
//   features?: string[];
//   included?: string[];
//   notIncluded?: string[];
//   cancellationPolicy?: string;
//   faq?: { question: string; answer: string }[];
//   availability?: string;
// }

// // Default items in app/card/[id]/page.tsx
// const cardPageProducts: UnifiedProduct[] = [
//   { id: "1", slug: "royal-wedding-gift-hamper", name: "Royal Wedding Gift Hamper", price: "₹2,499", rawPrice: 2499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR-3ymWTf0acXlIabXM19AgC8iOWQe07E9Vu7EWcohCg&s=10", desc: "Exquisite wedding present pack with traditional elegance. Handcrafted with premium items, beautiful packaging, and a touch of royal gold aesthetic.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 262 },
//   { id: "2", slug: "bridal-couple-keepsake-box", name: "Bridal Couple Keepsake Box", price: "₹1,899", rawPrice: 1899, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW3jLbx1oesfpmPg39GDwSwAyXQkPjBPImHm4OJYKG4A&s=10", desc: "Luxurious keepsake box curated specifically for newlyweds to preserve their most cherished wedding memories and tokens.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 184 },
//   { id: "3", slug: "traditional-wedding-present-set", name: "Traditional Wedding Present Set", price: "₹3,199", rawPrice: 3199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-8qJXN3nQw-NoqZaMprnVgGDl6DRqsncem-xpn9BKQ&s=10", desc: "Ornate gift collection crafted for grand wedding celebrations, featuring auspicious elements and premium presentation.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 210 },
//   { id: "4", slug: "luxury-celebration-gift-basket", name: "Luxury Celebration Gift Basket", price: "₹2,999", rawPrice: 2999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlyuiqGdMZ3Au44FKLp3hqQ1_y9C8JyZm0_cumOxmuug&s=10", desc: "Premium assorted gift items for special wedding vows and celebrations, packed elegantly with luxury ribbons.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 315 },
//   { id: "25", slug: "handcrafted-luxury-wedding-hamper-one", name: "Royal Wedding Present Hamper", price: "₹2,899", rawPrice: 2899, image: "https://tse2.mm.bing.net/th/id/OIP.-xKIhH_iRQfzmWuU1dV6sgHaEl?r=0&pid=Api&h=220&P=0", desc: "Handpicked luxury present and hamper designed specifically for grand weddings and couple milestones.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 190 },
//   { id: "26", slug: "handcrafted-luxury-wedding-hamper-two", name: "Grand Couple Celebration Box", price: "₹3,499", rawPrice: 3499, image: "https://tse3.mm.bing.net/th/id/OIP.eu-9aa3xXL0XSXXtQiv5kQHaFF?r=0&pid=Api&h=220&P=0", desc: "Exquisite wedding gift collection packed with elegance, premium items, and traditional touch.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 245 },
//   { id: "27", slug: "handcrafted-luxury-wedding-hamper-three", name: "Traditional Bridal Gift Tray", price: "₹2,299", rawPrice: 2299, image: "https://tse2.mm.bing.net/th/id/OIP.HvN6mIuPhxKdTPy1ggQsxAHaHa?r=0&pid=Api&h=220&P=0", desc: "Beautifully decorated gift set curated for auspicious couple milestones and wedding rituals.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 160 },
//   { id: "28", slug: "handcrafted-luxury-wedding-hamper-four", name: "Opulent Wedding Gift Basket", price: "₹3,199", rawPrice: 3199, image: "https://tse2.mm.bing.net/th/id/OIP.D5iTwRmtT7p_aLYGH0xdmAHaHa?r=0&pid=Api&h=220&P=0", desc: "Handcrafted luxury present featuring premium elements for unforgettable wedding celebrations.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 210 },
//   { id: "29", slug: "handcrafted-luxury-wedding-hamper-five", name: "Royal Milestone Present Pack", price: "₹2,699", rawPrice: 2699, image: "https://tse2.mm.bing.net/th/id/OIP.cvNILdgDNCd84NGa_W1aNAHaHa?r=0&pid=Api&h=220&P=0", desc: "Luxurious hampers crafted with rich aesthetics and vibrant details for grand wedding events.", category: "Wedding Gift Products", rating: 4.7, reviewsCount: 135 },
//   { id: "30", slug: "handcrafted-luxury-wedding-hamper-six", name: "Elegance Wedding Gift Tray", price: "₹2,499", rawPrice: 2499, image: "https://tse3.mm.bing.net/th/id/OIP.tbaugcwldTMYlLjd2RzqOgHaHa?r=0&pid=Api&h=220&P=0", desc: "Stunning presentation box filled with precious curated items for newlyweds and celebrations.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 175 },
//   { id: "31", slug: "handcrafted-luxury-wedding-hamper-seven", name: "Classic Wedding Milestone Kit", price: "₹3,899", rawPrice: 3899, image: "https://tse1.mm.bing.net/th/id/OIP.bvuZuLWudtBO6Qfw1Eu-2wHaE6?r=0&pid=Api&h=220&P=0", desc: "Ultimate luxury gift hamper designed to make wedding gifting grand and memorable.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 290 },
//   { id: "5", slug: "grand-festive-celebration-kit", name: "Grand Festive Celebration Kit", price: "₹1,599", rawPrice: 1599, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemobADcx1wbzySQLE07XuCW7DkkpCQGAoREpKMMjhTw&s=10", desc: "Vibrant festive elements to lighten up every celebration, festival evening, and family gathering.", category: "Festivals Products", rating: 4.7, reviewsCount: 142 },
//   { id: "6", slug: "traditional-festival-decoratives", name: "Traditional Festival Decoratives", price: "₹1,299", rawPrice: 1299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yvGM_PnSb3SL0omgZI1afaHHi-n6FEfACn0x2YNX_A&s=10", desc: "Colorful seasonal decorations designed especially for cultural gatherings and traditional home styling.", category: "Festivals Products", rating: 4.6, reviewsCount: 98 },
//   { id: "7", slug: "auspicous-celebration-package", name: "Auspicous Celebration Package", price: "₹2,199", rawPrice: 2199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVOcZ3MUvJE33_SoCKUbJ40Bv58z_y4gH4e4mjMNN4iw&s=10", desc: "Complete festive ornamentation kit for homes and celebration venues to bring prosperity and positive energy.", category: "Festivals Products", rating: 4.9, reviewsCount: 176 },
//   { id: "8", slug: "divine-puja-thali-essentials", name: "Divine Puja Thali & Essentials", price: "₹999", rawPrice: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2vzXMLs2vjByeMzynxIlAfn5OVQV41wln1yjt8HaxQ&s=10", desc: "Sacred ritual items decorated with traditional motifs, brass elements, and pious aesthetics.", category: "Puja Section", rating: 5.0, reviewsCount: 420 },
//   { id: "9", slug: "blessed-mandap-floral-setup", name: "Blessed Mandap Floral Setup", price: "₹3,499", rawPrice: 3499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsLommkibFYXhoeTCneXzs4x0QQyE7gRjTZ1RcCGr5g&s", desc: "Pure devotional setup crafted with fresh aesthetics and divine fragrance for home pujas or ceremonies.", category: "Puja Section", rating: 4.9, reviewsCount: 289 },
//   { id: "10", slug: "spiritual-home-temple-decor", name: "Spiritual Home Temple Decor", price: "₹1,799", rawPrice: 1799, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRtXWuvamj9L155RFsfVip7-d-Lv7SwREpu0pvhKFE4A&s=10", desc: "Serene decorative elements and warm lighting designed specifically for auspicious prayers and home temples.", category: "Puja Section", rating: 4.8, reviewsCount: 154 },
//   { id: "11", slug: "traditional-ceremonial-aarti-set", name: "Traditional Ceremonial Aarti Set", price: "₹1,499", rawPrice: 1499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1AjsHLO--3ycMVInMLyIo9xmR90AzuCeB0DXIRXNfQ&s=10", desc: "Elegant brass and floral accents for daily or special festive pujas with complete devotional gear.", category: "Puja Section", rating: 4.7, reviewsCount: 112 },
//   { id: "12", slug: "sacred-puja-essentials-kit", name: "Sacred Puja Essentials Kit", price: "₹1,299", rawPrice: 1299, image: "https://tse1.mm.bing.net/th/id/OIP.DgJFU1OONBwGlTFyiEBUZQHaHa?r=0&pid=Api&h=220&P=0", desc: "Complete sacred kit for daily prayers and auspicious rituals with traditional elements.", category: "Puja Section", rating: 4.9, reviewsCount: 135 },
//   { id: "13", slug: "divine-mandap-decor-item", name: "Divine Mandap Decor Item", price: "₹3,899", rawPrice: 3899, image: "https://tse4.mm.bing.net/th/id/OIP.4q0OscjzO7dnGpnLi_s-kgHaF7?r=0&pid=Api&h=220&P=0", desc: "Exquisite mandap setup elements crafted for serene and divine spiritual ceremonies.", category: "Puja Section", rating: 5.0, reviewsCount: 180 },
//   { id: "14", slug: "traditional-devotional-thali", name: "Traditional Devotional Thali Set", price: "₹1,199", rawPrice: 1199, image: "https://tse3.mm.bing.net/th/id/OIP.1jA3eUfBpQuZEmND22pSUwHaE8?r=0&pid=Api&h=220&P=0", desc: "Pious ritual items styled with authentic traditional aesthetics and brass accents.", category: "Puja Section", rating: 4.8, reviewsCount: 150 },
//   { id: "15", slug: "serene-temple-decor-piece", name: "Serene Temple Decor Piece", price: "₹1,599", rawPrice: 1599, image: "https://tse1.mm.bing.net/th/id/OIP.2it6NFOnICKxWw6BoStxXwHaHa?r=0&pid=Api&h=220&P=0", desc: "Auspicious home temple ornamentation designed to bring positive energy and peace.", category: "Puja Section", rating: 4.7, reviewsCount: 120 },
//   { id: "16", slug: "modern-minimalist-aesthetic-decor", name: "Modern Minimalist Aesthetic Decor", price: "₹2,299", rawPrice: 2299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokJ-C704of19scix-aGgOw1238UjZbbhZitVcLWGaSA&s=10", desc: "Chic artistic styling pieces for modern living spaces, adding subtle elegance and contemporary charm.", category: "Esthetic Products", rating: 4.8, reviewsCount: 225 },
//   { id: "17", slug: "boho-chic-elegance-arrangement", name: "Boho-Chic Elegance Arrangement", price: "₹1,899", rawPrice: 1899, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL-P9ELEKw25_RUnNECpvs5N4a7E8eS2Pus52FBgKHRA&s=10", desc: "Trendy aesthetic accents designed for subtle sophistication and warm bohemian interior vibes.", category: "Esthetic Products", rating: 4.7, reviewsCount: 165 },
//   { id: "18", slug: "luxurious-designer-centerpiece", name: "Luxurious Designer Centerpiece", price: "₹2,799", rawPrice: 2799, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKYb3x1S573LYJhYIwikKmn7Je7z_c57v758lLsgqUw&s=10", desc: "Stunning aesthetic decor centerpiece to elevate your room aesthetics and capture every guest's attention.", category: "Esthetic Products", rating: 5.0, reviewsCount: 380 },
//   { id: "19", slug: "contemporary-artful-home-accent", name: "Contemporary Artful Home Accent", price: "₹1,699", rawPrice: 1699, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpjUzIqXeyRs6PdCf870b0X2Aara1qnLj6CqPxZyswvQ&s=10", desc: "Sleek artistic elements for modern home aesthetics combining fine texture with minimalist form.", category: "Esthetic Products", rating: 4.6, reviewsCount: 88 },
//   { id: "20", slug: "aesthetic-decor-piece-one", name: "Modern Artistic Accent", price: "₹1,899", rawPrice: 1899, image: "https://tse4.mm.bing.net/th/id/OIP.0kUqjWnweLqW7FlC6XIKzgHaHa?r=0&pid=Api&h=220&P=0", desc: "Minimalist and trend-setting artistic home decor accents for modern aesthetics.", category: "Esthetic Products", rating: 4.8, reviewsCount: 140 },
//   { id: "21", slug: "aesthetic-decor-piece-two", name: "Contemporary Design Centerpiece", price: "₹2,499", rawPrice: 2499, image: "https://tse3.mm.bing.net/th/id/OIP.aq6tM0osSVJa7U-3G-b_ugHaI8?r=0&pid=Api&h=220&P=0", desc: "Chic aesthetic styling piece to elevate contemporary living spaces.", category: "Esthetic Products", rating: 4.9, reviewsCount: 195 },
//   { id: "22", slug: "aesthetic-decor-piece-three", name: "Artful Interior Styling Element", price: "₹1,699", rawPrice: 1699, image: "https://tse1.mm.bing.net/th/id/OIP.qfu0DofwpgMLIRc2ncZRCgHaE7?r=0&pid=Api&h=220&P=0", desc: "Elegant home accent crafted for subtle sophistication and modern vibes.", category: "Esthetic Products", rating: 4.7, reviewsCount: 110 },
//   { id: "23", slug: "aesthetic-decor-piece-four", name: "Minimalist Aesthetic Ornament", price: "₹2,199", rawPrice: 2199, image: "https://tse4.mm.bing.net/th/id/OIP.HDh4eXsxbZFqoAtWVyjmpwHaHa?r=0&pid=Api&h=220&P=0", desc: "Sleek artistic decor piece designed for modern home styling.", category: "Esthetic Products", rating: 4.9, reviewsCount: 165 },
//   { id: "24", slug: "aesthetic-decor-piece-five", name: "Luxurious Artistic Accent", price: "₹2,999", rawPrice: 2999, image: "https://tse4.mm.bing.net/th/id/OIP.fu8BmKcEABu6BL51yuXodQHaFQ?r=0&pid=Api&h=220&P=0", desc: "Premium designer accent for exquisite and trend-setting interior aesthetics.", category: "Esthetic Products", rating: 5.0, reviewsCount: 230 },
// ];

// const parseNumeric = (price: string | number | undefined): number => {
//   if (typeof price === "number") return price;
//   if (!price) return 1999;
//   const cleaned = price.toString().replace(/[^0-9]/g, "");
//   const num = parseInt(cleaned, 10);
//   return isNaN(num) || num === 0 ? 1999 : num;
// };

// const formatCurrency = (val: number): string => `₹${val.toLocaleString("en-IN")}`;

// export function getProductById(id: string): UnifiedProduct | null {
//   if (!id) return null;
//   const searchId = id.trim().toLowerCase();

//   // 1. Direct match in cardPageProducts (id or slug)
//   const directMatch = cardPageProducts.find(
//     (p) => p.id.toLowerCase() === searchId || (p.slug && p.slug.toLowerCase() === searchId)
//   );
//   if (directMatch) return directMatch;

//   // 2. Diwali Products (match diwali-X or number X)
//   if (searchId.startsWith("diwali-") || searchId.includes("diwali")) {
//     const rawId = searchId.replace("diwali-", "");
//     const item = diwaliProducts.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `diwali-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.fullDesc,
//         image: item.image,
//         category: "Diwali Decoration",
//         rating: 4.9,
//         reviewsCount: 164,
//         features: item.features,
//       };
//     }
//   }

//   // 3. Christmas Products (match christmas-X)
  
//   if (searchId.startsWith("christmas-") || searchId.includes("christmas")) {
//   const rawId = searchId.replace("christmas-", "");

//   const item = christmasProducts.find(
//     (p) => p.id.toLowerCase() === rawId
//   );

//   if (item) {
//     return {
//       id: `christmas-${item.id}`,
//       slug: item.slug,
//       name: item.name,
//       price: formatCurrency(item.price),
//       rawPrice: item.price,
//       desc: item.description,
//       fullDesc: item.description,
//       image: item.image,
//       images: item.images,
//       category: "Christmas Decoration",
//       rating: item.rating ?? 4.9,
//       reviewsCount: item.reviewCount ?? 142,
//       included: item.included,
//       notIncluded: item.notIncluded,
//       cancellationPolicy: item.cancellationPolicy,
//     };
//   }
// }

//   // 4. Ganesh Chaturthi Products (match ganesh-X)
//   if (searchId.startsWith("ganesh-") || searchId.includes("ganesh")) {
//     const rawId = searchId.replace("ganesh-", "");
//     const item = ganeshProducts.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `ganesh-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.fullDesc,
//         image: item.image,
//         category: "Ganesh Chaturthi Decor",
//         rating: 5.0,
//         reviewsCount: 198,
//         features: item.features,
//       };
//     }
//   }

//   // 5. Independence Day Products (match independenceday-X)
//   if (searchId.startsWith("independenceday-") || searchId.includes("independenceday")) {
//     const rawId = searchId.replace("independenceday-", "");
//     const item = independencedayProducts.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `independenceday-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.fullDesc,
//         image: item.image,
//         category: "Independence Day Decor",
//         rating: 4.8,
//         reviewsCount: 88,
//         features: item.features,
//       };
//     }
//   }

//   // 6. Janmashtami Products (match janmashtami-X or janmasthmi-X)
//   if (searchId.startsWith("janmashtami-") || searchId.startsWith("janmasthmi-") || searchId.includes("janmasthmi")) {
//     const rawId = searchId.replace("janmashtami-", "").replace("janmasthmi-", "");
//     const item = janmashtamiProducts.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `janmashtami-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.fullDesc,
//         image: item.image,
//         category: "Janmashtami Decoration",
//         rating: 4.9,
//         reviewsCount: 110,
//         features: item.features,
//       };
//     }
//   }

//   // 7. Lohri Products (match lohri-X)
//   if (searchId.startsWith("lohri-") || searchId.includes("lohri")) {
//     const rawId = searchId.replace("lohri-", "");
//     const item = lohriProducts.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `lohri-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.fullDesc,
//         image: item.image,
//         category: "Lohri Decoration",
//         rating: 4.8,
//         reviewsCount: 95,
//         features: item.features,
//       };
//     }
//   }

//   // 8. Navratri Products (match navratri-X)
//   if (searchId.startsWith("navratri-") || searchId.includes("navratri")) {
//     const rawId = searchId.replace("navratri-", "");
//     const item = navratriProducts.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `navratri-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.fullDesc,
//         image: item.image,
//         category: "Navratri Decoration",
//         rating: 5.0,
//         reviewsCount: 172,
//         features: item.features,
//       };
//     }
//   }

//   // 9. Kids Birthday Products (match bday-kids-X or birthday-X)
//   if (searchId.startsWith("bday-kids-") || searchId.startsWith("birthday-")) {
//     const rawId = searchId.replace("bday-kids-", "").replace("birthday-", "");
//     const item = kidsBirthdayProducts.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `bday-kids-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.description,
//         fullDesc: item.description,
//         image: item.image,
//         category: "Kids Birthday Decoration",
//         rating: 4.9,
//         reviewsCount: 135,
//       };
//     }
//   }

//   // 10. Mother Birthday Products (match bday-mother-X or mother-X)
//   if (searchId.startsWith("bday-mother-") || searchId.startsWith("mother-")) {
//     const rawId = searchId.replace("bday-mother-", "").replace("mother-", "");
//     const item = motherBirthdayProducts.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `bday-mother-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.description,
//         fullDesc: item.description,
//         image: item.image,
//         category: "Mother Birthday Decoration",
//         rating: 5.0,
//         reviewsCount: 148,
//       };
//     }
//   }

//   // 11. Father Birthday Products (match bday-father-X or father-X)
//   if (searchId.startsWith("bday-father-") || searchId.startsWith("father-")) {
//     const rawId = searchId.replace("bday-father-", "").replace("father-", "");
//     const item = fatherCards.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `bday-father-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.desc,
//         image: item.image,
//         category: "Father Birthday Decoration",
//         rating: 4.9,
//         reviewsCount: 112,
//       };
//     }
//   }

//   // 12. Young Birthday Products (match bday-young-X or young-X)
//   if (searchId.startsWith("bday-young-") || searchId.startsWith("young-")) {
//     const rawId = searchId.replace("bday-young-", "").replace("young-", "");
//     const allYoung = [...newYearCards, ...hotelCards, ...outdoorCards];
//     const item = allYoung.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `bday-young-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.desc,
//         image: item.image,
//         category: "Young Milestone Party Decor",
//         rating: 4.8,
//         reviewsCount: 96,
//       };
//     }
//   }

//   // 13. Baby Welcome Products (match bday-baby-X or babaywelcom-X or baby-X)
//   if (searchId.startsWith("bday-baby-") || searchId.startsWith("babaywelcom-") || searchId.startsWith("baby-")) {
//     const rawId = searchId.replace("bday-baby-", "").replace("babaywelcom-", "").replace("baby-", "");
//     const allBaby = [...babyWelcomeDecor, ...cartoonAndToyDecor];
//     const item = allBaby.find((p) => String(p.id).toLowerCase() === rawId);
//     if (item) {
//       const rawPrice = parseNumeric(item.price);
//       return {
//         id: `bday-baby-${item.id}`,
//         name: item.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: item.desc,
//         fullDesc: item.desc,
//         image: item.image,
//         category: "Baby Welcome Decoration",
//         rating: 5.0,
//         reviewsCount: 180,
//       };
//     }
//   }

//   // 14. Gallery Items (match gallery-X)
//   if (searchId.startsWith("gallery-")) {
//     const rawId = searchId.replace("gallery-", "");
//     for (const cat of galleryCategories) {
//       const item = cat.items.find((i) => i.id.toLowerCase() === rawId);
//       if (item) {
//         const rawPrice = parseNumeric(item.price);
//         return {
//           id: `gallery-${item.id}`,
//           name: item.name,
//           price: formatCurrency(rawPrice),
//           rawPrice,
//           desc: item.desc,
//           fullDesc: item.desc,
//           image: item.src,
//           category: item.categoryTitle || cat.title,
//           rating: 4.9,
//           reviewsCount: 125,
//         };
//       }
//     }
//   }

//   // 15. Check productDetails arrays (weddingGifts, festivalsProducts, pujaSection, estheticProducts) by slug or ID
//   const allCardLists = [
//     { list: weddingGifts, cat: "Wedding Gift Products" },
//     { list: festivalsProducts, cat: "Festivals Products" },
//     { list: pujaSection, cat: "Puja Section" },
//     { list: estheticProducts, cat: "Esthetic Products" },
//   ];
//   for (const group of allCardLists) {
//     const found = group.list.find(
//       (item: any) =>
//         String(item.id).toLowerCase() === searchId ||
//         (item.slug && item.slug.toLowerCase() === searchId)
//     );
//     if (found) {
//       const rawPrice = parseNumeric(found.price);
//       return {
//         id: found.slug || String(found.id),
//         slug: found.slug,
//         name: found.name,
//         price: formatCurrency(rawPrice),
//         rawPrice,
//         desc: found.desc || "",
//         image: found.image || "",
//         category: group.cat,
//         rating: found.rating || 4.9,
//         reviewsCount: found.reviewsCount || 150,
//       };
//     }
//   }

//   // 16. Fallback: check other datasets by bare numeric or string ID
//   const bareDiwali = diwaliProducts.find((p) => String(p.id) === searchId);
//   if (bareDiwali) {
//     const rawPrice = parseNumeric(bareDiwali.price);
//     return {
//       id: `diwali-${bareDiwali.id}`,
//       name: bareDiwali.name,
//       price: formatCurrency(rawPrice),
//       rawPrice,
//       desc: bareDiwali.desc,
//       fullDesc: bareDiwali.fullDesc,
//       image: bareDiwali.image,
//       category: "Diwali Decoration",
//       rating: 4.9,
//       reviewsCount: 164,
//       features: bareDiwali.features,
//     };
//   }

//  const bareChristmas = christmasProducts.find(
//   (p) => p.id === searchId
// );

// if (bareChristmas) {
//   return {
//     id: `christmas-${bareChristmas.id}`,
//     slug: bareChristmas.slug,
//     name: bareChristmas.name,
//     price: formatCurrency(bareChristmas.price),
//     rawPrice: bareChristmas.price,
//     desc: bareChristmas.description,
//     fullDesc: bareChristmas.description,
//     image: bareChristmas.image,
//     images: bareChristmas.images,
//     category: "Christmas Decoration",
//     rating: bareChristmas.rating ?? 4.9,
//     reviewsCount: bareChristmas.reviewCount ?? 142,
//     included: bareChristmas.included,
//     notIncluded: bareChristmas.notIncluded,
//     cancellationPolicy: bareChristmas.cancellationPolicy,
//   };
// }
//   return null;
// }
