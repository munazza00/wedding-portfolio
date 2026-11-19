// Luxury Wedding Portfolio Configuration
// Theme: Powder Pink, Coral Haze, Garden Green, Taupe with Ombre Gradients
// Zero couple images — 100% floral decor, botanicals, flatlays, and architectural arches

export const THEME_PRESETS = {
  vibrantOmbre: {
    id: "vibrantOmbre",
    name: "Coral Haze & Garden Green (New Signature)",
    description: "Vibrant coral haze, lush garden green, soft powder pink, warm taupe, and rich ombre gold-oxblood borders.",
    colors: {
      powderPink: "#F7D6D0",
      powderPinkLight: "#FDF4F2",
      coralHaze: "#E27D60",
      coralHazeDark: "#C45F42",
      gardenGreen: "#2D5A3E",
      gardenGreenLight: "#4E7A5E",
      gardenGreenPale: "#E8EFEA",
      taupe: "#8B7355",
      taupeLight: "#C7B5A3",
      taupePale: "#F4EFEB",
      oxblood: "#5C131F",
      gold: "#D4AF37",
      textMain: "#241A18",
      textMuted: "#6B554E",
      ombreBorderStart: "#E27D60",
      ombreBorderMid: "#8B7355",
      ombreBorderEnd: "#2D5A3E",
    }
  },
  roseGarden: {
    id: "roseGarden",
    name: "Powder Pink & Emerald Botanical",
    description: "Romantic powder pink velvet, deep garden emerald, antique brass taupe, and shimmering peach coral.",
    colors: {
      powderPink: "#F4CBC4",
      powderPinkLight: "#FCF0EE",
      coralHaze: "#D66853",
      coralHazeDark: "#B85340",
      gardenGreen: "#1E4730",
      gardenGreenLight: "#396B4D",
      gardenGreenPale: "#E2EBE5",
      taupe: "#7F674F",
      taupeLight: "#B8A38E",
      taupePale: "#F1EBE5",
      oxblood: "#4E121B",
      gold: "#C9A43B",
      textMain: "#1E1615",
      textMuted: "#614F4A",
      ombreBorderStart: "#F4CBC4",
      ombreBorderMid: "#7F674F",
      ombreBorderEnd: "#1E4730",
    }
  },
  tuscanSunset: {
    id: "tuscanSunset",
    name: "Terracotta Coral & Olive Garden",
    description: "Sun-warmed coral haze, olive garden green, warm sand taupe, and terracotta sunset.",
    colors: {
      powderPink: "#F9DDD7",
      powderPinkLight: "#FEF7F5",
      coralHaze: "#E86F51",
      coralHazeDark: "#C9573B",
      gardenGreen: "#3D5A45",
      gardenGreenLight: "#5A7D63",
      gardenGreenPale: "#EBF1ED",
      taupe: "#967A5B",
      taupeLight: "#CDB9A0",
      taupePale: "#F6F1EA",
      oxblood: "#681A24",
      gold: "#E0B342",
      textMain: "#291B18",
      textMuted: "#6E554F",
      ombreBorderStart: "#E86F51",
      ombreBorderMid: "#967A5B",
      ombreBorderEnd: "#3D5A45",
    }
  }
};

