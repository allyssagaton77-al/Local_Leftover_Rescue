# Local Leftover Rescue

**Live demo:** https://local-leftover-rescue-gid.vercel.app

A React + JavaScript mobile app concept for rescuing leftover food from nearby shops.

The UI is based on the attached `Untitled.png` mockups, and the remaining screens were added from `Information Architecture.pdf`:

- Onboarding / Welcome / Login / Sign Up
- Home
- Food Details
- Shopping Cart / Order Summary
- Order Tracking
- Order History
- Notifications
- About Us
- Contact Us
- Profile, Add Listing and Settings

## Run locally

```bash
cd local_leftover_rescue
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deploy

This is a static Vite app, so any static host works.

1. Install dependencies: `npm install`
2. Build: `npm run build` (creates `dist/`)
3. Test the production build: `npm run preview`

### Vercel
- Import the GitHub repo, or drag the project folder onto vercel.com/new.
- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Click **Deploy**.

### Netlify
- Drag the `dist/` folder onto app.netlify.com/drop, or
- Connect GitHub with Build command `npm run build` and Publish directory `dist`.

## Notes

- Built with Vite, React 18 and plain CSS.
- Icons come from `lucide-react`.
- Food photos are real local images stored in `public/images` (sourced from Unsplash), so the app works offline after install.
- A short loading screen appears on app start and before the Home page is opened.
- Place order, tracking, notifications, wishlist and listing forms are interactive demo state (no backend).
