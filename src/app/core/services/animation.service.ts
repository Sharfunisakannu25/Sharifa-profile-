import { Injectable, NgZone } from '@angular/core';

export interface RevealConfig {
  threshold?: number;
  rootMargin?: string;
}

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private observer: IntersectionObserver | null = null;
  private reducedMotion = false;

  constructor(private ngZone: NgZone) {
    if (typeof window !== 'undefined') {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  get prefersReducedMotion(): boolean {
    return this.reducedMotion;
  }

  observeElements(
    selector: string,
    callback: (el: Element) => void,
    config: RevealConfig = {}
  ): void {
    if (this.reducedMotion) return;

    const { threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = config;

    this.ngZone.runOutsideAngular(() => {
      const elements = document.querySelectorAll(selector);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              callback(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold, rootMargin }
      );

      elements.forEach(el => observer.observe(el));
      this.observer = observer;
    });
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
