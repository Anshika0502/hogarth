import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah L.",
      role: "Pilates Enthusiast",
      quote:
        "Transformed my routine—booked my first class in seconds! The Reformer Pilates sessions are absolutely incredible. I feel stronger and more flexible than ever.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      id: 2,
      name: "Michael T.",
      role: "Personal Training Member",
      quote:
        "The personal training sessions are game-changing. My trainer understood my goals immediately and created a perfect plan. Lost 15kg in 3 months!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      id: 3,
      name: "Emma R.",
      role: "Tennis & Swim Member",
      quote:
        "The facilities are pristine and the community is so welcoming. I love the outdoor tennis courts and the heated pool is perfect year-round.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    {
      id: 4,
      name: "James W.",
      role: "Fitness Classes Member",
      quote:
        "Best decision I made this year. The variety of classes keeps me motivated, and the instructors are world-class. The HIIT sessions are intense but so rewarding!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    {
      id: 5,
      name: "Lisa M.",
      role: "Full Member",
      quote:
        "An oasis in West London. From the gym to the beauty treatments, everything is top-notch. The staff genuinely care about your wellness journey.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) =>
        (prev - 1 + testimonials.length) % testimonials.length,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #1f2937 0, #020617 45%, #000000 100%)",
      }}
    >
      {/* Subtle animated gradient glow */}
      <div className="pointer-events-none absolute -top-40 -right-32 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative max-w-[1440px] mx-auto mt-7 pt-10">
        {/* Section Header */}
        <h2 className="text-center mb-4 text-3xl md:text-4xl font-semibold text-white tracking-tight">
          What Our Members Say
        </h2>
        <p className="text-center mb-12 md:mb-16 text-sm md:text-base text-gray-300/80">
          Real stories from members transforming their health
          and lifestyle.
        </p>

        {/* Carousel Container */}
        <div className="relative px-4 md:px-16">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="absolute left-0 md:-left-2 top-1/2 -translate-y-1/2 z-10 p-2.5 md:p-3 rounded-full 
                       bg-white/5 border border-amber-400/50 shadow-lg backdrop-blur-md text-amber-300 
                       hover:bg-amber-400/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft
              size={20}
              className="md:w-[22px] md:h-[22px]"
            />
          </button>
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-0 md:-right-2 top-1/2 -translate-y-1/2 z-10 p-2.5 md:p-3 rounded-full 
                       bg-white/5 border border-amber-400/50 shadow-lg backdrop-blur-md text-amber-300 
                       hover:bg-amber-400/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight
              size={20}
              className="md:w-[22px] md:h-[22px]"
            />
          </button>

          {/* Carousel Track - Smooth Horizontal Scroll */}
          <div className="overflow-hidden mx-8 md:mx-12">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2 md:px-4"
                >
                  {/* Desktop: Show 3 cards, Mobile: Show 1 card */}
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <TestimonialCard
                      testimonial={testimonial}
                    />
                    <TestimonialCard
                      testimonial={
                        testimonials[
                          (currentIndex + 1) %
                            testimonials.length
                        ]
                      }
                      className="hidden md:block"
                    />
                    <TestimonialCard
                      testimonial={
                        testimonials[
                          (currentIndex + 2) %
                            testimonials.length
                        ]
                      }
                      className="hidden md:block"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`h-2.5 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  index === currentIndex
                    ? "w-6 bg-amber-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]"
                    : "w-2.5 bg-amber-400/30 hover:bg-amber-300/70"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-200 text-base md:text-[18px] mb-4">
            Ready to become the next success story?
          </p>
          <button
            className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-3.5 rounded-full font-medium text-black
                       bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500
                       shadow-[0_0_24px_rgba(251,191,36,0.7)]
                       transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.9)]
                       hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 
                       focus:ring-amber-400/80 focus:ring-offset-2 focus:ring-offset-black"
          >
            Start Your Journey
          </button>

          <p className="mt-4 text-sm text-amber-300/80">
            Prefer to chat?{" "}
            <a
              href="#contact"
              className="text-amber-300 underline underline-offset-4 decoration-amber-400/60 
                         hover:text-amber-200 hover:decoration-amber-200 transition-colors duration-200"
            >
              Talk to our team
            </a>
          </p>
        </div>

        {/* Decorative Wave Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30, 50 50 T 100 50' stroke='%23FACC15' fill='none' stroke-width='1.5' stroke-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>
    </section>
  );
}

// Extracted Testimonial Card Component
function TestimonialCard({
  testimonial,
  className = "",
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <div
      className={`group relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 
                  shadow-xl backdrop-blur-xl overflow-hidden
                  transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl 
                  hover:bg-white/10 ${className}`}
    >
      {/* Soft gradient glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-400/10 via-transparent to-amber-500/10" />

      {/* Avatar */}
      <div className="relative flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-amber-300 shadow-lg"
          />
        </div>
        <div>
          <div className="text-white font-medium text-sm md:text-base">
            {testimonial.name}
          </div>
          <div className="text-amber-300 text-xs md:text-[13px] uppercase tracking-wide">
            {testimonial.role}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-3 md:mb-4">
        {Array.from({ length: testimonial.rating }).map(
          (_, i) => (
            <Star
              key={i}
              size={16}
              className="md:w-[18px] md:h-[18px] text-amber-300 drop-shadow-sm"
              fill="#fbbf24"
            />
          ),
        )}
      </div>

      {/* Quote */}
      <p className="text-gray-100/90 text-sm md:text-base leading-relaxed italic">
        "{testimonial.quote}"
      </p>
    </div>
  );
}
