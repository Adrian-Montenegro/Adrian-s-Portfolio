import React, { useState, useEffect, useCallback } from 'react';
import '../styles/DesignSection.css';

type Project = {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  role: string;
  year: string;
  status: string;
  tags: string[];
  details: string[];
  images?: string[];
};

const projects: Project[] = [
  {
    title: 'Optomat',
    subtitle: 'Optical Measurement System',
    description:
      'Precision optical measurement device for industrial quality control with automated calibration and high-resolution imaging.',
    category: 'Optical Engineering',
    role: 'Product & Systems Design',
    year: '2024',
    status: 'Completed',
    tags: ['CAD Design', 'Precision Measurement', 'Automation', 'Quality Control'],
    details: [
      'Automated calibration system',
      'High-resolution imaging capabilities',
      'Real-time data analysis dashboard',
      'Industrial quality control standards',
    ],
    images: [
      '/assets/projects/design/optomat/optomatintro.png',
      '/assets/projects/design/optomat/optomodeselect.png',
      '/assets/projects/design/optomat/opto_mat_screenshot.png',
      '/assets/projects/design/optomat/optomat selection.png',
      '/assets/projects/design/optomat/sustainability scoring.png',

    ],
  },
  {
    title: 'Sound Design',
    subtitle: 'Out of the Darkness — Short Documentary',
    description:
      'Immersive soundscape and mix for a 9/11 documentary, collaborating with composer Miriam Kapner and festival-screened across multiple cities.',
    category: 'Acoustic Engineering',
    role: 'Sound Designer & Mixer',
    year: '2022',
    status: 'In Progress / Festival Run',
    tags: ['Spatial Mix', 'Sound Design', 'Post-Production', 'Story-Driven Audio'],
    details: [
      'Dialogue, ambience, and score balancing',
      'Design of emotional impact moments',
      'Mix prepared for festival projection environments',
      'Collaboration with director and composer',
    ],
    images: [
      '/assets/projects/design/sound-design/outofdark.jpeg',
      '/assets/projects/design/sound-design/miriam.png',
      '/assets/projects/design/sound-design/clockfx.png',
      '/assets/projects/design/sound-design/credit.png',
      '/assets/projects/design/sound-design/soundfx.png',
      '/assets/projects/design/sound-design/project.png',
    ],
  },
  {
    title: 'Fieldflow',
    subtitle: 'Construction & Scheduling Platform',
    description:
      'Digital field-management interface connecting schedules, productivity, and cut projections for construction teams.',
    category: 'Product & UX Design',
    role: 'Product Designer',
    year: '2024',
    status: 'Completed',
    tags: ['UX Design', 'React UI', 'Construction Tech', 'Prototyping'],
    details: [
      'Dashboard for foremen and PMs',
      'Drag-and-drop schedule views',
      'Color-coded productivity tracking',
      'Excel-driven data backbone',
    ],
    images: [
      '/assets/projects/fieldflow/main.png',
       '/assets/projects/fieldflow/FF_dashboard.png',
      '/assets/projects/fieldflow/fieldflow_tasks.png',
      '/assets/projects/fieldflow/export.png',
      '/assets/projects/fieldflow/logsettings.png',
      '/assets/projects/fieldflow/idea.jpeg',
    ],
  },
  {
    title: 'Waste to Watts',
    subtitle: 'Perched Groundwater Interface',
    description:
      'Visual ecosystem for data-center cooling, treatment trains, and 3D-printed components based on perched groundwater reuse.',
    category: 'Sustainable Systems',
    role: 'Systems & Visual Design',
    year: '2025',
    status: 'Research',
    tags: ['Water Systems', '3D Printing', 'Sustainability'],
    details: [
      'Site-scaled data-center layout graphics',
      'IX/RO treatment diagrams',
      '3D-print ready visual assets',
      'Integrated research + design narrative',
    ],
    images: [
      '/assets/projects/research/wastetowatts/WWdatacenterprints.png',
      '/assets/projects/research/wastetowatts/IXdiagram.png',
      '/assets/projects/research/wastetowatts/diagram_ro.png',
      '/assets/projects/research/wastetowatts/projectmap.JPG',
      '/assets/projects/research/wastetowattslab/labbottles.jpeg',
      '/assets/projects/research/wastetowattslab/labcolumn.jpeg',
      '/assets/projects/research/wastetowattslab/labwork.jpeg',
      '/assets/projects/research/wastetowattslab/morewater.jpeg',
      '/assets/projects/research/wastetowattslab/watercollection.jpeg',
    ],
  },
];

const DesignSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const activeProject = projects[activeTab];
  const activeImages = activeProject.images ?? [];

  // Reset image index when switching projects
  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeTab]);

  const handleNextImage = () => {
    if (!activeImages.length) return;
    setActiveImageIndex((prev) => (prev + 1) % activeImages.length);
  };

  const handlePrevImage = () => {
    if (!activeImages.length) return;
    setActiveImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeImages.length > 1) {
      handleNextImage();
    } else if (isRightSwipe && activeImages.length > 1) {
      handlePrevImage();
    }
  }, [touchStart, touchEnd, activeImages.length]);

  useEffect(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  return (
    <section id="design" className="design-section">
      <div className="section-container design-section__container">
        {/* Header */}
        <div className="design-header">
          <span className="section-label">Design Portfolio</span>
          <h2 className="section-title design-title">Engineering Projects</h2>
        </div>

        <div className="design-layout">
          {/* Sidebar tabs */}
          <aside className="design-sidebar">
            {projects.map((project, index) => (
              <button
                key={project.title}
                className={
                  'design-tab' + (index === activeTab ? ' design-tab--active' : '')
                }
                onClick={() => setActiveTab(index)}
              >
                <div className="design-tab__titles">
                  <span className="design-tab__name">{project.title}</span>
                  <span className="design-tab__subtitle">{project.subtitle}</span>
                </div>
                <div className="design-tab__meta">
                  <span className="design-tab__category">{project.category}</span>
                  <span className="design-tab__year">{project.year}</span>
                </div>
              </button>
            ))}
          </aside>

          {/* Main content */}
          <main className="design-main">
            {/* Visual panel - Now the main focus */}
            <div className="design-main__visual">
              {activeImages.length > 0 ? (
                <div 
                  className="design-main__image-wrapper"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={activeImages[activeImageIndex]}
                    alt={activeProject.title}
                    className="design-main__image"
                  />

                  {/* Image Navigation */}
                  {activeImages.length > 1 && (
                    <>
                      <div className="design-image-nav">
                        <button 
                          className="design-image-nav__btn design-image-nav__btn--prev"
                          onClick={handlePrevImage}
                          aria-label="Previous image"
                        >
                          ←
                        </button>
                        
                        <div className="design-image-indicator">
                          <span className="design-image-indicator__current">
                            {activeImageIndex + 1}
                          </span>
                          <span className="design-image-indicator__separator">/</span>
                          <span className="design-image-indicator__total">
                            {activeImages.length}
                          </span>
                        </div>

                        <button 
                          className="design-image-nav__btn design-image-nav__btn--next"
                          onClick={handleNextImage}
                          aria-label="Next image"
                        >
                          →
                        </button>
                      </div>

                      {/* Dots indicator */}
                      <div className="design-image-dots">
                        {activeImages.map((_, index) => (
                          <button
                            key={index}
                            className={`design-image-dot ${
                              index === activeImageIndex ? 'design-image-dot--active' : ''
                            }`}
                            onClick={() => setActiveImageIndex(index)}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="design-main__gradient" />
              )}

              {/* Compact chips */}
              <div className="design-main__chips">
                <span className="design-chip">{activeProject.category}</span>
                <span className="design-chip">{activeProject.status}</span>
                <span className="design-chip">{activeProject.year}</span>
              </div>
            </div>

            {/* Compact info panel */}
            <div className="design-main__info">
              <div className="design-main__text">
                <h3 className="design-main__title">{activeProject.title}</h3>
                <p className="design-main__subtitle">{activeProject.subtitle}</p>
                <p className="design-main__description">
                  {activeProject.description}
                </p>
              </div>

              <div className="design-main__meta">
                <div className="design-tags">
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className="design-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="design-details">
                  <h4 className="design-details__title">Key Features</h4>
                  <ul className="design-details__list">
                    {activeProject.details.map((detail) => (
                      <li key={detail} className="design-details__item">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;