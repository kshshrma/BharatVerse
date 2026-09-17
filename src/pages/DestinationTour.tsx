import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Compass,
  MapPin,
  Sparkles,
  Heart,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Layers,
  Utensils,
  Shirt,
  Info,
  CheckCircle2,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { yatraService } from "@/services/yatraService";
import { YatraDestination } from "@/data/yatraData";
import { VirtualTourViewer } from "@/components/yatra/VirtualTourViewer";
import { SaveDestinationBtn } from "@/components/yatra/SaveDestinationBtn";
import { AskAiButton } from "@/components/yatra/AskAiButton";
import { useToast } from "@/hooks/use-toast";

const DestinationTour = () => {
  const { stateSlug, destinationSlug } = useParams<{ stateSlug: string; destinationSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const tourSectionRef = useRef<HTMLDivElement>(null);

  const [destination, setDestination] = useState<YatraDestination | null>(null);
  const [allStateDestinations, setAllStateDestinations] = useState<YatraDestination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
    let isMounted = true;
    const loadDestination = async () => {
      if (!stateSlug || !destinationSlug) return;
      try {
        setLoading(true);
        const [destData, stateData] = await Promise.all([
          yatraService.getDestinationBySlug(stateSlug, destinationSlug),
          yatraService.getStateBySlug(stateSlug)
        ]);

        if (isMounted) {
          setDestination(destData);
          setAllStateDestinations(stateData.destinations || []);
        }
      } catch (err) {
        console.error("Error loading destination tour:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadDestination();
    return () => {
      isMounted = false;
    };
  }, [stateSlug, destinationSlug]);

  const scrollToTour = () => {
    tourSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center">
        <Compass className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground text-sm">Loading Destination Experience...</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen pt-28 pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="glass-card rounded-3xl p-10 max-w-lg border border-white/10 space-y-4">
          <div className="text-4xl">🏛️</div>
          <h2 className="text-2xl font-bold text-foreground">Destination Not Found</h2>
          <p className="text-muted-foreground text-sm">
            We couldn't load this cultural destination. Please check the URL or explore our other Yatras.
          </p>
          <Button onClick={() => navigate("/virtual-yatra")} className="bg-primary text-primary-foreground">
            Explore All Yatras
          </Button>
        </div>
      </div>
    );
  }

  // Calculate Next and Prev destination in the state
  const currentIndex = allStateDestinations.findIndex(d => d.slug === destination.slug);
  const prevDest = currentIndex > 0 ? allStateDestinations[currentIndex - 1] : null;
  const nextDest =
    currentIndex >= 0 && currentIndex < allStateDestinations.length - 1
      ? allStateDestinations[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen pt-20 pb-24 relative">
      {/* Background Image Ambient Glow */}
      <div className="fixed inset-0 -z-10">
        <img
          src={destination.heroImageUrl}
          alt={destination.name}
          className="w-full h-full object-cover opacity-15 filter blur-lg"
        />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      </div>

      <div className="container mx-auto px-4 space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/virtual-yatra" className="hover:text-primary transition-colors">
            Virtual Yatra
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={`/virtual-yatra/${destination.stateSlug}`} className="hover:text-primary transition-colors">
            {destination.stateName}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">{destination.name}</span>
        </div>

        {/* 1. Destination Hero Banner */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative h-80 sm:h-96 md:h-[460px] overflow-hidden">
            <img
              src={destination.heroImageUrl}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

            {/* Top Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
                  {destination.stateName}
                </Badge>
                <Badge variant="outline" className="bg-black/60 border-white/20 text-white text-xs backdrop-blur-md capitalize">
                  {destination.category.replace("_", " ")} Yatra
                </Badge>
              </div>

              <SaveDestinationBtn
                destinationSlug={destination.slug}
                destinationName={destination.name}
                destinationId={destination.id}
                variant="full"
                className="bg-black/50 backdrop-blur-md border-white/20"
              />
            </div>

            {/* Bottom Hero Text & Actions */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10">
              <div className="flex items-center gap-1.5 text-xs text-saffron-glow font-medium mb-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{destination.stateName} • {destination.region} India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-3">
                {destination.name}
              </h1>

              <p className="text-sm sm:text-lg text-gray-200 font-normal max-w-2xl leading-relaxed mb-6">
                {destination.tagline || destination.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={scrollToTour}
                  size="lg"
                  className="bg-gradient-saffron text-primary-foreground font-semibold px-8 py-6 rounded-2xl shadow-[0_6px_25px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_10px_35px_-4px_hsl(var(--saffron)/0.7)] group"
                >
                  <Compass className="h-5 w-5 mr-2 group-hover:rotate-45 transition-transform" />
                  <span>Begin Virtual Tour</span>
                </Button>

                <AskAiButton
                  destinationName={destination.name}
                  stateName={destination.stateName}
                  className="py-6 px-6 rounded-2xl bg-card/60 backdrop-blur-md border-white/20 hover:bg-card text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Virtual Tour Experience Section */}
        <section ref={tourSectionRef} className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-primary border-primary/30 mb-2 px-3 py-1">
              Interactive 3D & Panoramic Experience
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Guided Virtual <span className="text-gradient-saffron">Yatra Experience</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Navigate through curated high-definition scenes using the controls, arrow keys, or full-screen immersive mode.
            </p>
          </div>

          <VirtualTourViewer destination={destination} />
        </section>

        {/* 3. Deep Cultural Insights (About & Why It Matters) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* About & Significance */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                About {destination.name}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {destination.description}
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-primary/20 bg-primary/5 space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Why It Matters & Cultural Significance
              </h2>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {destination.culturalSignificance}
              </p>
              {destination.historySummary && (
                <div className="pt-3 border-t border-primary/15">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                    Historical Genesis
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {destination.historySummary}
                  </p>
                </div>
              )}
            </div>

            {/* What To Explore / Key Attractions */}
            {destination.attractions && destination.attractions.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Compass className="h-5 w-5 text-primary" />
                  What to Explore at {destination.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.attractions.map((attr, idx) => (
                    <div key={idx} className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={attr.imageUrl}
                          alt={attr.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <h4 className="absolute bottom-3 left-3 right-3 text-base font-bold text-white leading-tight">
                          {attr.name}
                        </h4>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {attr.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Traditions, Crafts, Food, Best Time */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Travel Info */}
            <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Best Time to Visit
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {destination.bestTimeToVisit}
              </p>
            </div>

            {/* Local Traditions */}
            {destination.traditions && destination.traditions.length > 0 && (
              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
                <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold" />
                  Living Traditions & Rituals
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {destination.traditions.map((trad, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>{trad}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Famous Crafts */}
            {destination.localCrafts && destination.localCrafts.length > 0 && (
              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
                <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                  <Shirt className="h-4 w-4 text-primary" />
                  Famous Handicrafts
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {destination.localCrafts.map((craft, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-white/5 border border-white/10 text-foreground py-1 px-2.5">
                      {craft}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Famous Food */}
            {destination.famousFood && destination.famousFood.length > 0 && (
              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
                <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-emerald" />
                  Must-Taste Regional Delicacies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {destination.famousFood.map((food, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-emerald/10 border border-emerald/20 text-foreground py-1 px-2.5">
                      {food}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. Next & Previous Destination Navigation Bar */}
        <section className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevDest ? (
            <Link
              to={`/virtual-yatra/${prevDest.stateSlug}/${prevDest.slug}`}
              className="flex items-center gap-3 glass-card p-4 rounded-2xl border border-white/10 hover:border-primary/40 transition-all group w-full sm:w-auto"
            >
              <ChevronLeft className="h-5 w-5 text-primary group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Previous Destination</span>
                <span className="font-semibold text-foreground text-sm">{prevDest.name}</span>
              </div>
            </Link>
          ) : <div />}

          <Button
            onClick={() => navigate(`/virtual-yatra/${destination.stateSlug}`)}
            variant="outline"
            className="border-white/20 text-muted-foreground hover:text-foreground rounded-xl"
          >
            All {destination.stateName} Destinations
          </Button>

          {nextDest ? (
            <Link
              to={`/virtual-yatra/${nextDest.stateSlug}/${nextDest.slug}`}
              className="flex items-center gap-3 glass-card p-4 rounded-2xl border border-white/10 hover:border-primary/40 transition-all group w-full sm:w-auto justify-end"
            >
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Next Destination</span>
                <span className="font-semibold text-foreground text-sm">{nextDest.name}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </section>
      </div>
    </div>
  );
};

export default DestinationTour;
