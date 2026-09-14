import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const links = [
  { name: "Home", path: "/" },
  { name: "Faculties", path: "/faculties" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    showToast("success", "Logged out successfully");
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-dark shadow-2xl py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-carton to-carton-dark flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform duration-300">
              <BookOpen size={22} />
            </div>
            <div className="absolute inset-0 rounded-xl bg-carton blur-md opacity-30 -z-10 group-hover:opacity-60 transition-opacity" />
          </div>

          <div className="flex flex-col">
            <h2 className="font-serif font-bold text-lg text-cream leading-none">
              MCF
            </h2>
            <p className="text-[10px] text-carton tracking-widest uppercase -mt-0.5">
              E-Library
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative font-medium text-sm transition-colors group ${
                  isActive
                    ? "text-carton"
                    : "text-cream/70 hover:text-carton"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-carton transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  className="text-cream/80 hover:text-carton hover:bg-carton/10 font-medium"
                >
                  <User className="mr-2 h-4 w-4" />
                  {user?.fullName?.split(" ")[0] || "Profile"}
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-cream/80 hover:text-carton hover:bg-carton/10 font-medium"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-cream/80 hover:text-carton hover:bg-carton/10 font-medium"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="rounded-full bg-carton hover:bg-carton-light text-black font-semibold px-6 shadow-lg shadow-carton/20 transition-all hover:shadow-carton/40 hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-cream p-2 hover:text-carton transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden glass-dark overflow-hidden border-t border-carton/10"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {links.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block text-lg font-medium py-2 transition-colors ${
                        isActive ? "text-carton" : "text-cream/80 hover:text-carton"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}

              <div className="h-px bg-carton/20 my-2" />

              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-carton/30 text-cream hover:bg-carton/10 hover:text-carton"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full border-carton/30 text-cream hover:bg-carton/10 hover:text-carton"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-carton/30 text-cream hover:bg-carton/10 hover:text-carton"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-carton hover:bg-carton-light text-black font-semibold">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}