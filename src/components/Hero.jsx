import React from 'react';

const Hero = ({ subtitle, title, description, primaryBtnText, onPrimaryClick, secondaryBtnText, onSecondaryClick }) => {
  return (
    <section className="bg-dark text-white py-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Columna Izquierda: Textos y Botones */}
          <div className="col-lg-7">
            <span className="badge rounded-pill text-bg-info mb-4 px-3 py-2">
              {subtitle}
            </span>

            <h1 className="display-3 fw-bold lh-sm mb-4">
              {title}
            </h1>

            <p className="lead text-white-50 mb-4">
              {description}
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3">
              <button
                className="btn btn-info btn-lg rounded-pill fw-semibold px-4"
                type="button"
                onClick={onPrimaryClick}
              >
                {primaryBtnText}
              </button>

              {secondaryBtnText && (
                <button
                  className="btn btn-outline-light btn-lg rounded-pill px-4"
                  type="button"
                  onClick={onSecondaryClick}
                >
                  {secondaryBtnText}
                </button>
              )}
            </div>
            
            <p className="small text-white-50 mt-3 mb-0">
              No necesitás tener una carrera elegida para empezar.
            </p>
          </div>

          {/* Columna Derecha: Tarjeta decorativa */}
          <div className="col-lg-5">
            <aside className="card border-info bg-black bg-opacity-25 text-white shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
                  <p className="text-info fw-semibold mb-0">Tu próximo capítulo</p>
                  <span className="badge text-bg-info rounded-circle">✳</span>
                </div>
                <h2 className="h3 fw-bold mb-4">Hay un camino<br />que empieza en vos.</h2>
                <p className="text-info mt-4 mb-0">↗ Tu elección. A tu ritmo.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;