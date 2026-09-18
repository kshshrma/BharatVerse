import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const AmbientAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const droneOscsRef = useRef<OscillatorNode[]>([]);
  const bellTimerRef = useRef<number | null>(null);

  // Initialize or start synthesizer
  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Indian Tanpura inspired drone frequencies (Root C#3 ~ 138.59Hz, Fifth G#3 ~ 207.65Hz, Octave C#4 ~ 277.18Hz, Harmonics)
      const baseFreqs = [138.59, 207.65, 277.18, 415.30];
      const oscs: OscillatorNode[] = [];

      baseFreqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm triangle and sine waves
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle micro-detune for acoustic richness
        osc.detune.setValueAtTime((i - 1.5) * 3, ctx.currentTime);

        // Low-pass filter for smooth ambient warmth
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(650, ctx.currentTime);

        // Gentle volume for each oscillator
        gain.gain.setValueAtTime(0.06 / (i + 1), ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start();
        oscs.push(osc);
      });

      droneOscsRef.current = oscs;

      // Periodically trigger a gentle meditative temple bell chime (every 12-18 seconds)
      const scheduleNextBell = () => {
        const interval = 12000 + Math.random() * 8000;
        bellTimerRef.current = window.setTimeout(() => {
          if (audioCtxRef.current && masterGainRef.current) {
            playTempleChime(audioCtxRef.current, masterGainRef.current);
            scheduleNextBell();
          }
        }, interval);
      };

      scheduleNextBell();
      setIsPlaying(true);
    } catch (e) {
      console.warn("Ambient audio could not be initialized:", e);
    }
  };

  const playTempleChime = (ctx: AudioContext, destinationNode: GainNode) => {
    try {
      const bellFreqs = [554.37, 830.61, 1108.73]; // C#5, G#5, C#6
      bellFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 3.2);

        osc.connect(gain);
        gain.connect(destinationNode);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 3.3);
      });
    } catch (e) {
      // Ignore audio synthesis chime errors
    }
  };

  const stopSynth = () => {
    if (bellTimerRef.current) {
      clearTimeout(bellTimerRef.current);
      bellTimerRef.current = null;
    }

    droneOscsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    droneOscsRef.current = [];

    if (masterGainRef.current && audioCtxRef.current) {
      try {
        masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.1);
      } catch (e) {}
    }

    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSynth();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="relative flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleAudio}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                isPlaying
                  ? "bg-primary/20 text-primary border-primary/40 shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                  : "text-muted-foreground hover:text-foreground border-white/10 hover:border-white/20 bg-background/30"
              }`}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-[2px] h-3.5 px-0.5">
                    <span className="w-[3px] bg-primary rounded-full audio-wave-bar h-2" />
                    <span className="w-[3px] bg-primary rounded-full audio-wave-bar h-3.5" />
                    <span className="w-[3px] bg-primary rounded-full audio-wave-bar h-2.5" />
                    <span className="w-[3px] bg-primary rounded-full audio-wave-bar h-4" />
                  </div>
                  <span className="hidden xl:inline text-[11px] font-semibold text-primary">Ambience ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="hidden xl:inline text-[11px] text-muted-foreground">Ambience</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-card/95 backdrop-blur-md border border-primary/20 text-xs max-w-xs text-foreground">
            <p className="font-semibold text-primary flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Bharat Meditative Ambience
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Procedural Indian Tanpura harmonics & temple chime soundscapes.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
