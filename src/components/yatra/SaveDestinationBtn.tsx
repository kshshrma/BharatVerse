import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { yatraService } from "@/services/yatraService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SaveDestinationBtnProps {
  destinationSlug: string;
  destinationName: string;
  destinationId?: string;
  variant?: "icon" | "full" | "outline";
  className?: string;
}

export const SaveDestinationBtn = ({
  destinationSlug,
  destinationName,
  destinationId,
  variant = "full",
  className = ""
}: SaveDestinationBtnProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkSaved = async () => {
      const saved = await yatraService.isDestinationSaved(user?.id, destinationSlug);
      if (isMounted) setIsSaved(saved);
    };
    checkSaved();

    // Listen to real-time changes across components
    const handleSavedChanged = (e: any) => {
      if (!isMounted) return;
      const changedSlug = e?.detail?.slug;
      if (!changedSlug || changedSlug === (destinationSlug || "").toLowerCase().trim()) {
        checkSaved();
      }
    };

    window.addEventListener("yatra:saved_changed", handleSavedChanged);

    return () => {
      isMounted = false;
      window.removeEventListener("yatra:saved_changed", handleSavedChanged);
    };
  }, [user, destinationSlug]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    const normalizedSlug = (destinationSlug || "").toLowerCase().trim();

    try {
      if (isSaved) {
        await yatraService.unsaveDestination(user?.id, normalizedSlug);
        setIsSaved(false);
        toast({
          title: "Removed from My Yatra",
          description: `${destinationName} has been removed from your saved journeys.`
        });
      } else {
        await yatraService.saveDestination(user?.id, normalizedSlug, destinationId);
        setIsSaved(true);
        toast({
          title: "Saved to My Yatra! ❤️",
          description: user
            ? `${destinationName} added to your journeys.`
            : `${destinationName} saved to this device. Sign in anytime to sync across devices.`,
          action: (
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/my-yatra")}
              className="border-primary/40 text-primary hover:bg-primary/10 text-xs font-semibold"
            >
              View My Yatra
            </Button>
          )
        });
      }
    } catch (err) {
      console.error("Failed to toggle destination save:", err);
    } finally {
      setLoading(false);
    }
  };

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        disabled={loading}
        className={`rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white transition-all ${className}`}
        aria-label={isSaved ? "Remove from My Yatra" : "Save to My Yatra"}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <motion.div whileTap={{ scale: 0.8 }} animate={{ scale: isSaved ? [1, 1.3, 1] : 1 }}>
            <Heart
              className={`h-5 w-5 transition-colors ${
                isSaved ? "fill-red-500 text-red-500" : "text-white hover:text-red-400"
              }`}
            />
          </motion.div>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant={isSaved ? "default" : "outline"}
      onClick={handleToggle}
      disabled={loading}
      className={`rounded-xl transition-all font-medium flex items-center gap-2 ${
        isSaved
          ? "bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30 shadow-sm"
          : "border-white/20 bg-card/60 hover:bg-card text-foreground"
      } ${className}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
      )}
      <span>{isSaved ? "Saved in My Yatra" : "Save to My Yatra"}</span>
    </Button>
  );
};

