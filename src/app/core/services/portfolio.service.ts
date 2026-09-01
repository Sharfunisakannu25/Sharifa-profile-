import { Injectable, signal, computed } from '@angular/core';
import { PortfolioData, VideoItem } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly STORAGE_KEY = 'sharifa_portfolio_data';

  private readonly _data = signal<PortfolioData>(this.loadFromStorage());

  readonly data = this._data.asReadonly();
  readonly videos = computed(() => this._data().videos);
  readonly skills = computed(() => this._data().skills);
  readonly experience = computed(() => this._data().experience);

  private getDefaultData(): PortfolioData {
    return {
      name: 'Sharifa',
      tagline: 'AI Video Editor & Creative Content Creator',
      bio: 'A passionate video editing student who recently completed school in India, now based in the UAE. Exploring the world of AI-powered video editing and content creation with fresh perspectives and creative enthusiasm. Eager to bring innovative visual stories to life through cutting-edge AI tools and techniques.',
      videos: [
        {
          id: '1',
          title: 'Neon Dreams',
          description: 'AI-generated cinematic short exploring neon-lit cityscapes',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          thumbnailUrl: '',
          category: 'AI Short Film',
          year: 2026,
          duration: '2:15'
        },
        {
          id: '2',
          title: 'Echoes',
          description: 'AI-enhanced music video edit with dynamic transitions',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          thumbnailUrl: '',
          category: 'AI Music Video',
          year: 2025,
          duration: '3:42'
        },
        {
          id: '3',
          title: 'Pulse of the City',
          description: 'Showcase of AI video generation and editing capabilities',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          thumbnailUrl: '',
          category: 'AI Demo Reel',
          year: 2026,
          duration: '1:58'
        }
      ],
      skills: [
        { name: 'ChatGPT', category: 'AI Tools', level: 92 },
        { name: 'Gemini AI', category: 'AI Tools', level: 85 },
        { name: 'CapCut', category: 'Video Editing', level: 90 },
        { name: 'Vheer AI', category: 'AI Tools', level: 80 }
      ],
      experience: [
        {
          role: 'Student — Video Editing & AI Content',
          company: 'School / Personal Projects',
          startDate: '2024',
          endDate: '2025',
          description: 'Created AI-generated videos and editing reels as part of school projects'
        },
        {
          role: 'School Media Lead',
          company: 'School / College',
          startDate: '2023',
          endDate: '2024',
          description: 'Led video production and editing for school events and functions'
        },
        {
          role: 'Video Production Volunteer',
          company: 'School Events',
          startDate: '2022',
          endDate: '2023',
          description: 'Documented school activities and created promotional content'
        }
      ],
      socials: [
        { platform: 'Instagram', url: '#', icon: 'IG' },
        { platform: 'Vimeo', url: '#', icon: 'VM' },
        { platform: 'LinkedIn', url: '#', icon: 'LI' }
      ],
      contactEmail: 'sharifa@gmail.com'
    };
  }

  private loadFromStorage(): PortfolioData {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return this.getDefaultData();
        }
      }
    }
    return this.getDefaultData();
  }

  private saveToStorage(data: PortfolioData): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  updateData(partial: Partial<PortfolioData>): void {
    this._data.update(current => {
      const updated = { ...current, ...partial };
      this.saveToStorage(updated);
      return updated;
    });
  }

  addVideo(video: Omit<VideoItem, 'id'>): void {
    const newVideo: VideoItem = {
      ...video,
      id: Date.now().toString()
    };
    this._data.update(current => {
      const updated = { ...current, videos: [...current.videos, newVideo] };
      this.saveToStorage(updated);
      return updated;
    });
  }

  updateVideo(id: string, updates: Partial<VideoItem>): void {
    this._data.update(current => {
      const updated = {
        ...current,
        videos: current.videos.map(v => v.id === id ? { ...v, ...updates } : v)
      };
      this.saveToStorage(updated);
      return updated;
    });
  }

  removeVideo(id: string): void {
    this._data.update(current => {
      const updated = {
        ...current,
        videos: current.videos.filter(v => v.id !== id)
      };
      this.saveToStorage(updated);
      return updated;
    });
  }

  resetToDefaults(): void {
    const defaults = this.getDefaultData();
    this._data.set(defaults);
    this.saveToStorage(defaults);
  }
}
