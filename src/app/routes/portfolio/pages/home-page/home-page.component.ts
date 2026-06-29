import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { CraftSectionComponent } from '../../components/craft-section/craft-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section.component';
import { StorySectionComponent } from '../../components/story-section/story-section.component';
import {
  HOME_CONTACT_LINKS,
  HOME_DICTIONARY,
  HOME_SKILLS,
} from '../../data/home-page.data';
import { HomePageDictionary, PortfolioLanguage, SectionId } from '../../models/home-page.models';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    StorySectionComponent,
    CraftSectionComponent,
    ProjectsSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  public language: PortfolioLanguage = this.getInitialLanguage();
  public isLoading = false;
  public isMobileNavOpen = false;
  public statusMessage: string | null = null;
  public statusType: 'success' | 'error' | 'info' | null = null;
  public activeSection: SectionId | null = null;
  public heroProgress = 0;
  public backgroundDrift = 0;
  public showScrollTop = false;
  public readonly skills = HOME_SKILLS;
  public readonly contactLinks = HOME_CONTACT_LINKS;

  private sectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public ngAfterViewInit(): void {
    this.observeSections();
    this.observeReveals();
    this.updateScrollState();
    this.updateSeo();
  }

  public ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.revealObserver?.disconnect();
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    this.updateScrollState();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth > 768) {
      this.closeMobileNav();
    }

    this.updateScrollState();
  }

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    this.closeMobileNav();
  }

  public sendEmail(e: Event): void {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const messages = this.content.statusMessages;

    if (!environment.apiKey) {
      this.setStatus(messages.missingApiKey, 'error');
      return;
    }

    const now = Date.now();
    const lastEmailSentAt = this.getCookie('lastEmailSentAt');
    const timeSinceLastEmail = now - (lastEmailSentAt || 0);

    if (timeSinceLastEmail < 30000) {
      this.setStatus(messages.waitBeforeRetry, 'info');
      return;
    }

    this.isLoading = true;
    this.setStatus(messages.sending, 'info');

    import('@emailjs/browser')
      .then(({ default: emailjs }) =>
        emailjs.sendForm('service_odp144d', 'template_bf3ksfr', form, {
          publicKey: environment.apiKey,
        }),
      )
      .then(
        () => {
          this.document.cookie = `lastEmailSentAt=${Date.now()}; path=/`;
          this.setStatus(messages.success, 'success');
          this.isLoading = false;
          form.reset();
        },
        (error: { text?: string }) => {
          console.log('FAILED...', error.text);
          this.setStatus(messages.error, 'error');
          this.isLoading = false;
        },
      );
  }

  public setLanguage(language: PortfolioLanguage): void {
    if (this.language === language) {
      return;
    }

    this.language = language;
    localStorage.setItem('portfolio-language', language);
    this.statusMessage = null;
    this.statusType = null;
    this.closeMobileNav();
    this.updateSeo();

    this.revealObserver?.disconnect();
    requestAnimationFrame(() => {
      this.observeReveals();
      this.updateScrollState();
    });
  }

  public scrollToContact(): void {
    this.closeMobileNav();
    this.scrollToSectionById('contact');
  }

  public scrollToProjects(): void {
    this.closeMobileNav();
    this.scrollToSectionById('projects');
  }

  public scrollToAbout(): void {
    this.closeMobileNav();
    this.scrollToSectionById('about');
  }

  public scrollToExperience(): void {
    this.closeMobileNav();
    this.scrollToSectionById('experience');
  }

  public scrollToTop(): void {
    this.closeMobileNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.activeSection = null;
  }

  public toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  public closeMobileNav(): void {
    this.isMobileNavOpen = false;
  }

  public get content(): HomePageDictionary {
    return HOME_DICTIONARY[this.language];
  }

  public get storyPanels() {
    return this.content.storyPanels;
  }

  public get stats() {
    return this.content.stats;
  }

  public get capabilities() {
    return this.content.capabilities;
  }

  public get timeline() {
    return this.content.timeline;
  }

  public get projects() {
    return this.content.projects;
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

    const aboutSection = document.getElementById('about');
    const experienceSection = document.getElementById('experience');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');

    if (!aboutSection || !experienceSection || !projectsSection || !contactSection) {
      return;
    }

    const activationOffset = this.getNavigationOffset() + 56;
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

  private updateSeo(): void {
    const isSpanish = this.language === 'es';
    const pageTitle = isSpanish
      ? 'Sergio Sanz | Desarrollador Front-end Angular'
      : 'Sergio Sanz | Angular Front-end Developer';
    const description = isSpanish
      ? 'Portfolio de Sergio Sanz, desarrollador front-end especializado en Angular, TypeScript y experiencias web rapidas, visuales y orientadas a producto.'
      : 'Portfolio of Sergio Sanz, a front-end developer focused on Angular, TypeScript, and fast, polished product-minded web experiences.';
    const locale = isSpanish ? 'es_ES' : 'en_US';
    const origin = this.document.location?.origin ?? '';
    const canonicalUrl = `${origin}/`;
    const imageUrl = `${origin}/assets/img/foto2.webp`;

    this.title.setTitle(pageTitle);
    this.document.documentElement.lang = this.language;

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'theme-color', content: '#1b0d1d' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:locale', content: locale });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.updateCanonicalLink(canonicalUrl);
    this.updateStructuredData(description, canonicalUrl, imageUrl);
  }

  private updateCanonicalLink(url: string): void {
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  private updateStructuredData(description: string, url: string, imageUrl: string): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sergio Sanz',
      jobTitle: this.language === 'es' ? 'Desarrollador Front-end' : 'Front-end Developer',
      description,
      url,
      image: imageUrl,
      sameAs: [
        'https://github.com/sergiosanzg',
        'https://www.linkedin.com/in/sergiiosanz10/',
      ],
    };

    let script = this.document.getElementById('portfolio-structured-data') as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = 'portfolio-structured-data';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }

  private getInitialLanguage(): PortfolioLanguage {
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage === 'es' || savedLanguage === 'en') {
      return savedLanguage;
    }

    return 'en';
  }

  private getCookie(name: string): number | null {
    const value = `; ${this.document.cookie}`;
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
    const top = section.getBoundingClientRect().top + window.scrollY - this.getNavigationOffset() - 20;
    window.scrollTo({ top, behavior: 'smooth' });
    this.activeSection = section.id as SectionId;
  }

  private getNavigationOffset(): number {
    if (window.innerWidth <= 768) {
      return 0;
    }

    const nav = this.document.querySelector('.desktop-chip-nav') as HTMLElement | null;
    return nav?.offsetHeight ?? 0;
  }
}
