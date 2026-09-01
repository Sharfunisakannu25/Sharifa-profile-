import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="skills" id="skills">
      <div class="skills__bg" aria-hidden="true">
        <img src="/studio-create-passion.png" alt="" class="skills__bg-img" />
      </div>
      <div class="skills__inner">
        <span class="skills__label" appReveal>Capabilities</span>
        <div class="skills__list">
          @for (skill of skills(); track skill.name; let i = $index) {
            <div class="skills__row" appReveal [revealDelay]="i * 60">
              <div class="skills__row-left">
                <span class="skills__category">{{ skill.category }}</span>
                <span class="skills__name">{{ skill.name }}</span>
              </div>
              <div class="skills__row-right">
                <span class="skills__count">{{ skill.level }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills {
      background: #0A0C0E;
      padding: 120px 0;
      border-top: 1px solid rgba(237, 231, 220, 0.13);
      position: relative;
      overflow: hidden;
    }

    .skills__bg {
      position: absolute;
      right: -80px;
      top: 50%;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      overflow: hidden;
      opacity: 0.18;
      transform: translateY(-50%);
      border: 1px solid rgba(237, 231, 220, 0.08);
      pointer-events: none;
    }

    .skills__bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(0.85) contrast(1.05);
    }

    .skills__inner {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 32px;
    }

    .skills__label {
      display: block;
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10.5px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #2E6B72;
      margin-bottom: 48px;
    }

    .skills__list {
      display: flex;
      flex-direction: column;
    }

    .skills__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid rgba(237, 231, 220, 0.13);
    }

    .skills__row:first-child {
      border-top: 1px solid rgba(237, 231, 220, 0.13);
    }

    .skills__row-left {
      display: flex;
      align-items: baseline;
      gap: 16px;
    }

    .skills__category {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 9px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #6C7378;
      min-width: 100px;
    }

    .skills__name {
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: -0.02em;
      color: #EDE7DC;
    }

    .skills__row-right {
      min-width: 60px;
      text-align: right;
    }

    .skills__count {
      font-family: 'Sora', sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.02em;
      color: #E8913C;
    }

    [appReveal] {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1),
                  transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    }

    [appReveal].is-revealed {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .skills { padding: 80px 0; }
      .skills__inner { padding: 0 20px; }
      .skills__row-left { flex-direction: column; gap: 4px; }
      .skills__category { min-width: auto; }
    }
  `]
})
export class SkillsComponent {
  skills = computed(() => this.portfolio.skills());

  constructor(private portfolio: PortfolioService) {}
}