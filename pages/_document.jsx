import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
 <Head>
  {/* Fonts */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet" />

  {/* Favicon */}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="shortcut icon" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/favicon.svg" />
  <link rel="manifest" href="/site.webmanifest" />

  {/* Theme */}
  <meta name="theme-color" content="#c9a84c" />
  <meta name="msapplication-TileColor" content="#0a0a0f" />

  {/* Primary SEO */}
  <meta name="description" content="FlixBase — Best free movie website to watch and download Hindi, Hollywood, Bollywood movies online. Free movie download website with 4K, 1080p, 720p links. Watch web series and anime free." />
  <meta name="keywords" content="free movie website, free movie download website, watch movie online free, download movie free website, best free movie website, hindi free movie website, bollywood free movie website, hollywood free movie website, free movie website list, watch free movie website, online free movie website, top free movie website, movie download website free, free web series download, anime download free, 4k movie download free, 1080p movie download, FlixBase, free movie website for pc, free movie website for laptop, which website is best for movie download free, in which website i can download movie free, best website for free movie download" />
  <meta name="author" content="FlixBase" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English, Hindi" />
  <meta name="revisit-after" content="3 days" />
  <meta name="rating" content="general" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="FlixBase" />
  <meta property="og:title" content="FlixBase — Free Movie Download Website | Watch Movies Online Free" />
  <meta property="og:description" content="Best free movie website to watch and download Bollywood, Hollywood, Hindi dubbed movies online. Find 4K, 1080p download links for movies, web series and anime — all free." />
  <meta property="og:url" content="https://flix-base.vercel.app" />
  <meta property="og:image" content="https://flix-base.vercel.app/og-image.jpg" />
  <meta property="og:locale" content="en_IN" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="FlixBase — Free Movie Download Website" />
  <meta name="twitter:description" content="Watch and download free movies, web series and anime online. Best free movie website with 4K, 1080p download links." />
  <meta name="twitter:image" content="https://flix-base.vercel.app/og-image.jpg" />

  {/* Mobile */}
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="FlixBase" />
  <meta name="application-name" content="FlixBase" />

  {/* Google Verification */}
  <meta name="google-site-verification" content="APNA_CODE_YAHAN" />

  {/* JSON-LD Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "FlixBase",
      "url": "https://flix-base.vercel.app",
      "description": "Free movie download website. Watch and download Bollywood, Hollywood, Hindi dubbed movies, web series and anime online for free.",
      "inLanguage": ["en", "hi"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://flix-base.vercel.app/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })}}
  />
</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
