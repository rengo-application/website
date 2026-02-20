"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Star, X, Search } from "lucide-react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type CarType = "SUV" | "Sedán" | "Pickup" | "4x4" | "Económico" | "Premium";
const CAR_TYPES: CarType[] = [
  "SUV",
  "Sedán",
  "Pickup",
  "4x4",
  "Económico",
  "Premium",
];

type Listing = {
  id: string;
  title: string;
  city: string;
  type: CarType;
  pricePerDay: number;
  rating: number;
  trips: number;
  img: string;
  lat: number;
  lng: number;
};

type VehiclesQueryData = {
  vehicles: {
    totalCount: number;
    hasNextPage: boolean;
    items: Array<{
      id: string | number;
      title?: string | null;
      year?: number | null;
      type?: string | null;
      price?: number | null;
      rating?: number | null;
      images?: string[] | null;
      pickupCoordinates?: {
        pickup?: {
          latitude?: number | string | null;
          longitude?: number | string | null;
          address?: string | null;
        } | null;
      } | null;
      favorite?: boolean | null;
      likes?: number | null;
      trips?: number | null;
    }>;
  };
};

type VehiclesFilter = {
  address?: string;
  vehicleType?: string[];
  startDate?: string;
  endDate?: string;
};

type VehiclesQueryVars = {
  filter?: VehiclesFilter;
  limit: number;
  offset: number;
};

type VehicleItem = VehiclesQueryData["vehicles"]["items"][number];

const GET_MY_VEHICLES = gql`
  query GetMyVehicles(
    $filter: VehicleFilterInput
    $limit: Int!
    $offset: Int!
  ) {
    vehicles(filter: $filter, limit: $limit, offset: $offset) {
      totalCount
      hasNextPage
      items {
        id
        title
        year
        type
        price
        rating
        images
        pickupCoordinates {
          pickup {
            latitude
            longitude
            address
          }
        }
        favorite
        likes
        trips
      }
    }
  }
`;

// Fallback data so the UI never breaks if the API returns 0 items or is unavailable.
// Keep this typed as Listing[] to avoid `any` / unsafe member-access lint errors.
const MOCK: Listing[] = [
  {
    id: "mock-1",
    title: "Toyota Fortuner 2022",
    city: "Tegucigalpa",
    type: "SUV",
    pricePerDay: 95,
    rating: 4.86,
    trips: 32,
    img: "/cars/familia.jpg",
    lat: 14.0723,
    lng: -87.1921,
  },
  {
    id: "mock-2",
    title: "Hyundai Accent 2021",
    city: "San Pedro Sula",
    type: "Sedán",
    pricePerDay: 55,
    rating: 4.74,
    trips: 21,
    img: "/cars/economico.jpg",
    lat: 15.5042,
    lng: -88.025,
  },
  {
    id: "mock-3",
    title: "Nissan Frontier 2020",
    city: "La Ceiba",
    type: "Pickup",
    pricePerDay: 85,
    rating: 4.81,
    trips: 18,
    img: "/cars/aventura.jpg",
    lat: 15.7835,
    lng: -86.791,
  },
];

function norm(v: string) {
  return v.trim().toLowerCase();
}

function cityFromAddress(address?: string | null, fallback = "Honduras") {
  if (!address) return fallback;
  const parts = address
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 0) return fallback;

  // Common case: "Tegucigalpa, Honduras" -> "Tegucigalpa"
  const last = parts[parts.length - 1].toLowerCase();
  if (last === "honduras" && parts.length >= 2) {
    return parts[parts.length - 2];
  }

  // Otherwise, pick the most useful human segment (prefer the second segment if present)
  // Example: "7CG3+H7Q, West Bay, Bay Islands, Honduras" -> "Bay Islands" (or "West Bay")
  if (parts.length >= 3) return parts[parts.length - 2];
  if (parts.length >= 2) return parts[0];
  return parts[0];
}

function mapApiTypeToUi(raw?: string | null): CarType {
  const v = String(raw ?? "")
    .trim()
    .toUpperCase();

  // Map API enums/strings to the UI labels we already use.
  switch (v) {
    case "SUV":
      return "SUV";
    case "SEDAN":
    case "SEDÁN":
      return "Sedán";
    case "PICKUP":
    case "PICK-UP":
      return "Pickup";
    case "4X4":
    case "4X4 ":
      return "4x4";
    case "ECONOMICO":
    case "ECONÓMICO":
    case "ECONOMIC":
      return "Económico";
    case "PREMIUM":
      return "Premium";
    default:
      // Fallback that keeps the UI stable
      return "SUV";
  }
}

function nightsBetween(start?: string | null, end?: string | null) {
  if (!start || !end) return 1;
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  return Number.isFinite(diff) && diff > 0 ? diff : 1;
}

function toISODate(d: Date) {
  // YYYY-MM-DD (local-ish; we normalize to midnight first)
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.toISOString().slice(0, 10);
}

function defaultStartEnd() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start: toISODate(start), end: toISODate(end) };
}

