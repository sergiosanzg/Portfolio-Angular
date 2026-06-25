import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../../../environments/environment';
import { DEF_ABOUT_SHORT_TEXT } from '../../../../core/globalConst';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';

type SectionId = 'about' | 'experience' | 'projects' | 'contact';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  text: string = DEF_ABOUT_SHORT_TEXT;
  public isLoading = false;
  public statusMessage: string | null = null;
  public statusType: 'success' | 'error' | 'info' | null = null;
  public activeSection: SectionId | null = null;
  public heroProgress = 0;
  public backgroundDrift = 0;
  public showScrollTop = false;

  private sectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;

  public skills = [
    { name: 'Angular', icon: 'assets/img/angular.webp' },
    { name: 'TypeScript', icon: 'assets/img/ts.webp' },
    { name: 'JavaScript', icon: 'assets/img/js.webp' },
    { name: 'Node.js', icon: 'assets/img/node.webp' },
    { name: 'Sass', icon: 'assets/img/scss.webp' },
    { name: 'HTML', icon: 'assets/img/html.webp' },
  ];

  public storyPanels = [
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
      copy:
        'That balance between visual ambition and clean engineering is where I do my best work.',
      accent: 'Built to ship',
      tone: 'cyan',
    },
  ];

  public stats = [
    { value: '17+', label: 'Angular views and modules shaped across projects' },
    { value: '4', label: 'Featured apps you can explore directly in this portfolio' },
    { value: '100%', label: 'Responsive-first mindset across layout and interaction' },
  ];

  public capabilities = [
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

  public timeline = [
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

  public projects = [
    {
      name: 'BeatLine',
      description: 'A music game inspired by Hitster where a random song plays and you have to place it in the right date range.',
      img: 'assets/img/beatLine.webp',
      href: 'https://beatline-music.netlify.app/',
      tags: ['Music Game', 'Timeline', 'Party Game'],
    },
    // {
    //   name: 'WeatherApp',
    //   description: 'Forecasts, recommendations, and visual weather states with a cleaner interaction layer.',
    //   img: 'assets/img/weather.webp',
    //   route: 'weather',
    //   tags: ['Live API', 'Responsive', 'UI polish'],
    // },
    // {
    //   name: 'Taskify',
    //   description: 'Task management flow with authentication, backend integration, and dashboard logic.',
    //   img: 'assets/img/taskify.webp',
    //   route: 'auth',
    //   tags: ['Angular', 'NestJS', 'Auth'],
    // },
    // {
    //   name: 'Flags Explorer',
    //   description: 'A searchable flag browser focused on speed, filtering, and approachable navigation.',
    //   img: 'assets/img/flags.webp',
    //   route: 'flags',
    //   tags: ['Filters', 'UX', 'Data'],
    // },
    {
      name: 'Maps',
      description: 'Map-based interactions with smooth navigation and a more exploratory product feel.',
      img: 'assets/img/maps.webp',
      route: 'maps',
      tags: ['Mapbox', 'Interaction', 'Frontend'],
    },
  ];

  public contactLinks = [
    { label: 'LinkedIn', value: 'sergiiosanz10', href: 'https://www.linkedin.com/in/sergiiosanz10/', icon: 'fa-brands fa-linkedin-in' },
    { label: 'GitHub', value: 'sergiosanzg', href: 'https://github.com/sergiosanzg', icon: 'fa-brands fa-github' },
  ];

  constructor(private customCursor: CustomCursorComponent) {}

  ngAfterViewInit(): void {
    this.observeSections();
    this.observeReveals();
    this.updateScrollState();
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.revealObserver?.disconnect();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollState();
  }

  public sendEmail(e: Event): void {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (!environment.apiKey) {
      this.setStatus('Missing EmailJS public key in environment.', 'error');
      return;
    }

    const now = Date.now();
    const lastEmailSentAt = this.getCookie('lastEmailSentAt');
    const timeSinceLastEmail = now - (lastEmailSentAt || 0);

    if (timeSinceLastEmail < 30000) {
      this.setStatus('Please wait a bit before sending another message.', 'info');
      return;
    }

    this.isLoading = true;
    this.setStatus('Sending message...', 'info');

    emailjs
      .sendForm('service_odp144d', 'template_bf3ksfr', form, {
        publicKey: environment.apiKey,
      })
      .then(
        () => {
          document.cookie = `lastEmailSentAt=${Date.now()}; path=/`;
          this.setStatus('Message sent successfully. Thank you!', 'success');
          this.isLoading = false;
          form.reset();
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
          this.setStatus('Failed to send. Please try again later.', 'error');
          this.isLoading = false;
        },
      );
  }

  public onMouseEnter(): void {
    this.customCursor.setIsHovered(true);
  }

  public onMouseLeave(): void {
    this.customCursor.setIsHovered(false);
  }

  public scrollToContact(): void {
    this.scrollToSectionById('contact');
  }

  public scrollToProjects(): void {
    this.scrollToSectionById('projects');
  }

  public scrollToAbout(): void {
    this.scrollToSectionById('about');
  }

  public scrollToExperience(): void {
    this.scrollToSectionById('experience');
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.activeSection = null;
  }

  private observeSections(): void {
    const sections = ['about', 'experience', 'projects', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target?.id) {
          this.activeSection = top.target.id as SectionId;
        }
      },
      {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.55, 0.75],
      },
    );

    sections.forEach((section) => this.sectionObserver?.observe(section));
  }

  private observeReveals(): void {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    revealItems.forEach((item) => this.revealObserver?.observe(item));
  }

  private updateScrollState(): void {
    const viewportHeight = window.innerHeight || 1;
    const currentScroll = window.scrollY || 0;
    this.heroProgress = Math.min(currentScroll / viewportHeight, 1);
    this.backgroundDrift = Math.min(currentScroll / (viewportHeight * 3), 1);
    this.showScrollTop = currentScroll > viewportHeight * 0.65;

    const nav = document.querySelector('.chip-nav') as HTMLElement | null;
    const navHeight = nav?.offsetHeight ?? 0;
    const aboutSection = document.getElementById('about');
    const experienceSection = document.getElementById('experience');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');

    if (!aboutSection || !experienceSection || !projectsSection || !contactSection) {
      return;
    }

    const activationOffset = navHeight + 56;
    const aboutStart = aboutSection.offsetTop - activationOffset;
    const experienceStart = experienceSection.offsetTop - activationOffset;
    const projectsStart = projectsSection.offsetTop - activationOffset;
    const contactStart = contactSection.offsetTop - activationOffset;

    if (currentScroll < aboutStart) {
      this.activeSection = null;
      return;
    }

    if (currentScroll < experienceStart) {
      this.activeSection = 'about';
      return;
    }

    if (currentScroll < projectsStart) {
      this.activeSection = 'experience';
      return;
    }

    if (currentScroll < contactStart) {
      this.activeSection = 'projects';
      return;
    }

    this.activeSection = 'contact';
  }

  private setStatus(message: string, type: 'success' | 'error' | 'info'): void {
    this.statusMessage = message;
    this.statusType = type;
  }

  private getCookie(name: string): number | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return Number(cookieValue);
    }
    return null;
  }

  private scrollToSectionById(id: SectionId): void {
    const section = document.getElementById(id);
    if (section) {
      this.scrollToSection(section);
    }
  }

  private scrollToSection(section: HTMLElement): void {
    const nav = document.querySelector('.chip-nav') as HTMLElement | null;
    const navHeight = nav?.offsetHeight ?? 0;
    const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 20;
    window.scrollTo({ top, behavior: 'smooth' });
    this.activeSection = section.id as SectionId;
  }
}
