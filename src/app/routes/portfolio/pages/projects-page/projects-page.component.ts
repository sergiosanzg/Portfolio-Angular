import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
})
export class ProjectsPageComponent {
  public projects = [
    {
      name: 'WeatherApp',
      description: 'This is an app to check the weather of cities.',
      img: '../../../../assets/img/weather.webp',
      route: 'weather'
    },
    {
      name: 'Taskify',
      description: 'This is an application to organize tasks. It has a backend built with NestJS.',
      img: '../../../../assets/img/taskify.webp',
      route: 'auth'
    },
    {
      name: 'Flags',
      description: 'This is an application flags.',
      img: '../../../../assets/img/flags.webp',
      route: 'flags'
    },
    {
      name: 'Maps',
      description: 'This is an application Maps.',
      img: '../../../../assets/img/maps.webp',
      route: 'maps'
    },
    {
      name: 'Country App',
      description: 'This is an app to search for capitals.',
      img: '../../../../assets/img/country.webp',
      route: 'countries'
    },
    {
      name: 'TaskList',
      description: 'This is an application to organize tasks.',
      img: '../../../../assets/img/task.webp',
      route: 'tasks',
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
