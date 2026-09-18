import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Compass, MapPin, Sparkles, CheckCircle2, Lock, X, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CULTURAL_STATES } from "@/data/yatraData";
import { useToast } from "@/hooks/use-toast";

const PASSPORT_STORAGE_KEY = "bharat_passport_stamps";

// Helper to record a state stamp
export const recordPassportStamp = (stateSlug: string) => {
  try {
    const raw = localStorage.getItem(PASSPORT_STORAGE_KEY);
    const stamps: string[] = raw ? JSON.parse(raw) : [];
    if (!stamps.includes(stateSlug)) {
      stamps.push(stateSlug);
      localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(stamps));
      window.dispatchEvent(new CustomEvent("bharat:stamp_unlocked", { detail: { stateSlug } }));
    }
  } catch (e) {}
};

export const getPassportStamps = (): string[] => {
  try {
    const raw = localStorage.getItem(PASSPORT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ["uttar-pradesh", "rajasthan"]; // default initial starter stamps
  } catch (e) {
    return ["uttar-pradesh", "rajasthan"];
  }
};

export const CulturalPassportModal = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [stamps, setStamps] = useState<string[]>([]);

  useEffect(() => {
    setStamps(getPassportStamps());

    const handleStampEvent = () => {
      setStamps(getPassportStamps());
    };

    window.addEventListener("bharat:stamp_unlocked", handleStampEvent);
    return () => window.removeEventListener("bharat:stamp_unlocked", handleStampEvent);
  }, [open]);

  const totalStates = CULTURAL_STATES.length;
  const unlockedCount = stamps.length;
  const progressPercent = Math.min(100, Math.round((unlockedCount / totalStates) * 100));

  let rankTitle = "Cultural Yatri 🧭";
  if (unlockedCount >= 6) rankTitle = "Heritage Connoisseur 🪷";
  if (unlockedCount >= 12) rankTitle = "Vishwa Bandhu 🌏";
  if (unlockedCount >= 20) rankTitle = "Maharaja of Bharat 👑";

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin);
    toast({
      title: "Passport Link Copied! 📋",
      description: `You've unlocked ${unlockedCount} State Stamps on BharatVerse!`
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full px-3 py-1 text-xs font-semibold text-gold bg-gold/10 hover:bg-gold/20 border border-gold/30 flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Award className="h-3.5 w-3.5 text-gold" />
            <span>Passport</span>
            <Badge className="bg-gold text-primary-foreground text-[10px] px-1.5 py-0 rounded-full font-bold ml-0.5">
              {unlockedCount}
            </Badge>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#14120e]/95 backdrop-blur-2xl border border-gold/30 text-foreground p-6 sm:p-8 rounded-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/30 to-primary/20 flex items-center justify-center border border-gold/40 text-gold shadow-lg">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-gradient-saffron">
                  Official Bharat Cultural Passport
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your certified digital exploration stamps and heritage progress
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="hidden sm:flex border-gold/30 text-gold hover:bg-gold/10 rounded-xl text-xs gap-1.5"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </Button>
          </div>
        </DialogHeader>

        {/* Passport Status Header Card */}
        <div className="my-6 glass-card rounded-2xl p-5 border border-gold/20 bg-gradient-to-r from-gold/10 via-primary/5 to-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xs uppercase font-bold text-gold tracking-wider">Explorer Rank</span>
              <Badge className="bg-gold/20 text-gold border border-gold/30 text-xs px-2.5 py-0.5">
                {rankTitle}
              </Badge>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {unlockedCount} of {totalStates} Cultural Regions Unlocked
            </p>
          </div>

          <div className="w-full sm:w-60 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Bharat Darshan</span>
              <strong className="text-gold font-bold">{progressPercent}%</strong>
            </div>
            <Progress value={progressPercent} className="h-2.5 bg-white/10" />
          </div>
        </div>

        {/* Stamps Matrix */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> State Heritage Stamp Book
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CULTURAL_STATES.map((state) => {
              const isUnlocked = stamps.includes(state.slug);

              return (
                <motion.div
                  key={state.slug}
                  whileHover={isUnlocked ? { scale: 1.04 } : {}}
                  className={`relative p-3.5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                    isUnlocked
                      ? "bg-gradient-to-b from-gold/15 to-primary/10 border-gold/40 shadow-[0_4px_20px_-5px_rgba(234,179,8,0.25)] cursor-pointer"
                      : "bg-card/30 border-white/5 opacity-50"
                  }`}
                  onClick={() => {
                    if (isUnlocked) {
                      setOpen(false);
                      navigate(`/virtual-yatra/${state.slug}`);
                    }
                  }}
                >
                  <div className="mb-2">
                    {isUnlocked ? (
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-gold/60 bg-gold/10 flex items-center justify-center mx-auto shadow-inner">
                        <span className="text-2xl">{state.emoji}</span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto text-muted-foreground">
                        <Lock className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-xs text-foreground line-clamp-1">{state.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{state.region} India</p>
                  </div>

                  {isUnlocked ? (
                    <span className="mt-2 text-[9px] font-bold text-gold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-gold" /> STAMPED
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                        navigate(`/virtual-yatra/${state.slug}`);
                      }}
                      className="mt-2 text-[9px] h-6 px-2 text-primary hover:text-white"
                    >
                      Tour to Unlock →
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
