import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Mail, Phone, Heart, Globe, Users, Sparkles, Store, GraduationCap, Zap, ShieldCheck, Plus, MessageCircle, X, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { indianStates, stateEmojis } from "@/data/states";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

const values = [
  { icon: Heart, title: "Preserve Heritage", desc: "We safeguard centuries-old traditions by bringing them to the digital world." },
  { icon: Globe, title: "Connect Communities", desc: "Bridging Indian diaspora and culture enthusiasts worldwide." },
  { icon: Users, title: "Empower Artisans", desc: "Direct support to local creators, craftsmen, and performers." },
  { icon: Sparkles, title: "Inspire Discovery", desc: "Making cultural exploration fun, accessible, and rewarding." },
];

const services = [
  { icon: Store, title: "State-Wise Cultural Marketplace", desc: "Each Indian state has its own store page showcasing handicrafts, food, and festival gift boxes. Support local artisans and regional pride." },
  { icon: GraduationCap, title: "Cultural Learning Experiences", desc: "Learn from locals through folk dance tutorials, authentic recipes, and language workshops. Preserve living traditions through education." },
  { icon: Globe, title: "Global Cultural Sharing Space", desc: "Share festival moments, traditional attire photos, and love for India from anywhere. Connect diaspora & global fans of Indian culture." },
  { icon: Zap, title: '"CatchUp" & "Cart"', desc: "Subscribe to exclusive content from cultural creators or add handicraft products to your cart." },
  { icon: Heart, title: "Support Local Artisan Stories", desc: "Each product tells the artisan's story and offers direct support. Empower Indian creators and showcase real lives." },
  { icon: ShieldCheck, title: "Verified Commerce & Buying", desc: "Only trusted sellers, fair profits, and eco-friendly packaging. Promote honest, responsible e-commerce." },
];

const categories = ["dance", "music", "food", "handicrafts"];

