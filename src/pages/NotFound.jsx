import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="py-5 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7 text-center">
            <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
              Error 404
            </span>

            <h1 className="display-5 fw-bold mb-3">
              Página no encontrada
            </h1>

            <p className="text-secondary mb-4">
              La sección que intentás visitar no existe o fue movida.
              Podés volver al inicio para continuar navegando por CareerPath AI.
            </p>

            <Link
              to="/"
              className="btn btn-primary btn-lg rounded-pill px-4"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;