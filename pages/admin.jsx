export default function Admin() {
  return (
    <div className="container">
      <h1 className="glitch" data-text="NICE TRY">
        NICE TRY MOTHERFAKAR
      </h1>

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #000;
          overflow: hidden;
        }

        .glitch {
          position: relative;
          font-size: clamp(80px, 12vw, 220px);
          font-weight: 900;
          color: #fff;
          text-transform: uppercase;
          animation: flicker 2s infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch::before {
          color: #ff0000;
          animation: glitch1 0.5s infinite;
        }

        .glitch::after {
          color: #00ffff;
          animation: glitch2 0.5s infinite;
        }

        @keyframes glitch1 {
          0% { transform: translate(0); }
          20% { transform: translate(-5px, 5px); }
          40% { transform: translate(-5px, -5px); }
          60% { transform: translate(5px, 5px); }
          80% { transform: translate(5px, -5px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch2 {
          0% { transform: translate(0); }
          20% { transform: translate(5px, -5px); }
          40% { transform: translate(5px, 5px); }
          60% { transform: translate(-5px, -5px); }
          80% { transform: translate(-5px, 5px); }
          100% { transform: translate(0); }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
          52% { opacity: 0.3; }
          54% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
