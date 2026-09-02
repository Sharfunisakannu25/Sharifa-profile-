import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer__inner">
        <span class="footer__copy">&copy; {{ currentYear }} {{ name() }}</span>
        <div class="footer__socials">
          @for (social of socials(); track social.platform) {
            <a [href]="social.url" class="footer__social" target="_blank" rel="noopener noreferrer">{{ social.icon }}</a>
          }
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid rgba(237, 231, 220, 0.13);
      background: #0A0C0E;
    }

    .footer__inner {
      max-width: 900px;
      margin: 0 auto;
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer__copy {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6C7378;
    }

    .footer__socials {
      display: flex;
      gap: 20px;
    }

    .footer__social {
      font-family: 'Sora', sans-serif;
      font-weight: 500;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #9EA5A8;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer__social:hover {
      color: #E8913C;
    }

    @media (max-width: 768px) {
      .footer__inner {
        padding: 20px;
        flex-direction: column;
        gap: 16px;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  name = computed(() => this.portfolio.data().name);
  socials = computed(() => this.portfolio.data().socials);

  constructor(private portfolio: PortfolioService) {}
}
