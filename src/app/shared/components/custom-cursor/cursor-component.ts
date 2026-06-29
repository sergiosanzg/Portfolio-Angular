import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-cursor',
  standalone: true,
  template: `
    <div id="container">
      <div #cursor id="cursor"></div>
      <div #stalker id="stalker"></div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './cursor.component.scss',
})
export class CustomCursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursor') cursor?: ElementRef;
  @ViewChild('stalker') stalker?: ElementRef;
  public isHovered = false;
  private pointerX = 0;
  private pointerY = 0;
  private isEnabled = false;
  private removeMouseMoveListener?: () => void;
  private removeMouseOverListener?: () => void;
  private removeMouseOutListener?: () => void;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isEnabled = this.canUseCustomCursor();
  }

  public ngAfterViewInit(): void {
    if (!this.isEnabled) {
      return;
    }

    this.renderer.addClass(this.document.documentElement, 'custom-cursor-active');
    this.renderer.addClass(this.document.body, 'custom-cursor-active');

    this.removeMouseMoveListener = this.renderer.listen(this.document, 'mousemove', (event: MouseEvent) => {
      requestAnimationFrame(() => {
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
        this.updateCursorTransform();
      });
    });

    this.removeMouseOverListener = this.renderer.listen(this.document, 'mouseover', (event: MouseEvent) => {
      if (this.isInteractiveTarget(event.target)) {
        this.setIsHovered(true);
      }
    });

    this.removeMouseOutListener = this.renderer.listen(this.document, 'mouseout', (event: MouseEvent) => {
      const nextTarget = event.relatedTarget;
      if (this.isInteractiveTarget(nextTarget)) {
        return;
      }

      this.setIsHovered(false);
    });
  }

  public setIsHovered(value: boolean): void {
    if (!this.isEnabled) {
      return;
    }

    this.isHovered = value;
    this.updateCursorTransform();
  }

  public ngOnDestroy(): void {
    if (!this.isEnabled) {
      return;
    }

    this.renderer.removeClass(this.document.documentElement, 'custom-cursor-active');
    this.renderer.removeClass(this.document.body, 'custom-cursor-active');
    this.removeMouseMoveListener?.();
    this.removeMouseOverListener?.();
    this.removeMouseOutListener?.();
  }

  private updateCursorTransform(): void {
    if (this.cursor && this.stalker) {
      this.renderer.setStyle(this.cursor.nativeElement, 'transform', `translate(${this.pointerX}px, ${this.pointerY}px) ${this.isHovered ? 'scale(1.5)' : ''}`);
      this.renderer.setStyle(this.stalker.nativeElement, 'transform', `translate(${this.pointerX}px, ${this.pointerY}px)`);
    }
  }

  private canUseCustomCursor(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
