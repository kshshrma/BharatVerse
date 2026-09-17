import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Compass,
  MapPin,
  Sparkles,
  CheckCircle2,
  Utensils,
  Shirt,
  Music,
  Calendar,
  Layers,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { yatraService } from "@/services/yatraService";
import { CulturalState, YatraDestination } from "@/data/yatraData";
import { DestinationCard } from "@/components/yatra/DestinationCard";

const StateTour = () => {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const navigate = useNavigate();

  const [state, setState] = useState<CulturalState | null>(null);
  const [destinations, setDestinations] = useState<YatraDestination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
    let isMounted = true;
    const loadStateData = async () => {
      if (!stateSlug) return;
      try {
        setLoading(true);
        const res = await yatraService.getStateBySlug(stateSlug);
        if (isMounted) {
          setState(res.state);
          setDestinations(res.destinations);
        }
      } catch (err) {
        console.error("Error loading state yatra:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadStateData();
    return () => {
      isMounted = false;
    };
  }, [stateSlug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center">
        <Compass className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground text-sm">Loading State Yatra...</p>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="min-h-screen pt-28 pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="glass-card rounded-3xl p-10 max-w-lg border border-white/10 space-y-4">
          <div className="text-4xl">📍</div>
          <h2 className="text-2xl font-bold text-foreground">State Not Found</h2>
          <p className="text-muted-foreground text-sm">
            We couldn't find cultural details for "{stateSlug}". Explore other Indian states in Virtual Yatra.
          </p>
          <Button onClick={() => navigate("/virtual-yatra")} className="bg-primary text-primary-foreground">
            Back to Virtual Yatra
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <img
          src={state.heroImageUrl}
          alt={state.name}
          className="w-full h-full object-cover opacity-20 filter blur-sm"
        />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      </div>

      <div className="container mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link to="/virtual-yatra" className="hover:text-primary transition-colors">
            Virtual Yatra
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">{state.name}</span>
        </div>

        {/* 1. State Hero Section */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-16">
          <div className="relative h-72 sm:h-96 md:h-[420px] overflow-hidden">
            <img
              src={state.heroImageUrl}
              alt={state.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
                  {state.region} India
                </Badge>
                <Badge variant="outline" className="bg-black/50 border-white/20 text-white text-xs">
                  {destinations.length} Virtual Tours
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-2">
                {state.name} <span className="text-gradient-saffron">Yatra</span>
              </h1>
              <p className="text-sm sm:text-lg text-saffron-glow font-medium max-w-2xl leading-relaxed">
                {state.tagline}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 border-t border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Cultural Overview
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {state.description}
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                  Cultural Identity & Spirit
                </span>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                  "{state.culturalIdentity}"
                </p>
              </div>
            </div>

            {/* Quick Facts Box */}
            <div className="glass-card rounded-2xl p-5 border border-gold/20 bg-gold/5 space-y-3">
              <span className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Did You Know?
              </span>
              <ul className="space-y-2.5 text-xs text-foreground/90">
                {state.quickFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-gold font-bold">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Cultural Highlights Grid */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-primary border-primary/30 mb-2 px-3 py-1">
              Traditions & Arts
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Cultural Pillars of <span className="text-gradient-saffron">{state.name}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Heritage Sites */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta/20 text-terracotta flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">Monumental Heritage Sites</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {state.heritageSites.map((site, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-terracotta shrink-0" />
                    <span>{site}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Traditional Crafts */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center">
                <Shirt className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">Master Crafts & Handlooms</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {state.traditionalCrafts.map((craft, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>{craft}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Famous Food */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald/20 text-emerald flex items-center justify-center">
                <Utensils className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">Signature Regional Delicacies</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {state.famousFood.map((food, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald shrink-0" />
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Festivals */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">Celebrated Festivals</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {state.festivals.map((fest, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{fest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Music & Dance */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-royal-blue/20 text-sky-400 flex items-center justify-center">
                <Music className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">Classical & Folk Performing Arts</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {state.musicAndDance.map((art, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Traditional Art */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-maroon/20 text-rose-400 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground text-base">Traditional Fine Arts</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {state.traditionalArt.map((art, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Destinations in this State */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <Badge variant="outline" className="text-xs uppercase tracking-wider text-primary border-primary/30 mb-2 px-3 py-1">
                Virtual Yatra Itinerary
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Destinations in <span className="text-gradient-saffron">{state.name}</span>
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">
              {destinations.length} Guided Destinations Available
            </span>
          </div>

          {destinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center border border-white/10 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary text-2xl">
                ✨
              </div>
              <h3 className="text-xl font-bold text-foreground">More destinations are coming soon.</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Our cultural curation team is compiling high-resolution scenes and historical narratives for this state.
              </p>
              <Button onClick={() => navigate("/virtual-yatra")} className="bg-primary text-primary-foreground font-semibold rounded-xl">
                Start Exploring Other States
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StateTour;
