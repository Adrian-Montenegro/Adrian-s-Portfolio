import { Experience } from '../types/portfolio';

export const experiences: Experience[] = [
  {
    id: 'superbowl-lviii',
    role: 'Field Operations Crew',
    organization: 'Super Bowl LVIII Halftime Show',
    period: 'Jan 2024 - Feb 2024',
    location: 'Las Vegas, NV',
    description: [
      'Managed field logistics and stage assembly for broadcast reaching 120M+ viewers',
      'Coordinated with production teams to ensure structural integrity under extreme time constraints',
      'Implemented safety compliance protocols for high-pressure live event environment'
    ],
    skills: ['Logistics Management', 'Structural Safety', 'Team Coordination', 'Crisis Management'],
    category: 'professional'
  },
  {
    id: 'kiewit-intern',
    role: 'Construction Engineering Intern',
    organization: 'Kiewit Infrastructure',
    period: 'May 2023 - Aug 2023',
    location: 'San Francisco, CA',
    description: [
      'Assisted in structural analysis and site supervision for $45M bridge replacement project',
      'Conducted material testing and quality control documentation for concrete and steel components',
      'Developed progress reports and maintained project documentation systems'
    ],
    skills: ['Structural Analysis', 'Quality Control', 'Project Documentation', 'Site Supervision'],
    category: 'professional'
  }
];