import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function UserProfileSummary({
  user,
  recommendations = [],
  learningRoute = null,
  onUpdateProfile,
  onLogout,
  onResetUsers,
}) {
  const [profileData, setProfileData] = useState({
    intereses: "",
    habilidades: "",
  });

  useEffect(() => {
    setProfileData({
      intereses: user.intereses?.join(", ") ?? "",
      habilidades: user.habilidades?.join(", ") ?? "",
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfileData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const intereses = profileData.intereses
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const habilidades = profileData.habilidades
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    onUpdateProfile({
      intereses,
      habilidades,
    });
  };

  const hasProfileData =
    user.intereses?.length > 0 || user.habilidades?.length > 0;

  return (
    <article className="card border-0 shadow-sm rounded-4 cp-profile-card cp-fade-up">
      <div className="card-body p-4 p-md-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <span className="badge rounded-pill text-bg-primary mb-3 cp-soft-badge">
              <i className="bi bi-person-badge me-2"></i>
              Perfil vocacional
            </span>

            <h1 className="h3 fw-bold mb-2">{user.nombre}</h1>

            <p className="text-secondary mb-0">
              Completá tus intereses y habilidades para preparar el test
              vocacional y las futuras recomendaciones.
            </p>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2 align-self-start">
            <button
              className="btn btn-outline-secondary rounded-pill cp-btn-animated"
              type="button"
              onClick={onResetUsers}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Restaurar
            </button>

            <button
              className="btn btn-outline-danger rounded-pill cp-btn-animated"
              type="button"
              onClick={onLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Cerrar sesión
            </button>
          </div>
        </div>

        <section className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-4 h-100 cp-info-card">
              <p className="text-secondary small mb-1">
                <i className="bi bi-envelope me-2"></i>
                Gmail
              </p>

              <p className="fw-semibold mb-0">{user.email}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 bg-light rounded-4 h-100 cp-info-card">
              <p className="text-secondary small mb-1">
                <i className="bi bi-check-circle me-2"></i>
                Estado
              </p>

              <p className="fw-semibold mb-0">
                {hasProfileData ? "Perfil iniciado" : "Perfil pendiente"}
              </p>
            </div>
          </div>
        </section>

        <form
          className="p-4 rounded-4 bg-light mb-4 cp-profile-form"
          onSubmit={handleSubmit}
        >
          <h2 className="h5 fw-bold mb-3">
            <i className="bi bi-pencil-square text-primary me-2"></i>
            Completar datos vocacionales
          </h2>

          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="intereses">
              <i className="bi bi-stars text-primary me-2"></i>
              Intereses
            </label>

            <input
              className="form-control"
              id="intereses"
              name="intereses"
              type="text"
              placeholder="Programación, tecnología, salud, construcción"
              value={profileData.intereses}
              onChange={handleChange}
            />

            <small className="text-secondary">
              Separá cada interés con una coma.
            </small>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" htmlFor="habilidades">
              <i className="bi bi-tools text-primary me-2"></i>
              Habilidades
            </label>

            <input
              className="form-control"
              id="habilidades"
              name="habilidades"
              type="text"
              placeholder="Lógica, comunicación, matemática, diseño"
              value={profileData.habilidades}
              onChange={handleChange}
            />

            <small className="text-secondary">
              Separá cada habilidad con una coma.
            </small>
          </div>

          <button
            className="btn btn-primary rounded-pill fw-semibold cp-btn-animated"
            type="submit"
          >
            <i className="bi bi-save me-2"></i>
            Guardar datos
          </button>
        </form>

        {hasProfileData && (
          <section className="row g-4 mb-4 cp-fade-up">
            <div className="col-lg-6">
              <h2 className="h6 fw-bold mb-3">
                <i className="bi bi-stars text-primary me-2"></i>
                Intereses guardados
              </h2>

              <div className="d-flex flex-wrap gap-2">
                {user.intereses.map((interes) => (
                  <span
                    className="badge rounded-pill text-bg-primary cp-chip"
                    key={interes}
                  >
                    {interes}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <h2 className="h6 fw-bold mb-3">
                <i className="bi bi-tools text-primary me-2"></i>
                Habilidades guardadas
              </h2>

              <div className="d-flex flex-wrap gap-2">
                {user.habilidades.map((habilidad) => (
                  <span
                    className="badge rounded-pill text-bg-info cp-chip"
                    key={habilidad}
                  >
                    {habilidad}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="p-4 rounded-4 bg-dark text-white mb-4 cp-glow-card">
          <h2 className="h5 fw-bold mb-2">
            <i className="bi bi-clipboard-check me-2 text-info"></i>
            Test vocacional
          </h2>

          <p className="text-white-50 mb-3">
            Después de cargar tus datos, podés iniciar el test. Más adelante las
            respuestas se usarán para mostrar resultados en el perfil y generar
            la ruta de aprendizaje.
          </p>

          <Link
            className={`btn rounded-pill fw-semibold cp-btn-animated ${
              hasProfileData ? "btn-info" : "btn-outline-light disabled"
            }`}
            to="/test"
          >
            <i className="bi bi-play-circle me-2"></i>
            Iniciar test
          </Link>
        </section>

        {recommendations.length > 0 && (
          <section className="mb-4">
            <h2 className="h5 fw-bold mb-3">
              <i className="bi bi-mortarboard text-primary me-2"></i>
              Carreras recomendadas
            </h2>

            <div className="row g-3">
              {recommendations.map((career, index) => (
                <div className="col-md-6" key={career.id}>
                  <article
                    className="card h-100 border-0 bg-light rounded-4 cp-career-card"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="card-body p-4">
                      <span className="badge rounded-pill text-bg-primary mb-3">
                        <i className="bi bi-graph-up-arrow me-2"></i>
                        Puntaje {career.score}
                      </span>

                      <h3 className="h6 fw-bold">{career.titulo}</h3>

                      <p className="small text-secondary mb-2">
                        {career.descripcion}
                      </p>

                      <p className="small mb-1">
                        <i className="bi bi-clock me-2 text-primary"></i>
                        <strong>Duración:</strong>{" "}
                        {career.duracion ?? "No especificada"}
                      </p>

                      <p className="small mb-0">
                        <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                        <strong>Plan:</strong>{" "}
                        {career.planNombre ?? "No especificado"}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </section>
        )}

        {learningRoute && (
          <section className="p-4 rounded-4 border bg-white cp-route-preview">
            <h2 className="h5 fw-bold mb-3">
              <i className="bi bi-signpost-split text-primary me-2"></i>
              Base para Mi Ruta
            </h2>

            <p className="text-secondary mb-3">
              Se dejó preparada una ruta inicial para que la página Mi Ruta la
              pueda leer desde <code>localStorage</code>.
            </p>

            <p className="mb-0">
              <i className="bi bi-list-check me-2 text-primary"></i>
              <strong>Cantidad de etapas:</strong> {learningRoute.steps.length}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}

export default UserProfileSummary;