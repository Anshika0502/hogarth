import { useState } from "react";
import { ArrowLeft, CheckCircle2, Calendar, Clock, Mail, Lock, Sparkles, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useReservations } from "../contexts/ReservationContext";

interface ServiceBookingPageProps {
  serviceType: "reformer-pilates" | "gym-fitness" | "tennis-swim" | "beauty-spa";
  onBack: () => void;
}

const serviceData = {
  "reformer-pilates": {
    title: "Reformer Pilates",
    subtitle: "Transform Your Core Strength",
    image1: "https://images.unsplash.com/photo-1754258166816-0075fe0132ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZvcm1lciUyMHBpbGF0ZXMlMjBzdHVkaW98ZW58MXx8fHwxNzY1NjE2ODMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Experience the power of precision-led Reformer Pilates in our state-of-the-art studio. Our expert instructors guide you through controlled movements that build core strength, improve flexibility, and enhance overall body alignment. Perfect for all fitness levels, from beginners to advanced practitioners.",
    features: [
      "Small group classes with personalized attention",
      "Premium Balanced Body® Reformers",
      "Expert-certified instructors",
      "Progressive programming for all levels",
      "Focus on core strength and flexibility"
    ],
    bookingService: "Reformer Pilates",
    image2: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?fit=crop&w=1080&q=80",
    image3: "https://images.unsplash.com/photo-1576678927484-cc907957088c?fit=crop&w=1080&q=80",
    image4: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?fit=crop&w=1080&q=80",
    cardHighlights: [
    "Precision Core Control",
    "Elite Reformer Training",
    "Posture & Flexibility"
  ],
  },
  "gym-fitness": {
    title: "Gym & Fitness",
    subtitle: "Personalized Fitness Journey",
    image1: "https://images.unsplash.com/photo-1632077804406-188472f1a810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBlcXVpcG1lbnQlMjBmaXRuZXNzfGVufDF8fHx8MTc2NTYxODQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Achieve your fitness goals with our premium gym facility and expert personal training. New members receive 5 complimentary PT sessions in their first month to create a tailored program designed around your unique goals. Train with cutting-edge equipment and dedicated trainers who are invested in your success.",
    features: [
      "5 free PT sessions for new members",
      "State-of-the-art gym equipment",
      "Customized training programs",
      "Certified personal trainers",
      "Goal-oriented progress tracking"
    ],
    bookingService: "Personal Training",
    image2: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fit=crop&w=1080&q=80",
    image3: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?fit=crop&w=1080&q=80",
    image4: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?fit=crop&w=1080&q=80",
    cardHighlights: [
    "5 Free PT Sessions",
    "Advanced Gym Equipment",
    "Goal Driven Progress"
  ],
  },
  "tennis-swim": {
    title: "Tennis & Swim",
    subtitle: "Elite Athletic Training",
    image1: "https://images.unsplash.com/photo-1656935450737-ed3e35914121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjB0ZW5uaXN8ZW58MXx8fHwxNzY1NjE4NDgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Master your game on our professional tennis courts or swim laps in our pristine heated indoor pool. Whether you're looking to improve your technique, train for competition, or simply enjoy recreational activity, our world-class facilities and expert coaching staff provide the perfect environment.",
    features: [
      "Professional outdoor tennis courts",
      "Heated indoor swimming pool",
      "Expert coaching available",
      "Private and group lessons",
      "Competition-ready facilities"
    ],
    bookingService: "Tennis Lesson",
    image2: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?fit=crop&w=1080&q=80",
    image3: "https://images.unsplash.com/photo-1600965962102-9d260a71890d?fit=crop&w=1080&q=80",
    image4: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?fit=crop&w=1080&q=80",
    cardHighlights: [
    "Professional Courts",
    "Heated Indoor Pool",
    "Elite Coaching"
  ],
  },
  "beauty-spa": {
    title: "Beauty & Spa",
    subtitle: "Luxury Wellness Retreat",
    image1: "https://images.unsplash.com/photo-1693004926638-d2e47d705229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBiZWF1dHl8ZW58MXx8fHwxNzY1NjE4NDgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Indulge in our comprehensive spa and beauty services designed for total relaxation and rejuvenation. From therapeutic massages to advanced skincare treatments, our luxury spa provides a sanctuary where you can escape, unwind, and emerge refreshed. Experience wellness elevated to an art form.",
    features: [
      "Luxury spa treatments",
      "Professional beauty services",
      "Therapeutic massages",
      "Advanced skincare treatments",
      "Tranquil relaxation lounges"
    ],
    bookingService: "Beauty Treatment",
    image2: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?fit=crop&w=1080&q=80",
    image3: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?fit=crop&w=1080&q=80",
    image4: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?fit=crop&w=1080&q=80",
    cardHighlights: [
    "Luxury Spa Rituals",
    "Advanced Skin Therapy",
    "Total Relaxation"
  ],
  }
};

