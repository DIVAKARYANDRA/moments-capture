# Moments Capture — Website & Admin CMS

A production-ready wedding photography & videography website with a full admin
dashboard, built with React + Vite + Tailwind, Firebase (Auth + Firestore), and
Cloudinary for media.

## 1. Install

```bash
npm install
```

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your Firebase + Cloudinary values
(a `.env.local` with your project's real values is already included for local
development — **do not commit it**; it's gitignored).

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_CLOUDINARY_CLOUD_NAME=...
VITE_CLOUDINARY_UPLOAD_PRESET=...
```

## 3. Firebase setup (one-time)

1. **Authentication** → Sign-in method → enable **Email/Password**.
2. **Firestore Database** → create in production mode, region `asia-south1`.
3. Deploy the included security rules (`firestore.rules`) via the Firebase
   Console → Firestore → Rules tab (paste the file contents), or with the CLI:
   ```bash
   firebase deploy --only firestore:rules
   ```
4. **Create your first admin user:**
   - Authentication → Users → Add user (email + password).
   - Firestore → Data → create a document in a `users` collection with the
     document ID equal to that user's UID, containing:
     ```json
     { "role": "admin" }
     ```
   - You can now log in at `/admin/login`.

## 4. Cloudinary setup (one-time)

1. In Cloudinary → Settings → Upload → Upload presets, confirm an **unsigned**
   preset named `moments_capture_upload` exists (create one if not — set
   Signing Mode to "Unsigned").
2. No other setup needed — the app uploads directly from the browser and
   folders (`moments-capture/portfolio/weddings`, etc.) are created
   automatically on first upload.

## 5. Run locally

```bash
npm run dev
```

## 6. Seed content

Everything the public site displays (hero, services, portfolio, founders,
videos, testimonials, gallery, business/contact settings) is empty until you
add it from `/admin` — the site shows clean empty states until then, it will
not error.

## 7. Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the same environment variables from `.env.local` in the Vercel project
   settings (Settings → Environment Variables).
4. Deploy — `vercel.json` is already configured with the SPA rewrite rule
   client-side routing needs.

## Project structure

```
src/
  firebase/        # firebase.js (init), cloudinary.js (upload helper)
  services/        # one file per Firestore collection — all DB logic lives here
  context/          # AuthContext, SettingsContext
  components/
    site/           # public website components
    admin/           # admin dashboard components (DataTable, ImageUploader, etc.)
  pages/
    site/            # Home, Portfolio, Services, About, Films, Contact
    admin/            # Login, Dashboard, and one manager page per collection
```

Simple single-image collections (Services, Founders, Testimonials, Videos,
Gallery) share one config-driven `SimpleCrudManager` component. Portfolio has
its own manager because it needs multi-image upload, category-based
Cloudinary folders, and a featured flag.
