import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Sparkles, Compass, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INDIA_MAP_STATES, MapStateItem } from "@/data/indiaMapSvgData";
import { CULTURAL_STATES } from "@/data/yatraData";

interface IndiaExplorerMapProps {
  onSelectState?: (slug: string) => void;
}

const REGIONS = ["All", "North", "West", "South", "East", "Central", "North-East"] as const;

export const IndiaExplorerMap = ({ onSelectState }: IndiaExplorerMapProps) => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [hoveredState, setHoveredState] = useState<MapStateItem | null>(null);
  const [activeState, setActiveState] = useState<MapStateItem>(
    INDIA_MAP_STATES.find(s => s.slug === "uttar-pradesh") || INDIA_MAP_STATES[0]
  );

  const filteredStates = INDIA_MAP_STATES.filter(
    s => selectedRegion === "All" || s.region === selectedRegion
  );

  const activeStateDetails = CULTURAL_STATES.find(s => s.slug === activeState.slug);

  const handleStateClick = (state: MapStateItem) => {
    if (activeState.slug === state.slug) {
      handleOpenStateTour(state.slug);
      return;
    }
    setActiveState(state);
    if (onSelectState) {
      onSelectState(state.slug);
    }
  };

  const handleOpenStateTour = (slug: string) => {
    navigate(`/virtual-yatra/${slug}`);
  };

  return (
    <div className="w-full">
      {/* Region Filter Bar */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
        {REGIONS.map((region) => (
          <Button
            key={region}
            type="button"
            variant={selectedRegion === region ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRegion(region)}
            className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              selectedRegion === region
                ? "bg-gradient-saffron text-primary-foreground shadow-[0_2px_12px_-2px_hsl(var(--saffron)/0.5)]"
                : "border-white/10 hover:border-primary/40 bg-card/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {region} India
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Interactive India State Matrix & Geographical Visual Explorer */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground text-lg">State Navigator</h3>
            </div>
            <span className="text-xs text-muted-foreground">Select or tap twice to explore</span>
          </div>

          {/* Grid of Interactive State Badges organized by geo layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[440px] overflow-y-auto pr-1 py-1">
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
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
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

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span>Highlighted states have curated multi-scene 3D & panoramic tours</span>
            </div>
          </div>
        </div>

        {/* Right Side: Selected State Live Spotlight Card */}
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
                className="relative h-56 overflow-hidden cursor-pointer group/header"
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
                      <Badge className="bg-primary text-primary-foreground font-semibold">
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
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-foreground/90 leading-relaxed line-clamp-3 mb-4">
                    {activeStateDetails?.description ||
                      `${activeState.name} boasts magnificent cultural traditions, regional cuisine, ancient temples, and time-honored artisanal crafts.`}
                  </p>

                  {/* Highlights Pill List */}
                  {activeStateDetails && (
                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1.5">
                          Top Cultural Treasures
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeStateDetails.heritageSites.slice(0, 3).map((site, i) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1"
                            >
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                              {site}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1.5">
                          Famous Crafts & Delicacies
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[...activeStateDetails.traditionalCrafts.slice(0, 2), ...activeStateDetails.famousFood.slice(0, 2)].map(
                            (item, i) => (
                              <span
                                key={i}
                                className="text-xs px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/20 text-foreground"
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
                <Button
                  type="button"
                  onClick={() => handleOpenStateTour(activeState.slug)}
                  className="w-full bg-gradient-saffron text-primary-foreground font-semibold py-6 rounded-2xl shadow-[0_4px_20px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)] group cursor-pointer"
                >
                  <span>Explore {activeState.name} Yatra</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
