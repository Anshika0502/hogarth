import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  currentView: "landing" | "dashboard" | "service-booking";
  activeNav: string | null;
  onNavigate: (view: "landing" | "dashboard") => void;
  onServiceSelect: (service: any) => void;
  onMembershipClick: () => void;
  onJoinUsClick: () => void;
}

export function Header({
  currentView,
  activeNav,
  onNavigate,
  onServiceSelect,
  onMembershipClick,
  onJoinUsClick,
}: HeaderProps) {
  const isDashboard = currentView === "dashboard";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-[88px] md:h-[80px] flex items-center justify-between">

        {/* LEFT LOGO */}
        <div
          className="cursor-pointer"
          onClick={() => {
            onNavigate("landing");
            setMobileOpen(false);
          }}
        >
          <h1 className="text-[28px] md:text-[32px] tracking-wide text-[#D4AF37] font-[Playfair Display] leading-none">
            The Hogarth
          </h1>
          <p className="text-[12px] md:text-[13px] tracking-widest uppercase text-white/70 mt-1">
            Health Club
          </p>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {isDashboard ? (
            <button
              onClick={() => onNavigate("landing")}
              className="text-[#D4AF37] font-medium border px-4 py-2 border-[#D4AF37] rounded-lg"
            >
              Back to Site
            </button>
          ) : (
            <>
              <NavItem label="Home" active={activeNav === "home"} onClick={() => onNavigate("landing")} />
              <NavItem label="Reformer Pilates" active={activeNav === "reformer-pilates"} onClick={() => onServiceSelect("reformer-pilates")} />
              <NavItem label="Gym & Fitness" active={activeNav === "gym-fitness"} onClick={() => onServiceSelect("gym-fitness")} />
              <NavItem label="Tennis & Swim" active={activeNav === "tennis-swim"} onClick={() => onServiceSelect("tennis-swim")} />
              <NavItem label="Beauty & Spa" active={activeNav === "beauty-spa"} onClick={() => onServiceSelect("beauty-spa")} />
              <NavItem label="Memberships" active={activeNav === "membership"} onClick={onMembershipClick} />
              <NavItem label="Dashboard" active={false} onClick={() => onNavigate("dashboard")} />
            </>
          )}
        </nav>

        {/* DESKTOP CTA */}
        {!isDashboard && (
          <button
            onClick={onJoinUsClick}
            className="hidden md:block px-8 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F4E4B6] text-black font-semibold"
          >
            Join Us
          </button>
        )}

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-[#D4AF37]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && !isDashboard && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-6 space-y-4">
          <MobileNav label="Home" onClick={() => onNavigate("landing")} />
          <MobileNav label="Reformer Pilates" onClick={() => onServiceSelect("reformer-pilates")} />
          <MobileNav label="Gym & Fitness" onClick={() => onServiceSelect("gym-fitness")} />
          <MobileNav label="Tennis & Swim" onClick={() => onServiceSelect("tennis-swim")} />
          <MobileNav label="Beauty & Spa" onClick={() => onServiceSelect("beauty-spa")} />
          <MobileNav label="Memberships" onClick={onMembershipClick} />
          <MobileNav label="Dashboard" onClick={() => onNavigate("dashboard")} />

          <button
            onClick={onJoinUsClick}
            className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F4E4B6] text-black font-semibold"
          >
            Join Us
          </button>
        </div>
      )}
    </header>
  );
}

/* Desktop Nav Item */
function NavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative transition ${
        active ? "text-[#D4AF37]" : "text-white/80 hover:text-[#D4AF37]"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-[2px] bg-[#D4AF37] transition-all ${
          active ? "w-full" : "w-0"
        }`}
      />
    </button>
  );
}

/* Mobile Nav Item */
function MobileNav({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left text-white text-6xl  tracking-wide hover:text-[#D4AF37]"
    >
      {label}
    </button>
  );
}
