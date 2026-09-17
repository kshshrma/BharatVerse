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
      if (!user) {
        setIsSaved(false);
        return;
      }
      const saved = await yatraService.isDestinationSaved(user.id, destinationSlug);
      if (isMounted) setIsSaved(saved);
    };
    checkSaved();
    return () => {
      isMounted = false;
    };
  }, [user, destinationSlug]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to save destinations to your personal My Yatra journey.",
        action: (
          <Button size="sm" onClick={() => navigate("/login")} className="bg-primary text-primary-foreground">
            Sign In
          </Button>
        )
      });
      return;
    }

    setLoading(true);
    if (isSaved) {
      await yatraService.unsaveDestination(user.id, destinationSlug);
      setIsSaved(false);
      toast({
        title: "Removed from My Yatra",
        description: `${destinationName} has been removed from your saved journeys.`
      });
    } else {
      await yatraService.saveDestination(user.id, destinationSlug, destinationId);
      setIsSaved(true);
      toast({
        title: "Saved to My Yatra! ❤️",
        description: `${destinationName} has been added to your saved journeys.`
      });
    }
    setLoading(false);
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
