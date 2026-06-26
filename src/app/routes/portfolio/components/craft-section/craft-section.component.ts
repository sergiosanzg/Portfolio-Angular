import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CapabilityItem, CraftSectionContent, TimelineStepItem } from '../../models/home-page.models';

@Component({
  selector: 'portfolio-craft-section',
  standalone: true,
  templateUrl: './craft-section.component.html',
  styleUrl: './craft-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CraftSectionComponent {
  @Input() public content!: CraftSectionContent;
  @Input() public capabilities: CapabilityItem[] = [];
  @Input() public timeline: TimelineStepItem[] = [];
}
