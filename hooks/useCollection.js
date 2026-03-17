import { useState, useEffect } from 'react';

const KEY = 'flixbase_collection';

export function useCollection() {
  const [collection, setCollection] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setCollection(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  const save = (newList) => {
    setCollection(newList);
    try { localStorage.setItem(KEY, JSON.stringify(newList)); } catch {}
  };

  const addToCollection = (movie) => {
    if (collection.find(m => m.id === movie.id)) return;
    save([{
      id: movie.id, title: movie.title, poster_url: movie.poster_url,
      type: movie.type, year: movie.year, rating: movie.rating,
      genre: movie.genre, language: movie.language, savedAt: Date.now()
    }, ...collection]);
  };

  const removeFromCollection = (id) => save(collection.filter(m => m.id !== id));
  const isInCollection       = (id) => collection.some(m => m.id === id);
  const clearCollection      = ()   => save([]);

  return { collection, addToCollection, removeFromCollection, isInCollection, clearCollection, loaded };
}
