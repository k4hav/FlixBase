export default function Admin() {
  return (
    <div className="container">
      <h1 className="text">NICE TRY MOTHERFAKAR</h1>

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .text {
          font-size: clamp(60px, 10vw, 180px);
          font-weight: 900;
          color: #ff0000;
          text-align: center;
          text-transform: uppercase;

          text-shadow:
            0 0 10px rgba(255, 0, 0, 0.8),
            0 0 20px rgba(255, 0, 0, 0.7),
            0 0 40px rgba(255, 0, 0, 0.6);

          animation:
            glow 2s ease-in-out infinite alternate,
            float 3s ease-in-out infinite;
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
      `}</style>
    </div>
  );
}
