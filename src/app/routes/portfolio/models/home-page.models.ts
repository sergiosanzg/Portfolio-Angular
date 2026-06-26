export type SectionId = 'about' | 'experience' | 'projects' | 'contact';
export type PortfolioLanguage = 'es' | 'en';

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

export interface NavLabels {
  about: string;
  experience: string;
  projects: string;
  contact: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  leadPrefix: string;
  leadSuffix: string;
  primaryCta: string;
  secondaryCta: string;
  availability: string;
  panelLabel: string;
  panelTitle: string;
  portraitAlt: string;
}

export interface StorySectionContent {
  eyebrow: string;
  title: string;
  stageKicker: string;
  stageTitle: string;
  stageCopy: string;
}

export interface CraftSectionContent {
  eyebrow: string;
  title: string;
}

export interface ProjectsSectionContent {
  eyebrow: string;
  title: string;
  previewAltSuffix: string;
}

export interface ContactSectionContent {
  eyebrow: string;
  title: string;
  copy: string;
  panelLabel: string;
  panelTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitIdle: string;
  submitLoading: string;
}

export interface StatusMessages {
  missingApiKey: string;
  waitBeforeRetry: string;
  sending: string;
  success: string;
  error: string;
}

export interface HomePageDictionary {
  aboutText: string;
  nav: NavLabels;
  hero: HeroContent;
  storySection: StorySectionContent;
  craftSection: CraftSectionContent;
  projectsSection: ProjectsSectionContent;
  contactSection: ContactSectionContent;
  storyPanels: StoryPanelItem[];
  stats: StatItem[];
  capabilities: CapabilityItem[];
  timeline: TimelineStepItem[];
  projects: ProjectItem[];
  statusMessages: StatusMessages;
}
