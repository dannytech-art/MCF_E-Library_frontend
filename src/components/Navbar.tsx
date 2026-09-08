import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    showToast('success', 'Logged out successfully');
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-xl text-slate-900"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center text-white shadow-lg">
            <BookOpen size={22} />
          </div>

          <div>
            <h2 className="font-extrabold text-slate-900">MCF</h2>
            <p className="text-xs text-gray-500 -mt-1">
              E-Library
            </p>
          </div>
        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-red-600"
                    : "text-slate-700 hover:text-red-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Buttons */}

        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  className="font-semibold text-slate-700 hover:text-red-600"
                >
                  <User className="mr-2 h-4 w-4" />
                  {user?.fullName?.split(' ')[0] || 'Profile'}
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="font-semibold text-slate-700 hover:text-red-600"
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
                  className="font-semibold text-slate-700 hover:text-red-600"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="rounded-full bg-gradient-to-r from-brand-red to-red-700 hover:from-red-700 hover:to-red-800 px-6 shadow-lg">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="lg:hidden bg-white shadow-xl"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {links.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="text-lg font-semibold"
                >
                  {item.name}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full"
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
                      className="w-full"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-brand-red to-red-700">
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