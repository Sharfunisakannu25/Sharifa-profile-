export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  year: number;
  duration?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  level: number;
}

export interface ExperienceItem {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
  videos: VideoItem[];
  skills: SkillItem[];
  experience: ExperienceItem[];
  socials: SocialLink[];
  contactEmail: string;
}
