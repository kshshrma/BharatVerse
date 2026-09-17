import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { use3DTilt } from "@/hooks/use3DTilt";
import { getAiResponse } from "@/services/aiChatService";

const playHapticSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Audio context might fail if user hasn't interacted with page yet, ignore
  }
};

interface Message {
  role: "bot" | "user";
  text: string;
}

const INITIAL_MESSAGE: Message = {
  role: "bot",
  text: "Namaste! 🙏 Welcome to **BharatVerse**.\n\nI am your AI Cultural Assistant & Tour Guide. Ask me about Indian heritage, 3D Virtual Yatras, state cultures, handicrafts, or platform features!"
};

const SUGGESTED_QUESTIONS = [
  "🌸 Varanasi Ganga Aarti",
  "🏛️ Taj Mahal History",
  "🗺️ Virtual Yatra Guide",
  "🏰 Jaipur Pink City",
  "💃 Kathakali Classical Dance",
  "❤️ How to use My Yatra"
];

// Lightweight Markdown Formatter component for clean text rendering
const FormattedMessage = ({ text, isBot }: { text: string; isBot: boolean }) => {
  const navigate = useNavigate();

  // Split by line breaks
  const lines = text.split("\n");

  const renderFormattedLine = (line: string, idx: number) => {
    // If line is empty
    if (!line.trim()) {
      return <div key={idx} className="h-2" />;
    }

    // Parse bold, italic, and links in the line
    // Regex matches [label](url), **bold**, *italic*
    const parts = [];
    let remaining = line;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // Link match: [text](url)
      const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
      // Bold match: **text**
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      // Italic match: *text* (when not bold)
      const italicMatch = remaining.match(/\*(.*?)\*/);

      // Find first matching token
      let firstIndex = -1;
      let tokenType: "link" | "bold" | "italic" | null = null;
      let matchObj: RegExpMatchArray | null = null;

      if (linkMatch && linkMatch.index !== undefined) {
        firstIndex = linkMatch.index;
        tokenType = "link";
        matchObj = linkMatch;
      }
      if (boldMatch && boldMatch.index !== undefined && (firstIndex === -1 || boldMatch.index < firstIndex)) {
        firstIndex = boldMatch.index;
        tokenType = "bold";
        matchObj = boldMatch;
      }
      if (italicMatch && italicMatch.index !== undefined && (firstIndex === -1 || italicMatch.index < firstIndex)) {
        firstIndex = italicMatch.index;
        tokenType = "italic";
        matchObj = italicMatch;
      }

      if (tokenType && matchObj && firstIndex >= 0) {
        if (firstIndex > 0) {
          parts.push(<span key={keyIdx++}>{remaining.slice(0, firstIndex)}</span>);
        }
        if (tokenType === "link") {
          const label = matchObj[1];
          const href = matchObj[2];
          parts.push(
            <a
              key={keyIdx++}
              href={href}
              onClick={(e) => {
                if (href.startsWith("/")) {
                  e.preventDefault();
                  navigate(href);
                }
              }}
              className="underline font-semibold text-primary hover:opacity-80"
            >
              {label}
            </a>
          );
        } else if (tokenType === "bold") {
          parts.push(<strong key={keyIdx++} className="font-semibold text-foreground">{matchObj[1]}</strong>);
        } else if (tokenType === "italic") {
          parts.push(<em key={keyIdx++} className="italic">{matchObj[1]}</em>);
        }
        remaining = remaining.slice(firstIndex + matchObj[0].length);
      } else {
        parts.push(<span key={keyIdx++}>{remaining}</span>);
        break;
      }
    }

    if (line.startsWith("• ") || line.startsWith("- ")) {
      return (
        <li key={idx} className="ml-4 list-disc text-xs sm:text-sm leading-relaxed mb-1">
          {parts}
        </li>
      );
    }

    return (
      <p key={idx} className="text-xs sm:text-sm leading-relaxed mb-1 last:mb-0">
        {parts}
      </p>
    );
  };

  return (
    <div className={`space-y-1 ${isBot ? "text-foreground" : "text-primary-foreground"}`}>
      {lines.map((line, idx) => renderFormattedLine(line, idx))}
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave, transformPerspective } = use3DTilt({ stiffness: 200, damping: 20 });

  const isReelSection = location.pathname.split("/").length > 3 && location.pathname.startsWith("/state/");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isGenerating]);

  // Contextual Yatra Listener for instant AI tour guide prompts
  useEffect(() => {
    const handleYatraQuery = (e: CustomEvent<{ prompt: string; destination: string; state: string }>) => {
      const { prompt } = e.detail;
      if (!prompt) return;
      setIsOpen(true);
      handleCustomSend(prompt);
    };

    window.addEventListener("ask-bharatverse-yatra" as any, handleYatraQuery);
    return () => {
      window.removeEventListener("ask-bharatverse-yatra" as any, handleYatraQuery);
    };
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const handleCustomSend = async (userMsg: string) => {
    if (!userMsg.trim() || isGenerating) return;
    const cleanMsg = userMsg.trim();
    
    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: cleanMsg }]);
    setIsGenerating(true);
    playHapticSound();

    try {
      const reply = await getAiResponse(cleanMsg, messages);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (error) {
      console.error("AI Assistant NLP Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Namaste! 🙏 Regarding **"${cleanMsg}"**:\n\nBharatVerse connects you with India's rich cultural heritage. Try asking about **Varanasi, Agra, Jaipur, Kerala**, or our **3D Virtual Yatras**!`
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating) return;
    const userMsg = input.trim();
    setInput("");
    await handleCustomSend(userMsg);
  };

  if (isReelSection) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ transformOrigin: "bottom left", rotateX, rotateY, transformPerspective, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mb-4 bg-card/95 backdrop-blur-xl border border-border/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] rounded-2xl w-[90vw] sm:w-[420px] max-h-[80vh] h-[550px] overflow-hidden flex flex-col glass-card"
          >
            {/* Chat Header */}
            <div style={{ transform: "translateZ(30px)" }} className="bg-gradient-saffron p-3.5 flex justify-between items-center text-primary-foreground relative z-10 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                  <Sparkles className="h-4 w-4 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide leading-tight">BharatVerse AI Guide</h3>
                  <span className="text-[10px] text-white/80 block leading-tight">Cultural NLP Assistant & 3D Tour Companion</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Clear Chat History"
                  className="hover:bg-black/15 p-1.5 rounded-full transition-colors text-white/90 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={toggleChat}
                  title="Close"
                  className="hover:bg-black/15 p-1.5 rounded-full transition-colors text-white/90 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Messages Body */}
            <div className="p-3.5 flex-1 overflow-y-auto flex flex-col gap-3 bg-background/60">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ transform: "translateZ(40px)" }}
                  className={`p-3 rounded-2xl max-w-[90%] shadow-md ${
                    msg.role === "bot"
                      ? "bg-secondary/70 border border-border/40 rounded-tl-none self-start"
                      : "bg-primary text-primary-foreground rounded-tr-none self-end"
                  }`}
                >
                  <FormattedMessage text={msg.text} isBot={msg.role === "bot"} />
                </motion.div>
              ))}

              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-secondary/70 border border-border/40 p-3 rounded-2xl rounded-tl-none self-start flex items-center gap-2 shadow-sm text-xs text-foreground"
                >
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>BharatVerse AI is reflecting & translating...</span>
                </motion.div>
              )}

              {/* Quick suggestions when conversation is brief */}
              {messages.length <= 2 && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 pt-2 border-t border-border/30"
                >
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                    💡 Suggested Explorations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleCustomSend(q.replace(/^[^\w\s]+/, "").trim())}
                        className="text-xs bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/25 hover:border-primary/40 px-2.5 py-1 rounded-full transition-all text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Form */}
            <form
              onSubmit={handleSend}
              style={{ transform: "translateZ(20px)" }}
              className="p-3 border-t border-border/50 bg-background/95 backdrop-blur-md flex gap-2 relative z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about temples, states, 3D tours, handicrafts..."
                disabled={isGenerating}
                className="bg-background/60 border-border/50 text-xs sm:text-sm h-11 flex-1 rounded-xl shadow-inner focus-visible:ring-saffron"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isGenerating || !input.trim()}
                className="bg-gradient-saffron text-primary-foreground h-11 w-11 rounded-xl shadow-[0_4px_15px_-3px_hsl(var(--saffron)/0.5)] hover:shadow-[0_6px_20px_-3px_hsl(var(--saffron)/0.6)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Toggle Button */}
      <motion.button
        animate={{ y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        onClick={toggleChat}
        className={`bg-gradient-saffron text-primary-foreground w-16 h-16 rounded-full shadow-[0_4px_20px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)] hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center gap-0.5 font-semibold ${isOpen ? 'scale-110 shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)]' : ''}`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center gap-0.5"
            >
              <X className="h-6 w-6" />
              <span className="text-[10px] uppercase tracking-wide">Close</span>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center gap-0.5"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-[10px] uppercase tracking-wide">AI Guide</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
