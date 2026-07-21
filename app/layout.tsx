import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IMAX through the years",
  description:
    "The giant screen, measured — a data study of every film released in IMAX from 1994 to 2026. 1,406 films, what got made, how it was filmed, and what made films succeed.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply saved theme + text settings before first paint so returning
            users never see a flash of the wrong theme, size, or contrast. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;var t=localStorage.getItem('imax-theme');if(t==='light')d.setAttribute('data-theme','light');var S={s:'0.9',m:'1',l:'1.15',xl:'1.3'};var sc=localStorage.getItem('imax-font-scale');if(sc&&S[sc])d.style.setProperty('--font-scale',S[sc]);if(localStorage.getItem('imax-font')==='dyslexic')d.setAttribute('data-a11y-font','dyslexic');if(localStorage.getItem('imax-contrast')==='high')d.setAttribute('data-a11y-contrast','high');var m=localStorage.getItem('imax-motion');var osR=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(m==='on'||(m!=='off'&&!osR))d.setAttribute('data-motion','on');}catch(e){}})();",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
