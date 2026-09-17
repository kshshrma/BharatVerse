import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Sparkles, MapPin, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YatraDestination } from "@/data/yatraData";
import { SaveDestinationBtn } from "./SaveDestinationBtn";

interface DestinationCardProps {
  destination: YatraDestination;
  index?: number;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  heritage: { label: "Heritage Site", color: "bg-terracotta/20 text-terracotta border-terracotta/30" },
  spiritual: { label: "Spiritual Yatra", color: "bg-primary/20 text-primary border-primary/30" },
  art_craft: { label: "Art & Crafts", color: "bg-gold/20 text-gold border-gold/30" },
  nature: { label: "Nature & Ecology", color: "bg-emerald/20 text-emerald border-emerald/30" },
  historical: { label: "Historical Fort", color: "bg-royal-blue/20 text-sky-400 border-royal-blue/30" },
  food_trail: { label: "Culinary Heritage", color: "bg-saffron/20 text-saffron border-saffron/30" }
};

export const DestinationCard = ({ destination, index = 0 }: DestinationCardProps) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const cat = CATEGORY_LABELS[destination.category] || CATEGORY_LABELS.heritage;

  const fallbackImage =
    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80";

  const handleOpenTour = () => {
    navigate(`/virtual-yatra/${destination.stateSlug}/${destination.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={handleOpenTour}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenTour();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${destination.name} in ${destination.stateName}`}
      className="glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group h-full shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      <div>
        {/* Top Image Box */}
        <div className="relative h-56 overflow-hidden bg-muted">
          <img
            src={imgError ? fallbackImage : destination.heroImageUrl}
            alt={destination.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <Badge variant="outline" className={`backdrop-blur-md text-xs font-medium border ${cat.color}`}>
              {cat.label}
            </Badge>
            <SaveDestinationBtn
              destinationSlug={destination.slug}
              destinationName={destination.name}
              destinationId={destination.id}
              variant="icon"
            />
          </div>

          {/* Bottom title inside Image */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1.5 text-xs text-saffron-glow font-medium mb-1">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{destination.stateName} • {destination.region}</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
              {destination.name}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
            {destination.tagline || destination.description}
          </p>

          {/* Highlights tags */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div className="space-y-1 mb-4">
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block">
                Tour Highlight
              </span>
              <p className="text-xs text-foreground/90 line-clamp-1 italic">
                "{destination.highlights[0]}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 flex items-center gap-2">
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenTour();
          }}
          className="w-full bg-gradient-saffron text-primary-foreground font-semibold py-5 rounded-xl shadow-[0_4px_15px_-3px_hsl(var(--saffron)/0.5)] hover:shadow-[0_6px_25px_-3px_hsl(var(--saffron)/0.7)] group/btn cursor-pointer"
        >
          <Compass className="h-4 w-4 mr-2 group-hover/btn:rotate-45 transition-transform duration-300" />
          <span>Begin Virtual Tour</span>
          <ArrowRight className="h-4 w-4 ml-auto opacity-70 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};
