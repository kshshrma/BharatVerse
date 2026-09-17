import { motion } from "framer-motion";
import { Compass, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VirtualYatraHeroProps {
  onStartExploring: () => void;
  onExploreByState: () => void;
}

export const VirtualYatraHero = ({ onStartExploring, onExploreByState }: VirtualYatraHeroProps) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-saffron/20 via-gold/15 to-saffron-glow/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Floating Cultural Motifs (subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-20">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[10%] text-5xl"
        >
          🛕
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-28 right-[12%] text-5xl"
        >
          🕌
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 left-[20%] text-4xl"
        >
          🦚
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-12 right-[22%] text-4xl"
        >
          🪷
        </motion.div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm font-medium mb-6 shadow-sm"
        >
          <Compass className="h-4 w-4 animate-spin-slow" />
          <span>BharatVerse Virtual Yatra • Immersive Cultural Discovery</span>
          <Sparkles className="h-3.5 w-3.5 text-gold" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] mb-6"
        >
          Explore India,{" "}
          <span className="text-gradient-saffron inline-block">One Journey</span> at a Time.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg sm:text-xl md:text-2xl font-normal max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Travel through India's heritage, traditions, art, food and stories — <span className="text-foreground font-medium">virtually</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            type="button"
            onClick={onStartExploring}
            size="lg"
            className="w-full sm:w-auto bg-gradient-saffron text-primary-foreground font-semibold px-8 py-6 rounded-2xl shadow-[0_6px_25px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_10px_35px_-4px_hsl(var(--saffron)/0.7)] hover:scale-105 active:scale-95 transition-all text-base group cursor-pointer"
          >
            <span>Start Exploring</span>
            <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            type="button"
            onClick={onExploreByState}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white/20 bg-card/60 backdrop-blur-md hover:bg-card text-foreground font-medium px-8 py-6 rounded-2xl hover:border-primary/40 text-base cursor-pointer"
          >
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>Explore by State</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
