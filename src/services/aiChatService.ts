// BharatVerse AI Assistant & Natural Language Processing (NLP) Engine
// Integrates high-speed cloud LLMs with intelligent local semantic NLP & knowledge base

interface ChatMessage {
  role: "bot" | "user" | "system" | "assistant";
  text: string;
}

// ----------------------------------------------------------------------------
// COMPREHENSIVE LOCAL CULTURAL & PLATFORM KNOWLEDGE BASE
// ----------------------------------------------------------------------------
const STATE_KNOWLEDGE: Record<string, { title: string; capital: string; highlights: string[]; yatraLink?: string }> = {
  "uttar pradesh": {
    title: "Uttar Pradesh — The Cradle of Indian Civilisation",
    capital: "Lucknow",
    highlights: [
      "🏛️ **Monuments:** Taj Mahal & Agra Fort in Agra, Fatehpur Sikri",
      "🛕 **Spiritual Centers:** Varanasi (Kashi Vishwanath & Ganga Ghats), Ayodhya (Shri Ram Janmabhoomi), Mathura & Vrindavan",
      "🎨 **Crafts & Heritage:** Chikankari embroidery from Lucknow, Banarasi silk sarees from Varanasi, Brassware from Moradabad",
      "🍲 **Cuisine:** Awadhi Dum Biryani, Galouti Kebabs, Banarasi Paan, Agra Petha"
    ],
    yatraLink: "/virtual-yatra/uttar-pradesh"
  },
  "rajasthan": {
    title: "Rajasthan — The Land of Kings & Desert Splendor",
    capital: "Jaipur (Pink City)",
    highlights: [
      "🏰 **Forts & Palaces:** Amber Fort, Hawa Mahal, City Palace (Jaipur & Udaipur), Mehrangarh Fort (Jodhpur), Jaisalmer Golden Fort",
      "🎭 **Folk Culture:** Ghoomar & Kalbelia dances, Puppet theater (Kathputli)",
      "🎨 **Artisan Crafts:** Blue Pottery, Bandhani tie-dye, Kundan-Meenakari jewelry, Pichwai paintings",
      "🍲 **Cuisine:** Dal Baati Churma, Gatte ki Sabzi, Ker Sangri, Ghevar"
    ],
    yatraLink: "/virtual-yatra/rajasthan"
  },
  "kerala": {
    title: "Kerala — God's Own Country",
    capital: "Thiruvananthapuram",
    highlights: [
      "🌴 **Nature & Waters:** Alleppey backwaters on traditional Kettuvallam houseboats, Munnar tea hills, Wayanad rainforests",
      "🎭 **Classical Arts:** Kathakali dance-drama, Kalaripayattu martial arts, Mohiniyattam, Theyyam rituals",
      "🌿 **Ayurveda & Spices:** World capital of authentic Ayurvedic therapies and historic spice gardens in Fort Kochi",
      "🍲 **Cuisine:** Royal Sadya on banana leaves, Appam with stew, Malabar Parotta, Karimeen Pollichathu"
    ],
    yatraLink: "/virtual-yatra/kerala"
  },
  "gujarat": {
    title: "Gujarat — Land of Legends, Lions & Vibrant Heritage",
    capital: "Gandhinagar",
    highlights: [
      "🦁 **Wonders:** White Rann of Kutch salt desert, Gir National Park (Asiatic Lions), Statue of Unity, Somnath & Dwarkadhish temples",
      "💃 **Festivals:** Navratri Garba (UNESCO Intangible Cultural Heritage), International Kite Festival",
      "🎨 **Crafts:** Rogan art of Nirona, Ajrakh block printing, Patan Patola double-ikat silk, Lippan mud-art",
      "🍲 **Cuisine:** Gujarati Thali, Dhokla, Khandvi, Thepla, Fafda-Jalebi"
    ],
    yatraLink: "/virtual-yatra/gujarat"
  },
  "west bengal": {
    title: "West Bengal — Cultural Heart of Literature, Art & Joy",
    capital: "Kolkata (City of Joy)",
    highlights: [
      "🎭 **Festivals & UNESCO:** Durga Puja (UNESCO Intangible Heritage), Kumartuli clay artisan quarter",
      "🏛️ **Landmarks:** Victoria Memorial, Howrah Bridge, Dakshineswar & Kalighat temples, Sundarbans mangrove forest",
      "🎨 **Arts & Textiles:** Kantha embroidery, Baluchari silk, Dokra metal art, terracotta temples of Bishnupur",
      "🍲 **Cuisine:** Rosogolla, Sandesh, Mishti Doi, Shorshe Ilish, Kosha Mangsho"
    ],
    yatraLink: "/virtual-yatra/west-bengal"
  },
  "tamil nadu": {
    title: "Tamil Nadu — Land of Majestic Dravidian Gopurams",
    capital: "Chennai",
    highlights: [
      "🛕 **Temples:** Meenakshi Amman Temple (Madurai), Brihadeeswarar Temple (Thanjavur), Shore Temple (Mahabalipuram), Rameswaram",
      "💃 **Classical Dance:** Bharatanatyam, classical Carnatic music concerts during Margazhi season",
      "🎨 **Crafts:** Kanchipuram silk sarees, Thanjavur gold foil paintings, Bronze idols of Swamimalai",
      "🍲 **Cuisine:** Crispy Dosa, Idli-Sambar, Chettinad Chicken, filter coffee, Madurai Jigarthanda"
    ],
    yatraLink: "/virtual-yatra/tamil-nadu"
  },
  "maharashtra": {
    title: "Maharashtra — Gateway of Heritage, Forts & Resilience",
    capital: "Mumbai",
    highlights: [
      "🏛️ **Monuments & UNESCO:** Gateway of India, Ajanta & Ellora Caves, Elephanta Caves, Chhatrapati Shivaji Terminus",
      "🏰 **Maratha Forts:** Raigad, Sinhagad, Shivneri & Murud-Janjira sea fortress",
      "🎉 **Festivals:** Grand 10-day Ganesh Chaturthi, Lavani & Powada folk dances, Warli tribal art",
      "🍲 **Cuisine:** Vada Pav, Misal Pav, Puran Poli, Kolhapuri Mutton, Alphonso Mango delicacies"
    ]
  },
  "karnataka": {
    title: "Karnataka — Silicon & Sandalwood Land of Heritage",
    capital: "Bengaluru",
    highlights: [
      "🏛️ **UNESCO Sites:** Ruins of Vijayanagara Empire in Hampi, Pattadakal, Hoysala temples of Belur & Halebidu",
      "🏰 **Palaces & Hills:** Mysore Palace, Coorg coffee plantations, Gokarna beaches",
      "🎨 **Crafts:** Mysore Silk, Channapatna wooden toys, Sandalwood carving, Bidriware",
      "🍲 **Cuisine:** Mysore Masala Dosa, Bisi Bele Bath, Neer Dosa, Mysore Pak"
    ]
  },
  "punjab": {
    title: "Punjab — Land of Five Rivers, Valour & Green Revolution",
    capital: "Chandigarh",
    highlights: [
      "🛕 **Spiritual Crown:** The Golden Temple (Sri Harmandir Sahib) in Amritsar with world's largest community langar",
      "🎖️ **Historical Sites:** Jallianwala Bagh, Wagah Border retreat ceremony",
      "💃 **Folk Dances:** Energetic Bhangra and Giddha with dhol beats, Phulkari floral embroidery",
      "🍲 **Cuisine:** Butter Chicken, Makki di Roti & Sarson da Saag, Dal Makhani, Amritsari Kulcha, Lassi"
    ]
  },
  "himachal pradesh": {
    title: "Himachal Pradesh — Devbhoomi & Abode of the Himalayas",
    capital: "Shimla",
    highlights: [
      "🏔️ **Valleys & Hills:** Kullu-Manali, Spiti Valley, Dharamshala & McLeod Ganj (residence of Dalai Lama), Shimla Mall Road",
      "🛕 **Temples:** Hidimba Devi Temple, Baijnath, Jwalamukhi, ancient wooden Pagoda-style temples",
      "🎨 **Crafts:** Kullu hand-woven shawls, Kangra miniature paintings, Himachali caps",
      "🍲 **Cuisine:** Himachali Dham festive feast, Siddu, Madra, Trout fish"
    ]
  },
  "uttarakhand": {
    title: "Uttarakhand — The Sacred Land of Gods & Yoga",
    capital: "Dehradun",
    highlights: [
      "🛕 **Char Dham Pilgrimage:** Yamunotri, Gangotri, Kedarnath, and Badrinath",
      "🧘 **Yoga Capital:** Rishikesh and Haridwar (Ganga Aarti at Har Ki Pauri)",
      "🏔️ **Himalayan Peaks:** Nanda Devi, Valley of Flowers National Park, Auli ski resort",
      "🍲 **Cuisine:** Kafuli, Chainsoo, Bal Mithai of Almora, Singori"
    ]
  },
  "assam": {
    title: "Assam — Gateway to the Northeast & Land of the Red River",
    capital: "Dispur",
    highlights: [
      "🦏 **Wildlife:** Kaziranga National Park (Home of the great one-horned Indian Rhino) & Manas National Park",
      "🛕 **Spiritual:** Kamakhya Devi Temple on Nilachal Hill, Majuli (world's largest river island & seat of Neo-Vaishnavite Satras)",
      "💃 **Folk Dance:** Bihu dance with Pepa horn and Dhol during Rongali Bihu",
      "🍵 **Treasures:** Assam Orthodox golden tea, golden Muga silk, Bell metal craft of Sarthebari",
      "🍲 **Cuisine:** Masor Tenga (tangy fish curry), Khaar, Duck meat with ash gourd"
    ]
  },
  "odisha": {
    title: "Odisha — Soul of India & Maritime Heritage",
    capital: "Bhubaneswar (Temple City)",
    highlights: [
      "🛕 **Iconic Temples:** Jagannath Temple (Puri) and Rath Yatra, Sun Temple of Konark (Black Pagoda chariot)",
      "💃 **Classical Dance:** Odissi dance characterized by Tribhangi postures",
      "🎨 **Artisan Crafts:** Pattachitra palm-leaf scrolls, Pipili applique work, Silver Filigree (Tarakasi) of Cuttack",
      "🍲 **Cuisine:** Chhena Poda (baked cheese dessert), Puri Mahaprasad, Dalma"
    ]
  },
  "andhra pradesh": {
    title: "Andhra Pradesh — Land of Spiritual Radiance & Kuchipudi",
    capital: "Amaravati",
    highlights: [
      "🛕 **Sacred Temples:** Sri Venkateswara Swamy Temple on Tirumala Hills, Srisailam Mallikarjuna Jyotirlinga, Lepakshi hanging pillar",
      "💃 **Dance:** Kuchipudi classical dance-drama",
      "🎨 **Crafts:** Kalamkari hand-painted cotton, Kondapalli wooden toys, Uppada silk",
      "🍲 **Cuisine:** Andhra spicy Biryani, Gongura Pachadi, Pesarattu, Pootharekulu sweet"
    ]
  },
  "telangana": {
    title: "Telangana — Land of Pearls, Forts & Deccan Culture",
    capital: "Hyderabad",
    highlights: [
      "🏛️ **Monuments:** Charminar, Golconda Fort (Acoustic wonder), Ramappa Temple (UNESCO Kakatiya architecture), Chowmahalla Palace",
      "🎉 **Festivals:** Bathukamma floral festival, Bonalu goddess celebration",
      "🎨 **Crafts:** Pochampally Ikkat silk, Pembarthi metalware, Nirmal paintings",
      "🍲 **Cuisine:** World-famous Hyderabadi Dum Biryani, Haleem, Double Ka Meetha, Mirchi Ka Salan"
    ]
  },
  "madhya pradesh": {
    title: "Madhya Pradesh — The Heart of Incredible India",
    capital: "Bhopal",
    highlights: [
      "🏛️ **UNESCO Sites:** Khajuraho temples (Kandariya Mahadeva), Sanchi Buddhist Stupa, Bhimbetka prehistoric rock shelters",
      "🐯 **Wildlife:** Bandhavgarh, Kanha & Pench tiger reserves",
      "🏰 **Forts:** Gwalior Fort (Pearl of Indian fortresses), Orchha cenotaphs on the Betwa river",
      "🍲 **Cuisine:** Poha-Jalebi, Bhutte Ka Kees, Dal Bafla, Mawa Bati"
    ]
  },
  "bihar": {
    title: "Bihar — Ancient Seat of Enlightenment & Nalanda",
    capital: "Patna",
    highlights: [
      "☸️ **Enlightenment:** Mahabodhi Temple in Bodh Gaya where Lord Buddha attained enlightenment under the Bodhi Tree",
      "🏛️ **Ancient Learning:** Ruins of Nalanda University and Vikramashila",
      "🎨 **Art:** Madhubani / Mithila paintings, Sujani embroidery",
      "🎉 **Festivals:** Grand Chhath Puja honoring the Sun God along river ghats",
      "🍲 **Cuisine:** Litti Chokha with ghee, Thekua, Sattu Paratha, Khaja of Silao"
    ]
  },
  "goa": {
    title: "Goa — Pearl of the Arabian Sea & Indo-Portuguese Blend",
    capital: "Panaji",
    highlights: [
      "⛪ **Heritage & Churches:** Basilica of Bom Jesus (relics of St. Francis Xavier), Se Cathedral in Old Goa",
      "🏖️ **Beaches & Culture:** Sun-kissed coastline, Dudhsagar waterfalls, Latin Quarter of Fontainhas",
      "🎉 **Festivals:** Goa Carnival, Shigmo folk festival, vibrant night markets",
      "🍲 **Cuisine:** Goan Fish Curry with rice, Pork Vindaloo, Bebinca 7-layer dessert, Feni"
    ]
  },
  "ladakh": {
    title: "Ladakh — Land of High Passes & Tibetan Buddhism",
    capital: "Leh",
    highlights: [
      "🏔️ **Landscapes:** Pangong Tso crystal blue lake, Nubra Valley sand dunes with double-humped Bactrian camels, Khardung La pass",
      "☸️ **Monasteries:** Thiksey, Hemis, Diskit, Alchi monasteries with colorful mask dances (Cham)",
      "🎨 **Crafts:** Pashmina wool weaving, Ladakhi silver and turquoise jewelry",
      "🍲 **Cuisine:** Thukpa, Steamed Momos, Butter tea (Gur Gur chai), Tingmo bread"
    ]
  },
  "jammu and kashmir": {
    title: "Jammu & Kashmir — Paradise on Earth",
    capital: "Srinagar (Summer) / Jammu (Winter)",
    highlights: [
      "🛶 **Lakes & Valleys:** Dal Lake in Srinagar with wooden Shikaras and floating houseboats, Gulmarg ski meadows, Pahalgam",
      "🛕 **Spiritual:** Vaishno Devi shrine in Katra, Amarnath cave, Hazratbal mosque",
      "🎨 **Crafts:** Pure Pashmina shawls, Kashmiri walnut wood carving, Papier-mâché, hand-knotted silk carpets",
      "🍲 **Cuisine:** Royal Wazwan feast (Rogan Josh, Gushtaba, Yakhni), Kahwa saffron tea"
    ]
  },
  "sikkim": {
    title: "Sikkim — Organic Himalayan Paradise of Kanchenjunga",
    capital: "Gangtok",
    highlights: [
      "🏔️ **Majesty:** Mount Kanchenjunga (world's 3rd highest peak), Gurudongmar Lake, Nathu La pass",
      "☸️ **Monasteries:** Rumtek, Enchey, Pemayangtse monasteries",
      "🌱 **World First:** India's 100% fully certified organic farming state",
      "🍲 **Cuisine:** Momos, Gundruk, Phagshapa, Chhurpi cheese soup"
    ]
  }
};

