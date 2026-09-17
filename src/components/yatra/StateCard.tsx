import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CulturalState } from "@/data/yatraData";

interface StateCardProps {
  state: CulturalState;
  index?: number;
}

export const StateCard = ({ state, index = 0 }: StateCardProps) => {
  const navigate = useNavigate();

  const handleOpenStateTour = () => {
    navigate(`/virtual-yatra/${state.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={handleOpenStateTour}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenStateTour();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${state.name} Yatra`}
      className="glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      <div>
        {/* State Image Header */}
        <div className="relative h-60 overflow-hidden bg-muted">
          <img
            src={state.heroImageUrl}
            alt={state.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

          {/* Region Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/80 backdrop-blur-md text-primary-foreground font-semibold px-3 py-1">
              {state.region} India
            </Badge>
          </div>

          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-white/20 text-white text-xs">
              {state.destinationSlugs.length} Yatras
            </Badge>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
              {state.name}
            </h3>
            <p className="text-xs text-saffron-glow font-medium line-clamp-1 mt-0.5">
              {state.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-5">
            {state.description}
          </p>

          {/* Quick Cultural Pills */}
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block mb-1.5">
                Heritage Sites
              </span>
              <div className="flex flex-wrap gap-1.5">
                {state.heritageSites.slice(0, 3).map((site, i) => (
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
              <span className="text-[11px] font-semibold text-gold uppercase tracking-wider block mb-1.5">
                Traditional Crafts & Art
              </span>
              <div className="flex flex-wrap gap-1.5">
                {state.traditionalCrafts.slice(0, 2).map((craft, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/20 text-foreground"
                  >
                    {craft}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 pt-0">
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenStateTour();
          }}
          className="w-full bg-gradient-saffron text-primary-foreground font-semibold py-6 rounded-2xl shadow-[0_4px_15px_-3px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_25px_-3px_hsl(var(--saffron)/0.7)] group/btn cursor-pointer"
        >
          <span>Start {state.name} Yatra</span>
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};
