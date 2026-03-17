import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ── Fonts ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet" />

        {/* ── Favicon & Icons ── */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Theme color (browser UI color) ── */}
        <meta name="theme-color" content="#c9a84c" />
        <meta name="msapplication-TileColor" content="#0a0a0f" />

        {/* ── SEO Meta Tags ── */}
        <meta name="description" content="FlixBase — Your cinematic universe. Discover movies, web series & anime. Find download links, request your favourites, and build your personal collection." />
        <meta name="keywords" content="FlixBase, movies, web series, anime, download movies, hindi movies, bollywood, watch online, movie download links, series download" />
        <meta name="author" content="FlixBase" />
        <meta name="robots" content="index, follow" />

        {/* ── Open Graph (WhatsApp, Facebook preview) ── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FlixBase" />
        <meta property="og:title" content="FlixBase — Your Cinematic Universe" />
        <meta property="og:description" content="Discover movies, web series & anime. Find download links and request your favourites — all in one place." />
        <meta property="og:url" content="https://flix-base.vercel.app" />
        <meta property="og:image" content="https://flix-base.vercel.app/og-image.jpg" />

        {/* ── Twitter Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FlixBase — Your Cinematic Universe" />
        <meta name="twitter:description" content="Discover movies, web series & anime. Find download links and request your favourites." />
        <meta name="twitter:image" content="https://flix-base.vercel.app/og-image.jpg" />

        {/* ── PWA / Mobile ── */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FlixBase" />
        <meta name="application-name" content="FlixBase" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
