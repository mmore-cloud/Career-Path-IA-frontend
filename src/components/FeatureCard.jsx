import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ step, title, description, link }) => {
  return (
    <article className="card h-100 border-0 shadow-sm rounded-4">
      <div className="card-body p-4 d-flex flex-column">
        <div className="mb-3 align-self-start">
          <span className="badge text-bg-primary rounded-pill">
            {step}
          </span>
        </div>

        <h3 className="h5 fw-bold">
          {title}
        </h3>

        <p className="text-secondary mb-4 flex-grow-1">
          {description}
        </p>

        <Link to={link} className="btn btn-sm btn-outline-primary mt-auto align-self-start rounded-pill px-3">
          Ir a la sección
        </Link>
      </div>
    </article>
  );
};

export default FeatureCard;