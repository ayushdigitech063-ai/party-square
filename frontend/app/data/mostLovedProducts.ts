import { Product } from "@/app/types/product";

export const mostLovedProducts: Product[] = [
  {
    id: "most-loved-1",
    slug: "birthday-celebration",
    name: "Birthday Celebration Special",
    description:
      "Make birthdays extra special with vibrant balloon arches, custom backdrops, fairy lights, and personalized theme setups designed to create everlasting memories.",
    price: 4999,
    originalPrice: 6999,
    image: "/birthdaydesign.png",
    images: [
      "/birthdaydesign.png",
      "/party.png",
      "/party1.png",
      "/party2.png",
    ],
    category: "Services",
    subcategory: "Birthday",
    availability: true,
    rating: 4.9,
    reviewCount: 142,
    badge: "Most Popular",
    included: [
      "Customized Birthday theme backdrop & banner",
      "Organic balloon arch & festive balloon garland (150+ balloons)",
      "Warm fairy lights & ambient LED spot illumination",
      "Age / Name marquee letters or customized numeric cutout",
      "Cake table styling with decorative props & stands",
      "Full on-site delivery, balloon inflation & professional setup",
    ],
    notIncluded: [
      "Birthday cake, desserts or food catering",
      "Sound system or DJ console",
      "External power extensions",
    ],
    cancellationPolicy:
      "Free cancellation & 100% advance refund up to 24 hours prior to scheduled setup time. Easy date rescheduling available.",
    faqs: [
      {
        question: "How much advance time is needed to set up?",
        answer: "Our team arrives 2 hours before your celebration time and finishes the complete setup smoothly."
      },
      {
        question: "Can we customize colors and child's name?",
        answer: "Yes, absolutely! Color themes, balloon palettes, and baby/person's name cutouts are customized to your request."
      }
    ]
  },
  {
    id: "most-loved-2",
    slug: "romantic-vibes",
    name: "Romantic Vibes & Candlelight Setup",
    description:
      "Ignite the romance with breathtaking candlelight pathways, cascading rose petals, cozy cabanas, and intimate dinner decor tailored for anniversaries and dates.",
    price: 5499,
    originalPrice: 7999,
    image: "/romaticvibe.png",
    images: [
      "/romaticvibe.png",
      "/ring.png",
      "/wedding.png",
    ],
    category: "Services",
    subcategory: "Romantic & Anniversary",
    availability: true,
    rating: 5.0,
    reviewCount: 96,
    badge: "Trending Love",
    included: [
      "Cozy canopy / cabana styling with sheer white drapes",
      "Real fragrant red rose petals pathway with decorative candles",
      "LED tea-light lanterns & fairy light strings",
      "Heart-shaped balloon bunch or customized neon 'Better Together' sign",
      "Dining table styling with golden candleholders & satin runners",
      "Complete discreet on-site setup prior to surprise entry",
    ],
    notIncluded: [
      "Dinner food & drinks (unless pre-booked at partner venue)",
      "Fresh champagne or wine bottles",
      "Outdoor generators",
    ],
    cancellationPolicy:
      "Full advance refund available with at least 24 hours advance notice. Rescheduling supported.",
    faqs: [
      {
        question: "Is this suitable for a terrace or living room?",
        answer: "Yes, our romantic cabana setup is flexible and fits living rooms, bedrooms, private dining corners, or rooftop terraces."
      },
      {
        question: "Are real candles safe for indoor use?",
        answer: "We use a combination of enclosed glass glass-votive candles and battery-powered LED warm candles to guarantee 100% safety."
      }
    ]
  },
  {
    id: "most-loved-3",
    slug: "ganpati-utsav",
    name: "Ganpati Utsav Divine Mandap Decor",
    description:
      "Welcome Lord Ganesha home with exquisite traditional mandaps, fresh floral hangings, gold accents, and serene lighting setups crafted with deep devotion.",
    price: 6999,
    originalPrice: 9499,
    image: "/ganpatidecoration.png",
    images: [
      "/ganpatidecoration.png",
      "/mata.png",
      "/mata1.png",
    ],
    category: "Festivals",
    subcategory: "Ganesh Chaturthi",
    availability: true,
    rating: 4.9,
    reviewCount: 188,
    badge: "Festive Divine",
    included: [
      "Carved wooden or traditional fabric mandap structure",
      "Fresh marigold (genda) & jasmine hanging garlands",
      "Decorative brass diyas & golden bells backdrop",
      "Traditional velvet singhasan (seating platform) with silk cushions",
      "Ambient warm LED temple lighting & entrance toran",
      "Complete morning or evening on-site installation by artisans",
    ],
    notIncluded: [
      "Ganesha Idol (Murti) and Puja Samagri",
      "Prasad or sweet offerings",
    ],
    cancellationPolicy:
      "Full refund upon cancellation up to 24 hours before setup. Free slot rescheduling supported.",
    faqs: [
      {
        question: "How long does the fresh floral setup remain fresh?",
        answer: "We source fresh morning flowers and use floral foam to keep your mandap fresh for up to 3 days."
      }
    ]
  },
  {
    id: "most-loved-4",
    slug: "navratri-celebration",
    name: "Navratri Celebration Ethnic Setup",
    description:
      "Celebrate the festive nine nights with vibrant ethnic props, marigold floral styling, traditional elements, and bright festive illumination.",
    price: 6499,
    originalPrice: 8999,
    image: "/navratridecoration.png",
    images: [
      "/navratridecoration.png",
      "/mata2.png",
      "/mata3.png",
    ],
    category: "Festivals",
    subcategory: "Navratri",
    availability: true,
    rating: 4.8,
    reviewCount: 114,
    badge: "Festival of Nine Nights",
    included: [
      "Vibrant ethnic cloth drapes (Bandhani & Rajasthani mirror work)",
      "Traditional brass lamps, diyas, and kalash decorative setup",
      "Marigold floral strings and hanging pom-pom garlands",
      "Dandiya corner decoration with wooden props",
      "Festive LED string lights & backdrop illumination",
      "Complete assembly and disassembly service",
    ],
    notIncluded: [
      "Dandiya sticks for guests",
      "DJ and sound equipment",
    ],
    cancellationPolicy:
      "Cancellation allowed up to 24 hours prior with full refund.",
    faqs: [
      {
        question: "Can this setup be booked for Garba nights or society clubs?",
        answer: "Yes, we cater to both individual homes and large community halls/societies."
      }
    ]
  },
  {
    id: "most-loved-5",
    slug: "janmashtami-celebration",
    name: "Janmashtami Divine Krishna Jhula Decor",
    description:
      "Transform your space into a divine Vrindavan with beautifully decorated jhulas, peacock feather motifs, butter pots, and glowing traditional lights.",
    price: 5999,
    originalPrice: 8499,
    image: "/janmasthmi.png",
    images: [
      "/janmasthmi.png",
      "/srenath.png",
    ],
    category: "Festivals",
    subcategory: "Janmashtami",
    availability: true,
    rating: 5.0,
    reviewCount: 130,
    badge: "Divine Blessing",
    included: [
      "Artisan carved floral swing (Jhula) for Bal Gopal",
      "Fresh floral border styling with exotic greens & roses",
      "Earthen butter pots (Matki) with golden accents",
      "Peacock feather background motifs & silk fabric drapes",
      "Gentle warm-white fairy lights & brass bells",
      "Timely delivery & complete temple corner styling",
    ],
    notIncluded: [
      "Bal Gopal idol & Abhishek samagri",
      "Makhan & Panchamrit",
    ],
    cancellationPolicy:
      "Free cancellation with full refund up to 24 hours prior to booking slot.",
    faqs: [
      {
        question: "Is the swing sturdy enough for swinging the idol?",
        answer: "Yes, our swings are made from reinforced timber and brass joints designed specifically for active puja swings."
      }
    ]
  },
  {
    id: "most-loved-6",
    slug: "christmas-magic",
    name: "Christmas Magic Decor",
    description:
      "Bring home the Christmas cheer with frosted pine trees, glittering ornaments, warm fairy lights, and cozy winter-themed festive corners.",
    price: 8499,
    originalPrice: 11999,
    image: "/crismasdecoration.png",
    images: [
      "/crismasdecoration.png",
      "/crismasdecoration1.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1N6QA6-7p2IKCkf-yZo46P-pmQLQc8jxuwTbDhRmdA&s",
    ],
    category: "Festivals",
    subcategory: "Christmas",
    availability: true,
    rating: 4.9,
    reviewCount: 48,
    badge: "Festive Winter Wonderland",
    included: [
      "Twin frosted Christmas trees with warm fairy lights",
      "Festive fireplace garland & hanging holiday wreath",
      "Glittering red & gold holiday ornaments and baubles",
      "Cozy plaid winter cushions & tartan wraps",
      "Decorative gift boxes and tabletop candle lamps",
      "Complete on-site delivery and professional installation",
    ],
    notIncluded: [
      "Real working fireplace / fire fuel",
      "Extra room lighting outside designated area",
      "Outdoor electrical extensions",
    ],
    cancellationPolicy:
      "Full refund if cancelled at least 24 hours prior to scheduled event setup. Easy rescheduling available.",
    faqs: [
      {
        question: "How long does the Christmas Magic setup take?",
        answer: "Our team of professional decorators will complete the full setup within 2 to 3 hours."
      }
    ]
  },
  {
    id: "most-loved-7",
    slug: "diwali-festivities",
    name: "Diwali Festivities Grand Lighting & Diya Decor",
    description:
      "Brighten up your home with bespoke floral rangolis, traditional diyas, ambient lighting, and elegant festive corners for Laxmi Pujan.",
    price: 7999,
    originalPrice: 10999,
    image: "/diwalidecoration.png",
    images: [
      "/diwalidecoration.png",
      "/rangoli.png",
    ],
    category: "Festivals",
    subcategory: "Diwali",
    availability: true,
    rating: 4.9,
    reviewCount: 220,
    badge: "Festival of Lights",
    included: [
      "Large fresh flower petal Rangoli at the main entrance",
      "Handcrafted terracotta & brass floating diya sets (50+ diyas)",
      "Warm LED fairy light curtain backdrop for living room",
      "Floral marigold strings and mango leaves toran for door",
      "Decorative Urli bowls with scented rose floating candles",
      "Full on-site arrangement on Chhoti Diwali or Badi Diwali day",
    ],
    notIncluded: [
      "Firecrackers or pyrotechnics",
      "Pujan sweets and prasad",
    ],
    cancellationPolicy:
      "Full refund upon cancellation 24 hours before setup time.",
    faqs: [
      {
        question: "Can we select custom rangoli designs?",
        answer: "Yes, our decorators offer multiple traditional and modern floral rangoli motifs to match your floor plan."
      }
    ]
  },
  {
    id: "most-loved-8",
    slug: "grand-celebrations",
    name: "Grand Celebrations Luxury Stage Decor",
    description:
      "From grand receptions to premium family milestones, experience breathtaking stage styling, floral ceilings, and immaculate attention to detail.",
    price: 14999,
    originalPrice: 19999,
    image: "/homepage.png",
    images: [
      "/homepage.png",
      "/wedding.png",
      "/wedding1.png",
      "/wedding2.png",
    ],
    category: "Services",
    subcategory: "Grand Events",
    availability: true,
    rating: 5.0,
    reviewCount: 310,
    badge: "Luxury Signature",
    included: [
      "Grand stage backdrop with imported flora & crystal chandeliers",
      "Carpeted pathway with elevated floral stands and warm spotlights",
      "Royal sofa / couple seating with plush velvet cushions",
      "Suspended floral ceiling accents and ambient wash lighting",
      "Professional site supervision and complete event teardown",
    ],
    notIncluded: [
      "Venue booking charges",
      "Food & beverage catering",
      "Artist / anchor fees",
    ],
    cancellationPolicy:
      "Flexible cancellation up to 48 hours prior with full refund.",
    faqs: [
      {
        question: "Do you visit the venue beforehand?",
        answer: "Yes, our senior event manager conducts a pre-event recce to measure dimensions and verify electrical points."
      }
    ]
  },
];
