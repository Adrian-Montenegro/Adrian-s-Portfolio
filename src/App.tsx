// src/App.tsx
import React, { useRef } from "react";
import Hero from "./sections/Hero";

import ExperienceSection from "./sections/ExperienceSection";
import ResearchSection from "./sections/ResearchSection";
import DesignSection from "./sections/DesignSection";

import "./styles/globals.css";

const App: React.FC = () => {
  const experienceRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);

  /* Scrolling handlers */
  const scrollToExperience = () => {
    experienceRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToResearch = () => {
    researchRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToDesign = () => {
    designRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="App">
      {/* Hero with slideshow background */}
      <Hero
        onNavigateToExperience={scrollToExperience}
        onNavigateToResearch={scrollToResearch}
        onNavigateToDesign={scrollToDesign}
      />

      {/* Sections */}
      <div id="experience" ref={experienceRef}>
        <ExperienceSection />
      </div>

      <div id="research" ref={researchRef}>
        <ResearchSection />
      </div>

      <div id="design" ref={designRef}>
        <DesignSection />
      </div>
    </div>
  );
};

export default App;
