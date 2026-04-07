# 🗑️ Bin Day

Bin reminder app

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

**Different cycle lengths at once:**
```
Week 1: Wednesday → Food waste, Thursday → General waste
Week 2: Thursday → Recycling
Week 3: Wednesday → Food waste, Thursday → Garden waste
Week 4: Thursday → General waste
Week 5: Wednesday → Food waste, Thursday → Recycling
Week 6: Thursday → Garden waste
```
If one collection repeats every 3 weeks and another every 2, build the shortest full repeat for the whole programme. In that example, `3` and `2` line up every `6` weeks, so you make a 6-week cycle.
You can now do this from the app with the built-in **Cycle helper**, which generates the full programme for you and then lets you tweak it manually if needed.

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

## Customisation

Everything is driven by the config object saved in `localStorage`. Bin types, colours, schedule programme, notification times — all editable through the Settings screen in the app. Nothing is hardcoded.

If you want to change the default bin types that appear during onboarding, edit the `DEFAULT_CONFIG.binTypes` array near the top of the `<script>` block in `index.html`.

---

## By

**snazzygaz** — [@snazzygaz](https://instagram.com/snazzygaz) on Instagram

---

## Licence

MIT — do whatever you like with it.
