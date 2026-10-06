export type Language = 'en' | 'ur';

export interface Project {
  id: string;
  title: string;
  urTitle: string;
  category: 'ecommerce' | 'games' | 'apps';
  categoryLabel: string;
  urCategoryLabel: string;
  description: string;
  urDescription: string;
  longDescription: string;
  urLongDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  featured: boolean;
  highlights: string[];
  urHighlights: string[];
  year: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend & AI' | 'Tools & Workflows';
  urCategory: string;
  level: number; // 0 - 100
  experienceLevel: string;
  urExperienceLevel: string;
  iconName: string;
  description: string;
  urDescription: string;
  orbitRadius: number; // px from center in desktop orbit
  orbitSpeed: number; // seconds per revolution
  orbitRing: 1 | 2 | 3;
  color: string;
  initialAngle: number; // degrees
}

export interface ExperienceItem {
  id: string;
  role: string;
  urRole: string;
  company: string;
  urCompany: string;
  period: string;
  urPeriod: string;
  location: string;
  urLocation: string;
  type: string;
  urType: string;
  achievements: string[];
  urAchievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  urDegree: string;
  institution: string;
  urInstitution: string;
  period: string;
  urPeriod: string;
  location: string;
  urLocation: string;
  highlights: string[];
  urHighlights: string[];
}
