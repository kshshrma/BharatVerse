export interface TourScene {
  id: string;
  destinationSlug: string;
  title: string;
  description: string;
  culturalSignificance: string;
  interestingFact: string;
  imageUrl: string;
  isPanorama?: boolean;
  sceneOrder: number;
}

export interface YatraDestination {
  id: string;
  slug: string;
  name: string;
  stateSlug: string;
  stateName: string;
  region: "North" | "South" | "East" | "West" | "Central" | "North-East";
  category: "heritage" | "spiritual" | "art_craft" | "nature" | "historical" | "food_trail";
  tagline: string;
  description: string;
  culturalSignificance: string;
  historySummary: string;
  heroImageUrl: string;
  panoramaUrl?: string;
  bestTimeToVisit: string;
  isFeatured: boolean;
  highlights: string[];
  attractions: {
    name: string;
    description: string;
    imageUrl: string;
  }[];
  traditions: string[];
  localCrafts: string[];
  famousFood: string[];
  scenes: TourScene[];
}

export interface CulturalState {
  slug: string;
  name: string;
  tagline: string;
  region: "North" | "South" | "East" | "West" | "Central" | "North-East";
  description: string;
  culturalIdentity: string;
  heroImageUrl: string;
  heritageSites: string[];
  traditionalCrafts: string[];
  famousFood: string[];
  festivals: string[];
  traditionalArt: string[];
  musicAndDance: string[];
  quickFacts: string[];
  destinationSlugs: string[];
}

