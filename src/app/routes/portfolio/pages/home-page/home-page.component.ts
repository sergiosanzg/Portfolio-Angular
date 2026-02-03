import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import {DEF_ABOUT_SHORT_TEXT} from "../../../../core/globalConst";
import { environment } from '../../../../../environments/environment';

type SectionId = 'about' | 'experience' | 'projects' | 'contact';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit, OnDestroy {

  text: string = DEF_ABOUT_SHORT_TEXT;
  public isLoading: boolean = false;
  public statusMessage: string | null = null;
  public statusType: 'success' | 'error' | 'info' | null = null;
  public activeSection: SectionId = 'about';
  private sectionObserver?: IntersectionObserver;

  public skills = [
    { name: 'Angular', icon: 'assets/img/angular.webp' },
    { name: 'TypeScript', icon: 'assets/img/ts.webp' },
    { name: 'JavaScript', icon: 'assets/img/js.webp' },
    { name: 'HTML', icon: 'assets/img/html.webp' },
    { name: 'CSS', icon: 'assets/img/css.webp' },
    { name: 'Sass', icon: 'assets/img/scss.webp' },
    { name: 'Node.js', icon: 'assets/img/node.webp' },
    { name: 'Bootstrap', icon: 'assets/img/boots.webp' },
  ];

  public projects = [
    {
      name: 'WeatherApp',
      description: 'Weather app with live forecasts and a clean UI.',
      img: 'assets/img/weather.webp',
      route: 'weather',
      tags: ['API', 'Responsive', 'UI'],
    },
    {
      name: 'Taskify',
      description: 'Task manager with auth flow and backend integration.',
      img: 'assets/img/taskify.webp',
      route: 'auth',
      tags: ['Angular', 'NestJS', 'Auth'],
    },
    {
      name: 'Flags Explorer',
      description: 'Browse and filter flags with a fast search.',
      img: 'assets/img/flags.webp',
      route: 'flags',
      tags: ['Filters', 'UX', 'Data'],
    },
    {
      name: 'Maps',
      description: 'Interactive maps with smooth navigation.',
      img: 'assets/img/maps.webp',
      route: 'maps',
      tags: ['Maps', 'UX', 'UI'],
    },
  ];

  public capabilities = [
    {
      title: 'UI Engineering',
      description: 'Component systems, layouts, and responsive behavior built for clarity.',
    },
    {
      title: 'Performance Minded',
      description: 'Lean assets, sensible animations, and fast, stable interfaces.',
    },
    {
      title: 'Design + Dev',
      description: 'Bridging aesthetics and implementation so ideas ship cleanly.',
    },
  ];

  public focusAreas = [
    'Bento layouts and storytelling',
    'Design systems and tokenized UI',
    'Accessible interactions and motion',
  ];


  constructor(private customCursor: CustomCursorComponent) { }

  ngAfterViewInit(): void {
    const sections = ['about', 'projects', 'experience',  'contact']
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
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.4, 0.6],
      },
    );

    sections.forEach((section) => this.sectionObserver?.observe(section));
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (!environment.apiKey) {
      this.setStatus('Missing EmailJS public key in environment.', 'error');
      return;
    }

    const now = Date.now();
    const lastEmailSentAt = this.getCookie('lastEmailSentAt');
    const timeSinceLastEmail = now - (lastEmailSentAt || 0);

    // Limit emails to one every 30 seconds
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

  private setStatus(message: string, type: 'success' | 'error' | 'info') {
    this.statusMessage = message;
    this.statusType = type;
  }

  private getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return Number(cookieValue);
    }
    return null;
  }

  onMouseEnter() {
    this.customCursor.setIsHovered(true);
  }

  onMouseLeave() {
    this.customCursor.setIsHovered(false);
  }

  public scrollToContact() {
    const section = document.getElementById('contact');
    if (section) {
      this.scrollToSection(section);
    }
  }

  public scrollToProjects() {
    const section = document.getElementById('projects');
    if (section) {
      this.scrollToSection(section);
    }
  }

  public scrollToAbout() {
    const section = document.getElementById('about');
    if (section) {
      this.scrollToSection(section);
    }
  }

  public scrollToExperience() {
    const section = document.getElementById('experience');
    if (section) {
      this.scrollToSection(section);
    }
  }

  private scrollToSection(section: HTMLElement) {
    const nav = document.querySelector('.chip-nav') as HTMLElement | null;
    const navHeight = nav?.offsetHeight ?? 0;
    const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
    this.activeSection = section.id as SectionId;
  }
}
