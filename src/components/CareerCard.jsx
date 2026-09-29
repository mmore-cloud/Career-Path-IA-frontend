import React from 'react';

export default function CareerCard({ career, onToggleFavorite }) {
    return (
        <article className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
                <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis mb-2 align-self-start">
                    {career.tipo} • {career.area}
                </span>
                <h3 className="h5 card-title">{career.nombre}</h3>
                <p className="card-text text-muted flex-grow-1">{career.descripcion}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-semibold text-muted small">Duración: {career.duracion}</span>
                    <button
                        onClick={() => onToggleFavorite(career.id)}
                        className="btn btn-outline-primary btn-sm"
                    >
                        Favorito
                    </button>
                </div>
            </div>
        </article>
    );
}