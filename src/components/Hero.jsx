import React from "react";
import { Link } from "react-router-dom";

const Hero = ({
  badgeText,
  title,
  leadText,
  descriptionText,
  primaryBtn,
  secondaryBtn,
}) => {
  return (
    <section className="bg-dark text-white py-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="badge rounded-pill text-bg-info mb-4 px-3 py-2">
              <i className="bi bi-stars me-2"></i>
              {badgeText}
            </span>

            <h1 className="display-3 fw-bold lh-sm mb-4">{title}</h1>

            <p className="lead text-white-50 mb-4">{leadText}</p>

            <p className="text-white-50 mb-4">{descriptionText}</p>

            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link
                className="btn btn-info btn-lg rounded-pill fw-semibold px-4 cp-btn-animated"
                to={primaryBtn.link}
              >
                <i className={`bi ${primaryBtn.icon ?? "bi-arrow-right-circle"} me-2`}></i>
                {primaryBtn.text}
              </Link>

              <Link
                className="btn btn-outline-light btn-lg rounded-pill px-4 cp-btn-animated"
                to={secondaryBtn.link}
              >
                <i className={`bi ${secondaryBtn.icon ?? "bi-signpost-split"} me-2`}></i>
                {secondaryBtn.text}
              </Link>
            </div>

            <p className="small text-white-50 mt-3 mb-0">
              <i className="bi bi-info-circle me-2"></i>
              No necesitás tener una carrera elegida para empezar.
            </p>
          </div>

          <div className="col-lg-5">
            <aside className="card border-info bg-black bg-opacity-25 text-white shadow-lg rounded-4 cp-fade-up">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
                  <p className="text-info fw-semibold mb-0">
                    Tu próximo capítulo
                  </p>

                  <span className="badge text-bg-info rounded-circle">
                    <i className="bi bi-compass"></i>
                  </span>
                </div>

                <h2 className="h3 fw-bold mb-4">
                  Hay un camino
                  <br />
                  que empieza en vos.
                </h2>

                <ol className="list-unstyled d-grid gap-4 mb-0">
                  <li className="d-flex gap-3">
                    <span className="badge text-bg-primary rounded-pill align-self-start">
                      <i className="bi bi-person-heart me-1"></i>
                      01
                    </span>

                    <div>
                      <h3 className="h6 fw-bold mb-1">
                        Conocé tus intereses
                      </h3>

                      <p className="text-white-50 mb-0">
                        Lo que disfrutás y te da curiosidad.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-3">
                    <span className="badge text-bg-primary rounded-pill align-self-start">
                      <i className="bi bi-search me-1"></i>
                      02
                    </span>

                    <div>
                      <h3 className="h6 fw-bold mb-1">
                        Explorá posibilidades
                      </h3>

                      <p className="text-white-50 mb-0">
                        Carreras e instituciones para descubrir.
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-3">
                    <span className="badge text-bg-primary rounded-pill align-self-start">
                      <i className="bi bi-signpost-split me-1"></i>
                      03
                    </span>

                    <div>
                      <h3 className="h6 fw-bold mb-1">
                        Encontrá tu próximo paso
                      </h3>

                      <p className="text-white-50 mb-0">
                        Conocimientos para seguir creciendo.
                      </p>
                    </div>
                  </li>
                </ol>

                <p className="text-info mt-4 mb-0">
                  <i className="bi bi-arrow-up-right-circle me-2"></i>
                  Tu elección. A tu ritmo.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;