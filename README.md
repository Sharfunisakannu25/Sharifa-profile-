# Sharifa — Portfolio

A dark-label portfolio built with Angular, featuring a portal hero animation, throwable card deck for video works, and modular architecture.

## Project Structure

This repository uses a uniform single-folder layout. All frontend code lives inside `frontend/`:

```
sharifa-portfolio/
├── frontend/                # Angular 22 application (single uniform folder)
│   ├── src/
│   │   ├── assets/          # Static assets (was /public) — favicon, hero images
│   │   ├── app/
│   │   │   ├── core/        # models, services, theme.constants
│   │   │   ├── shared/      # navigation, directives
│   │   │   └── features/    # hero, about, portfolio, skills, experience, contact, admin
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── angular.json         # assets: src/assets → /assets
│   ├── package.json
│   ├── tsconfig.json
│   └── .vscode/
└── README.md                # This file
```

- **Public → src/assets**: Former `public/` folder (favicon, `hero-creative-workspace.jpg`, `studio-create-passion.png`) has been moved to `frontend/src/assets/` and is configured in `frontend/angular.json` as `{ "glob": "**/*", "input": "src/assets", "output": "/assets" }`. All templates now reference `/assets/...`.
- **Uniform formatting**: 2-space indent, `prettier` with `singleQuote: true`, `printWidth: 100`, configured via `frontend/.editorconfig` and `frontend/.prettierrc`.

## Quick Start

```bash
cd frontend
npm install
npm start        # ng serve — http://localhost:4200
npm run build    # production build to frontend/dist/
```

See `frontend/README.md` for detailed architecture, design system, and videomanagement instructions.
