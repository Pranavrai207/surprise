# Girish & Rekha - 24th Anniversary Website

A premium, fully interactive responsive website built using HTML5, CSS3, and JavaScript to celebrate the 24th marriage anniversary of Girish and Rekha (22nd June 2002).

## Features
- **Live Countdown**: Animated countdown clock matching the green, yellow, and white color aesthetic.
- **Letters of Love**: Clickable interactive envelopes that open up to reveal personalized letters.
- **Our Journey (Timeline)**: A beautiful responsive vertical timeline marking years of growth.
- **Memory Gallery**: Hover-zoom photo cards with a built-in image lightbox viewer.
- **Wishes Wall / Guestbook**: A fully functional guestbook that lets friends and family leave wishes, persisting them using `localStorage` (with category filtering!).
- **Floating Music Player**: Floating widget with controls to toggle background music on/off.
- **Falling Leaves/Rose Petals Canvas**: Fluid particle animation showing falling yellow and cream petals and green leaves.

---

## How to Run the Website

Since the site uses pure modern static assets, you do **not** need a complicated build pipeline. To run the site locally:

1. **Option A (Double Click)**: Simply open the `index.html` file in any modern web browser.
2. **Option B (Recommended for Dev)**: Run a local development server to enable full feature checking (especially for local storage and image loaders):
   ```bash
   # Run with npx (requires Node.js)
   npx -y live-server
   
   # Or using Python (built-in on most platforms)
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 📸 Adding Your Photos

To replace the placeholders with your parents' real photos, place your images in the `assets/` folder and name them exactly as shown below:

| File Name | Recommended Size | Used In |
|---|---|---|
| `hero.png` | 1920x1080 | Page background & Gallery candid photo |
| `wedding.png` | 800x600 | Timeline (2002) & Gallery item 1 |
| `parenthood.png` | 800x600 | Timeline (2005) & Gallery item 4 |
| `home.png` | 800x600 | Timeline (2020) & Gallery item 2 |
| `journey.png` | 800x600 | Timeline (2012) & Gallery item 3 |
| `silver.png` | 800x600 | Timeline (2026) & Gallery item 5 |
| `favicon.png` | 32x32 | Browser Tab icon |

*Note: All images should be in JPG/PNG format. If they are in another format (like JPEG or WEBP), you can rename them or adjust the file paths in `index.html` and `main.js`.*

---

## ⚙️ Customizing Content

You can easily adjust the settings directly in the files:

1. **Anniversary Date**: Open [main.js](file:///c:/surprise/main.js) and modify the `ANNIVERSARY_DATE` string on line 4 (e.g., to adjust the time zone or hour).
2. **Timeline Texts**: Open [index.html](file:///c:/surprise/index.html) and search for the `<div class="timeline-container">` container to update years, titles, or descriptions.
3. **Letters**: Search for `.letter-paper` inside [index.html](file:///c:/surprise/index.html) to edit the text for Girish, Rekha, or the children.
