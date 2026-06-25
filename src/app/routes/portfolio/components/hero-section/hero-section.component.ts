import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import { SkillItem } from '../../models/home-page.models';

@Component({
  selector: 'portfolio-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  @Input() public text = '';
  @Input() public skills: SkillItem[] = [];
  @Input() public heroProgress = 0;
  @Output() public projectsClick = new EventEmitter<void>();
  @Output() public contactClick = new EventEmitter<void>();

  constructor(private customCursor: CustomCursorComponent) {}

  public onMouseEnter(): void {
    this.customCursor.setIsHovered(true);
  }

  public onMouseLeave(): void {
    this.customCursor.setIsHovered(false);
  }
}
