import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RouteStep from "../components/RouteStep";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { useSEO } from "../hooks/useSEO";
import { routeStorageKeys } from "../data/routeTopics";

const SELECTED_ROUTE_CAREER_KEY = "careerpath_selected_route_career";

function readStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Error al leer ${key}:`, error);
    return fallback;
  }
}

function hasTestAnswers(answers) {
  if (!answers) return false;
  if (Array.isArray(answers)) return answers.length > 0;
  if (typeof answers === "object") return Object.keys(answers).length > 0;
  return false;
}

function normalizeId(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCareerKey(career) {
  return String(
    career?.id ??
      career?.careerId ??
      career?.titulo ??
      career?.nombre ??
      "",
  );
}

function getCareerTitle(career) {
  return career?.titulo ?? career?.nombre ?? "Carrera recomendada";
}

function getCareerDescription(career) {
  return (
    career?.descripcion ??
    "Carrera recomendada según tus respuestas del test vocacional."
  );
}

function buildCareerStages(career) {
  if (!career) return [];

  if (!Array.isArray(career.planEstudios) || career.planEstudios.length === 0) {
    return [
      {
        id: `${getCareerKey(career)}-sin-plan`,
        numero: "01",
        titulo: "Plan de estudios no cargado",
        descripcion:
          "Todavía no hay materias cargadas para esta carrera. Podés consultar la fuente oficial desde Resultados.",
        temas: [
          {
            id: `${getCareerKey(career)}-consultar-plan`,
            nombre: "Consultar plan de estudios oficial",
          },
        ],
      },
    ];
  }

  return career.planEstudios.map((block, index) => {
    const title = block.nivel ?? `Año ${index + 1}`;
    const subjects = Array.isArray(block.materias) ? block.materias : [];

    return {
      id: `${getCareerKey(career)}-${normalizeId(title)}-${index}`,
      numero: String(index + 1).padStart(2, "0"),
      titulo: title,
      descripcion: `Materias correspondientes a ${title} de ${getCareerTitle(
        career,
      )}. Marcá las materias que ya aprobaste o promocionaste.`,
      temas: subjects.map((subject, subjectIndex) => ({
        id: `${getCareerKey(career)}-${normalizeId(title)}-${normalizeId(
          subject,
        )}-${subjectIndex}`,
        nombre: subject,
      })),
    };
  });
}

function getStageIds(stages) {
  return stages.flatMap((stage) => stage.temas.map((subject) => subject.id));
}

function getSavedProgress(scope, validIds) {
  if (!scope) return [];

  const savedProgress = readStorage(routeStorageKeys.routeProgress, {});
  const progress =
    savedProgress &&
    typeof savedProgress === "object" &&
    !Array.isArray(savedProgress)
      ? savedProgress
      : {};

  const savedSubjects = progress[scope];

  return Array.isArray(savedSubjects)
    ? savedSubjects.filter((id) => validIds.includes(id))
    : [];
}

function RouteState({ icon, title, description, path, buttonText }) {
  return (
    <section className="bg-body py-5">
      <div className="container">
        <div
          className="card border-0 shadow-sm rounded-4 mx-auto cp-fade-up"
          style={{ maxWidth: "720px" }}
        >
          <div className="card-body p-4 p-md-5 text-center">
            <i
              className={`bi ${icon} display-3 text-primary mb-4`}
              aria-hidden="true"
            ></i>

            <h1 className="h2 fw-bold mb-3">{title}</h1>

            <p className="text-secondary mb-4">{description}</p>

            <Link
              to={path}
              className="btn btn-primary rounded-pill px-4 cp-btn-animated"
            >
              <i className="bi bi-arrow-right-circle me-2"></i>
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ruta() {
  useSEO({
    title: "Mi Ruta de Aprendizaje | CareerPath AI",
    description:
      "Consultá tu ruta personalizada de aprendizaje según tu perfil vocacional, test y resultados en CareerPath AI.",
    canonicalPath: "/ruta",
  });

  const { activeUser, isAuthenticated, isLoadingAuth } = useLocalAuth();

  const [testAnswers] = useState(() =>
    readStorage(routeStorageKeys.testAnswers, null),
  );

  const [recommendedCareers] = useState(() => {
    const savedCareers = readStorage(
      routeStorageKeys.recommendedCareers,
      [],
    );

    return Array.isArray(savedCareers) ? savedCareers : [];
  });

  const [selectedCareerId, setSelectedCareerId] = useState(() =>
    localStorage.getItem(SELECTED_ROUTE_CAREER_KEY),
  );

  const selectedCareer =
    recommendedCareers.find(
      (career) => getCareerKey(career) === selectedCareerId,
    ) ?? null;

  const stages = buildCareerStages(selectedCareer);
  const validSubjectIds = getStageIds(stages);
  const totalSubjects = validSubjectIds.length;

  const progressScope =
    activeUser && selectedCareer
      ? `${activeUser.id}:${getCareerKey(selectedCareer)}`
      : null;

  const [completedSubjects, setCompletedSubjects] = useState(() =>
    getSavedProgress(progressScope, validSubjectIds),
  );

  useEffect(() => {
    if (!progressScope) return;

    const savedProgress = readStorage(routeStorageKeys.routeProgress, {});

    const currentProgress =
      savedProgress &&
      typeof savedProgress === "object" &&
      !Array.isArray(savedProgress)
        ? savedProgress
        : {};

    localStorage.setItem(
      routeStorageKeys.routeProgress,
      JSON.stringify({
        ...currentProgress,
        [progressScope]: completedSubjects,
      }),
    );
  }, [completedSubjects, progressScope]);

  const handleToggleSubject = (subjectId) => {
    if (!validSubjectIds.includes(subjectId)) return;

    setCompletedSubjects((currentSubjects) =>
      currentSubjects.includes(subjectId)
        ? currentSubjects.filter((id) => id !== subjectId)
        : [...currentSubjects, subjectId],
    );
  };

  const handleSelectCareer = (career) => {
    const careerKey = getCareerKey(career);
    const careerStages = buildCareerStages(career);
    const careerSubjectIds = getStageIds(careerStages);

    const newScope = activeUser
      ? `${activeUser.id}:${careerKey}`
      : null;

    setSelectedCareerId(careerKey);
    setCompletedSubjects(
      getSavedProgress(newScope, careerSubjectIds),
    );

    localStorage.setItem(
      SELECTED_ROUTE_CAREER_KEY,
      careerKey,
    );
  };

  const handleChangeCareer = () => {
    localStorage.removeItem(SELECTED_ROUTE_CAREER_KEY);
    setSelectedCareerId(null);
    setCompletedSubjects([]);
  };

  const completedCount = completedSubjects.filter((id) =>
    validSubjectIds.includes(id),
  ).length;

  const pendingCount = Math.max(
    totalSubjects - completedCount,
    0,
  );

  const progress =
    totalSubjects === 0
      ? 0
      : Math.round((completedCount / totalSubjects) * 100);

  const hasTest = hasTestAnswers(testAnswers);
  const hasResults = recommendedCareers.length > 0;

  if (isLoadingAuth) {
    return (
      <section className="bg-body py-5">
        <div className="container text-center py-5">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>

          <p className="text-secondary mb-0">
            Cargando tu ruta de aprendizaje...
          </p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated || !activeUser) {
    return (
      <RouteState
        icon="bi-person-lock"
        title="Primero iniciá sesión"
        description="Necesitás iniciar sesión o crear una cuenta antes de generar tu ruta de aprendizaje personalizada."
        path="/perfil"
        buttonText="Ir a Mi Perfil"
      />
    );
  }

  if (!hasTest) {
    return (
      <RouteState
        icon="bi-clipboard-x"
        title="Todavía no completaste el test"
        description="Completá el test vocacional para que CareerPath AI pueda analizar tus respuestas y preparar recomendaciones para tu perfil."
        path="/test"
        buttonText="Realizar Test Vocacional"
      />
    );
  }

  if (!hasResults) {
    return (
      <RouteState
        icon="bi-bar-chart"
        title="Todavía no tenés resultados"
        description="Tus respuestas ya están guardadas. Visitá Resultados para generar las carreras recomendadas antes de continuar con Mi Ruta."
        path="/resultados"
        buttonText="Ver Resultados"
      />
    );
  }

  if (!selectedCareer) {
    return (
      <section className="bg-body py-5">
        <div className="container">
          <header className="mb-5 cp-fade-up">
            <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
              <i className="bi bi-stars me-2"></i>
              Carreras recomendadas
            </span>

            <h1 className="display-5 fw-bold mb-3">
              Elegí qué carrera querés seguir
            </h1>

            <p
              className="lead text-secondary mb-0"
              style={{ maxWidth: "850px" }}
            >
              Estas carreras fueron recomendadas según tus respuestas del test.
              Elegí una para ver su plan de estudios y marcar las materias que
              ya aprobaste o promocionaste.
            </p>
          </header>

          <div className="row g-4">
            {recommendedCareers.map((career) => (
              <div
                className="col-12 col-md-6 col-xl-4"
                key={getCareerKey(career)}
              >
                <article className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body p-4 d-flex flex-column">
                    <span className="badge rounded-pill text-bg-primary align-self-start mb-3">
                      <i className="bi bi-mortarboard me-2"></i>
                      {career.subtipo ??
                        career.area ??
                        career.tipo ??
                        "Carrera recomendada"}
                    </span>

                    <h2 className="h5 fw-bold">
                      {getCareerTitle(career)}
                    </h2>

                    <p className="text-secondary small flex-grow-1">
                      {getCareerDescription(career)}
                    </p>

                    <div className="d-flex flex-wrap gap-3 text-secondary small mb-4">
                      <span>
                        <i className="bi bi-clock me-2 text-primary"></i>
                        {career.duracion ?? "Duración no especificada"}
                      </span>

                      <span>
                        <i className="bi bi-display me-2 text-primary"></i>
                        {career.modalidad ?? "Modalidad no especificada"}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary rounded-pill mt-auto"
                      onClick={() => handleSelectCareer(career)}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Elegir esta carrera
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-body py-5">
      <div className="container">
        <header className="mb-5 cp-fade-up">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
            <div>
              <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
                <i className="bi bi-journal-check me-2"></i>
                Plan de estudios
              </span>

              <h1 className="display-5 fw-bold mb-3">
                {getCareerTitle(selectedCareer)}
              </h1>

              <p
                className="lead text-secondary mb-0"
                style={{ maxWidth: "850px" }}
              >
                Marcá las materias que ya aprobaste o promocionaste. El avance
                se guarda para tu usuario y esta carrera.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary rounded-pill align-self-start"
              onClick={handleChangeCareer}
            >
              <i className="bi bi-arrow-left-circle me-2"></i>
              Cambiar carrera
            </button>
          </div>
        </header>

        <section className="card border-0 shadow-sm rounded-4 mb-5 cp-fade-up">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-7">
                <p className="text-primary fw-semibold mb-2">
                  <i className="bi bi-mortarboard me-2"></i>
                  Carrera elegida
                </p>

                <h2 className="h3 fw-bold mb-3">
                  {getCareerTitle(selectedCareer)}
                </h2>

                <p className="text-secondary mb-4">
                  {getCareerDescription(selectedCareer)}
                </p>

                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-pill text-bg-secondary px-3 py-2">
                    <i className="bi bi-award me-2"></i>
                    {selectedCareer.subtipo ??
                      selectedCareer.tipo ??
                      selectedCareer.area ??
                      "Carrera UTN"}
                  </span>

                  {selectedCareer.duracion && (
                    <span className="badge rounded-pill text-bg-secondary px-3 py-2">
                      <i className="bi bi-clock me-2"></i>
                      {selectedCareer.duracion}
                    </span>
                  )}

                  <span className="badge rounded-pill text-bg-secondary px-3 py-2">
                    <i className="bi bi-list-check me-2"></i>
                    {totalSubjects} materias
                  </span>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className="p-4 bg-body-tertiary rounded-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold">Progreso general</span>
                    <strong className="text-primary">{progress}%</strong>
                  </div>

                  <div className="progress mb-3" style={{ height: "12px" }}>
                    <div
                      className={`progress-bar ${
                        progress === 100 ? "bg-success" : "bg-primary"
                      }`}
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <p className="small text-secondary mb-4">
                    {completedCount} de {totalSubjects} materias marcadas
                  </p>

                  <div className="row g-3 text-center">
                    <div className="col-4">
                      <div className="bg-body rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-success">
                          {completedCount}
                        </strong>
                        <small className="text-secondary">Marcadas</small>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="bg-body rounded-3 p-3 h-100">
                        <strong className="d-block fs-4">
                          {pendingCount}
                        </strong>
                        <small className="text-secondary">Pendientes</small>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="bg-body rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-primary">
                          {progress}%
                        </strong>
                        <small className="text-secondary">Avance</small>
                      </div>
                    </div>
                  </div>

                  {progress === 100 && (
                    <div className="alert alert-success mt-4 mb-0">
                      <i className="bi bi-trophy-fill me-2"></i>
                      ¡Completaste todas las materias cargadas!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card border border-primary-subtle bg-primary-subtle rounded-4 shadow-sm mb-5">
          <div className="card-body p-4 p-md-5">
            <div className="mb-4">
              <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
                <i className="bi bi-journal-text me-2"></i>
                Materias por año / cuatrimestre
              </span>

              <h2 className="h3 fw-bold mb-2 text-body">
                Plan de estudios
              </h2>

              <p className="text-secondary mb-0">
                Abrí cada bloque y marcá las materias que ya aprobaste o
                promocionaste.
              </p>
            </div>

            <div className="d-grid gap-3">
              {stages.map((stage) => (
                <RouteStep
                  key={stage.id}
                  etapa={stage}
                  temasCompletados={completedSubjects}
                  onToggleTema={handleToggleSubject}
                  abiertoInicial={false}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-8">
                <p className="text-primary fw-semibold mb-2">
                  <i className="bi bi-lightbulb me-2"></i>
                  Seguimiento
                </p>

                <h2 className="h4 fw-bold mb-2">
                  Tu avance queda guardado
                </h2>

                <p className="text-secondary mb-0">
                  Las materias que marques quedan guardadas para tu usuario y
                  para esta carrera, por lo que podés continuar más adelante
                  desde donde lo dejaste.
                </p>
              </div>

              <div className="col-12 col-lg-4 text-lg-end">
                <Link
                  to="/resultados"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4"
                >
                  <i className="bi bi-arrow-left-circle me-2"></i>
                  Ver mis resultados
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Ruta;