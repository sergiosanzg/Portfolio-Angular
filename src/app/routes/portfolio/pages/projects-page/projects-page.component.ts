import { Component } from '@angular/core';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
})
export class ProjectsPageComponent {
  public projects = [
    {
      name: 'BeatLine',
      description: 'A music game inspired by Hitster where a random song plays and you have to place it in the right date range.',
      img: '../../../../assets/img/beatLine.webp',
      href: 'https://beatline-music.netlify.app/',
    },
  ];

  constructor(private customCursor: CustomCursorComponent) {}

  public onMouseEnter(): void {
    this.customCursor.setIsHovered(true);
  }

  public onMouseLeave(): void {
    this.customCursor.setIsHovered(false);
  }
}
