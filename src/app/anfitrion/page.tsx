import { AuroraBackground } from "@/components/AuroraBackground";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  MapPin,
  Clock,
  Car,
  ClipboardList,
  IdCard,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const hostBenefits = [
  {
    title: "Gane dinero con su carro",
    desc: "Genere ingresos cuando no lo esté usando, con control sobre disponibilidad y precios.",
    icon: CheckCircle2,
  },
  {
    title: "Control total",
    desc: "Usted decide reglas, horarios de entrega/recogida y requisitos para los viajeros.",
    icon: ClipboardList,
  },
  {
    title: "Más demanda, menos fricción",
    desc: "Viajeros buscan opciones P2P para evitar rentadoras tradicionales y conseguir mejor precio.",
    icon: ArrowRight,
  },
];

const vehicleReqs = [
  "Excelente estado mecánico y físico (sin título de salvamento).",
  "Registrado legalmente con placas válidas (no placas de concesionario).",
  "Antigüedad máxima: 12 años (casos especiales hasta 25 dependiendo del vehículo).",
  "Ideal: mantenimiento al día (frenos, llantas, luces, fluidos).",
  "Documentación y fotos claras del vehículo para la publicación.",
];

const hostReqs = [
  "Edad mínima: 21 años (en algunos casos se requiere 25).",
  "Licencia local de conducir válida.",
  "Cuenta en Rengo: registrarse en la app.",
  "Disponibilidad para coordinar entrega/recogida con viajeros.",
  "Verificación de identidad (recomendado) para mayor confianza.",
];

const safetyReqs = [
  "GPS activo en el vehículo (requerido).",
  "Seguro vigente (requerido).",
  "Reglas claras: combustible, kilometraje, multas y limpieza.",
  "Entrega con checklist: fotos antes/después y reporte de daños.",
];

const steps = [
  {
    title: "Regístrese en la app",
    desc: "Cree su cuenta de anfitrión y complete sus datos.",
    icon: Smartphone,
  },
  {
    title: "Publique su carro",
    desc: "Agregue fotos, documentos, precio por día y disponibilidad.",
    icon: Car,
  },
  {
    title: "Reciba solicitudes",
    desc: "Usted acepta o rechaza. Coordine entrega/recogida.",
    icon: MapPin,
  },
  {
    title: "Entregue y gane",
    desc: "Verifique el estado del carro, entregue y reciba su pago según el flujo de la plataforma.",
    icon: Clock,
  },
];

function Card({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-400/25">
          <Icon className="h-5 w-5 text-emerald-200" />
        </div>
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <ul className="mt-3 grid gap-2 text-sm text-white/70">
            {items.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-300/80" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function HostPage() {
  return (
    <main className="relative text-white">
      <AuroraBackground />
      <div className="relative z-10">
        <Navbar />

        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                RENGO · Anfitrión
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Publique su carro y genere ingresos como anfitrión.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                RENGO es un marketplace P2P: usted publica su vehículo, viajeros reservan y
                coordinan directamente con usted. Más control, más oportunidades.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#requisitos"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                >
                  Ver requisitos <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#como-empezar"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
                >
                  Cómo empezar
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-7 grid gap-2 text-sm text-white/70">
                {[
                  "Usted controla disponibilidad y precio",
                  "Publicación rápida desde la app",
                  "GPS y seguro para protección",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-400/30">
                      <BadgeCheck className="h-3.5 w-3.5" />
                    </span>
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur">
              <div className="text-sm font-semibold text-white">Beneficios principales</div>
              <div className="mt-4 grid gap-4">
                {hostBenefits.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-white/10 bg-black/35 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <b.icon className="mt-0.5 h-5 w-5 text-emerald-200" />
                      <div>
                        <div className="text-sm font-semibold">{b.title}</div>
                        <div className="mt-1 text-sm text-white/70">{b.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REQUISITOS */}
      <section id="requisitos" className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs text-white/60">Requisitos</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Lo necesario para publicar en RENGO
            </h2>
            <p className="mt-3 text-base leading-7 text-white/70">
              Para mantener calidad y seguridad en el marketplace, pedimos requisitos básicos
              para el vehículo, el anfitrión y la protección.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Reveal delay={0.05}>
            <Card title="Requisitos del vehículo" items={vehicleReqs} icon={Car} />
          </Reveal>
          <Reveal delay={0.09}>
            <Card title="Requisitos del anfitrión" items={hostReqs} icon={IdCard} />
          </Reveal>
          <Reveal delay={0.13}>
            <Card title="Seguro y protección" items={safetyReqs} icon={ShieldCheck} />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-6 text-sm text-white/70">
            Nota: algunos requisitos pueden variar por ciudad, tipo de vehículo o perfil. En el
            onboarding de la app podemos confirmar casos especiales (por ejemplo, antigüedad hasta 25 años).
          </div>
        </Reveal>
      </section>

      {/* CÓMO EMPEZAR */}
      <section id="como-empezar" className="mx-auto max-w-6xl px-4 pb-16">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs text-white/60">Cómo empezar</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Empiece en pocos pasos
            </h2>
            <p className="mt-3 text-base leading-7 text-white/70">
              Un flujo simple para publicar y comenzar a recibir reservas.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((s, idx) => (
            <Reveal key={s.title} delay={0.05 + idx * 0.04}>
              <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur">
                <s.icon className="h-5 w-5 text-emerald-200" />
                <div className="mt-3 text-base font-semibold text-white">{s.title}</div>
                <p className="mt-1 text-sm leading-6 text-white/70">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Reveal>
          <div className="rounded-3xl border border-emerald-400/25 bg-emerald-500/15 p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="text-xs text-white/70">Anfitrión</div>
                <h3 className="mt-2 text-2xl font-semibold">¿Listo para publicar su carro?</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Regístrese en la app, suba fotos y documentos, y empiece a recibir solicitudes.
                  Si prefiere, podemos orientarle por WhatsApp.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <a
                  href="#requisitos"
                  className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                >
                  Ver requisitos
                </a>
                <a
                  href="#"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

        <Footer />
      </div>
    </main>
  );
}