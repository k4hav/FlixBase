import { useEffect, useRef } from 'react';

export default function CinematicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let t = 0, raf;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    // Deep star field — warm tones
    const stars = Array.from({ length: 320 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      ts: 0.004 + Math.random() * 0.01,
      color: Math.random() > 0.7 ? '255,230,160' : Math.random() > 0.5 ? '200,200,255' : '255,255,255',
      alpha: 0.2 + Math.random() * 0.6,
    }));

    // Warm nebula clouds
    const nebulae = [
      { x: 0.12, y: 0.18, rx: 340, ry: 200, color: '201,168,76', a: 0.055 },
      { x: 0.78, y: 0.7,  rx: 280, ry: 320, color: '120,80,200', a: 0.04  },
      { x: 0.55, y: 0.9,  rx: 350, ry: 180, color: '180,100,60', a: 0.035 },
      { x: 0.9,  y: 0.2,  rx: 200, ry: 240, color: '201,168,76', a: 0.03  },
    ];

    // Constellation lines
    const constNodes = Array.from({ length: 14 }, () => ({
      x: 0.05 + Math.random() * 0.9, y: 0.05 + Math.random() * 0.9,
    }));
    const constEdges = [];
    constNodes.forEach((n, i) => {
      const next = constNodes[(i + 1) % constNodes.length];
      const dist = Math.hypot((n.x - next.x) * W, (n.y - next.y) * H);
      if (dist < 220) constEdges.push([n, next]);
    });

    // Shooting stars
    const shoots = [];
    const spawnShoot = () => shoots.push({
      x: Math.random() * W * 0.8, y: Math.random() * H * 0.35,
      len: 70 + Math.random() * 100, speed: 7 + Math.random() * 9,
      alpha: 0.9, angle: Math.PI / 5.5 + (Math.random() - 0.5) * 0.25,
    });
    const shootInterval = setInterval(spawnShoot, 3200 + Math.random() * 2000);

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      // Base sky gradient
      const sky = ctx.createRadialGradient(W * 0.4, H * 0.3, 0, W * 0.5, H * 0.5, W * 0.9);
      sky.addColorStop(0,   'rgba(16,14,28,1)');
      sky.addColorStop(0.5, 'rgba(10,10,18,1)');
      sky.addColorStop(1,   'rgba(6,6,12,1)');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

      // Nebulae
      nebulae.forEach(n => {
        const dx = Math.sin(t * 0.0005 + n.x * 8) * 20;
        const dy = Math.cos(t * 0.0004 + n.y * 6) * 14;
        const nx = n.x * W + dx, ny = n.y * H + dy;
        ctx.save();
        ctx.scale(1, n.ry / n.rx);
        const g = ctx.createRadialGradient(nx, ny * (n.rx / n.ry), 0, nx, ny * (n.rx / n.ry), n.rx);
        g.addColorStop(0,   `rgba(${n.color},${n.a})`);
        g.addColorStop(0.5, `rgba(${n.color},${n.a * 0.35})`);
        g.addColorStop(1,   `rgba(${n.color},0)`);
        ctx.beginPath(); ctx.arc(nx, ny * (n.rx / n.ry), n.rx, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill(); ctx.restore();
      });

      // Constellation
      ctx.lineWidth = 0.4;
      constEdges.forEach(([a, b]) => {
        const pulse = 0.03 + 0.02 * Math.sin(t * 0.008);
        ctx.strokeStyle = `rgba(201,168,76,${pulse})`;
        ctx.beginPath();
        ctx.moveTo(a.x * W, a.y * H);
        ctx.lineTo(b.x * W, b.y * H);
        ctx.stroke();
      });
      constNodes.forEach(n => {
        const p = 0.15 + 0.1 * Math.sin(t * 0.012 + n.x * 20);
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p})`; ctx.fill();
      });

      // Stars
      stars.forEach(s => {
        s.twinkle += s.ts;
        const a = s.alpha * (0.4 + 0.6 * Math.abs(Math.sin(s.twinkle)));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${a})`; ctx.fill();
      });

      // Shooting stars
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.02;
        if (s.alpha <= 0) { shoots.splice(i, 1); continue; }
        const tail = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        tail.addColorStop(0,   `rgba(255,245,200,${s.alpha})`);
        tail.addColorStop(0.4, `rgba(201,168,76,${s.alpha * 0.4})`);
        tail.addColorStop(1,   'rgba(201,168,76,0)');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.strokeStyle = tail; ctx.lineWidth = 1.2; ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(shootInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.85 }} />;
}
