import React from "react";

export default function CareerCard({ career, onToggleFavorite }) {
  return (
    <article className="card h-100 shadow-sm border-0 rounded-4 cp-career-card">
      <div className="card-body d-flex flex-column p-4">
        <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis mb-3 align-self-start">
          <i className="bi bi-mortarboard me-2"></i>
          {career.tipo ?? career.subtipo ?? "Carrera"} · {career.area ?? "UTN"}
        </span>

        <h3 className="h5 card-title fw-bold">
          {career.nombre ?? career.titulo}
        </h3>

        <p className="card-text text-muted flex-grow-1">
          {career.descripcion}
        </p>

        <div className="d-flex justify-content-between align-items-center gap-3 mt-3">
          <span className="fw-semibold text-muted small">
            <i className="bi bi-clock me-2 text-primary"></i>
            Duración: {career.duracion ?? "No especificada"}
          </span>

          <button
            onClick={() => onToggleFavorite(career.id)}
            className="btn btn-outline-primary btn-sm rounded-pill cp-btn-animated"
            type="button"
          >
            <i className="bi bi-star me-2"></i>
            Favorito
          </button>
        </div>
      </div>
    </article>
  );
}