export const CULTURAL_STATES: CulturalState[] = [
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    tagline: "The Cradle of Indian Civilization & Spiritual Awakening",
    region: "North",
    description: "Uttar Pradesh is the heartland of India's classical heritage, situated along the sacred waters of the Ganga and Yamuna. It is the birthplace of great epics, classical Kathak dance, Awadhi cuisine, and architectural wonders spanning ancient empires to the Mughal era.",
    culturalIdentity: "Spiritual sanctity, classical Awadhi etiquette (Tehzeeb), architectural marvels, and monumental pilgrimage traditions.",
    heroImageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80",
    heritageSites: ["Taj Mahal, Agra", "Fatehpur Sikri", "Kashi Vishwanath Temple, Varanasi", "Sarnath Deer Park", "Bara Imambara, Lucknow", "Ram Mandir, Ayodhya"],
    traditionalCrafts: ["Chikankari Embroidery of Lucknow", "Varanasi Silk & Brocades", "Bhadohi Hand-Knotted Carpets", "Moradabad Brassware", "Firozabad Glasswork"],
    famousFood: ["Lucknowi Dum Biryani", "Galouti Kebabs", "Banarasi Paan & Malaiyo", "Bedmi Puri with Aloo", "Peda of Mathura", "Petha of Agra"],
    festivals: ["Dev Deepawali (Varanasi)", "Kumbh Mela (Prayagraj)", "Lathmar Holi (Barsana)", "Taj Mahotsav (Agra)", "Ganga Mahotsav"],
    traditionalArt: ["Sanjhi Paper Art of Mathura", "Zardozi Metallic Embroidery", "Mughal Miniature Inlay (Pietra Dura)"],
    musicAndDance: ["Kathak Classical Dance", "Thumri & Dadra Classical Vocal Forms", "Kajari Folk Music", "Rasiya of Braj"],
    quickFacts: [
      "Varanasi is widely regarded as one of the oldest continuously inhabited cities on Earth.",
      "Gautam Buddha delivered his first sermon ('Dhammacakkappavattana Sutta') at Sarnath in 528 BCE.",
      "The Taj Mahal in Agra is a UNESCO World Heritage Site and one of the New 7 Wonders of the World."
    ],
    destinationSlugs: ["varanasi", "agra", "ayodhya", "lucknow", "sarnath"]
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "The Land of Kings, Forts, Colors and Folklore",
    region: "West",
    description: "Rajasthan radiates royal grandeur through hill forts, sun-kissed sand dunes, exquisite palaces, and vibrant folk arts. Its timeless chivalric history blends with colorful turbans, Ghoomar dance, and artisanal mastery in textiles and jewelry.",
    culturalIdentity: "Rajput valor, desert folklore, royal palatial architecture, vibrant bandhani textiles, and warm hospitality ('Padharo Mhare Desh').",
    heroImageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
    heritageSites: ["Amber Palace & Hawa Mahal, Jaipur", "Mehrangarh Fort, Jodhpur", "City Palace & Lake Pichola, Udaipur", "Jaisalmer Golden Fort", "Chittorgarh Fort"],
    traditionalCrafts: ["Jaipur Blue Pottery", "Bagru & Sanganeri Block Prints", "Bandhani & Leheriya Tie-Dye", "Meenakari Enamel Jewelry", "Mojari Leather Footwear"],
    famousFood: ["Dal Baati Churma", "Laal Maas", "Gatte ki Sabzi", "Ghevar", "Ker Sangri", "Pyaaz Kachori"],
    festivals: ["Pushkar Camel Fair", "Desert Festival (Jaisalmer)", "Teej Festival (Jaipur)", "Gangaur Festival", "Mewar Festival (Udaipur)"],
    traditionalArt: ["Phad Narrative Scroll Painting", "Pichwai Art of Nathdwara", "Miniature Paintings of Kishangarh"],
    musicAndDance: ["Ghoomar Dance", "Kalbelia Nomadic Dance", "Manganiyar & Langa Folk Traditions", "Chari Fire Dance"],
    quickFacts: [
      "Jaisalmer is one of the very few 'living forts' in the world, where a quarter of the old city's population still resides inside the fort walls.",
      "Jaipur is India's first planned city, planned according to Vedic Vastu Shastra in 1727.",
      "The Thar Desert's Sambhar Salt Lake is India's largest inland salt lake."
    ],
    destinationSlugs: ["jaipur", "udaipur", "jaisalmer", "jodhpur"]
  },
  {
    slug: "kerala",
    name: "Kerala",
    tagline: "God's Own Country — Coastal Harmony & Ancient Traditions",
    region: "South",
    description: "Kerala is a verdant paradise celebrated for emerald backwaters, Ayurvedic wellness, classical Kathakali theater, aromatic spice plantations, and centuries of maritime spice trade with Greeks, Arabs, and Europeans.",
    culturalIdentity: "Living temple rituals, Ayurvedic holistic healing, martial art legacy (Kalaripayattu), and harmonious multicultural heritage.",
    heroImageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    heritageSites: ["Mattancherry Dutch Palace, Kochi", "Padmanabhaswamy Temple, Thiruvananthapuram", "Bekal Coastal Fort", "Munnar Tea Estates", "Alleppey Backwater Canals"],
    traditionalCrafts: ["Aranmula Metal Mirror (Kannadi)", "Kasavu Handloom Saree", "Coir & Coconut Shell Crafts", "Nettur Petti Wooden Boxes", "Kathakali Headgear Masks"],
    famousFood: ["Kerala Sadya on Banana Leaf", "Appam with Ishtu", "Malabar Fish Curry", "Puttu and Kadala Curry", "Karimeen Pollichathu", "Banana Chips"],
    festivals: ["Onam Grand Harvest Festival", "Thrissur Pooram Elephant Pageant", "Nehru Trophy Snake Boat Race", "Vishu New Year", "Theyyam Ritual Season"],
    traditionalArt: ["Mural Paintings of Kerala", "Theyyam Sacred Dance Rituals", "Koothu Temple Theater"],
    musicAndDance: ["Kathakali Dance Drama", "Mohiniyattam 'Dance of the Enchantress'", "Sopana Sangeetham", "Chenda Melam Percussion Ensemble"],
    quickFacts: [
      "Aranmula Kannadi is a handmade metal alloy mirror whose secret metallurgical composition is known only to a single hereditary family guild.",
      "Kalaripayattu, originating in Kerala around the 3rd century BCE, is considered the mother of all martial arts.",
      "Padmanabhaswamy Temple contains underground vaults storing one of the most valuable collections of gold and gemstones in human history."
    ],
    destinationSlugs: ["kochi", "alappuzha", "thiruvananthapuram"]
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    tagline: "Vibrant Heritage, White Salt Deserts & Living Crafts",
    region: "West",
    description: "Gujarat is the land of legends, home to the ancient Indus Valley site of Lothal, the Asiatic Lion sanctuary of Gir, the sparkling White Rann of Kutch, and an unbroken lineage of master craftspeople.",
    culturalIdentity: "Entrepreneurial spirit, Garba dance fervor, intricate handcrafts, Jain and Vedic architecture, and Mahatma Gandhi's philosophy of Ahimsa.",
    heroImageUrl: "https://images.unsplash.com/photo-1597044141240-ab55018693ef?auto=format&fit=crop&w=1600&q=80",
    heritageSites: ["Rani ki Vav Stepwell (Patan)", "Sun Temple, Modhera", "Somnath & Dwarkadhish Temples", "Sabarmati Ashram, Ahmedabad", "Lothal Harappan Port"],
    traditionalCrafts: ["Patan Patola Double Ikat", "Kutch Rogan Art Painting", "Ajrakh Natural Dye Block Printing", "Bandhani Tie-Dye", "Sankheda Lacquered Furniture"],
    famousFood: ["Gujarati Thali & Undhiyu", "Dhokla & Khandvi", "Fafda Jalebi", "Handvo", "Shrikhand", "Khaman"],
    festivals: ["Navratri 9-Night Garba Celebration", "Rann Utsav (White Desert)", "International Kite Festival (Uttarayan)", "Modhera Dance Festival"],
    traditionalArt: ["Pithora Tribal Paintings", "Rogan Freehand Oil Art", "Lippan Kaam Mud-Mirror Work"],
    musicAndDance: ["Garba & Dandiya Raas", "Dayro Folk Storytelling", "Sugam Sangeet"],
    quickFacts: [
      "Rani ki Vav in Patan is an inverted stepwell designed as an underground subterranean temple with over 500 principal sculptures.",
      "Rogan art from Nirona village in Kutch uses boiled castor oil and mineral pigments and is preserved by only one remaining family.",
      "Gujarat has India's longest coastline spanning over 1,600 km."
    ],
    destinationSlugs: ["ahmedabad", "kutch", "dwarka"]
  },
  {
    slug: "west-bengal",
    name: "West Bengal",
    tagline: "The Soul of Art, Literature, Terracotta & Durga Puja",
    region: "East",
    description: "West Bengal is India's cultural epicenter of literature, theater, cinema, and festive euphoria. From the colonial grandeur of Kolkata to the terracotta temples of Bishnupur and the misty tea hills of Darjeeling, Bengal breathes poetry and passion.",
    culturalIdentity: "Intellectual Renaissance, Nobel laureates (Rabindranath Tagore), UNESCO Durga Puja celebration, and delicate sweets.",
    heroImageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1600&q=80",
    heritageSites: ["Victoria Memorial & Howrah Bridge, Kolkata", "Terracotta Temples of Bishnupur", "Darjeeling Himalayan Railway", "Sundarbans Mangrove Forest", "Shantiniketan (Visva-Bharati)"],
    traditionalCrafts: ["Dokra Bell-Metal Casting", "Baluchari & Jamdani Sarees", "Terracotta Pottery & Tiles", "Kantha Stitch Embroidery", "Sholapith Sculptures"],
    famousFood: ["Kolkata Biryani with Aloo", "Macher Jhol (Fish Curry)", "Kosha Mangsho with Luchi", "Rosogolla & Sandesh", "Mishti Doi", "Kathi Rolls"],
    festivals: ["Durga Puja (UNESCO Intangible Cultural Heritage)", "Poush Mela (Shantiniketan)", "Kolkata Book Fair", "Jagaddhatri Puja", "Basanta Utsav (Holi)"],
    traditionalArt: ["Kalighat Painting", "Patachitra Narrative Scrolls", "Terracotta Wall Reliefs"],
    musicAndDance: ["Rabindra Sangeet", "Baul Mystical Minstrel Music", "Gaudiya Nritya Classical Dance", "Chhau Masked Dance of Purulia"],
    quickFacts: [
      "Kolkata's Durga Puja was officially inscribed onto the UNESCO Representative List of the Intangible Cultural Heritage of Humanity in 2021.",
      "Shantiniketan, founded by Rabindranath Tagore, is a UNESCO World Heritage Site embodying open-air humanist education.",
      "The Darjeeling Himalayan Railway ('Toy Train') has operated continuously since 1881."
    ],
    destinationSlugs: ["kolkata", "darjeeling", "bishnupur"]
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    tagline: "The Land of Dravidian Gopurams, Classical Carnatic & Silk",
    region: "South",
    description: "Tamil Nadu is home to one of the world's longest surviving classical civilizations, defined by monumental Dravidian temple towers (Gopurams), the profound rhythms of Carnatic music, and the sacred precision of Bharatanatyam.",
    culturalIdentity: "Classical Tamil literature dating back 2,000+ years, Chola bronzes, soaring temple architecture, and vibrant temple festivals.",
    heroImageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    heritageSites: ["Brihadisvara Temple, Thanjavur (Great Living Chola Temples)", "Meenakshi Amman Temple, Madurai", "Group of Monuments at Mahabalipuram", "Ramanathaswamy Temple, Rameswaram", "Nilgiri Mountain Railway"],
    traditionalCrafts: ["Kanchipuram Pure Mulberry Silk Sarees", "Thanjavur Gold Foil Paintings", "Swamimalai Bronze Sculptures", "Pattamadai Grass Mats", "Chettinad Kottan Baskets"],
    famousFood: ["Chettinad Chicken & Mutton Curries", "Crispy Masala Dosa with Sambar", "Idli & Medu Vada with Chutneys", "Filter Coffee (Kaapi)", "Jigarthanda of Madurai", "Pongal"],
    festivals: ["Pongal Harvest Festival", "Margazhi Music & Dance Festival (Chennai)", "Chithirai Festival (Madurai)", "Mahamaham (Kumbakonam)", "Karthigai Deepam"],
    traditionalArt: ["Thanjavur Painting with Semi-precious Stones", "Kolam Rice Flour Geometric Floor Art", "Chola Lost-Wax Bronze Casting"],
    musicAndDance: ["Bharatanatyam Classical Dance", "Carnatic Vocal & Instrumental Music", "Nadaswaram & Thavil Temple Music", "Karagattam Folk Dance"],
    quickFacts: [
      "The Brihadisvara Temple in Thanjavur was built in 1010 CE entirely from granite; its monolithic apex dome (Kumbam) weighs an astounding 80 tonnes.",
      "Tamil is recognized as the world's oldest surviving classical language with literary works documented over 2,500 years.",
      "Madurai is known as 'Thoonga Nagaram' (the city that never sleeps), with vibrant night markets operating around Meenakshi Temple."
    ],
    destinationSlugs: ["madurai", "thanjavur", "mahabalipuram"]
  }
];

