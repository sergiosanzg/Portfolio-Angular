import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, ElementRef, ViewChild, HostListener, OnDestroy, Inject } from '@angular/core';

@Component({
  selector: 'custom-cursor',
  template: `
    <div id="container">
      <div #cursor id="cursor"></div>
      <div #stalker id="stalker"></div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './cursor.component.scss',
})
export class CustomCursorComponent implements OnDestroy {
  @ViewChild('cursor') cursor?: ElementRef;
  @ViewChild('stalker') stalker?: ElementRef;
  isHovered = false;
  listenerFn?: () => void;
  private pointerX = 0;
  private pointerY = 0;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer.addClass(this.document.documentElement, 'custom-cursor-active');
    this.renderer.addClass(this.document.body, 'custom-cursor-active');
  }



  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    requestAnimationFrame(() => {
      this.pointerX = event.clientX;
      this.pointerY = event.clientY;
      this.updateCursorTransform();
    });
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    if (this.isInteractiveTarget(event.target)) {
      this.setIsHovered(true);
    }
  }

  @HostListener('document:mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    const nextTarget = event.relatedTarget;
    if (this.isInteractiveTarget(nextTarget)) {
      return;
    }

    this.setIsHovered(false);
  }

  setIsHovered(value: boolean) {
    this.isHovered = value;
    this.updateCursorTransform();
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.documentElement, 'custom-cursor-active');
    this.renderer.removeClass(this.document.body, 'custom-cursor-active');
    if (this.listenerFn) {
      this.listenerFn();
    }
  }

  private updateCursorTransform() {
    if (this.cursor && this.stalker) {
      this.renderer.setStyle(this.cursor.nativeElement, 'transform', `translate(${this.pointerX}px, ${this.pointerY}px) ${this.isHovered ? 'scale(1.5)' : ''}`);
      this.renderer.setStyle(this.stalker.nativeElement, 'transform', `translate(${this.pointerX}px, ${this.pointerY}px)`);
    }
  }

  private isInteractiveTarget(target: EventTarget | null): target is HTMLElement {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(
      target.closest('button, a[href], input, textarea, select, summary, [role="button"], [tabindex]:not([tabindex="-1"])'),
    );
  }
}
