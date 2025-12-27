// src/sections/ExperienceSection.tsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import "../styles/ExperienceSection.css";
import { FiChevronDown } from "react-icons/fi";

type Experience = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  expandedDescription?: string;
  highlight?: string;
  tags: string[];
  date: string;
  type: string;
  icon: string;
  image: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Engineering Student Ambassador",
    subtitle: "UNLV College of Engineering",
    description:
      "Representing the college and mentoring prospective students while promoting engineering education and opportunities.",
    expandedDescription:
      "As an Engineering Student Ambassador, I lead 3–4 hour tours of the College, walk families through labs and project spaces, and answer questions about the realities of studying engineering. I also support outreach events, panels, and open houses—acting as a bridge between current students, faculty, and prospective engineers.",
    highlight:
      "Learned how to translate complex engineering paths into clear, encouraging stories for future students.",
    tags: ["Leadership", "Mentorship"],
    date: "2023–Present",
    type: "leadership",
    icon: "👥",
    image: "/assets/academic/ESA/esa.webp",
  },
  {
    id: 2,
    title: "Helix Internship",
    subtitle: "Engineering Intern — Summer 2023",
    description:
      "Hands-on experience in electrical contracting, project coordination, and field operations on large-scale projects.",
    expandedDescription:
      "At Helix, I split time between the field and office, learning how drawings, RFIs, and schedules actually translate to productivity on site. I shadowed foremen, helped with basic takeoffs and schedule checks, and saw how electrical scopes integrate with the broader construction sequence on complex projects.",
    highlight:
      "Learned how field constraints, scheduling, and coordination shape what is actually buildable on site.",
    tags: ["Engineering", "Field Experience"],
    date: "Summer 2023",
    type: "internship",
    icon: "🧰",
    image: "/assets/projects/clubs/helix.webp",
  },
  {
    id: 3,
    title: "Italy Immersion",
    subtitle: "UNLV Honors College",
    description:
      "Studied innovation, cities, and engineering history in Italy through immersive coursework and site visits.",
    expandedDescription:
      "The Italy program blended classroom discussions with on-site learning in historic and modern urban spaces. We studied infrastructure, transit, and design in cities like Rome and Florence, comparing European approaches to density, preservation, and mobility with those in the U.S.",
    highlight:
      "Learned how urban design choices shape the daily experience of pedestrians, transit, and public life.",
    tags: ["Cultural", "Academic"],
    date: "2023",
    type: "explore",
    icon: "🌍",
    image: "/assets/projects/clubs/italian.jpeg",
  },
  {
    id: 4,
    title: "Senior Design Winner — Waste to Watts",
    subtitle: "UNLV Civil & Environmental Engineering",
    description:
      "Awarded for a capstone system that repurposes perched groundwater as a sustainable cooling source for data centers.",
    expandedDescription:
      "Our senior design project, Waste to Watts, reimagined perched groundwater as a cooling resource for data centers in the Las Vegas Valley. I worked on process design, treatment train selection, and sustainability framing—tying together hydraulics, water quality, and lifecycle tradeoffs into a cohesive proposal that won the department competition.",
    highlight:
      "Learned how to frame technical decisions around both performance and long-term sustainability tradeoffs.",
    tags: ["Senior Design", "Award"],
    date: "2024–2025",
    type: "academic",
    icon: "🏗️",
    image: "/assets/projects/research/wastetowatts/win.webp",
  },
  {
    id: 5,
    title: "Super Bowl LVIII Halftime Show",
    subtitle: "Field Team Performer — Allegiant Stadium",
    description:
      "Performed live during Super Bowl LVIII halftime show, executing choreography as part of a large coordinated field team.",
    expandedDescription:
      "For Super Bowl LVIII, I joined the on-field team responsible for live halftime visuals. We rehearsed choreography and formations for weeks, then executed them in front of a global audience, hitting cues to the second while coordinating with hundreds of other performers and stage elements.",
    highlight:
      "Learned how preparation, timing, and trust in a large team come together under intense live pressure.",
    tags: ["Performance", "Teamwork"],
    date: "2024",
    type: "event",
    icon: "🏈",
    image: "/assets/projects/clubs/superbowl.jpeg",
  },
  {
    id: 6,
    title: "Dean’s Honor List",
    subtitle: "UNLV Honors & College of Engineering",
    description:
      "Recognized for academic excellence and sustained high GPA across rigorous honors and engineering coursework.",
    expandedDescription:
      "Making the Dean’s List in both the Honors College and College of Engineering reflects consistent performance in math-heavy courses, lab work, and writing-intensive seminars. It also represents balancing academics with research, outreach, and work commitments.",
    highlight:
      "Learned how to sustain high performance while juggling labs, projects, and outside responsibilities.",
    tags: ["Academic Excellence"],
    date: "2022, 2023",
    type: "academic",
    icon: "🏅",
    image: "/assets/projects/clubs/honors.webp",
  },
  {
    id: 7,
    title: "Outstanding Graduate Nominee",
    subtitle: "UNLV Honors College",
    description:
      "Nominated for Outstanding Graduate based on academic impact, leadership, and contributions to the Honors community.",
    expandedDescription:
      "The Outstanding Graduate nomination considered my academic work, involvement in research, and contributions to community life within the Honors College—especially around storytelling, education, and mentoring other students navigating interdisciplinary paths.",
    highlight:
      "Learned how consistent contributions over time can quietly build into visible impact and recognition.",
    tags: ["Recognition", "Leadership"],
    date: "2022",
    type: "academic",
    icon: "🎓",
    image: "/assets/projects/clubs/outstanding.JPG",
  },
  {
    id: 8,
    title: "UNLV Honors Research Symposium",
    subtitle: "Presenter — Lethal Learning",
    description:
      "Presented research on school safety, policy loops, and systemic failure in education at the 2022 Honors Symposium.",
    expandedDescription:
      "Lethal Learning examined how delayed policy responses and fragmented systems shape school safety outcomes. I developed visuals, narrative structure, and a live talk that walked through failure modes and potential redesigns of the system.",
    highlight:
      "Learned how to communicate complex, emotionally heavy systems work in a way that people can actually absorb.",
    tags: ["Research", "Public Speaking"],
    date: "2022",
    type: "research",
    icon: "📢",
    image: "/assets/projects/clubs/lethal.jpeg",
  },
  {
    id: 9,
    title: "GenCyber Camp — 1st Place",
    subtitle: "Cybersecurity Competition",
    description:
      "Won 1st place by completing digital forensics, security challenges, and defense scenarios in a competitive camp setting.",
    expandedDescription:
      "Our team worked through escalating cybersecurity challenges, including basic scripting, forensics, and system defense. We coordinated problem solving under time pressure, dividing tasks by strength to secure the top spot.",
    highlight:
      "Learned how role clarity and fast communication give small teams an edge in technical competitions.",
    tags: ["Cybersecurity", "Competition"],
    date: "2019",
    type: "competition",
    icon: "💻",
    image: "/assets/projects/clubs/gencyber.jpeg",
  },
  {
    id: 10,
    title: "APWA Student Chapter Member",
    subtitle: "UNLV APWA Club",
    description:
      "Engaged with public works professionals, attended technical talks, and explored careers in transportation and infrastructure.",
    expandedDescription:
      "Through APWA events, I’ve been exposed to real-world public works challenges in transportation, water, and municipal infrastructure. Speaker events and site-focused conversations helped connect classroom topics to the systems that keep cities running.",
    highlight:
      "Learned how public agencies think about risk, budgets, and long-term maintenance when planning projects.",
    tags: ["Public Works", "Networking"],
    date: "2024–Present",
    type: "club",
    icon: "🏙️",
    image: "/assets/projects/clubs/APWA.JPG",
  },
  {
    id: 11,
    title: "AGC Heavy Civil Team",
    subtitle: "UNLV AGC Competition Team",
    description:
      "Competed on the Heavy Civil team, developing bids, schedules, and means-and-methods under real-world time pressure.",
    expandedDescription:
      "On the AGC Heavy Civil team, I helped with quantities, basic crew selections, and schedule logic for a mock project. The work simulated a compressed preconstruction window, forcing us to prioritize scope clarity, production assumptions, and risk in our bid.",
    highlight:
      "Learned how small changes in production assumptions and crew choices cascade through cost and schedule.",
    tags: ["Construction", "Competition"],
    date: "2024",
    type: "competition",
    icon: "🚧",
    image: "/assets/projects/clubs/agc.JPG",
  },
];

