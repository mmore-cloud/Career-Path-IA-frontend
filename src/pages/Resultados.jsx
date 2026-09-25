import SectionTitle from "../components/SectionTitle";

function Resultados() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <SectionTitle
          etiqueta="Resultados"
          titulo="Carreras recomendadas"
          descripcion="Esta sección será migrada por la integrante encargada de Test y Resultados."
        />

        <div className="row g-4">
          <div className="col-md-4">
            <article className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <span className="badge text-bg-primary rounded-pill mb-3">
                  Tecnología
                </span>

                <h3 className="h5 fw-bold">
                  Tecnicatura en Programación
                </h3>

                <p className="text-secondary mb-0">
                  Ejemplo de tarjeta visual para carreras recomendadas.
                </p>
              </div>
            </article>
          </div>

          <div className="col-md-4">
            <article className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <span className="badge text-bg-info rounded-pill mb-3">
                  Sistemas
                </span>

                <h3 className="h5 fw-bold">
                  Ingeniería en Sistemas
                </h3>

                <p className="text-secondary mb-0">
                  Esta sección será completada con datos reales del proyecto.
                </p>
              </div>
            </article>
          </div>

          <div className="col-md-4">
            <article className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <span className="badge text-bg-success rounded-pill mb-3">
                  Datos
                </span>

                <h3 className="h5 fw-bold">
                  Análisis de Datos
                </h3>

                <p className="text-secondary mb-0">
                  Placeholder visual para respetar la estructura del TP.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resultados;