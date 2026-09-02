import { Component, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { VideoItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="admin-overlay" [class.admin-overlay--open]="isOpen()" (click)="onOverlayClick($event)" role="dialog" aria-modal="true" aria-label="Admin panel">
      <div class="admin-panel" (click)="$event.stopPropagation()">
        <div class="admin-panel__header">
          <h2 class="admin-panel__title">Manage Portfolio</h2>
          <button class="admin-panel__close" (click)="close.emit()" aria-label="Close admin panel">&times;</button>
        </div>

        <div class="admin-panel__tabs">
          <button class="admin-panel__tab"
                  [class.admin-panel__tab--active]="activeTab() === 'videos'"
                  (click)="activeTab.set('videos')">Videos</button>
          <button class="admin-panel__tab"
                  [class.admin-panel__tab--active]="activeTab() === 'info'"
                  (click)="activeTab.set('info')">Info</button>
        </div>

        @if (activeTab() === 'videos') {
          <div class="admin-panel__content">
            <div class="admin-panel__add-form">
              <h3 class="admin-panel__section-title">Add New Video</h3>
              <div class="admin-panel__field">
                <label class="admin-panel__label" for="video-title">Title</label>
                <input class="admin-panel__input"
                       id="video-title"
                       [(ngModel)]="newVideo.title"
                       placeholder="Video title"
                       required
                       aria-required="true">
              </div>
              <div class="admin-panel__field">
                <label class="admin-panel__label" for="video-url">Video URL</label>
                <input class="admin-panel__input"
                       id="video-url"
                       [(ngModel)]="newVideo.videoUrl"
                       placeholder="YouTube, Vimeo URL or direct video file URL"
                       required
                       aria-required="true"
                       aria-describedby="url-help">
                <small id="url-help" class="admin-panel__help">YouTube embed, Vimeo, or .mp4 links</small>
              </div>
              <div class="admin-panel__field">
                <label class="admin-panel__label" for="video-desc">Description</label>
                <input class="admin-panel__input"
                       id="video-desc"
                       [(ngModel)]="newVideo.description"
                       placeholder="Brief description">
              </div>
              <div class="admin-panel__field-row">
                <div class="admin-panel__field">
                  <label class="admin-panel__label" for="video-category">Category</label>
                  <input class="admin-panel__input"
                         id="video-category"
                         [(ngModel)]="newVideo.category"
                         placeholder="Film, Music Video, etc.">
                </div>
                <div class="admin-panel__field">
                  <label class="admin-panel__label" for="video-year">Year</label>
                  <input class="admin-panel__input"
                         id="video-year"
                         [(ngModel)]="newVideo.year"
                         type="number"
                         placeholder="2024">
                </div>
                <div class="admin-panel__field">
                  <label class="admin-panel__label" for="video-duration">Duration</label>
                  <input class="admin-panel__input"
                         id="video-duration"
                         [(ngModel)]="newVideo.duration"
                         placeholder="3:42">
                </div>
              </div>
              @if (videoError()) {
                <p class="admin-panel__error">{{ videoError() }}</p>
              }
              <button class="admin-panel__btn admin-panel__btn--add" (click)="addVideo()">Add Video</button>
            </div>

            <div class="admin-panel__list">
              <h3 class="admin-panel__section-title">Current Videos</h3>
              @for (video of videos(); track video.id) {
                <div class="admin-panel__item">
                  <div class="admin-panel__item-info">
                    <span class="admin-panel__item-title">{{ video.title }}</span>
                    <span class="admin-panel__item-meta">{{ video.category }} &middot; {{ video.year }}</span>
                  </div>
                  <button class="admin-panel__item-remove" (click)="removeVideo(video.id)">Remove</button>
                </div>
              }
            </div>
          </div>
        }

        @if (activeTab() === 'info') {
          <div class="admin-panel__content">
            <div class="admin-panel__field">
              <label class="admin-panel__label">Name</label>
              <input class="admin-panel__input"
                     [ngModel]="portfolio.data().name"
                     (ngModelChange)="portfolio.updateData({ name: $event })">
            </div>
            <div class="admin-panel__field">
              <label class="admin-panel__label">Tagline</label>
              <input class="admin-panel__input"
                     [ngModel]="portfolio.data().tagline"
                     (ngModelChange)="portfolio.updateData({ tagline: $event })">
            </div>
            <div class="admin-panel__field">
              <label class="admin-panel__label">Bio</label>
              <textarea class="admin-panel__input admin-panel__textarea"
                        [ngModel]="portfolio.data().bio"
                        (ngModelChange)="portfolio.updateData({ bio: $event })"
                        rows="3"></textarea>
            </div>
            <div class="admin-panel__field">
              <label class="admin-panel__label">Contact Email</label>
              <input class="admin-panel__input"
                     [ngModel]="portfolio.data().contactEmail"
                     (ngModelChange)="portfolio.updateData({ contactEmail: $event })">
            </div>
            <button class="admin-panel__btn admin-panel__btn--reset" (click)="portfolio.resetToDefaults()">
              Reset to Defaults
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .admin-overlay {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background: rgba(10, 12, 14, 0.8);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: flex-end;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .admin-overlay--open {
      opacity: 1;
      pointer-events: auto;
    }

    .admin-panel {
      width: min(520px, 90vw);
      height: 100vh;
      background: #101317;
      border-left: 1px solid rgba(237, 231, 220, 0.13);
      overflow-y: auto;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .admin-overlay--open .admin-panel {
      transform: translateX(0);
    }

    .admin-panel__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 32px;
      border-bottom: 1px solid rgba(237, 231, 220, 0.13);
    }

    .admin-panel__title {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 18px;
      color: #EDE7DC;
      margin: 0;
    }

    .admin-panel__close {
      background: none;
      border: none;
      color: #9EA5A8;
      font-size: 24px;
      cursor: pointer;
      padding: 4px;
      transition: color 0.2s;
    }

    .admin-panel__close:hover {
      color: #E8913C;
    }

    .admin-panel__tabs {
      display: flex;
      border-bottom: 1px solid rgba(237, 231, 220, 0.13);
    }

    .admin-panel__tab {
      flex: 1;
      padding: 16px;
      background: none;
      border: none;
      font-family: 'Sora', sans-serif;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6C7378;
      cursor: pointer;
      transition: color 0.2s;
      border-bottom: 2px solid transparent;
    }

    .admin-panel__tab--active {
      color: #E8913C;
      border-bottom-color: #E8913C;
    }

    .admin-panel__content {
      padding: 32px;
    }

    .admin-panel__section-title {
      font-family: 'Sora', sans-serif;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #9EA5A8;
      margin: 0 0 20px;
    }

    .admin-panel__field {
      margin-bottom: 16px;
    }

    .admin-panel__field-row {
      display: grid;
      grid-template-columns: 1fr 100px 80px;
      gap: 12px;
    }

    .admin-panel__label {
      display: block;
      font-family: 'Sora', sans-serif;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6C7378;
      margin-bottom: 8px;
    }

    .admin-panel__input {
      width: 100%;
      padding: 12px 16px;
      background: #0A0C0E;
      border: 1px solid rgba(237, 231, 220, 0.13);
      border-radius: 4px;
      color: #EDE7DC;
      font-family: 'Sora', sans-serif;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .admin-panel__input:focus {
      border-color: #E8913C;
    }

    .admin-panel__input::placeholder {
      color: #6C7378;
    }

    .admin-panel__help {
      display: block;
      font-family: 'Sora', sans-serif;
      font-size: 10px;
      color: #6C7378;
      margin-top: 4px;
    }

    .admin-panel__textarea {
      resize: vertical;
      min-height: 80px;
    }

    .admin-panel__btn {
      font-family: 'Sora', sans-serif;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
      width: 100%;
      margin-top: 8px;
    }

    .admin-panel__btn--add {
      background: #E8913C;
      color: #0A0C0E;
    }

    .admin-panel__btn--add:hover {
      background: #d4802f;
    }

    .admin-panel__btn--reset {
      background: transparent;
      border: 1px solid rgba(237, 231, 220, 0.13);
      color: #9EA5A8;
    }

    .admin-panel__btn--reset:hover {
      border-color: #2E6B72;
      color: #2E6B72;
    }

    .admin-panel__error {
      font-family: 'Sora', sans-serif;
      font-size: 11px;
      color: #c0392b;
      margin: 8px 0 0;
      padding: 8px 12px;
      background: rgba(192, 57, 43, 0.1);
      border-radius: 4px;
      border: 1px solid rgba(192, 57, 43, 0.3);
    }

    .admin-panel__list {
      margin-top: 32px;
    }

    .admin-panel__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border: 1px solid rgba(237, 231, 220, 0.13);
      border-radius: 4px;
      margin-bottom: 8px;
    }

    .admin-panel__item-title {
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 14px;
      color: #EDE7DC;
      display: block;
    }

    .admin-panel__item-meta {
      font-family: 'Sora', sans-serif;
      font-size: 11px;
      color: #6C7378;
    }

    .admin-panel__item-remove {
      font-family: 'Sora', sans-serif;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: none;
      border: 1px solid rgba(237, 231, 220, 0.13);
      color: #9EA5A8;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .admin-panel__item-remove:hover {
      border-color: #c0392b;
      color: #c0392b;
    }
  `]
})
export class AdminPanelComponent {
  isOpen = signal(false);
  close = output<void>();
  activeTab = signal<'videos' | 'info'>('videos');
  videoError = signal<string>('');

  newVideo = {
    title: '',
    videoUrl: '',
    description: '',
    category: '',
    year: new Date().getFullYear(),
    duration: ''
  };

  constructor(public portfolio: PortfolioService) {}

  private isValidVideoUrl(url: string): boolean {
    if (!url) return false;
    try {
      new URL(url);
      const videoPatterns = [
        /^https?:\/\/(www\.)?youtube\.com\/embed\//,
        /^https?:\/\/youtu\.be\//,
        /^https?:\/\/(www\.)?vimeo\.com\/\d+/,
        /^https?:\/\/player\.vimeo\.com\/video\//,
        /^https?:\/\/.*\.mp4$/i
      ];
      return videoPatterns.some(pattern => pattern.test(url));
    } catch {
      return false;
    }
  }

  get videos() {
    return this.portfolio.videos;
  }

  open(): void {
    this.isOpen.set(true);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('admin-overlay')) {
      this.close.emit();
    }
  }

  addVideo(): void {
    this.videoError.set('');

    if (!this.newVideo.title.trim()) {
      this.videoError.set('Title is required');
      return;
    }

    if (!this.newVideo.videoUrl.trim()) {
      this.videoError.set('Video URL is required');
      return;
    }

    if (!this.isValidVideoUrl(this.newVideo.videoUrl)) {
      this.videoError.set('Invalid video URL. Use YouTube, Vimeo, or direct .mp4 link');
      return;
    }

    this.portfolio.addVideo({
      title: this.newVideo.title.trim(),
      videoUrl: this.newVideo.videoUrl.trim(),
      description: this.newVideo.description.trim(),
      thumbnailUrl: '',
      category: this.newVideo.category.trim() || 'Uncategorized',
      year: this.newVideo.year || new Date().getFullYear(),
      duration: this.newVideo.duration?.trim() || undefined
    });
    this.resetForm();
  }

  removeVideo(id: string): void {
    this.portfolio.removeVideo(id);
  }

  private resetForm(): void {
    this.newVideo = {
      title: '',
      videoUrl: '',
      description: '',
      category: '',
      year: new Date().getFullYear(),
      duration: ''
    };
  }
}
