import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// Assuming ImageWithFallback is in the same directory or adjust path
// import { ImageWithFallback } from "./figma/ImageWithFallback"; 

const scrollToBooking = () => {
  const bookingSection = document.querySelector('#booking-section');
  bookingSection?.scrollIntoView({ behavior: 'smooth' });
};

const heroImages = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=100&fm=jpg",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=100&fm=jpg",
  "https://images.unsplash.com/photo-1571388072750-31a921b3d900?auto=format&fit=crop&w=1920&q=100&fm=jpg",
  "https://images.unsplash.com/photo-1734668486909-4637ecd66408?auto=format&fit=crop&w=1920&q=100&fm=jpg",
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % heroImages.length),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  const titleWords = ["STRONGER", "EVERYDAY,", "FITTER", "FOREVER"];

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background carousel */}
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`
              absolute inset-0 transition-opacity duration-[2000ms] ease-out
              ${index === activeIndex ? "opacity-100" : "opacity-0"}
            `}
          >
            <img
              src={src}
              alt="Gym training and fitness"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/90 lg:bg-gradient-to-r" />
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-6 sm:px-10 lg:px-12 flex flex-col items-center lg:items-start text-center lg:text-left pt-20 pb-12 lg:pt-0">
        
        {/* Main Title Typography */}
        <div className="flex flex-col mb-6 md:mb-8">
          {titleWords.map((word, index) => {
            const isFilled = index % 2 === 0;
            return (
              <span
                key={word}
                className={`
                  block font-bold uppercase tracking-[0.05em] sm:tracking-[0.1em] lg:tracking-[0.15em]
                  text-[12vw] sm:text-[10vw] md:text-7xl lg:text-8xl xl:text-9xl
                  leading-[0.85] sm:leading-[0.9]
                  ${isFilled ? "text-white" : "text-transparent stroke-text"}
                `}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Subtitle */}
        <p className="text-slate-200/90 max-w-md md:max-w-lg lg:max-w-xl text-sm sm:text-base md:text-lg lg:text-xl mb-10 lg:mb-12 font-light leading-relaxed">
          High-performance training, expert coaching, and
          recovery under one roof so you can feel stronger, move
          better, and stay consistent for life.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
          <button
            onClick={scrollToBooking}
            className="
              h-14 lg:h-16 px-8 lg:px-10 rounded-full inline-flex items-center justify-center gap-3
              text-base lg:text-lg font-bold uppercase tracking-wider
              transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-gold/20
              group w-full sm:w-auto text-slate-950
            "
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F4E4B6)",
            }}
          >
            <span>Start Training</span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            className="
              h-14 lg:h-16 px-8 lg:px-10 rounded-full inline-flex items-center justify-center
              text-slate-50 text-base font-medium border border-slate-100/30 bg-white/5
              backdrop-blur-lg hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto
            "
          >
            Explore Memberships
          </button>
        </div>
      </div>

      {/* Mobile-friendly Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-1 opacity-50 sm:opacity-100">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white hidden sm:block">Scroll</span>
        <ChevronDown size={30} className="text-white" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        .stroke-text {
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: rgba(255, 255, 255, 0.8);
        }
        
        @media (min-width: 768px) {
          .stroke-text {
            -webkit-text-stroke-width: 2px;
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}