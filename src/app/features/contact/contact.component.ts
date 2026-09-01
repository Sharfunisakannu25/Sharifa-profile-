import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="contact" id="contact">
      <div class="contact__inner">
        <h2 class="contact__headline">Let's create<br>something together.</h2>
        <p class="contact__fine">{{ contactEmail() }}</p>
        <div class="contact__buttons">
          <a [href]="'mailto:' + contactEmail()" class="contact__btn contact__btn--primary">Email Me</a>
          <a href="#" class="contact__btn contact__btn--ghost">Download Reel</a>
        </div>
      </div>

      <div class="contact__footer">
        <div class="contact__footer-strip">
          <span class="contact__footer-copy">&copy; 2026 Sharifa</span>
          <div class="contact__socials">
            @for (social of socials(); track social.platform) {
              <a [href]="social.url" class="contact__social" target="_blank">{{ social.icon }}</a>
            }
          </div>
        </div>
      </div>

      <div class="contact__wordmark">
        sharifa
      </div>
    </section>
  `,
  styles: [`
    .contact {
      background: #0A0C0E;
      padding: 160px 0 0;
      position: relative;
      overflow: hidden;
    }

    .contact__inner {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 32px;
    }

    .contact__headline {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: clamp(32px, 5vw, 64px);
      letter-spacing: -0.03em;
      color: #EDE7DC;
      line-height: 1.1;
      margin-bottom: 24px;
    }

    .contact__fine {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 13px;
      color: #9EA5A8;
      margin-bottom: 40px;
    }

    .contact__buttons {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-bottom: 120px;
    }

    .contact__btn {
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

    .contact__btn--primary {
      background: #E8913C;
      color: #0A0C0E;
      border: none;
    }

    .contact__btn--primary:hover {
      background: #d4802f;
    }

    .contact__btn--ghost {
      background: transparent;
      color: #EDE7DC;
      border: 1px solid rgba(237, 231, 220, 0.13);
    }

    .contact__btn--ghost:hover {
      border-color: #E8913C;
      color: #E8913C;
    }

    .contact__footer {
      border-top: 1px solid rgba(237, 231, 220, 0.13);
    }

    .contact__footer-strip {
      max-width: 900px;
      margin: 0 auto;
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .contact__footer-copy {
      font-family: 'Sora', sans-serif;
      font-weight: 400;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6C7378;
    }

    .contact__socials {
      display: flex;
      gap: 20px;
    }

    .contact__social {
      font-family: 'Sora', sans-serif;
      font-weight: 500;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #9EA5A8;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .contact__social:hover {
      color: #E8913C;
    }

    .contact__wordmark {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(100px, 20vw, 280px);
      text-transform: uppercase;
      color: rgba(237, 231, 220, 0.04);
      text-align: center;
      transform: translateY(40px);
      line-height: 0.8;
      user-select: none;
      letter-spacing: -0.03em;
    }

    @media (max-width: 768px) {
      .contact { padding: 80px 0 0; }
      .contact__inner { padding: 0 20px; }
      .contact__footer-strip { padding: 20px; flex-direction: column; gap: 16px; }
      .contact__buttons { justify-content: flex-start; flex-direction: column; }
    }
  `]
})
export class ContactComponent {
  contactEmail = computed(() => this.portfolio.data().contactEmail);
  socials = computed(() => this.portfolio.data().socials);

  constructor(private portfolio: PortfolioService) {}
}
