import { Component, ElementRef, ViewChild, computed, signal, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NgZone } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" #heroSection>
      <div class="hero__stage">
        <div class="hero__image-layer" [style.transform]="imageTransform()">
          <img src="/hero-creative-workspace.jpg" alt="Sharifa — AI Video Editor at work, dual-monitor editing setup with timeline" class="hero__image" loading="eager" decoding="async" />
        </div>
        <div class="hero__duotone" [style.opacity]="duotoneOpacity()"></div>
        <div class="hero__veil"></div>

        <div class="hero__panel hero__panel--left" [style.transform]="panelLeftTransform()"></div>
        <div class="hero__panel hero__panel--right" [style.transform]="panelRightTransform()"></div>

        <div class="hero__dots">
          <span class="hero__dot hero__dot--amber" [style.transform]="dotAmberTransform()"></span>
          <span class="hero__dot hero__dot--teal" [style.transform]="dotTealTransform()"></span>
        </div>

        <div class="hero__wordmark" [style.letter-spacing]="wordmarkLetterSpacing()">
          <span class="hero__wordmark-half hero__wordmark-first" [style.transform]="wordmarkFirstTransform()">{{ nameFirst() }}</span>
          <span class="hero__wordmark-half hero__wordmark-last" [style.transform]="wordmarkLastTransform()">{{ nameLast() }}</span>
        </div>

        <div class="hero__meta hero__meta--top">
          <span class="hero__meta-label">Portfolio</span>
          <span class="hero__meta-year">2026</span>
        </div>
        <div class="hero__meta hero__meta--bottom">
          <span class="hero__meta-label">AI Video Editor</span>
          <span class="hero__meta-label">UAE</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      height: 250vh;
      position: relative;
    }

    .hero__stage {
      position: sticky;
      top: 0;
      height: 100vh;
      overflow: hidden;
      isolation: isolate;
    }

    .hero__image-layer {
      position: absolute;
      inset: -10%;
      will-change: transform;
      background: #0A0C0E;
    }

    .hero__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 35%;
      display: block;
      filter: saturate(0.85) contrast(1.05);
    }

    .hero__duotone {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #2E6B72, #E8913C);
      mix-blend-mode: overlay;
      pointer-events: none;
    }

    .hero__veil {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(10, 12, 14, 0.7) 100%);
      pointer-events: none;
    }

    .hero__panel {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50.5%;
      background: #0A0C0E;
      z-index: 10;
      will-change: transform;
    }

    .hero__panel--left {
      left: 0;
    }

    .hero__panel--right {
      right: 0;
    }

    .hero__dots {
      position: absolute;
      inset: 0;
      z-index: 15;
      pointer-events: none;
    }

    .hero__dot {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      left: calc(50% - 3px);
      top: calc(50% - 3px);
      will-change: transform;
    }

    .hero__dot--amber {
      background: #E8913C;
      box-shadow: 0 0 12px rgba(232, 145, 60, 0.6);
    }

    .hero__dot--teal {
      background: #2E6B72;
      box-shadow: 0 0 12px rgba(46, 107, 114, 0.6);
    }

    .hero__wordmark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      z-index: 20;
      display: flex;
      white-space: nowrap;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(48px, 10vw, 140px);
      text-transform: uppercase;
      color: #EDE7DC;
      will-change: transform, letter-spacing;
      user-select: none;
    }

    .hero__wordmark-half {
      display: inline-block;
      will-change: transform;
    }

    .hero__wordmark-last {
      color: #E8913C;
    }

    .hero__meta {
      position: absolute;
      z-index: 20;
      display: flex;
      gap: 24px;
    }

    .hero__meta--top {
      top: 80px;
      left: 32px;
    }

    .hero__meta--bottom {
      bottom: 40px;
      right: 32px;
    }

    .hero__meta-label {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10.5px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #9EA5A8;
    }

    .hero__meta-year {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10.5px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #E8913C;
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;

  private progress = signal(0);

  readonly nameFirst = computed(() => {
    const name = this.portfolio.data().name.toUpperCase();
    const mid = Math.ceil(name.length / 2);
    return name.slice(0, mid);
  });

  readonly nameLast = computed(() => {
    const name = this.portfolio.data().name.toUpperCase();
    const mid = Math.ceil(name.length / 2);
    return name.slice(mid);
  });

  imageTransform = computed(() => {
    const p = this.progress();
    const scale = 1.08 - (p * 0.08);
    return `scale(${scale})`;
  });

  duotoneOpacity = computed(() => {
    const p = this.progress();
    return (p * 0.2).toString();
  });

  panelLeftTransform = computed(() => {
    const p = this.progress();
    const x = -(p * 112);
    return `translateX(${x}%)`;
  });

  panelRightTransform = computed(() => {
    const p = this.progress();
    const x = p * 112;
    return `translateX(${x}%)`;
  });

  dotAmberTransform = computed(() => {
    const p = this.progress();
    const x = p * 320;
    const y = -p * 220;
    return `translate(${x}px, ${y}px)`;
  });

  dotTealTransform = computed(() => {
    const p = this.progress();
    const x = -p * 320;
    const y = p * 220;
    return `translate(${x}px, ${y}px)`;
  });

  wordmarkLetterSpacing = computed(() => {
    const p = this.progress();
    const spacing = -0.02 - (p * 0.06);
    return `${spacing}em`;
  });

  wordmarkFirstTransform = computed(() => {
    const p = this.progress();
    const scale = 1 + (p * 0.28);
    const x = -p * 45;
    return `translateX(${x}px) scale(${scale})`;
  });

  wordmarkLastTransform = computed(() => {
    const p = this.progress();
    const scale = 1 + (p * 0.28);
    const x = p * 45;
    return `translateX(${x}px) scale(${scale})`;
  });

  constructor(
    private portfolio: PortfolioService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      let rafId = 0;
      const update = () => {
        const el = this.heroSection?.nativeElement;
        if (el) {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          const end = el.offsetHeight - vh;
          const current = -rect.top;
          const p = Math.max(0, Math.min(1, current / Math.max(1, end)));
          this.progress.set(p);
        }
        rafId = requestAnimationFrame(update);
      };
      rafId = requestAnimationFrame(update);
      this.cleanup = () => cancelAnimationFrame(rafId);
    });
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }

  private cleanup: (() => void) | null = null;
}