import { Component, signal, output, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="nav" [class.nav--scrolled]="isScrolled()" role="navigation" aria-label="Main navigation">
      <div class="nav__inner">
        <a class="nav__wordmark" href="#" aria-label="Sharifa - Home">sharifa<span class="nav__period">.</span></a>
        <div class="nav__links" role="menubar">
          <a class="nav__link" href="#work" role="menuitem">Work</a>
          <a class="nav__link" href="#about" role="menuitem">About</a>
          <a class="nav__link" href="#skills" role="menuitem">Skills</a>
          <a class="nav__link" href="#experience" role="menuitem">Experience</a>
          <a class="nav__link" href="#contact" role="menuitem">Contact</a>
        </div>
        <button class="nav__admin-btn" (click)="toggleAdmin.emit()" aria-label="Manage Portfolio" aria-haspopup="dialog">Admin</button>
      </div>
    </nav>
  `,
  styles: [`
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 58px;
      z-index: 1000;
      background: rgba(10, 12, 14, 0.72);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(237, 231, 220, 0.13);
      transition: background 0.3s ease;
    }
    .nav--scrolled {
      background: rgba(10, 12, 14, 0.92);
    }
    .nav__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 32px;
      max-width: 1440px;
      margin: 0 auto;
    }
    .nav__wordmark {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: -0.02em;
      color: #EDE7DC;
      text-decoration: none;
      text-transform: uppercase;
    }
    .nav__period {
      color: #E8913C;
    }
    .nav__links {
      display: flex;
      gap: 32px;
    }
    .nav__link {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #9EA5A8;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .nav__link:hover {
      color: #E8913C;
    }
    .nav__admin-btn {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #EDE7DC;
      background: transparent;
      border: 1px solid rgba(237, 231, 220, 0.13);
      border-radius: 100px;
      padding: 8px 20px;
      cursor: pointer;
      transition: border-color 0.2s ease, color 0.2s ease;
    }
    .nav__admin-btn:hover {
      border-color: #E8913C;
      color: #E8913C;
    }
    @media (max-width: 768px) {
      .nav__links { display: none; }
      .nav__inner { padding: 0 20px; }
    }
  `]
})
export class NavigationComponent {
  isScrolled = signal(false);
  toggleAdmin = output<void>();

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 40);
  }
}
