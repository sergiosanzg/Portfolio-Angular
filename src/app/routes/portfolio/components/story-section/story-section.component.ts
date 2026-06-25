import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StatItem, StoryPanelItem } from '../../models/home-page.models';

@Component({
  selector: 'portfolio-story-section',
  standalone: true,
  templateUrl: './story-section.component.html',
  styleUrl: './story-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorySectionComponent {
  @Input() public stats: StatItem[] = [];
  @Input() public storyPanels: StoryPanelItem[] = [];
}
