import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import { ProjectItem } from '../../models/home-page.models';

@Component({
  selector: 'portfolio-projects-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  @Input() public projects: ProjectItem[] = [];

  constructor(private customCursor: CustomCursorComponent) {}

  public onMouseEnter(): void {
    this.customCursor.setIsHovered(true);
  }

  public onMouseLeave(): void {
    this.customCursor.setIsHovered(false);
  }
}
