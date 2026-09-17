import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Compass, Trash2, ArrowRight, MapPin, Sparkles, LogIn, UserPlus, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { yatraService } from "@/services/yatraService";
import { YatraDestination } from "@/data/yatraData";
import { useToast } from "@/hooks/use-toast";

const MyYatra = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [savedDestinations, setSavedDestinations] = useState<YatraDestination[]>(() => {
    return yatraService.getUserSavedDestinationsSync(user?.id);
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchSaved = useCallback(async () => {
    try {
      // First update immediately from synchronous cache
      const syncItems = yatraService.getUserSavedDestinationsSync(user?.id);
      setSavedDestinations(syncItems);

      // Then fetch any remote updates asynchronously without blocking
      const items = await yatraService.getUserSavedDestinations(user?.id);
      if (items && items.length > 0) {
        setSavedDestinations(items);
      }
    } catch (err) {
      console.error("Error loading saved destinations:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchSaved();

    const handleSavedChanged = () => {
      fetchSaved();
    };

    window.addEventListener("yatra:saved_changed", handleSavedChanged);
    window.addEventListener("storage", handleSavedChanged);

    return () => {
      window.removeEventListener("yatra:saved_changed", handleSavedChanged);
      window.removeEventListener("storage", handleSavedChanged);
    };
  }, [fetchSaved]);

  const handleRemove = async (dest: YatraDestination) => {
    await yatraService.unsaveDestination(user?.id, dest.slug);
    setSavedDestinations(prev => prev.filter(d => d.slug.toLowerCase() !== dest.slug.toLowerCase()));
    toast({
      title: "Removed from My Yatra",
      description: `${dest.name} has been removed from your saved list.`
    });
  };

  const handleClearAll = async () => {
    if (savedDestinations.length === 0) return;
    for (const dest of savedDestinations) {
      await yatraService.unsaveDestination(user?.id, dest.slug);
    }
    setSavedDestinations([]);
    toast({
      title: "Saved Journeys Cleared",
      description: "All saved destinations have been removed from your list."
    });
  };

  const categories = Array.from(new Set(savedDestinations.map(d => d.category))).filter(Boolean);
  const filteredDestinations = selectedCategory === "all"
    ? savedDestinations
    : savedDestinations.filter(d => d.category === selectedCategory);

  const uniqueStatesCount = new Set(savedDestinations.map(d => d.stateSlug || d.stateName)).size;


  return (
    <div className="min-h-screen pt-24 pb-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Banner */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3 backdrop-blur-md">
              <Heart className="h-3.5 w-3.5 fill-red-500" />
              <span>Personalized Pilgrimage & Heritage Tracker</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              My <span className="text-gradient-saffron">Yatra</span> Journeys
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
              Your curated collection of sacred temples, historic fortresses, and cultural wonders across Bharat.
            </p>

            {savedDestinations.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-foreground/80">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span><strong>{savedDestinations.length}</strong> Saved {savedDestinations.length === 1 ? 'Destination' : 'Destinations'}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <MapPin className="h-3.5 w-3.5 text-saffron" />
                  <span><strong>{uniqueStatesCount}</strong> {uniqueStatesCount === 1 ? 'State' : 'States'} Represented</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <Button
              onClick={() => navigate("/virtual-yatra")}
              className="bg-primary text-primary-foreground font-semibold px-6 py-5 rounded-xl shadow-lg"
            >
              <Compass className="h-4 w-4 mr-2" />
              Explore More Places
            </Button>
            {savedDestinations.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="border-white/15 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 text-muted-foreground py-5 rounded-xl transition-all"
              >
                <Trash2 className="h-4 w-4 mr-1.5" /> Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Guest Sync Alert Banner */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-4 sm:p-5 border border-primary/20 bg-primary/5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary mt-0.5 sm:mt-0">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  {savedDestinations.length > 0
                    ? `You have ${savedDestinations.length} saved ${savedDestinations.length === 1 ? 'journey' : 'journeys'} on this browser`
                    : "Guest Mode Active"}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sign in or create an account to back up your saved yatras in the cloud and sync them across all your devices.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                size="sm"
                onClick={() => navigate("/login")}
                className="bg-primary text-primary-foreground font-medium rounded-xl text-xs px-4"
              >
                <LogIn className="h-3.5 w-3.5 mr-1.5" /> Log In
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/signup")}
                className="border-white/20 text-foreground hover:bg-white/10 rounded-xl text-xs px-4"
              >
                <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Sign Up
              </Button>
            </div>
          </motion.div>
        )}

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white"
              }`}
            >
              All Categories ({savedDestinations.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white"
                }`}
              >
                {cat.replace("_", " ")} ({savedDestinations.filter(d => d.category === cat).length})
              </button>
            ))}
          </div>
        )}

        {/* Saved Destinations Content */}
        {filteredDestinations.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredDestinations.map((dest) => (
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
                          src={dest.heroImageUrl || "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground font-medium text-xs">
                            {dest.stateName || "Heritage Site"}
                          </Badge>
                        </div>

                        <div className="absolute top-3 right-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemove(dest)}
                            className="rounded-full bg-black/60 hover:bg-red-500/80 text-white h-8 w-8 transition-colors shadow-md"
                            title="Remove from My Yatra"
                            aria-label={`Remove ${dest.name} from My Yatra`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center gap-1 text-[11px] text-saffron-glow font-medium mb-1">
                            <MapPin className="h-3 w-3 text-primary" />
                            <span>{dest.stateName} • {dest.region}</span>
                          </div>
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
                        {dest.highlights && dest.highlights.length > 0 && (
                          <div className="flex items-center gap-1 text-[11px] text-foreground/80 line-clamp-1 italic">
                            <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                            <span>{dest.highlights[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-5 pt-0 flex items-center gap-2">
                      <Button
                        onClick={() => navigate(dest.stateSlug ? `/virtual-yatra/${dest.stateSlug}/${dest.slug}` : `/virtual-yatra`)}
                        className="w-full bg-gradient-saffron text-primary-foreground font-semibold py-5 rounded-xl shadow-md group/btn"
                      >
                        <Compass className="h-4 w-4 mr-2 group-hover/btn:rotate-45 transition-transform" />
                        <span>Continue Virtual Tour</span>
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
          <div className="glass-card rounded-3xl p-10 sm:p-16 text-center border border-white/10 max-w-lg mx-auto space-y-5 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary text-3xl">
              🧭
            </div>
            <h3 className="text-2xl font-bold text-foreground">Your journey is empty</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore India's cultural treasures, sacred temples, iconic ghats, and royal fortresses. Click the <strong>❤️ Save to My Yatra</strong> button on any destination to keep track of your travels.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => navigate("/virtual-yatra")}
                size="lg"
                className="w-full sm:w-auto bg-gradient-saffron text-primary-foreground font-semibold px-8 py-6 rounded-2xl shadow-[0_4px_20px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)]"
              >
                <span>Start Exploring</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              {!user && (
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/20 hover:bg-card text-foreground py-6 rounded-2xl"
                >
                  <LogIn className="h-4 w-4 mr-2" /> Log In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyYatra;