const MONUMENT_KNOWLEDGE: Record<string, string> = {
  "taj mahal": `🏛️ **The Taj Mahal — Jewel of World Heritage (Agra, Uttar Pradesh)**
• **Built by:** Mughal Emperor Shah Jahan in 1632 in memory of his beloved wife Mumtaz Mahal.
• **Architecture:** Masterpiece of Indo-Islamic symmetry using pure white Makrana marble inlaid with 28 types of precious & semi-precious stones (Pietra Dura / Parchin Kari).
• **Did you know?** The four minarets lean slightly outwards so that in case of an earthquake, they would fall away from the main tomb.
• **Virtual Yatra:** You can experience a 3D tour of the Taj Mahal grounds in our **Virtual Yatra** section!`,

  "varanasi ghats": `🌸 **Varanasi Ghats & Kashi Vishwanath (Uttar Pradesh)**
• **History:** One of the oldest continuously inhabited cities on Earth, situated on the sacred Ganga.
• **Dashashwamedh Ghat:** Famous for the evening Ganga Aarti with brass multi-tiered lamps and devotional Vedic chants.
• **Manikarnika & Harishchandra Ghats:** Revered as the holy grounds of Moksha (liberation).
• **Kashi Vishwanath:** One of the 12 sacred Jyotirlingas, newly rejuvenated with a grand corridor directly to the river.`,

  "hawa mahal": `🏰 **Hawa Mahal — The Palace of Winds (Jaipur, Rajasthan)**
• **Built by:** Maharaja Sawai Pratap Singh in 1799, designed by Lal Chand Ustad.
• **Structure:** 5-story pink and red sandstone crown resembling Lord Krishna's mukut, featuring **953 intricately carved jharokhas** (small windows).
• **Purpose:** Allowed royal women to observe street festivals without being seen from outside, while desert breezes naturally cooled the rooms.`,

  "golden temple": `🛕 **Sri Harmandir Sahib — The Golden Temple (Amritsar, Punjab)**
• **Spiritual Home:** The holiest Gurdwara in Sikhism, founded by Guru Ram Das Ji in 1577.
• **Gold Plating:** Maharaja Ranjit Singh overlaid the sanctum with 400 kg of pure gold foil in 1830.
• **Amrit Sarovar:** Surrounded by the holy nectar pool.
• **Langar:** Serves over 100,000 free, nutritious vegetarian meals every single day to all people regardless of background!`,

  "meenakshi amman": `🛕 **Meenakshi Amman Temple (Madurai, Tamil Nadu)**
• **Architecture:** Ancient Dravidian jewel with **14 soaring gopurams**, the tallest standing at 170 feet, adorned with over 33,000 colorful stone sculptures.
• **Hall of 1,000 Pillars:** Features musical stone pillars that emit distinct acoustic swaras when tapped.
• **Deity:** Dedicated to Goddess Meenakshi (an avatar of Parvati) and Sundareswarar (Lord Shiva).`,

  "konark sun temple": `☀️ **Konark Sun Temple (Odisha)**
• **UNESCO World Heritage:** Built in the 13th century by King Narasimhadeva I of the Eastern Ganga Dynasty.
• **Design:** Designed as a colossal stone chariot of Surya (the Sun God) with **24 intricately carved stone wheels** that function as precise astronomical sundials, pulled by 7 stone horses.`
};

