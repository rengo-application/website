import {Footer} from "@/components/Footer";
import {Navbar} from "@/components/Navbar";
import { AuroraBackground } from "@/components/AuroraBackground";

export default function PoliticasPage() {
  return (
    <main className="relative text-white">
      <AuroraBackground />

      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto max-w-5xl px-4 py-10">
          <header className="mb-8">
            <p className="text-xs text-white/60">Legal</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Política de Privacidad
            </h1>
            <p className="mt-3 text-sm text-white/70">
              Última actualización: <span className="text-white/80">9 de octubre de 2025</span>
            </p>
          </header>

          <div className="rounded-3xl border border-white/10 bg-black/35 p-6 md:p-10 backdrop-blur">
            <article
              className="max-w-none text-white/80 leading-relaxed
              [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white
              [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-white
              [&_p]:mt-4
              [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mt-2
              [&_hr]:my-10 [&_hr]:border-white/10
              [&_strong]:text-white"
            >
              <h2>Rengo Technologies</h2>

              <p>
                Rengo LLC (“Rengo”, “nosotros” o “nuestro”) valora tu privacidad y se compromete a proteger tus datos personales. Esta política describe cómo recopilamos, usamos, compartimos y protegemos tu información en relación con nuestros servicios de renta de vehículos entre particulares en Honduras.
              </p>

              <hr />

              <h2>📋 Información que recopilamos</h2>

              <h3>1. Información proporcionada por el usuario</h3>
              <ul>
                <li>Datos de cuenta: nombre, correo electrónico, número de teléfono y contraseña.</li>
                <li>Datos de perfil: dirección, foto de perfil, licencia de conducir y fecha de nacimiento.</li>
                <li>Datos del vehículo (si eres anfitrión): marca, modelo, año, ubicación, disponibilidad y fotos.</li>
                <li>Información de pago: número de cuenta bancaria, tarjeta de débito o crédito e historial de transacciones.</li>
              </ul>

              <h3>2. Información recopilada automáticamente</h3>
              <ul>
                <li>Datos de uso: páginas visitadas, búsquedas y duración de sesiones.</li>
                <li>Datos de ubicación: ciudad o zona aproximada según IP o GPS, si el usuario lo permite.</li>
                <li>Datos del dispositivo: tipo, sistema operativo, navegador y dirección IP.</li>
              </ul>

              <h3>3. Información de terceros</h3>
              <ul>
                <li>Verificación de identidad: documentos oficiales y redes sociales, si el usuario lo vincula.</li>
                <li>Historial de conducción: registros públicos y antecedentes de tránsito, si aplica.</li>
              </ul>

              <hr />

              <h2>🎯 Cómo usamos tu información</h2>
              <ul>
                <li>Para operar y mejorar la plataforma Rengo.</li>
                <li>Para verificar identidad y prevenir fraudes.</li>
                <li>Para facilitar pagos y cobros entre anfitriones y arrendatarios.</li>
                <li>Para enviar notificaciones, recordatorios y mensajes de soporte.</li>
                <li>Para personalizar tu experiencia y mostrarte contenido relevante.</li>
                <li>Para cumplir con obligaciones legales en Honduras, incluyendo la Ley de Protección de Datos Personales y el Decreto 41-2020.</li>
              </ul>

              <hr />

              <h2>🔄 Cómo compartimos tu información</h2>
              <ul>
                <li>Entre anfitriones y arrendatarios: nombre, foto, número de teléfono y ubicación del vehículo.</li>
                <li>Con proveedores de servicios: procesamiento de pagos, verificación de identidad y soporte técnico.</li>
                <li>Con autoridades hondureñas: en caso de requerimientos legales, investigaciones o infracciones.</li>
                <li>Con tu consentimiento: si decides vincular redes sociales o compartir tu perfil públicamente.</li>
              </ul>

              <hr />

              <h2>⚖️ Tus derechos como usuario en Honduras</h2>
              <p>
                De acuerdo con la Ley de Protección de Datos Personales, tienes derecho a:
              </p>
              <ul>
                <li>Acceder a tus datos personales.</li>
                <li>Rectificar información incorrecta.</li>
                <li>Solicitar la eliminación de tus datos, excepto cuando sea necesario por ley.</li>
                <li>Oponerte al tratamiento de tus datos para fines de marketing.</li>
              </ul>
              <p>
                Puedes ejercer estos derechos escribiendo a: <strong>privacidad@rengo.hn</strong>
              </p>

              <hr />

              <h2>🔐 Seguridad de la información</h2>
              <p>
                Rengo implementa medidas técnicas y organizativas para proteger tu información contra accesos no autorizados, pérdida o alteración. Sin embargo, ningún sistema es 100% seguro.
              </p>

              <hr />

              <h2>👶 Usuarios menores de edad</h2>
              <p>
                Rengo no está disponible para personas menores de 18 años. Si detectamos que un menor ha creado una cuenta, procederemos a eliminarla.
              </p>

              <hr />

              <h2>🌎 Transferencia internacional de datos</h2>
              <p>
                En caso de usar servicios alojados fuera de Honduras, como servidores en EE.UU., tus datos podrían ser transferidos internacionalmente. Nos aseguramos de que dichos servicios cumplan con estándares adecuados de protección.
              </p>
            </article>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
