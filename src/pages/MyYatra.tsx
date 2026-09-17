import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Compass, Trash2, ArrowRight, MapPin, Sparkles, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { yatraService } from "@/services/yatraService";
import { YatraDestination } from "@/data/yatraData";
import { useToast } from "@/hooks/use-toast";

const MyYatra = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [savedDestinations, setSavedDestinations] = useState<YatraDestination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSaved = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const items = await yatraService.getUserSavedDestinations(user.id);
        if (isMounted) {
          setSavedDestinations(items);
        }
      } catch (err) {
        console.error("Error loading saved destinations:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchSaved();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleRemove = async (dest: YatraDestination) => {
    if (!user) return;
    await yatraService.unsaveDestination(user.id, dest.slug);
    setSavedDestinations(prev => prev.filter(d => d.slug !== dest.slug));
    toast({
      title: "Removed from My Yatra",
      description: `${dest.name} has been removed from your saved list.`
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center">
        <Compass className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground text-sm">Loading your journey...</p>
      </div>
    );
  }

  // If user is not logged in:
  if (!user) {
    return (
      <div className="min-h-screen pt-28 pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="glass-card rounded-3xl p-10 sm:p-12 max-w-md border border-white/10 space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto text-3xl">
            ❤️
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Save Your Cultural Journeys</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sign in or create an account to bookmark destinations, track your virtual tour progress, and create your personalized "My Yatra" itinerary.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={() => navigate("/login")}
              className="flex-1 bg-gradient-saffron text-primary-foreground font-semibold py-5 rounded-xl"
            >
              <LogIn className="h-4 w-4 mr-2" /> Log In
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              variant="outline"
              className="flex-1 border-white/20 hover:bg-card text-foreground py-5 rounded-xl"
            >
              Sign Up Free
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Banner */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
              <Heart className="h-3.5 w-3.5 fill-red-500" />
              <span>Personalized Pilgrimage & Heritage Tracker</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              My <span className="text-gradient-saffron">Yatra</span> Journeys
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
              Your curated collection of sacred destinations, historical fortresses, and cultural wonders across Bharat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/virtual-yatra")}
              className="bg-primary text-primary-foreground font-semibold px-6 py-5 rounded-xl shadow-lg"
            >
              <Compass className="h-4 w-4 mr-2" />
              Explore More Places
            </Button>
          </div>
        </div>

        {/* Saved Destinations Content */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Compass className="h-8 w-8 text-primary animate-spin mb-3" />
            <p className="text-xs text-muted-foreground">Loading saved destinations...</p>
          </div>
        ) : savedDestinations.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Saved Destinations ({savedDestinations.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {savedDestinations.map((dest) => (
                  <motion.div
                    key={dest.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={dest.heroImageUrl}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground font-medium text-xs">
                            {dest.stateName}
                          </Badge>
                        </div>

                        <div className="absolute top-3 right-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemove(dest)}
                            className="rounded-full bg-black/60 hover:bg-red-500/80 text-white h-8 w-8 transition-colors"
                            title="Remove from My Yatra"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white leading-tight">
                            {dest.name}
                          </h3>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                          {dest.tagline || dest.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-5 pt-0 flex items-center gap-2">
                      <Button
                        onClick={() => navigate(`/virtual-yatra/${dest.stateSlug}/${dest.slug}`)}
                        className="w-full bg-gradient-saffron text-primary-foreground font-semibold py-5 rounded-xl shadow-md group/btn"
                      >
                        <Compass className="h-4 w-4 mr-2 group-hover/btn:rotate-45 transition-transform" />
                        <span>Continue Tour</span>
                        <ArrowRight className="h-4 w-4 ml-auto opacity-70 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="glass-card rounded-3xl p-12 sm:p-16 text-center border border-white/10 max-w-lg mx-auto space-y-5 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary text-3xl">
              🧭
            </div>
            <h3 className="text-2xl font-bold text-foreground">Your journey is empty</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Start exploring India's cultural treasures, iconic ghats, and hill fortresses, and click the heart icon to save your favorite destinations.
            </p>
            <Button
              onClick={() => navigate("/virtual-yatra")}
              size="lg"
              className="bg-gradient-saffron text-primary-foreground font-semibold px-8 py-6 rounded-2xl shadow-[0_4px_20px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)]"
            >
              <span>Start Exploring</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyYatra;
