import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Memberships", href: "#memberships" },
    { label: "Classes", href: "#services" },
    { label: "Contact", href: "#footer" },
    { label: "Privacy Policy", href: "#" },
  ];

  return (
    <footer
      id="footer"
      className="bg-[#0a0a0a] text-white relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] opacity-50" />

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 py-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Logo & Tagline */}
          <div className="animate-fade-in">
            <h3
              className="text-[36px] mb-3 font-bold tracking-wide"
              style={{
                color: "#D4AF37",
                fontFamily: "Playfair Display, serif",
              }}
            >
              The Hogarth
            </h3>
            <p className="text-[#D4AF37]/80 text-[18px] mb-6 font-light tracking-wider">
              Health Club
            </p>
            <p className="text-gray-400 text-[16px] leading-relaxed max-w-[280px]">
              Your personal wellness destination in the heart of
              Chiswick, West London.
            </p>

            {/* Decorative line */}
            <div className="mt-8 w-20 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
          </div>

          {/* Quick Links */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h4 className="text-[20px] mb-8 font-semibold text-[#D4AF37] tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 inline-flex items-center gap-2 group text-[15px]"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-2 group-hover:ml-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h4 className="text-[20px] mb-8 font-semibold text-[#D4AF37] tracking-wide">
              Get In Touch
            </h4>
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4 group">
                <MapPin
                  size={20}
                  className="mt-1 flex-shrink-0 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors duration-300"
                />
                <div>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    The Hogarth Health Club
                  </p>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Chiswick, West London
                  </p>
                </div>
              </div>

              <a
                href="tel:02089940500"
                className="flex items-center gap-4 text-gray-400 hover:text-[#D4AF37] transition-all duration-300 group"
              >
                <Phone
                  size={20}
                  className="flex-shrink-0 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors duration-300"
                />
                <span className="group-hover:tracking-wide transition-all duration-300">
                  020 8994 0500
                </span>
              </a>

              <a
                href="mailto:info@hogarthhealthclub.com"
                className="flex items-center gap-4 text-gray-400 hover:text-[#D4AF37] transition-all duration-300 group"
              >
                <Mail
                  size={20}
                  className="flex-shrink-0 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors duration-300"
                />
                <span className="group-hover:tracking-wide transition-all duration-300 break-all">
                  info@hogarthhealthclub.com
                </span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 group hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram
                  size={22}
                  className="text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors duration-300"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 group hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook
                  size={22}
                  className="text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="text-center py-12 border-t border-[#2a2a2a] mb-12 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-gray-400 text-[16px] mb-6 max-w-[600px] mx-auto">
            Experience luxury wellness firsthand. Schedule your
            exclusive facility tour today.
          </p>
          <button className="group relative px-12 py-5 bg-[#D4AF37] text-[#0a0a0a] rounded-xl text-[18px] font-bold transition-all duration-300 hover:bg-[#f0c44a] hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] inline-flex items-center gap-3 overflow-hidden">
            <span className="relative z-10">
              Arrange a Personal Tour
            </span>
            <ArrowRight
              size={20}
              className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
            />

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t border-[#2a2a2a] animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-[14px]">
              © 2025 The Hogarth Health Club. All rights
              reserved.
            </p>

            <div className="flex items-center gap-6 text-[14px]">
              <a
                href="#"
                className="text-gray-500 hover:text-[#D4AF37] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <span className="text-gray-700">|</span>
              <a
                href="#"
                className="text-gray-500 hover:text-[#D4AF37] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span className="text-gray-700">|</span>
              <a
                href="#"
                className="text-gray-500 hover:text-[#D4AF37] transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
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
    </footer>
  );
}