export type SectionId = 'about' | 'experience' | 'projects' | 'contact';

export interface SkillItem {
  name: string;
  icon: string;
}

export interface StoryPanelItem {
  kicker: string;
  title: string;
  copy: string;
  accent: string;
  tone: 'coral' | 'gold' | 'cyan';
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
}

export interface TimelineStepItem {
  year: string;
  title: string;
  copy: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  img: string;
  tags: string[];
  route?: string;
  href?: string;
}

export interface ContactLinkItem {
  label: string;
  value: string;
  href: string;
  icon: string;
}
