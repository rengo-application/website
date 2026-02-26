"use client";

import { useMemo, useState } from "react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import {
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Smartphone,
  Car,
  ArrowRight,
} from "lucide-react";

// Enviamos el formulario a un endpoint interno de Next.js para evitar CORS.
// Ese endpoint (src/app/api/affiliate/route.ts) luego reenvía la data al Apps Script.
const AFFILIATE_API_ROUTE = "/api/affiliate";

type VehicleForm = {
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
};

export default function AfiliadosLandingPage() {
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaOk, setCaptchaOk] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    vehicleCount: 1,
    vehicles: [
      {
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
      },
    ] as VehicleForm[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const setVehicleCount = (count: number) => {
    const safe = Math.max(1, Math.min(5, Math.floor(count)));

    setForm((p) => {
      const current = Array.isArray(p.vehicles) ? p.vehicles : [];
      const nextVehicles = current.slice(0, safe);

      while (nextVehicles.length < safe) {
        nextVehicles.push({ vehicleMake: "", vehicleModel: "", vehicleYear: "" });
      }

      return { ...p, vehicleCount: safe, vehicles: nextVehicles };
    });
  };

  const updateVehicleField = (
    idx: number,
    field: keyof VehicleForm,
    value: string
  ) => {
    setForm((p) => {
      const nextVehicles = [...(p.vehicles ?? [])];
      const current = nextVehicles[idx] ?? { vehicleMake: "", vehicleModel: "", vehicleYear: "" };
      nextVehicles[idx] = { ...current, [field]: value };
      return { ...p, vehicles: nextVehicles };
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      age: "",
      email: "",
      phone: "",
      vehicleCount: 1,
      vehicles: [
        {
          vehicleMake: "",
          vehicleModel: "",
          vehicleYear: "",
        },
      ],
    });
    setErrors({});
    setCaptchaOk(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
  };

  const validate = () => {
    const next: Record<string, string> = {};

    const name = form.name.trim();
    const age = form.age.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

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

    // Validación de vehículos (1..N)
    const thisYear = new Date().getFullYear();
    if (!Array.isArray(form.vehicles) || form.vehicles.length === 0) {
      next.vehicles = "Ingrese al menos 1 vehículo.";
    } else {
      form.vehicles.forEach((v, idx) => {
        const make = (v?.vehicleMake ?? "").trim();
        const model = (v?.vehicleModel ?? "").trim();
        const year = (v?.vehicleYear ?? "").trim();

        if (!make) next[`vehicles.${idx}.vehicleMake`] = "Ingrese la marca.";
        if (!model) next[`vehicles.${idx}.vehicleModel`] = "Ingrese el modelo.";

        if (!year) next[`vehicles.${idx}.vehicleYear`] = "Ingrese el año.";
        else {
          const y = Number(year);
          if (!Number.isFinite(y) || y < 1950 || y > thisYear + 1) {
            next[`vehicles.${idx}.vehicleYear`] = `Año inválido (1950–${thisYear + 1}).`;
          }
        }
      });
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (!captchaOk) {
      setSubmitError("Confirme que no es un robot antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const normalizedVehicles = (form.vehicles ?? [])
  .slice(0, 5)
  .map((v) => ({
    make: (v.vehicleMake || "").trim(),
    model: (v.vehicleModel || "").trim(),
    year: (v.vehicleYear || "").trim(),
  }));

const first = normalizedVehicles[0] ?? { make: "", model: "", year: "" };

const payload = {
  name: form.name,
  age: form.age,
  email: form.email,
  phone: form.phone,

  // Compatibilidad con formato viejo (por si acaso)
  vehicleMake: first.make,
  vehicleModel: first.model,
  vehicleYear: first.year,

  // NUEVO: array de vehículos (lo que espera Apps Script)
  vehicleCount: Math.max(1, Math.min(5, Number(form.vehicleCount) || normalizedVehicles.length || 1)),
  vehicles: normalizedVehicles,

  source: "website/afiliados-landing",
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
      console.error("[RENGO] Afiliados submit ERROR:", err);
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
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-white/70 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  RENGO · Afiliación de anfitriones
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Pre-registre sus vehículos y sea de los primeros anfitriones.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                  Complete este formulario para que nuestro equipo lo contacte y continúe con el proceso.
                  Puede registrar hasta 5 vehículos en una sola solicitud.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-7 grid gap-3 text-sm text-white/70">
                  {[
                    { icon: BadgeCheck, text: "Proceso rápido y verificación guiada" },
                    { icon: ShieldCheck, text: "Enfoque en seguridad: GPS y seguro" },
                    { icon: ClipboardList, text: "Usted controla disponibilidad y precio" },
                    { icon: Smartphone, text: "Publicación final desde la app" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-400/30">
                        <item.icon className="h-3.5 w-3.5" />
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <Car className="mt-0.5 h-5 w-5 text-emerald-200" />
                    <div>
                      <div className="font-semibold text-white">¿Tiene varios carros?</div>
                      <div className="mt-1">
                        Seleccione la cantidad y complete la info por cada vehículo. Se enviará todo en una sola
                        solicitud.
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* FORM CARD */}
            <Reveal delay={0.1}>
              <div id="formulario" className="rounded-3xl border border-white/10 bg-black/45 p-6 backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs text-white/60">Formulario</div>
                    <div className="mt-1 text-xl font-semibold text-white">Comenzar afiliación</div>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      Sus datos se usan únicamente para contactarlo y continuar el proceso.
                    </p>
                  </div>
                  <a
                    href="/anfitrion"
                    className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                  >
                    Ver info <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-5">
                  {isSubmitted ? (
                    <div className="rounded-3xl border border-emerald-400/25 bg-emerald-500/10 p-6">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-400/25">
                          <CheckCircle2 className="h-5 w-5 text-emerald-200" />
                        </span>
                        <div>
                          <div className="text-base font-semibold text-white">¡Solicitud lista!</div>
                          <p className="mt-1 text-sm text-white/70">
                            Recibimos su solicitud. En breve nos pondremos en contacto.
                          </p>
                          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <button
                              type="button"
                              onClick={resetForm}
                              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
                            >
                              Registrar otra solicitud
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid gap-5">
                      {/* Pseudo captcha (NO quitar) */}
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
                            <span className="block text-xs text-white/50"></span>
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
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-emerald-400/40"
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
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-emerald-400/40"
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
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-emerald-400/40"
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
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-emerald-400/40"
                          />
                          {errors.phone && <div className="mt-2 text-xs text-rose-300">{errors.phone}</div>}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white">Vehículos</div>
                            <div className="mt-1 text-xs text-white/60">
                              Puede registrar hasta 5 vehículos en una sola solicitud.
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="text-sm text-white/80">Cantidad</label>
                            <select
                              value={form.vehicleCount}
                              onChange={(e) => setVehicleCount(Number(e.target.value))}
                              className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                            >
                              {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {errors.vehicles && (
                          <div className="mt-3 text-xs text-rose-300">{errors.vehicles}</div>
                        )}

                        <div className="mt-4 grid gap-4">
                          {form.vehicles.map((v, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                              <div className="text-sm font-semibold text-white">Vehículo {idx + 1}</div>

                              <div className="mt-4 grid gap-4 md:grid-cols-3">
                                <div>
                                  <label className="text-sm text-white/80">Marca</label>
                                  <input
                                    value={v.vehicleMake}
                                    onChange={(e) => updateVehicleField(idx, "vehicleMake", e.target.value)}
                                    placeholder="Ej. Toyota"
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-emerald-400/40"
                                  />
                                  {errors[`vehicles.${idx}.vehicleMake`] && (
                                    <div className="mt-2 text-xs text-rose-300">
                                      {errors[`vehicles.${idx}.vehicleMake`]}
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label className="text-sm text-white/80">Modelo</label>
                                  <input
                                    value={v.vehicleModel}
                                    onChange={(e) => updateVehicleField(idx, "vehicleModel", e.target.value)}
                                    placeholder="Ej. Corolla"
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-emerald-400/40"
                                  />
                                  {errors[`vehicles.${idx}.vehicleModel`] && (
                                    <div className="mt-2 text-xs text-rose-300">
                                      {errors[`vehicles.${idx}.vehicleModel`]}
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label className="text-sm text-white/80">Año</label>
                                  <input
                                    value={v.vehicleYear}
                                    onChange={(e) => updateVehicleField(idx, "vehicleYear", e.target.value)}
                                    inputMode="numeric"
                                    placeholder="Ej. 2020"
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-emerald-400/40"
                                  />
                                  {errors[`vehicles.${idx}.vehicleYear`] && (
                                    <div className="mt-2 text-xs text-rose-300">
                                      {errors[`vehicles.${idx}.vehicleYear`]}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {submitError && (
                        <div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-200">
                          {submitError}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSubmitting || !captchaOk}
                      >
                        {isSubmitting ? "Enviando…" : "Enviar solicitud"}
                      </button>

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
            </Reveal>
          </div>
        </section>

        {/* Extra info simple (opcional) */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-10">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Más visibilidad",
                  desc: "Su carro aparece cuando viajeros busquen opciones en su ciudad.",
                },
                {
                  title: "Cobros seguros",
                  desc: "El flujo de pagos y comunicación se gestiona dentro de la plataforma.",
                },
                {
                  title: "Soporte y guía",
                  desc: "Le acompañamos en el proceso de publicación y requisitos iniciales.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur"
                >
                  <div className="text-base font-semibold text-white">{c.title}</div>
                  <div className="mt-2 text-sm text-white/70">{c.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <Footer />
      </div>
    </main>
  );
}