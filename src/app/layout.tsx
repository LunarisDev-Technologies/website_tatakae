import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TATAKAE LABS — Building Technology for What's Next",
  description:
    "TATAKAE LABS is a technology company focused on building intelligent software products, scalable digital platforms and custom technology solutions. We simplify complex business operations through thoughtfully engineered software.",
  keywords: [
    "TATAKAE LABS",
    "software development",
    "SaaS products",
    "web applications",
    "mobile apps",
    "business automation",
    "AI software",
    "digital transformation",
    "technology consulting",
  ],
  openGraph: {
    title: "TATAKAE LABS — Building Technology for What's Next",
    description:
      "Technology, thoughtfully engineered. We build digital products and intelligent systems that help businesses move forward.",
    url: "https://tatakae-labs.com",
    siteName: "TATAKAE LABS",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TATAKAE LABS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TATAKAE LABS — Building Technology for What's Next",
    description:
      "Technology, thoughtfully engineered. We build digital products and intelligent systems that help businesses move forward.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
