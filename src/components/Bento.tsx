import { HandCoins, Shield, Sparkles, Zap } from "lucide-react";

const items = [
  {
    title: "Rente P2P (viajeros)",
    desc: "Elija carros de dueños locales y evite la rentadora tradicional.",
    icon: Sparkles,
  },
  {
    title: "Mejores precios y variedad",
    desc: "Más opciones por ciudad, fechas y tipo de carro.",
    icon: Zap,
  },
  {
    title: "Gane dinero (dueños)",
    desc: "Monetice su carro cuando no lo usa con total control.",
    icon: HandCoins,
  },
  {
    title: "Seguridad y soporte",
    desc: "Verificación, reglas claras y asistencia durante la renta.",
    icon: Shield,
  },
];

export function Bento() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((it) => (
        <div
          key={it.title}
          className="group rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-md dark:border-white/10 dark:bg-black/30 dark:hover:bg-black/40"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-black/10 bg-black/10 p-3 dark:border-white/10 dark:bg-black/30">
              <it.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <div className="text-base font-semibold text-zinc-900 dark:text-white">
                {it.title}
              </div>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-white/70">{it.desc}</p>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
      
        </div>
      ))}
    </div>
  );
}