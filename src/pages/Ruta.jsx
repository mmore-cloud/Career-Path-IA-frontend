import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RouteStep from "../components/RouteStep";

import {
  routeObjective,
  routeTopics,
  recommendedTopics,
} from "../data/routeTopics";

import { useSEO } from "../hooks/useSEO";

const STORAGE_KEY = "careerpath-ruta-completados";

function Ruta() {
  useSEO({
    title: "Mi Ruta de Aprendizaje | CareerPath AI",
    description:
      "Seguí tu ruta de aprendizaje personalizada en CareerPath AI, marcá tus avances y completá los conocimientos recomendados para tu orientación profesional.",
    canonicalPath: "/ruta",
  });

  const [temasCompletados, setTemasCompletados] = useState(() => {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY);

      if (!guardados) {
        return [];
      }

      const datos = JSON.parse(guardados);

      if (!Array.isArray(datos)) {
        return [];
      }

      return datos.map((id) =>
        id.startsWith("tema-") ? id.replace("tema-", "") : id,
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(temasCompletados),
    );
  }, [temasCompletados]);

  const todosLosTemas = routeTopics.flatMap(
    (etapa) => etapa.temas,
  );

  const idsValidos = todosLosTemas.map(
    (tema) => tema.id,
  );

  const cantidadCompletados = temasCompletados.filter(
    (id) => idsValidos.includes(id),
  ).length;

  const totalTemas = todosLosTemas.length;

  const cantidadPendientes =
    totalTemas - cantidadCompletados;

  const porcentaje =
    totalTemas === 0
      ? 0
      : Math.round(
          (cantidadCompletados / totalTemas) * 100,
        );

  const toggleTema = (temaId) => {
    setTemasCompletados((anteriores) => {
      if (anteriores.includes(temaId)) {
        return anteriores.filter(
          (id) => id !== temaId,
        );
      }

      return [...anteriores, temaId];
    });
  };

  return (
    <div className="bg-light">
      <div className="container py-5">

        {/* PRESENTACIÓN */}
        <section className="mb-5">
          <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
            Ruta personalizada
          </span>

          <h1 className="display-5 fw-bold mb-3">
            Mi ruta de aprendizaje
          </h1>

          <p
            className="lead text-secondary mb-0"
            style={{ maxWidth: "850px" }}
          >
            Seguí los conocimientos recomendados para acercarte
            a tu objetivo profesional. Marcá cada tema a medida
            que lo completes y CareerPath AI mantendrá registrado
            tu avance.
          </p>
        </section>

        {/* OBJETIVO Y PROGRESO */}
        <section className="card border-0 shadow-sm rounded-4 mb-5">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-5">

              <div className="col-12 col-lg-7">
                <p className="text-primary fw-semibold mb-2">
                  Mi objetivo profesional
                </p>

                <h2 className="h3 fw-bold mb-3">
                  {routeObjective.titulo}
                </h2>

                <p className="text-secondary mb-0">
                  {routeObjective.descripcion}
                </p>
              </div>

              <div className="col-12 col-lg-5">
                <div className="p-4 bg-body-tertiary rounded-4">

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">
                      Progreso general
                    </span>

                    <strong className="text-primary">
                      {porcentaje}%
                    </strong>
                  </div>

                  <div
                    className="progress mb-3"
                    style={{ height: "12px" }}
                  >
                    <div
                      className={`progress-bar ${
                        porcentaje === 100
                          ? "bg-success"
                          : "bg-primary"
                      }`}
                      role="progressbar"
                      style={{
                        width: `${porcentaje}%`,
                      }}
                      aria-label="Progreso general de la ruta"
                      aria-valuenow={porcentaje}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <p className="small text-secondary mb-4">
                    {cantidadCompletados} de {totalTemas} temas
                    completados
                  </p>

                  <div className="row g-3 text-center">
                    <div className="col-4">
                      <div className="bg-white rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-success">
                          {cantidadCompletados}
                        </strong>

                        <small className="text-secondary">
                          Completados
                        </small>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="bg-white rounded-3 p-3 h-100">
                        <strong className="d-block fs-4">
                          {cantidadPendientes}
                        </strong>

                        <small className="text-secondary">
                          Pendientes
                        </small>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="bg-white rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-primary">
                          {porcentaje}%
                        </strong>

                        <small className="text-secondary">
                          Avance
                        </small>
                      </div>
                    </div>
                  </div>

                  {porcentaje === 100 && (
                    <div
                      className="alert alert-success mt-4 mb-0"
                      role="alert"
                    >
                      ¡Completaste todos los temas de tu ruta!
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ETAPAS DE APRENDIZAJE */}
        <section className="mb-5">
          <div className="mb-4">
            <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
              Tu recorrido
            </span>

            <h2 className="h3 fw-bold mb-2">
              Etapas de aprendizaje
            </h2>

            <p className="text-secondary mb-0">
              Tu ruta está organizada desde los conocimientos
              fundamentales hasta áreas de especialización.
            </p>
          </div>

          {routeTopics.map((etapa, index) => (
            <RouteStep
              key={etapa.id}
              etapa={etapa}
              temasCompletados={temasCompletados}
              onToggleTema={toggleTema}
              abiertoInicial={index === 0}
            />
          ))}
        </section>

        {/* CONOCIMIENTOS RECOMENDADOS */}
        <section className="card border-0 shadow-sm rounded-4 mb-5">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-4">

              <div className="col-12 col-lg-5">
                <p className="text-primary fw-semibold mb-2">
                  Para seguir creciendo
                </p>

                <h2 className="h3 fw-bold mb-3">
                  Conocimientos recomendados
                </h2>

                <p className="text-secondary mb-0">
                  Estos conocimientos complementan tu ruta y
                  pueden ayudarte a construir un perfil más
                  completo dentro del área tecnológica.
                </p>
              </div>

              <div className="col-12 col-lg-7">
                <div className="d-flex flex-wrap gap-2">
                  {recommendedTopics.map((tema) => (
                    <span
                      className="badge rounded-pill text-bg-light border px-3 py-2"
                      key={tema}
                    >
                      {tema}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SIGUIENTE PASO */}
        <section className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-4">

              <div className="col-12 col-lg-8">
                <p className="text-primary fw-semibold mb-2">
                  Siguiente paso
                </p>

                <h2 className="h4 fw-bold mb-2">
                  Tu recorrido puede seguir evolucionando
                </h2>

                <p className="text-secondary mb-0">
                  A medida que completes temas, tu progreso
                  quedará guardado en este dispositivo para que
                  puedas continuar desde donde lo dejaste.
                </p>
              </div>

              <div className="col-12 col-lg-4 text-lg-end">
                <Link
                  to="/resultados"
                  className="btn btn-primary btn-lg rounded-pill px-4"
                >
                  Ver mis resultados
                </Link>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Ruta;