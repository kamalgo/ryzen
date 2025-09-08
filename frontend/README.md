# MahaDBT MVP Frontend (Vite + React + TS + Tailwind + Router + PWA)

## Quick Start

### 1) Download & Extract
Unzip this folder somewhere on your machine.

### 2) Install
```bash
npm install
```

### 3) Run (Dev)
```bash
npm run dev
```
Vite will open the app on `http://localhost:5173`.

### 4) Build (Prod)
```bash
npm run build
npm run preview
```

## Tech
- React + TypeScript (Vite)
- Tailwind CSS
- Minimal UI kit (custom Tailwind components)
- React Router
- React Hook Form + Zod (validation)
- Zustand (auth state)
- PWA (vite-plugin-pwa) + offline basics

## Pages
- `/login` – email/mobile + password/OTP (mock) → navigates to dashboard
- `/dashboard` – entry point with actions
- `/application` – multi-section form (Personal, Academic, Bank & Docs) + auto-save draft

## Notes
- Currently, login and save are mocked. Wire to your backend later:
  - `POST /api/auth/login` → set token & user
  - `POST /api/applications` → save form data (multipart for files)
- The form autosaves to `localStorage` under key `mahadbt_form_draft_v1`.
- Icons and manifest are included for PWA install prompt.

## Theming
- Light/Dark toggle in header.
- You can tweak colors via CSS vars in `src/index.css`.

Enjoy!
