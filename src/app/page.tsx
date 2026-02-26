"use client";

import { useMemo, useState } from "react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Bento } from "@/components/Bento";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  BadgeCheck,
  CreditCard,
  Apple,
  Play,
} from "lucide-react";

export default function Page() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);

  const toISODate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addDaysISO = (iso: string, days: number) => {
    const d = new Date(`${iso}T00:00:00`);
    d.setDate(d.getDate() + days);
    return toISODate(d);
  };

  const todayISO = useMemo(() => toISODate(new Date()), []);
  const tomorrowISO = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toISODate(d);
  }, []);

  const endMinISO = useMemo(() => {
    // End date must be at least 1 day after start
    return startDate ? addDaysISO(startDate, 1) : tomorrowISO;
  }, [startDate, tomorrowISO]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Require both dates
    if (!startDate || !endDate) {
      e.preventDefault();
      setDateError("Por favor seleccione la fecha de inicio y la fecha de fin para continuar.");
      return;
    }

    // Must be strictly after (min 1 day)
    if (endDate <= startDate) {
      e.preventDefault();
      setDateError("La fecha de fin debe ser al menos 1 día después de la fecha de inicio.");
      return;
    }

    setDateError(null);
  };

  return (
    <main className="relative min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">
      <div className="pointer-events-none opacity-0 transition-opacity dark:opacity-100">
        <AuroraBackground />
      </div>
      <div className="relative z-10">
        <Navbar />

        {/* HERO */}
        <section className="relative">
          {/* Light-mode background (no video) */}
          <div className="absolute inset-0 bg-white" />

          {/* Dark-mode background video */}
          <video
            className="absolute inset-0 hidden h-full w-full object-cover dark:block"
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay for readability (theme-aware) */}
          <div className="absolute inset-0 bg-white/60 dark:bg-black/40" />

          <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-20">
            <div className="max-w-3xl">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 text-zinc-700 dark:border-white/10 dark:bg-black/35 dark:text-white/70 px-3 py-1 text-xs backdrop-blur">
                  {" "}
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  RENGO · Alquiler de vehiculos en Honduras
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Rente un carro fácilmente, directo de dueños locales.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700 dark:text-white/70">
                  Busque por ciudad y fechas, elija el tipo de carro y reserve
                  en minutos. Más opciones, mejores precios y trato directo.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <form
                  id="buscador"
                  action="/mapa"
                  method="GET"
                  onSubmit={handleSearchSubmit}
                  className="mt-8 rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/40 p-4 backdrop-blur md:p-5"
                >
                  {" "}
                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs text-zinc-600 dark:text-white/60">
                        Ciudad
                      </label>
                      <select
                        name="city"
                        className="w-full rounded-2xl border border-black/10 bg-white text-zinc-900 dark:border-white/10 dark:bg-black/50 dark:text-white px-4 py-3 text-sm outline-none focus:border-emerald-400/50"
                        defaultValue="Tegucigalpa"
                      >
                        <option>Tegucigalpa</option>
                        <option>San Pedro Sula</option>
                        <option>La Ceiba</option>
                      </select>
                    </div>

                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs text-zinc-600 dark:text-white/60">
                        Tipo de carro
                      </label>
                      <select
                        name="type"
                        className="w-full rounded-2xl border border-black/10 bg-white text-zinc-900 dark:border-white/10 dark:bg-black/50 dark:text-white px-4 py-3 text-sm outline-none focus:border-emerald-400/50"
                        defaultValue="SUV"
                      >
                        <option>SUV</option>
                        <option>Sedán</option>
                        <option>Pickup</option>
                        <option>4x4</option>
                        <option>Económico</option>
                        <option>Premium</option>
                      </select>
                    </div>

                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs text-zinc-600 dark:text-white/60">
                        Inicio
                      </label>
                      <input
                        name="start"
                        type="date"
                        required
                        min={todayISO}
                        value={startDate}
                        onChange={(e) => {
                          const v = e.target.value;
                          setStartDate(v);
                          setDateError(null);
                          // If current end date is now invalid (same day or before), clear it
                          if (endDate && v && endDate <= v) {
                            setEndDate("");
                          }
                        }}
                        className="w-full rounded-2xl border border-black/10 bg-white text-zinc-900 dark:border-white/10 dark:bg-black/50 dark:text-white px-4 py-3 text-sm outline-none focus:border-emerald-400/50"
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs text-zinc-600 dark:text-white/60">
                        Fin
                      </label>
                      <input
                        name="end"
                        type="date"
                        required
                        min={endMinISO}
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setDateError(null);
                        }}
                        className="w-full rounded-2xl border border-black/10 bg-white text-zinc-900 dark:border-white/10 dark:bg-black/50 dark:text-white px-4 py-3 text-sm outline-none focus:border-emerald-400/50"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-zinc-600 dark:text-white/60">
                      Por ahora: ciudades de Honduras. Luego agregamos mapa y
                      filtros avanzados.
                    </div>
                    {dateError ? (
                      <div className="text-xs text-red-600 dark:text-red-400">
                        {dateError}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                    >
                      Buscar autos <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-6 grid gap-2 text-sm text-zinc-700 dark:text-white/70">
                  {[
                    "Renta P2P: sin rentadoras tradicionales",
                    "Más variedad de carros por ciudad",
                    "Reserva rápida y coordinación directa",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-400/30">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {t}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-12 rounded-3xl border border-black/10 bg-white/70 text-zinc-900 dark:border-white/10 dark:bg-black/35 dark:text-white p-6 backdrop-blur">
                <div className="text-center text-xs text-zinc-600 dark:text-white/60">
                  Tipos de carros comunes en la plataforma
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-800 dark:text-white/80">
                  {" "}
                  {[
                    "SUV",
                    "Sedán",
                    "Pickup",
                    "4x4",
                    "Premium",
                    "Económico",
                  ].map((l) => (
                    <span key={l} className="opacity-80">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* DESCARGA LA APP */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/40 p-8 backdrop-blur md:p-12">
              {" "}
              <div className="grid gap-10 md:grid-cols-2 md:items-center">
                {/* Texto */}
                <div>
                  <div className="text-xs text-zinc-600 dark:text-white/60">
                    Descarga la app
                  </div>

                  <h3 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-400">
                    Lleve RENGO en su bolsillo
                  </h3>

                  <p className="mt-4 max-w-md text-base leading-7 text-zinc-700 dark:text-white/70">
                    Explore carros, gestione reservas y coordine directamente
                    con dueños locales desde la app móvil.
                  </p>

                  {/* Stores */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    {/* App Store */}
                    <a
                      href="#"
                      className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/5 px-5 py-3 text-sm text-zinc-900 hover:bg-black/10 hover:border-emerald-400/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                    >
                      <Apple className="h-5 w-5 text-zinc-900 dark:text-white" />
                      <span className="text-sm text-zinc-900 dark:text-white">App Store</span>
                    </a>

                    {/* Google Play */}
                    <a
                      href="#"
                      className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/5 px-5 py-3 text-sm text-zinc-900 hover:bg-black/10 hover:border-emerald-400/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                    >
                      <Play className="h-5 w-5 text-zinc-900 dark:text-white" />
                      <span className="text-sm text-zinc-900 dark:text-white">Google Play</span>
                    </a>
                  </div>
                </div>

                {/* Imagen mockup */}
                <div className="relative flex justify-center md:justify-end">
                  <div className="w-72 md:w-80 lg:w-96 max-w-full rounded-3xl border border-black/10 bg-white/70 p-3 shadow-2xl dark:border-white/10 dark:bg-black/50">
                    {" "}
                    <img
                      src="/rengo-app-mockup.png"
                      alt="RENGO App"
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* EXPLORAR */}
        <section id="explorar" className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs text-zinc-600 dark:text-white/60">
                Descubra
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                Descubre la nueva forma de alquilar un coche.
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-white/70">
                Renta de vehiculos en Honduras: más opciones, mejor precio y trato
                directo con dueños locales. Busque por ciudad y fechas, compare
                y reserve en minutos.
              </p>
            </div>
          </Reveal>

          <div className="mt-8">
            <Reveal delay={0.05}>
              <Bento />
            </Reveal>
          </div>
        </section>

        {/* COCHES PARA TUS NECESIDADES */}
        <section id="necesidades" className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs text-zinc-600 dark:text-white/60">
                Categorías
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                Coches para cubrir tus necesidades.
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-white/70">
                Desde un viaje de trabajo hasta una escapada al Caribe: elija el
                carro ideal según su plan.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Ciudad",
                desc: "Compactos y económicos para moverse fácil.",
                tag: "Económico",
                bg: "/cars/city.jpg",
              },
              {
                title: "Familia",
                desc: "SUVs con espacio para maletas y comodidad.",
                tag: "SUV",
                bg: "/cars/family.jpg",
              },
              {
                title: "Aventura",
                desc: "4x4 y pickups para rutas y terreno.",
                tag: "4x4",
                bg: "/cars/aventura.jpg",
              },
              {
                title: "Negocios",
                desc: "Sedanes premium para reuniones y estilo.",
                tag: "Premium",
                bg: "/cars/negocios.jpg",
              },
              {
                title: "Playa",
                desc: "Carros cómodos para Roatán, La Ceiba y más.",
                tag: "Turismo",
                bg: "/cars/playa.jpg",
              },
              {
                title: "Último minuto",
                desc: "Disponibilidad rápida para reservar hoy.",
                tag: "Rápido",
                bg: "/cars/ultimo-minuto.jpg",
              },
            ].map((c, idx) => (
              <Reveal key={c.title} delay={0.04 + idx * 0.03}>
                <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 text-zinc-900 dark:border-white/10 dark:bg-black/35 dark:text-white p-6 backdrop-blur">
                  {" "}
                  {/* Background image (opcional) */}
                  {c.bg ? (
                    <>
                      <img
                        src={c.bg}
                        alt={c.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      {/* Overlay oscuro como el hero */}
                      <div className="absolute inset-0 bg-white/35 dark:bg-black/55" />
                      {/* Un toque de degradado para que el texto se lea mejor */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/30 to-white/70 dark:from-black/60 dark:via-black/20 dark:to-black/60" />
                    </>
                  ) : null}
                  {/* Contenido arriba del overlay */}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="text-base font-semibold text-zinc-900 dark:text-white">
                        {c.title}
                      </div>
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-200">
                        {c.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-white/70">
                      {c.desc}
                    </p>
                    <div className="mt-4">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800 dark:text-emerald-200 dark:hover:text-emerald-100"
                      >
                        Seleccionar <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs text-zinc-600 dark:text-white/60">
                En minutos
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                Busque, reserve y conduzca.
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-white/70">
                Elija ciudad y fechas, seleccione el tipo de carro y coordine
                entrega/recogida con el dueño. Sin filas, sin papeleo
                innecesario.
              </p>
            </div>
          </Reveal>

          <div className="mt-8">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-black/10 bg-white/70 text-zinc-900 dark:border-white/10 dark:bg-black/35 dark:text-white p-6 backdrop-blur">
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                  En 3 pasos
                </div>
                <ol className="mt-4 grid gap-3 text-sm text-zinc-700 dark:text-white/70">
                  <li>1) Elija ciudad, fechas y el carro.</li>
                  <li>2) Haga la reserva y reciba confirmación.</li>
                  <li>3) Coordine entrega/recogida y disfrute el viaje.</li>
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SEGURIDAD */}
        <section id="seguridad" className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs text-zinc-600 dark:text-white/60">
                Confianza
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                Seguridad y confianza, desde el primer día.
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-white/70">
                Verificación, pagos protegidos y soporte. Diseñado para que
                alquilar P2P sea simple y seguro.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Verificación",
                desc: "Perfiles verificados y reglas claras.",
                icon: BadgeCheck,
              },
              {
                title: "Pagos protegidos",
                desc: "Proceso de pago ordenado y transparente.",
                icon: CreditCard,
              },
              {
                title: "Soporte",
                desc: "Asistencia ante dudas durante la renta.",
                icon: ShieldCheck,
              },
            ].map((c, idx) => (
              <Reveal key={c.title} delay={0.05 + idx * 0.04}>
                <div className="rounded-3xl border border-black/10 bg-white/70 text-zinc-900 dark:border-white/10 dark:bg-black/35 dark:text-white p-6 backdrop-blur">
                  <c.icon className="h-5 w-5 text-emerald-300" />
                  <div className="mt-3 text-base font-semibold text-zinc-900 dark:text-white">
                    {c.title}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-white/70">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="reservar" className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <div className="rounded-3xl border border-emerald-400/25 bg-emerald-500/15 p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="text-xs text-zinc-700 dark:text-white/70">
                    Reserve hoy
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                    ¿Listo para rentar?
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-white/70">
                    Explore autos disponibles y reserve en minutos.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      // Scroll to the top so the user sees the full page (no manual scroll needed)
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                  >
                    Explorar autos
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ¿TIENES UN COCHE? */}
        <section id="ponlo-a-trabajar" className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-white/70 dark:border-white/10 dark:bg-black/35 p-8 backdrop-blur md:p-10">
              {" "}
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="text-xs text-zinc-600 dark:text-white/60">
                    Para anfitriones
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                    ¿Tienes un vehiculo? ¡Ponlo a trabajar!
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-white/70">
                    Genere ingresos cuando no lo use. Usted controla
                    disponibilidad, precio y reglas. Publicar es rápido desde la
                    app.
                  </p>

                  <div className="mt-5 grid gap-2 text-sm text-zinc-700 dark:text-white/70">
                    {[
                      "Usted define precio y disponibilidad",
                      "Publicación rápida desde la app",
                      "GPS y seguro para protección (según requisitos)",
                    ].map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-400/30">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="/anfitrion"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                    >
                      Ver requisitos <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="grid gap-4">
                  {/* Imagen (no de fondo) */}
                  <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/40">
                    <div className="relative aspect-[16/10] w-full">
                      <img
                        src="/host-car.jpg"
                        alt="Anfitrión RENGO"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-white/10 dark:bg-black/25" />
                      <div className="absolute bottom-4 left-4 rounded-2xl border border-black/10 bg-white/70 text-zinc-800 dark:border-white/10 dark:bg-black/35 dark:text-white/80 px-3 py-2 text-xs backdrop-blur">
                        {" "}
                        Publique su carro · Controle su disponibilidad
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 pb-10">
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-white/70 dark:border-white/10 dark:bg-black/35 p-8 backdrop-blur">
              <div className="text-xs text-zinc-600 dark:text-white/60">
                FAQ
              </div>
              <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                Preguntas frecuentes
              </div>
              <p className="mt-3 text-sm text-zinc-700 dark:text-white/70">
                Respuestas rápidas a lo más consultado. Para ver todas las
                preguntas, visite la página completa.
              </p>

              <div className="mt-6 grid gap-3">
                <details className="group rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/30 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      ¿Qué es RENGO?
                    </span>
                    <span className="text-zinc-500 dark:text-white/60 transition-transform group-open:rotate-180">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-white/70">
                    RENGO es una plataforma digital que conecta a personas que
                    necesitan movilidad con anfitriones que ofrecen carros en
                    alquiler. Es similar a Airbnb, pero enfocado en vehículos en
                    Honduras.
                  </p>
                </details>

                <details className="group rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/30 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      ¿Cómo funciona?
                    </span>
                    <span className="text-zinc-500 dark:text-white/60 transition-transform group-open:rotate-180">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-white/70">
                    En la app usted busca carros por ciudad, elige uno según sus
                    necesidades, reserva y coordina la recogida. Si es anfitrión,
                    publica su carro, recibe solicitudes, confirma reservas y
                    recibe pagos de forma segura.
                  </p>
                </details>

                <details className="group rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/30 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      ¿Qué necesito para alquilar un carro?
                    </span>
                    <span className="text-zinc-500 dark:text-white/60 transition-transform group-open:rotate-180">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-white/70">
                    Ser mayor de edad, tener licencia de conducir válida y contar
                    con un método de pago registrado en la app.
                  </p>
                </details>
              </div>

              <div className="mt-6">
                <a
                  href="/faq"
                  className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800 dark:text-emerald-200 dark:hover:text-emerald-100"
                >
                  Ver más preguntas <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <Footer />
      </div>
    </main>
  );
}
