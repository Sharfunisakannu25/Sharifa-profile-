import { Component, signal, computed, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { VideoItem } from '../../core/models/portfolio.models';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface DeckCard {
  video: VideoItem;
  transform: string;
  z: number;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="portfolio" id="work">
      <div class="portfolio__inner">
        <div class="portfolio__info">
          <h2 class="portfolio__headline" appReveal>Selected Work</h2>
          <p class="portfolio__lede" appReveal [revealDelay]="100">A curated collection of AI-powered video edits and generated visuals, showcasing the fusion of creative storytelling with cutting-edge artificial intelligence.</p>
          <div class="portfolio__buttons" appReveal [revealDelay]="200">
            <a href="#contact" class="portfolio__btn portfolio__btn--primary">Get in Touch</a>
            <a href="https://vimeo.com" target="_blank" class="portfolio__btn portfolio__btn--ghost">View All on Vimeo</a>
          </div>
        </div>

        <div class="portfolio__deck-wrapper" appReveal [revealDelay]="150">
          <div class="portfolio__deck" #deck
               tabindex="0"
               (pointerdown)="onPointerDown($event)"
               (pointermove)="onPointerMove($event)"
               (pointerup)="onPointerUp()"
               (keydown)="onKeyDown($event)"
               role="region"
               aria-label="Video portfolio cards">
            @for (card of cards(); track card.video.id; let i = $index) {
              <div class="portfolio__card"
                   [class.portfolio__card--active]="i === activeIndex()"
                   [style.transform]="card.transform"
                   [style.z-index]="card.z">
                <div class="portfolio__card-inner">
                  <div class="portfolio__card-video">
                    @if (isEmbedUrl(card.video.videoUrl)) {
                      <iframe [src]="sanitizeUrl(card.video.videoUrl)"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                              loading="lazy">
                      </iframe>
                    } @else {
                      <video [src]="card.video.videoUrl" controls preload="metadata"></video>
                    }
                  </div>
                  <div class="portfolio__card-meta">
                    <span class="portfolio__card-category">{{ card.video.category }}</span>
                    <span class="portfolio__card-dot">&middot;</span>
                    <span class="portfolio__card-year">{{ card.video.year }}</span>
                    @if (card.video.duration) {
                      <span class="portfolio__card-dot">&middot;</span>
                      <span class="portfolio__card-duration">{{ card.video.duration }}</span>
                    }
                  </div>
                  <h3 class="portfolio__card-title">{{ card.video.title }}</h3>
                  <p class="portfolio__card-desc">{{ card.video.description }}</p>
                </div>
              </div>
            }
          </div>

          <div class="portfolio__hint">
            <span class="portfolio__hint-line"></span>
            <span class="portfolio__hint-text">Drag or use arrow keys</span>
          </div>

          <div class="portfolio__dots" role="tablist" aria-label="Video navigation">
            @for (video of videos(); track video.id; let i = $index) {
              <span class="portfolio__dot"
                    [class.portfolio__dot--active]="i === activeIndex()"
                    role="tab"
                    [attr.aria-selected]="i === activeIndex()"
                    [attr.aria-label]="'Video ' + (i + 1) + ': ' + video.title">
              </span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio {
      min-height: 100vh;
      background: #101317;
      padding: 120px 0;
    }

    .portfolio__inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 32px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .portfolio__headline {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: clamp(36px, 4.5vw, 52px);
      letter-spacing: -0.02em;
      color: #EDE7DC;
      margin-bottom: 20px;
    }

    .portfolio__lede {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 400;
      font-size: 15px;
      line-height: 1.7;
      color: #9EA5A8;
      max-width: 420px;
      margin-bottom: 32px;
    }

    .portfolio__buttons {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .portfolio__btn {
      font-family: 'Sora', sans-serif;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .portfolio__btn--primary {
      background: #E8913C;
      color: #0A0C0E;
      border: none;
    }

    .portfolio__btn--primary:hover {
      background: #d4802f;
    }

    .portfolio__btn--ghost {
      background: transparent;
      color: #EDE7DC;
      border: 1px solid rgba(237, 231, 220, 0.13);
    }

    .portfolio__btn--ghost:hover {
      border-color: #E8913C;
      color: #E8913C;
    }

    .portfolio__deck-wrapper {
      position: relative;
    }

    .portfolio__deck {
      position: relative;
      width: 100%;
      aspect-ratio: 4/3;
      touch-action: pan-y;
      cursor: grab;
      outline: none;
    }

    .portfolio__deck:active {
      cursor: grabbing;
    }

    .portfolio__card {
      position: absolute;
      inset: 0;
      transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      will-change: transform;
    }

    .portfolio__card--dragging {
      transition: none !important;
    }

    .portfolio__card:not(.portfolio__card--active) {
      pointer-events: none;
    }

    .portfolio__card-inner {
      width: 100%;
      height: 100%;
      background: #0A0C0E;
      border: 1px solid rgba(237, 231, 220, 0.13);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }

    .portfolio__card-video {
      flex: 1;
      background: #0A0C0E;
      position: relative;
      overflow: hidden;
      min-height: 0;
    }

    .portfolio__card-video iframe,
    .portfolio__card-video video {
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      border: none;
    }

    .portfolio__card-meta {
      padding: 16px 20px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .portfolio__card-category {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #2E6B72;
    }

    .portfolio__card-dot {
      color: rgba(237, 231, 220, 0.13);
      font-size: 10px;
    }

    .portfolio__card-year,
    .portfolio__card-duration {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6C7378;
    }

    .portfolio__card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 20px;
      letter-spacing: -0.02em;
      color: #EDE7DC;
      padding: 8px 20px 0;
      margin: 0;
    }

    .portfolio__card-desc {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 400;
      font-size: 13px;
      color: #9EA5A8;
      padding: 4px 20px 16px;
      margin: 0;
    }

    .portfolio__hint {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 20px;
    }

    .portfolio__hint-line {
      width: 40px;
      height: 1px;
      background: rgba(237, 231, 220, 0.13);
    }

    .portfolio__hint-text {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6C7378;
    }

    .portfolio__dots {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .portfolio__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(237, 231, 220, 0.13);
      transition: background 0.2s ease;
    }

    .portfolio__dot--active {
      background: #E8913C;
    }

    [appReveal] {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1),
                  transform 0.9s cubic-bezier(0.23, 1, 0.32, 1);
    }

    [appReveal].is-revealed {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .portfolio__inner {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .portfolio { padding: 80px 0; }
      .portfolio__inner { padding: 0 20px; }
    }
  `]
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('deck') deckRef!: ElementRef<HTMLElement>;

  videos = computed(() => this.portfolio.videos());
  activeIndex = signal(0);

  private thrown = signal<{ index: number; direction: 'next' | 'prev' } | null>(null);
  private throwTimer: ReturnType<typeof setTimeout> | null = null;

  cards = computed(() => {
    const videos = this.videos();
    const current = this.activeIndex();
    const thrown = this.thrown();

    return videos.map((video, index) => {
      const diff = index - current;

      if (thrown && thrown.index === index) {
        const sign = thrown.direction === 'next' ? -1 : 1;
        return {
          video,
          z: 200,
          transform: `translateX(${sign * 120}%) translateY(-28px) rotate(${sign * 18}deg) rotateZ(${sign * 10}deg)`
        } as DeckCard;
      }

      if (index < current) {
        return {
          video,
          z: -100,
          transform: `translateX(-105%) translateY(8px) scale(0.92) rotate(-2deg)`
        } as DeckCard;
      }

      if (index === current) {
        return {
          video,
          z: 100,
          transform: `translateX(${this.dragDelta() * 0.9}px)`
        } as DeckCard;
      }

      if (diff === 1) {
        return {
          video,
          z: 80,
          transform: `translateX(${12 + Math.abs(this.dragDelta()) * 0.05}px) translateY(6px) scale(0.96) rotate(0.5deg)`
        } as DeckCard;
      }

      return {
        video,
        z: 80 - (diff - 1) * 10,
        transform: `translateX(${20 + (diff - 1) * 8}px) translateY(${12 + (diff - 1) * 4}px) scale(${0.92 - (diff - 1) * 0.04}) rotate(${1 + (diff - 1) * 0.5}deg)`
      } as DeckCard;
    });
  });

  private dragDelta = signal(0);
  private dragStartX = 0;
  private dragging = false;
  private isMobile = false;

  constructor(
    private portfolio: PortfolioService,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit(): void {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnDestroy(): void {
    if (this.throwTimer !== null) {
      clearTimeout(this.throwTimer);
    }
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isEmbedUrl(url: string): boolean {
    return /youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|player\.vimeo/.test(url);
  }

  onPointerDown(event: PointerEvent): void {
    if (this.isMobile || this.videos().length < 2) return;
    this.dragging = true;
    this.dragStartX = event.clientX;
    const el = this.deckRef?.nativeElement;
    if (el?.setPointerCapture) {
      el.setPointerCapture(event.pointerId);
    }
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;
    this.dragDelta.set(event.clientX - this.dragStartX);
  }

  onPointerUp(): void {
    if (!this.dragging) return;
    this.dragging = false;

    const deckWidth = this.deckRef?.nativeElement.offsetWidth || 300;
    const threshold = deckWidth * 0.1;

    if (Math.abs(this.dragDelta()) > threshold) {
      if (this.dragDelta() < 0) {
        this.throwCard('next');
      } else {
        this.throwCard('prev');
      }
    }

    this.dragDelta.set(0);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.throwCard('next');
    } else if (event.key === 'ArrowLeft') {
      this.throwCard('prev');
    } else if (event.key === 'Home') {
      this.activeIndex.set(0);
    } else if (event.key === 'End') {
      this.activeIndex.set(this.videos().length - 1);
    }
  }

  private throwCard(direction: 'next' | 'prev'): void {
    const total = this.videos().length;
    const current = this.activeIndex();

    let next = current;
    if (direction === 'next') {
      next = Math.min(total - 1, current + 1);
    } else {
      next = Math.max(0, current - 1);
    }

    if (next === current) return;

    this.thrown.set({ index: current, direction });
    this.dragDelta.set(0);

    this.throwTimer = setTimeout(() => {
      this.activeIndex.set(next);
      this.thrown.set(null);
    }, 450);
  }
}