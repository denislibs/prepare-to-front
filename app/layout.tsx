import type { Metadata } from "next";
import "./normalize.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Front-end Interview Prep",
  description: "Подготовка к собеседованию фронтенд разработчика",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preload" href="https://doka.guide/fonts/graphik/graphik-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://doka.guide/fonts/spot-mono/spot-mono-light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('color-theme') || localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = savedTheme || 'auto';
                document.documentElement.setAttribute('data-theme', theme === 'auto' ? systemTheme : theme);
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
