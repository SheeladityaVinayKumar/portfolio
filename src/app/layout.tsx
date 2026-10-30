import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#fafbfc",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sheeladitya.dev"),
  title: "Sheeladitya Vinay Kumar | Software Engineer Portfolio",
  description:
    "Portfolio of Sheeladitya Vinay Kumar — Software Engineer specializing in React, Next.js, JavaScript, Python, Django, and WordPress. Explore production projects and chat with my AI Agent.",
  keywords: [
    "Sheeladitya Vinay Kumar",
    "Software Engineer",
    "React",
    "Next.js",
    "Python",
    "Django",
    "WordPress",
    "ColoredCow",
    "SankalpTaru",
    "G1 Ground Team"
  ],
  authors: [{ name: "Sheeladitya Vinay Kumar" }],
  openGraph: {
    title: "Sheeladitya Vinay Kumar | Software Engineer Portfolio",
    description:
      "Software Engineer portfolio featuring Apple Bento Grid, interactive terminal, and built-in AI Agent representative.",
    images: ["/assets/images/avatar.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Life+Savers:wght@400;700;800&family=Meow+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
