import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import { SharedModule } from '../../../../shared/shared.module';
import { ContactLinkItem } from '../../models/home-page.models';

@Component({
  selector: 'portfolio-contact-section',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  @Input() public contactLinks: ContactLinkItem[] = [];
  @Input() public isLoading = false;
  @Input() public statusMessage: string | null = null;
  @Input() public statusType: 'success' | 'error' | 'info' | null = null;
  @Output() public formSubmit = new EventEmitter<Event>();

  constructor(private customCursor: CustomCursorComponent) {}

  public onMouseEnter(): void {
    this.customCursor.setIsHovered(true);
  }

  public onMouseLeave(): void {
    this.customCursor.setIsHovered(false);
  }
}
