// src/sections/ResearchSection.tsx
import React, { useState, useEffect, useCallback } from "react";
import "../styles/ResearchSection.css";
import { FiChevronDown } from "react-icons/fi";

type ResearchProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  detailDescription: string;
  insight: string;
  outcome: string;
  status: string;
  images: string[];
  pdfUrl?: string;
};

const ResearchSection: React.FC = () => {
  const researchProjects: ResearchProject[] = [
    {
      id: 1,
      title: "Waste to Watts",
      category: "Water Systems",
      description: "Groundwater treatment for data center cooling.",
      detailDescription:
        "Designed a treatment train that repurposes perched groundwater for hyperscale data center cooling. Work included bench-scale testing, treatment selection (IX vs RO), cost modeling, and integration with ASHRAE data center guidelines.",
      insight:
        "This project pushed me to balance water chemistry, energy use, and reliability while still making the design constructible and cost-conscious.",
      outcome: "23% water reduction",
      status: "Senior Design",
      images: [
        "/assets/projects/research/wastetowatts/googledatacenter.jpeg",
        "/assets/projects/research/wastetowatts/booth.webp",
        "/assets/projects/research/wastetowatts/grandprize.webp",
        "/assets/projects/research/wastetowatts/finalposter.webp",
      ],
      pdfUrl: "/assets/Data_Center.pdf",
    },
    {
      id: 2,
      title: "Life Cycle Assessment Study",
      category: "Environmental",
      description: "Dining vs delivery life-cycle emissions analysis.",
      detailDescription:
        "Compared the cradle-to-grave emissions of dining in versus ordering delivery for a typical restaurant meal. Built a life-cycle inventory, modeled transportation and packaging impacts, and tested scenarios for behavior change.",
      insight:
        "I learned how sensitive climate impacts can be to seemingly small choices, like packaging type and last-mile travel distance.",
      outcome: "87% emissions reduction",
      status: "Completed",
      images: [
        "/assets/academic/technical-reports/LCA/Applebee.jpg",
        "/assets/academic/technical-reports/LCA/map.webp",
        "/assets/academic/technical-reports/LCA/LCA1.jpg",
        "/assets/academic/technical-reports/LCA/LCA2.jpg",
      ],
      pdfUrl: "/assets/Comparative_LCA.pdf",
    },
    {
      id: 3,
      title: "Lethal Learning",
      category: "Systems Engineering",
      description: "Infrastructure impact on learning and student safety.",
      detailDescription:
        "Blended interviews, site observations, and systems mapping to examine how school design, policy, and technology interact to influence student safety and learning conditions.",
      insight:
        "This work taught me how infrastructure decisions are inseparable from people, policy, and culture—and why technical fixes alone rarely solve complex safety problems.",
      outcome: "50+ interviews",
      status: "Published",
      images: [
        "/assets/projects/research/lethallearning/lethallearning.webp",
        "/assets/projects/research/lethallearning/schoolposter.webp",
        "/assets/projects/research/lethallearning/schoolshootingpresent.webp",
        "/assets/projects/research/lethallearning/lostones.webp",
      ],
      pdfUrl: "/assets/Lethal_Learning.pdf",
    },
    {
      id: 4,
      title: "Engineers Without Borders Peru",
      category: "Humanitarian",
      description: "Coastal community housing & cost-optimized design.",
      detailDescription:
        "Collaborated on housing concepts for a coastal community in Peru, targeting durability, cost, and constructability with locally available materials and labor.",
      insight:
        "I had to prioritize what truly matters when budgets are tight: resilience, simplicity in construction, and respect for local context.",
      outcome: "50% cost reduction",
      status: "EWB National",
      images: [
        "/assets/projects/construction/lobitos/lobitosshack.png",
        "/assets/projects/construction/lobitos/sewagepump.png",
        "/assets/projects/construction/lobitos/lobitodwg.png",
        "/assets/projects/construction/lobitos/lobitosdesign.png",
      ],
      pdfUrl: "/assets/Lobitos.pdf",
    },
  ];

  const [selected, setSelected] = useState<ResearchProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // ✅ NEW: fullscreen image modal (DesignSection behavior)
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ESC handling (close fullscreen first, then close project modal)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      if (isFullscreen) {
        setIsFullscreen(false);
        return;
      }

      setSelected(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isFullscreen]);

  const scrollToDesign = () => {
    const el = document.getElementById("design");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openProject = (p: ResearchProject) => {
    setSelected(p);
    setActiveImageIndex(0);
    setIsFullscreen(false);
  };

  // ✅ NEW: open fullscreen from ANY view (desktop/tablet/mobile)
  const openFullscreen = useCallback((idx?: number) => {
    if (!selected) return;
    if (typeof idx === "number") setActiveImageIndex(idx);
    setIsFullscreen(true);
  }, [selected]);

  const closeProject = useCallback(() => {
    setIsFullscreen(false);
    setSelected(null);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  return (
    <section id="research" className="research-wrapper">
      <div className="research-header">
        <span className="research-tag">Research & Analysis</span>
        <h2 className="research-title">Research Projects</h2>
        <p className="research-subtitle">
          Selected work in environmental engineering, systems analysis, and human-centered infrastructure.
        </p>
      </div>

      <div className="research-grid">
        {researchProjects.map((p) => (
          <div
            key={p.id}
            className="research-card"
            role="button"
            tabIndex={0}
            onClick={() => openProject(p)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openProject(p);
            }}
          >
            {/* Image Left */}
            <div
              className="research-card-img"
              style={{ backgroundImage: `url(${p.images[0]})` }}
            />

            {/* Content Right */}
            <div className="research-card-content">
              <div className="research-meta">
                <span className="research-cat">{p.category}</span>
                <span className="research-status">{p.status}</span>
              </div>

              <h3 className="research-card-title">{p.title}</h3>
              <p className="research-desc">{p.description}</p>

              <div className="research-outcome">
                <span>{p.outcome}</span>
              </div>

              <button
                className="research-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openProject(p);
                }}
              >
                Learn more →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom transition arrow */}
      <div className="research-scroll" onClick={scrollToDesign} role="button" tabIndex={0}>
        <FiChevronDown className="research-scroll-icon" />
      </div>

      {/* BIG PROJECT MODAL */}
      {selected && (
        <div className="research-modal-backdrop" onClick={closeProject}>
          <div className="research-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="research-modal-close"
              onClick={closeProject}
              aria-label="Close research project details"
              type="button"
            >
              ×
            </button>

            <div className="research-modal-layout">
              {/* LEFT: huge image gallery */}
              <div className="research-modal-left">
                {/* ✅ CLICKABLE main image (all views) */}
                <div
                  className="research-modal-image research-modal-image--clickable"
                  role="button"
                  tabIndex={0}
                  aria-label="Open image fullscreen"
                  onClick={() => openFullscreen(activeImageIndex)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openFullscreen(activeImageIndex);
                  }}
                  style={{
                    backgroundImage: `url(${selected.images[activeImageIndex]})`,
                  }}
                />

                {/* Thumbnails: also open fullscreen when you click a thumb (after selecting) */}
                <div className="research-modal-thumbs">
                  {selected.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={
                        "research-thumb" +
                        (idx === activeImageIndex ? " research-thumb-active" : "")
                      }
                      style={{ backgroundImage: `url(${img})` }}
                      onClick={() => setActiveImageIndex(idx)}
                      onDoubleClick={() => openFullscreen(idx)}
                      aria-label={`Select image ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* ✅ Tablet helper text (shows only when hover isn't available) */}
                <div className="research-zoom-hint" aria-hidden>
                  Tap image to zoom
                </div>
              </div>

              {/* RIGHT: deeper text */}
              <div className="research-modal-right">
                <div className="research-modal-meta">
                  <span className="research-cat">{selected.category}</span>
                  <span className="research-status">{selected.status}</span>
                </div>

                <h3 className="research-modal-title">{selected.title}</h3>

                <p className="research-modal-desc">{selected.detailDescription}</p>

                <div className="research-modal-outcome">
                  <span className="research-outcome-pill">
                    Outcome: {selected.outcome}
                  </span>
                </div>

                <div className="research-modal-note">
                  <p>{selected.insight}</p>
                </div>

                {selected.pdfUrl && (
                  <a
                    href={selected.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-modal-pdf-link"
                  >
                    View full technical paper (PDF)
                  </a>
                )}
              </div>
            </div>

            {/* ✅ FULLSCREEN IMAGE MODAL (DesignSection behavior) */}
            {isFullscreen && selected.images.length > 0 && (
              <div
                className="research-fullscreen-backdrop"
                onClick={closeFullscreen}
                role="presentation"
              >
                <div
                  className="research-fullscreen-card"
                  onClick={(e) => e.stopPropagation()}
                  role="presentation"
                >
                  <button
                    type="button"
                    className="research-fullscreen-close"
                    onClick={closeFullscreen}
                    aria-label="Close fullscreen image"
                  >
                    ×
                  </button>

                  <img
                    src={selected.images[activeImageIndex]}
                    alt={`${selected.title} image ${activeImageIndex + 1}`}
                    className="research-fullscreen-image"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ResearchSection;
