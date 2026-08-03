<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=FlixBase&fontSize=70&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Your%20Cinematic%20Universe&descAlignY=58&descSize=20" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=C9A84C&center=true&vCenter=true&width=600&lines=Discover+Movies%2C+Web+Series+%26+Anime;Find+Download+Links+%E2%80%A2+Build+Your+Collection;100%25+Free+%E2%80%A2+No+Login+%E2%80%A2+No+Ads" alt="Typing SVG" />

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-flix--base.vercel.app-c9a84c?style=for-the-badge&logo=vercel&logoColor=white)](https://flix-base.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge&logo=apache)](LICENSE)

![Stars](https://img.shields.io/github/stars/k4hav/FlixBase?style=for-the-badge&color=gold)
![Forks](https://img.shields.io/github/forks/k4hav/FlixBase?style=for-the-badge&color=blue)
![Last Commit](https://img.shields.io/github/last-commit/k4hav/FlixBase?style=for-the-badge&color=orange)
![Repo Size](https://img.shields.io/github/repo-size/k4hav/FlixBase?style=for-the-badge&color=purple)

<img src="https://cdn.pixabay.com/animation/2023/10/10/13/26/13-26-07-593_512.gif" width="300"/>

</div>

---

## ✨ What is FlixBase?

FlixBase is a self-hosted, community-driven movie hub where anyone can add movies and web series, share download links, and request their favourite titles. No subscriptions, no ads, no login required — completely free.

<div align="center">

![Snake animation](https://github.com/k4hav/k4hav/blob/output/github-contribution-grid-snake.svg)

</div>

---

## 🚀 Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🌌 Cinematic UI | Dark theme with animated constellation background and shooting stars |
| 🔍 Instant Search | Search by title, genre, or language in real time |
| 🎞️ Movie Cards | 3D tilt cards with poster, rating, genre, and download count |
| ⬇️ Download Links | Multiple download links per title with quality info (1080p, 4K, etc.) |
| 📺 Anime Section | Dedicated anime category with filter |
| ❤️ My Collection | Save favourites to browser — no login needed |
| 📥 Request System | Users can request movies and upvote each other's requests |
| 👤 Uploader Credit | Uploaded by name shown on movie page |
| 🛡️ Admin Panel | Add, edit, delete movies and manage requests |
| 🚀 Free Hosting | Deploy on Vercel for free |
| 🗄️ Free Database | Powered by Supabase free tier |

</div>

---

## 🛠️ Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with SSG and ISR |
| **Supabase** | PostgreSQL database and API |
| **Framer Motion** | Animations, transitions, 3D effects |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon library |

---

## 📁 Project Structure

```
flixbase/
├── components/
│   ├── CinematicBackground.jsx   ← Canvas star + constellation animation
│   ├── MovieCard.jsx             ← 3D tilt card with heart save button
│   ├── Navbar.jsx                ← Animated navbar with collection badge
│   ├── SearchBar.jsx             ← Animated search input
│   └── AddMovieForm.jsx          ← Movie form with download link builder
├── hooks/
│   └── useCollection.js          ← localStorage collection hook
├── lib/
│   └── supabase.js               ← All database functions
├── pages/
│   ├── index.jsx                 ← Home — hero, search, movie grid
│   ├── submit.jsx                ← Public add movie page
│   ├── collection.jsx            ← My saved collection
│   ├── requests.jsx              ← Community movie requests
│   ├── admin.jsx                 ← Admin panel
│   ├── movies/[id].jsx           ← Movie detail page
│   ├── _app.jsx                  ← Global layout + page transitions
│   └── _document.jsx             ← SEO, fonts, favicon
├── styles/
│   └── globals.css               ← Custom CSS, dark theme, animations
├── supabase/
│   └── schema.sql                ← Run this first in Supabase SQL Editor
└── public/
    ├── favicon.svg
    └── site.webmanifest
```

---

## ⚡ Quick Setup Guide

### Step 1 — Clone the Repository

```bash
git clone https://github.com/k4hav/FlixBase.git
cd FlixBase
```

### Step 2 — Set Up Supabase Database (Free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** and wait ~2 minutes for setup
3. Go to **SQL Editor** → **New Query**
4. Paste the entire contents of `supabase/schema.sql` and click **Run**
5. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon public` key

### Step 3 — Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4 — Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🌐 Deploy on Vercel (Free)

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/k4hav/FlixBase)

</div>

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → import your `FlixBase` repository
4. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy** — your site will be live in ~2 minutes

You will receive a free domain like `flixbase.vercel.app`

---

## 📖 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero section, search bar, movie grid with filters |
| Movie Detail | `/movies/[id]` | Full info, poster, download links, uploader credit |
| Add Movie | `/submit` | Public page — anyone can add a movie |
| My Collection | `/collection` | Browser-saved favourites (no login needed) |
| Requests | `/requests` | Submit and upvote movie requests |
| Admin | `/admin` | Edit, delete movies and manage requests |

---

## 🎬 How to Add a Movie

1. Go to `/submit` (or click **Add Movie** in the navbar)
2. Enter your name so you get credited
3. Fill in the title (only required field — everything else is optional)
4. Add a poster image URL (right-click any poster image → Copy image address)
5. Add download links with quality info like `1080p HD`, `Season 1 Ep 1-12`, `4K HDR`
6. Click **Add to FlixBase Library**

---

## ❤️ My Collection Feature

- Hover over any movie card and click the **heart icon** to save it
- Go to `/collection` to view all saved titles
- Collection is stored in your **browser's localStorage** — no account needed
- Stays saved even after closing the tab or browser

---

## ⚠️ Important Notes

- **Never push `.env.local` to GitHub** — it contains your secret keys
- The `.gitignore` file already blocks it automatically
- Add environment variables manually in the Vercel dashboard
- Supabase free tier includes 500MB database storage and unlimited reads

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

<div align="center">

![Contributors](https://contrib.rocks/image?repo=k4hav/FlixBase)

</div>

---

## 📄 License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made by [k4hav](https://github.com/k4hav)

⭐ Star this repo if you found it useful!

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer"/>

</div>
