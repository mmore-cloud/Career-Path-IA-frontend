import SectionTitle from "../components/SectionTitle";

function Ruta() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <SectionTitle
          etiqueta="Mi ruta"
          titulo="Ruta de aprendizaje"
          descripcion="Esta sección será migrada por la integrante encargada de Mi Ruta, README y deploy."
        />

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-semibold">
                  Progreso de ejemplo
                </span>

                <span className="text-primary fw-semibold">
                  25%
                </span>
              </div>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: "25%" }}
                  role="progressbar"
                  aria-label="Progreso de la ruta"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="list-group">
              <div className="list-group-item">
                <h3 className="h6 fw-bold mb-1">
                  01 - Conocer intereses
                </h3>

                <p className="text-secondary mb-0">
                  Primer paso del recorrido de aprendizaje.
                </p>
              </div>

              <div className="list-group-item">
                <h3 className="h6 fw-bold mb-1">
                  02 - Explorar carreras
                </h3>

                <p className="text-secondary mb-0">
                  Segundo paso del recorrido.
                </p>
              </div>

              <div className="list-group-item">
                <h3 className="h6 fw-bold mb-1">
                  03 - Armar plan
                </h3>

                <p className="text-secondary mb-0">
                  Tercer paso para organizar la ruta.
                </p>
              </div>
            </div>

            <p className="text-secondary mt-4 mb-0">
              Placeholder visual. Esta página será completada en otra parte del
              TP.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ruta;