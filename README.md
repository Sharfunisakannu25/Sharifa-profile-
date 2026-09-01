# Sharifa — Portfolio

A dark-label portfolio built with Angular, featuring a portal hero animation, throwable card deck for video works, and modular architecture.

## Design

- **Palette**: ground `#0A0C0E`, secondary `#101317`, ink `#EDE7DC`, amber `#E8913C`, teal `#2E6B72`
- **Typography**: Syne 600–800 for display, Sora 400–600 for body
- **Hero**: Two opaque panels part outward on scroll, revealing the image while the wordmark splits and scales
- **Deck**: Throwable video cards with physical drag and roll animation

## Architecture

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces (VideoItem, SkillItem, etc.)
│   │   └── services/        # PortfolioService, ScrollService, AnimationService
│   ├── shared/
│   │   ├── components/      # Navigation
│   │   └── directives/      # RevealDirective (scroll-triggered)
│   └── features/
│       ├── hero/            # Portal hero with scroll-driven panels + wordmark
│       ├── about/           # Statement fold with floating circle
│       ├── portfolio/       # Throwable card deck for videos
│       ├── skills/          # Hairline-ruled skill rows
│       ├── experience/      # Date table
│       ├── contact/         # Close section with cropped wordmark
│       └── admin/           # Slide-out panel for managing portfolio data
```

All feature components are **standalone** — no NgModules. Each feature owns its own template, styles, and logic.

## Adding Videos

1. Run `ng serve`
2. Click **Admin** in the navigation bar
3. Enter a video title, URL (YouTube, Vimeo, or direct .mp4 link), description, category, year, and duration
4. Click **Add Video**
5. Videos are persisted to `localStorage` — they survive page refreshes

### Video URL formats supported
- YouTube embed: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo embed: `https://player.vimeo.com/video/VIDEO_ID`
- Direct file: `https://example.com/video.mp4`

## Keyboard Accessibility

The deck supports full keyboard navigation:
- **Left/Right arrows** — flip through cards
- **Home** — jump to first card
- **End** — jump to last card
- **Pointer drag** — drag cards left/right to flip

## Build

```bash
npm install
ng serve         # dev server at http://localhost:4200
ng build         # production build to dist/
```

## Spec Compliance

- Portal hero opens/closes with scroll (reversible)
- Accents used only in type, dots, or hairlines — never filled areas
- Skill counts are right-aligned numbers, not progress bars
- No gradient banners, bento grids, glow effects, or drop shadows (except deck cards)
- Reduced-motion renders the finished page without animation
- No invented press quotes, chart positions, streaming counts, or award badges

# Sharifa-profile-
