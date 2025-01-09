import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
       <Head>
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
