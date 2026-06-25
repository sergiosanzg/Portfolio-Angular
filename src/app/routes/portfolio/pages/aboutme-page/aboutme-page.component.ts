import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomCursorComponent } from '../../../../shared/components/custom-cursor/cursor-component';
import { SharedModule } from '../../../../shared/shared.module';
import { DEF_ABOUT_TEXT } from '../../../../core/globalConst';

@Component({
  selector: 'app-aboutme-page',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './aboutme-page.component.html',
  styleUrl: './aboutme-page.component.scss',
})
export class AboutmePageComponent {
  public text: string = DEF_ABOUT_TEXT;

  constructor(private customCursor: CustomCursorComponent) {}

  public onMouseEnter(): void {
    this.customCursor.setIsHovered(true);
  }

  public onMouseLeave(): void {
    this.customCursor.setIsHovered(false);
  }
}