export function ServiceBookingPage({ serviceType, onBack }: ServiceBookingPageProps) {
  const service = serviceData[serviceType];
  const { addReservation } = useReservations();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: service.bookingService,
    date: "",
    time: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const times = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM"
  ];
  if (!service) return null;
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReservation(formData);
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: service.bookingService,
      date: "",
      time: "",
    });
    setTimeout(() => {
      setIsSubmitted(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]  w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src={service.image1}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0a0a0a]" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a]/80 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-[10px] md:text-[12px] font-medium tracking-widest uppercase">
              Premium Experience
            </span>
          </div>
          
          <h1 
            className="text-white mb-2 text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-bold tracking-tight leading-tight px-2 pt-5"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {service.title}
          </h1>
          
          <p className="text-white/80 text-[14px] sm:text-[18px] md:text-[22px] font-light max-w-2xl mx-auto pt-5">
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-20 ">
        
        {/* Description & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-20 pt-20">
          <div className="space-y-4">
            <h2 className="text-white text-[28px] md:text-[36px] font-bold">About This Service</h2>
            <p className="text-gray-400 text-[16px] md:text-[18px] leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-white text-[28px] md:text-[36px] font-bold">What's Included</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Experience Cards Section */}
        <div className="text-center mb-12 pt-20">
          <h2 className="text-[#D4AF37] text-[32px] md:text-[52px] font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            The Company Experience
          </h2>
          <div className="h-1 w-24 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* Responsive Arched Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 items-center pt-10">
          {/* CARD 1 */}
          <div className="mx-auto border-t border-[#D4AF37] p-1.5 rounded-t-full w-full max-w-[280px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border-t-4 border-[#D4AF37]">
              <img src={service.image2} className="absolute inset-0 w-full h-full object-cover" alt="Experience 1" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-[#0a0a0a]" />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <span className="text-[#D4AF37] text-[32px] font-bold leading-tight uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {service.cardHighlights[0]}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2 - Inverted Arch */}
          <div className="mx-auto border-b border-[#D4AF37] p-1.5 rounded-b-full w-full max-w-[280px] sm:translate-y-8 lg:translate-y-12">
            <div className="relative aspect-[3/4] overflow-hidden rounded-b-full border-b-4 border-[#D4AF37]">
              <img src={service.image3} className="absolute inset-0 w-full h-full object-cover" alt="Experience 2" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/40 to-[#0a0a0a]" />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <span className="text-[#D4AF37] text-[32px] font-bold leading-tight uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {service.cardHighlights[1]}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="mx-auto border-t border-[#D4AF37] p-1.5 rounded-t-full w-full max-w-[280px] sm:col-span-2 lg:col-span-1">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border-t-4 border-[#D4AF37]">
              <img src={service.image4} className="absolute inset-0 w-full h-full object-cover" alt="Experience 3" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-[#0a0a0a]" />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <span className="text-[#D4AF37] text-[32px] font-bold leading-tight uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {service.cardHighlights[2]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="mt-72">
        <div id="booking-form" className="bg-[#1a1a1a] rounded-2xl p-2 sm:p-10 md:p-16 border border-[#2a2a2a] relative overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/20 mt-20">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-white mb-2 text-[28px] md:text-[42px] font-bold">Book Your Session</h2>
              <p className="text-gray-400">Complete the form below to secure your premium experience.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2 md:mb-3 text-[14px] md:text-[15px] font-medium">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a] text-[15px] md:text-base"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2 md:mb-3 text-[14px] md:text-[15px] font-medium">
                Email Address *
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-500 md:size-5" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="peer w-full pl-12 md:pl-14 pr-4 md:pr-5 py-3 md:py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a] text-[15px] md:text-base"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-gray-300 mb-2 md:mb-3 text-[14px] md:text-[15px] font-medium">
                Phone Number *
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-500 md:size-5" />
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="peer w-full pl-12 md:pl-14 pr-4 md:pr-5 py-3 md:py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a] text-[15px] md:text-base"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Service (pre-filled, read-only) */}
            <div>
              <label htmlFor="service" className="block text-gray-300 mb-2 md:mb-3 text-[14px] md:text-[15px] font-medium">
                Selected Service
              </label>
              <input
                type="text"
                id="service"
                value={formData.service}
                readOnly
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-[#0a0a0a] border-2 border-[#D4AF37]/30 rounded-xl text-[#D4AF37] cursor-not-allowed text-[15px] md:text-base"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="date" className="block text-gray-300 mb-2 md:mb-3 text-[14px] md:text-[15px] font-medium">
                  Preferred Date *
                </label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10 md:size-5" />
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-3 md:py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a] [color-scheme:dark] text-[15px] md:text-base"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-gray-300 mb-2 md:mb-3 text-[14px] md:text-[15px] font-medium">
                  Preferred Time *
                </label>
                <div className="relative">
                  <Clock size={18} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10 md:size-5" />
                  <select
                    id="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-3 md:py-4 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition-all duration-300 hover:border-[#3a3a3a] appearance-none cursor-pointer text-[15px] md:text-base"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23D4AF37' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1.25rem center",
                    }}
                  >
                    <option value="" className="bg-[#1a1a1a]">Select time...</option>
                    {times.map((time) => (
                      <option key={time} value={time} className="bg-[#1a1a1a] text-white">
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
              disabled={!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time}
              className="w-full py-4 md:py-5 rounded-xl bg-[#D4AF37] text-[#0a0a0a] text-[16px] md:text-[18px] font-bold transition-all duration-300 hover:bg-[#f0c44a] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2 md:gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4AF37] disabled:hover:shadow-none disabled:hover:scale-100"
            >
              <CheckCircle2 size={20} className="group-hover:rotate-12 transition-transform duration-300 md:size-6" />
              Confirm Reservation
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-4 md:pt-6 text-gray-400 text-[12px] md:text-[14px]">
              <div className="flex items-center gap-1.5 md:gap-2 hover:text-[#D4AF37] transition-colors duration-300">
                <Lock size={14} className="md:size-4" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 hover:text-[#D4AF37] transition-colors duration-300">
                <CheckCircle2 size={14} className="md:size-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 hover:text-[#D4AF37] transition-colors duration-300">
                <CheckCircle2 size={14} className="md:size-4" />
                <span>No Commitment</span>
              </div>
            </div>
          </form>
          </div>
          </div>
          </div>
      </section>
    </div>
  );
}

// Reusable Label wrapper for cleaner code
function FormGroup({ label, id, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-gray-400 text-sm font-medium ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}