const FEATURE_KNOWLEDGE: Record<string, string> = {
  "virtual_yatra": `🗺️ **BharatVerse Virtual Yatra Guide**

Virtual Yatra brings India's most iconic landmarks and spiritual sanctuaries into an interactive 3D guided experience:
1. **Interactive India Map:** Visit **/virtual-yatra** and click on any state or filter by categories (Spiritual, Heritage, Nature, Forts).
2. **State & Destination Hubs:** Explore curated destination cards with travel guides, best time to visit, and local highlights.
3. **Interactive 360° Viewer:** Launch **"Begin Virtual Tour"** to explore multi-scene 3D panoramas with pan, tilt, and scene switching!
4. **Immersive Fullscreen Mode:** Click **"Enter Immersive Mode"** for a distraction-free full-screen journey with keyboard navigation.
5. **Cultural Audio & Facts:** Learn fascinating facts and history embedded in each scene.
6. **Save to My Yatra:** Bookmark any destination with the **❤️ Save** button to track your journeys!`,

  "my_yatra": `❤️ **My Yatra — Your Personal Heritage Journal**

• **How it works:** Whenever you browse Virtual Yatra, click the **"♡ Save to My Yatra"** button on any state, destination, or tour.
• **Track Progress:** Visit **/my-yatra** to see your bookmarked journeys, completed tour scenes, and quick resume links.
• **Authentication:** Make sure you're logged into your BharatVerse account to keep your saved list synced across devices!`,

  "admin_cms": `🛡️ **Admin Dashboard & Yatra CMS**

For users with Admin or Creator privileges:
• Access the dashboard via **/admin** from the top navigation bar.
• **Virtual Yatra Tab:** Add new destinations, configure 360-degree scene images, write cultural facts, and update regional tags.
• **My Content Tab:** Publish and manage regional stories, video reels, handicrafts, and cultural food items.
• **Subscribers Tab:** Track supporters who follow and subscribe via CatchUp ⚡.`,

  "cart_shopping": `🛒 **Authentic Artisan Marketplace & Cart**

• **Explore Crafts:** Browse state pages to discover authentic GI-tagged handicrafts, traditional textiles, and regional delicacies directly from artisans.
• **Add to Cart:** Click **"Add to Cart"** on any product.
• **Checkout:** Go to **/cart** from the navbar to review items, adjust quantities, and complete your order.
• **Fair Trade:** All purchases directly empower local Indian artisan communities!`,

  "catchup": `⚡ **CatchUp (Creator Subscriptions)**

CatchUp connects you directly with regional cultural creators, dancers, culinary masters, and historians:
• Click **"CatchUp ⚡"** on any creator's reel or profile.
• Unlock exclusive tutorials, behind-the-scenes craft workshops, and private live streams!`,

  "support": `📞 **BharatVerse Customer Care & Support**

We are dedicated to helping you enjoy India's heritage:
• 📧 **Email:** support@bharatverse.com
• 📞 **Toll-Free:** 1800-BHARAT-CARE (9 AM – 9 PM IST)
• 🔄 **Returns & Exchanges:** Hassle-free 7-day return policy on all artisan products.
• 📦 **Shipping:** Tracked nationwide shipping dispatched within 48 hours.`
};

