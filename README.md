# Pool Party 🏊

**poolpartycanada.com** — The official site for Pool Party Canada.

## Pages

- **Dashboard** (`index.html`) — Landing page with hero image, stats ribbon, and portal cards
- **Money & Guests** (`money.html`) — Guest contributions tracker with sortable table and stats
- **Gallery** (`pictures.html`) — Photo gallery with lightbox viewer
- **Login** (`login.html`) — PIN entry + Google sign-in gate

## Tech Stack

- **Auth**: Firebase Authentication (Google sign-in + PIN gate)
- **Photos**: Google Drive thumbnail API
- **Hosting**: GitHub Pages with custom domain (CNAME)
- **Styling**: Vanilla CSS with dark/light theme toggle
- **Scripts**: Vanilla JS (no frameworks)

## Features

- Full-bleed immersive layout across all pages
- Dark & light theme with `localStorage` persistence
- Responsive design (mobile-friendly)
- Lightbox photo viewer with keyboard/scroll lock
- Route guard with `?next=` redirect param
- Sortable guest table
- Animated hero with random party photos
- Ticker marquee footer

## Structure

```
index.html          Landing / Dashboard
money.html          Money & Guests tracker
pictures.html       Photo Gallery
login.html          Authentication gate
css/
  styles.css        Global base theme & components
  landing.css       Landing page (hero, bubbles, waves, ribbon)
  pages.css         Money & Gallery shared styles
  gallery.css       Photo grid & lightbox
  login.css         Login page layout
js/
  firebase-init.js  Firebase config
  nav.js            Navigation bar injection
  nav-auth.js       Auth state in nav
  guard.js          Route protection
  theme.js          Light/dark toggle
  hero.js           Random hero image
  login.js          PIN + Google sign-in
  gallery.js        Photo grid + lightbox
  render_attendees.js  Guest table rendering
  sortable.js       Table column sorting
  stats.js          Stats dashboard
  ticker.js         Marquee ticker
  tabs.js           Tab switching
  random_hero.js    Hero image selection
data/
  attendees.json    Guest list data
  pictures.json     Photo IDs
  ticker.json       Ticker messages
```
