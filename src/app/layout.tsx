import Providers from "./providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RENGO",
  description: "Alquiler de vehículos en Honduras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function () {
        try {
          var stored = localStorage.getItem("theme"); // "light" | "dark" | null
          var theme = (stored === "light" || stored === "dark") ? stored : "dark"; // default: dark
          document.documentElement.classList.toggle("dark", theme === "dark");
        } catch (e) {}
        })();
      `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
