import { Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AskAiButtonProps {
  destinationName: string;
  stateName: string;
  contextPrompt?: string;
  variant?: "default" | "subtle" | "inline";
  className?: string;
}

export const AskAiButton = ({
  destinationName,
  stateName,
  contextPrompt,
  variant = "default",
  className = ""
}: AskAiButtonProps) => {
  const handleAsk = () => {
    const promptText =
      contextPrompt ||
      `Tell me more about the ancient cultural heritage, spiritual significance, and local legends of ${destinationName} in ${stateName}.`;

    window.dispatchEvent(
      new CustomEvent("ask-bharatverse-yatra", {
        detail: {
          prompt: promptText,
          destination: destinationName,
          state: stateName
        }
      })
    );
  };

  if (variant === "subtle") {
    return (
      <button
        onClick={handleAsk}
        className={`inline-flex items-center gap-1.5 text-xs text-primary hover:text-saffron-glow transition-colors font-medium ${className}`}
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Ask AI about {destinationName}</span>
      </button>
    );
  }

  return (
    <Button
      onClick={handleAsk}
      variant="outline"
      className={`rounded-xl border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary transition-all font-medium flex items-center gap-2 shadow-sm ${className}`}
    >
      <Sparkles className="h-4 w-4 text-gold animate-pulse" />
      <span>Ask BharatVerse AI about this place</span>
    </Button>
  );
};
