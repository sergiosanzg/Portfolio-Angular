import {
  CapabilityItem,
  ContactLinkItem,
  ProjectItem,
  SkillItem,
  StatItem,
  StoryPanelItem,
  TimelineStepItem,
} from '../models/home-page.models';

export const HOME_SKILLS: SkillItem[] = [
  { name: 'Angular', icon: 'assets/img/angular.webp' },
  { name: 'TypeScript', icon: 'assets/img/ts.webp' },
  { name: 'JavaScript', icon: 'assets/img/js.webp' },
  { name: 'Node.js', icon: 'assets/img/node.webp' },
  { name: 'Sass', icon: 'assets/img/scss.webp' },
  { name: 'HTML', icon: 'assets/img/html.webp' },
];

export const HOME_STORY_PANELS: StoryPanelItem[] = [
  {
    kicker: 'Opening Scene',
    title: 'Interfaces that arrive with atmosphere, then stay readable under pressure.',
    copy:
      'I design and build front-end experiences that feel cinematic on first contact and disciplined in day-to-day use.',
    accent: 'Neon direction',
    tone: 'coral',
  },
  {
    kicker: 'Craft Layer',
    title: 'Motion is there to guide the eye, reinforce hierarchy, and make the product feel alive.',
    copy:
      'I care about transitions, load states, spacing, and responsive behavior because polish should support clarity, not compete with it.',
    accent: 'Motion with intent',
    tone: 'gold',
  },
  {
    kicker: 'Delivery Layer',
    title: 'The build underneath stays pragmatic: maintainable components, API integration, and solid UX decisions.',
    copy: 'That balance between visual ambition and clean engineering is where I do my best work.',
    accent: 'Built to ship',
    tone: 'cyan',
  },
];

export const HOME_STATS: StatItem[] = [
  { value: '17+', label: 'Angular views and modules shaped across projects' },
  { value: '1', label: 'Featured app you can explore directly in this portfolio' },
  { value: '100%', label: 'Responsive-first mindset across layout and interaction' },
];

export const HOME_CAPABILITIES: CapabilityItem[] = [
  {
    title: 'UI Systems',
    description: 'Reusable components, design tokens, and polished states that keep products coherent.',
  },
  {
    title: 'Storytelling Layouts',
    description: 'Landing pages and product surfaces with rhythm, tension, and clear visual pacing.',
  },
  {
    title: 'Product Thinking',
    description: 'Interfaces built around real flows, sensible prioritization, and user confidence.',
  },
];

export const HOME_TIMELINE: TimelineStepItem[] = [
  {
    year: '01',
    title: 'Design-aware frontend',
    copy: 'Turning references and rough ideas into responsive interfaces with a strong visual point of view.',
  },
  {
    year: '02',
    title: 'API-connected products',
    copy: 'Building features that move beyond static layouts: data, auth flows, dashboards, and stateful UI.',
  },
  {
    year: '03',
    title: 'Performance and finish',
    copy: 'Refining load behavior, transitions, and layout systems so the final result feels intentional.',
  },
];

export const HOME_PROJECTS: ProjectItem[] = [
  {
    name: 'BeatLine',
    description: 'A music game inspired by Hitster where a random song plays and you have to place it in the right date range.',
    img: 'assets/img/beatLine.webp',
    href: 'https://beatline-music.netlify.app/',
    tags: ['Music Game', 'Timeline', 'Party Game'],
  },
];

export const HOME_CONTACT_LINKS: ContactLinkItem[] = [
  { label: 'LinkedIn', value: 'sergiiosanz10', href: 'https://www.linkedin.com/in/sergiiosanz10/', icon: 'fa-brands fa-linkedin-in' },
  { label: 'GitHub', value: 'sergiosanzg', href: 'https://github.com/sergiosanzg', icon: 'fa-brands fa-github' },
];
