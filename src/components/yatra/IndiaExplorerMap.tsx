import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Sparkles, Compass, CheckCircle2, Volume2, Landmark, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INDIA_MAP_STATES, MapStateItem } from "@/data/indiaMapSvgData";
import { CULTURAL_STATES } from "@/data/yatraData";
import { recordPassportStamp } from "../CulturalPassport";

interface IndiaExplorerMapProps {
  onSelectState?: (slug: string) => void;
}

const REGIONS = ["All", "North", "West", "South", "East", "Central", "North-East"] as const;

// Cultural Greetings Database
const STATE_GREETINGS: Record<string, { greeting: string; nativeText: string; vibe: string }> = {
  "uttar-pradesh": { greeting: "Namaste! Welcome to the sacred heartland of the Ganges, Kashi, and Taj Mahal.", nativeText: "नमस्ते! काशी एवं अवध की पावन धरा में आपका स्वागत है।", vibe: "Spiritual & Monumental" },
  "rajasthan": { greeting: "Khamma Ghani! Welcome to the royal land of grand palaces, dunes, and brave Rajput lore.", nativeText: "खम्मा घणी! पधारो म्हारे देश।", vibe: "Royal & Architectural" },
  "tamil-nadu": { greeting: "Vanakkam! Welcome to the cradle of Dravidian temple architecture and classical Carnatic arts.", nativeText: "வணக்கம்! ஆன்மீக மற்றும் கலாச்சார தமிழ்நாட்டிற்கு வரவேற்கிறோம்.", vibe: "Classical & Sacred" },
  "punjab": { greeting: "Sat Sri Akal! Welcome to the golden land of five rivers, seva, and high spirits.", nativeText: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਪੰਜ ਦਰਿਆਵਾਂ ਦੀ ਧਰਤੀ 'ਤੇ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।", vibe: "Energetic & Welcoming" },
  "kerala": { greeting: "Namaskaram! Welcome to God's Own Country, lush backwaters, and Kathakali lore.", nativeText: "നമസ്കാരം! ദൈവത്തിന്റെ സ്വന്തം നാട്ടിലേക്ക് സ്വാഗതം.", vibe: "Tranquil & Coastal" },
  "uttarakhand": { greeting: "Namaste! Welcome to Devbhoomi, sacred peaks, and ancient Himalayan shrines.", nativeText: "नमस्ते! देवभूमि उत्तराखंड में आपका स्वागत है।", vibe: "Mystical & Himalayan" },
  "odisha": { greeting: "Namaskar! Welcome to the land of Lord Jagannath, Konark Sun chariot, and Odissi rhythm.", nativeText: "ନମସ୍କାର! ଜଗନ୍ନାଥ ଧାମ ଓଡ଼ିଶାକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।", vibe: "Artistic & Sacred" },
  "maharashtra": { greeting: "Jai Maharashtra! Welcome to the land of Sahyadri hill forts, caves, and vibrant festivals.", nativeText: "जय महाराष्ट्र! शिवरायांच्या पावन भूमीत आपले सहर्ष स्वागत आहे.", vibe: "Historic & Dynamic" },
  "west-bengal": { greeting: "Nomoshkar! Welcome to the cultural renaissance hub of literature, sweet delicacies, and Durga Puja.", nativeText: "নমস্কার! শিল্প ও সংস্কৃতির বাংলায় আপনাকে স্বাগতম।", vibe: "Intellectual & Festive" },
  "gujarat": { greeting: "Kem Cho! Welcome to the land of Somnath, vibrant Garba, and artisanal heritage.", nativeText: "કેમ છો! પધારો રંગીલા ગુજરાતમાં.", vibe: "Colorful & Festive" },
  "jammu-and-kashmir": { greeting: "Aadaab! Welcome to Paradise on Earth, Dal lake houseboats, and snow-capped peaks.", nativeText: "آداب! جنت نظیر کشمیر میں خوش آمدید۔", vibe: "Scenic & Heavenly" },
  "ladakh": { greeting: "Julley! Welcome to the high moonland of prayer flags and ancient gompas.", nativeText: "ཇུ་ལེགས། ལ་དྭགས་ཀྱི་མཛེས་ལྗོངས་ལ་བྱོན་པ་ལེགས།", vibe: "Spiritual & Majestic" },
  "assam": { greeting: "Nomoskar! Welcome to the serene tea gardens and the mighty Brahmaputra river.", nativeText: "নমস্কাৰ! সেউজীয়া অসমলৈ আপোনাক স্বাগতম।", vibe: "Lush & Serene" },
  "delhi": { greeting: "Namaste! Welcome to the historic capital city blending Mughal monuments and modern vitality.", nativeText: "नमस्ते! दिलवालों की दिल्ली में आपका स्वागत है।", vibe: "Imperial & Modern" }
};

// Iconic Hotspot Pins for the Visual India Map View
const ICONIC_HOTSPOTS = [
  { id: "kedarnath", name: "Kedarnath Temple", stateSlug: "uttarakhand", x: 42, y: 18, emoji: "🏔️" },
  { id: "golden-temple", name: "Golden Temple", stateSlug: "punjab", x: 32, y: 22, emoji: "✨" },
  { id: "delhi", name: "Red Fort & Qutub", stateSlug: "delhi", x: 38, y: 28, emoji: "🏛️" },
  { id: "taj-mahal", name: "Taj Mahal Agra", stateSlug: "uttar-pradesh", x: 44, y: 32, emoji: "🕌" },
  { id: "varanasi", name: "Varanasi Ganga Ghats", stateSlug: "uttar-pradesh", x: 58, y: 36, emoji: "🪔" },
  { id: "jaipur", name: "Hawa Mahal Jaipur", stateSlug: "rajasthan", x: 30, y: 34, emoji: "🏰" },
  { id: "konark", name: "Konark Sun Temple", stateSlug: "odisha", x: 68, y: 52, emoji: "☀️" },
  { id: "backwaters", name: "Kerala Backwaters", stateSlug: "kerala", x: 36, y: 84, emoji: "🌴" },
  { id: "meenakshi", name: "Meenakshi Temple", stateSlug: "tamil-nadu", x: 42, y: 88, emoji: "🛕" },
  { id: "ladakh", name: "Pangong & Monasteries", stateSlug: "ladakh", x: 39, y: 9, emoji: "📿" }
];

export const IndiaExplorerMap = ({ onSelectState }: IndiaExplorerMapProps) => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");
  const [activeState, setActiveState] = useState<MapStateItem>(
    INDIA_MAP_STATES.find(s => s.slug === "uttar-pradesh") || INDIA_MAP_STATES[0]
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const filteredStates = INDIA_MAP_STATES.filter(
    s => selectedRegion === "All" || s.region === selectedRegion
  );

  const activeStateDetails = CULTURAL_STATES.find(s => s.slug === activeState.slug);
  const greetingInfo = STATE_GREETINGS[activeState.slug] || {
    greeting: `Namaste! Welcome to ${activeState.name}, rich in vibrant traditions, arts, and monuments.`,
    nativeText: "नमस्ते! भारत के इस समृद्ध सांस्कृतिक क्षेत्र में आपका स्वागत है।",
    vibe: "Cultural Heritage"
  };

  const handleStateClick = (state: MapStateItem) => {
    setActiveState(state);
    recordPassportStamp(state.slug);
    if (onSelectState) {
      onSelectState(state.slug);
    }
  };

  const handleOpenStateTour = (slug: string) => {
    recordPassportStamp(slug);
    navigate(`/virtual-yatra/${slug}`);
  };

  const handleSpeakGreeting = () => {
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(greetingInfo.greeting);
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="w-full">
      {/* View Switcher & Region Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 p-1 bg-card/60 backdrop-blur-md rounded-2xl border border-white/10">
          <Button
            type="button"
            variant={viewMode === "map" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("map")}
            className={`rounded-xl text-xs font-semibold px-3.5 py-1.5 ${
              viewMode === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Landmark className="h-3.5 w-3.5 mr-1.5" /> Interactive Hotspot Map
          </Button>
          <Button
            type="button"
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`rounded-xl text-xs font-semibold px-3.5 py-1.5 ${
              viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="h-3.5 w-3.5 mr-1.5" /> All 28 States Matrix
          </Button>
        </div>

        {/* Region Filter Bar */}
        <div className="flex items-center flex-wrap gap-1.5">
          {REGIONS.map((region) => (
            <Button
              key={region}
              type="button"
              variant={selectedRegion === region ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion(region)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                selectedRegion === region
                  ? "bg-gradient-saffron text-primary-foreground shadow-[0_2px_12px_-2px_hsl(var(--saffron)/0.5)]"
                  : "border-white/10 hover:border-primary/40 bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {region}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Interactive India Map Visual or Grid Matrix */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[490px]">
          {viewMode === "map" ? (
            /* Interactive Hotspot Map Canvas View */
            <div className="relative w-full h-[400px] flex items-center justify-center bg-gradient-to-b from-[#18130d]/80 via-[#100d0a]/90 to-[#18130d]/80 rounded-2xl border border-primary/20 p-4 overflow-hidden">
              {/* Artistic India Vector Map Contour */}
              <svg viewBox="0 0 400 480" className="w-full h-full max-h-[380px] opacity-40 select-none pointer-events-none drop-shadow-2xl">
                {/* Simplified Artistic India Silhouette Path */}
                <path
                  d="M 170 30 Q 190 20, 210 40 L 220 70 Q 250 80, 260 110 L 290 120 Q 320 130, 360 140 Q 380 160, 350 180 L 320 190 Q 280 200, 260 220 L 270 270 Q 260 320, 230 360 L 200 420 Q 185 450, 180 470 Q 175 450, 160 420 L 135 360 Q 120 310, 130 260 L 110 230 Q 80 210, 70 180 L 95 150 Q 120 120, 140 100 Z"
                  fill="url(#indiaGradient)"
                  stroke="hsl(var(--saffron))"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <defs>
                  <linearGradient id="indiaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glowing Interactive Hotspot Pins */}
              {ICONIC_HOTSPOTS.map((pin) => {
                const isSelected = activeState.slug === pin.stateSlug;
                return (
                  <motion.button
                    key={pin.id}
                    type="button"
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const found = INDIA_MAP_STATES.find(s => s.slug === pin.stateSlug);
                      if (found) handleStateClick(found);
                    }}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                  >
                    <div className={`relative flex items-center justify-center ${isSelected ? "scale-125" : ""}`}>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-xl transition-all border ${
                        isSelected
                          ? "bg-gradient-saffron text-white border-white scale-110 shadow-[0_0_20px_rgba(234,88,12,0.9)]"
                          : "bg-[#1f1912]/90 border-primary/50 text-foreground group-hover:border-primary group-hover:scale-110"
                      }`}>
                        {pin.emoji}
                      </span>
                      {isSelected && (
                        <span className="absolute w-10 h-10 rounded-full border border-primary animate-ping pointer-events-none" />
                      )}
                    </div>
                    {/* Tooltip Tag */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-black/90 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                      {pin.name}
                    </span>
                  </motion.button>
                );
              })}

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10 text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span>Tap any monument pin to view cultural heritage & virtual tours</span>
              </div>
            </div>
          ) : (
            /* All States Grid Matrix View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[420px] overflow-y-auto pr-1 py-1">
              {filteredStates.map((state) => {
                const isSelected = activeState.slug === state.slug;
                const hasRichTour = state.hasDestinations;

                return (
                  <motion.button
                    key={state.id}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleStateClick(state)}
                    onDoubleClick={() => handleOpenStateTour(state.slug)}
                    className={`relative p-3 rounded-2xl text-left transition-all flex flex-col justify-between border cursor-pointer ${
                      isSelected
                        ? "bg-primary/20 border-primary shadow-[0_0_20px_-5px_hsl(var(--saffron)/0.5)] text-foreground ring-1 ring-primary"
                        : "bg-background/40 hover:bg-white/5 border-white/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xl">{state.emoji}</span>
                      {hasRichTour && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-none">
                          {state.destinationsCount} Tours
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-xs sm:text-sm line-clamp-1 text-foreground">
                        {state.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{state.region} India</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span>Selected: <strong className="text-foreground font-semibold">{activeState.name}</strong></span>
            </div>
            <span className="text-[11px] text-primary font-medium">Click card to start yatra →</span>
          </div>
        </div>

        {/* Right Side: Selected State Live Spotlight Card with Voice Greeting */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl overflow-hidden border border-primary/20 shadow-2xl flex flex-col"
            >
              {/* Image Preview Header */}
              <div 
                onClick={() => handleOpenStateTour(activeState.slug)}
                className="relative h-52 overflow-hidden cursor-pointer group/header"
                role="button"
                tabIndex={0}
                aria-label={`Open ${activeState.name} Yatra`}
              >
                <img
                  src={
                    activeStateDetails?.heroImageUrl ||
                    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80"
                  }
                  alt={activeState.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/header:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Overlay details */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{activeState.emoji}</span>
                      <Badge className="bg-primary text-primary-foreground font-semibold text-[11px]">
                        {activeState.region} India
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover/header:text-saffron-glow transition-colors">{activeState.name}</h3>
                  </div>
                  {activeStateDetails && (
                    <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-white/20 text-white text-xs">
                      {activeStateDetails.destinationSlugs.length} Curated Yatras
                    </Badge>
                  )}
                </div>
              </div>

              {/* Body Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                {/* Interactive State Greeting Box */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-primary/15 via-gold/10 to-card border border-primary/30 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">Regional Cultural Greeting</p>
                    <p className="text-xs text-foreground/90 font-medium italic">"{greetingInfo.greeting.split(".")[0]}."</p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleSpeakGreeting}
                    className="border-primary/40 text-primary hover:bg-primary/20 rounded-xl text-xs h-8 px-2.5 flex items-center gap-1 cursor-pointer flex-shrink-0"
                  >
                    <Volume2 className={`h-3.5 w-3.5 ${isSpeaking ? "animate-pulse text-gold" : ""}`} />
                    <span>{isSpeaking ? "Speaking..." : "Listen"}</span>
                  </Button>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed line-clamp-3 mb-3">
                    {activeStateDetails?.description ||
                      `${activeState.name} boasts magnificent cultural traditions, regional cuisine, ancient temples, and time-honored artisanal crafts.`}
                  </p>

                  {/* Highlights Pill List */}
                  {activeStateDetails && (
                    <div className="space-y-2.5">
                      <div>
                        <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block mb-1">
                          Top Cultural Sites
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeStateDetails.heritageSites.slice(0, 3).map((site, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1"
                            >
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                              {site}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-gold uppercase tracking-wider block mb-1">
                          Crafts & Delicacies
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[...activeStateDetails.traditionalCrafts.slice(0, 2), ...activeStateDetails.famousFood.slice(0, 2)].map(
                            (item, i) => (
                              <span
                                key={i}
                                className="text-[11px] px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/20 text-foreground"
                              >
                                {item}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Start Yatra CTA */}
                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={() => handleOpenStateTour(activeState.slug)}
                    className="w-full bg-gradient-saffron text-primary-foreground font-semibold py-5 rounded-2xl shadow-[0_4px_20px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)] group cursor-pointer text-sm"
                  >
                    <span>Explore {activeState.name} Yatra & Culture</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
