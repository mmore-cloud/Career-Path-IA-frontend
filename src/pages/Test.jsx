import SectionTitle from "../components/SectionTitle";

function Test() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <SectionTitle
          etiqueta="Test vocacional"
          titulo="Explorá tus intereses"
          descripcion="Esta sección será migrada por la integrante encargada de Test y Resultados."
        />

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-md-5">
            <h3 className="h5 fw-bold mb-3">
              Pregunta de ejemplo
            </h3>

            <p className="text-secondary">
              ¿Qué tipo de actividades disfrutás más?
            </p>

            <div className="d-grid gap-3">
              <button className="btn btn-outline-primary rounded-pill" disabled>
                Resolver problemas con tecnología
              </button>

              <button className="btn btn-outline-primary rounded-pill" disabled>
                Diseñar ideas visuales
              </button>

              <button className="btn btn-outline-primary rounded-pill" disabled>
                Ayudar a otras personas
              </button>
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

export default Test;