# Sharifa ΓÇö Portfolio

A dark-label portfolio built with Angular, featuring a portal hero animation, throwable card deck for video works, and modular architecture.

> **Structure Note:** All application code lives in `frontend/` (uniform single-folder layout). The former `public/` assets are now `frontend/src/assets/` and are served from `/assets/` via `frontend/angular.json`.

## Design

- **Palette**: ground `#0A0C0E`, secondary `#101317`, ink `#EDE7DC`, amber `#E8913C`, teal `#2E6B72`
- **Typography**: Syne 600ΓÇô800 for display, Sora 400ΓÇô600 for body
- **Hero**: Two opaque panels part outward on scroll, revealing the image while the wordmark splits and scales
- **Deck**: Throwable video cards with physical drag and roll animation

## Architecture

```
src/
Γö£ΓöÇΓöÇ app/
Γöé   Γö£ΓöÇΓöÇ core/
Γöé   Γöé   Γö£ΓöÇΓöÇ models/          # TypeScript interfaces (VideoItem, SkillItem, etc.)
Γöé   Γöé   ΓööΓöÇΓöÇ services/        # PortfolioService, ScrollService, AnimationService
Γöé   Γö£ΓöÇΓöÇ shared/
Γöé   Γöé   Γö£ΓöÇΓöÇ components/      # Navigation
Γöé   Γöé   ΓööΓöÇΓöÇ directives/      # RevealDirective (scroll-triggered)
Γöé   ΓööΓöÇΓöÇ features/
Γöé       Γö£ΓöÇΓöÇ hero/            # Portal hero with scroll-driven panels + wordmark
Γöé       Γö£ΓöÇΓöÇ about/           # Statement fold with floating circle
Γöé       Γö£ΓöÇΓöÇ portfolio/       # Throwable card deck for videos
Γöé       Γö£ΓöÇΓöÇ skills/          # Hairline-ruled skill rows
Γöé       Γö£ΓöÇΓöÇ experience/      # Date table
Γöé       Γö£ΓöÇΓöÇ contact/         # Close section with cropped wordmark
Γöé       ΓööΓöÇΓöÇ admin/           # Slide-out panel for managing portfolio data
```

All feature components are **standalone** ΓÇö no NgModules. Each feature owns its own template, styles, and logic.

## Adding Videos

1. Run `ng serve`
2. Click **Admin** in the navigation bar
3. Enter a video title, URL (YouTube, Vimeo, or direct .mp4 link), description, category, year, and duration
4. Click **Add Video**
5. Videos are persisted to `localStorage` ΓÇö they survive page refreshes

### Video URL formats supported
- YouTube embed: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo embed: `https://player.vimeo.com/video/VIDEO_ID`
- Direct file: `https://example.com/video.mp4`

## Keyboard Accessibility

The deck supports full keyboard navigation:
- **Left/Right arrows** ΓÇö flip through cards
- **Home** ΓÇö jump to first card
- **End** ΓÇö jump to last card
- **Pointer drag** ΓÇö drag cards left/right to flip

## Build

```bash
npm install
ng serve         # dev server at http://localhost:4200
ng build         # production build to dist/
```

## Spec Compliance

- Portal hero opens/closes with scroll (reversible)
- Accents used only in type, dots, or hairlines ΓÇö never filled areas
- Skill counts are right-aligned numbers, not progress bars
- No gradient banners, bento grids, glow effects, or drop shadows (except deck cards)
- Reduced-motion renders the finished page without animation
- No invented press quotes, chart positions, streaming counts, or award badges
