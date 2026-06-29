import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loadging-spiner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loadging-spiner.component.html',
  styleUrl: './loadging-spiner.component.scss'
})
export class LoadgingSpinerComponent {
  @Input() color: string = '#454545';
}
