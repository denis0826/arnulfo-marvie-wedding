import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arnulfo Jr & Marvie Dane | April 23, 2027",
  description:
    "You are invited to the wedding of Arnulfo Bernaje Jr and Marvie Dane Tupas on Friday, April 23, 2027 in Bacolod City.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory font-serif text-ink antialiased">{children}</body>
    </html>
  );
}
