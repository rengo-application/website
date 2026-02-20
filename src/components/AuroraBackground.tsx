"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white transition-colors duration-300 dark:bg-black">
      {/*
        IMPORTANT:
        - We set bg on the OUTER wrapper so the page cannot stay dark due to an uncovered parent.
        - We keep a dedicated backing layer to smooth transitions.
      */}

      {/* Theme-aware backing layer */}
      <div className="absolute inset-0 bg-white transition-colors duration-300 dark:bg-black" />

      {/* Light-mode wash (helps the site read as light) */}
      <div className="absolute inset-0 bg-white/85 transition-opacity duration-300 dark:opacity-0" />

      {/* Dark-mode wash (keeps contrast when dark) */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 dark:opacity-100 dark:bg-black" />

      {/* Aurora blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-40 mix-blend-multiply transition-opacity duration-300 dark:opacity-70 dark:mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.30), rgba(99,102,241,0) 60%)",
        }}
        animate={{ x: [0, 40, -10, 0], y: [0, 10, 35, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute bottom-[-180px] left-[20%] h-[560px] w-[560px] rounded-full blur-3xl opacity-55 mix-blend-multiply dark:opacity-70 dark:mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.28), rgba(99,102,241,0) 60%)",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute bottom-[-180px] left-[20%] h-[560px] w-[560px] rounded-full blur-3xl opacity-35 mix-blend-multiply transition-opacity duration-300 dark:opacity-70 dark:mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.20), rgba(16,185,129,0) 60%)",
        }}
        animate={{ x: [0, 20, -25, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid overlay (LIGHT) */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Subtle grid overlay (DARK) */}
      <div
        className="absolute inset-0 hidden opacity-[0.16] dark:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
