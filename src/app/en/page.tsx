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
  return (
    <main className="relative text-white">
      <AuroraBackground />
      <div className="relative z-10">
        <Navbar />

        {/* HERO */}
        <section className="relative">
          {/* Background video */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-20">
            <div className="max-w-3xl">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-white/70 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  RENGO · Car rental in Honduras
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Rent a car easily, directly from local owners.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                  Search by city and dates, choose your car type, and book in
                  minutes. More options, better prices, and direct coordination.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <form
                  action="/en/mapa"
                  method="GET"
                  className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur md:p-5"
                >
                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs text-white/60">
                        City
                      </label>
                      <select
                        name="city"
                        className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
                        defaultValue="Tegucigalpa"
                      >
                        <option>Tegucigalpa</option>
                        <option>San Pedro Sula</option>
                        <option>La Ceiba</option>
                        <option>Roatán</option>
                        <option>Comayagua</option>
                        <option>Choluteca</option>
                      </select>
                    </div>

                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs text-white/60">
                        Car type
                      </label>
                      <select
                        name="type"
                        className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
                        defaultValue="SUV"
                      >
                        <option>SUV</option>
                        <option>Sedan</option>
                        <option>Pickup</option>
                        <option>4x4</option>
                        <option>Economy</option>
                        <option>Premium</option>
                      </select>
                    </div>

                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs text-white/60">
                        Start
                      </label>
                      <input
                        name="start"
                        type="date"
                        className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label className="mb-1 block text-xs text-white/60">
                        End
                      </label>
                      <input
                        name="end"
                        type="date"
                        className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-white/60">
                      For now: cities in Honduras. Later we’ll add map and
                      advanced filters.
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                    >
                      Search cars <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-6 grid gap-2 text-sm text-white/70">
                  {[
                    "P2P rentals: no traditional agencies",
                    "More car options per city",
                    "Fast booking and direct coordination",
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
              <div className="mt-12 rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur">
                <div className="text-center text-xs text-white/60">
                  Common car categories on the platform
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/80">
                  {[
                    "SUV",
                    "Sedan",
                    "Pickup",
                    "4x4",
                    "Premium",
                    "Economy",
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

        {/* DOWNLOAD APP */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur md:p-12">
              <div className="grid gap-10 md:grid-cols-2 md:items-center">
                {/* Text */}
                <div>
                  <div className="text-xs text-white/60">Download the app</div>

                  <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                    Take RENGO with you
                  </h3>

                  <p className="mt-4 max-w-md text-base leading-7 text-white/70">
                    Browse cars, manage bookings, and coordinate directly with
                    owners from the mobile app.
                  </p>

                  {/* Stores */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 hover:border-emerald-400/40"
                    >
                      <Apple className="h-5 w-5 text-white" />
                      <span className="text-sm text-white">App Store</span>
                    </a>

                    <a
                      href="#"
                      className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 hover:border-emerald-400/40"
                    >
                      <Play className="h-5 w-5 text-white" />
                      <span className="text-sm text-white">Google Play</span>
                    </a>
                  </div>
                </div>

                {/* Mock image */}
                <div className="relative flex justify-center md:justify-end">
                  <div className="w-72 max-w-full rounded-3xl border border-white/10 bg-black/50 p-3 shadow-2xl md:w-80 lg:w-96">
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

        {/* EXPLORE */}
        <section id="explorar" className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs text-white/60">Discover</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Discover a new way to rent a car.
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70">
                P2P rentals in Honduras: more options, better prices, and direct
                contact with local owners. Search by city and dates, compare,
                and book in minutes.
              </p>
            </div>
          </Reveal>

          <div className="mt-8">
            <Reveal delay={0.05}>
              <Bento />
            </Reveal>
          </div>
        </section>

        {/* NEEDS */}
        <section id="necesidades" className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs text-white/60">Categories</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Cars for your needs.
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70">
                From business trips to a Caribbean getaway: choose the right car
                for your plan.
              </p>
            </div>
          </Reveal>

          {/* (tu grid de categorías se queda igual; si querés lo traduzco también) */}
        </section>

        {/* HOW IT WORKS */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs text-white/60">In minutes</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Search, book, and drive.
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70">
                Choose city and dates, select a car type, and coordinate
                pickup/drop-off with the owner. No lines, no unnecessary
                paperwork.
              </p>
            </div>
          </Reveal>

          <div className="mt-8">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur">
                <div className="text-sm font-semibold text-white">In 3 steps</div>
                <ol className="mt-4 grid gap-3 text-sm text-white/70">
                  <li>1) Choose city, dates, and the car.</li>
                  <li>2) Place the booking and get confirmation.</li>
                  <li>3) Coordinate pickup/drop-off and enjoy the trip.</li>
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SAFETY */}
        <section id="seguridad" className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs text-white/60">Trust</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Safety and trust, from day one.
              </h2>
              <p className="mt-3 text-base leading-7 text-white/70">
                Verification, protected payments, and support. Built to make P2P
                renting simple and secure.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Verification",
                desc: "Verified profiles and clear rules.",
                icon: BadgeCheck,
              },
              {
                title: "Protected payments",
                desc: "Organized and transparent payment flow.",
                icon: CreditCard,
              },
              {
                title: "Support",
                desc: "Help whenever you need it during the rental.",
                icon: ShieldCheck,
              },
            ].map((c, idx) => (
              <Reveal key={c.title} delay={0.05 + idx * 0.04}>
                <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur">
                  <c.icon className="h-5 w-5 text-emerald-300" />
                  <div className="mt-3 text-base font-semibold text-white">
                    {c.title}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-white/70">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="reservar" className="mx-auto max-w-6xl px-4 pb-16">
          <Reveal>
            <div className="rounded-3xl border border-emerald-400/25 bg-emerald-500/15 p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="text-xs text-white/70">Book today</div>
                  <h3 className="mt-2 text-2xl font-semibold">Ready to rent?</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Browse available cars and book in minutes. If you prefer,
                    you can also request a quote via WhatsApp.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <a
                    href="#explorar"
                    className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                  >
                    Explore cars
                  </a>
                  <a
                    href="#reservar"
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
                  >
                    Quote via WhatsApp
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