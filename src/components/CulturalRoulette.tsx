import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, MapPin, ArrowRight, RotateCw, Award, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RouletteItem {
  id: string;
  name: string;
  state: string;
  stateSlug: string;
  destSlug: string;
  emoji: string;
  color: string;
  fact: string;
  category: "Spiritual" | "Monument" | "Nature" | "Architecture";
}

const ROULETTE_ITEMS: RouletteItem[] = [
  {
    id: "1",
    name: "Varanasi Ghats & Ganga Aarti",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    destSlug: "varanasi-ghats",
    emoji: "🪔",
    color: "#ea580c",
    fact: "One of the world's oldest continuously inhabited cities, vibrant with evening Maha Aarti chants on the sacred Ganges.",
    category: "Spiritual"
  },
  {
    id: "2",
    name: "Taj Mahal & Mughal Architecture",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    destSlug: "taj-mahal",
    emoji: "🏛️",
    color: "#f59e0b",
    fact: "Constructed with translucent white Makrana marble that changes hue with the rising sun and moonlight.",
    category: "Monument"
  },
  {
    id: "3",
    name: "Hawa Mahal & Pink City Palaces",
    state: "Rajasthan",
    stateSlug: "rajasthan",
    destSlug: "hawa-mahal",
    emoji: "🏰",
    color: "#ec4899",
    fact: "Features 953 intricate jharokhas (windows) engineered to channel cool desert breezes.",
    category: "Architecture"
  },
  {
    id: "4",
    name: "Kedarnath Temple in Himalayas",
    state: "Uttarakhand",
    stateSlug: "uttarakhand",
    destSlug: "kedarnath-temple",
    emoji: "🏔️",
    color: "#06b6d4",
    fact: "Built at 3,583 meters above sea level using massive interlocking stone slabs that survived centuries of glaciers.",
    category: "Spiritual"
  },
  {
    id: "5",
    name: "Golden Temple (Harmandir Sahib)",
    state: "Punjab",
    stateSlug: "punjab",
    destSlug: "golden-temple",
    emoji: "✨",
    color: "#eab308",
    fact: "Its community kitchen (Langar) serves over 100,000 free hot meals every day to people of all backgrounds.",
    category: "Spiritual"
  },
  {
    id: "6",
    name: "Meenakshi Amman Temple",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    destSlug: "meenakshi-temple",
    emoji: "🛕",
    color: "#8b5cf6",
    fact: "Boasts 14 towering gopurams adorned with over 33,000 brightly painted mythological stone sculptures.",
    category: "Architecture"
  },
  {
    id: "7",
    name: "Kerala Backwaters & Houseboats",
    state: "Kerala",
    stateSlug: "kerala",
    destSlug: "kerala-backwaters",
    emoji: "🌴",
    color: "#10b981",
    fact: "A labyrinth of 900 km of serene waterways where traditional Kettuvallam boats were stitched with coir knots without a single nail.",
    category: "Nature"
  },
  {
    id: "8",
    name: "Konark Sun Temple Chariot",
    state: "Odisha",
    stateSlug: "odisha",
    destSlug: "konark-sun-temple",
    emoji: "☀️",
    color: "#f97316",
    fact: "Designed as a colossal stone chariot of the Sun God with 24 carved wheels that function as accurate sundials.",
    category: "Monument"
  }
];

// Play click / ticking sound
const playTickSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(600 + Math.random() * 200, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {}
};

// Play celebration fanfare
const playFanfare = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.09);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.09 + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.09);
      osc.stop(audioCtx.currentTime + i * 0.09 + 0.6);
    });
  } catch (e) {}
};

