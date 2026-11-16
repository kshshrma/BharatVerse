import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Shield, LogOut, Compass, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { yatraService } from "@/services/yatraService";
import { AmbientAudioPlayer } from "./AmbientAudioPlayer";

const navLinks = [
  { id: "home", label: "Home", isSection: true },
  { id: "virtual-yatra", label: "Virtual Yatra", isSection: false, path: "/virtual-yatra", icon: Compass },
  { id: "about", label: "About", isSection: true },
  { id: "services", label: "Services", isSection: true },
  { id: "contact", label: "Contact", isSection: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateSavedCount = () => {
      const count = yatraService.getSavedCount(user?.id);
      setSavedCount(count);
    };
    updateSavedCount();
    const handleSavedChanged = () => updateSavedCount();
    window.addEventListener("yatra:saved_changed", handleSavedChanged);
    window.addEventListener("storage", handleSavedChanged);
    return () => {
      window.removeEventListener("yatra:saved_changed", handleSavedChanged);
      window.removeEventListener("storage", handleSavedChanged);
    };
  }, [user]);

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (!link.isSection && link.path) {
      navigate(link.path);
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isReelSection = location.pathname.split("/").length > 3 && location.pathname.startsWith("/state/");
  if (isReelSection) return null;

  const isVirtualYatraActive = location.pathname.startsWith("/virtual-yatra");
  const isMyYatraActive = location.pathname === "/my-yatra";

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-5 pt-3"
      >
        <div
          className={`w-full max-w-6xl flex items-center justify-between rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "px-5 py-2.5 bg-black/70 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              : "px-5 py-3 bg-black/30 backdrop-blur-lg border border-white/[0.04]"
          }`}
        >
          {/* ──── Logo ──── */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="relative h-8 w-8 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-primary/40 transition-all duration-300 shadow-lg">
              <img
                src="/logo.png"
                alt="BharatVerse"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">
              Bharat<span className="text-primary">Verse</span>
            </span>
          </button>

          {/* ──── Desktop Navigation Links ──── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                (link.id === "virtual-yatra" && isVirtualYatraActive) ||
                (link.isSection && location.pathname === "/" && link.id === "home");

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/90"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.id === "virtual-yatra" && (
                      <Compass className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-primary/70"}`} />
                    )}
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.06]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ──── Desktop Right Actions ──── */}
          <div className="hidden lg:flex items-center gap-1.5">
            <AmbientAudioPlayer />

            <Link to="/my-yatra">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-lg text-[13px] font-medium h-8 px-3 transition-all ${
                  isMyYatraActive
                    ? "bg-red-500/15 text-red-400 border border-red-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Heart
                  className={`h-3.5 w-3.5 mr-1.5 ${
                    savedCount > 0 || isMyYatraActive ? "text-red-400 fill-red-400" : "text-red-400/60"
                  }`}
                />
                Saved
                {savedCount > 0 && (
                  <span className="ml-1.5 min-w-[18px] h-[18px] text-[10px] font-semibold bg-red-500 text-white rounded-full flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/50 hover:text-white hover:bg-white/[0.06] rounded-lg h-8 w-8"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </Link>

            <div className="w-px h-5 bg-white/[0.08] mx-1" />

            {user ? (
              <div className="flex items-center gap-1">
                {isAdmin && (
                  <Link to="/admin">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/50 hover:text-white hover:bg-white/[0.06] rounded-lg h-8 px-3 text-[13px] font-medium"
                    >
                      <Shield className="h-3.5 w-3.5 mr-1.5" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-white/50 hover:text-white hover:bg-white/[0.06] rounded-lg h-8 px-3 text-[13px] font-medium"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg h-8 px-4 text-[13px] font-medium"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-8 px-5 text-[13px] font-semibold shadow-[0_0_20px_rgba(255,153,0,0.15)] hover:shadow-[0_0_30px_rgba(255,153,0,0.25)] transition-all"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* ──── Mobile Right Section ──── */}
          <div className="flex items-center gap-0.5 lg:hidden">
            <AmbientAudioPlayer />

            <Link to="/my-yatra">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg h-9 w-9 relative"
              >
                <Heart className={`h-[18px] w-[18px] ${savedCount > 0 ? "text-red-400 fill-red-400/50" : ""}`} />
                {savedCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[9px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                    {savedCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg h-9 w-9"
              >
                <ShoppingCart className="h-[18px] w-[18px]" />
              </Button>
            </Link>

            <button
              className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.06]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ──── Mobile Menu Overlay ──── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden fixed top-[68px] left-3 right-3 z-50 rounded-2xl bg-[#0c0c0f]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <div className="flex flex-col p-3 gap-0.5">
                {navLinks.map((link) => {
                  const isActive = link.id === "virtual-yatra" && isVirtualYatraActive;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link)}
                      className={`py-3 px-4 text-[14px] font-medium rounded-xl text-left transition-all flex items-center gap-2.5 ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-white/70 hover:text-white hover:bg-white/[0.04] active:bg-white/[0.08]"
                      }`}
                    >
                      {link.id === "virtual-yatra" && (
                        <Compass className={`h-4 w-4 ${isActive ? "text-primary" : "text-primary/60"}`} />
                      )}
                      {link.label}
                    </button>
                  );
                })}

                <Link
                  to="/my-yatra"
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-4 text-[14px] font-medium rounded-xl text-left transition-all flex items-center justify-between ${
                    isMyYatraActive
                      ? "bg-red-500/10 text-red-400"
                      : "text-red-400/80 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="h-4 w-4 fill-red-400/30" />
                    Saved Journeys
                  </span>
                  {savedCount > 0 && (
                    <span className="min-w-[20px] h-5 px-1.5 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center">
                      {savedCount}
                    </span>
                  )}
                </Link>

                <div className="h-px bg-white/[0.06] my-2 mx-2" />

                <div className="flex flex-col gap-1 px-1">
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setMobileOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-white/60 hover:text-white hover:bg-white/[0.04] rounded-xl text-[14px] h-11"
                          >
                            <Shield className="h-4 w-4 mr-2.5" />
                            Admin Panel
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white/60 hover:text-white hover:bg-white/[0.04] rounded-xl text-[14px] h-11"
                        onClick={() => { handleSignOut(); setMobileOpen(false); }}
                      >
                        <LogOut className="h-4 w-4 mr-2.5" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <div className="flex gap-2 pt-1">
                      <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl h-11 text-[14px] font-medium border-white/[0.1] text-white/80 hover:text-white hover:bg-white/[0.04]"
                        >
                          Log in
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                        <Button className="w-full rounded-xl h-11 text-[14px] font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(255,153,0,0.15)]">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
