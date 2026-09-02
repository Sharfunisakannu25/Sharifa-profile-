import { Injectable, signal, OnDestroy, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService implements OnDestroy {
  private rafId: number | null = null;
  private ticking = false;

  readonly scrollY = signal(0);
  readonly scrollProgress = signal(0);
  readonly viewportHeight = signal(0);

  constructor(private ngZone: NgZone) {
    if (typeof window !== 'undefined') {
      this.viewportHeight.set(window.innerHeight);
      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onResize, { passive: true });
        this.onScroll();
      });
    }
  }

  private onScroll = (): void => {
    if (!this.ticking) {
      this.ticking = true;
      this.rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollY.set(y);
        this.scrollProgress.set(docHeight > 0 ? y / docHeight : 0);
        this.ticking = false;
      });
    }
  };

  private onResize = (): void => {
    this.viewportHeight.set(window.innerHeight);
  };

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    }
  }

  getHeroProgress(element: HTMLElement, offset = 0): number {
    const rect = element.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = offset;
    const end = element.offsetHeight - vh;
    const current = -rect.top;
    const progress = (current - start) / (end - start);
    return Math.max(0, Math.min(1, progress));
  }
}
