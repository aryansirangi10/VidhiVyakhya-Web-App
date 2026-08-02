import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Scale, Sparkles, Calculator, LayoutDashboard, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

const navigation = [
  {
    label: "Bills Explorer",
    href: "/bills",
    icon: <FileText size={16} />,
  },
  {
    label: "Impact Calculator",
    href: "/calculator",
    icon: <Calculator size={16} />,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  {
    label: "AI Assistant",
    href: "/assistant",
    icon: <Sparkles size={16} />,
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md">
            <Scale size={20} />
          </div>

          <div>
            <h2 className="text-base font-extrabold text-slate-900 leading-none">
              VidhiVyakhya <span className="text-[10px] font-mono text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">v2.0</span>
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Law, Decoded Personally
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 transition hover:text-brand-700 font-mono"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            size="sm"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Button */}
        <button
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="space-y-1 p-6">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-slate-700 hover:bg-slate-100 font-semibold text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="mt-6 flex flex-col gap-2">
                <Button variant="outline" onClick={() => { setMobileOpen(false); navigate("/login"); }}>
                  Login
                </Button>

                <Button onClick={() => { setMobileOpen(false); navigate("/register"); }}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
