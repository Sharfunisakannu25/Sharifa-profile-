import { Directive, ElementRef, Input, OnInit, OnDestroy, NgZone } from '@angular/core';
import { AnimationService } from '../../core/services/animation.service';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal = '';
  @Input() revealDelay = 0;

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private animation: AnimationService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.animation.prefersReducedMotion) return;

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => {
              this.el.nativeElement.style.transitionDelay = `${this.revealDelay}ms`;
              this.el.nativeElement.classList.add('is-revealed');
            });
            this.observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}