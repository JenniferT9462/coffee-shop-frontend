import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/_next/static/media/6e48331146f8b4ca-s.p.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
          data-next-font="size-adjust"
        />
        <link
          rel="preload"
          href="/_next/static/media/3a8dc5763a8ae4b2-s.p.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
          data-next-font="size-adjust"
        />
        {/* Import Lobster and Lora fonts from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Lobster&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
