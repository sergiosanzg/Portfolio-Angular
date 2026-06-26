import {
  CapabilityItem,
  ContactLinkItem,
  HomePageDictionary,
  PortfolioLanguage,
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
    description:
      'A music game inspired by Hitster where a random song plays and you have to place it in the right date range.',
    img: 'assets/img/beatLine.webp',
    href: 'https://beatline-music.netlify.app/',
    tags: ['Music Game', 'Timeline', 'Party Game'],
  },
  {
    name: 'TradesView',
    description:
      'An advanced trading dashboard focused on operation statistics, performance tracking, and extra tools for analyzing trading activity.',
    img: 'assets/img/tradesView.webp',
    href: 'https://trades-view.netlify.app/',
    tags: ['Trading Dashboard', 'Analytics', 'Performance'],
  },
];

export const HOME_CONTACT_LINKS: ContactLinkItem[] = [
  { label: 'LinkedIn', value: 'sergiiosanz10', href: 'https://www.linkedin.com/in/sergiiosanz10/', icon: 'fa-brands fa-linkedin-in' },
  { label: 'GitHub', value: 'sergiosanzg', href: 'https://github.com/sergiosanzg', icon: 'fa-brands fa-github' },
];

export const HOME_DICTIONARY: Record<PortfolioLanguage, HomePageDictionary> = {
  es: {
    aboutText:
      'Hola, soy Sergio Sanz, desarrollador front-end apasionado por crear experiencias web interactivas, eficientes y con una ejecucion visual cuidada.',
    nav: {
      about: 'Perfil',
      experience: 'Estilo',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      eyebrow: 'Sergio Sanz Front-end Developer',
      title: 'Storytelling visual potente con ejecucion pensada como producto.',
      leadPrefix: 'Hola, soy Sergio Sanz, desarrollador front-end apasionado por crear experiencias web interactivas, eficientes y con una ejecucion visual cuidada.',
      leadSuffix: 'Creo interfaces inmersivas que siguen siendo claras, rapidas y usables cuando el impacto visual se asienta.',
      primaryCta: 'Ver proyectos',
      secondaryCta: 'Hablemos',
      availability: 'Disponible para colaboraciones freelance, producto e interfaces con foco en UI.',
      panelLabel: 'Sonando ahora',
      panelTitle: 'Angular, TypeScript, Sass y una mirada fuerte para la animacion y la composicion.',
      portraitAlt: 'Retrato de Sergio Sanz',
    },
    storySection: {
      eyebrow: 'Perfil',
      title: 'Una superficie cinematica con una base solida por debajo.',
      stageKicker: 'Direccion visual',
      stageTitle: 'Inspirado en paginas premium: capas, contraste profundo y scroll guiado.',
      stageCopy:
        'La meta no es imitar por imitar. Es usar esa misma sensacion de impulso para presentar tu trabajo como si fuera un lanzamiento de producto.',
    },
    craftSection: {
      eyebrow: 'Estilo',
      title: 'Como se sostiene el trabajo cuando el apartado visual ya ha captado la atencion.',
    },
    projectsSection: {
      eyebrow: 'Proyectos',
      title: 'Trabajos seleccionados presentados como lanzamientos, no como una cuadricula plana de enlaces.',
      previewAltSuffix: 'vista previa',
    },
    contactSection: {
      eyebrow: 'Contacto',
      title: 'Que el portfolio abra con impacto y cierre con un siguiente paso claro.',
      copy:
        'Si quieres un portfolio, landing page o interfaz de producto con mas presencia visual y mejor movimiento, podemos construirlo juntos.',
      panelLabel: 'Mensaje directo',
      panelTitle: 'Cuentame la idea y te respondo rapido.',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Email',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuentame que quieres construir',
      submitIdle: 'Enviar mensaje',
      submitLoading: 'Enviando...',
    },
    storyPanels: [
      {
        kicker: 'Escena inicial',
        title: 'Interfaces que entran con atmosfera y se mantienen legibles bajo presion.',
        copy:
          'Diseno y desarrollo experiencias front-end que se sienten cinematograficas al primer vistazo y disciplinadas en el uso diario.',
        accent: 'Direccion neon',
        tone: 'coral',
      },
      {
        kicker: 'Capa de detalle',
        title: 'El movimiento guia la mirada, refuerza la jerarquia y hace que el producto se sienta vivo.',
        copy:
          'Cuido transiciones, estados de carga, espaciado y responsive porque el pulido debe apoyar la claridad, no competir con ella.',
        accent: 'Movimiento con intencion',
        tone: 'gold',
      },
      {
        kicker: 'Capa de entrega',
        title: 'La base tecnica sigue siendo pragmatica: componentes mantenibles, integracion con APIs y buenas decisiones de UX.',
        copy:
          'Ese equilibrio entre ambicion visual e ingenieria limpia es donde mejor trabajo.',
        accent: 'Listo para lanzar',
        tone: 'cyan',
      },
    ],
    stats: [
      { value: '17+', label: 'Vistas y modulos Angular construidos a lo largo de distintos proyectos' },
      { value: '1', label: 'Aplicacion destacada que puedes explorar directamente en este portfolio' },
      { value: '100%', label: 'Mentalidad responsive-first en layout e interaccion' },
    ],
    capabilities: [
      {
        title: 'Sistemas UI',
        description: 'Componentes reutilizables, design tokens y estados pulidos para mantener coherencia.',
      },
      {
        title: 'Layouts narrativos',
        description: 'Landings y superficies de producto con ritmo, tension y una cadencia visual clara.',
      },
      {
        title: 'Vision de producto',
        description: 'Interfaces construidas sobre flujos reales, prioridades sensatas y confianza del usuario.',
      },
    ],
    timeline: [
      {
        year: '01',
        title: 'Frontend con sensibilidad de diseno',
        copy: 'Transformando referencias e ideas iniciales en interfaces responsive con identidad visual clara.',
      },
      {
        year: '02',
        title: 'Productos conectados a APIs',
        copy: 'Desarrollando funcionalidades que van mas alla del layout estatico: datos, auth, dashboards y UI con estado.',
      },
      {
        year: '03',
        title: 'Rendimiento y acabado',
        copy: 'Afinando cargas, transiciones y sistemas de layout para que el resultado final se sienta intencional.',
      },
    ],
    projects: [
      {
        name: 'BeatLine',
        description:
          'Un juego musical inspirado en Hitster donde suena una cancion aleatoria y debes colocarla en el rango de fechas correcto.',
        img: 'assets/img/beatLine.webp',
        href: 'https://beatline-music.netlify.app/',
        tags: ['Juego musical', 'Timeline', 'Party Game'],
      },
      {
        name: 'TradesView',
        description:
          'Un dashboard avanzado de trading centrado en estadisticas operativas, seguimiento del rendimiento y herramientas extra de analisis.',
        img: 'assets/img/tradesView.webp',
        href: 'https://trades-view.netlify.app/',
        tags: ['Trading Dashboard', 'Analytics', 'Performance'],
      },
    ],
    statusMessages: {
      missingApiKey: 'Falta la clave publica de EmailJS en el entorno.',
      waitBeforeRetry: 'Espera un poco antes de enviar otro mensaje.',
      sending: 'Enviando mensaje...',
      success: 'Mensaje enviado correctamente. Gracias.',
      error: 'No se pudo enviar. Intentalo de nuevo mas tarde.',
    },
  },
  en: {
    aboutText:
      'Hello! My name is Sergio Sanz, and I am a passionate front-end developer focused on interactive, efficient, and polished web experiences.',
    nav: {
      about: 'Profile',
      experience: 'Craft',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Sergio Sanz Front-end Developer',
      title: 'Bold portfolio storytelling with product-minded execution.',
      leadPrefix: 'Hello! My name is Sergio Sanz, and I am a passionate front-end developer focused on interactive, efficient, and polished web experiences.',
      leadSuffix: 'I build immersive interfaces that still feel sharp, fast, and usable when the visuals settle.',
      primaryCta: 'Explore Work',
      secondaryCta: 'Start a Conversation',
      availability: 'Available for freelance, product, and UI-focused collaborations.',
      panelLabel: 'Now Playing',
      panelTitle: 'Angular, TypeScript, Sass, and a strong eye for motion and layout.',
      portraitAlt: 'Portrait of Sergio Sanz',
    },
    storySection: {
      eyebrow: 'Profile',
      title: 'A cinematic surface with a reliable build underneath.',
      stageKicker: 'Visual Direction',
      stageTitle: 'Inspired by premium campaign pages: layered media, deep contrast, and guided scroll.',
      stageCopy:
        'The goal is not imitation for its own sake. It is using that same sense of momentum to present your work like a product launch.',
    },
    craftSection: {
      eyebrow: 'Craft',
      title: 'How the work holds together once the visuals have your attention.',
    },
    projectsSection: {
      eyebrow: 'Projects',
      title: 'Selected builds presented like feature drops, not a flat grid of links.',
      previewAltSuffix: 'preview',
    },
    contactSection: {
      eyebrow: 'Contact',
      title: 'Let the portfolio open with impact and close with a clear next step.',
      copy:
        'If you want a portfolio, landing page, or product UI with stronger visual presence and cleaner motion, we can build it together.',
      panelLabel: 'Direct Message',
      panelTitle: 'Share the brief and I will get back to you quickly.',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me what you want to build',
      submitIdle: 'Send Message',
      submitLoading: 'Sending...',
    },
    storyPanels: HOME_STORY_PANELS,
    stats: HOME_STATS,
    capabilities: HOME_CAPABILITIES,
    timeline: HOME_TIMELINE,
    projects: HOME_PROJECTS,
    statusMessages: {
      missingApiKey: 'Missing EmailJS public key in environment.',
      waitBeforeRetry: 'Please wait a bit before sending another message.',
      sending: 'Sending message...',
      success: 'Message sent successfully. Thank you!',
      error: 'Failed to send. Please try again later.',
    },
  },
};
