-- ═══════════════════════════════════════════
--  FlixHub — Supabase Schema
--  Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ── Movies Table ──────────────────────────
create table if not exists movies (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  year        text,
  type        text default 'Movie',        -- Movie | Series | Documentary | Short Film
  language    text,
  genre       text,
  rating      text,
  poster_url  text,
  overview    text,
  links       jsonb default '[]'::jsonb,   -- [{label, url, color}]
  featured    boolean default false,
  created_at  timestamptz default now()
);

-- ── Requests Table ────────────────────────
create table if not exists requests (
  id            uuid default gen_random_uuid() primary key,
  title         text not null,
  requested_by  text,
  note          text,
  votes         integer default 0,
  fulfilled     boolean default false,
  created_at    timestamptz default now()
);

-- ── Row Level Security ────────────────────
alter table movies   enable row level security;
alter table requests enable row level security;

-- Public can read everything
create policy "public_read_movies"   on movies   for select using (true);
create policy "public_read_requests" on requests for select using (true);

-- Public can insert
create policy "public_insert_movies"   on movies   for insert with check (true);
create policy "public_insert_requests" on requests for insert with check (true);

-- Public can update (for votes, admin edits)
create policy "public_update_movies"   on movies   for update using (true);
create policy "public_update_requests" on requests for update using (true);

-- Public can delete (admin)
create policy "public_delete_movies" on movies for delete using (true);

-- ── Seed Sample Data ──────────────────────
insert into movies (title, year, type, language, genre, rating, poster_url, overview, links, featured) values
(
  'Pushpa 2: The Rule', '2024', 'Movie', 'Telugu/Hindi', 'Action',  '8.3',
  'https://image.tmdb.org/t/p/w342/eTlR0swrUJL0y6yjGWBFkOJvCMW.jpg',
  'Pushpa Raj expands his red-sandalwood smuggling empire and faces a fierce new antagonist bent on destroying everything he has built.',
  '[{"label":"JioCinema","url":"https://www.jiocinema.com","color":"#6B4DE6"},{"label":"Amazon Prime","url":"https://www.primevideo.com","color":"#00A8E1"}]',
  true
),
(
  'Stree 2', '2024', 'Movie', 'Hindi', 'Horror Comedy', '7.9',
  'https://image.tmdb.org/t/p/w342/pvBHkB2MzO0L9OwxFwcuJDfX7gL.jpg',
  'The gang of Chanderi faces a far more terrifying supernatural force than Stree — one that may require an unlikely alliance to defeat.',
  '[{"label":"Netflix","url":"https://www.netflix.com","color":"#E50914"}]',
  true
),
(
  'Mirzapur S3', '2024', 'Series', 'Hindi', 'Crime Drama', '8.1',
  'https://image.tmdb.org/t/p/w342/2sLUoMmYlEEt8cq6DQhz8oTIUcW.jpg',
  'The power struggle for control of Mirzapur reaches a boiling point as old loyalties shatter and new blood rises to claim the throne.',
  '[{"label":"Amazon Prime","url":"https://www.primevideo.com","color":"#00A8E1"}]',
  false
),
(
  'Animal', '2023', 'Movie', 'Hindi', 'Action Drama', '6.8',
  'https://image.tmdb.org/t/p/w342/oaGvjB0DvdhXhOAuEV3F9VM1xSO.jpg',
  'A son''s obsessive devotion to his father spirals into violence and vengeance as corporate conspiracies and family betrayals collide.',
  '[{"label":"Netflix","url":"https://www.netflix.com","color":"#E50914"},{"label":"JioCinema","url":"https://www.jiocinema.com","color":"#6B4DE6"}]',
  false
);

insert into requests (title, requested_by, note, votes) values
('KGF Chapter 3', 'Vikram', 'Rocky Bhai is back — please add ASAP!', 24),
('Panchayat Season 4', 'Ananya', 'Best Indian series ever. Waiting eagerly!', 17),
('Kalki 2898-AD', 'Rohan', 'Prabhas and Deepika — this will be epic.', 11);
