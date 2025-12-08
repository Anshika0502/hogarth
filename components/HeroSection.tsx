import { ChevronDown, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useState } from "react";

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
      () =>
        setActiveIndex(
          (prev) => (prev + 1) % heroImages.length,
        ),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  const titleWords = [
    "STRONGER",
    "EVERYDAY,",
    "FITTER",
    "FOREVER",
  ];

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950"
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
            <ImageWithFallback
              src={src}
              alt="Gym training and fitness"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/70 to-slate-900/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 xl:px-8 flex flex-col items-start">
        {/* Title */}
        <div className="space-y-0 mb-6 mt-10">
          {titleWords.map((word, index) => {
            const isFilled = index % 2 === 0;
            return (
              <span
                key={word}
                className={`
                  block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.15em]
                  leading-[0.9] uppercase
                  ${isFilled ? "text-white" : "text-transparent"}
                  ${isFilled ? "" : "stroke-text"}
                `}
                style={{
                  fontFamily:
                    "'Bebas Neue', 'Teko', sans-serif",
                }}
              >
                <span
                  className={`
                    inline-block
                    ${isFilled ? "" : "stroke-text-inner"}
                  `}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </div>

        {/* Subtitle */}
        <p className="text-slate-100/80 max-w-xl text-base sm:text-lg lg:text-xl mb-10 font-light">
          High-performance training, expert coaching, and
          recovery under one roof so you can feel stronger, move
          better, and stay consistent for life.
        </p>

        {/* CTAs */}
        <div className="flex flex-row gap-4 items-center">
          <button
            className="
              h-14 px-8 rounded-full inline-flex items-center gap-2
              text-white text-sm sm:text-base font-semibold
              border-2 transition-all
              hover:scale-105 hover:shadow-2xl
              group
            "
            style={{
              backgroundColor: "var(--color-emerald)",
              borderColor: "var(--color-gold)",
            }}
          >
            <span>Book Your Free Session</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button
            className="
              h-14 px-8 rounded-full inline-flex items-center justify-center
              text-slate-50 text-sm sm:text-base font-medium
              border border-slate-100/50 bg-white/5
              backdrop-blur-md
              hover:bg-white/10 hover:border-white
              transition-all
            "
          >
            Explore Memberships
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={40} className="text-white" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Teko:wght@600;700&display=swap');
        
        .stroke-text {
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: rgba(255, 255, 255, 0.9);
        }
        .stroke-text-inner {
          color: transparent;
        }
        @media (min-width: 1024px) {
          .stroke-text {
            -webkit-text-stroke-width: 2.5px;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  );
}