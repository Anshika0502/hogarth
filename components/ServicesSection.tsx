import { useState } from "react";
import { Dumbbell, Users, Activity, Waves } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ServiceCard {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  fullDescription: string;
}

export function ServicesSection() {
  const [expandedCard, setExpandedCard] = useState<
    number | null
  >(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(
    null,
  );

  const services: ServiceCard[] = [
    {
      id: 1,
      title: "Reformer Pilates",
      icon: <Activity size={32} className="icon-gold" />,
      description:
        "State-of-the-art studio with expert-led classes for core strength and flexibility.",
      image:
        "https://images.unsplash.com/photo-1754257320362-5982d5cd58ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZvcm1lciUyMHBpbGF0ZXMlMjBzdHVkaW98ZW58MXx8fHwxNzY0OTEzNzMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      fullDescription:
        "Transform your body with precision-led Reformer Pilates classes in our premium studio. Perfect for all levels.",
    },
    {
      id: 2,
      title: "Fitness Classes",
      icon: <Users size={32} className="icon-gold" />,
      description:
        "Unlimited access to HIIT, yoga, and aerobics in air-conditioned studios for all levels.",
      image:
        "https://images.unsplash.com/photo-1630415187965-236477b0b659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMGZpdG5lc3MlMjBjbGFzc3xlbnwxfHx8fDE3NjQ4NjIyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      fullDescription:
        "Join our vibrant community in dynamic group classes. From high-energy HIIT to restorative yoga—find your flow.",
    },
    {
      id: 3,
      title: "Gym & Personal Training",
      icon: <Dumbbell size={32} className="icon-gold" />,
      description:
        "5 free PT sessions in month 1—tailored goals in our premium gym.",
      image:
        "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluZXIlMjBneW18ZW58MXx8fHwxNzY0OTEzNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      fullDescription:
        "Experience personalized fitness with expert trainers. Get 5 complimentary PT sessions in your first month!",
    },
    {
      id: 4,
      title: "Tennis, Swim & Beauty",
      icon: <Waves size={32} className="icon-gold" />,
      description:
        "Outdoor courts, indoor pool, and luxury treatments for total rejuvenation.",
      image:
        "https://images.unsplash.com/photo-1566241121793-3e25f3586e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMG91dGRvb3J8ZW58MXx8fHwxNzY0ODc4NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      fullDescription:
        "Play tennis under the trees, swim in our pristine pool, or indulge in luxury spa treatments.",
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="services-title">
            ELEVATE YOUR
            <span className="services-title-highlight">
              {" "}
              WELLNESS JOURNEY
            </span>
          </h2>
          <div className="services-title-underline" />
          <p className="services-subtitle">
            Transform your body, elevate your mind, unleash your
            potential
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${expandedCard === service.id ? "expanded" : ""} ${
                hoveredCard === service.id ? "hovered" : ""
              }`}
              onClick={() =>
                setExpandedCard(
                  expandedCard === service.id
                    ? null
                    : service.id,
                )
              }
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Golden Border Glow Effect */}
              <div className="card-border-glow" />

              {/* Image Container */}
              <div className="service-image-container">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                />
                <div className="image-overlay" />
                <div className="image-gradient" />
              </div>

              {/* Content */}
              <div className="service-content">
                <div className="service-header">
                  <div className="service-icon-wrapper">
                    {service.icon}
                  </div>
                  <h3 className="service-title">
                    {service.title}
                  </h3>
                </div>

                <p className="service-description">
                  {service.description}
                </p>

                {/* Expanded Content */}
                {expandedCard === service.id && (
                  <div className="service-expanded">
                    <p className="service-full-description">
                      {service.fullDescription}
                    </p>
                    <button className="service-cta-button">
                      <span>BOOK SESSION</span>
                      <span className="button-arrow">→</span>
                    </button>
                  </div>
                )}

                {/* Learn More Link */}
                {expandedCard !== service.id && (
                  <button className="service-learn-more">
                    LEARN MORE{" "}
                    <span className="learn-more-arrow">→</span>
                  </button>
                )}
              </div>

              {/* Hover Effect Lines */}
              <div className="card-corner-effect top-left" />
              <div className="card-corner-effect top-right" />
              <div className="card-corner-effect bottom-left" />
              <div className="card-corner-effect bottom-right" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Import Gym-Style Fonts */
        @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Rajdhani:wght@300;400;500;600;700&family=Bebas+Neue&display=swap");

        .services-section {
          padding: 100px 0;
          background: linear-gradient(
            135deg,
            #0a0a0a 0%,
            #1a1a1a 50%,
            #0f0f0f 100%
          );
          position: relative;
          overflow: hidden;
        }

        .services-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(212, 175, 55, 0.03) 2px,
            rgba(212, 175, 55, 0.03) 4px
          );
          pointer-events: none;
        }

        /* Section Title */
        .services-title {
          font-family: "Bebas Neue", "Oswald", sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 700;
          letter-spacing: 4px;
          color: #ffffff;
          margin: 0 0 20px 0;
          text-transform: uppercase;
          line-height: 1.1;
          animation: fadeInUp 0.8s ease-out;
        }

        .services-title-highlight {
          background: linear-gradient(
            135deg,
            #d4af37 0%,
            #f4d03f 50%,
            #d4af37 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%,
          100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.3);
          }
        }

        .services-title-underline {
          width: 120px;
          height: 4px;
          background: linear-gradient(
            90deg,
            transparent,
            #d4af37,
            transparent
          );
          margin: 0 auto 30px;
          animation: expandWidth 1s ease-out;
        }

        .services-subtitle {
          font-family: "Rajdhani", sans-serif;
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-weight: 300;
          color: #b8b8b8;
          letter-spacing: 2px;
          text-transform: uppercase;
          animation: fadeIn 1s ease-out 0.3s both;
        }

        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(280px, 1fr)
          );
          gap: 30px;
          perspective: 1000px;
        }

        /* Service Card */
        .service-card {
          background: linear-gradient(
            145deg,
            #1a1a1a 0%,
            #0d0d0d 100%
          );
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease-out backwards;
          border: 1px solid rgba(212, 175, 55, 0.1);
          transform-style: preserve-3d;
        }

        .service-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .service-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .service-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        .service-card:nth-child(4) {
          animation-delay: 0.4s;
        }

        .service-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.7),
            0 0 40px rgba(212, 175, 55, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .service-card.expanded {
          grid-column: span 1;
        }

        /* Golden Border Glow */
        .card-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 2px;
          background: linear-gradient(
            135deg,
            transparent,
            #d4af37,
            transparent
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .service-card.hovered .card-border-glow {
          opacity: 1;
          animation: rotateBorder 3s linear infinite;
        }

        @keyframes rotateBorder {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        /* Corner Effects */
        .card-corner-effect {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #d4af37;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .card-corner-effect.top-left {
          top: 10px;
          left: 10px;
          border-right: none;
          border-bottom: none;
        }

        .card-corner-effect.top-right {
          top: 10px;
          right: 10px;
          border-left: none;
          border-bottom: none;
        }

        .card-corner-effect.bottom-left {
          bottom: 10px;
          left: 10px;
          border-right: none;
          border-top: none;
        }

        .card-corner-effect.bottom-right {
          bottom: 10px;
          right: 10px;
          border-left: none;
          border-top: none;
        }

        .service-card:hover .card-corner-effect {
          opacity: 1;
        }

        .service-card:hover .card-corner-effect.top-left,
        .service-card:hover .card-corner-effect.top-right {
          top: 15px;
        }

        .service-card:hover .card-corner-effect.bottom-left,
        .service-card:hover .card-corner-effect.bottom-right {
          bottom: 15px;
        }

        .service-card:hover .card-corner-effect.top-left,
        .service-card:hover .card-corner-effect.bottom-left {
          left: 15px;
        }

        .service-card:hover .card-corner-effect.top-right,
        .service-card:hover .card-corner-effect.bottom-right {
          right: 15px;
        }

        /* Image Container */
        .service-image-container {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s
            cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(0.7) contrast(1.1);
        }

        .service-card:hover .service-image {
          transform: scale(1.15);
          filter: brightness(0.9) contrast(1.2);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.1) 0%,
            transparent 50%,
            rgba(212, 175, 55, 0.05) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card:hover .image-overlay {
          opacity: 1;
        }

        .image-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.95) 0%,
            transparent 100%
          );
        }

        /* Content */
        .service-content {
          padding: 28px 24px;
        }

        .service-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .service-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .service-icon-wrapper :global(.icon-gold) {
          color: #d4af37;
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
        }

        .service-title {
          font-family: "Oswald", sans-serif;
          font-size: clamp(1.3rem, 2vw, 1.6rem);
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .service-description {
          font-family: "Rajdhani", sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: #b8b8b8;
          line-height: 1.6;
          margin: 0 0 20px 0;
          letter-spacing: 0.5px;
        }

        /* Expanded Content */
        .service-expanded {
          animation: slideDown 0.4s ease-out;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .service-full-description {
          font-family: "Rajdhani", sans-serif;
          font-size: 1rem;
          color: #d4d4d4;
          line-height: 1.7;
          margin: 0 0 24px 0;
          letter-spacing: 0.5px;
        }

        /* CTA Button */
        .service-cta-button {
          width: 100%;
          padding: 16px 28px;
          background: linear-gradient(
            135deg,
            #d4af37 0%,
            #f4d03f 100%
          );
          border: none;
          border-radius: 8px;
          font-family: "Oswald", sans-serif;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 2px;
          color: #000000;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
        }

        .service-cta-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s ease;
        }

        .service-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(212, 175, 55, 0.5);
        }

        .service-cta-button:hover::before {
          left: 100%;
        }

        .button-arrow {
          transition: transform 0.3s ease;
          font-size: 1.3rem;
        }

        .service-cta-button:hover .button-arrow {
          transform: translateX(5px);
        }

        /* Learn More Link */
        .service-learn-more {
          font-family: "Rajdhani", sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #d4af37;
          background: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          position: relative;
          padding: 0;
        }

        .service-learn-more::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #d4af37, #f4d03f);
          transition: width 0.3s ease;
        }

        .service-learn-more:hover {
          color: #f4d03f;
        }

        .service-learn-more:hover::after {
          width: 100%;
        }

        .learn-more-arrow {
          transition: transform 0.3s ease;
        }

        .service-learn-more:hover .learn-more-arrow {
          transform: translateX(5px);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 120px;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 300px;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .services-section {
            padding: 60px 0;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .service-image-container {
            height: 220px;
          }
        }
      `}</style>
    </section>
  );
}