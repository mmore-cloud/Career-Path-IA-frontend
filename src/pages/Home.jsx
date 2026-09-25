function Home({ cambiarPagina }) {
  return (
    <>
      <section className="bg-dark text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="badge rounded-pill text-bg-info mb-4 px-3 py-2">
                Orientación vocacional con inteligencia artificial
              </span>

              <h1 className="display-3 fw-bold lh-sm mb-4">
                Tu futuro empieza
                <br />
                por <span className="text-info">conocerte.</span>
              </h1>

              <p className="lead text-white-50 mb-4">
                ¿Todavía no sabés qué estudiar? Descubrí qué te interesa,
                explorá tus posibilidades y empezá a construir tu propio camino.
              </p>

              <p className="text-white-50 mb-4">
                CareerPath AI está pensado para estudiantes que están eligiendo
                una carrera o buscando una nueva dirección.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <button
                  className="btn btn-info btn-lg rounded-pill fw-semibold px-4"
                  type="button"
                  onClick={() => cambiarPagina("perfil")}
                >
                  Comenzar con mi perfil ↗
                </button>

                <button
                  className="btn btn-outline-light btn-lg rounded-pill px-4"
                  type="button"
                  onClick={() => cambiarPagina("test")}
                >
                  Conocer el recorrido
                </button>
              </div>

              <p className="small text-white-50 mt-3 mb-0">
                No necesitás tener una carrera elegida para empezar.
              </p>
            </div>

            <div className="col-lg-5">
              <aside className="card border-info bg-black bg-opacity-25 text-white shadow-lg rounded-4">
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
                    <p className="text-info fw-semibold mb-0">
                      Tu próximo capítulo
                    </p>

                    <span className="badge text-bg-info rounded-circle">
                      ✳
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
                    ↗ Tu elección. A tu ritmo.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <article className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <span className="badge text-bg-primary rounded-pill mb-3">
                    01
                  </span>

                  <h3 className="h5 fw-bold">
                    Perfil
                  </h3>

                  <p className="text-secondary mb-0">
                    Cargá tus intereses, habilidades y situación actual.
                  </p>
                </div>
              </article>
            </div>

            <div className="col-md-4">
              <article className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <span className="badge text-bg-primary rounded-pill mb-3">
                    02
                  </span>

                  <h3 className="h5 fw-bold">
                    Test vocacional
                  </h3>

                  <p className="text-secondary mb-0">
                    Respondé preguntas para conocer mejor tus preferencias.
                  </p>
                </div>
              </article>
            </div>

            <div className="col-md-4">
              <article className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <span className="badge text-bg-primary rounded-pill mb-3">
                    03
                  </span>

                  <h3 className="h5 fw-bold">
                    Resultados
                  </h3>

                  <p className="text-secondary mb-0">
                    Explorá carreras y armá tu propia ruta de aprendizaje.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;