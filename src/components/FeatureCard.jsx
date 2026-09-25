import React from 'react';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="card h-100 border-0 shadow-sm text-center p-4">
      <div className="card-body">
        <div className="mb-3">
          <i className={`bi ${icon} display-4 text-primary`}></i>
        </div>
        <h3 className="card-title h5 fw-bold">{title}</h3>
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;