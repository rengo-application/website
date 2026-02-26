import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function FAQPage() {
  return (
    <main className="relative min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">
      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-20">
          <div className="rounded-3xl border border-black/10 bg-white/70 dark:border-white/10 dark:bg-black/35 p-8 backdrop-blur">
            <div className="text-xs text-zinc-600 dark:text-white/60">
              FAQ
            </div>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Preguntas frecuentes
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-white/70">
              Aquí encontrará respuestas claras sobre cómo funciona RENGO,
              requisitos, pagos, seguridad y soporte.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                {
                  q: "¿Qué es RENGO?",
                  a: "RENGO es una plataforma digital que conecta a personas que necesitan movilidad con anfitriones que ofrecen carros en alquiler. Es similar a Airbnb, pero enfocado en vehículos y experiencias de transporte en Honduras.",
                },
                {
                  q: "¿Cómo funciona?",
                  a: "Para huéspedes/conductores: descargue la app, cree su perfil, busque carros disponibles, reserve y coordine la recogida. Para anfitriones/propietarios: registre su carro con fotos y tarifas, reciba solicitudes, confirme reservas, entregue el vehículo y reciba pagos de forma segura.",
                },
                {
                  q: "¿Dónde está disponible RENGO?",
                  a: "Actualmente en Honduras, con operaciones iniciales en San Pedro Sula, La Ceiba y Tegucigalpa. Estamos expandiéndonos a más ciudades y regiones de Centroamérica.",
                },
                {
                  q: "¿Qué tipos de carros puedo alquilar?",
                  a: "Desde compactos económicos hasta SUVs y camionetas. También carros para viajes familiares, turismo de playa o trabajo logístico.",
                },
                {
                  q: "¿Cómo se realizan los pagos?",
                  a: "Los pagos se procesan de manera segura a través de la app, con soporte para tarjetas, transferencias y próximamente billeteras digitales. Los anfitriones reciben sus ingresos automáticamente en sus cuentas.",
                },
                {
                  q: "¿Qué pasa si ocurre un accidente o daño?",
                  a: "RENGO ofrece opciones de seguros y coberturas básicas incluidas en cada reserva. El anfitrión y el huésped están protegidos según el plan seleccionado.",
                },
                {
                  q: "¿Qué necesito para alquilar un carro?",
                  a: "Ser mayor de edad, tener licencia de conducir válida y contar con un método de pago registrado en la app.",
                },
                {
                  q: "¿Cómo se garantiza la seguridad?",
                  a: "Verificación de identidad de anfitriones y huéspedes, contratos digitales claros en cada reserva, y opciones de seguro y asistencia en carretera.",
                },
                {
                  q: "¿Qué beneficios tiene ser anfitrión?",
                  a: "Generar ingresos adicionales con su carro, flexibilidad para decidir cuándo y cómo alquilar, y acceso a herramientas de gestión y pagos automáticos.",
                },
                {
                  q: "¿Cómo contacto al soporte de RENGO?",
                  a: "Desde la app encontrará un botón de Ayuda, con chat en vivo y correo electrónico para soporte 24/7.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/30 p-4"
                >
                  <summary className="cursor-pointer text-sm font-medium text-zinc-900 dark:text-white">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-white/70">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}