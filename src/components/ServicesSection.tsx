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
  serviceKey:
    | "reformer-pilates"
    | "gym-fitness"
    | "tennis-swim"
    | "beauty-spa";
}

interface ServicesSectionProps {
  onServiceSelect: (
    service:
      | "reformer-pilates"
      | "gym-fitness"
      | "tennis-swim"
      | "beauty-spa"
  ) => void;
}

export function ServicesSection({
  onServiceSelect,
}: ServicesSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(
    null
  );

  const services: ServiceCard[] = [
    {
      id: 1,
      title: "Reformer Pilates",
      icon: <Activity size={32} className="icon-gold" />,
      description:
        "State-of-the-art studio with expert-led classes for core strength and flexibility.",
      image:
        "https://images.unsplash.com/photo-1754257320362-5982d5cd58ad?auto=format&fit=crop&w=1080&q=80",
      fullDescription:
        "Transform your body with precision-led Reformer Pilates classes in our premium studio.",
      serviceKey: "reformer-pilates",
    },
    {
      id: 2,
      title: "Gym & Fitness",
      icon: <Dumbbell size={32} className="icon-gold" />,
      description:
        "Premium gym equipment and personalized training programs to achieve your fitness goals.",
      image:
        "https://images.unsplash.com/photo-1632077804406-188472f1a810?auto=format&fit=crop&w=1080&q=80",
      fullDescription:
        "Access state-of-the-art gym facilities with expert trainers.",
      serviceKey: "gym-fitness",
    },
    {
      id: 3,
      title: "Tennis & Swim",
      icon: <Waves size={32} className="icon-gold" />,
      description:
        "Professional tennis courts and pristine indoor pool for comprehensive athletic training.",
      image:
        "https://images.unsplash.com/photo-1656935450737-ed3e35914121?auto=format&fit=crop&w=1080&q=80",
      fullDescription:
        "Play tennis or swim laps with professional coaching available.",
      serviceKey: "tennis-swim",
    },
    {
      id: 4,
      title: "Beauty & Spa",
      icon: <Users size={32} className="icon-gold" />,
      description:
        "Luxury spa treatments and beauty services for complete relaxation and rejuvenation.",
      image:
        "https://images.unsplash.com/photo-1693004926638-d2e47d705229?auto=format&fit=crop&w=1080&q=80",
      fullDescription:
        "Indulge in luxury spa treatments and wellness therapies.",
      serviceKey: "beauty-spa",
    },
  ];

  return (
    <section className="services-section">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="services-title">
            ELEVATE YOUR{" "}
            <span className="services-title-highlight">
              WELLNESS JOURNEY
            </span>
          </h2>
          <div className="services-title-underline" />
          <p className="services-subtitle">
            Transform your body, elevate your mind
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${
                hoveredCard === service.id
                  ? "hovered"
                  : ""
              }`}
              onMouseEnter={() =>
                setHoveredCard(service.id)
              }
              onMouseLeave={() =>
                setHoveredCard(null)
              }
            >
              <div className="card-border-glow" />

              <div className="service-image-container">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                />
                <div className="image-gradient" />
              </div>

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

                <button
                  className="service-cta-button"
                  onClick={() =>
                    onServiceSelect(service.serviceKey)
                  }
                >
                  BOOK SESSION →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .services-section {
          padding: 100px 0;
          background: linear-gradient(
            135deg,
            #0a0a0a,
            #1a1a1a
          );
        }

        .services-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          color: white;
          letter-spacing: 4px;
        }

        .services-title-highlight {
          background: linear-gradient(
            135deg,
            #d4af37,
            #f4d03f
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .services-title-underline {
          width: 120px;
          height: 4px;
          margin: 20px auto;
          background: linear-gradient(
            90deg,
            transparent,
            #d4af37,
            transparent
          );
        }

        .services-subtitle {
          color: #b8b8b8;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* GRID RESPONSIVE FIX */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        /* CARD */
        .service-card {
          background: #111;
          border-radius: 16px;
          overflow: hidden;
          transition: 0.4s;
          border: 1px solid
            rgba(212, 175, 55, 0.15);
          min-height: 520px;
        }

        .service-card:hover {
          transform: translateY(-10px)
            scale(1.02);
          box-shadow: 0 20px 40px
            rgba(0, 0, 0, 0.6);
        }

        /* IMAGE */
        .service-image-container {
          height: 280px;
          position: relative;
        }

        @media (max-width: 640px) {
          .service-image-container {
            height: 220px;
          }
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9),
            transparent
          );
        }

        /* CONTENT */
        .service-content {
          padding: 24px;
        }

        .service-header {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .service-title {
          color: white;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .service-description {
          color: #b8b8b8;
          margin: 16px 0 20px;
          line-height: 1.6;
        }

        .service-cta-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(
            135deg,
            #d4af37,
            #f4d03f
          );
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
}
