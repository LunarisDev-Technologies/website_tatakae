import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05062F",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tatakaelabs.tech"),
  title: "TATAKAE LABS — Building Technology for What's Next",
  description:
    "TATAKAE LABS is a technology company focused on building intelligent software products, scalable digital platforms and custom technology solutions. We simplify complex business operations through thoughtfully engineered software.",
  keywords: [
    "TATAKAE LABS",
    "tatakaelabs.tech",
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
    url: "https://tatakaelabs.tech",
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
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
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
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
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
