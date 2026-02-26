"use client";

import { useMemo, useState } from "react";
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
// Enviamos el formulario a un endpoint interno de Next.js para evitar problemas de CORS.
// Ese endpoint (src/app/api/affiliate/route.ts) luego reenvía la data al Apps Script.
const AFFILIATE_API_ROUTE = "/api/affiliate";
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
  const [isAffiliateOpen, setIsAffiliateOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaOk, setCaptchaOk] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setForm({
      name: "",
      age: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
    });
    setErrors({});
    setCaptchaOk(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
  };

  const closeAffiliate = () => {
    setIsAffiliateOpen(false);
    // Si querés que al cerrar se limpien campos, dejalo. Si no, comentá la línea siguiente.
    resetForm();
  };

  const openAffiliate = () => {
    setIsAffiliateOpen(true);
    setIsSubmitted(false);
    setCaptchaOk(false);
  };

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const validate = () => {
    const next: Record<string, string> = {};

    const name = form.name.trim();
    const age = form.age.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const vehicleMake = form.vehicleMake.trim();
    const vehicleModel = form.vehicleModel.trim();
    const vehicleYear = form.vehicleYear.trim();

    if (!name) next.name = "Ingrese su nombre.";

    if (!age) next.age = "Ingrese su edad.";
    else {
      const n = Number(age);
      if (!Number.isFinite(n) || n < 18 || n > 99) next.age = "Edad inválida (18–99).";
    }

    if (!email) next.email = "Ingrese su correo.";
    else if (!emailRegex.test(email)) next.email = "Correo inválido.";

    if (!phone) next.phone = "Ingrese su teléfono.";
    else {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 8) next.phone = "Teléfono inválido (mínimo 8 dígitos).";
    }

    if (!vehicleMake) next.vehicleMake = "Ingrese la marca.";
    if (!vehicleModel) next.vehicleModel = "Ingrese el modelo.";

    if (!vehicleYear) next.vehicleYear = "Ingrese el año.";
    else {
      const y = Number(vehicleYear);
      const thisYear = new Date().getFullYear();
      if (!Number.isFinite(y) || y < 1950 || y > thisYear + 1) next.vehicleYear = `Año inválido (1950–${thisYear + 1}).`;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmitAffiliate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!captchaOk) {
      setSubmitError("Confirme que no es un robot antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name: form.name,
        age: form.age,
        email: form.email,
        phone: form.phone,
        vehicleMake: form.vehicleMake,
        vehicleModel: form.vehicleModel,
        vehicleYear: form.vehicleYear,
        source: "website/anfitrion",
      };

      const res = await fetch(AFFILIATE_API_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = json?.error || json?.message || "Error desconocido";
        throw new Error(`HTTP ${res.status}: ${msg}`);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("[RENGO] Afiliación submit ERROR:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar la solicitud. Verifique su conexión e intente nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <h3 className="mt-2 text-2xl font-semibold">¿Listo para pre-registrar tu vehículo? </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Sé de los primeros en unirte a nuestros afiliados. Completa tu perfil ahora para asegurar tu lugar antes del lanzamiento oficial.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={openAffiliate}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-300"
                >
                  Comenzar pre-registro
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

        {/* MODAL: Afiliación (premium) */}
        {isAffiliateOpen && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Formulario de afiliación"
          >
            <div className="min-h-[100svh] px-4 py-8 sm:py-10 flex items-start sm:items-center justify-center">
              {/* Backdrop (no button para no bloquear scroll en mobile) */}
              <div
                className="absolute inset-0 bg-black/70"
                onClick={closeAffiliate}
                aria-hidden="true"
              />

              {/* Card */}
              <div className="relative w-full max-w-2xl max-h-[90svh] overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur flex flex-col">
                <div className="border-b border-white/10 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-white/60">Anfitrión</div>
                      <div className="mt-1 text-xl font-semibold text-white">Comenzar afiliación</div>
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        Complete sus datos y los de su vehículo. Este formulario se envía a nuestra hoja por
                        medio de Google Apps Script.
                      </p>
                    </div>

                    {/* Solo mostramos Cerrar mientras NO esté enviado */}
                    {!isSubmitted && (
                      <button
                        type="button"
                        onClick={closeAffiliate}
                        className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                      >
                        X
                      </button>
                    )}
                  </div>
                </div>

                {/* Content scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                  {isSubmitted ? (
                    <div className="rounded-3xl border border-emerald-400/25 bg-emerald-500/10 p-6">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-400/25">
                          <CheckCircle2 className="h-5 w-5 text-emerald-200" />
                        </span>
                        <div>
                          <div className="text-base font-semibold text-white">¡Solicitud lista!</div>
                          <p className="mt-1 text-sm text-white/70">
                            Recibimos su solicitud. En breve nos pondremos en contacto para continuar con el
                            proceso.
                          </p>
                          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <button
                              type="button"
                              onClick={closeAffiliate}
                              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-300"
                            >
                              Listo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitAffiliate} className="grid gap-5">
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <label className="flex items-start gap-3 text-sm text-white/80">
                          <input
                            type="checkbox"
                            checked={captchaOk}
                            onChange={(e) => {
                              setCaptchaOk(e.target.checked);
                              if (e.target.checked) setSubmitError(null);
                            }}
                            className="mt-1 h-4 w-4 accent-emerald-400"
                          />
                          <span>
                            Confirmo que no soy un robot.
                            <span className="block text-xs text-white/50">
                            </span>
                          </span>
                        </label>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm text-white/80">Nombre</label>
                          <input
                            value={form.name}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            placeholder="Ej. Juan Perez"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-emerald-400/40"
                          />
                          {errors.name && <div className="mt-2 text-xs text-rose-300">{errors.name}</div>}
                        </div>

                        <div>
                          <label className="text-sm text-white/80">Edad</label>
                          <input
                            value={form.age}
                            onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
                            inputMode="numeric"
                            placeholder="Ej. 27"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-emerald-400/40"
                          />
                          {errors.age && <div className="mt-2 text-xs text-rose-300">{errors.age}</div>}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm text-white/80">Correo electrónico</label>
                          <input
                            value={form.email}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            placeholder="correo@ejemplo.com"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-emerald-400/40"
                          />
                          {errors.email && <div className="mt-2 text-xs text-rose-300">{errors.email}</div>}
                        </div>

                        <div>
                          <label className="text-sm text-white/80">Teléfono</label>
                          <input
                            value={form.phone}
                            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                            inputMode="tel"
                            placeholder="Ej. +504 9999-9999"
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-emerald-400/40"
                          />
                          {errors.phone && <div className="mt-2 text-xs text-rose-300">{errors.phone}</div>}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                        <div className="text-sm font-semibold text-white">Vehículo</div>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                          <div>
                            <label className="text-sm text-white/80">Marca</label>
                            <input
                              value={form.vehicleMake}
                              onChange={(e) => setForm((p) => ({ ...p, vehicleMake: e.target.value }))}
                              placeholder="Ej. Toyota"
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-emerald-400/40"
                            />
                            {errors.vehicleMake && (
                              <div className="mt-2 text-xs text-rose-300">{errors.vehicleMake}</div>
                            )}
                          </div>

                          <div>
                            <label className="text-sm text-white/80">Modelo</label>
                            <input
                              value={form.vehicleModel}
                              onChange={(e) => setForm((p) => ({ ...p, vehicleModel: e.target.value }))}
                              placeholder="Ej. Corolla"
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-emerald-400/40"
                            />
                            {errors.vehicleModel && (
                              <div className="mt-2 text-xs text-rose-300">{errors.vehicleModel}</div>
                            )}
                          </div>

                          <div>
                            <label className="text-sm text-white/80">Año</label>
                            <input
                              value={form.vehicleYear}
                              onChange={(e) => setForm((p) => ({ ...p, vehicleYear: e.target.value }))}
                              inputMode="numeric"
                              placeholder="Ej. 2020"
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-emerald-400/40"
                            />
                            {errors.vehicleYear && (
                              <div className="mt-2 text-xs text-rose-300">{errors.vehicleYear}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {submitError && (
                        <div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-200">
                          {submitError}
                        </div>
                      )}

                      {/* Botones SIEMPRE visibles en mobile */}
                      <div className="sticky bottom-0 -mx-6 mt-2 border-t border-white/10 bg-black/80 px-6 py-4 backdrop-blur flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          onClick={closeAffiliate}
                          className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
                          disabled={isSubmitting}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                          disabled={isSubmitting || !captchaOk}
                        >
                          {isSubmitting ? "Enviando…" : "Enviar solicitud"}
                        </button>
                      </div>

                      <div className="text-xs text-white/50">
                        {/*
                          URL del Sheet:
                          https://docs.google.com/spreadsheets/d/1aDcUJC3SzW8m2_Vq6y_LLLVF-nVCZQGXIM92C_lMxlU/edit?usp=sharing

                          Endpoint Web App (Apps Script):
                          Use NEXT_PUBLIC_RENGO_AFFILIATE_ENDPOINT en .env.local
                        */}
                        Sus datos se usan únicamente para procesar su afiliación como anfitrión.
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </main>
  );
}