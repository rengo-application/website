import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

// TODO: Reemplazar APP_URL_IOS y APP_URL_ANDROID por los links reales de descarga.
// - APP_URL_IOS: https://apps.apple.com/... (cuando exista)
// - APP_URL_ANDROID: https://play.google.com/store/apps/details?id=...
// También pueden reemplazar este “QR placeholder” por un QR real (ej: generado desde backend o una lib).
const APP_URL_IOS = "PONER_URL_IOS_AQUI";
const APP_URL_ANDROID = "PONER_URL_ANDROID_AQUI";

const MOCK_BY_ID: Record<
  string,
  {
    title: string;
    city: string;
    type: string;
    pricePerDay: number;
    rating: number;
    trips: number;
    img: string;
  }
> = {
  "mock-1": {
    title: "Toyota Fortuner 2022",
    city: "Tegucigalpa",
    type: "SUV",
    pricePerDay: 95,
    rating: 4.86,
    trips: 32,
    img: "/cars/family.jpg",
  },
  "mock-2": {
    title: "Hyundai Accent 2021",
    city: "San Pedro Sula",
    type: "Sedán",
    pricePerDay: 55,
    rating: 4.74,
    trips: 21,
    img: "/cars/city.jpg",
  },
  "mock-3": {
    title: "Nissan Frontier 2020",
    city: "La Ceiba",
    type: "Pickup",
    pricePerDay: 85,
    rating: 4.81,
    trips: 18,
    img: "/cars/aventura.jpg",
  },
};

function nightsBetween(start?: string, end?: string) {
  if (!start || !end) return 1;
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  return Number.isFinite(diff) && diff > 0 ? diff : 1;
}

export default function VehicleDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { start?: string; end?: string };
}) {
  const id = params.id;
  const start = searchParams?.start ?? "";
  const end = searchParams?.end ?? "";
  const nights = nightsBetween(start, end);

  const v =
    MOCK_BY_ID[id] ??
    ({
      title: "Vehículo",
      city: "Honduras",
      type: "—",
      pricePerDay: 0,
      rating: 0,
      trips: 0,
      img: "/cars/family.jpg",
    } as const);

  const total = v.pricePerDay * nights;

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Card principal */}
            <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="h-44 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/50 sm:h-40 sm:w-64">
                  <img
                    src={v.img}
                    alt={v.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-semibold tracking-tight">
                    {v.title}
                  </h1>

                  <div className="mt-2 text-sm text-white/70">
                    {v.city} · {v.type}
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-white/80">
                    <div>
                      <span className="font-semibold text-white">
                        ${v.pricePerDay}/día
                      </span>{" "}
                      · {nights} noche(s) ·{" "}
                      <span className="text-white/70">Total: ${total}</span>
                    </div>
                    <div className="text-white/70">
                      Rating:{" "}
                      <span className="text-white">{v.rating.toFixed(2)}</span>{" "}
                      · {v.trips} viajes
                    </div>
                    <div className="text-xs text-white/50">
                      Fechas: {start || "—"} → {end || "—"}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="/mapa"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 hover:bg-white/10"
                    >
                      Volver al mapa
                    </a>

                    <a
                      href="#continuar-app"
                      className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                    >
                      Reservar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel “Descargar App” */}
            <aside
              id="continuar-app"
              className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur"
            >
              <div className="text-sm font-semibold text-white">
                Continuar en la app
              </div>
              <p className="mt-2 text-xs text-white/60">
                Escanee el QR o use los botones para descargar RENGO.
              </p>

              {/* QR Placeholder premium */}
              <div className="mt-4 grid place-items-center rounded-3xl border border-white/10 bg-black/40 p-6">
                <div className="grid h-40 w-40 place-items-center rounded-2xl border border-white/10 bg-black/60 text-xs text-white/60">
                  QR (placeholder)
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <a
                  href={APP_URL_ANDROID}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
                >
                  Descargar en Android
                </a>
                <a
                  href={APP_URL_IOS}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
                >
                  Descargar en iOS
                </a>
              </div>
            </aside>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}