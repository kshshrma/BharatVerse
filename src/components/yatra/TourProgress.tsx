import { motion } from "framer-motion";
import { TourScene } from "@/data/yatraData";

interface TourProgressProps {
  scenes: TourScene[];
  currentSceneIndex: number;
  onSelectScene: (index: number) => void;
  className?: string;
}

export const TourProgress = ({
  scenes,
  currentSceneIndex,
  onSelectScene,
  className = ""
}: TourProgressProps) => {
  const total = scenes.length;
  if (total === 0) return null;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Top Text Indicator */}
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground px-1">
        <span className="font-medium text-foreground">Your Cultural Journey</span>
        <span className="font-semibold text-primary">
          Scene {currentSceneIndex + 1} of {total}
        </span>
      </div>

      {/* Progress Dots & Lines */}
      <div className="flex items-center justify-between w-full max-w-md px-2 relative py-2">
        {scenes.map((scene, idx) => {
          const isCompleted = idx < currentSceneIndex;
          const isCurrent = idx === currentSceneIndex;

          return (
            <div key={scene.id || idx} className="flex items-center flex-1 last:flex-none relative">
              {/* Dot Button */}
              <button
                type="button"
                onClick={() => onSelectScene(idx)}
                className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-gradient-saffron text-primary-foreground ring-4 ring-primary/30 scale-110 shadow-lg"
                    : isCompleted
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/80 border border-white/20 text-muted-foreground hover:border-primary/50"
                }`}
                title={`Jump to Scene ${idx + 1}: ${scene.title}`}
              >
                {idx + 1}
              </button>

              {/* Connecting Line to next dot */}
              {idx < total - 1 && (
                <div className="flex-1 h-1 mx-1 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary"
                    initial={{ width: isCompleted ? "100%" : "0%" }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
