import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-zinc-600">
            © {new Date().getFullYear()} Website. Todos los derechos reservados.
          </div>
          <div className="flex gap-4 text-sm text-zinc-600">
            <Link className="hover:text-zinc-900" href="/privacidad">
              Privacidad
            </Link>
            <Link className="hover:text-zinc-900" href="/terminos">
              Términos
            </Link>
            <Link className="hover:text-zinc-900" href="/contacto">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}