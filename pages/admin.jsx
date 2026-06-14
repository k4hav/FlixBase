export default function Admin() {
  return (
    <div className="container">
      <h1 className="text" id="seq-text"></h1>
      <style jsx>{`
        .container {
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 0 16px;
          box-sizing: border-box;
        }
        .text {
          font-size: clamp(32px, 12vw, 160px);
          font-weight: 900;
          color: #ff0000;
          text-align: center;
          text-transform: uppercase;
          white-space: nowrap;
          margin: 0;
          letter-spacing: 2px;
          text-shadow:
            0 0 10px rgba(255, 0, 0, 0.8),
            0 0 20px rgba(255, 0, 0, 0.7),
            0 0 40px rgba(255, 0, 0, 0.6);
          opacity: 0;
          animation:
            popIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
            glow 2s ease-in-out infinite alternate,
            float 3s ease-in-out infinite;
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes glow {
          from {
            text-shadow:
              0 0 10px rgba(255, 0, 0, 0.7),
              0 0 20px rgba(255, 0, 0, 0.6);
          }
          to {
            text-shadow:
              0 0 20px rgba(255, 0, 0, 1),
              0 0 40px rgba(255, 0, 0, 0.9),
              0 0 80px rgba(255, 0, 0, 0.8);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        /* Mobile optimization */
        @media (max-width: 600px) {
          .text {
            font-size: clamp(28px, 14vw, 80px);
            letter-spacing: 1px;
            white-space: normal;
            line-height: 1.2;
          }
        }
      `}</style>

      {/* Sequential word swap logic */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const words = ["NICE TRY", "MOTHERFAKAR"];
              let i = 0;
              const el = document.getElementById('seq-text');

              function show() {
                el.textContent = words[i];
                el.style.animation = 'none';
                void el.offsetWidth; // restart animation
                el.style.animation =
                  'popIn 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards, glow 2s ease-in-out infinite alternate, float 3s ease-in-out infinite';
              }

              show();
              setInterval(() => {
                i = (i + 1) % words.length;
                show();
              }, 1800);
            })();
          `,
        }}
      />
    </div>
  );
}
