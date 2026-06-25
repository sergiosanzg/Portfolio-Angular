import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../../../environments/environment';
import { DEF_ABOUT_SHORT_TEXT } from '../../../../core/globalConst';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { CraftSectionComponent } from '../../components/craft-section/craft-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section.component';
import { StorySectionComponent } from '../../components/story-section/story-section.component';
import {
  HOME_CAPABILITIES,
  HOME_CONTACT_LINKS,
  HOME_PROJECTS,
  HOME_SKILLS,
  HOME_STATS,
  HOME_STORY_PANELS,
  HOME_TIMELINE,
} from '../../data/home-page.data';
import { SectionId } from '../../models/home-page.models';

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
  public text: string = DEF_ABOUT_SHORT_TEXT;
  public isLoading = false;
  public statusMessage: string | null = null;
  public statusType: 'success' | 'error' | 'info' | null = null;
  public activeSection: SectionId | null = null;
  public heroProgress = 0;
  public backgroundDrift = 0;
  public showScrollTop = false;
  public readonly skills = HOME_SKILLS;
  public readonly storyPanels = HOME_STORY_PANELS;
  public readonly stats = HOME_STATS;
  public readonly capabilities = HOME_CAPABILITIES;
  public readonly timeline = HOME_TIMELINE;
  public readonly projects = HOME_PROJECTS;
  public readonly contactLinks = HOME_CONTACT_LINKS;

  private sectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;

  public ngAfterViewInit(): void {
    this.observeSections();
    this.observeReveals();
    this.updateScrollState();
  }

  public ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.revealObserver?.disconnect();
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
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
