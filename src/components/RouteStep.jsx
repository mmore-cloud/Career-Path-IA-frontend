import { useState } from "react";
import RouteTopic from "./RouteTopic";

function RouteStep({
  etapa,
  temasCompletados,
  onToggleTema,
  abiertoInicial = false,
}) {
  const [abierto, setAbierto] = useState(abiertoInicial);

  const completadosEtapa = etapa.temas.filter((tema) =>
    temasCompletados.includes(tema.id),
  ).length;

  const toggleEtapa = () => {
    setAbierto((estadoActual) => !estadoActual);
  };

  return (
    <article className="card border border-primary-subtle shadow-sm rounded-4 overflow-hidden bg-body">
      <div className="card-header bg-body-tertiary border-0 p-0">
        <button
          type="button"
          className="btn w-100 text-start p-3 p-md-4 d-flex align-items-center gap-3"
          onClick={toggleEtapa}
          aria-expanded={abierto}
        >
          <span className="badge rounded-pill text-bg-primary px-3 py-2">
            <i className="bi bi-journal-check me-2"></i>
            {etapa.numero}
          </span>

          <span className="flex-grow-1">
            <span className="d-block fw-bold fs-5 text-body">
              {etapa.titulo}
            </span>

            <small className="text-secondary">
              {completadosEtapa} de {etapa.temas.length} materias marcadas
            </small>
          </span>

          <span className="fs-5 text-primary" aria-hidden="true">
            <i
              className={`bi ${abierto ? "bi-chevron-up" : "bi-chevron-down"}`}
            ></i>
          </span>
        </button>
      </div>

      {abierto && (
        <div className="card-body border-top p-3 p-md-4 bg-body">
          <p className="text-secondary mb-4">{etapa.descripcion}</p>

          <div className="row g-3">
            {etapa.temas.map((topic) => (
              <div className="col-12 col-md-6" key={topic.id}>
                <RouteTopic
                  topic={topic}
                  completado={temasCompletados.includes(topic.id)}
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