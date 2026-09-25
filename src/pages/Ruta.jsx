import SectionTitle from "../components/SectionTitle";
import RouteStep from "../components/RouteStep";
import RouteTopic from "../components/RouteTopic";

import { routeTopics } from "../data/routeTopics";

function Ruta() {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        <SectionTitle
          etiqueta="Mi ruta"
          titulo="Tu camino de aprendizaje"
          descripcion="Seguí tu progreso y descubrí los próximos pasos para avanzar en tu orientación académica."
        />

        <div className="card border-0 shadow-sm rounded-4 mb-5">
          <div className="card-body p-4 p-md-5">

            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">
                Progreso general
              </span>

              <span className="text-primary fw-semibold">
                33%
              </span>
            </div>

            <div className="progress mb-4">
              <div
                className="progress-bar"
                style={{ width: "33%" }}
                role="progressbar"
                aria-valuenow="33"
                aria-valuemin="0"
                aria-valuemax="100"
              >
              </div>
            </div>

            <RouteStep
              numero="1"
              titulo="Completar el perfil"
              descripcion="Definí tus intereses, habilidades y preferencias."
              activo={true}
            />

            <RouteStep
              numero="2"
              titulo="Realizar el test vocacional"
              descripcion="Respondé las preguntas para conocer mejor tu perfil."
              activo={true}
            />

            <RouteStep
              numero="3"
              titulo="Explorar carreras"
              descripcion="Revisá las carreras recomendadas según tus resultados."
              activo={false}
            />

          </div>
        </div>

        <div className="mb-4">
          <h2 className="h4 fw-bold">
            Etapas de tu ruta
          </h2>

          <p className="text-secondary">
            Estos son los pasos principales de tu recorrido.
          </p>
        </div>

        <div className="row g-4">
          {routeTopics.map((topic) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={topic.id}
            >
              <RouteTopic
                titulo={topic.titulo}
                descripcion={topic.descripcion}
                estado={topic.estado}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Ruta;