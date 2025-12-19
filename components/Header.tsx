import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";

interface HeaderProps {
  onNavigate?: (view: 'landing' | 'dashboard') => void;
  currentView?: 'landing' | 'dashboard';
}

export function Header({ onNavigate, currentView = 'landing' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Gym & Fitness", href: "#services" },
    { label: "Tennis & Swim", href: "#services" },
    { label: "Classes", href: "#services" },
    { label: "Beauty", href: "#services" },
    { label: "Memberships", href: "#memberships" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-black/40 backdrop-blur-md"
      }`}
      style={{ height: "80px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate?.('landing')}>
          <h1
            className="text-[32px] m-0 font-semibold tracking-wide"
            style={{
              color: "#D4AF37",
              fontFamily: "Playfair Display",
              textShadow: "0 2px 10px rgba(212, 175, 55, 0.3)",
            }}
          >
            The Hogarth
          </h1>
          <p
            className="text-[13px] m-0 tracking-widest uppercase"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "Inter",
              letterSpacing: "0.15em",
            }}
          >
            Health Club
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {currentView === 'landing' && navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-[#D4AF37] transition-all duration-300 relative group text-[15px] font-medium"
              style={{ fontFamily: "Inter" }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, #D4AF37, #F4E4B6)",
                  boxShadow: "0 0 8px rgba(212, 175, 55, 0.6)",
                }}
              />
            </a>
          ))}
          <button
            onClick={() => onNavigate?.(currentView === 'landing' ? 'dashboard' : 'landing')}
            className="flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-all duration-300 text-[15px] font-medium"
            style={{ fontFamily: "Inter" }}
          >
            <LayoutDashboard size={20} />
            {currentView === 'landing' ? 'Dashboard' : 'Back to Site'}
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <button
            className="relative px-8 py-3 rounded-lg font-semibold text-[15px] text-black transition-all duration-300 hover:scale-105 overflow-hidden group"
            style={{
              background:
                "linear-gradient(135deg, #D4AF37, #F4E4B6)",
              fontFamily: "Inter",
              boxShadow: "0 4px 20px rgba(212, 175, 55, 0.4)",
            }}
          >
            <span className="relative z-10">Join Us</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #F4E4B6, #D4AF37)",
                animation: "shimmer 2s infinite",
              }}
            />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white/90 hover:text-[#D4AF37] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden absolute top-[80px] left-0 right-0 border-t"
          style={{
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <nav className="flex flex-col p-6 gap-2">
            {currentView === 'landing' && navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-[#D4AF37] transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ fontFamily: "Inter" }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                onNavigate?.(currentView === 'landing' ? 'dashboard' : 'landing');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
              style={{ fontFamily: "Inter" }}
            >
              <LayoutDashboard size={20} />
              {currentView === 'landing' ? 'Dashboard' : 'Back to Site'}
            </button>
            <button
              className="mt-4 px-6 py-3 rounded-lg font-semibold text-black transition-all"
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37, #F4E4B6)",
                fontFamily: "Inter",
              }}
            >
              Join Us
            </button>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </header>
  );
}