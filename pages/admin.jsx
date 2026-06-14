'use client';
import { useState, useEffect } from 'react';

export default function Admin() {
  const words = ["NICE TRY", "MOTHERFAKAR"];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="container">
      <h1 className="text" key={i}>{words[i]}</h1>
      <style jsx>{`...same CSS...`}</style>
    </div>
  );
}
