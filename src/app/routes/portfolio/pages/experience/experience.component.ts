import { AfterViewInit, Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import { SharedModule } from '../../../../shared/shared.module';
import { DEF_ABOUT_TEXT } from '../../../../core/globalConst';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements AfterViewInit {
  public text: string = DEF_ABOUT_TEXT;

  public timelineData = [
    { year: 'April 2024 - June 2024', title: 'Frontend Developer', description: 'I received training in Angular and developed complex applications.', company: 'ViewNext' },
    { year: 'June 2024 - Present', title: 'Frontend Developer', description: 'Working on different projects, developing scalable applications using Angular.', company: 'ViewNext' },
  ];

  constructor(private customCursor: CustomCursorComponent) {}

  @HostListener('window:scroll', ['$event'])
  public onScroll(): void {
    this.checkVisibility();
  }

  public ngAfterViewInit(): void {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item: Element) => {
      const element = item as HTMLElement;
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.8;

      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }

  public onMouseEnter(): void {
    this.customCursor.setIsHovered(true);
  }

  public onMouseLeave(): void {
    this.customCursor.setIsHovered(false);
  }
}