/**
 * Map “mock”:
 * - No usa Google/Mapbox todavía.
 * - Renderiza un panel estilo mapa con marcadores posicionados.
 * - Luego lo reemplazamos por un mapa real sin reescribir toda la página.
 */
function MapMock({
  listings,
  selectedId,
  onSelect,
}: {
  listings: Listing[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const bounds = useMemo(() => {
    if (!listings || listings.length === 0) return null;

    const lats = listings.map((l) => l.lat);
    const lngs = listings.map((l) => l.lng);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [listings]);

  if (!bounds) {
    return (
      <div className="relative flex h-[520px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/35 backdrop-blur">
        <div className="text-center">
          <div className="text-sm font-semibold text-white">Sin resultados</div>
          <div className="mt-1 text-xs text-white/60">
            Ajuste ciudad, tipo o fechas para ver opciones.
          </div>
        </div>
      </div>
    );
  }

  const pos = (lat: number, lng: number) => {
    const pad = 0.12; // aire visual

    const latSpan = bounds.maxLat - bounds.minLat;
    const lngSpan = bounds.maxLng - bounds.minLng;

    // Si solo hay 1 punto (o todos están en el mismo lugar), centramos el marcador
    if (
      !Number.isFinite(latSpan) ||
      !Number.isFinite(lngSpan) ||
      (latSpan === 0 && lngSpan === 0)
    ) {
      return { left: "50%", top: "50%" };
    }

    const x = ((lng - bounds.minLng) / lngSpan) * (1 - 2 * pad) + pad;
    const y = 1 - (((lat - bounds.minLat) / latSpan) * (1 - 2 * pad) + pad);

    return { left: `${x * 100}%`, top: `${y * 100}%` };
  };

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/35 backdrop-blur">
      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-white/70 backdrop-blur">
        Mapa (demo)
      </div>
      {/* “Mapa” visual (mock) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-white/5" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="absolute right-4 top-4 z-20 grid gap-2">
        <button
          type="button"
          onClick={() =>
            setZoom((z) => Math.min(2, Number((z + 0.15).toFixed(2))))
          }
          className="h-10 w-10 rounded-2xl border border-white/10 bg-black/40 text-white/80 backdrop-blur hover:bg-black/55"
          aria-label="Zoom in"
        >
          {" "}
          +
        </button>
        <button
          type="button"
          onClick={() =>
            setZoom((z) => Math.max(0.8, Number((z - 0.15).toFixed(2))))
          }
          className="h-10 w-10 rounded-2xl border border-white/10 bg-black/40 text-white/80 backdrop-blur hover:bg-black/55"
          aria-label="Zoom out"
        >
          {" "}
          –
        </button>
      </div>

      {/* Capa de marcadores (con zoom) */}
      <div
        className="absolute inset-0 z-10"
        style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%" }}
      >
        {listings.map((l) => {
          const active = l.id === selectedId;
          const p = pos(l.lat, l.lng);

          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onSelect(l.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.left, top: p.top }}
            >
              <div
                className={[
                  "rounded-full px-3 py-1 text-sm font-semibold shadow-lg",
                  "border backdrop-blur",
                  active
                    ? "border-emerald-400/60 bg-emerald-400 text-zinc-950"
                    : "border-white/20 bg-black/60 text-white shadow-xl hover:bg-black/70",
                ].join(" ")}
              >
                ${l.pricePerDay}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MapResultsClient() {
  const sp = useSearchParams();

  const { start: defaultStart, end: defaultEnd } = defaultStartEnd();

  const city = sp.get("city") ?? ""; // si viene vacío, mostrar todo
  const typeParam = sp.get("type") ?? "";
  const type: CarType | "" = CAR_TYPES.includes(typeParam as CarType)
    ? (typeParam as CarType)
    : "";

  const start = sp.get("start") ?? defaultStart;
  const end = sp.get("end") ?? defaultEnd;

  const nights = nightsBetween(start, end);

  const { data, loading, error } = useQuery<
    VehiclesQueryData,
    VehiclesQueryVars
  >(GET_MY_VEHICLES, {
    fetchPolicy: "network-only",
    variables: {
      // TEMP: disable filter until we confirm the exact VehicleFilterInput fields
      // This lets us verify the API returns real vehicles (no MOCK fallback).
      filter: undefined,
      limit: 50,
      offset: 0,
    },
  });

  useEffect(() => {
    // Debug: confirms whether we're getting real API data or GraphQL errors
    if (error) {
      console.error("[vehicles query] error:", error);
    }
    if (data) {
      console.log("[vehicles query] data:", data);
    }
  }, [data, error]);

  const filtered = useMemo(() => {
    const apiItems = data?.vehicles?.items ?? [];

    const mappedFromApi: Listing[] = apiItems.map((v: VehicleItem) => {
      const pickup = v?.pickupCoordinates?.pickup;

      const safeType = mapApiTypeToUi(v?.type ?? null);

      // Prefer the vehicle's own pickup address to derive city; fallback to the URL city; then Honduras.
      const derivedCity = cityFromAddress(
        pickup?.address ?? null,
        city || "Honduras"
      );

      // Prefer explicit trips if the API has it; otherwise fallback to likes; otherwise 0.
      const trips = Number(
        (v as unknown as { trips?: number | null }).trips ??
          (v as unknown as { likes?: number | null }).likes ??
          0
      );

      // Rating: if API provides 0, keep 0; only default when null/undefined.
      const rating =
        v?.rating === null || v?.rating === undefined ? 0 : Number(v.rating);

      return {
        id: String(v.id),
        title: v.title ?? "Vehículo",
        city: derivedCity,
        type: safeType,
        pricePerDay: Number(v?.price ?? 0),
        rating,
        trips: Number.isFinite(trips) ? trips : 0,
        img: (v?.images?.[0] as string) || "/cars/familia.jpg",
        lat: Number(pickup?.latitude ?? 14.0723),
        lng: Number(pickup?.longitude ?? -87.1921),
      };
    });

    const base =
      !loading && !error && mappedFromApi.length > 0 ? mappedFromApi : MOCK;

    return base
      .filter((l) => {
        const okCity = !city ? true : norm(l.city) === norm(city);
        const okType = !type ? true : norm(l.type) === norm(String(type));
        return okCity && okType;
      })
      .sort((a, b) => a.pricePerDay - b.pricePerDay);
  }, [city, type, data, loading, error]);

  const [selectedId, setSelectedId] = useState<string | null>(
    filtered[0]?.id ?? null
  );

  const selected = useMemo(
    () => filtered.find((l) => l.id === selectedId) ?? null,
    [filtered, selectedId]
  );

  useEffect(() => {
    // Si cambian filtros (URL) y el seleccionado ya no existe, seleccionar el primero.
    if (filtered.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(null);
      return;
    }

    const stillExists = filtered.some((l) => l.id === selectedId);
    if (!stillExists) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <form
        action="/mapa"
        method="GET"
        className="rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur"
      >
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs text-white/60">Ciudad</label>
            <select
              name="city"
              defaultValue={city || ""}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
            >
              <option value="">Todas</option>
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
              Tipo de carro
            </label>
            <select
              name="type"
              defaultValue={type || ""}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
            >
              <option value="">Cualquiera</option>
              <option>SUV</option>
              <option>Sedán</option>
              <option>Pickup</option>
              <option>4x4</option>
              <option>Económico</option>
              <option>Premium</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="mb-1 block text-xs text-white/60">Inicio</label>
            <input
              name="start"
              type="date"
              defaultValue={start}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
            />
          </div>

          <div className="md:col-span-1">
            <label className="mb-1 block text-xs text-white/60">Fin</label>
            <input
              name="end"
              type="date"
              defaultValue={end}
              className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/60">
            Actualice su búsqueda para ver nuevos precios y disponibilidad.
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-sm text-zinc-950 hover:bg-emerald-300"
          >
            <Search className="h-4 w-4" />
            Buscar
          </button>
        </div>
      </form>
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs text-white/60">Resultados</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Autos{city ? ` en ${city}` : " en Honduras"}
            {type ? ` · ${type}` : ""}
          </h1>
          <p className="mt-2 text-sm text-white/70">
            {filtered.length} opciones · {nights} noche(s)
          </p>
        </div>

        <div className="text-xs text-white/60">
          Fechas:{" "}
          <span className="text-white/80">
            {start || "—"} → {end || "—"}
          </span>
        </div>
      </div>

      {/* Layout */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* LISTA */}
        <div className="order-2 lg:order-1">
          <div className="grid gap-4">
            {filtered.map((l) => {
              const total = l.pricePerDay * nights;
              const active = l.id === selectedId;

              return (
                <button
                  key={l.id}
                  onClick={() => setSelectedId(l.id)}
                  className={[
                    "w-full text-left rounded-3xl border p-4 backdrop-blur transition",
                    active
                      ? "border-emerald-400/40 bg-emerald-500/10"
                      : "border-white/10 bg-black/35 hover:bg-black/45",
                  ].join(" ")}
                >
                  <div className="flex gap-4">
                    <div className="h-20 w-28 overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                      <img
                        src={l.img}
                        alt={l.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-white">
                            {l.title}
                          </div>
                          <div className="mt-1 text-xs text-white/60">
                            {l.city} · {l.type}
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-sm font-semibold text-white">
                            ${l.pricePerDay}/día
                          </div>
                          <div className="text-xs text-white/60">
                            Total: ${total}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-4 w-4 text-emerald-300" />
                          {l.rating.toFixed(2)}
                        </span>
                        <span className="text-white/40">•</span>
                        <span>{l.trips} viajes</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAPA */}
        <div className="order-1 lg:order-2">
          <MapMock
            listings={filtered}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
          />

          {/* Overlay tipo app (cuando seleccionas un pin) */}
          {selected ? (
            <div className="mt-4 rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">
                    {selected.title}
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    {selected.city} · {selected.type}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedId(null)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/10"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-white/80">
                  <span className="font-semibold text-white">
                    ${selected.pricePerDay}/día
                  </span>{" "}
                  · {nights} noche(s)
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-2 text-sm text-zinc-950 hover:bg-emerald-300"
                >
                  Ver detalle <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
