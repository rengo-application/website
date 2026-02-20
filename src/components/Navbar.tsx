"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const esHref = isEn
    ? pathname === "/en"
      ? "/"
      : pathname.replace(/^\/en\//, "/")
    : pathname;
  const enHref = isEn ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;

  const switchTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
    router.refresh();
  };

  const homePath = isEn ? "/en" : "/";
  const hostPath = isEn ? "/en/anfitrion" : "/anfitrion";
  const faqPath = isEn ? "/en/faq" : "/faq";

  const isHome = pathname === homePath;

  const sectionHref = (id: string) => {
    const hash = `#${id}`;
    return isHome ? hash : `${homePath}${hash}`;
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between rounded-2xl border border-zinc-200/60 bg-white/70 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-black/35"
        >
          <Link href={homePath} className="flex items-center gap-3">
            <Image
              src="/rengo-logo.jpg"
              alt="Rengo"
              width={120}
              height={36}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          {/* FAQ link (dedicated page) */}
          <Link
            href={faqPath}
            className="hidden text-sm text-zinc-700 hover:text-zinc-950 dark:text-white/70 dark:hover:text-white md:block"
          >
            FAQ
          </Link>

          {/* Right side: language switch above CTA */}
          <div className="flex flex-col items-end gap-3 relative -top-2">
            <div className="flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white/70 px-2 py-1 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-black/25 dark:text-white/70">
              <Link
                href={esHref}
                onClick={switchTo(esHref)}
                className={
                  "rounded-full px-2 py-1 transition " +
                  (isEn
                    ? "text-zinc-600 hover:text-zinc-950 dark:text-white/60 dark:hover:text-white"
                    : "bg-emerald-400/20 text-emerald-100 ring-1 ring-emerald-400/30")
                }
                aria-label="Cambiar a Español"
              >
                ES
              </Link>
              <Link
                href={enHref}
                onClick={switchTo(enHref)}
                className={
                  "rounded-full px-2 py-1 transition " +
                  (isEn
                    ? "bg-emerald-400/20 text-emerald-100 ring-1 ring-emerald-400/30"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-white/60 dark:hover:text-white")
                }
                aria-label="Switch to English"
              >
                EN
              </Link>
            </div>

            <Link
              href={hostPath}
              className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-sm text-zinc-950 hover:bg-emerald-300 dark:shadow-[0_0_0_1px_rgba(16,185,129,0.25)]"
            >
              {isEn ? "List your vehicle" : "Publica tu vehículo"}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
