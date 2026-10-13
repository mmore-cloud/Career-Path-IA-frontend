cat > src/components/CareerCard.jsx <<'EOF'
import React from "react";

export default function CareerCard({
  career,
  isFavorite = false,
  viewMode = "grid",
  onToggleFavorite,
  onViewDetails,
}) {
  const title = career.nombre ?? career.titulo ?? "Carrera UTN";
  const detail = career.subtipo ?? career.tipo ?? career.area ?? "Carrera";
  const isListView = viewMode === "list";

  return (
    <article
      className={`card h-100 shadow-sm border-0 rounded-4 cp-career-card ${
        isListView ? "cp-career-card-list" : ""
      }`}
    >
      <div
        className={`card-body d-flex ${
          isListView
            ? "flex-column flex-md-row align-items-md-center gap-3"
            : "flex-column"
        } p-4`}
      >
        <div className="flex-grow-1">
          <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis mb-3 align-self-start">
            <i className="bi bi-mortarboard me-2"></i>
            {detail} · {career.area ?? "UTN"}
          </span>

          <h3 className="h5 card-title fw-bold">{title}</h3>

          <p className="card-text text-muted flex-grow-1">
            {career.descripcion ?? "Información de la carrera UTN."}
          </p>

          <div className="d-flex flex-wrap gap-3 text-muted small mt-3">
            <span>
              <i className="bi bi-clock me-2 text-primary"></i>
              Duración: {career.duracion ?? "No especificada"}
            </span>

            <span>
              <i className="bi bi-display me-2 text-primary"></i>
              {career.modalidad ?? "Modalidad no especificada"}
            </span>
          </div>
        </div>

        <div
          className={`d-flex gap-2 ${
            isListView
              ? "justify-content-md-end align-items-md-center"
              : "justify-content-between align-items-center mt-4"
          }`}
        >
          <button
            onClick={onToggleFavorite}
            className={`btn btn-sm rounded-pill cp-btn-animated ${
              isFavorite ? "btn-primary" : "btn-outline-primary"
            }`}
            type="button"
          >
            <i className={`bi ${isFavorite ? "bi-star-fill" : "bi-star"} me-2`}></i>
            {isFavorite ? "Guardado" : "Favorito"}
          </button>

          <button
            onClick={onViewDetails}
            className="btn btn-outline-secondary btn-sm rounded-pill cp-btn-animated"
            type="button"
          >
            <i className="bi bi-eye me-2"></i>
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}
EOF