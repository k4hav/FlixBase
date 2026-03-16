import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Copy .env.local.example to .env.local and fill in your keys.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Movies ──────────────────────────────────────────────
export async function getMovies() {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getMovieById(id) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function addMovie(movie) {
  const { data, error } = await supabase
    .from('movies')
    .insert([movie])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateMovie(id, updates) {
  const { data, error } = await supabase
    .from('movies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMovie(id) {
  const { error } = await supabase.from('movies').delete().eq('id', id);
  if (error) throw error;
}

// ── Requests ────────────────────────────────────────────
export async function getRequests() {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('votes', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addRequest(req) {
  const { data, error } = await supabase
    .from('requests')
    .insert([req])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function voteRequest(id, currentVotes) {
  const { data, error } = await supabase
    .from('requests')
    .update({ votes: currentVotes + 1 })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fulfillRequest(id) {
  const { data, error } = await supabase
    .from('requests')
    .update({ fulfilled: true })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
