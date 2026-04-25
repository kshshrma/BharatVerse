import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "bot" | "user";
  text: string;
}

const INITIAL_MESSAGE: Message = {
  role: "bot",
  text: "Namaste! 🙏 Welcome to BharatVerse. I am your AI assistant. I can help you with questions about adding content, subscribing, buying items, or managing your account. How can I assist you today?"
};

const SYSTEM_PROMPT = `You are the BharatVerse Support AI. Your job is to help Admins and Users. Keep answers concise, friendly, and helpful. Use emojis.
Rules:
1. If they ask about adding, editing, or deleting content, tell them they must be an Admin and go to their 'Admin Dashboard'.
2. If they ask about subscribing, tell them to click the 'CatchUp ⚡' button on reels.
3. If they ask about buying or cart, tell them to explore a State, select a category, and click 'Add to Cart'.
4. If they ask about exclusive content, tell them it's locked premium content that requires subscribing (CatchUp) to the creator.
5. If they ask about analytics or subscribers, tell admins to check the 'Subscribers' tab in the Admin Dashboard.
6. If they ask about login/signup, tell them to use the Login button in the top right.
7. If they ask about refunds, returns, or cancellations, inform them that returns are accepted within 7 days of delivery and they should email support@bharatverse.com with their order ID.
8. If they ask about shipping or order tracking, tell them they will receive a tracking link via email once the seller dispatches their item (usually within 48 hours).
9. If they ask to speak to a human or contact customer care, provide the support email (support@bharatverse.com) or the toll-free number (1800-BHARAT-CARE).
10. If they report a bug or technical issue, apologize for the inconvenience and ask them to try refreshing the page or clearing their browser cache, or to contact support if it persists.
11. If the input is heavily misspelled or weirdly phrased, do your best to understand the intent based on these rules.
12. If they ask something completely unrelated to the platform, politely decline and steer them back to BharatVerse topics.`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isReelSection = location.pathname.split("/").length > 3 && location.pathname.startsWith("/state/");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Reset chat when closed
  const toggleChat = () => {
    if (isOpen) {
      setTimeout(() => setMessages([INITIAL_MESSAGE]), 300); // Clear after animation
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsGenerating(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setMessages((prev) => [...prev, { role: "bot", text: "Oops! The AI is sleeping right now. Please add your Groq API Key to the .env file." }]);
        setIsGenerating(false);
        return;
      }

      const formattedMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(1).map(m => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text
        })),
        { role: "user", content: userMsg }
      ];

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Fast and completely free Groq model
          messages: formattedMessages,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const responseText = data.choices[0].message.content;
      setMessages((prev) => [...prev, { role: "bot", text: responseText }]);
    } catch (error) {
      console.error("Groq API Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, I'm having trouble connecting to my AI brain right now." }]);
    } finally {
      setIsGenerating(false);
    }
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
            style={{ transformOrigin: "bottom left" }}
            className="mb-4 bg-card border border-border/50 shadow-2xl rounded-2xl w-80 sm:w-96 overflow-hidden flex flex-col glass-card"
          >
            <div className="bg-gradient-saffron p-4 flex justify-between items-center text-primary-foreground">
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
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`p-3 rounded-lg text-sm max-w-[85%] shadow-sm ${
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
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-secondary/50 p-3 rounded-lg rounded-tl-none self-start flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-foreground">AI is typing...</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSend} className="p-3 border-t border-border/50 bg-background/80 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                disabled={isGenerating}
                className="bg-background/50 border-border/50 text-sm h-10 flex-1"
              />
              <Button type="submit" size="sm" disabled={isGenerating} className="bg-gradient-saffron text-primary-foreground h-10 px-3">
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
