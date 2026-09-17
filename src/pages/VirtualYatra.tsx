import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Compass, MapPin, Sparkles, SlidersHorizontal, ArrowRight, CheckCircle2 } from "lucide-react";
import { VirtualYatraHero } from "@/components/yatra/VirtualYatraHero";
import { IndiaExplorerMap } from "@/components/yatra/IndiaExplorerMap";
import { DestinationCard } from "@/components/yatra/DestinationCard";
import { StateCard } from "@/components/yatra/StateCard";
import { YatraSearchFilter, YatraFilterState } from "@/components/yatra/YatraSearchFilter";
import { yatraService } from "@/services/yatraService";
import { CulturalState, YatraDestination } from "@/data/yatraData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VirtualYatra = () => {
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const destinationsSectionRef = useRef<HTMLDivElement>(null);

  const [states, setStates] = useState<CulturalState[]>([]);
  const [destinations, setDestinations] = useState<YatraDestination[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<YatraFilterState>({
    query: "",
    region: "All",
    category: "all",
    stateSlug: "all"
  });

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const [allStates, allDestinations] = await Promise.all([
          yatraService.getStates(),
          yatraService.getAllDestinations()
        ]);
        if (isMounted) {
          setStates(allStates);
          setDestinations(allDestinations);
        }
      } catch (err) {
        console.error("Error loading virtual yatra data:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToMap = () => {
    if (mapSectionRef.current) {
      const top = mapSectionRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToDestinations = () => {
    if (destinationsSectionRef.current) {
      const top = destinationsSectionRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Filter Logic
  const filteredDestinations = destinations.filter((dest) => {
    // 1. Search query filter
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const matchName = dest.name.toLowerCase().includes(q);
      const matchState = dest.stateName.toLowerCase().includes(q);
      const matchDesc = dest.description.toLowerCase().includes(q);
      const matchTagline = dest.tagline?.toLowerCase().includes(q);
      const matchCrafts = dest.localCrafts?.some(c => c.toLowerCase().includes(q));
      const matchFood = dest.famousFood?.some(f => f.toLowerCase().includes(q));
      const matchHighlights = dest.highlights?.some(h => h.toLowerCase().includes(q));

      if (!matchName && !matchState && !matchDesc && !matchTagline && !matchCrafts && !matchFood && !matchHighlights) {
        return false;
      }
    }

    // 2. Region filter
    if (filters.region !== "All" && dest.region !== filters.region) {
      return false;
    }

    // 3. Category filter
    if (filters.category !== "all" && dest.category !== filters.category) {
      return false;
    }

    // 4. State slug filter
    if (filters.stateSlug !== "all" && dest.stateSlug !== filters.stateSlug) {
      return false;
    }

    return true;
  });

  const featuredDestinations = destinations.filter(d => d.isFeatured);

  return (
    <div className="min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* 1. Hero Section */}
      <VirtualYatraHero
        onStartExploring={scrollToDestinations}
        onExploreByState={scrollToMap}
      />

      <div className="container mx-auto px-4 space-y-24">
        {/* 2. Interactive India Map Exploration Section */}
        <section ref={mapSectionRef} className="pt-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-primary border-primary/30 mb-3 px-3 py-1">
              Geographical Cultural Discovery
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Explore India by <span className="text-gradient-saffron">States & Regions</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Click on any state to unlock its architectural monuments, timeless crafts, regional delicacies, and multi-scene 3D guided yatras.
            </p>
          </div>

          <IndiaExplorerMap />
        </section>

        {/* 3. Search & Filter Section */}
        <section ref={destinationsSectionRef} className="pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <Badge variant="outline" className="text-xs uppercase tracking-wider text-primary border-primary/30 mb-2 px-3 py-1">
                Virtual Yatra Library
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Cultural <span className="text-gradient-saffron">Destinations</span>
              </h2>
            </div>
            <span className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{filteredDestinations.length}</strong> of {destinations.length} destinations
            </span>
          </div>

          <YatraSearchFilter
            filters={filters}
            onChange={setFilters}
            availableStates={states.map(s => ({ slug: s.slug, name: s.name }))}
          />

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center border border-white/10 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary text-2xl">
                🧭
              </div>
              <h3 className="text-xl font-bold text-foreground">No destinations found</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We couldn't find destinations matching your search filters. Try clearing your filters or exploring another category.
              </p>
              <Button
                onClick={() => setFilters({ query: "", region: "All", category: "all", stateSlug: "all" })}
                className="bg-primary text-primary-foreground font-semibold rounded-xl"
              >
                Reset Search Filters
              </Button>
            </div>
          )}
        </section>

        {/* 4. Featured Cultural States Section */}
        <section className="pt-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-primary border-primary/30 mb-3 px-3 py-1">
              Living Heritage
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Featured <span className="text-gradient-saffron">Cultural States</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Immerse yourself in complete state-level cultural journeys with curated crafts, traditional performing arts, and famous delicacies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {states.slice(0, 6).map((state, i) => (
              <StateCard key={state.slug} state={state} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VirtualYatra;
