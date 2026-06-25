import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../styles.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Iyad Eltifi | Cloud Computing, Web Systems & PageFoundry",
  description:
    "Iyad Eltifi - Tampa-based cloud computing & IT student and founder of PageFoundry. Modern, fast, mobile-first websites for small businesses.",
  openGraph: {
    title: "Iyad Eltifi | PageFoundry",
    description:
      "Modern, fast, mobile-first websites for small businesses. Built by a cloud computing & IT student and PageFoundry founder.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
