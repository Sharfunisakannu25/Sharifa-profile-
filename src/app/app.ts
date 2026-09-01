import { Component, ViewChild } from '@angular/core';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ContactComponent } from './features/contact/contact.component';
import { AdminPanelComponent } from './features/admin/admin-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    PortfolioComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    AdminPanelComponent
  ],
  template: `
    <app-navigation (toggleAdmin)="openAdmin()" />
    <main>
      <app-hero />
      <app-about />
      <app-portfolio />
      <app-skills />
      <app-experience />
      <app-contact />
    </main>
    <app-admin-panel #adminPanel (close)="closeAdmin()" />
  `,
  styles: [`
    :host {
      display: block;
      background: #0A0C0E;
      min-height: 100vh;
    }
  `]
})
export class App {
  @ViewChild('adminPanel') adminPanel!: AdminPanelComponent;

  openAdmin(): void {
    this.adminPanel?.open();
  }

  closeAdmin(): void {
    this.adminPanel?.isOpen.set(false);
  }
}
