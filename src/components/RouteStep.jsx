import { useState } from "react";
import RouteTopic from "./RouteTopic";

function RouteStep({
  etapa,
  temasCompletados,
  onToggleTema,
  abiertoInicial = false,
}) {
  // Controla si la etapa está abierta o cerrada.
  const [abierto, setAbierto] = useState(abiertoInicial);

  // Calcula cuántos temas de esta etapa están completados.
  const completadosEtapa = etapa.temas.filter((tema) =>
    temasCompletados.includes(tema.id),
  ).length;

  const toggleEtapa = () => {
    setAbierto((estadoActual) => !estadoActual);
  };

  return (
    <article className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden cp-route-preview">
      <div className="card-header bg-white border-0 p-0">
        <button
          type="button"
          className="btn w-100 text-start p-4 d-flex align-items-center gap-3"
          onClick={toggleEtapa}
          aria-expanded={abierto}
        >
          <span className="badge rounded-pill bg-primary px-3 py-2">
            <i className="bi bi-signpost-split me-2"></i>
            {etapa.numero}
          </span>

          <span className="flex-grow-1">
            <span className="d-block fw-bold fs-5">
              {etapa.titulo}
            </span>

            <small className="text-secondary">
              {completadosEtapa} de {etapa.temas.length} temas completados
            </small>
          </span>

          <span
            className="fs-4 text-primary"
            aria-hidden="true"
          >
            <i
              className={`bi ${
                abierto
                  ? "bi-chevron-up"
                  : "bi-chevron-down"
              }`}
            ></i>
          </span>
        </button>
      </div>

      {abierto && (
        <div className="card-body border-top p-4">
          <p className="text-secondary mb-4">
            {etapa.descripcion}
          </p>

          <div className="row g-3">
            {etapa.temas.map((topic) => (
              <div
                className="col-12 col-md-6"
                key={topic.id}
              >
                <RouteTopic
                  topic={topic}
                  completado={temasCompletados.includes(
                    topic.id,
                  )}
                  onToggle={onToggleTema}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default RouteStep;