export const YATRA_DESTINATIONS: YatraDestination[] = [
  // UTTAR PRADESH
  {
    id: "dest-up-varanasi",
    slug: "varanasi",
    name: "Varanasi (Kashi)",
    stateSlug: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    region: "North",
    category: "spiritual",
    tagline: "The Timeless City of Light & Cosmic Moksha",
    description: "Varanasi, or Kashi, is the spiritual capital of India. Resting on the crescent bank of the holy Ganga, this eternal city has been a beacon of learning, philosophy, music, and transcendent spiritual liberation for more than three millennia.",
    culturalSignificance: "Celebrated as the abode of Lord Shiva (Kashi Vishwanath), Varanasi is the ultimate pilgrimage destination for Hindus seeking Moksha (liberation from the cycle of rebirth). It is also where great masters like Kabir, Tulsidas, and Ravi Shankar created enduring spiritual and musical legacies.",
    historySummary: "Documented in the Rigveda and the Puranas, Kashi was visited by the Buddha in the 6th century BCE and Adi Shankaracharya in the 8th century CE. It withstood centuries of transformations while fiercely preserving its traditions of Sanskrit scholarship, Ganga devotion, and Banarasi craft.",
    heroImageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=2000&q=80",
    bestTimeToVisit: "October to March (for pleasant mornings and Dev Deepawali)",
    isFeatured: true,
    highlights: [
      "Evening Ganga Aarti at Dashashwamedh Ghat with synchronized brass lamps",
      "Subah-e-Banaras sunrise boat ride along the 84 ancient ghats",
      "Kashi Vishwanath Jyotirlinga Temple & the grand Vishwanath Corridor",
      "Centuries-old Banarasi silk weaving looms in ancient gallis (alleys)",
      "Banaras Gharana classical music sessions and tabla traditions"
    ],
    attractions: [
      {
        name: "Dashashwamedh Ghat",
        description: "The most prominent ghat in Varanasi where the spectacular Ganga Aarti takes place every evening at dusk with resonant conch shells and incense.",
        imageUrl: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Kashi Vishwanath Temple",
        description: "One of the twelve sacred Jyotirlinga shrines of Shiva, with towering golden spires and an expansive modern corridor leading to the riverfront.",
        imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Manikarnika & Assi Ghats",
        description: "Assi Ghat marks the southern confluence where yogis and pilgrims gather at dawn, while Manikarnika is the eternal sacred cremation ghat reflecting the reality of life and eternity.",
        imageUrl: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Maha Aarti at Sundown", "Morning Surya Namaskar by the Ganga", "Sanskrit Chanting in Vedic Gurukuls", "Boat rides during Brahma Muhurta"],
    localCrafts: ["Banarasi Silk Katan & Zari Sarees", "Gulabi Meenakari Pink Enamelwork", "Wooden Toys of Varanasi", "Stone Carving of Chunar"],
    famousFood: ["Banarasi Malaiyo (Frothy Winter Saffron Milk)", "Tamatar Chaat", "Kachori Jalebi", "Banarasi Meetha Paan", "Chooda Matar"],
    scenes: [
      {
        id: "vns-s1",
        destinationSlug: "varanasi",
        title: "Subah-e-Banaras: Dawn over the Holy Ghats",
        description: "As the first rays of the morning sun paint the misty waters of the holy Ganga in liquid gold, thousands of pilgrims descend the ancient stone steps of Assi and Dashashwamedh Ghats for ritual morning ablutions and chanting.",
        culturalSignificance: "Brahma Muhurta (dawn) by the Ganga is considered the most sacred hour in Vedic tradition, where prayers to Surya Bhagavan symbolize spiritual awakening.",
        interestingFact: "Varanasi has 84 interconnected ghats, each built by different royal dynasties from across India (including Marathas, Holkars, and Scindias) over centuries.",
        imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "vns-s2",
        destinationSlug: "varanasi",
        title: "The Grand Ganga Aarti at Dashashwamedh",
        description: "Priests adorned in saffron robes wield multi-tiered heavy brass lamps in synchronized circular motions, accompanied by conch blows, ringing bells, and hymns that reverberate across the river.",
        culturalSignificance: "The Aarti is an offering of deep gratitude to Mother Ganga, expressing reverence for water as the sustainer of cosmic life.",
        interestingFact: "Each brass lamp used in the Grand Aarti contains 108 lit wicks soaked in pure camphor and ghee, creating a mesmerizing flame pattern in the dark.",
        imageUrl: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      },
      {
        id: "vns-s3",
        destinationSlug: "varanasi",
        title: "Kashi Vishwanath & The Golden Spires",
        description: "Standing in the heart of Varanasi, the Kashi Vishwanath temple enshrines the Jyotirlinga of Lord Shiva. The newly developed corridor directly unites the sacred temple with the river ghats.",
        culturalSignificance: "According to Hindu philosophy, hearing the Tarak Mantra from Shiva here at Kashi liberates the soul directly into supreme cosmic consciousness.",
        interestingFact: "In 1835, Maharaja Ranjit Singh of Punjab donated one tonne of pure gold to plate the towering domes and spires of Kashi Vishwanath.",
        imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 3
      },
      {
        id: "vns-s4",
        destinationSlug: "varanasi",
        title: "The Alleys & Master Weavers of Banarasi Silk",
        description: "Deep within the labyrinthine narrow alleys ('gallis') of Varanasi, master weavers work on traditional jacquard looms, interweaving pure mulberry silk threads with real gold and silver zari.",
        culturalSignificance: "Banarasi silk weaving is an art form refined over 500 years, passed down through generations of families embodying India's syncretic artisan heritage.",
        interestingFact: "A single master-crafted bridal Banarasi saree with intricate Mughal floral motifs ('Jal') can take anywhere from 15 days to 6 months of continuous handloom work.",
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 4
      },
      {
        id: "vns-s5",
        destinationSlug: "varanasi",
        title: "Dev Deepawali: The Night of Gods",
        description: "On the full moon night of Kartik Purnima, all 84 ghats of Varanasi are illuminated with over one million earthen oil lamps (diyas), transforming the riverfront into a sparkling galaxy.",
        culturalSignificance: "Belief holds that the Devas (gods) descend from the heavens to bathe in the holy Ganga on this auspicious night after Shiva vanquished the demon Tripurasura.",
        interestingFact: "Visitors from over 70 countries converge on boat fleets along the river to witness the uninterrupted 7-kilometer riverbank glow with glowing clay lamps.",
        imageUrl: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 5
      }
    ]
  },
  {
    id: "dest-up-agra",
    slug: "agra",
    name: "Agra",
    stateSlug: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    region: "North",
    category: "heritage",
    tagline: "The Monumental City of White Marble & Mughal Grandeur",
    description: "Situated on the banks of the Yamuna River, Agra is home to some of the world's most breathtaking architectural wonders, including the ethereal Taj Mahal, the imposing red sandstone Agra Fort, and nearby Fatehpur Sikri.",
    culturalSignificance: "Agra was the prime capital of the Mughal Empire at the height of its power and cultural patronage, producing a legendary blend of Persian, Central Asian, and indigenous Indian architectural styles.",
    historySummary: "Sultan Sikandar Lodi founded modern Agra in 1504, but it reached its zenith under emperors Akbar, Jahangir, and Shah Jahan, who commissioned monumental forts, garden mausoleums, and exquisite Pietra Dura marble inlay artwork.",
    heroImageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80",
    bestTimeToVisit: "October to March",
    isFeatured: true,
    highlights: [
      "Taj Mahal sunrise view with changing hues of white Makrana marble",
      "Agra Fort with Jahangiri Mahal and views of the Yamuna",
      "Fatehpur Sikri royal complex & Buland Darwaza",
      "Pietra Dura (Parchin Kari) marble inlay workshops in the old bazaar"
    ],
    attractions: [
      {
        name: "The Taj Mahal",
        description: "A UNESCO World Heritage monument of love commissioned by Emperor Shah Jahan in 1632, renowned worldwide for its flawless symmetrical perfection.",
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Agra Fort",
        description: "A colossal red sandstone fortress comprising royal palaces, marble audience halls (Diwan-i-Khas), and lush courtyards overlooking the Taj Mahal.",
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Buland Darwaza, Fatehpur Sikri",
        description: "The 54-meter tall 'Gate of Magnificence' built by Akbar to commemorate his victory over Gujarat in 1601.",
        imageUrl: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Parchin Kari stone carving", "Mughlai culinary feasts", "Sufi Qawwali at Dargah Salim Chishti"],
    localCrafts: ["Pietra Dura Marble Inlay", "Zardozi Embroidered Silk", "Agra Leather Footwear", "Soapstone Sculptures"],
    famousFood: ["Agra Petha (Sweet Ash Gourd Candy)", "Bedai with spicy Aloo Sabzi", "Mughlai Parathas", "Dalmoth Namkeen"],
    scenes: [
      {
        id: "agr-s1",
        destinationSlug: "agra",
        title: "The Taj Mahal at Sunrise",
        description: "As dawn breaks, the translucent white Makrana marble of the Taj Mahal reflects soft pink and warm golden hues, mirrored in the still waters of the Yamuna and the lotus fountain pool.",
        culturalSignificance: "Regarded as the pinnacle of Mughal architectural design, embodying harmony, symmetry, and paradise on Earth.",
        interestingFact: "The four outer minarets were deliberately constructed with a slight outward tilt so that in the event of an earthquake, they would collapse away from the central dome.",
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "agr-s2",
        destinationSlug: "agra",
        title: "Inside Agra Fort: The Red Citadel",
        description: "Behind massive 70-foot-high sandstone ramparts lie regal palaces, marble pavilions, and the Musamman Burj — the octagonal marble tower where Shah Jahan spent his final years gazing at the Taj Mahal.",
        culturalSignificance: "Agra Fort was the primary seat of Mughal government and the treasury of the Koh-i-Noor diamond.",
        interestingFact: "The fort is encircled by a double moat — the inner one once filled with ferocious crocodiles and the outer with dense jungle.",
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      },
      {
        id: "agr-s3",
        destinationSlug: "agra",
        title: "Fatehpur Sikri & Buland Darwaza",
        description: "A deserted ghost city of red sandstone built by Emperor Akbar, crowned by the towering Buland Darwaza and the white marble mausoleum of Sufi saint Sheikh Salim Chishti.",
        culturalSignificance: "A unique testament to Akbar's syncretic 'Din-i Ilahi' philosophy, fusing Islamic, Hindu, and Jain architectural motifs.",
        interestingFact: "Fatehpur Sikri was abandoned only 14 years after its construction due to scarcity of local drinking water.",
        imageUrl: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 3
      },
      {
        id: "agr-s4",
        destinationSlug: "agra",
        title: "The Living Art of Parchin Kari (Pietra Dura)",
        description: "Direct descendants of the imperial craftsmen who built the Taj Mahal continue the painstaking craft of cutting precious lapis lazuli, malachite, jasper, and mother-of-pearl to inlay into marble.",
        culturalSignificance: "An unbroken artisanal tradition passed through family lineages for over 400 years.",
        interestingFact: "A single marble petal in complex floral inlay work can require up to 40 individual hand-cut gemstone fragments.",
        imageUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 4
      }
    ]
  },
  {
    id: "dest-up-ayodhya",
    slug: "ayodhya",
    name: "Ayodhya",
    stateSlug: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    region: "North",
    category: "spiritual",
    tagline: "The Sacred Capital of Kosala & The Birthplace of Sri Rama",
    description: "Ayodhya, situated along the sacred Sarayu River, is one of the seven holy cities (Sapta Puri) of Sanatana Dharma. Revered as the historic capital of the Suryavanshi kings and the birthplace of Lord Rama, it has re-emerged as a vibrant pilgrimage hub.",
    culturalSignificance: "The setting of the ancient epic Ramayana, celebrated for the values of Dharma, righteous governance (Ramrajya), and devotional devotion.",
    historySummary: "An ancient metropolis ruled by the Ikshvaku dynasty according to ancient chronicles, Ayodhya is home to hundreds of historic temples, sacred bathing ghats, and the newly consecrated Shri Ram Janmabhoomi Mandir.",
    heroImageUrl: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "November to March and during Deepotsav / Ram Navami",
    isFeatured: false,
    highlights: [
      "Shri Ram Janmabhoomi Mandir built in traditional Nagara style architecture",
      "Deepotsav celebration on the banks of Sarayu with world-record earthen lamps",
      "Hanuman Garhi 10th-century fortress temple",
      "Sarayu River evening Aarti at Ram ki Paidi"
    ],
    attractions: [
      {
        name: "Shri Ram Janmabhoomi Mandir",
        description: "A monumental pink Bansi Paharpur sandstone temple built strictly using traditional stone interlocking techniques without structural steel.",
        imageUrl: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Hanuman Garhi",
        description: "A 10th-century temple complex perched on a hillock accessed via 76 wide stone steps, revered as the guardian citadel of Ayodhya.",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Ram Leela theatrical performances", "Deepotsav river lighting", "Sarayu Snana (ritual bath)"],
    localCrafts: ["Wooden Ram Mandir Models", "Brass Puja Utensils", "Ayodhya Temple Souvenirs"],
    famousFood: ["Ayodhya Rabri & Peda", "Sita Bhog", "Dal Kachori with Hing Aloo", "Laddoo Prasad"],
    scenes: [
      {
        id: "ayd-s1",
        destinationSlug: "ayodhya",
        title: "Shri Ram Janmabhoomi Mandir",
        description: "The magnificent temple stands tall in classical Nagara style with ornate carved pillars, sculpted mandapas, and golden sanctum doors depicting episodes from the Ramayana.",
        culturalSignificance: "The culmination of a multi-century spiritual aspiration for millions of devotees across the globe.",
        interestingFact: "The temple is constructed entirely without iron or steel reinforcement and is designed to endure for over 1,000 years.",
        imageUrl: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "ayd-s2",
        destinationSlug: "ayodhya",
        title: "Ram ki Paidi & The Holy Sarayu Aarti",
        description: "A series of wide stone steps on the bank of the pristine Sarayu River where hundreds of lamps float serenely during twilight Aarti.",
        culturalSignificance: "The Sarayu River is revered as the divine witness to Lord Rama's life and his ultimate ascension.",
        interestingFact: "During the annual Deepotsav, over 2.2 million earthen diyas are lit simultaneously on the banks of Sarayu, setting Guinness World Records.",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      }
    ]
  },
  {
    id: "dest-up-lucknow",
    slug: "lucknow",
    name: "Lucknow",
    stateSlug: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    region: "North",
    category: "food_trail",
    tagline: "The Royal City of Nawabs, Adab, Chikankari & Dum Pukht Cuisine",
    description: "Lucknow is the heart of northern Indian refinement, famous for its Nawabi court culture, poetic Urdu traditions, monumental arched gateways, and an internationally celebrated culinary repertoire.",
    culturalSignificance: "Representing the golden age of Awadhi 'Tehzeeb' (refined etiquette), classical Kathak Lucknow Gharana, and unmatched craftsmanship in Chikankari embroidery.",
    historySummary: "As the capital of the Nawabs of Awadh in the 18th and 19th centuries, Lucknow became a sanctuary for artists, poets, and musicians, yielding distinct architecture like the pillarless Bara Imambara.",
    heroImageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "October to March",
    isFeatured: false,
    highlights: [
      "Bara Imambara & the mysterious labyrinth of Bhool Bhulaiya",
      "Rumi Darwaza 60-foot monumental gateway",
      "Centuries-old Chikankari needlework markets of Chowk",
      "Authentic Awadhi Dum Pukht Biryani & melt-in-mouth Galouti Kebabs"
    ],
    attractions: [
      {
        name: "Bara Imambara Complex",
        description: "An architectural marvel built in 1784 featuring the world's largest unsupported vaulted hall and a dense 3D maze above it.",
        imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Rumi Darwaza",
        description: "An imposing 60-foot ornamental gate inspired by the gateway of Istanbul, symbolizing the entrance to historic Lucknow.",
        imageUrl: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Awadhi Dastarkhwan feasting", "Shayari (Urdu poetry gatherings)", "Kathak Lucknow Gharana riyaz"],
    localCrafts: ["Chikankari Hand Embroidery", "Zardozi Work", "Attar Perfume Distillation of Kannauj", "Bone Carving"],
    famousFood: ["Awadhi Dum Biryani", "Galouti & Tunday Kebabs", "Sheermal Saffron Bread", "Shahi Tukda", "Kulfi Falooda"],
    scenes: [
      {
        id: "lko-s1",
        destinationSlug: "lucknow",
        title: "The Gravity-Defying Bara Imambara",
        description: "A monumental hall built by Nawab Asaf-ud-Daula without a single supporting pillar or iron girder, using a lightweight hollow brick roof system.",
        culturalSignificance: "Built during a devastating famine as a food-for-work relief project to sustain nobles and common citizens equally.",
        interestingFact: "The central vaulted chamber is 50 meters long and 15 meters high, held together only by interlocking bricks and lime-urad mortar.",
        imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "lko-s2",
        destinationSlug: "lucknow",
        title: "Bhool Bhulaiya: The 3D Labyrinth",
        description: "An intricate maze of 1,000 interconnected passages and 489 identical doorways sitting above the main hall, designed to disorient invaders while allowing whispering acoustics.",
        culturalSignificance: "A masterpiece of acoustic and architectural engineering from 18th century India.",
        interestingFact: "A person standing at one end of a 50-meter balcony can clearly hear the striking of a match at the opposite end.",
        imageUrl: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      }
    ]
  },
  {
    id: "dest-up-sarnath",
    slug: "sarnath",
    name: "Sarnath",
    stateSlug: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    region: "North",
    category: "heritage",
    tagline: "The Sacred Deer Park Where the Wheel of Dharma Was Turned",
    description: "Located just 10 km from Varanasi, Sarnath is one of Buddhism's four primary pilgrimage sites. Here, under the serene gazes of ancient stupas, Gautama Buddha delivered his first sermon after attaining Enlightenment.",
    culturalSignificance: "The birthplace of the Buddhist Sangha (monastic order) and the site of Emperor Ashoka's Lion Capital, which today stands as the official National Emblem of the Republic of India.",
    historySummary: "Flourished from the 3rd century BCE under Emperor Ashoka through the Gupta Empire, producing masterpieces of Buddhist sculpture that influenced art across Asia.",
    heroImageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "November to March and during Buddha Purnima",
    isFeatured: false,
    highlights: [
      "Dhamek Stupa monumental 43-meter cylindrical stone and brick shrine",
      "Ashokan Lion Capital at the Sarnath Archaeological Museum",
      "Mulagandha Kuti Vihara modern Buddhist temple with Japanese frescoes",
      "Ancient ruins of Dharmarajika Stupa and monastic cloisters"
    ],
    attractions: [
      {
        name: "Dhamek Stupa",
        description: "The massive stupa marking the exact spot of Buddha's first sermon, decorated with intricate Gupta-era geometric and floral carvings.",
        imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Vipassana meditation", "Chanting of the Dhammacakkappavattana Sutta", "Circumambulation of Stupas"],
    localCrafts: ["Buddhist Thangka Replicas", "Stone Carved Buddha Figurines", "Incense & Singing Bowls"],
    famousFood: ["Traditional Sattvic Vegetarian Fare", "Sarnath Herbal Teas", "Kheer Prasad"],
    scenes: [
      {
        id: "srn-s1",
        destinationSlug: "sarnath",
        title: "The Majestic Dhamek Stupa",
        description: "Rising 43.6 meters high in a peaceful deer park, the Dhamek Stupa stands on the sacred site where the Buddha revealed the Four Noble Truths and the Noble Eightfold Path.",
        culturalSignificance: "Commemorates the genesis of Buddhism as a world philosophy in 528 BCE.",
        interestingFact: "The lower stone perimeter contains 8 exquisitely carved niches with delicate swastika, floral, and bird motifs sculpted during the Gupta Golden Age.",
        imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      }
    ]
  },

  // RAJASTHAN
  {
    id: "dest-rj-jaipur",
    slug: "jaipur",
    name: "Jaipur (The Pink City)",
    stateSlug: "rajasthan",
    stateName: "Rajasthan",
    region: "West",
    category: "heritage",
    tagline: "The UNESCO World Heritage City of Palaces, Jantar Mantar & Royal Grandeur",
    description: "Jaipur, the capital of Rajasthan, is a world-renowned UNESCO World Heritage city built in pink terracotta stone. Founded in 1727 by Maharaja Sawai Jai Singh II, it seamlessly blends majestic hill forts, palatial courtyards, astronomy observatories, and vibrant bazaars.",
    culturalSignificance: "India's first planned city built on the principles of Vedic Shilpa Shastra, celebrated for its living artisanal guilds, royal Rajput pageantry, and jewelry craft.",
    historySummary: "Constructed to succeed the historic fort capital of Amber, Jaipur remained an autonomous princely state renowned for royal patronage of astronomical science, music, and decorative arts.",
    heroImageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
    panoramaUrl: "https://images.unsplash.com/photo-1603288967669-e9329c071d18?auto=format&fit=crop&w=2000&q=80",
    bestTimeToVisit: "October to March",
    isFeatured: true,
    highlights: [
      "Hawa Mahal (Palace of Winds) with 953 honeycombed jharokha windows",
      "Amber Fort's Sheesh Mahal (Palace of Mirrors) glowing under candlelight",
      "Jantar Mantar UNESCO-inscribed stone astronomical observatory",
      "City Palace museum and the royal family's private chambers",
      "Johari Bazaar for emeralds, kundan jewelry, and Jaipur blue pottery"
    ],
    attractions: [
      {
        name: "Hawa Mahal",
        description: "A 5-story pink sandstone facade resembling Lord Krishna's crown, constructed so royal women could observe street festivities unseen.",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Amber Fort & Sheesh Mahal",
        description: "A hilltop fortress palace with expansive courtyards, subterranean escape tunnels, and the world's finest mirror-mosaic chamber.",
        imageUrl: "https://images.unsplash.com/photo-1603288967669-e9329c071d18?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Jantar Mantar",
        description: "An open-air astronomical observatory housing the world's largest stone sundial (Samrat Yantra), accurate to within 2 seconds.",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Teej and Gangaur royal processions", "Puppet theatre (Kathputli)", "Folk music at Chokhi Dhani"],
    localCrafts: ["Jaipur Blue Pottery", "Sanganeri & Bagru Block Print Textiles", "Kundan-Meenakari Gold Jewelry", "Marble Sculptures"],
    famousFood: ["Dal Baati Churma with Ghee", "Pyaaz Kachori of Rawat", "Ghevar Cake", "Laal Maas (Royal Mutton Curry)", "Mawa Kachori"],
    scenes: [
      {
        id: "jpr-s1",
        destinationSlug: "jaipur",
        title: "Hawa Mahal: The Palace of the Winds",
        description: "Standing gracefully in the heart of the Pink City, the 5-story Hawa Mahal features 953 delicately sculpted jharokhas that funnel gentle desert breezes through cooling venturi chambers.",
        culturalSignificance: "Engineered as an acoustic and thermal triumph in 1799 by Lal Chand Ustad under Maharaja Sawai Pratap Singh.",
        interestingFact: "Hawa Mahal has no foundation and stands atop a slight 8-inch thick wall, stabilized by its curved pyramidal geometry.",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "jpr-s2",
        destinationSlug: "jaipur",
        title: "Sheesh Mahal of Amber Fort",
        description: "The Hall of Mirrors inside Amber Fort is coated in thousands of convex Belgian glass mirrors set inside intricate plaster reliefs, designed to illuminate the entire hall from a single candle.",
        culturalSignificance: "Reflects the zenith of Mughal-Rajput artistic collaboration in the 17th century.",
        interestingFact: "When royal queens sat in the chamber with candlelight, the reflection on the convex mirrors looked like a starry night sky.",
        imageUrl: "https://images.unsplash.com/photo-1603288967669-e9329c071d18?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      },
      {
        id: "jpr-s3",
        destinationSlug: "jaipur",
        title: "The Precision Sundials of Jantar Mantar",
        description: "An ensemble of 19 monumental stone architectural instruments built in 1734 to track orbits of planets, measure solar time, and predict eclipses.",
        culturalSignificance: "A UNESCO World Heritage site and an apex triumph of indigenous Indian astronomical science.",
        interestingFact: "The Vrihat Samrat Yantra is 27 meters high; its shadow moves visibly at a speed of 1 millimeter every single second.",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 3
      },
      {
        id: "jpr-s4",
        destinationSlug: "jaipur",
        title: "The Masters of Hand Block Printing in Sanganer",
        description: "Artisans hand-carve teak wood blocks with traditional floral (boota) and geometric patterns, dipping them in natural indigo, turmeric, and madder dyes to stamp layered textile fabrics.",
        culturalSignificance: "A 400-year-old craft certified with a Geographical Indication (GI) tag.",
        interestingFact: "A complex multi-color Sanganeri bedspread can require over 1,500 individual manual block impressions by the artisan.",
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 4
      }
    ]
  },
  {
    id: "dest-rj-udaipur",
    slug: "udaipur",
    name: "Udaipur (The City of Lakes)",
    stateSlug: "rajasthan",
    stateName: "Rajasthan",
    region: "West",
    category: "heritage",
    tagline: "The Romantic Venice of the East & The Pearl of Mewar",
    description: "Nestled amidst the ancient Aravalli Hills and shimmering lakes, Udaipur is celebrated as India's most romantic city. Crowned by the massive City Palace and the floating marble Lake Palace on Lake Pichola, it embodies Rajput elegance.",
    culturalSignificance: "The historic capital of the Kingdom of Mewar, renowned for legendary rulers like Maharana Pratap who fiercely defended their sovereign independence.",
    historySummary: "Founded in 1559 by Maharana Udai Singh II after the siege of Chittorgarh, designed with an ingenious interconnected hydraulic lake network that turned a dry valley into a blooming oasis.",
    heroImageUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "September to March",
    isFeatured: true,
    highlights: [
      "City Palace complex overlooking Lake Pichola",
      "Boat cruise to Taj Lake Palace & Jag Mandir island",
      "Saheliyon-ki-Bari royal fountain gardens",
      "Bagore-ki-Haveli evening Dharohar folk dance performance"
    ],
    attractions: [
      {
        name: "City Palace, Udaipur",
        description: "Rajasthan's largest palace complex featuring granite and marble towers, peacock mosaics, and mirror halls built over 400 years by 22 Maharanas.",
        imageUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Lake Pichola & Jag Mandir",
        description: "An artificial freshwater lake created in 1362, home to serene island palaces that appear to float on water.",
        imageUrl: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Mewar Festival", "Pichwai Temple art worship", "Gangaur boat processions"],
    localCrafts: ["Pichwai Paintings of Nathdwara", "Miniature Paintings on Silk", "Silver Enameling", "Wooden Folk Toys"],
    famousFood: ["Gatte ki Sabzi", "Kachori with Sweet Tamarind", "Mewari Kheer", "Ker Sangri"],
    scenes: [
      {
        id: "udp-s1",
        destinationSlug: "udaipur",
        title: "City Palace over Lake Pichola",
        description: "The monumental white facade of Udaipur City Palace stretches 244 meters along the eastern shore of Lake Pichola, adorned with marble balconies, domed cupolas, and multi-colored stained glass windows.",
        culturalSignificance: "The seat of the 1,500-year-old Sisodia Rajput dynasty.",
        interestingFact: "The palace was constructed in such a way that the Maharanas could weigh themselves against gold and silver to distribute to charities on auspicious days.",
        imageUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "udp-s2",
        destinationSlug: "udaipur",
        title: "Sunset over the Floating Lake Palace",
        description: "Built in 1746 as a royal summer retreat entirely out of white marble, the Lake Palace on Jag Niwas island seems to drift weightlessly across the sapphire lake surface as the sun dips behind the Aravallis.",
        culturalSignificance: "Widely regarded as one of the most sublime examples of palatial water architecture in the world.",
        interestingFact: "During the 1857 war of independence, the palace served as a safe haven of hospitality for fleeing European families under the Maharana's royal protection.",
        imageUrl: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      }
    ]
  },
  {
    id: "dest-rj-jaisalmer",
    slug: "jaisalmer",
    name: "Jaisalmer (The Golden City)",
    stateSlug: "rajasthan",
    stateName: "Rajasthan",
    region: "West",
    category: "historical",
    tagline: "The Living Golden Sandstone Citadel in the Thar Desert",
    description: "Rising out of the golden sands of the Thar Desert like a mirage from One Thousand and One Nights, Jaisalmer is constructed entirely from yellow Jurassic sandstone. It boasts the world's most famous living medieval fort.",
    culturalSignificance: "A critical caravan trading hub along the historic Silk Road trade route connecting India to Persia, Arabia, and Central Asia.",
    historySummary: "Founded in 1156 CE by the Bhati Rajput ruler Rawal Jaisal atop Trikuta Hill, fortified to withstand desert warfare and harsh desert conditions.",
    heroImageUrl: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "November to February",
    isFeatured: false,
    highlights: [
      "Jaisalmer Fort (Sonar Qila) with 99 bastions",
      "Exquisitely carved Patwon ki Haveli and Salim Singh ki Haveli",
      "Sam Sand Dunes camel safari under starlit desert skies",
      "7 interconnected medieval Jain temples with intricate ceiling carvings"
    ],
    attractions: [
      {
        name: "Jaisalmer Living Fort",
        description: "A UNESCO World Heritage fortress where thousands of local residents, artisans, and shops still reside within ancient golden walls.",
        imageUrl: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Patwon ki Haveli",
        description: "A cluster of five palatial merchant havelis built in 1805 with stone jali screens so delicate they resemble lace.",
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Desert Festival with turban tying competitions", "Manganiyar musical ballads", "Gair folk dances"],
    localCrafts: ["Yellow Sandstone Jali Work", "Camel Leather Goods", "Mirror-embroidered Carpets", "Silver Tribal Jewelry"],
    famousFood: ["Ghotua Ladoo", "Ker Sangri", "Bajra Roti with Garlic Chutney", "Kadhi Pakora"],
    scenes: [
      {
        id: "jsm-s1",
        destinationSlug: "jaisalmer",
        title: "Sonar Qila: The Golden Living Fort",
        description: "As twilight arrives in the Thar Desert, the yellow sandstone walls of Jaisalmer Fort glow like burnished gold against the horizon, housing bustling bazaars, ancient shrines, and rooftop cafes within its 99 towers.",
        culturalSignificance: "One of the only remaining fortified settlements on Earth where people live and carry on ancestral trades inside the fort.",
        interestingFact: "The entire fort was constructed without mortar; every block of yellow sandstone was carved to interlock with millimeter precision.",
        imageUrl: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      }
    ]
  },

  // KERALA
  {
    id: "dest-kl-kochi",
    slug: "kochi",
    name: "Kochi (Cochin)",
    stateSlug: "kerala",
    stateName: "Kerala",
    region: "South",
    category: "heritage",
    tagline: "The Queen of the Arabian Sea & Maritime Spice Capital",
    description: "Kochi is an enchanting harbor city where centuries of global maritime spice trade have woven a multicultural tapestry of Chinese fishing nets, Portuguese churches, Dutch palaces, Jewish synagogues, and authentic Kathakali theatres.",
    culturalSignificance: "The principal spice trading gateway of ancient India, visited by Phoenicians, Romans, Arabs, Chinese, and Vasco da Gama.",
    historySummary: "Transformed into a major port after the great flood of the Periyar River in 1341, Kochi served as the first European colonial settlement in India starting in 1500.",
    heroImageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "September to March",
    isFeatured: true,
    highlights: [
      "Iconic cantilevered Chinese Fishing Nets along Fort Kochi promenade",
      "St. Francis Church — the oldest European-built church in India (1503)",
      "Mattancherry Palace featuring 300-year-old Ramayana murals",
      "Paradesi Synagogue (1568) in historic Jew Town with Belgian crystal chandeliers",
      "Kochi-Muziris Biennale contemporary art exhibition"
    ],
    attractions: [
      {
        name: "Chinese Fishing Nets (Cheena Vala)",
        description: "Massive shore-operated cantilevered fishing nets introduced in the 14th century by Chinese explorer Zheng He's court.",
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Mattancherry Palace (Dutch Palace)",
        description: "Built by the Portuguese and gifted to the Raja of Kochi in 1555, housing some of India's finest classical mythological murals.",
        imageUrl: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Kathakali makeup ceremony (Chutti)", "Kalaripayattu martial demonstrations", "Cochin Carnival"],
    localCrafts: ["Spices (Cardamom, Black Pepper, Nutmeg)", "Rosewood & Teak Furniture", "Coir Handicrafts", "Kasavu Handloom Weaving"],
    famousFood: ["Kerala Meen Pollichathu (Spiced Fish in Banana Leaf)", "Appam with Vegetable Stew", "Malabar Beef Fry & Porotta", "Puttu with Kadala"],
    scenes: [
      {
        id: "kch-s1",
        destinationSlug: "kochi",
        title: "Chinese Fishing Nets at Sunset",
        description: "Silhouetted against fiery orange coastal skies, the colossal wooden cantilevered nets dip into the Arabian Sea waters, operated rhythmically by teams of five fishermen using stone counterweights.",
        culturalSignificance: "A living relic of 14th-century Indo-Chinese maritime trade relations.",
        interestingFact: "Each fishing net structure spans over 20 meters across and requires roughly 30 to 40 kg of counterweight stones balanced on ropes.",
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "kch-s2",
        destinationSlug: "kochi",
        title: "Kathakali: The Sacred Dance Drama",
        description: "In the quiet ambiance of a traditional theatre, Kathakali dancers with elaborate natural mineral face makeup ('Paccha') and vibrant pleated skirts perform dramatic scenes from the Mahabharata solely through facial expressions and hand mudras.",
        culturalSignificance: "A 300-year-old total theatre form combining music, literature, martial arts, painting, and religious drama.",
        interestingFact: "The makeup process alone takes over 3 hours and uses natural stone pigments, coconut oil, and small rice-paste ridges applied to the jawline.",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      }
    ]
  },
  {
    id: "dest-kl-alappuzha",
    slug: "alappuzha",
    name: "Alappuzha (Alleppey)",
    stateSlug: "kerala",
    stateName: "Kerala",
    region: "South",
    category: "nature",
    tagline: "The Emerald Backwater Venice of the East",
    description: "Alappuzha is an idyllic maze of palm-fringed canals, lagoons, and emerald paddy fields. Traditional thatched Kettuvallam houseboats glide through serene backwaters offering glimpses of rural coastal life.",
    culturalSignificance: "Home to the world's most unique below-sea-level farming systems in Kuttanad and the thrilling Nehru Trophy snake boat races.",
    historySummary: "Carved into an organized port town in the late 18th century by Prime Minister Raja Kesavadas, connecting inland spice-producing valleys to the ocean.",
    heroImageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "August to March (August for the Nehru Trophy Boat Race)",
    isFeatured: false,
    highlights: [
      "Overnight luxury stay on a traditional thatched Kettuvallam houseboat",
      "Nehru Trophy Snake Boat Race (Chundan Vallam) on Punnamada Lake",
      "Kuttanad farming below sea level amid coconut groves",
      "Marari peaceful fishing village beach"
    ],
    attractions: [
      {
        name: "Punnamada Lake & Backwater Canals",
        description: "An interconnected freshwater canal network where colorful snake boats race and village life unfolds on waterways.",
        imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Vallam Kali boat races", "Village duck farming", "Toddy tapping"],
    localCrafts: ["Coir Yarn Mats", "Handwoven Banana Fiber Baskets", "Spices"],
    famousFood: ["Karimeen Pearl Spot Fry", "Duck Roast with Appam", "Kerala Rice with Moru Curry"],
    scenes: [
      {
        id: "alp-s1",
        destinationSlug: "alappuzha",
        title: "Gliding Through the Silent Backwaters",
        description: "A traditional Kettuvallam houseboat fashioned from Anjili wood and tied with coir ropes drifts through calm emerald canals flanked by swaying coconut palms and blooming water lilies.",
        culturalSignificance: "Kettuvallams were historically grain barges used to transport rice and spices across Kerala before being reborn as eco-tourism sanctuaries.",
        interestingFact: "Traditional houseboats are constructed without using a single metal nail; planks are sewn together with coconut coir yarn.",
        imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      }
    ]
  },

  // WEST BENGAL
  {
    id: "dest-wb-kolkata",
    slug: "kolkata",
    name: "Kolkata (The City of Joy)",
    stateSlug: "west-bengal",
    stateName: "West Bengal",
    region: "East",
    category: "art_craft",
    tagline: "The Cultural, Literary & Artistic Heart of India",
    description: "Kolkata is a grand historic metropolis of intellectual curiosity, poetry, art galleries, vintage yellow taxis, tramcars, and passionate tea-shop political debates ('Adda').",
    culturalSignificance: "The birthplace of the Bengal Renaissance, yielding visionaries like Rabindranath Tagore, Swami Vivekananda, Satyajit Ray, and Netaji Subhas Chandra Bose.",
    historySummary: "Served as the capital of British India until 1911, fostering monumental Victorian architecture intertwined with rich Bengali heritage.",
    heroImageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "October to February (especially during Durga Puja)",
    isFeatured: true,
    highlights: [
      "Victoria Memorial white marble palace and landscaped gardens",
      "Howrah Bridge — the world's busiest cantilever bridge over the Hooghly",
      "Kumartuli artisan potters sculpting clay Durga idols for the autumn festival",
      "College Street — the largest second-hand book market on Earth",
      "Historic Indian Coffee House for intellectual Adda"
    ],
    attractions: [
      {
        name: "Victoria Memorial",
        description: "A grand white Makrana marble monument constructed between 1906 and 1921, blending Indo-Saracenic, Venetian, and Mughal architectural elements.",
        imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Kumartuli Artisan Quarter",
        description: "A 300-year-old riverside settlement of master potters who mold clay idols of Goddess Durga from holy river silt.",
        imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Durga Puja pandal hopping & Dhunuchi Naach", "Rabindra Jayanti celebrations", "Evening Adda at Coffee House"],
    localCrafts: ["Terracotta Artifacts", "Kantha Stitch Quilts", "Dokra Metal Figurines", "Sholapith Artwork"],
    famousFood: ["Kolkata Mutton Biryani", "Kosha Mangsho with Luchi", "Mishti Doi", "Warm Rosogolla of KC Das", "Kathi Rolls of Park Street"],
    scenes: [
      {
        id: "kol-s1",
        destinationSlug: "kolkata",
        title: "Victoria Memorial at Twilight",
        description: "The illuminated marble facade of the Victoria Memorial gleams against reflective ponds, topped by the iconic 16-foot bronze Angel of Victory.",
        culturalSignificance: "A premier symbol of Kolkata's architectural splendor and museum of Indian history.",
        interestingFact: "The Angel of Victory atop the central dome weighs 3 tonnes and acts as a giant rotating weather vane.",
        imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "kol-s2",
        destinationSlug: "kolkata",
        title: "Kumartuli: Where Gods Are Born in Clay",
        description: "In the narrow, straw-strewn alleyways of Kumartuli, multigenerational potters sculpt raw Ganga clay over bamboo armatures to breathe divine life into monumental Goddess Durga idols.",
        culturalSignificance: "Central to Kolkata's UNESCO-inscribed Durga Puja festival, celebrated as the world's largest public art installation.",
        interestingFact: "The sacred ritual requires that the first handful of clay for the Durga idol be gathered from the threshold of a courtesan's home ('Punya Maati'), symbolizing purity and inclusivity.",
        imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      }
    ]
  },

  // GUJARAT
  {
    id: "dest-gj-kutch",
    slug: "kutch",
    name: "Rann of Kutch",
    stateSlug: "gujarat",
    stateName: "Gujarat",
    region: "West",
    category: "nature",
    tagline: "The Endless White Salt Desert & Land of Master Crafts",
    description: "The Great Rann of Kutch is one of the largest salt deserts in the world, stretching endlessly under crystal skies. In winter, moonlight transforms the vast salt flats into a glowing white wonderland celebrated during the vibrant Rann Utsav.",
    culturalSignificance: "Home to nomadic tribes (Rabaris, Mutwas, Meghwals) who have preserved indigenous embroidery, Rogan art, and mud-mirror craft for millennia.",
    historySummary: "Once an arm of the Arabian Sea that silted up over geological epochs, Kutch developed into a distinct craft hub on ancient camel trade routes.",
    heroImageUrl: "https://images.unsplash.com/photo-1597044141240-ab55018693ef?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "November to February (Full moon nights)",
    isFeatured: true,
    highlights: [
      "White Rann under full moon illumination",
      "Rann Utsav cultural tent city at Dhordo",
      "Nirona village master Rogan art and bell-making workshops",
      "Kala Dungar (Black Hill) panoramic view of the vast salt horizon"
    ],
    attractions: [
      {
        name: "The Great White Desert (Dhordo)",
        description: "An expanse of over 7,500 square kilometers covered in shimmering white salt crystals under endless blue skies.",
        imageUrl: "https://images.unsplash.com/photo-1597044141240-ab55018693ef?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Rann Utsav campfire folklore", "Kutchi folk music with Jodiya Pawa flute", "Camel safari"],
    localCrafts: ["Rogan Oil Painting of Nirona", "Lippan Kaam Mud-Mirror Work", "Ajrakh Natural Block Print", "Kutchi Mirror Embroidery"],
    famousFood: ["Kutchi Dabeli", "Bajra no Rotlo with Ghee and Gud", "Khichdi-Kadhi", "Gulab Pak"],
    scenes: [
      {
        id: "ktc-s1",
        destinationSlug: "kutch",
        title: "The White Desert Under Full Moonlight",
        description: "As twilight fades, the endless sheet of white salt reflects the pure silver glow of the full moon, creating a magical dreamscape where Earth and sky seem to merge into infinity.",
        culturalSignificance: "A natural marvel celebrated during the vibrant winter festival of Rann Utsav.",
        interestingFact: "The salt crust can be up to 1 meter thick in places, formed when seawater evaporates during scorching summer months.",
        imageUrl: "https://images.unsplash.com/photo-1597044141240-ab55018693ef?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      },
      {
        id: "ktc-s2",
        destinationSlug: "kutch",
        title: "Rogan Art: The Rare Castor Oil Painting",
        description: "In Nirona village, master artisan Abdul Gafur Khatri prepares a thick paste of boiled castor oil and mineral dyes, spinning intricate floral patterns onto fabric using only a thin metal stylus without touching the cloth.",
        culturalSignificance: "A 400-year-old art form preserved by only a single surviving family guild in the entire world.",
        interestingFact: "Prime Minister Narendra Modi presented a handcrafted Tree of Life Rogan painting by the Khatri family to US President Barack Obama during his state visit.",
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 2
      }
    ]
  },

  // TAMIL NADU
  {
    id: "dest-tn-madurai",
    slug: "madurai",
    name: "Madurai",
    stateSlug: "tamil-nadu",
    stateName: "Tamil Nadu",
    region: "South",
    category: "spiritual",
    tagline: "The Athens of the East & City of Soaring Temple Gopurams",
    description: "Madurai is one of the oldest continuously inhabited cities on the Indian subcontinent, laid out in the shape of a sacred lotus around the world-famous Meenakshi Sundareswarar Temple.",
    culturalSignificance: "The historic capital of the ancient Pandya kingdom and the cradle of classical Tamil Sangam literature.",
    historySummary: "Recorded by ancient Greek geographers Megasthenes and Strabo, Madurai has been a radiant center of Tamil learning and architectural glory for over 2,500 years.",
    heroImageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    bestTimeToVisit: "October to March",
    isFeatured: true,
    highlights: [
      "Meenakshi Amman Temple with 14 colorfully sculpted gopuram towers",
      "Hall of 1000 Pillars (Ayiram Kaal Mandapam) with musical stone columns",
      "Thirumalai Nayakkar Palace light and sound show",
      "Night flower market trading fragrant Madurai Malli (Jasmine)"
    ],
    attractions: [
      {
        name: "Meenakshi Sundareswarar Temple",
        description: "An architectural masterpiece dedicated to Goddess Meenakshi, adorned with over 33,000 brightly painted stone sculptures.",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
      }
    ],
    traditions: ["Chithirai Festival royal wedding", "Evening Palliyarai Pooja ceremony", "Kolam drawing at dawn"],
    localCrafts: ["Madurai Sungudi Sarees", "Brass Lamps (Kuthuvilakku)", "Madurai Malli Jasmine Garlands"],
    famousFood: ["Madurai Jigarthanda", "Kari Dosa (Spicy Mutton Dosa)", "Bun Parotta", "Idli with 4 Chutneys"],
    scenes: [
      {
        id: "mdr-s1",
        destinationSlug: "madurai",
        title: "The Soaring Towers of Meenakshi Temple",
        description: "The southern tower of the Meenakshi Temple rises 52 meters into the tropical sky, encrusted with thousands of intricately sculpted deities, mythical beasts, and celestial dancers painted in vibrant colors.",
        culturalSignificance: "One of the most sacred pilgrimage shrines of South India, celebrating Goddess Meenakshi as the sovereign ruler.",
        interestingFact: "The musical pillars in the temple courtyard emit different musical notes when tapped gently with fingers.",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
        sceneOrder: 1
      }
    ]
  }
];
