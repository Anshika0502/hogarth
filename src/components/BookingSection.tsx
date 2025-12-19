import { useState } from "react";
import {
  Calendar,
  Clock,
  Mail,
  CheckCircle2,
  Lock,
  Sparkles,
  Phone,
} from "lucide-react";
import { useReservations } from "../contexts/ReservationContext";

export function BookingSection() {
  const { addReservation } = useReservations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    "Reformer Pilates",
    "HIIT Class",
    "Personal Training",
    "Yoga Class",
    "Tennis Lesson",
    "Swim Session",
    "Beauty Treatment",
    "Facility Tour",
  ];

  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ];

  const isFormComplete =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.service &&
    formData.date &&
    formData.time;
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Submitted:", JSON.stringify(formData, null, 2));
    if (!isFormComplete) return;
    setIsLoading(true);
    setTimeout(() => {
      addReservation(formData);
      setIsSubmitted(true);
      setIsLoading(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };
  
    

  return (
    <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a] opacity-50" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-[14px] font-medium tracking-wide uppercase">
              Limited Time Offer
            </span>
          </div>
          <h2 className="text-white mb-6 text-[42px] font-bold leading-tight">
            Reserve Your Exclusive Session
          </h2>
          <p className="text-gray-300 text-[20px] max-w-[600px] mx-auto">
            First session complimentary for new members.
            Experience luxury wellness today.
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#2a2a2a] backdrop-blur-xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-500">
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {isSubmitted ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D4AF37]/10 rounded-full mb-6 animate-scale-in">
                  <CheckCircle2
                    size={48}
                    className="text-[#D4AF37]"
                  />
                </div>
                <h3 className="text-white mb-4 text-[32px] font-bold">
                  Booking Confirmed
                </h3>
                <p className="text-gray-400 text-[18px] mb-8 max-w-[500px] mx-auto leading-relaxed">
                  Your confirmation has been sent via email. We
                  look forward to welcoming you to our premium
                  facility.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-10 py-4 rounded-xl text-[#0a0a0a] bg-[#D4AF37] font-semibold text-[16px] hover:bg-[#f0c44a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105"
                >
                  Schedule Another Session
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Name */}
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  <label
                    htmlFor="name"
                    className="block text-gray-300 mb-3 text-[15px] font-medium"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-5 py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a]"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <label
                    htmlFor="email"
                    className="block text-gray-300 mb-3 text-[15px] font-medium"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 peer-focus:text-[#D4AF37]"
                    />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="peer w-full pl-14 pr-5 py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a]"
                      placeholder="you@example.com"
                    />
                  </div>
                  </div>
                  {/* Phone Number */}
<div className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
  <label htmlFor="phone" className="block text-gray-300 mb-3 text-[15px] font-medium">
    Phone Number *
  </label>
  <div className="relative">
    <Phone size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      type="tel"
      id="phone"
      required
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      className="peer w-full pl-14 pr-5 py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a]
                 rounded-xl text-white placeholder-gray-600 focus:outline-none 
                 focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a]"
      placeholder="Enter your phone number"
    />
  </div>
</div>


                {/* Service Selection */}
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  <label
                    htmlFor="service"
                    className="block text-gray-300 mb-3 text-[15px] font-medium"
                  >
                    Select Service *
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service: e.target.value,
                      })
                    }
                    className="w-full px-5 py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a] appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23D4AF37' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition:
                        "right 1.25rem center",
                    }}
                  >
                    <option value="" className="bg-[#1a1a1a]">
                      Choose your service...
                    </option>
                    {services.map((service) => (
                      <option
                        key={service}
                        value={service}
                        className="bg-[#1a1a1a] text-white py-2"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-gray-300 mb-3 text-[15px] font-medium"
                    >
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10"
                      />
                      <input
                        type="date"
                        id="date"
                        required
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date: e.target.value,
                          })
                        }
                        className="w-full pl-14 pr-5 py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a] [color-scheme:dark]"
                        min={
                          new Date().toISOString().split("T")[0]
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-gray-300 mb-3 text-[15px] font-medium"
                    >
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <Clock
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10"
                      />
                      <select
                        id="time"
                        required
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            time: e.target.value,
                          })
                        }
                        className="w-full pl-14 pr-5 py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a] appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23D4AF37' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition:
                            "right 1.25rem center",
                        }}
                      >
                        <option
                          value=""
                          className="bg-[#1a1a1a]"
                        >
                          Select time...
                        </option>
                        {times.map((time) => (
                          <option
                            key={time}
                            value={time}
                            className="bg-[#1a1a1a] text-white"
                          >
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                type="submit"
                disabled={!isFormComplete || isLoading}
                className={`w-full py-5 rounded-xl text-[18px] font-bold flex items-center justify-center gap-3 transition-all
                  ${
                    !isFormComplete || isLoading
                      ? "bg-[#D4AF37]/40 cursor-not-allowed"
                      : "bg-[#D4AF37] hover:bg-[#f0c44a]"
                  }`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle2 size={24} />
                    Confirm Reservation
                  </>
                )}
              </button>

               

                {/* Trust Badges */}
                <div
                  className="flex flex-wrap items-center justify-center gap-8 pt-6 text-gray-400 text-[14px] animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-300">
                    <Lock size={16} />
                    <span>Secure Booking</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-300">
                    <CheckCircle2 size={16} />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-300">
                    <CheckCircle2 size={16} />
                    <span>No Commitment Required</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Urgency Message */}
        <div
          className="text-center mt-10 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="inline-flex items-center gap-3 bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-full px-8 py-4 hover:border-[#D4AF37]/50 transition-all duration-300">
            <span className="text-[20px]">⚡</span>
            <p className="text-gray-300 text-[16px] font-medium">
              Only{" "}
              <span className="text-[#D4AF37] font-bold">
                3 exclusive sessions
              </span>{" "}
              remaining this week
            </p>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}