export const defaultWeddingData = {
  theme: THEME_PRESETS.vibrantOmbre,
  hero: {
    groomName: "Aarav",
    brideName: "Meera",
    monogram: "A & M",
    calligraphySpeed: 1.8,
    replayCalligraphy: true,
  },
  preWeddingEvents: [
    {
      id: "haldi",
      title: "The Haldi Radiance",
      subtitle: "Mangal Snanam & Golden Floral Bath",
      date: "Thursday, November 27, 2025",
      time: "10:00 AM – 1:30 PM",
      theme: "Sunlit Marigold Canopy & Citrus Bloom",
      dressCode: "Haldi Ochre, Mustard Silk & Coral Accents",
      dressCodeColorHex: "#E59E38",
      arrangedBy: "Groom's Family",
      venueName: "The Mango Orchard Courtyard & Poolside",
      description: "A joyful morning beneath suspended garlands of fresh marigolds, holy sandalwood pastes, organic turmeric blessings, and chilled saffron-pistachio sherbets.",
      image: "/images/prewedding-haldi.jpg", // Haldi ceremony floral decor with yellow drapes and marigold garlands
      badge: "Morning Ritual",
      accentColor: "coral",
    },
    {
      id: "mehndi",
      title: "The Mehndi Blossom",
      subtitle: "Henna Whispers & Botanical Garden",
      date: "Thursday, November 27, 2025",
      time: "4:00 PM – 8:00 PM",
      theme: "Garden Green Tapestry & Botanical Bohemia",
      dressCode: "Garden Green, Mint Pastel & Powder Pink",
      dressCodeColorHex: "#2D5A3E",
      arrangedBy: "Bride's Family",
      venueName: "The Glasshouse Conservatory & Fountain Terrace",
      description: "Intricate organic henna artistry amidst hanging eucalyptus chandeliers, artisanal jasmine bangle stalls, live classical sitar and flute melodies, and high-tea treats.",
      image: "/images/prewedding-mehndi.jpg", // Mehndi celebration with colorful dholaks, henna cones, rose petals
      badge: "Afternoon Celebration",
      accentColor: "green",
    },
    {
      id: "sangeet",
      title: "The Royal Sangeet Night",
      subtitle: "Zeenat-e-Jashn & Starlit Melodies",
      date: "Friday, November 28, 2025",
      time: "7:00 PM – Late",
      theme: "Velvet Coral Haze & Golden Starlight",
      dressCode: "Coral Haze, Deep Wine, Warm Taupe & Antique Gold",
      dressCodeColorHex: "#E27D60",
      arrangedBy: "Joint Celebration",
      venueName: "The Grand Amphitheatre & Royal Courtyard",
      description: "An electrifying evening of choreographed family dances, live dhol fusion, bespoke mixology bars, and a midnight dessert feast beneath illuminated chandeliers.",
      image: "/images/prewedding-sangeet.jpg", // Sangeet celebration with dance floor and hanging floral ceiling
      badge: "Musical Gala",
      accentColor: "taupe",
    }
  ],
  venue: {
    sectionTitle: "Sacred Destination & Venues",
    sectionSubtitle: "Where sacred promises and majestic celebrations unfold under starlit skies",
    ceremony: {
      title: "The Auspicious Wedding Ceremony",
      venueName: "The Amber Water Palace",
      locationAddress: "Lakeside Heritage Pavilions, Lake Pichola Road, Udaipur, Rajasthan",
      locationDetails: "An open-air waterfront mandap under carved sandstone heritage arches draped in fresh tuberose, lotus buds, coral carnations, and glowing brass oil lamps.",
      timing: "Saturday, November 29, 2025 • 4:30 PM Sunset",
      mapQuery: "Lake Pichola, Udaipur",
      attireNote: "Regal Indian Traditional / Formal Elegance",
      parkingInfo: "Complimentary valet parking at the North Heritage Gate",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop" // Floral arch mandap decor (no couple)
    },
    reception: {
      title: "The Grand Gala Reception",
      ritualName: "Dinner, Speeches & The First Toast",
      venueName: "The Crystal Glass Ballroom & Lawns",
      locationAddress: "Palace Estate Gardens, Grand Pavilion Drive, Udaipur",
      locationDetails: "A black-tie evening featuring multi-course royal banquets, live orchestral strings, champagne fountains, and dancing beneath antique crystal chandeliers.",
      timing: "Saturday, November 29, 2025 • 7:30 PM Onwards",
      mapQuery: "Udaipur Palace Gardens",
      attireNote: "Black Tie Optional / Royal Evening Glamour",
      parkingInfo: "Chauffeur lounge and electric buggy transit from estate gates",
      image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop" // Crystal glassware, golden candles & floral centerpiece decor
    }
  },
  // Dedicated Protected Family Pictures Vault
  familyAlbum: {
    password: "royal2025",
    hint: "Passcode provided on family invitation card (Default: royal2025)",
    title: "The Heirloom Family Vault",
    subtitle: "Private Family Moments & Generational Heirlooms",
    privatePhotos: [
      {
        id: "f1",
        caption: "Generational Blessing & Matriarch's Vintage Keepsakes",
        url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
        date: "Sacred Heirloom"
      },
      {
        id: "f2",
        caption: "Family Champagne Toast & Golden Blessings",
        url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
        date: "Family Dinner"
      },
      {
        id: "f3",
        caption: "Handmade Heirloom Gifts & Handwritten Family Letters",
        url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
        date: "Private Suite"
      },
      {
        id: "f4",
        caption: "Candid Sibling Revelry Behind The Festive Drapes",
        url: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200&auto=format&fit=crop",
        date: "Sangeet Green Room"
      },
      {
        id: "f5",
        caption: "The Grandparents' 50th Anniversary Blessing Token",
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
        date: "Morning Puja"
      },
      {
        id: "f6",
        caption: "Midnight Family Chai & Traditional Sweet Sharing",
        url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop",
        date: "Late Night Memories"
      }
    ]
  },
  vendors: {
    sectionTitle: "Our Wedding Artisans & Managers",
    sectionSubtitle: "The visionary planners, chefs, scenographers, and artists who orchestrated every detail",
    list: [
      {
        id: "v1",
        category: "Event Planning & Production",
        companyName: "Aura Luxe Celebrations",
        leadName: "Devika & Siddharth Singhania",
        website: "https://example.com/auraluxe",
        instagram: "@auraluxeweddings",
        notes: "Flawless hospitality, 3-day itinerary execution, and guest logistics management."
      },
      {
        id: "v2",
        category: "Floral Scenography & Decor",
        companyName: "Petals & Botanics Atelier",
        leadName: "Elena Rostova",
        website: "https://example.com/petalsbotanics",
        instagram: "@petalsandbotanics",
        notes: "Sustainable botanical florals, suspended marigold canopies, and floating lotus decor."
      },
      {
        id: "v3",
        category: "Royal Banquets & Culinary Design",
        companyName: "The Epicurean Guild",
        leadName: "Chef Ranveer & Team",
        website: "https://example.com/epicureanguild",
        instagram: "@epicureanweddings",
        notes: "Curated 14-region royal thali, live molecular chaat bars, and midnight confection lounge."
      },
      {
        id: "v4",
        category: "Calligraphy & Bespoke Stationery",
        companyName: "The Velvet Quill Co.",
        leadName: "Maya Chandran",
        website: "https://example.com/velvetquill",
        instagram: "@thevelvetquill",
        notes: "Handmade deckled cotton paper, wax monograms, and custom calligraphy suites."
      },
      {
        id: "v5",
        category: "Sound, Acoustics & Starlight Lighting",
        companyName: "Lumina Soundscapes",
        leadName: "Kunal Merchant",
        website: "https://example.com/luminasound",
        instagram: "@luminasoundscapes",
        notes: "Amphitheatre intelligent mood lighting, acoustic sound design, and live concert setup."
      },
      {
        id: "v6",
        category: "Cinematography & Still Art",
        companyName: "Lumière Heritage Studio",
        leadName: "Kabir Sen",
        website: "https://example.com/lumiereheritage",
        instagram: "@lumiereheritagestudio",
        notes: "Candid emotional storytelling, Super 8mm film captures, and aerial drone visuals."
      }
    ]
  },
  guestWishes: [
    {
      id: "w1",
      name: "Rohan & Sanjana",
      relation: "Cousins of the Groom",
      message: "May your lives together be filled with boundless laughter, adventurous journeys, and everlasting love!",
      date: "Nov 20, 2025"
    },
    {
      id: "w2",
      name: "Uncle Rajesh & Aunty Sunita",
      relation: "Bride's Family",
      message: "Sending our warmest blessings for a magnificent beginning. You both complement each other so beautifully.",
      date: "Nov 21, 2025"
    }
  ]
};