const loopingExperiences = [...experiences, ...experiences];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Experience | null>(null);

  // movement state
  const offsetRef = useRef(0);
  const velocityRef = useRef(-70);
  const lastTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const baseSpeed = -70;
  const maxSpeed = 260;
  const deadZone = 0.12;

  // tablet/phone detection
  const [isTouchLike, setIsTouchLike] = useState(false);

  // ✅ bottom fill to prevent next section peeking
  const [bottomFill, setBottomFill] = useState(0);

  // detect touch-like devices (iPad Safari = hover none)
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setIsTouchLike(mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // reset dt if Safari backgrounds/returns
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") {
        lastTimeRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // ✅ compute bottom spacer so THIS section fills viewport (no research peek)
  useEffect(() => {
    const computeFill = () => {
      const el = sectionRef.current;
      if (!el) return;

      const vh =
        (window.visualViewport && window.visualViewport.height) ||
        window.innerHeight ||
        0;

      // scrollHeight can be smaller than viewport on tablet
      const needed = Math.max(0, vh - el.scrollHeight);

      // small buffer ensures nothing peeks due to rounding
      setBottomFill(needed + 10);
    };

    computeFill();

    const onResize = () => computeFill();
    window.addEventListener("resize", onResize);

    // observe height changes (images/fonts)
    let ro: ResizeObserver | null = null;
    if (sectionRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => computeFill());
      ro.observe(sectionRef.current);
    }

    // iPad sometimes shifts layout after load
    const t1 = window.setTimeout(computeFill, 250);
    const t2 = window.setTimeout(computeFill, 900);

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  // ✅ continuous looping animation (robust wrap for iPad)
  useEffect(() => {
    const animate = (time: number) => {
      const track = trackRef.current;
      if (!track) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (lastTimeRef.current == null) lastTimeRef.current = time;

      // dt clamp prevents huge jump causing “blank gap” / black
      let dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      dt = Math.min(dt, 0.035);

      // touch-like devices: always keep moving
      if (isTouchLike) velocityRef.current = baseSpeed;

      const totalWidth = track.scrollWidth / 2 || 1;

      offsetRef.current += velocityRef.current * dt;

      // ✅ modulo wrap ensures offset always stays in (-totalWidth, 0]
      let x = offsetRef.current;
      x = ((x % totalWidth) + totalWidth) % totalWidth; // [0, totalWidth)
      x = x - totalWidth; // (-totalWidth, 0]
      offsetRef.current = x;

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      lastTimeRef.current = null;
    };
  }, [isTouchLike]);

  // close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchLike) return;

      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const center = rect.width / 2;

      const normalized = (x - center) / center;
      const abs = Math.abs(normalized);

      if (abs < deadZone) {
        velocityRef.current = 0;
        return;
      }

      const intensity = (abs - deadZone) / (1 - deadZone);
      const speed = maxSpeed * intensity;

      velocityRef.current = speed * Math.sign(normalized);
    },
    [isTouchLike]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isTouchLike) velocityRef.current = baseSpeed;
  }, [isTouchLike]);

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="highlights-section"
      id="experience"
      // ✅ helps prevent “peek” via layout rounding on iPad Safari
      style={{ minHeight: "100svh" }}
    >
      <div className="highlights-container">
        <div className="highlights-header">
          <h2 className="highlights-title">Featured Highlights</h2>
          <p className="highlights-subtitle">
            A curated reel of projects, awards, performances, and leadership
            roles.
          </p>
        </div>

        {/* DESKTOP / TABLET: auto-scrolling gallery */}
        <div
          className="scrolling-gallery"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="scrolling-track" ref={trackRef}>
            {loopingExperiences.map((exp, index) => (
              <div
                key={`${exp.id}-${index}`}
                className="gallery-card"
                role="button"
                tabIndex={0}
                onClick={() => setSelected(exp)}
              >
                <div className={`card-header ${exp.type}`}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="card-image"
                    loading="lazy"
                  />
                  <div className="card-category">
                    {exp.type.toUpperCase()}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{exp.title}</h3>
                  <p className="card-subtitle">{exp.subtitle}</p>
                  <p className="card-description">{exp.description}</p>

                  <div className="card-meta">
                    {exp.tags.map((tag, idx) => (
                      <span key={idx} className="meta-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE: horizontal swipe carousel */}
        <div className="highlights-mobile-carousel">
          <div className="mobile-carousel-track">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="mobile-carousel-card"
                onClick={() => setSelected(exp)}
                role="button"
                tabIndex={0}
              >
                <span className="mobile-card-arrow">→</span>

                <div className={`stack-header ${exp.type}`}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="card-image"
                    loading="lazy"
                  />
                  <div className="card-category">
                    {exp.type.toUpperCase()}
                  </div>
                </div>

                <div className="stack-content">
                  <h3 className="card-title">{exp.title}</h3>
                  <p className="card-subtitle">{exp.subtitle}</p>
                  <p className="card-description">{exp.description}</p>

                  <div className="card-meta">
                    {exp.tags.map((tag, idx) => (
                      <span key={idx} className="meta-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="card-date">{exp.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Red transition arrow */}
        <div
          className="gallery-scroll-indicator"
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          aria-label="Scroll down"
        >
          <FiChevronDown className="scroll-down-icon" />
        </div>
      </div>

      {/* ✅ Spacer keeps the page black / prevents Research peek on tablet */}
      <div aria-hidden style={{ height: bottomFill }} />

      {/* CENTERED FOCAL CARD OVERLAY */}
      {selected && (
        <div
          className="experience-modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="experience-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="experience-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>

            <div className={`card-header ${selected.type}`}>
              <img
                src={selected.image}
                alt={selected.title}
                className="card-image"
              />
              <div className="card-category">
                {selected.type.toUpperCase()}
              </div>
            </div>

            <div className="card-content">
              <div className="modal-date-row">
                <span className="modal-date">{selected.date}</span>
              </div>

              <h3 className="card-title">{selected.title}</h3>

              <p className="card-description">
                {selected.expandedDescription ?? selected.description}
              </p>

              {selected.highlight && (
                <div className="modal-highlight">
                  <span className="modal-highlight-label">What I learned</span>
                  <p className="modal-highlight-text">{selected.highlight}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
