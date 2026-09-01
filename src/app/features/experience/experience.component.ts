import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="experience" id="experience" aria-label="Work experience">
      <div class="experience__inner">
        <span class="experience__label" appReveal>Experience</span>
        <div class="experience__table" role="table">
          <div class="experience__header" role="row">
            <span role="columnheader">Role</span>
            <span role="columnheader">Company</span>
            <span role="columnheader">Period</span>
            <span role="columnheader">Focus</span>
          </div>
          @for (item of experience(); track item.role; let i = $index) {
            <div class="experience__row" appReveal [revealDelay]="i * 80" role="row">
              <span class="experience__role" role="cell">{{ item.role }}</span>
              <span class="experience__company" role="cell">{{ item.company }}</span>
              <span class="experience__period" role="cell">{{ item.startDate }} — {{ item.endDate }}</span>
              <span class="experience__focus" role="cell">{{ item.description }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience {
      background: #101317;
      padding: 120px 0;
      border-top: 1px solid rgba(237, 231, 220, 0.13);
    }

    .experience__inner {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 32px;
    }

    .experience__label {
      display: block;
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10.5px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #2E6B72;
      margin-bottom: 48px;
    }

    .experience__table {
      display: flex;
      flex-direction: column;
    }

    .experience__header {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 2fr;
      padding: 16px 0;
      border-bottom: 1px solid rgba(237, 231, 220, 0.13);
    }

    .experience__header span {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 9px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #6C7378;
    }

    .experience__row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 2fr;
      padding: 24px 0;
      border-bottom: 1px solid rgba(237, 231, 220, 0.13);
      align-items: center;
    }

    .experience__role {
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 15px;
      letter-spacing: -0.02em;
      color: #EDE7DC;
    }

    .experience__company {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 13px;
      color: #9EA5A8;
    }

    .experience__period {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 12px;
      color: #6C7378;
      letter-spacing: 0.05em;
    }

    .experience__focus {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 13px;
      color: #9EA5A8;
      line-height: 1.5;
    }

    [appReveal] {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1),
                  transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    }

    [appReveal].is-revealed {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .experience { padding: 80px 0; }
      .experience__inner { padding: 0 20px; }
      .experience__header { display: none; }
      .experience__row {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .experience__role { grid-column: 1 / -1; }
      .experience__company { font-size: 12px; }
      .experience__period { font-size: 11px; text-align: right; }
      .experience__focus { grid-column: 1 / -1; font-size: 12px; }
    }
  `]
})
export class ExperienceComponent {
  experience = computed(() => this.portfolio.experience());

  constructor(private portfolio: PortfolioService) {}
}