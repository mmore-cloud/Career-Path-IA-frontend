import SectionTitle from "../components/SectionTitle";

function Perfil() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <SectionTitle
          etiqueta="Mi perfil"
          titulo="Perfil del estudiante"
          descripcion="Esta sección será migrada por la integrante encargada de Inicio y Perfil."
        />

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Nombre completo
                </label>

                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Ej: Morena Marina"
                  disabled
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Edad
                </label>

                <input
                  className="form-control form-control-lg"
                  type="number"
                  placeholder="19"
                  disabled
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Ciudad
                </label>

                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Tucumán"
                  disabled
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Intereses
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tecnología, diseño, programación..."
                  disabled
                ></textarea>
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

export default Perfil;