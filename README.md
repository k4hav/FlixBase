# 🎬 FlixHub

**Futuristic movie & series aggregator** — Add your own movies, share watch links, and let users request new titles. Built with Next.js, Supabase, and Framer Motion.

---

## ✨ Features

- 🌌 **Futuristic dark UI** — animated particles, neon glow, 3D card tilt, custom cursor
- 🔍 **Instant search** — search by title, genre, or language
- 🎞️ **Movie detail pages** — poster, description, ratings, watch links
- 🔗 **Multi-platform links** — Netflix, JioCinema, Prime, Hotstar & more
- ⭐ **Requests system** — users request movies + upvote each other's requests
- 🛡️ **Admin panel** — add, edit, delete movies and manage requests
- ✨ **Framer Motion** — page transitions, scroll animations, hover effects
- 📦 **Supabase backend** — real database, no API keys needed in frontend
- 🚀 **Deploy free** on Vercel in minutes

---

## 🚀 Quick Setup (15 minutes)

### Step 1 — Create Supabase Project (FREE)

1. Go to **[supabase.com](https://supabase.com)** and sign up (free)
2. Click **"New Project"** → give it a name → set a database password
3. Wait ~2 minutes for it to set up
4. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon public` key

### Step 2 — Set up the Database

1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Paste the entire contents of `supabase/schema.sql`
4. Click **Run** — this creates all tables + sample data

### Step 3 — Configure Environment

```bash
# In the flixhub folder, create .env.local
cp .env.local.example .env.local
```

Open `.env.local` and fill in your keys:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4 — Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 🌐 Deploy to Vercel (FREE)

1. Push your code to **GitHub** (keep `.env.local` in `.gitignore` ✅)
2. Go to **[vercel.com](https://vercel.com)** → Import your repo
3. In "Environment Variables", add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy** — you get a free `.vercel.app` domain instantly!

---

## 📁 Project Structure

```
flixhub/
├── pages/
│   ├── index.jsx          ← Home — hero + search + movie grid
│   ├── requests.jsx       ← Request a movie + upvote others
│   ├── admin.jsx          ← Admin — add/edit/delete movies
│   ├── movies/[id].jsx    ← Movie detail page
│   ├── _app.jsx           ← Global layout + page transitions
│   └── _document.jsx      ← Font loading
├── components/
│   ├── Navbar.jsx         ← Animated sticky navbar
│   ├── MovieCard.jsx      ← 3D tilt card with glow
│   ├── SearchBar.jsx      ← Animated search input
│   ├── AddMovieForm.jsx   ← Full movie form with link builder
│   └── ParticleBackground.jsx  ← Canvas star/orb animation
├── lib/
│   └── supabase.js        ← All DB functions
├── styles/
│   └── globals.css        ← All custom CSS (neon, glass, cursor...)
└── supabase/
    └── schema.sql         ← Run this in Supabase SQL Editor
```

---

## 🎨 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero + search + full movie grid |
| Movie Detail | `/movies/[id]` | Poster, info, watch links |
| Requests | `/requests` | Submit & upvote requests |
| Admin | `/admin` | Add/edit/delete movies & manage requests |

---

## 🔧 Adding Movies

1. Go to `/admin`
2. Click **"Add New Movie"**
3. Fill in: Title, Year, Type, Language, Genre, Rating, Poster URL, Overview
4. Add platform links (Netflix, JioCinema etc.) with color picker
5. Toggle **Featured** to show it in the hero section

### Getting Poster URLs free:
- **TMDB** → [themoviedb.org](https://www.themoviedb.org) → Search movie → Right-click poster → Copy image address
- **Google Images** → Search `movie name poster` → Right-click → Copy image address

---

## 💡 Tech Stack

| Tech | Purpose |
|------|---------|
| **Next.js 14** | React framework with SSG/ISR |
| **Supabase** | PostgreSQL database (free tier) |
| **Framer Motion** | All animations & transitions |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon library |

---

## 🎯 Roadmap Ideas

- [ ] User authentication (Supabase Auth)
- [ ] Movie ratings & reviews by users
- [ ] Genre filter pages
- [ ] Admin password protection
- [ ] Search suggestions / autocomplete
- [ ] Dark/light mode toggle
- [ ] PWA support for mobile

---

Made with ❤️ — FlixHub
