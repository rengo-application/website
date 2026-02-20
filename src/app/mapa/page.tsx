import { AuroraBackground } from "@/components/AuroraBackground";
import {Footer} from "@/components/Footer";
import {Navbar} from "@/components/Navbar";
import {MapResultsClient} from "@/components/MapResultsClient";
import type { ComponentType } from "react";

type SearchParams = {
  city?: string;
  type?: string;
};

const MapResultsClientTyped = MapResultsClient as unknown as ComponentType<{
  city: string;
  type: string;
}>;

export default async function MapaPage({
  searchParams,
}: {
  searchParams?: SearchParams | Promise<SearchParams>;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams) : undefined;
  const city = sp?.city ?? "";
  const type = sp?.type ?? "";

  return (
    <main className="relative text-white">
      <AuroraBackground />
      <div className="relative z-10">
        <Navbar />
        <MapResultsClientTyped city={city} type={type} />
        <Footer />
      </div>
    </main>
  );
}
