import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
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
  text: "Namaste! 🙏 Welcome to BharatVerse. I am your AI assistant and cultural guide. How can I assist you with Indian heritage, 3D Virtual Yatras, handicrafts, or platform features today?"
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
  }, [messages, isOpen]);

  // Contextual Yatra Listener
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

  // Reset chat when closed
  const toggleChat = () => {
    if (isOpen) {
      setTimeout(() => setMessages([INITIAL_MESSAGE]), 300);
    }
    setIsOpen(!isOpen);
  };

  const handleCustomSend = async (userMsg: string) => {
    if (!userMsg.trim() || isGenerating) return;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsGenerating(true);
    playHapticSound();

    try {
      const reply = await getAiResponse(userMsg, messages);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Namaste! 🙏 Regarding "${userMsg}": BharatVerse connects you with India's rich cultural heritage. Try asking about Varanasi, Agra, Jaipur, Kerala, or our 3D Virtual Yatras!`
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
            style={{ transformOrigin: "bottom right", rotateX, rotateY, transformPerspective, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mb-4 bg-card border border-border/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-2xl w-80 sm:w-96 overflow-hidden flex flex-col glass-card"
          >
            <div style={{ transform: "translateZ(30px)" }} className="bg-gradient-saffron p-4 flex justify-between items-center text-primary-foreground relative z-10 shadow-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                BharatVerse Support
              </h3>
              <button onClick={toggleChat} className="hover:bg-black/10 p-1 rounded-full transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3 bg-background/50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ transform: "translateZ(40px)" }}
                  className={`p-3 rounded-xl text-sm max-w-[85%] shadow-md ${
                    msg.role === "bot"
                      ? "bg-secondary/50 rounded-tl-none self-start text-foreground"
                      : "bg-primary text-primary-foreground rounded-tr-none self-end"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ transform: "translateZ(40px)" }}
                    className="bg-secondary/50 p-3 rounded-xl rounded-tl-none self-start flex items-center gap-2 shadow-sm"
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-foreground">AI is typing...</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSend} style={{ transform: "translateZ(20px)" }} className="p-3 border-t border-border/50 bg-background/90 backdrop-blur-md flex gap-2 relative z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                disabled={isGenerating}
                className="bg-background/50 border-border/50 text-sm h-11 flex-1 rounded-xl shadow-inner focus-visible:ring-saffron"
              />
              <Button type="submit" size="icon" disabled={isGenerating} className="bg-gradient-saffron text-primary-foreground h-11 w-11 rounded-xl shadow-[0_4px_15px_-3px_hsl(var(--saffron)/0.5)] hover:shadow-[0_6px_20px_-3px_hsl(var(--saffron)/0.6)] hover:scale-105 active:scale-95 transition-all">
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        animate={{ y: [0, -24, 0] }}
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
              <span className="text-[10px] uppercase tracking-wide">Chat</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