export const CulturalRoulette = () => {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState<RouletteItem | null>(null);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    setSelectedDestination(null);

    // Pick random index
    const randomIndex = Math.floor(Math.random() * ROULETTE_ITEMS.length);
    const segmentAngle = 360 / ROULETTE_ITEMS.length;
    // Extra rotations for excitement (5 to 8 full spins)
    const extraSpins = 360 * (5 + Math.floor(Math.random() * 3));
    const targetAngle = extraSpins + (ROULETTE_ITEMS.length - randomIndex) * segmentAngle - segmentAngle / 2;

    const newRotation = rotation + targetAngle;
    setRotation(newRotation);

    // Periodic ticks
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      playTickSound();
      tickCount++;
      if (tickCount > 18) clearInterval(tickInterval);
    }, 180);

    // Stop after animation
    setTimeout(() => {
      clearInterval(tickInterval);
      setSpinning(false);
      const chosen = ROULETTE_ITEMS[randomIndex];
      setSelectedDestination(chosen);
      playFanfare();

      // Trigger sparks
      const newSparks = Array.from({ length: 24 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        color: ["#ea580c", "#f59e0b", "#ec4899", "#8b5cf6", "#10b981"][i % 5]
      }));
      setSparks(newSparks);
    }, 3800);
  };

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-primary/20 relative overflow-hidden shadow-[0_15px_50px_-15px_rgba(234,88,12,0.25)]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Col: Chakra Roulette Wheel */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Pointer / Ashoka Arrow at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-primary filter drop-shadow-[0_4px_8px_rgba(234,88,12,0.8)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-gold -mt-1 shadow-md animate-ping" />
            </div>

            {/* Rotating Wheel Container */}
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 3.8, ease: [0.15, 0.9, 0.2, 1] }}
              className="w-full h-full rounded-full border-4 border-primary/40 shadow-2xl relative overflow-hidden bg-[#15120e] flex items-center justify-center"
            >
              {/* Segment Slices */}
              {ROULETTE_ITEMS.map((item, idx) => {
                const angle = (360 / ROULETTE_ITEMS.length) * idx;
                return (
                  <div
                    key={item.id}
                    className="absolute w-full h-full flex justify-center items-start pt-3"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: "center center"
                    }}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xl sm:text-2xl drop-shadow-md">{item.emoji}</span>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-white/80 max-w-[60px] truncate text-center">
                        {item.state}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Decorative Concentric Rings */}
              <div className="w-3/4 h-3/4 rounded-full border border-primary/20 pointer-events-none" />
              <div className="w-1/2 h-1/2 rounded-full border border-gold/30 pointer-events-none" />

              {/* Center Hub Button */}
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary via-saffron to-gold shadow-[0_0_25px_rgba(234,88,12,0.8)] flex items-center justify-center border-2 border-white/20 z-20">
                <Compass className={`h-8 w-8 sm:h-10 sm:w-10 text-white ${spinning ? "animate-spin" : ""}`} />
              </div>
            </motion.div>

            {/* Sparkle particles */}
            {sparks.map((spark) => (
              <motion.div
                key={spark.id}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, x: spark.x, y: spark.y }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute w-2.5 h-2.5 rounded-full pointer-events-none z-30"
                style={{ backgroundColor: spark.color }}
              />
            ))}
          </div>

          {/* Spin Trigger Button */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <Button
              type="button"
              size="lg"
              onClick={handleSpin}
              disabled={spinning}
              className="bg-gradient-saffron text-primary-foreground font-bold px-8 py-6 rounded-2xl shadow-[0_4px_25px_-5px_hsl(var(--saffron)/0.6)] hover:shadow-[0_8px_35px_-5px_hsl(var(--saffron)/0.8)] hover:scale-105 active:scale-95 transition-all text-base sm:text-lg cursor-pointer flex items-center gap-2.5"
            >
              <RotateCw className={`h-5 w-5 ${spinning ? "animate-spin" : ""}`} />
              {spinning ? "Discovering Bharat..." : "Spin Bharat Chakra ☸️"}
            </Button>
            <p className="text-xs text-muted-foreground">Tap to unlock your destiny yatra for today</p>
          </div>
        </div>

        {/* Right Col: Interactive Result Card & Info */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="mb-4">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-primary border-primary/30 mb-2 px-3 py-1">
              ☸️ Daily Cultural Discovery
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Bharat Chakra <span className="text-gradient-saffron">Roulette</span>
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Let the cultural chakra guide your next spiritual and heritage journey across India's vibrant states.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {selectedDestination ? (
              <motion.div
                key={selectedDestination.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl p-5 sm:p-6 border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card shadow-[0_10px_30px_-5px_rgba(234,88,12,0.3)] space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2 rounded-2xl bg-primary/20 border border-primary/30">
                      {selectedDestination.emoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/20 text-primary border-none text-[10px]">
                          {selectedDestination.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-primary" /> {selectedDestination.state}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mt-0.5">
                        {selectedDestination.name}
                      </h4>
                    </div>
                  </div>
                  <Badge className="bg-gold/20 text-gold border border-gold/40 text-xs px-2.5 py-1 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" /> Lucky Pick
                  </Badge>
                </div>

                <div className="bg-background/60 rounded-xl p-3.5 border border-white/5 text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                  "{selectedDestination.fact}"
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <Button
                    type="button"
                    onClick={() => navigate(`/virtual-yatra/${selectedDestination.stateSlug}/${selectedDestination.destSlug}`)}
                    className="flex-1 bg-gradient-saffron text-primary-foreground font-semibold rounded-xl text-xs sm:text-sm py-5 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Start 3D Virtual Yatra <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/state/${encodeURIComponent(selectedDestination.state)}`)}
                    className="border-primary/40 text-primary hover:bg-primary/10 rounded-xl text-xs sm:text-sm py-5"
                  >
                    Explore State Culture
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-2xl p-6 border border-white/10 text-center flex flex-col items-center justify-center space-y-3 min-h-[220px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-1">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <h4 className="font-semibold text-foreground text-base">Your Adventure Awaits</h4>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Click the <strong>Spin Bharat Chakra</strong> button to receive an auspicious destination recommendation with lore, 3D tours, and regional handicrafts.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
