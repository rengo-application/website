import Link from "next/link";

// ✅ EDITAR AQUÍ: rutas internas del sitio
const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Anfitrión", href: "/anfitrion" },
  { label: "FAQ", href: "/faq" },
  { label: "Términos y condiciones", href: "/terminos" },
];

// ✅ EDITAR AQUÍ: links EXACTOS a redes sociales
const SOCIAL_LINKS = {
  // facebook: "https://facebook.com/REEMPLAZAR", // 🔒 Facebook aún no disponible
  instagram: "https://www.instagram.com/rengo.hn?igsh=MWtwMjdya2xwdjlsbw==", // 👈 Ponga aquí el link real de Instagram
  tiktok: "https://www.tiktok.com/@rengo.hn?_r=1&_t=ZP-94ESJGo11od", // 👈 Ponga aquí el link real de TikTok
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black text-white">
      {/* 🔥 TOP ACCENT STRIP (para diferenciar el footer) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-lg font-semibold tracking-wide">RENGO</div>
            <p className="max-w-md text-sm text-white/70">
              Renta carros de dueños locales, más opciones y mejores precios.
            </p>
            <div className="text-xs text-white/50">
              © {new Date().getFullYear()} Rengo. Todos los derechos reservados.
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Navegación
              </div>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="text-white/75 transition hover:text-emerald-300"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Síganos
              </div>
              <div className="flex items-center gap-4">
                {/* 🔒 FACEBOOK DESHABILITADO TEMPORALMENTE */}
                {/*
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M22 12a10 10 0 1 0-11.563 9.874v-6.987H7.898V12h2.539V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.887h-2.33v6.987A10.002 10.002 0 0 0 22 12z" />
                  </svg>
                </a>
                */}

                {/* Instagram */}
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4z" />
                    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    <path d="M17.5 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M16.5 3c.4 2 1.9 3.5 3.9 3.9v3.2c-1.5 0-3-.5-4.2-1.4v5.9c0 3.4-2.8 6.2-6.2 6.2S3.8 18 3.8 14.6 6.6 8.4 10 8.4c.3 0 .6 0 .9.1v3.3c-.3-.1-.6-.2-.9-.2-1.8 0-3.2 1.4-3.2 3.2S8.2 18 10 18s3.2-1.4 3.2-3.2V3h3.3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}