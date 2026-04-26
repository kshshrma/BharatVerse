import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isReelSection = location.pathname.split("/").length > 3 && location.pathname.startsWith("/state/");

  if (isReelSection) return null;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4`}
      >
        <div className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled 
            ? "bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "bg-[#0a0a0c]/40 backdrop-blur-md border border-white/5"
        }`}>
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-3 group">
            <div className="transition-transform duration-300 group-hover:rotate-180 flex items-center justify-center">
              <img src="/logo.png" alt="BharatVerse Logo" className="h-9 w-auto rounded-md shadow-sm" />
            </div>
            <span className="text-lg font-medium text-white tracking-wide">BharatVerse</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
          </div>



          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                      <Shield className="h-4 w-4 mr-1" /> Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full font-medium">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full px-5 font-semibold transition-colors">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle and Cart */}
          <div className="flex items-center gap-1 md:hidden">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <button
              className="text-gray-300 hover:text-white transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 rounded-2xl bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="py-3 px-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex flex-col gap-2">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMobileOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 rounded-xl">
                          <Shield className="h-4 w-4 mr-2" /> Admin
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 rounded-xl" onClick={() => { handleSignOut(); setMobileOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5 rounded-xl">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-xl font-semibold">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
