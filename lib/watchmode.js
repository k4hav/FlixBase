const WATCHMODE_KEY = process.env.NEXT_PUBLIC_WATCHMODE_KEY;

const PLATFORM_MAP = {
  'Netflix':         { color: '#E50914', icon: 'N' },
  'Amazon Prime':    { color: '#00A8E1', icon: 'P' },
  'Disney+':         { color: '#113CCF', icon: 'D' },
  'Hotstar':         { color: '#1F80E0', icon: 'H' },
  'Apple TV+':       { color: '#555555', icon: 'A' },
  'HBO Max':         { color: '#5822B4', icon: 'H' },
  'Hulu':            { color: '#1CE783', icon: 'H' },
  'JioCinema':       { color: '#6B4DE6', icon: 'J' },
  'SonyLIV':         { color: '#0057A8', icon: 'S' },
  'ZEE5':            { color: '#7B2FBE', icon: 'Z' },
  'YouTube Premium': { color: '#FF0000', icon: 'Y' },
  'Mubi':            { color: '#000000', icon: 'M' },
};

function getPlatformInfo(name) {
  for (const key of Object.keys(PLATFORM_MAP)) {
    if (name && name.toLowerCase().includes(key.toLowerCase())) {
      return { ...PLATFORM_MAP[key], name: key };
    }
  }
  return { color: '#c9a84c', icon: (name || '?').charAt(0), name: name || 'Unknown' };
}

export async function getStreamingSources(title, year) {
  if (!WATCHMODE_KEY) return [];
  try {
    const cleanTitle = title.replace(/\s*\(?\d{4}\)?\s*$/, '').trim();
    const searchUrl = 'https://api.watchmode.com/v1/search/?apiKey=' + WATCHMODE_KEY + '&search_field=name&search_value=' + encodeURIComponent(cleanTitle);
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    if (!searchData.title_results || !searchData.title_results.length) return [];

    let match = searchData.title_results[0];
    if (year) {
      const byYear = searchData.title_results.find(function(t) {
        return String(t.year) === String(year);
      });
      if (byYear) match = byYear;
    }

    const sourcesUrl = 'https://api.watchmode.com/v1/title/' + match.id + '/sources/?apiKey=' + WATCHMODE_KEY;
    const sourcesRes = await fetch(sourcesUrl);
    const sources = await sourcesRes.json();
    if (!Array.isArray(sources)) return [];

    const seen = new Set();
    return sources
      .filter(function(s) { return s.type === 'sub' || s.type === 'free'; })
      .filter(function(s) {
        if (seen.has(s.name)) return false;
        seen.add(s.name);
        return true;
      })
      .slice(0, 8)
      .map(function(s) {
        return Object.assign({}, getPlatformInfo(s.name), { url: s.web_url || '#' });
      });
  } catch (e) {
    return [];
  }
}
