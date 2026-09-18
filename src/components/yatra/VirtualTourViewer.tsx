import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sparkles,
  Info,
  Lightbulb,
  Compass,
  RotateCw,
  Eye,
  Heart,
  Share2,
  Sun,
  Flame,
  Camera,
  Trophy,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TourScene, YatraDestination } from "@/data/yatraData";
import { TourProgress } from "./TourProgress";
import { SaveDestinationBtn } from "./SaveDestinationBtn";
import { AskAiButton } from "./AskAiButton";
import { useToast } from "@/hooks/use-toast";
import { recordPassportStamp } from "../CulturalPassport";

interface VirtualTourViewerProps {
  destination: YatraDestination;
  initialSceneIndex?: number;
  onClose?: () => void;
}

// Gentle ambient bell sound synthesizer using Web Audio API
const playAmbientChime = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const frequencies = [528, 660, 792]; // Harmonic meditative triad
    
    frequencies.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.1);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + index * 0.1 + 2.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + index * 0.1);
      osc.stop(audioCtx.currentTime + index * 0.1 + 2.6);
    });
  } catch (e) {}
};

type LightingMode = "natural" | "sunrise" | "aarti" | "vintage" | "vivid";

export const VirtualTourViewer = ({
  destination,
  initialSceneIndex = 0,
  onClose
}: VirtualTourViewerProps) => {
  const { toast } = useToast();
  const scenes = destination.scenes && destination.scenes.length > 0
    ? destination.scenes
    : [
        {
          id: "default-1",
          destinationSlug: destination.slug,
          title: destination.name,
          description: destination.description,
          culturalSignificance: destination.culturalSignificance,
          interestingFact: destination.highlights[0] || "A prime cultural treasure of India.",
          imageUrl: destination.heroImageUrl,
          sceneOrder: 1
        }
      ];

  const [currentIndex, setCurrentIndex] = useState(initialSceneIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isImmersive, setIsImmersive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [lightingMode, setLightingMode] = useState<LightingMode>("natural");
  const [showFactBox, setShowFactBox] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [tourCompleted, setTourCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Automatically record this tour in user's Bharat Cultural Passport
  useEffect(() => {
    if (destination.stateSlug) {
      recordPassportStamp(destination.stateSlug);
    }
  }, [destination.stateSlug]);

  const currentScene = scenes[currentIndex] || scenes[0];

  const nextScene = useCallback(() => {
    if (currentIndex < scenes.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      if (!isMuted) playAmbientChime();
    } else if (currentIndex === scenes.length - 1 && !tourCompleted) {
      setTourCompleted(true);
      playAmbientChime();
    }
  }, [currentIndex, scenes.length, isMuted, tourCompleted]);

  const prevScene = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      if (!isMuted) playAmbientChime();
    }
  }, [currentIndex, isMuted]);

  const goToScene = (index: number) => {
    if (index >= 0 && index < scenes.length) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      if (!isMuted) playAmbientChime();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextScene();
      } else if (e.key === "ArrowLeft") {
        prevScene();
      } else if (e.key === "Escape" && isImmersive) {
        setIsImmersive(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextScene, prevScene, isImmersive]);

  // Touch Swipe navigation
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextScene();
    } else if (diff < -50) {
      prevScene();
    }
    touchStartX.current = null;
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${destination.name} - BharatVerse Virtual Yatra`,
          text: `Explore ${destination.name} virtually on BharatVerse!`,
          url
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied to clipboard! 📋" });
    }
  };

  const toggleSound = () => {
    if (isMuted) {
      playAmbientChime();
      setIsMuted(false);
      toast({ title: "Ambient sound enabled 🔔", description: "Experience meditative ambient chimes." });
    } else {
      setIsMuted(true);
    }
  };

  const getLightingClass = () => {
    switch (lightingMode) {
      case "sunrise": return "filter-tour-sunrise";
      case "aarti": return "filter-tour-aarti";
      case "vintage": return "filter-tour-vintage";
      case "vivid": return "filter-tour-vivid";
      default: return "";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-500 flex flex-col ${
        isImmersive
          ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl p-3 sm:p-6"
          : "w-full glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-4 sm:p-6"
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 mb-4 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-saffron flex items-center justify-center text-primary-foreground shadow-md">
            <Compass className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-foreground text-base sm:text-lg leading-tight">
                {destination.name} Virtual Tour
              </h2>
              <Badge variant="outline" className="text-[10px] border-primary/40 text-primary hidden sm:inline-flex">
                Scene {currentIndex + 1} of {scenes.length}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{destination.stateName} • {destination.region} India</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Lighting Atmosphere Mode Dropdown / Button Group */}
          <div className="hidden sm:flex items-center bg-card/60 rounded-xl p-0.5 border border-white/10 text-xs">
            <button
              onClick={() => setLightingMode("natural")}
              title="Natural Lighting"
              className={`px-2 py-1 rounded-lg transition-colors ${lightingMode === "natural" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-white"}`}
            >
              Natural
            </button>
            <button
              onClick={() => setLightingMode("sunrise")}
              title="Sunrise Gold Filter"
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${lightingMode === "sunrise" ? "bg-gold text-primary-foreground font-semibold" : "text-muted-foreground hover:text-white"}`}
            >
              <Sun className="h-3 w-3" /> Sunrise
            </button>
            <button
              onClick={() => setLightingMode("aarti")}
              title="Aarti Glow Filter"
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${lightingMode === "aarti" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-white"}`}
            >
              <Flame className="h-3 w-3 text-gold" /> Aarti
            </button>
            <button
              onClick={() => setLightingMode("vintage")}
              title="Vintage Heritage Filter"
              className={`px-2 py-1 rounded-lg transition-colors ${lightingMode === "vintage" ? "bg-amber-700 text-white font-semibold" : "text-muted-foreground hover:text-white"}`}
            >
              Vintage
            </button>
          </div>

          {/* Ambient Sound Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className="rounded-xl bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground"
            title={isMuted ? "Enable Ambient Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-primary animate-pulse" />}
          </Button>

          {/* Share Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="rounded-xl bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground"
            title="Share Yatra"
          >
            <Share2 className="h-4 w-4" />
          </Button>

          {/* Save Button */}
          <SaveDestinationBtn
            destinationSlug={destination.slug}
            destinationName={destination.name}
            destinationId={destination.id}
            variant="icon"
          />

          {/* Immersive Mode Toggle Button */}
          <Button
            onClick={() => setIsImmersive(!isImmersive)}
            variant={isImmersive ? "default" : "outline"}
            size="sm"
            className={`rounded-xl text-xs font-medium gap-1.5 ${
              isImmersive
                ? "bg-primary text-primary-foreground"
                : "border-white/20 bg-card/60 hover:bg-card text-foreground"
            }`}
          >
            {isImmersive ? (
              <>
                <Minimize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Exit Immersive</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Enter Immersive</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Visual Tour Canvas */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full overflow-hidden rounded-2xl bg-black flex-1 min-h-[360px] md:min-h-[500px] ${
          isImmersive ? "max-h-[calc(100vh-170px)]" : "max-h-[560px]"
        }`}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScene.id || currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50, scale: 1.05 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -direction * 50, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
          >
            <img
              src={currentScene.imageUrl}
              alt={currentScene.title}
              className={`w-full h-full object-cover select-none transition-all duration-700 ${getLightingClass()}`}
              draggable={false}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

            {/* Top Scene Label */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <Badge className="bg-black/60 backdrop-blur-md border border-white/20 text-white font-medium px-3 py-1 shadow-lg">
                📍 {currentScene.title}
              </Badge>
              {currentScene.isPanorama && (
                <Badge className="bg-primary/90 text-primary-foreground font-semibold px-2.5 py-1">
                  360° Panoramic View
                </Badge>
              )}
            </div>

            {/* Interactive Scene Hotspot Pin */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveHotspot(activeHotspot ? null : "hotspot-1")}
                className="relative group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.9)] border-2 border-white pulse-hotspot hover:scale-125 transition-transform">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2.5 py-1 bg-black/85 backdrop-blur-md rounded-lg text-[10px] font-bold text-white whitespace-nowrap border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  Cultural Lore Hotspot
                </span>
              </button>

              <AnimatePresence>
                {activeHotspot && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-black/90 backdrop-blur-xl border border-primary/40 rounded-2xl p-4 shadow-2xl z-30 text-left space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Architectural Secret
                      </span>
                      <button onClick={() => setActiveHotspot(null)} className="text-xs text-muted-foreground hover:text-white">✕</button>
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      {currentScene.culturalSignificance || currentScene.interestingFact || "Centuries of master craftsmen built this sacred monument using precise geometric alignments."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Overlay Information Sheet */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-black/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {currentScene.title}
                  </h3>
                  <button
                    onClick={() => setShowFactBox(!showFactBox)}
                    className="text-xs text-primary hover:text-saffron-glow flex items-center gap-1 font-medium transition-colors"
                  >
                    <Info className="h-3.5 w-3.5" />
                    <span>{showFactBox ? "Hide Fact" : "Show Fact"}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {currentScene.description}
                </p>

                {/* Cultural Significance & Fact Box */}
                {showFactBox && (
                  <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-3 text-xs">
                    {currentScene.culturalSignificance && (
                      <div className="flex-1 bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="font-semibold text-primary block mb-0.5 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-gold" />
                          Cultural Significance
                        </span>
                        <p className="text-gray-300 leading-normal">{currentScene.culturalSignificance}</p>
                      </div>
                    )}
                    {currentScene.interestingFact && (
                      <div className="flex-1 bg-gold/10 p-2.5 rounded-xl border border-gold/20">
                        <span className="font-semibold text-gold block mb-0.5 flex items-center gap-1">
                          <Lightbulb className="h-3 w-3 text-gold" />
                          Did You Know?
                        </span>
                        <p className="text-gray-300 leading-normal">{currentScene.interestingFact}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next Floating Navigation Arrows */}
        <div className="absolute inset-y-0 left-3 flex items-center z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevScene}
            disabled={currentIndex === 0}
            className="h-11 w-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 disabled:opacity-20 shadow-xl transition-all hover:scale-110 cursor-pointer"
            aria-label="Previous scene"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-3 flex items-center z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextScene}
            className="h-11 w-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all hover:scale-110 cursor-pointer"
            aria-label="Next scene"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Tour Completion Celebration Modal */}
      <AnimatePresence>
        {tourCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-gold/20 via-primary/15 to-card border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/40 shadow-lg">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-base sm:text-lg">
                  Yatra Completed! State Stamp Added 🏆
                </h4>
                <p className="text-xs text-muted-foreground">
                  You have experienced all scenes of <strong>{destination.name}</strong>. Your Bharat Cultural Passport has been stamped!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => goToScene(0)}
                variant="outline"
                className="border-gold/40 text-gold hover:bg-gold/10 rounded-xl text-xs"
              >
                Replay Tour ↺
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Scene Thumbnails & Progress Bar */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
        <TourProgress
          scenes={scenes}
          currentIndex={currentIndex}
          onSelectScene={goToScene}
        />

        <div className="flex items-center gap-2">
          <AskAiButton destinationName={destination.name} stateName={destination.stateName} />
        </div>
      </div>
    </div>
  );
};
