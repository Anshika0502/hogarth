import { useState, useEffect } from "react";
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

  /* Lock scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  const handleMobileNav = (action: () => void) => {
    action();
    setMobileOpen(false);
  };

  return (
    // ✅ FIX: much higher z-index
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-black border-b border-white/10 font-sans">

      <div className="bg-black max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 h-[64px] sm:h-[70px] md:h-[90px] flex items-center justify-between">

        {/* LOGO */}
        <div
          className="cursor-pointer group flex flex-col"
          onClick={() => {
            onNavigate("landing");
            setMobileOpen(false);
          }}
        >
          <h1 className="text-[20px] sm:text-[22px] md:text-[26px] lg:text-[32px] tracking-wide text-[#D4AF37] font-serif leading-none">
            The Company
          </h1>
          <p className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/50 mt-1">
            Health Club
          </p>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-9 bg-black">
          {isDashboard ? (
            <button
              onClick={() => onNavigate("landing")}
              className="absolute right-4 text-[#D4AF37] font-medium border px-5 py-2 border-[#D4AF37]/50 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all mr-4rem"
            >
              Back to Site
            </button>
          ) : (
            <>
              <NavItem  label="Home" active={activeNav === "home"} onClick={() => onNavigate("landing")} />
              <NavItem label="Reformer Pilates" active={activeNav === "reformer-pilates"} onClick={() => onServiceSelect("reformer-pilates")} />
              <NavItem label="Gym & Fitness" active={activeNav === "gym-fitness"} onClick={() => onServiceSelect("gym-fitness")} />
              <NavItem label="Tennis & Swim" active={activeNav === "tennis-swim"} onClick={() => onServiceSelect("tennis-swim")} />
              <NavItem label="Beauty & Spa" active={activeNav === "beauty-spa"} onClick={() => onServiceSelect("beauty-spa")} />
              <NavItem label="Memberships" active={activeNav === "membership"} onClick={onMembershipClick} />
              <NavItem label="Dashboard" active={false} onClick={() => onNavigate("dashboard")} />
            </>
          )}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 sm:gap-4">
          {!isDashboard && (
            <button
              onClick={onJoinUsClick}
              className="hidden md:block px-5 lg:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4E4B6] text-black text-sm font-bold tracking-wider font-serif hover:scale-105 transition-all"
            >
              Join Us
            </button>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className="xl:hidden p-2 text-[#D4AF37] hover:bg-white/5 rounded-full transition "
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ✅ FIXED MOBILE MENU */}
      <div
  className={`fixed left-0 right-0 bottom-0
  top-[64px] sm:top-[70px] md:top-[90px]
  bg-black bg-opacity-100
  z-[9998] xl:hidden transition-transform duration-500
  ${mobileOpen ? "translate-x-0" : "translate-x-full"}
  `}
>
        {/* ✅ FIX: force scroll */}
      <div
  className="
    flex flex-col
    px-6 sm:px-10 py-6
    overflow-y-auto overscroll-contain touch-pan-y
    h-[calc(100vh-64px)]
    sm:h-[calc(100vh-70px)]
    md:h-[calc(100vh-90px)]
  "
>
          <div className="flex flex-col gap-6 font-serif">
            <MobileNav label="Home" onClick={() => handleMobileNav(() => onNavigate("landing"))} />
            <MobileNav label="Reformer Pilates" onClick={() => handleMobileNav(() => onServiceSelect("reformer-pilates"))} />
            <MobileNav label="Gym & Fitness" onClick={() => handleMobileNav(() => onServiceSelect("gym-fitness"))} />
            <MobileNav label="Tennis & Swim" onClick={() => handleMobileNav(() => onServiceSelect("tennis-swim"))} />
            <MobileNav label="Beauty & Spa" onClick={() => handleMobileNav(() => onServiceSelect("beauty-spa"))} />
            <MobileNav label="Memberships" onClick={() => handleMobileNav(onMembershipClick)} />
            <MobileNav label="Dashboard" onClick={() => handleMobileNav(() => onNavigate("dashboard"))} />
          </div>

          {/* ✅ FIX: safe bottom spacing */}
          <div className="mt-auto pt-8 pb-28">
            <button
              onClick={() => handleMobileNav(onJoinUsClick)}
              className="w-full py-4 sm:py-5 rounded-2xl bg-[#D4AF37] text-black text-lg sm:text-xl font-bold uppercase tracking-widest"
            >
              Join Us Now
            </button>
            <p className="text-center text-white/30 text-xs sm:text-sm mt-6 uppercase tracking-[0.25em]">
              The Company Health Club
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* DESKTOP NAV ITEM */
function NavItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-[15px] font-medium tracking-wide ${
        active ? "text-[#D4AF37]" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
      <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#D4AF37] transition-all ${active ? "w-full" : "w-0"}`} />
    </button>
  );
}

/* MOBILE NAV ITEM */
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
      className="
        block w-full text-left
        text-white
        text-xl sm:text-2xl md:text-3xl
        font-serif tracking-tight
        hover:text-[#D4AF37]
        transition-colors
        border-b border-white/10
        py-4
        font-serif
      "
    >
      {label}
    </button>
  );
}

