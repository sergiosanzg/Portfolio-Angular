import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CapabilityItem, TimelineStepItem } from '../../models/home-page.models';

@Component({
  selector: 'portfolio-craft-section',
  standalone: true,
  templateUrl: './craft-section.component.html',
  styleUrl: './craft-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CraftSectionComponent {
  @Input() public capabilities: CapabilityItem[] = [];
  @Input() public timeline: TimelineStepItem[] = [];
}