const AnimatedCounter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, inView, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  


  const navigate = useNavigate();
  const { user, isAdmin, assignedState } = useAuth();
  const { toast } = useToast();

  // Add content dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [contentTitle, setContentTitle] = useState("");
  const [contentDesc, setContentDesc] = useState("");
  const [contentCategory, setContentCategory] = useState("");
  const [contentImageUrl, setContentImageUrl] = useState("");
  const [contentVideoUrl, setContentVideoUrl] = useState("");
  const [contentRecipe, setContentRecipe] = useState("");
  const [contentPrice, setContentPrice] = useState("");
  const [contentPurchasable, setContentPurchasable] = useState(false);
  const [contentExclusive, setContentExclusive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);


  const filtered = indianStates.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const handleStateClick = (state: string) => {
    navigate(`/state/${encodeURIComponent(state)}`);
  };

  const handleExplore = () => {
    if (filtered.length === 1) {
      handleStateClick(filtered[0]);
    } else {
      setShowResults(true);
    }
  };

  const resetContentForm = () => {
    setContentTitle("");
    setContentDesc("");
    setContentCategory("");
    setContentImageUrl("");
    setContentVideoUrl("");
    setContentRecipe("");
    setContentPrice("");
    setContentPurchasable(false);
    setContentExclusive(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (type === "image") setUploadingImage(true);
    else setUploadingVideo(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("content_media")
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
    } else {
      const { data: { publicUrl } } = supabase.storage.from("content_media").getPublicUrl(filePath);
      if (type === "image") setContentImageUrl(publicUrl);
      else setContentVideoUrl(publicUrl);
      toast({ title: "Upload successful ✅" });
    }

    if (type === "image") setUploadingImage(false);
    else setUploadingVideo(false);
  };

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !assignedState || !contentCategory) return;
    setSubmitting(true);

    const { error } = await supabase.from("cultural_content").insert({
      title: contentTitle,
      description: contentDesc || null,
      category: contentCategory,
      state_name: assignedState,
      image_url: contentImageUrl || null,
      video_url: contentVideoUrl || null,
      recipe: contentRecipe || null,
      price: contentPrice ? parseFloat(contentPrice) : null,
      is_purchasable: contentPurchasable,
      is_exclusive: contentExclusive,
      created_by: user.id,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: "Failed to add content", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Content added! 🎉", description: `Published to ${assignedState} > ${contentCategory}` });
      resetContentForm();
      setAddOpen(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">


      {/* ===== HERO SECTION ===== */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center relative z-10 overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron/10 via-background to-background" />
          {/* Floating Icons */}
          {[...Array(15)].map((_, i) => {
             const duration = 15 + Math.random() * 15;
             const delay = -(Math.random() * duration); // Negative delay makes them already visible across the screen on load
             const icons = ["🕌", "🐘", "🪷", "🪔", "🌶️", "🎭", "🌴", "🐅", "🥥", "🍛", "🛕", "🐪", "🦚", "🪁", "🥭"];
             
             return (
               <motion.div
                 key={i}
                 className="absolute text-6xl md:text-8xl opacity-30 drop-shadow-2xl pointer-events-none"
                 initial={{ y: "110vh", x: `${5 + Math.random() * 90}vw`, rotate: Math.random() * 60 - 30 }}
                 animate={{ 
                   y: "-20vh",
                   rotate: Math.random() * 180 - 90 
                 }}
                 transition={{ 
                   duration, 
                   repeat: Infinity, 
                   ease: "linear", 
                   delay 
                 }}
               >
                 {icons[i]}
               </motion.div>
             );
          })}
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 text-center z-10">
          <motion.h1 
            initial="hidden" animate="visible" 
            variants={{
               hidden: { opacity: 0 },
               visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 tracking-tight"
          >
            {"Rediscover India ".split("").map((char, index) => (
               <motion.span key={index} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="inline-block">
                 {char === " " ? "\u00A0" : char}
               </motion.span>
            ))}
            <motion.span variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="text-gradient-saffron inline-block btn-glow pb-2">Digitally</motion.span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-14 leading-relaxed font-medium">
            A digital gateway to explore India's rich cultural heritage, blending
            traditions with premium e-commerce and learning experiences.
          </motion.p>

          {/* Search / Add Content */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-saffron-glow to-primary rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" />
              <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-[0_0_40px_-10px_hsl(var(--saffron)/0.4)] p-2">
                {isAdmin ? (
                  /* Admin: show assigned state + add content button */
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="flex-1 text-left">
                      <p className="text-sm text-muted-foreground">Your State</p>
                      <p className="text-lg font-bold text-foreground">{stateEmojis[assignedState || ""] || "📍"} {assignedState || "Not assigned"}</p>
                    </div>
                    <Button
                      onClick={() => setAddOpen(true)}
                      className="bg-gradient-saffron text-primary-foreground font-semibold px-6 py-6 text-base rounded-xl shadow-[0_4px_20px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                      <Plus className="h-5 w-5 mr-2" /> Add Content
                    </Button>
                  </div>
                ) : (
                  /* User: search states */
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                      <Input
                        placeholder='Search a state e.g., Uttar Pradesh, Rajasthan'
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
                        onFocus={() => setShowResults(true)}
                        className="pl-12 pr-4 py-6 text-base bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <Button onClick={handleExplore}
                      className="bg-gradient-saffron text-primary-foreground font-semibold px-8 py-6 text-base rounded-xl shadow-[0_4px_20px_-4px_hsl(var(--saffron)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--saffron)/0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                      Explore States
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {!isAdmin && showResults && search && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-3 left-0 right-0 glass-card rounded-xl max-h-60 overflow-y-auto z-20 shadow-[0_20px_50px_-15px_hsl(var(--saffron)/0.2)]">
                {filtered.length > 0 ? (
                  filtered.map((state) => (
                    <button key={state} onClick={() => handleStateClick(state)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary/10 transition-colors text-foreground">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{stateEmojis[state] || "📍"} {state}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-muted-foreground">No states found</div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>


      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-gradient-saffron">BharatVerse</span></h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              BharatVerse is a celebration of India — its colors, rhythms, flavors, and crafts.
              We're building a digital bridge between timeless traditions and modern technology,
              enabling anyone, anywhere to explore, learn, and support India's incredible cultural mosaic.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }} className="glass-card-hover rounded-2xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4"><v.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, filter: "blur(5px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center glass-card rounded-2xl p-10 max-w-2xl mx-auto">
            <p className="text-xl italic text-foreground mb-4">"India is not just a country — it's a universe of stories waiting to be told."</p>
            <p className="text-muted-foreground text-sm">— The BharatVerse Team</p>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 relative z-10 bg-primary/5 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-gradient-saffron"><AnimatedCounter from={0} to={28} />+</p>
              <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">States Covered</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-gradient-saffron"><AnimatedCounter from={0} to={1250} duration={2.5} />+</p>
              <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Artisans Supported</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-gradient-saffron"><AnimatedCounter from={0} to={8500} duration={3} />+</p>
              <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Cultural Items</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-gradient-saffron"><AnimatedCounter from={0} to={100} duration={2} />%</p>
              <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Authentic</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-gradient-saffron">Services</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to explore, learn, and celebrate India's cultural wealth.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20, filter: "blur(5px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }} className="glass-card-hover rounded-2xl p-6 flex flex-col">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 self-start"><s.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in <span className="text-gradient-saffron">Touch</span></h2>
            <p className="text-muted-foreground text-lg">Have questions? We'd love to hear from you.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="glass-card rounded-xl p-5 flex items-start gap-4"><Mail className="h-5 w-5 text-primary mt-1" /><div><p className="font-semibold text-foreground">Email</p><p className="text-muted-foreground text-sm">hello@bharatverse.in</p></div></div>
              <div className="glass-card rounded-xl p-5 flex items-start gap-4"><Phone className="h-5 w-5 text-primary mt-1" /><div><p className="font-semibold text-foreground">Phone</p><p className="text-muted-foreground text-sm">+91 98765 43210</p></div></div>
              <div className="glass-card rounded-xl p-5 flex items-start gap-4"><MapPin className="h-5 w-5 text-primary mt-1" /><div><p className="font-semibold text-foreground">Address</p><p className="text-muted-foreground text-sm">New Delhi, India</p></div></div>
            </motion.div>
            <motion.form initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Your Name" className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground" />
              <Input placeholder="Your Email" type="email" className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground" />
              <Textarea placeholder="Your Message" rows={4} className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground" />
              <Button className="w-full bg-gradient-saffron text-primary-foreground hover:opacity-90">Send Message</Button>
            </motion.form>
          </div>
        </div>
      </section>

      <footer className="relative bg-background pt-32 pb-10 z-10 overflow-hidden">
        {/* Animated Wave Background */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <motion.svg 
            className="relative block w-[200%] h-[150px] md:h-[200px]" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-saffron/5" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="fill-saffron/10" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-saffron/20"></path>
            {/* Duplicated for seamless loop */}
            <path transform="translate(1200, 0)" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-saffron/5" opacity=".25"></path>
            <path transform="translate(1200, 0)" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="fill-saffron/10" opacity=".5"></path>
            <path transform="translate(1200, 0)" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-saffron/20"></path>
          </motion.svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-6 mb-8">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
              <motion.a 
                key={idx} href="#" 
                whileHover={{ y: -8, scale: 1.2, rotate: 5, color: "hsl(var(--saffron))" }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground transition-colors hover:border-saffron/50"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
          <p className="text-muted-foreground text-sm font-medium">© 2026 BharatVerse. Celebrating India's Cultural Heritage.</p>
        </div>
      </footer>

      {/* Add Content Dialog for Admin */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Content to {assignedState}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddContent} className="space-y-4">
            <div>
              <Label className="text-foreground">Title</Label>
              <Input value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label className="text-foreground">Category</Label>
              <Select value={contentCategory} onValueChange={setContentCategory}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">Description</Label>
              <Textarea value={contentDesc} onChange={(e) => setContentDesc(e.target.value)} className="mt-1" rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-foreground">Cover Image</Label>
                <div className="mt-1 flex items-center">
                  <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} disabled={uploadingImage} className="bg-background/50 border-border/50 text-foreground" />
                </div>
                {uploadingImage && <span className="text-xs text-primary mt-1">Uploading...</span>}
                {contentImageUrl && <span className="text-xs text-green-500 mt-1">Image attached ✅</span>}
              </div>
              <div>
                <Label className="text-foreground">Video (Optional)</Label>
                <div className="mt-1 flex items-center">
                  <Input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, "video")} disabled={uploadingVideo} className="bg-background/50 border-border/50 text-foreground" />
                </div>
                {uploadingVideo && <span className="text-xs text-primary mt-1">Uploading...</span>}
                {contentVideoUrl && <span className="text-xs text-green-500 mt-1">Video attached ✅</span>}
              </div>
            </div>
            {contentCategory === "food" && (
              <div>
                <Label className="text-foreground">Recipe</Label>
                <Textarea value={contentRecipe} onChange={(e) => setContentRecipe(e.target.value)} className="mt-1" rows={2} />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-foreground">Price (₹)</Label>
                <Input type="number" value={contentPrice} onChange={(e) => setContentPrice(e.target.value)} className="mt-1" />
              </div>
              <div className="flex flex-col gap-2 pt-6">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" checked={contentPurchasable} onChange={(e) => setContentPurchasable(e.target.checked)} className="rounded" />
                  Purchasable
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" checked={contentExclusive} onChange={(e) => setContentExclusive(e.target.checked)} className="rounded" />
                  Exclusive
                </label>
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-gradient-saffron text-primary-foreground">
              {submitting ? "Publishing..." : "Publish Content"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>


    </div>
  );
};

export default Index;
