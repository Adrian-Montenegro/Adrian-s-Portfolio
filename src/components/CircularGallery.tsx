// src/components/CircularGallery.tsx
import React, { useState, useEffect, useRef } from 'react';

interface CircularGalleryProps {
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  onCardClick?: (index: number) => void;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  onCardClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      id: 1,
      title: 'Super Bowl LVIII',
      role: 'Halftime Team Member',
      description:
        'Selected performer supporting live-field coordination for national broadcast event.',
      image: '/experience/superbowl.jpg',
    },
    {
      id: 2,
      title: 'Engineering Ambassador',
      role: 'UNLV College of Engineering',
      description:
        'Represented the College through campus tours and student recruitment.',
      image: '/experience/ambassador.jpg',
    },
    {
      id: 3,
      title: 'Gen Cyber Competition',
      role: '1st Place Winner',
      description:
        'Awarded top performance in national cybersecurity engineering competition.',
      image: '/experience/gencyber.jpg',
    },
    {
      id: 4,
      title: 'Helix Internship',
      role: 'Engineering Intern',
      description:
        'Hands-on experience in engineering systems and project management.',
      image: '/experience/helix.jpg',
    },
    {
      id: 5,
      title: 'Italy Study Abroad',
      role: 'Honors College Program',
      description:
        'Cultural and academic immersion experience after two years in Honors College.',
      image: '/experience/italy.jpg',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = 1 - rect.top / window.innerHeight;
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [experiences.length]);

  const calculatePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 200 + Math.sin(scrollProgress * Math.PI) * 100;
    const bendFactor =
      bend * (1 + Math.sin(scrollProgress * Math.PI * 2) * 0.5);

    return {
      x: Math.cos(angle + scrollProgress * Math.PI * 2) * radius * bendFactor,
      y: Math.sin(angle + scrollProgress * Math.PI * 2) * radius,
      scale: 0.8 + Math.cos((index - activeIndex) * 0.5) * 0.2,
      opacity: 0.6 + Math.cos((index - activeIndex) * 0.5) * 0.4,
      zIndex: index === activeIndex ? 10 : 1,
    };
  };

  return (
    <div
      ref={containerRef}
      className="circular-gallery-container"
      style={{
        height: '600px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background */}
      <div
        className="gallery-background"
        style={{
          opacity: 0.1 + scrollProgress * 0.3,
          transform: `scale(${1 + scrollProgress * 0.2})`,
        }}
      />

      {/* Moving Cards */}
      {experiences.map((exp, index) => {
        const position = calculatePosition(index, experiences.length);

        return (
          <div
            key={exp.id}
            className={`gallery-card-moving ${
              index === activeIndex ? 'card-active' : ''
            }`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
              opacity: position.opacity,
              zIndex: position.zIndex,
              borderRadius: `${borderRadius * 100}px`,
              color: textColor,
            }}
            onClick={() => onCardClick?.(index)}
          >
            <div className="moving-card-image">
              <div className="image-placeholder-moving">
                <span>{exp.title}</span>
              </div>
            </div>
            <div className="moving-card-content">
              <h3>{exp.title}</h3>
              <p>{exp.role}</p>
              <div className="card-indicator">
                <div
                  className="indicator-progress"
                  style={{
                    width: `${index === activeIndex ? 100 : 0}%`,
                    transition: 'width 3s linear',
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Next Section Indicator */}
      <div
        className="next-section-indicator"
        style={{
          opacity: scrollProgress > 0.7 ? (scrollProgress - 0.7) * 3.33 : 0,
          transform: `translateY(${scrollProgress * 50}px)`,
        }}
      >
        <div className="indicator-arrow">↓</div>
        <span>Continue to Research</span>
      </div>
    </div>
  );
};

export default CircularGallery;
