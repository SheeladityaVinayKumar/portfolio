import type { Metadata, Viewport } from "next";
import { Life_Savers, Meow_Script, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const meowScript = Meow_Script({
  variable: "--font-meow",
  subsets: ["latin"],
  weight: "400",
  display: "swap"
});

const lifeSavers = Life_Savers({
  variable: "--font-life-savers",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

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
    "Talent Evaluator"
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${meowScript.variable} ${lifeSavers.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
