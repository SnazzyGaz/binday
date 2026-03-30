# 🗑️ Bin Day

A lightweight Progressive Web App that tells you exactly which bin goes out next — and never lets you forget.

Built for UK households with alternating or multi-bin collection schedules. Works offline, installs to your home screen, and fits any council's collection pattern no matter how unusual.



## Features

- **Glanceable home screen** — open the app and instantly see which bin, how many days away, and the exact date
- **Fully flexible schedule engine** — define a multi-week programme with any combination of days and bins per week. Supports:
  - Single bin every week
  - Fortnightly alternating (the classic UK two-bin cycle)
  - Three-bin rotation
  - Mixed weeks — e.g. general waste Tuesdays every week, recycling and garden waste alternating Fridays
- **Any number of bin types** — name them, label them, pick a colour. Includes brown (garden waste) and black as colour options
- **Bank holiday overrides** — nudge a specific collection date when the council moves it
- **Month calendar view** — see the full month at a glance with coloured dots on each collection day
- **Evening and morning reminders** — optional notifications the night before and morning of collection
- **Swipe navigation** — swipe left/right to move between Home, Calendar, and Settings
- **Android back button** — works as expected, navigates back through tabs rather than closing the app
- **Offline-first PWA** — installs to your home screen and works with no internet connection

---

## Getting Started

### Install on your phone

1. Host the three files on any web server (see [Hosting](#hosting) below)
2. Open the URL in **Chrome** (Android) or **Safari** (iPhone/iPad)
3. **Android:** tap the three-dot menu → *Add to Home screen*
4. **iPhone:** tap the Share button → *Add to Home Screen*

The app will install with its own icon and open full-screen with no browser chrome.

### First-time setup

The app walks you through a short onboarding flow:

1. **Area / street name** — just for your own reference
2. **Bin types** — add each bin your council collects (name, label, colour)
3. **Your programme** — define each week in your cycle: which days, which bins
4. **Anchor date** — pick any Monday that was the start of Week 1 in your cycle
5. **Reminders** — optional evening and morning notifications

You can go back and change any step at any time from Settings.

---

## Setting Up Your Schedule

The schedule is built around **week programmes**. You define N weeks, each with one or more collection slots (day + bin type), and the pattern repeats forever.

### Examples

**Simple fortnightly alternating (most common UK setup):**
```
Week 1: Tuesday → General waste
Week 2: Tuesday → Recycling
```

**Three-bin rotation:**
```
Week 1: Tuesday → General waste
Week 2: Tuesday → Recycling
Week 3: Tuesday → Garden waste
```

**Mixed — collections on different days in different weeks:**
```
Week 1: Tuesday → General waste
Week 2: Tuesday → Recycling, Friday → Garden waste
```

**Two collections every week:**
```
Week 1: Tuesday → General waste, Friday → Recycling
```

Once your programme is set, pick any **Monday** that was the start of Week 1 — check a past council letter, bin calendar, or just look at a recent Tuesday and count back. The app handles everything from there.

---

## File Structure

```
binday/
├── index.html      # The entire app — all HTML, CSS and JS in one file
├── manifest.json   # PWA manifest — name, icons, theme colour
└── sw.js           # Service worker — offline caching
```

All three files must be in the same directory.

---

## Hosting

The simplest free option is **GitHub Pages**:

1. Fork or clone this repo
2. Go to **Settings → Pages**
3. Set source to *Deploy from branch* → `main` → `/ (root)`
4. Your app will be live at `https://yourusername.github.io/binday/`

Other options that work fine: Netlify, Vercel, Cloudflare Pages, or any basic web host.

> **Note:** The app must be served over **HTTPS** for the service worker (offline support) and home screen install to work. GitHub Pages, Netlify, and Vercel all provide HTTPS automatically.

---

## Updating the App

If you make changes and redeploy, users who have already installed the app will get the update automatically the next time they open it with an internet connection. The service worker handles cache invalidation — just bump the `CACHE` version in `sw.js` if you want to force an immediate refresh.

---

## Browser Support

| Platform | Browser | Install to home screen |
|---|---|---|
| Android | Chrome | ✅ |
| iOS 16.4+ | Safari | ✅ |
| iOS | Chrome | ✅ (via share sheet) |
| Desktop | Chrome / Edge | ✅ |
| Desktop | Firefox | ⚠️ No install, app works fine |
| Desktop | Safari | ✅ macOS Sonoma+ |

---

## Tech Stack

No frameworks, no build tools, no dependencies.

- Vanilla HTML, CSS and JavaScript — a single `index.html`
- [Geist](https://vercel.com/font) — typeface by Vercel, loaded from Google Fonts
- Web Storage API (`localStorage`) for config persistence
- Service Worker API for offline caching
- History API for back button / swipe navigation
- CSS `transform` + `transition` for tab slide animations

---

## Customisation

Everything is driven by the config object saved in `localStorage`. Bin types, colours, schedule programme, notification times — all editable through the Settings screen in the app. Nothing is hardcoded.

If you want to change the default bin types that appear during onboarding, edit the `DEFAULT_CONFIG.binTypes` array near the top of the `<script>` block in `index.html`.

---

## Made by

**snazzygaz** — [@snazzygaz](https://instagram.com/snazzygaz) on Instagram

---

## Licence

MIT — do whatever you like with it.
