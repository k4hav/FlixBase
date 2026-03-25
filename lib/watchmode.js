const WATCHMODE_KEY = process.env.NEXT_PUBLIC_WATCHMODE_KEY;

// Platform name + color mapping
const PLATFORM_MAP = {
  'Netflix':          { color: '#E50914', icon: 'N' },
  'Amazon Prime':     { color: '#00A8E1', icon: 'P' },
  'Disney+':          { color: '#113CCF', icon: 'D' },
  'Hotstar':          { color: '#1F80E0', icon: 'H' },
  'Apple TV+':        { color: '#555555', icon: 'A' },
  'HBO Max':          { color: '#5822B4', icon: 'H' },
  'Hulu':             { color: '#1CE783', icon: 'H' },
  'Peacock':          { color: '#0057FF', icon: 'P' },
  'Paramount+':       { color: '#0064FF', icon: 'P' },
  'Mubi':             { color: '#000000', icon: 'M' },
  'YouTube Premium':  { color: '#FF0000', icon: 'Y' },
  'JioCinema':        { color: '#6B4DE6', icon: 'J' },
  'SonyLIV':          { color: '#0057A8', icon: 'S' },
  'ZEE5':             { color: '#7B2FBE', icon: 'Z' },
};

function getPlatformInfo(name) {
  for (const [key, val] of Object.entries(PLATFORM_MAP)) {
    if (name?.toLowerCase().includes(key.toLowerCase())) return { ...val, name: key };
  }
  return { color: '#c9a84c', icon: name?.charAt(0) || '?', name };
}

export async function getStreamingSources(title, year) {
  if (!WATCHMODE_KEY) return [];
  try {
    // Step 1: Search for the title
    const cleanTitle = title.replace(/\s*\(?\d{4}\)?\s*$/,'').trim();
const searchRes = await fetch(
  `https://api.watchmode.com/v1/search/?apiKey=${WATCHMODE_KEY}&search_field=name&search_value=${encodeURIComponent(cleanTitle)}`
);
```
    const searchData = await searchRes.json();
    if (!searchData.title_results?.length) return [];

    // Pick best match by year if available
    let match = searchData.title_results[0];
    if (year) {
      const byYear = searchData.title_results.find(t => String(t.year) === String(year));
      if (byYear) match = byYear;
    }

    // Step 2: Get streaming sources
    const sourcesRes = await fetch(
      `https://api.watchmode.com/v1/title/${match.id}/sources/?apiKey=${WATCHMODE_KEY}`
    );
    const sources = await sourcesRes.json();
    if (!Array.isArray(sources)) return [];

    // Filter: subscription/free only, unique platforms
    const seen = new Set();
    return sources
      .filter(s => ['sub', 'free'].includes(s.type))
      .filter(s => { if (seen.has(s.name)) return false; seen.add(s.name); return true; })
      .slice(0, 8)
      .map(s => ({ ...getPlatformInfo(s.name), url: s.web_url || '#' }));
  } catch {
    return [];
  }
}
