import {
  Handshake,
  Building2,
  Network,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function WhyHogarthSection() {
  const features = [
    {
      id: 1,
      title: "Personalized Excellence",
      icon: <Handshake size={40} className="why-icon-gold" />,
      bullets: [
        "Free fitness assessments",
        "Ongoing personal training",
        "Exclusive member perks",
        "Tailored wellness plans",
      ],
      image:
        "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "State-of-the-Art Facilities",
      icon: <Building2 size={40} className="why-icon-gold" />,
      bullets: [
        "2 acres of green space",
        "Modern fitness studios",
        "Indoor heated pool",
        "Wellness bar & lounge",
      ],
      image:
        "https://images.unsplash.com/photo-1761971976282-b2bb051a5474?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Community & Partnerships",
      icon: <Network size={40} className="why-icon-gold" />,
      bullets: [
        "Local business collaborations",
        "Exclusive member events",
        "Vibrant social community",
        "Wellness workshops",
      ],
      image:
        "https://images.unsplash.com/photo-1571385778997-1ae4643264e6?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section id="memberships" className="why-section">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="why-header">
          <p className="why-kicker">MEMBERSHIP BENEFITS</p>
          <h2 className="why-title">
            Why Choose
            <span className="why-title-highlight">
              {" "}
              The Hogarth
            </span>
          </h2>
          <p className="why-subtitle">
            A private health club that feels personal, not
            corporate.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="why-card group"
            >
              {/* Image */}
              <div className="why-image-wrapper">
                <ImageWithFallback
                  src={feature.image}
                  alt={feature.title}
                  className="why-image"
                />
                <div className="why-image-overlay" />
              </div>

              {/* Content */}
              <div className="why-card-body">
                <div className="why-card-header">
                  <div className="why-icon-badge">
                    {feature.icon}
                  </div>
                  <h3 className="why-card-title">
                    {feature.title}
                  </h3>
                </div>

                <ul className="why-list">
                  {feature.bullets.map((bullet, index) => (
                    <li key={index} className="why-list-item">
                      <span className="why-bullet-dot" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* CTA + Stats */}
        <div className="why-cta">
          <div className="why-stats">
            <div className="why-stat-circle">
              <Star size={24} />
              <div className="why-stat-text">
                <span className="why-stat-number">500+</span>
                <span className="why-stat-label">
                  Happy Members
                </span>
              </div>
            </div>
            <div className="why-stat-circle">
              <Star size={24} />
              <div className="why-stat-text">
                <span className="why-stat-number">4.9/5</span>
                <span className="why-stat-label">
                  Avg Rating
                </span>
              </div>
            </div>
          </div>

          <div className="why-cta-copy">
            <p>
              Join a community that knows your name, your goals,
              and how to get you there.
            </p>
            <button type="button" className="why-cta-button">
              <span>Start Your Membership</span>
              <span className="why-cta-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Gym-style font pairing: Oswald (headings) + Rajdhani (body). [web:2][web:5] */
        @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600&display=swap");

        :root {
          --why-bg: #020617;
          --why-bg-soft: #020617;
          --why-card-bg: rgba(15, 23, 42, 0.95);
          --why-gold: #facc15;
          --why-gold-soft: rgba(250, 204, 21, 0.18);
          --why-border: rgba(55, 65, 81, 0.8);
          --why-text: #f9fafb;
          --why-muted: #9ca3af;
        }

        .why-section {
          position: relative;
          padding: 96px 0 110px;
          background: radial-gradient(
            circle at top,
            #111827 0%,
            #020617 45%,
            #000000 100%
          );
          color: var(--why-text);
          overflow: hidden;
        }

        .why-section::before {
          content: "";
          position: absolute;
          inset: -40px;
          background-image:
            radial-gradient(
              circle at 0 0,
              rgba(250, 204, 21, 0.08),
              transparent 55%
            ),
            radial-gradient(
              circle at 100% 0,
              rgba(148, 163, 184, 0.18),
              transparent 55%
            ),
            linear-gradient(
              135deg,
              #020617,
              #020617 30%,
              #000000
            );
          opacity: 0.9;
          pointer-events: none;
          z-index: 0;
        }

        .why-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at bottom,
            rgba(0, 0, 0, 0.8),
            transparent 60%
          );
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
        }

        .why-header {
          position: relative;
          z-index: 1;
          text-align: left;
          max-width: 640px;
          margin-bottom: 48px;
        }

        .why-kicker {
          font-family:
            "Rajdhani",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--why-muted);
          margin-bottom: 8px;
        }

        .why-title {
          font-family:
            "Oswald",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: clamp(2.3rem, 4vw, 3rem);
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 10px;
          color: var(--why-text);
        }

        .why-title-highlight {
          margin-left: 10px;
          background: linear-gradient(
            120deg,
            #facc15,
            #f97316,
            #facc15
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: whyTitleSheen 3s ease-in-out infinite;
        }

        .why-subtitle {
          font-family:
            "Rajdhani",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 0.98rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--why-muted);
        }

        .why-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--why-card-bg);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--why-border);
          box-shadow:
            0 20px 45px rgba(0, 0, 0, 0.9),
            inset 0 0 0 1px rgba(15, 23, 42, 0.95);
          transform: translateY(0);
          transition:
            transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 220ms ease-out,
            border-color 220ms ease-out,
            background 220ms ease-out;
          isolation: isolate;
        }

        .why-card::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 18px;
          background: radial-gradient(
            circle at 0 0,
            var(--why-gold-soft),
            transparent 55%
          );
          opacity: 0;
          mix-blend-mode: screen;
          transition: opacity 220ms ease-out;
          pointer-events: none;
          z-index: -1;
        }

        .why-card:hover {
          transform: translateY(-8px);
          border-color: rgba(250, 204, 21, 0.7);
          box-shadow:
            0 26px 60px rgba(0, 0, 0, 1),
            0 0 30px rgba(250, 204, 21, 0.24);
          background: radial-gradient(
            circle at top left,
            #111827 0%,
            #020617 65%
          );
        }

        .why-card:hover::before {
          opacity: 1;
        }

        .why-image-wrapper {
          position: relative;
          height: 230px;
          overflow: hidden;
        }

        .why-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          filter: saturate(1.05) contrast(1.05) brightness(0.78);
          transition:
            transform 460ms cubic-bezier(0.22, 0.61, 0.36, 1),
            filter 320ms ease-out;
        }

        .why-card:hover .why-image {
          transform: scale(1.1);
          filter: saturate(1.15) contrast(1.1) brightness(0.9);
        }

        .why-image-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to top,
              rgba(0, 0, 0, 0.9),
              transparent 60%
            ),
            radial-gradient(
              circle at 0 0,
              rgba(250, 204, 21, 0.18),
              transparent 55%
            );
          mix-blend-mode: multiply;
        }

        .why-card-body {
          padding: 22px 22px 20px;
        }

        .why-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 10px;
        }

        .why-icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 0,
            #facc15,
            #f59e0b
          );
          box-shadow:
            0 0 0 1px #020617,
            0 0 14px rgba(250, 204, 21, 0.6);
          animation: whyIconPulse 2.6s ease-in-out infinite;
        }

        .why-icon-gold {
          color: #111827;
        }

        .why-card-title {
          font-family:
            "Oswald",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 1.15rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin: 0;
          color: var(--why-text);
        }

        .why-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .why-list-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family:
            "Rajdhani",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 0.96rem;
          color: var(--why-muted);
          letter-spacing: 0.03em;
        }

        .why-bullet-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--why-gold);
          box-shadow: 0 0 8px rgba(250, 204, 21, 0.7);
          flex-shrink: 0;
        }

        .why-cta {
          position: relative;
          z-index: 1;
          margin-top: 10px;
          padding: 24px 26px;
          border-radius: 24px;
          background:
            radial-gradient(
              circle at 0 0,
              rgba(250, 204, 21, 0.18),
              transparent 55%
            ),
            linear-gradient(120deg, #020617, #020617, #030712);
          border: 1px solid rgba(55, 65, 81, 0.9);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @media (min-width: 1024px) {
          .why-cta {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 26px 32px;
          }
        }

        .why-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: center;
        }

        .why-stat-circle {
          width: 120px;
          height: 120px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 0,
            #facc15,
            #f59e0b
          );
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #020617;
          box-shadow:
            0 0 0 1px #020617,
            0 20px 40px rgba(250, 204, 21, 0.45);
        }

        .why-stat-text {
          text-align: center;
          font-family:
            "Rajdhani",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        .why-stat-number {
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .why-stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .why-cta-copy {
          max-width: 440px;
          margin: 0 auto;
          text-align: center;
        }

        @media (min-width: 1024px) {
          .why-cta-copy {
            text-align: right;
            margin: 0;
          }
        }

        .why-cta-copy p {
          margin: 0 0 14px;
          font-family:
            "Rajdhani",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 0.98rem;
          color: var(--why-text);
          letter-spacing: 0.04em;
        }

        .why-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 28px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(
            120deg,
            #facc15,
            #f97316,
            #facc15
          );
          color: #020617;
          font-family:
            "Oswald",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow:
            0 16px 38px rgba(250, 204, 21, 0.55),
            0 0 0 1px #020617;
          position: relative;
          overflow: hidden;
          background-size: 220% 220%;
          background-position: 0% 50%;
          transition:
            transform 180ms ease-out,
            box-shadow 220ms ease-out,
            background-position 520ms ease-out;
          width: 100%;
        }

        @media (min-width: 640px) {
          .why-cta-button {
            width: auto;
          }
        }

        .why-cta-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 0%,
            rgba(255, 255, 255, 0.7) 45%,
            transparent 70%
          );
          transform: translateX(-120%);
          opacity: 0;
          transition:
            transform 520ms ease-out,
            opacity 260ms ease-out;
        }

        .why-cta-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 20px 48px rgba(250, 204, 21, 0.7),
            0 0 0 1px #020617;
          background-position: 100% 50%;
        }

        .why-cta-button:hover::before {
          transform: translateX(120%);
          opacity: 1;
        }

        .why-cta-arrow {
          font-size: 1.1rem;
          transform: translateX(0);
          transition: transform 200ms ease-out;
        }

        .why-cta-button:hover .why-cta-arrow {
          transform: translateX(4px);
        }

        /* Animations */
        @keyframes whyTitleSheen {
          0%,
          100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }

        @keyframes whyIconPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @media (max-width: 768px) {
          .why-section {
            padding: 72px 0 84px;
          }

          .why-card-body {
            padding: 18px 16px 18px;
          }

          .why-image-wrapper {
            height: 210px;
          }
        }
      `}</style>
    </section>
  );
}