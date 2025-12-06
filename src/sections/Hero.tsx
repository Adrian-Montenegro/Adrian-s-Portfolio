import { useState, useEffect } from "react";
import "../styles/Hero.css";

interface HeroProps {
  onNavigateToExperience: () => void;
  onNavigateToResearch: () => void;
  onNavigateToDesign: () => void;
}

const SLIDES = [
  "/assets/dashboard/dash1.webp",
  "/assets/dashboard/dash2.webp",
  "/assets/dashboard/dash3.webp",
  "/assets/dashboard/dash4.webp",
  "/assets/dashboard/dash5.webp",
];

const navItems = [
  { id: "experience", label: "Experience", description: "Professional work" },
  { id: "research", label: "Research", description: "Academic projects" },
  { id: "design", label: "Design", description: "Creative solutions" },
];

export default function Hero({
  onNavigateToExperience,
  onNavigateToResearch,
  onNavigateToDesign,
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Background slideshow – smooth fade + subtle zoom
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % SLIDES.length;
        setPreviousSlide(prev);
        return next;
      });
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, []);

  const handleNavigationClick = (section: string) => {
    if (section === "experience") {
      onNavigateToExperience();
    } else if (section === "research") {
      onNavigateToResearch();
    } else if (section === "design") {
      onNavigateToDesign();
    }
  };

  return (
    <section className="hero-section hero-section--slideshow">
      {/* Background slideshow */}
      <div className="hero-slides">
        {[previousSlide, currentSlide].map((index, layer) => {
          const src = SLIDES[index];
          const isActive = index === currentSlide;

          return (
            <div
              key={`${src}-${layer}`}
              className={
                isActive
                  ? "hero-slide hero-slide--active"
                  : "hero-slide hero-slide--inactive"
              }
              style={{ backgroundImage: `url(${src})` }}
            />
          );
        })}
      </div>

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Foreground content */}
      <div
        className={
          isVisible ? "hero-shell hero-shell--visible" : "hero-shell"
        }
      >
        {/* Left column */}
        <div className="hero-left">
          <div className="hero-label">Civil &amp; Environmental Engineering</div>

          <h1 className="hero-title">
            Adrian <span className="hero-title-accent">Montenegro</span>
          </h1>

          <div className="hero-tagline">
            SOFTWARE • DESIGN • SYSTEMS
          </div>

          <p className="hero-description">
            UNLV Honors College Civil &amp; Environmental Engineering student
            with a passion for designing across disciplines—software,
            infrastructure, and physical systems.
          </p>

          <div className="hero-actions">
            <a
              href="/assets/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-primary"
            >
              View CV
            </a>
          </div>
        </div>

        {/* Right column – Nav cards */}
        <nav className="hero-nav" aria-label="Primary sections">
          {navItems.map((item) => {
            const variantClass =
              item.id === "experience"
                ? "hero-nav-card--experience"
                : item.id === "research"
                ? "hero-nav-card--research"
                : "hero-nav-card--design";

            return (
              <button
                key={item.id}
                type="button"
                className={`hero-nav-card ${variantClass}`}
                onClick={() => handleNavigationClick(item.id)}
              >
                <div className="hero-nav-main">
                  <div className="hero-nav-desc">{item.description}</div>
                  <div className="hero-nav-label">{item.label}</div>
                </div>
                <div className="hero-nav-arrow">→</div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Scroll cue */}
      <div
        className={
          isVisible
            ? "scroll-indicator scroll-indicator--visible"
            : "scroll-indicator"
        }
        onClick={() => handleNavigationClick("experience")}
      >
        <div className="scroll-text">Click to Explore</div>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
