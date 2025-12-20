import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export function FloatingBookButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past the hero section
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.querySelector('#booking-section');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToBooking}
      className="fixed bottom-8 right-8 z-40 flex items-center gap-3 px-6 py-4 rounded-full text-white shadow-2xl transition-all hover:scale-105 animate-pulse-subtle bg-gradient-to-r from-[#D4AF37] to-[#F4E4B6]"
      style={{ backgroundColor: 'var(--color-gold)' }}
      aria-label="Book now"
    >
      <Calendar size={24} />
      <span className="hidden md:inline text-black">Book Now</span>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 20px 25px -5px rgba(212, 175, 55, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 25px 30px -5px rgba(212, 175, 55, 0.6);
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
}
