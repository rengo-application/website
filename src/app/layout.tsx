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
  title: {
    default: "RENGO | Alquiler de vehículos en Honduras",
    template: "RENGO",
  },
  description:
    "Descubre la nueva forma de alquilar un carro en Honduras. Renta directamente de dueños locales: más opciones, mejor precio y trato directo.",
  metadataBase: new URL("https://www.rengo.hn"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "RENGO | Alquiler de vehículos en Honduras",
    description:
      "Descubre la nueva forma de alquilar un carro en Honduras. Renta directamente directo de dueños locales: más opciones, mejor precio y trato directo.",
    url: "https://www.rengo.hn",
    siteName: "RENGO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RENGO | Alquiler de vehículos en Honduras",
    description:
      "Descubre la nueva forma de alquilar un carro en Honduras. Renta directamente de dueños locales: más opciones, mejor precio y trato directo.",
  },
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
