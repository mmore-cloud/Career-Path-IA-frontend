import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ step, icon, title, description, link }) => {
  return (
    <article className="card h-100 border-0 shadow-sm rounded-4 cp-career-card">
      <div className="card-body p-4 d-flex flex-column">
        <div className="mb-3 align-self-start d-flex align-items-center gap-2">
          <span className="badge text-bg-primary rounded-pill">
            {step}
          </span>

          <span className="badge text-bg-info rounded-pill">
            <i className={`bi ${icon ?? "bi-stars"}`}></i>
          </span>
        </div>

        <h3 className="h5 fw-bold">{title}</h3>

        <p className="text-secondary mb-4 flex-grow-1">{description}</p>

        <Link
          to={link}
          className="btn btn-sm btn-outline-primary mt-auto align-self-start rounded-pill px-3 cp-btn-animated"
        >
          <i className="bi bi-arrow-right-circle me-2"></i>
          Ir a la sección
        </Link>
      </div>
    </article>
  );
};

export default FeatureCard;