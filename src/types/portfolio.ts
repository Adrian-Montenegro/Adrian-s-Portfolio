export interface Project {
    id: string;
    title: string;
    category: 'construction' | 'research' | 'design' | 'academic';
    year: number;
    description: string;
    technologies: string[];
    assets: string[];
    link?: string;
    featured: boolean;
  }
  
  export interface Experience {
    id: string;
    role: string;
    organization: string;
    period: string;
    location: string;
    description: string[];
    skills: string[];
    category: 'professional' | 'academic' | 'leadership';
  }
  
  export interface ResearchPaper {
    id: string;
    title: string;
    authors: string[];
    conference?: string;
    year: number;
    abstract: string;
    pdfUrl: string;
    tags: string[];
  }
  
  export interface Academic {
    id: string;
    institution: string;
    degree: string;
    field: string;
    period: string;
    gpa: string;
    relevantCoursework: string[];
    honors: string[];
  }