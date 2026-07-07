// src/app/terminos/page.tsx
import {Footer} from "@/components/Footer";
import {Navbar} from "@/components/Navbar";
import { AuroraBackground } from "@/components/AuroraBackground";

export default function TerminosPage() {
  return (
    <main className="relative text-white">
      <AuroraBackground />

      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto max-w-5xl px-4 py-10">
          <header className="mb-8">
            <p className="text-xs text-white/60">Legal</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Términos y Condiciones
            </h1>
            <p className="mt-3 text-sm text-white/70">
              Última actualización: <span className="text-white/80">
                9 de octubre de 2025
            </span>
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
              <h2>📘 Términos de Servicio – Rengo</h2>

              <h3>1. Introducción</h3>
              <p>
                Rengo es una plataforma digital que conecta a propietarios de vehículos con personas interesadas
                en rentarlos por períodos definidos. La plataforma está disponible en línea, incluyendo sitio web,
                aplicación móvil y otros canales digitales relacionados (en adelante, “los Servicios”).
              </p>
              <p>
                Al acceder o utilizar los Servicios, incluyendo la comunicación con Rengo o con otros usuarios, el
                usuario acepta cumplir con estos Términos de Servicio (en adelante, “los Términos”), independientemente
                de si se ha registrado formalmente. Estos Términos rigen el acceso y uso de los Servicios y constituyen
                un acuerdo legal vinculante entre el usuario y Rengo.
              </p>

              <h3>2. Alcance del Acuerdo</h3>
              <p>
                Estos Términos, junto con las políticas de cancelación, no discriminación, condiciones de seguros,
                asistencia vial y otras políticas complementarias (en conjunto, “el Acuerdo”), constituyen el marco
                legal entre el usuario y Rengo.
              </p>
              <p>
                Cada reserva incluye un acuerdo específico entre el propietario del vehículo y el arrendatario,
                accesible digitalmente como constancia de la operación. Rengo actúa como intermediario entre ambas
                partes, facilitando la gestión, comunicación y pago de las reservas.
              </p>

              <h3>3. Modificaciones</h3>
              <p>
                Rengo se reserva el derecho de modificar los Servicios o el Acuerdo en cualquier momento. Las
                actualizaciones serán publicadas directamente en los Servicios, indicando la fecha de última revisión.
              </p>
              <p>
                El uso continuado de los Servicios después de una modificación implica la aceptación de los nuevos
                términos. Si el usuario no está de acuerdo, podrá cerrar su cuenta en un plazo de 30 días desde la
                publicación del cambio. Si utiliza los Servicios durante ese período, se considerará que acepta la
                nueva versión.
              </p>

              <h3>4. Elegibilidad</h3>
              <p>Los Servicios están disponibles para usuarios que cumplan con los requisitos de elegibilidad establecidos para su ubicación.</p>
              <ul>
                <li>Los propietarios deben tener al menos 21 años.</li>
                <li>Se prohíbe el uso de los Servicios por parte de personas que no cumplan con estos criterios.</li>
              </ul>

              <h3>5. Registro de Cuenta</h3>
              <p>
                Para acceder a funciones como publicar o reservar vehículos, se debe crear una cuenta proporcionando
                datos verídicos y actualizados como nombre, correo electrónico, número móvil y credenciales de
                autenticación.
              </p>
              <p>
                Según el tipo de usuario, se podrá solicitar información adicional como datos del vehículo,
                documentación legal y verificación de identidad. Rengo podrá establecer requisitos adicionales como
                depósitos, validación de métodos de pago o selección de planes de protección.
              </p>

              <h3>6. Verificación</h3>
              <p>Rengo podrá, donde lo permita la ley, realizar verificaciones de identidad, historial de conducción y condiciones del vehículo, incluyendo:</p>
              <ul>
                <li>Validación de licencias</li>
                <li>Verificación del estado legal y técnico del vehículo</li>
                <li>Evaluaciones automatizadas o por terceros</li>
              </ul>
              <p>
                Estas verificaciones no implican garantía ni aval por parte de Rengo. La responsabilidad sobre el estado
                legal, técnico y operativo del vehículo recae exclusivamente en el propietario.
              </p>
              <p>
                Rengo podrá aprobar o rechazar solicitudes de reserva o publicación según criterios internos, sin
                obligación de justificación.
              </p>

              <h3>7. Informes de Consumidor</h3>
              <p>
                Al intentar reservar o publicar un vehículo, o si se detecta riesgo elevado asociado con una cuenta, el
                usuario autoriza expresamente a Rengo a solicitar reportes de crédito, historial de seguros o antecedentes
                penales conforme a las leyes aplicables en su jurisdicción. Esta información se utilizará únicamente para
                validar la seguridad y legalidad de las operaciones dentro de los Servicios.
              </p>

              <hr />

              <h2>💼 Honorarios, Tasas e Impuestos – Rengo</h2>

              <h3>1. Tarifas por el uso de los Servicios</h3>
              <p>
                Las tarifas aplicables por el uso de Rengo se muestran al arrendatario antes de confirmar su solicitud de
                viaje. El propietario puede consultar sus ganancias estimadas en su panel personal dentro de la plataforma.
                Al registrar un método de pago, el usuario autoriza a Rengo y a sus proveedores externos de pagos a
                almacenar dicha información para uso futuro en caso de saldos pendientes.
              </p>
              <p>
                Rengo podrá utilizar estos datos para aplicar cargos relacionados con el uso del vehículo, penalidades por
                retraso, depósitos de seguridad, reclamaciones, procesamiento de pagos o tarifas administrativas. En algunos
                casos, los procesadores de pagos podrían actualizar automáticamente las credenciales almacenadas en caso de
                renovación, pérdida o robo de tarjetas.
              </p>
              <p>
                Si no es posible emitir un reembolso en el método de pago original, Rengo se reserva el derecho de emitir
                crédito digital para uso dentro de la plataforma. Las condiciones aplicables al crédito se detallan en las
                políticas internas de Rengo.
              </p>

              <h3>2. Cobro de saldos</h3>
              <p>
                Rengo y sus proveedores podrán emplear todos los medios legales disponibles para recuperar montos adeudados,
                incluyendo el uso de agencias de cobranza o asesoría jurídica.
              </p>
              <p>
                El incumplimiento en los pagos podría ser reportado a agencias de crédito, lo cual impactará en el historial
                del usuario. Estos reportes pueden incluir datos sobre pagos atrasados, cuentas en mora, contracargos o
                disputas. Además de la suma adeudada, Rengo podrá aplicar cargos por gestión de cobranza, procesamiento, o
                servicios de terceros relacionados.
              </p>

              <h3>3. Impuestos</h3>
              <p>
                Rengo podrá facilitar, según la normativa vigente en cada jurisdicción, la recaudación y entrega de
                impuestos relacionados con las transacciones efectuadas en la plataforma. Los montos recaudados serán
                visibles en los comprobantes para ambas partes (propietario y arrendatario).
              </p>
              <p>
                Cuando Rengo se encargue de la gestión tributaria en nombre de los propietarios, estos no deberán recaudar
                el mismo impuesto por separado en dicha jurisdicción. Para documentación fiscal, el usuario consiente
                expresamente la entrega electrónica.
              </p>

              <hr />

              <h2>🔒 Compromisos del Usuario</h2>
              <ul>
                <li>
                  <strong>Actividad de la cuenta:</strong> El usuario es responsable exclusivo de toda la actividad realizada bajo su
                  cuenta, incluyendo protección de credenciales.
                </li>
                <li>
                  <strong>Contenido publicado:</strong> Al subir o compartir contenido (fotos, reseñas, descripciones), el usuario concede a
                  Rengo una licencia mundial, no exclusiva, transferible y libre de regalías para usar, mostrar, adaptar y
                  promocionar dicho contenido.
                </li>
                <li>
                  <strong>Propiedad intelectual:</strong> Esta licencia no implica cesión de propiedad ni limita el derecho del usuario a utilizar
                  su propio contenido fuera de la plataforma.
                </li>
                <li>
                  <strong>Tecnología de terceros:</strong> Algunas funciones pueden usar herramientas de terceros (por ejemplo, mapas). El usuario
                  acepta los términos de dichos proveedores al utilizar estas funciones.
                </li>
              </ul>

              <h2>🚫 Actividades prohibidas – Rengo</h2>
              <p>Se prohíbe realizar o fomentar cualquiera de las siguientes conductas al usar los Servicios:</p>
              <ol>
                <li>
                  <strong>Infracciones legales:</strong> violar normativa aplicable; publicar contenido falso o engañoso; infringir derechos de
                  propiedad intelectual, privacidad o reputación.
                </li>
                <li>
                  <strong>Manipulación de identidad o información:</strong> proporcionar datos falsos; usar la plataforma en nombre de terceros
                  sin autorización; suplantar identidades.
                </li>
                <li>
                  <strong>Incumplimiento de compromisos:</strong> no pagar montos adeudados; no entregar o devolver el vehículo a tiempo; hacer
                  transacciones fuera de la plataforma para evadir tarifas.
                </li>
                <li>
                  <strong>Seguridad y uso indebido:</strong> transferir la cuenta; dejar vehículos sin medidas de seguridad; acosar o recopilar datos
                  personales sin consentimiento.
                </li>
                <li>
                  <strong>Conductas discriminatorias y abusivas:</strong> discriminar u ofender a otros usuarios.
                </li>
                <li>
                  <strong>Uso indebido de la plataforma:</strong> spam, malware, bots, accesos no autorizados, ingeniería inversa o explotación de
                  áreas protegidas.
                </li>
              </ol>

              <h2>⚖️ Otros asuntos legales – Rengo</h2>
              <h3>1. Investigaciones e infracciones</h3>
              <p>
                Rengo se reserva el derecho de investigar incumplimientos, tomar acciones legales, remitir casos a
                autoridades competentes y aplicar medidas técnicas o contractuales. Podremos suspender, limitar o cerrar
                cuentas, eliminar contenido, restringir anuncios o denegar reclamaciones si consideramos que el usuario ha
                vulnerado los Términos.
              </p>

              <h3>2. Aplicación flexible de políticas</h3>
              <p>
                En casos excepcionales, Rengo podrá aplicar sus políticas con flexibilidad, considerando el historial de
                comportamiento del usuario y circunstancias específicas.
              </p>

              <h3>3. Comunicaciones</h3>
              <p>
                El usuario acepta recibir notificaciones de Rengo por medios electrónicos (correo, mensajes en la app,
                notificaciones en la plataforma). Las comunicaciones podrán ser grabadas o monitoreadas para fines de
                calidad y mejora de servicio.
              </p>

              <h3>4. Protección y seguros</h3>
              <p>
                Rengo no es una compañía aseguradora. Los planes de protección dentro de la plataforma son servicios
                adicionales con cobertura limitada y sujetos al cumplimiento de estos Términos.
              </p>

              <hr />

              <h2>🚗 Condiciones específicas para arrendatarios (Cliente)</h2>
              <h3>Compromisos del arrendatario</h3>
              <ul>
                <li>Conducir con licencia vigente y conforme a la normativa local.</li>
                <li>Tratar el vehículo y los Extras con responsabilidad.</li>
                <li>Entregar el vehículo en condiciones similares al momento de recepción.</li>
                <li>No permitir que personas no autorizadas conduzcan el vehículo.</li>
              </ul>

              <h3>Cancelaciones y modificaciones</h3>
              <p>
                Una vez realizada la reserva, no aplica derecho de desistimiento según las disposiciones locales. El
                arrendatario podrá modificar su plan de protección o servicios complementarios antes del inicio del viaje.
              </p>

              <h3>Responsabilidad por daños</h3>
              <p>
                El arrendatario principal será responsable económicamente por los daños físicos o robos ocurridos al
                vehículo durante el período de uso. Rengo podrá ofrecer planes que limiten esta responsabilidad bajo
                condiciones establecidas en la plataforma.
              </p>

              <hr />

              <h2>🛡️ Seguro de Responsabilidad Civil y Protección Legal – Rengo</h2>
              <h3>1. Cobertura de responsabilidad civil</h3>
              <p>
                Rengo no actúa como compañía aseguradora ni ofrece directamente pólizas de seguros. En mercados donde Rengo
                haya formalizado convenios con aseguradoras o proveedores, la cobertura puede ofrecerse como parte de los
                Servicios, bajo condiciones claras y sujetas a la legislación aplicable.
              </p>

              <h3>2. Uso del vehículo reservado</h3>
              <ul>
                <li>Utilizar el vehículo exclusivamente para fines lícitos.</li>
                <li>No operar el vehículo para transporte comercial regulado sin autorización escrita.</li>
                <li>Presentar licencia vigente antes de iniciar el viaje.</li>
                <li>Cumplir con leyes de tránsito y seguridad vial.</li>
              </ul>

              <h3>3. Datos telemáticos y dispositivos a bordo</h3>
              <p>
                Los vehículos pueden estar equipados con dispositivos que recolectan datos operativos (ubicación,
                kilometraje, diagnósticos, etc.). Al reservar, el usuario autoriza el uso de esta tecnología durante su
                viaje.
              </p>

              <h3>4. Estado del vehículo y Extras</h3>
              <p>
                Rengo actúa como plataforma entre terceros. Los vehículos y Extras son de anfitriones independientes. El
                arrendatario deberá realizar inspección visual al inicio del viaje y reportar daños preexistentes.
              </p>

              <h3>🎒 Pertenencias personales</h3>
              <p>
                Ni Rengo ni los anfitriones serán responsables por objetos olvidados, robados o dañados durante un viaje.
              </p>

              <hr />

              <h2>🚨 Informe de incidentes y recuperación de vehículos – Rengo</h2>
              <h3>1. Comunicación de incidentes</h3>
              <p>
                Ante cualquier daño durante la reserva, el arrendatario deberá informarlo de inmediato a Rengo,
                proporcionando descripción, evidencia fotográfica e información relevante.
              </p>

              <h3>2. Robo, extravío o uso indebido</h3>
              <p>
                No devolver el vehículo, negarse a devolverlo, falsear datos o permitir conducción no autorizada puede
                considerarse uso irregular, con consecuencias civiles o penales.
              </p>

              <h3>3. Recuperación de vehículo</h3>
              <p>
                Rengo, sus agentes o el anfitrión podrán recuperar el vehículo si no se devuelve al finalizar el período
                autorizado o se detecta uso ilícito. Los costos de recuperación corren por cuenta del arrendatario.
              </p>

              <hr />

              <h2>🧾 Condiciones específicas para anfitriones – Rengo</h2>
              <h3>1. Compromisos del anfitrión</h3>
              <p>
                Al listar su vehículo en Rengo, el anfitrión se compromete a proporcionar un vehículo seguro, registrado,
                asegurado y apto para circular; entregar únicamente a un arrendatario autorizado; publicar anuncios veraces;
                y cumplir obligaciones operativas y financieras vinculadas al uso de Rengo.
              </p>

              <h3>2. Registro de vehículos y condiciones del anuncio</h3>
              <p>
                Cada vehículo debe ser registrado con matrícula actualizada y documentación aplicable. Rengo no acepta pagos
                para mejorar la visibilidad de anuncios.
              </p>

              <h3>3. Exclusividad en Rengo</h3>
              <p>
                Los vehículos listados no deben estar disponibles simultáneamente en otras plataformas de alquiler entre
                particulares, salvo autorización expresa.
              </p>

              <h3>4. Fotografía de vehículos</h3>
              <p>
                Rengo podrá ofrecer servicios fotográficos. El anfitrión acepta el uso comercial y promocional de las
                imágenes por parte de Rengo.
              </p>

              <h3>5. Disponibilidad y entrega</h3>
              <p>
                Una vez confirmada la reserva, el anfitrión debe poner a disposición el vehículo en el lugar, fecha y hora
                acordados.
              </p>

              <h3>6. Precios y pagos</h3>
              <p>
                El anfitrión puede fijar el precio. Rengo transferirá las ganancias descontando tarifas aplicables. Rengo
                podrá colaborar con procesadores de pagos externos.
              </p>

              <h3>7. Entregas en lugares regulados</h3>
              <p>
                En puntos como terminales o aeropuertos, pueden requerirse permisos o tarifas locales; el anfitrión será
                responsable de cumplir dichas regulaciones.
              </p>

              <hr />

              <h2>⚖️ Resolución de disputas, arbitraje y jurisdicción – Rengo LATAM</h2>
              <p>
                Rengo promueve la resolución de controversias mediante mecanismos alternativos. Dependiendo de la
                jurisdicción, las disputas podrán resolverse mediante arbitraje vinculante u otras vías conforme a la
                legislación aplicable.
              </p>
              <ul>
                <li>Las reclamaciones deberán presentarse de forma individual (sin acciones colectivas), salvo excepciones permitidas por ley.</li>
                <li>Los nuevos usuarios podrán renunciar al arbitraje dentro de 30 días, mediante notificación escrita.</li>
                <li>Si el arbitraje no aplica, las disputas se resolverán en tribunales competentes del país donde opere Rengo.</li>
              </ul>

              <hr />

              <h2>📄 Disposiciones Generales – Rengo</h2>
              <h3>Descargo de responsabilidad</h3>
              <p>
                Rengo proporciona una plataforma digital para el uso compartido de vehículos entre particulares. Los
                Servicios se brindan “tal cual”, sin garantía explícita ni implícita.
              </p>

              <h3>Limitación de responsabilidad</h3>
              <p>
                En la máxima medida permitida por ley, la responsabilidad económica total de Rengo no excederá el mayor
                entre (1) el monto pagado o recibido en los últimos 12 meses por el usuario, o (2) USD $100.
              </p>

              <h3>Indemnización</h3>
              <p>
                El usuario acepta eximir de responsabilidad a Rengo por reclamaciones vinculadas con el uso de los
                Servicios, incumplimiento de estos Términos o interacciones con otros usuarios.
              </p>

              <h3>Moneda y redondeo</h3>
              <p>
                Rengo podrá aplicar redondeo en importes pagaderos, conforme a la legislación vigente.
              </p>

              <h3>Contacto oficial</h3>
              <p>
                Para consultas generales o soporte, comuníquese por los canales oficiales definidos por Rengo para su
                jurisdicción.
              </p>

              <h3>Traducciones y versiones válidas</h3>
              <p>
                En caso de discrepancia entre traducciones, prevalecerá la versión oficial aplicable al país sede de
                operación.
              </p>

              <h3>Divisibilidad e irrenunciabilidad</h3>
              <p>
                Si alguna cláusula resulta inválida, ello no afectará la validez del resto del Acuerdo.
              </p>

              <h3>Relación entre partes</h3>
              <p>
                El uso de Rengo no crea relación laboral, de agencia o sociedad legal entre el usuario y la plataforma.
              </p>

              <h3>Interpretación final</h3>
              <p>
                Estos Términos constituyen el acuerdo completo entre el usuario y Rengo respecto al uso de los Servicios.
              </p>
            </article>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}