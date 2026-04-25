import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "bot" | "user";
  text: string;
}

const INITIAL_MESSAGE: Message = {
  role: "bot",
  text: "Namaste! 🙏 Welcome to BharatVerse. I can help you with questions like how to add content, how to subscribe, or how to buy items. How can I assist you today?"
};

const levenshtein = (a: string, b: string): number => {
  const tmp = [];
  let i, j;
  const alen = a.length;
  const blen = b.length;
  if (alen === 0) return blen;
  if (blen === 0) return alen;
  for (i = 0; i <= alen; i++) tmp[i] = [i];
  for (j = 0; j <= blen; j++) tmp[0][j] = j;
  for (i = 1; i <= alen; i++) {
    for (j = 1; j <= blen; j++) {
      tmp[i][j] = a[i - 1] === b[j - 1]
        ? tmp[i - 1][j - 1]
        : Math.min(tmp[i - 1][j - 1] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j] + 1);
    }
  }
  return tmp[alen][blen];
};

const fuzzyMatch = (text: string, keywords: string[]): boolean => {
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  return keywords.some(kw => {
    if (kw.includes(" ") && text.toLowerCase().includes(kw)) return true;
    return words.some(w => {
      if (w.length < 4) return w === kw;
      const maxDist = kw.length <= 5 ? 1 : 2;
      return levenshtein(w, kw) <= maxDist;
    });
  });
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "";

      if (fuzzyMatch(lower, ["add content", "upload", "create"])) {
        reply = "To add content, you must be logged in as an Admin. Go to your Admin Dashboard by clicking your profile avatar, and click the 'Add Content' button to publish your state's culture!";
      } else if (fuzzyMatch(lower, ["subscribe", "catchup"])) {
        reply = "You can subscribe to creators by clicking the 'CatchUp ⚡' button on their reels in the Category page. You can view all your CatchUps in your Cart page!";
      } else if (fuzzyMatch(lower, ["cart", "buy", "purchase", "order"])) {
        reply = "To buy handicrafts or food items, explore a State, select a category, and click the 'Add to Cart' button. You can then review and checkout from the Cart page!";
      } else if (fuzzyMatch(lower, ["admin", "role", "become admin"])) {
        reply = "Users can become an Admin when signing up. Admins get an 'Assigned State' and can publish cultural content, view subscriber analytics, and manage products!";
      } else if (fuzzyMatch(lower, ["login", "signup", "account", "register"])) {
        reply = "You can log in or sign up by clicking the 'Login' button in the top right of the navigation bar. Creating an account lets you add items to your cart, subscribe to creators, and more!";
      } else if (fuzzyMatch(lower, ["state", "explore", "discover", "find"])) {
        reply = "You can explore India's rich culture by searching for a State on the Home page, or clicking 'Explore States'. This will take you to the State's categories like Dance, Music, Food, and Handicrafts.";
      } else if (fuzzyMatch(lower, ["exclusive", "lock", "premium"])) {
        reply = "Exclusive content is special premium content locked by creators. As an admin, you can mark content as Exclusive. Users must subscribe (CatchUp) to view it fully!";
      } else if (fuzzyMatch(lower, ["edit", "delete", "update", "manage", "modify"])) {
        reply = "As an admin, go to your Admin Dashboard. Under the 'My Content' tab, you'll see a list of your posts. Use the Edit or Trash icons to modify or delete them.";
      } else if (fuzzyMatch(lower, ["analytics", "views", "who subscribed", "my subscribers", "dashboard"])) {
        reply = "To view your subscribers and analytics, open the Admin Dashboard and switch to the 'Subscribers' tab to see who CaughtUp with you. You'll also see average ratings and active carts!";
      } else if (fuzzyMatch(lower, ["sell", "price", "commerce", "product"])) {
        reply = "To sell physical products like handicrafts, check the 'Purchasable' option and add a Price when adding content. Users will be able to add it to their carts!";
      } else if (fuzzyMatch(lower, ["contact", "support", "help", "issue"])) {
        reply = "If you need further help or have an issue with the website, you can scroll down to the Contact section on the Home page and send us a direct message, or email us at hello@bharatverse.in.";
      } else {
        reply = "I'm a simple bot! I can help you with things like adding/managing content, subscribing, buying/selling items, exploring states, and checking your analytics. Could you try asking about one of those?";
      }

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    }, 600);
  };

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
                <div
                  key={idx}
                  className={`p-3 rounded-lg text-sm max-w-[85%] shadow-sm ${
                    msg.role === "bot"
                      ? "bg-secondary/50 rounded-tl-none self-start text-foreground"
                      : "bg-primary text-primary-foreground rounded-tr-none self-end"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSend} className="p-3 border-t border-border/50 bg-background/80 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="bg-background/50 border-border/50 text-sm h-10 flex-1"
              />
              <Button type="submit" size="sm" className="bg-gradient-saffron text-primary-foreground h-10 px-3">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        onClick={toggleChat}
        className={`bg-gradient-saffron text-primary-foreground w-16 h-16 rounded-full shadow-[0_4px_20px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)] hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center gap-0.5 font-semibold ${isOpen ? 'scale-110 shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)]' : ''}`}
      >
        {isOpen ? (
          <><X className="h-6 w-6" /><span className="text-[10px] uppercase tracking-wide">Close</span></>
        ) : (
          <><MessageCircle className="h-6 w-6" /><span className="text-[10px] uppercase tracking-wide">Chat</span></>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;
