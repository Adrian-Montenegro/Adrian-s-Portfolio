import React, { useState, useEffect } from "react";
import "../styles/ResearchSection.css";
import { FiChevronDown } from "react-icons/fi";

type ResearchProject = {
  id: number;
  title: string;
  category: string;
  description: string;          // short blurb (front card)
  detailDescription: string;    // deeper description (inside modal)
  insight: string;              // “what I focused on / learned”
  outcome: string;
  status: string;
  images: string[];             // 4 images for gallery
  pdfUrl?: string;              // optional, if you want a PDF button
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
        "/assets/projects/research/WWResearch/lab1.jpeg",
        "/assets/projects/research/WWResearch/lab2.jpeg",
        "/assets/projects/research/WWResearch/poster.png",
      ],
      pdfUrl: "/assets/Data_Center.pdf",
    },
    {
      id: 2,
      title: "LCA Study",
      category: "Environmental",
      description:
        "Dining vs delivery life-cycle emissions analysis.",
      detailDescription:
        "Compared the cradle-to-grave emissions of dining in versus ordering delivery for a typical restaurant meal. Built a life-cycle inventory, modeled transportation and packaging impacts, and tested scenarios for behavior change.",
      insight:
        "I learned how sensitive climate impacts can be to seemingly small choices, like packaging type and last-mile travel distance.",
      outcome: "87% emissions reduction",
      status: "Completed",
      images: [
        "/assets/academic/technical-reports/LCA/Applebee.jpg",
        "/assets/academic/technical-reports/LCA/map.png",
        "/assets/academic/technical-reports/LCA/LCA1.jpg",
        "/assets/academic/technical-reports/LCA/LCA2.jpg.jpg",
      ],
      pdfUrl: "/assets/Comparative_LCA.pdf",
    },
    {
      id: 3,
      title: "Campus Security",
      category: "Systems Engineering",
      description:
        "Infrastructure impact on learning and student safety.",
      detailDescription:
        "Blended interviews, site observations, and systems mapping to examine how school design, policy, and technology interact to influence student safety and learning conditions.",
      insight:
        "This work taught me how infrastructure decisions are inseparable from people, policy, and culture—and why technical fixes alone rarely solve complex safety problems.",
      outcome: "50+ interviews",
      status: "Published",
      images: [
        "/assets/projects/research/lethallearning/lethallearning.jpeg",
        "/assets/projects/research/lethallearning/lethallearning.jpeg",
        "/assets/projects/research/lethallearning/lethallearning.jpeg",
        "/assets/projects/research/lethallearning/lethallearning.jpeg",
      ],
      pdfUrl: "/assets/Lethal_Learning.pdf",
    },
    {
      id: 4,
      title: "EWB Peru",
      category: "Humanitarian",
      description:
        "Coastal community housing & cost-optimized design.",
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

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const scrollToDesign = () => {
    const el = document.getElementById("design");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openProject = (p: ResearchProject) => {
    setSelected(p);
    setActiveImageIndex(0);
  };

  return (
    <section id="research" className="research-wrapper">
      <div className="research-header">
        <span className="research-tag">Research & Analysis</span>
        <h2 className="research-title">Research Projects</h2>
        <p className="research-subtitle">
          Selected work in environmental engineering, systems analysis,
          and human-centered infrastructure.
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
      <div className="research-scroll" onClick={scrollToDesign}>
        <FiChevronDown className="research-scroll-icon" />
      </div>

      {/* BIG IMAGE-FOCUSED MODAL */}
      {selected && (
        <div
          className="research-modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="research-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="research-modal-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <div className="research-modal-layout">
              {/* LEFT: huge image gallery */}
              <div className="research-modal-left">
                <div
                  className="research-modal-image"
                  style={{
                    backgroundImage: `url(${selected.images[activeImageIndex]})`,
                  }}
                />

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
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: deeper text */}
              <div className="research-modal-right">
                <div className="research-modal-meta">
                  <span className="research-cat">{selected.category}</span>
                  <span className="research-status">{selected.status}</span>
                </div>

                <h3 className="research-modal-title">{selected.title}</h3>

                <p className="research-modal-desc">
                  {selected.detailDescription}
                </p>

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
          </div>
        </div>
      )}
    </section>
  );
};

export default ResearchSection;
