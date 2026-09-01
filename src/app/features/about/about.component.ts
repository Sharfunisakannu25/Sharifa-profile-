import { Component, computed, ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NgZone } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="about" id="about">
      <div class="about__inner">
        <span class="about__label" appReveal>About</span>
        <h2 class="about__statement" appReveal [revealDelay]="100">
          {{ statement() }}
        </h2>
        <span class="about__index" appReveal [revealDelay]="200">01</span>
        <div class="about__circle">
          <div class="about__circle-inner"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: #0A0C0E;
      position: relative;
      overflow: hidden;
    }

    .about__inner {
      width: 100%;
      max-width: 900px;
      padding: 120px 32px;
      position: relative;
    }

    .about__label {
      display: inline-block;
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10.5px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #E8913C;
      margin-bottom: 40px;
    }

    .about__statement {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: clamp(24px, 3.6vw, 52px);
      letter-spacing: -0.03em;
      line-height: 1.2;
      color: #EDE7DC;
      max-width: 22ch;
    }

    .about__statement-accent {
      color: #E8913C;
    }

    .about__index {
      position: absolute;
      top: 120px;
      right: 32px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(80px, 15vw, 200px);
      -webkit-text-stroke: 1px rgba(237, 231, 220, 0.13);
      color: transparent;
      line-height: 1;
      user-select: none;
    }

    .about__circle {
      position: absolute;
      right: -120px;
      top: 50%;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;
      opacity: 0.25;
      will-change: transform;
      transform: translateY(-50%);
    }

    .about__circle-inner {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #2E6B72, #E8913C);
    }

    [appReveal] {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1),
                  transform 0.9s cubic-bezier(0.23, 1, 0.32, 1);
    }

    [appReveal].is-revealed {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .about__inner { padding: 80px 20px; }
      .about__circle { display: none; }
      .about__index { right: 20px; }
    }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('circle') circleRef!: ElementRef<HTMLElement>;

  readonly name = computed(() => this.portfolio.data().name);
  readonly statement = computed(() => this.portfolio.data().bio);

  private cleanup: (() => void) | null = null;

  constructor(
    private portfolio: PortfolioService,
    private ngZone: NgZone,
    private el: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      let rafId = 0;
      const update = () => {
        const section = this.el.nativeElement;
        const circle = section.querySelector<HTMLElement>('.about__circle');
        if (circle) {
          const rect = section.getBoundingClientRect();
          const vh = window.innerHeight;
          const progress = -rect.top / Math.max(1, vh);
          const clamped = Math.max(-0.8, Math.min(0.8, progress));
          const drift = clamped * 30;
          const rotation = clamped * 5;
          circle.style.transform = `translateY(-50%) translateX(${drift}px) rotate(${rotation}deg)`;
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
}