// ----------------------------------------------------------------------------
// NATURAL LANGUAGE PROCESSING (NLP) TOKENIZER & CLASSIFIER
// ----------------------------------------------------------------------------
interface IntentMatch {
  intent: string;
  confidence: number;
  entity?: string;
  response: string;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function calculateLevenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function isFuzzyMatch(word: string, target: string, maxDistance: number = 2): boolean {
  if (word === target) return true;
  if (Math.abs(word.length - target.length) > maxDistance) return false;
  return calculateLevenshtein(word, target) <= maxDistance;
}

// Client-Side Semantic NLP Classifier
function classifyQuery(query: string): IntentMatch | null {
  const normalized = query.toLowerCase().trim();
  const tokens = tokenize(query);

  // 1. Check Greetings (Exact word boundaries)
  const greetingWords = ["hi", "hello", "namaste", "hey", "hola", "pranam", "vanakkam", "greetings", "good morning", "good evening", "adaab", "sat sri akaal"];
  if (greetingWords.some(g => normalized === g || (tokens.length <= 3 && tokens.includes(g)))) {
    return {
      intent: "GREETING",
      confidence: 0.99,
      response: `Namaste! 🙏 Welcome to **BharatVerse**.

I am your AI Cultural Assistant & Tour Guide. I can help you explore:
• 🗺️ **Virtual Yatra:** Interactive 3D tours of Varanasi, Taj Mahal, Jaipur, Kerala backwaters & more!
• 🛕 **Monuments & Heritage:** History, architectural secrets, and spiritual legends of India.
• 🎨 **Regional Treasures:** Traditional crafts, folk dances, and authentic regional cuisines.
• 🛍️ **Platform Features:** Saved journeys in **My Yatra**, artisan cart, and Admin CMS.

What part of India would you like to discover today? ✨`
    };
  }

  // 2. Check Monument Entities
  for (const [monumentKey, info] of Object.entries(MONUMENT_KNOWLEDGE)) {
    const monumentWords = monumentKey.split(" ");
    const matchesAll = monumentWords.every(w => normalized.includes(w) || tokens.some(t => isFuzzyMatch(t, w, 1)));
    if (matchesAll) {
      return {
        intent: "MONUMENT_INFO",
        confidence: 0.95,
        entity: monumentKey,
        response: info
      };
    }
  }

  // Check specific popular monuments
  if (normalized.includes("taj") || normalized.includes("tajmahal")) {
    return { intent: "MONUMENT_INFO", confidence: 0.95, entity: "taj mahal", response: MONUMENT_KNOWLEDGE["taj mahal"] };
  }
  if (normalized.includes("varanasi") || normalized.includes("kashi") || normalized.includes("banaras") || normalized.includes("ganga aarti") || normalized.includes("ghat")) {
    return { intent: "MONUMENT_INFO", confidence: 0.95, entity: "varanasi ghats", response: MONUMENT_KNOWLEDGE["varanasi ghats"] };
  }
  if (normalized.includes("hawa mahal") || normalized.includes("hawamahal")) {
    return { intent: "MONUMENT_INFO", confidence: 0.95, entity: "hawa mahal", response: MONUMENT_KNOWLEDGE["hawa mahal"] };
  }
  if (normalized.includes("golden temple") || normalized.includes("harmandir") || normalized.includes("amritsar temple")) {
    return { intent: "MONUMENT_INFO", confidence: 0.95, entity: "golden temple", response: MONUMENT_KNOWLEDGE["golden temple"] };
  }
  if (normalized.includes("meenakshi") || normalized.includes("madurai temple")) {
    return { intent: "MONUMENT_INFO", confidence: 0.95, entity: "meenakshi amman", response: MONUMENT_KNOWLEDGE["meenakshi amman"] };
  }
  if (normalized.includes("konark") || normalized.includes("sun temple")) {
    return { intent: "MONUMENT_INFO", confidence: 0.95, entity: "konark sun temple", response: MONUMENT_KNOWLEDGE["konark sun temple"] };
  }

  // 3. Check State Entities
  for (const [stateKey, data] of Object.entries(STATE_KNOWLEDGE)) {
    const stateWords = stateKey.split(" ");
    const isStateMatch = stateWords.every(w => normalized.includes(w) || tokens.some(t => isFuzzyMatch(t, w, 1)));
    if (isStateMatch) {
      const response = `🇮🇳 **${data.title}** (Capital: ${data.capital})\n\n` +
        data.highlights.join("\n") +
        (data.yatraLink ? `\n\n✨ *Experience our 3D guided tour in [Virtual Yatra](${data.yatraLink})!*` : "");
      return {
        intent: "STATE_INFO",
        confidence: 0.95,
        entity: stateKey,
        response
      };
    }
  }

  // 4. Check Virtual Yatra & 3D Tours Intent
  const yatraKeywords = ["virtual yatra", "yatra", "3d tour", "tour", "360", "panorama", "immersive", "virtual tour", "vr", "explore state"];
  if (yatraKeywords.some(k => normalized.includes(k) || tokens.some(t => isFuzzyMatch(t, k, 1)))) {
    return {
      intent: "VIRTUAL_YATRA_GUIDE",
      confidence: 0.9,
      response: FEATURE_KNOWLEDGE.virtual_yatra
    };
  }

  // 5. Check My Yatra / Bookmarks Intent
  const myYatraKeywords = ["my yatra", "saved tour", "bookmark", "favorite", "save destination", "saved journeys"];
  if (myYatraKeywords.some(k => normalized.includes(k))) {
    return {
      intent: "MY_YATRA_INFO",
      confidence: 0.9,
      response: FEATURE_KNOWLEDGE.my_yatra
    };
  }

  // 6. Check Admin / Content Management Intent
  const adminKeywords = ["admin", "dashboard", "add destination", "publish", "add content", "manage yatra", "cms"];
  if (adminKeywords.some(k => normalized.includes(k) || tokens.some(t => isFuzzyMatch(t, k, 1)))) {
    return {
      intent: "ADMIN_INFO",
      confidence: 0.9,
      response: FEATURE_KNOWLEDGE.admin_cms
    };
  }

  // 7. Check Cart / Shopping Intent
  const cartKeywords = ["cart", "buy", "shop", "purchase", "order", "price", "handicraft", "souvenir"];
  if (cartKeywords.some(k => normalized.includes(k) || tokens.some(t => isFuzzyMatch(t, k, 1)))) {
    return {
      intent: "CART_SHOPPING",
      confidence: 0.9,
      response: FEATURE_KNOWLEDGE.cart_shopping
    };
  }

  // 8. Check CatchUp / Creator Subscriptions Intent
  const catchupKeywords = ["catchup", "subscribe", "subscription", "creator", "exclusive reel", "exclusive"];
  if (catchupKeywords.some(k => normalized.includes(k))) {
    return {
      intent: "CATCHUP_INFO",
      confidence: 0.9,
      response: FEATURE_KNOWLEDGE.catchup
    };
  }

  // 9. Check Customer Support & Returns Intent
  const supportKeywords = ["support", "help", "contact", "email", "phone", "toll free", "refund", "return", "cancel", "delivery", "shipping"];
  if (supportKeywords.some(k => normalized.includes(k) || tokens.some(t => isFuzzyMatch(t, k, 1)))) {
    return {
      intent: "CUSTOMER_SUPPORT",
      confidence: 0.9,
      response: FEATURE_KNOWLEDGE.support
    };
  }

  // 10. Check Classical Dance / Music Intent
  const danceKeywords = ["kathakali", "bharatanatyam", "kathak", "odissi", "kuchipudi", "bhangra", "garba", "ghoomar", "lavani", "bihu", "classical dance", "folk dance"];
  const matchedDance = danceKeywords.find(d => normalized.includes(d));
  if (matchedDance) {
    return {
      intent: "DANCE_CULTURE",
      confidence: 0.88,
      entity: matchedDance,
      response: `💃 **Traditional Dance of India: ${matchedDance.toUpperCase()}**

India is home to classical and folk dance forms that blend storytelling, spiritual devotion, and intricate rhythm:
• **Expression (Abhinaya):** Dancers communicate ancient epics like the Ramayana and Mahabharata using stylized mudras (hand gestures) and expressive eye movements.
• **Musical Accompaniment:** Performed to the live rhythm of the Mridangam, Tabla, Pakhawaj, flute, and classical ragas.
• **Costume & Adornment:** Intricate hand-woven silks, temple jewelry, ghungroos (ankle bells), and elaborate natural mineral face makeup.

You can discover regional dance forms and artisan costumes on each state's page on BharatVerse!`
    };
  }

  // 11. Check Food / Cuisine Intent
  const foodKeywords = ["food", "cuisine", "biryani", "dosa", "idli", "dhokla", "vada pav", "rogan josh", "litti chokha", "butter chicken", "sweets", "mithai", "recipe"];
  const matchedFood = foodKeywords.find(f => normalized.includes(f));
  if (matchedFood) {
    return {
      intent: "FOOD_CUISINE",
      confidence: 0.88,
      entity: matchedFood,
      response: `🍛 **Indian Culinary Heritage — ${matchedFood.toUpperCase()}**

India's gastronomy is an exquisite tapestry of regional spices, slow-cooking traditions, and local harvests:
• **Ayurvedic Philosophy:** Every dish balances the six Ayurvedic tastes (*Shad Rasa*) — sweet, sour, salty, bitter, pungent, and astringent.
• **Heritage Methods:** From the slow dum cooking of Awadh to the clay-pot coastal curries of Kerala and the wood-fired tandoors of Punjab.
• **Sweet Traditions:** Celebrated mithais like Banarasi Malpua, Bengali Rosogolla, and Rajasthani Ghevar.

Explore authentic regional dishes and order artisan gourmet items on state pages!`
    };
  }

  return null;
}

// ----------------------------------------------------------------------------
// MAIN AI RESPONSE FUNCTION
// ----------------------------------------------------------------------------
export const getAiResponse = async (
  userMessage: string,
  history: { role: string; text: string }[] = []
): Promise<string> => {
  const cleanInput = userMessage.trim();
  if (!cleanInput) {
    return "Namaste! 🙏 Please type a question or destination you'd like to explore.";
  }

  // 1. Try Cloud Groq API with valid, verified high-speed models
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    // Current valid models on Groq
    const activeModels = [
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "qwen/qwen3.8-27b",
      "groq/compound",
      "allam-2-7b"
    ];

    for (const model of activeModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const formattedMessages = [
          {
            role: "system",
            content: `You are the BharatVerse AI Cultural Guide & Assistant.
Your mission is to share the rich heritage, monuments, temples, handicrafts, classical dances, cuisine, and history of India across all 28 states and 8 union territories.
You also guide users on how to use BharatVerse features:
1. Virtual Yatra: 3D interactive 360-degree panorama tours, guided scenes, and immersive mode.
2. My Yatra: Bookmarking and tracking visited / saved destinations.
3. Artisan Cart: Buying authentic GI-tagged handicrafts and supporting local artisans.
4. CatchUp: Subscribing to cultural creators.
5. Admin Dashboard: Managing content and yatra scenes.
Guidelines:
- Keep answers inspiring, concise, respectful, and well-structured with markdown headings, bullet points, and relevant emojis.
- Provide accurate historical and cultural details.
- Always be welcoming and polite (e.g. Namaste 🙏).`
          },
          ...history.slice(-4).map(m => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.text
          })),
          { role: "user", content: cleanInput }
        ];

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            messages: formattedMessages,
            temperature: 0.7,
            max_tokens: 750
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          let reply = data.choices?.[0]?.message?.content;
          if (reply && reply.trim()) {
            // Remove any unwanted raw reasoning tags if present in compound models
            reply = reply.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
            return reply;
          }
        }
      } catch (err) {
        // Continue to fallback model or local NLP classifier
        console.warn(`Model ${model} request bypassed, trying next option...`);
      }
    }
  }

  // 2. Intelligent Client-Side Semantic NLP Fallback
  const nlpMatch = classifyQuery(cleanInput);
  if (nlpMatch && nlpMatch.response) {
    return nlpMatch.response;
  }

  // 3. Contextual Default Assistant Response
  return `Namaste! 🙏 Regarding **"${cleanInput}"**:

BharatVerse connects you with India's vibrant cultural heritage, temples, historic monuments, and regional artisans across all 28 states and union territories.

Here are some popular things you can ask me:
• 🛕 **Heritage & Temples:** *"Tell me about the history of Varanasi"*, *"What makes the Taj Mahal unique?"*, or *"Describe the Sun Temple at Konark."*
• 🗺️ **Virtual Yatra:** *"How do I start a 3D virtual tour?"* or *"How to save places in My Yatra?"*
• 🎭 **Arts & Culture:** *"What is Kathakali dance?"*, *"Tell me about Banarasi silk weaving."*, or *"What are traditional foods of Rajasthan?"*
• 🛍️ **Platform Features:** *"How do I buy handicrafts in the Cart?"* or *"How to use the Admin Dashboard?"*

Feel free to ask any specific question! ✨`;
};
