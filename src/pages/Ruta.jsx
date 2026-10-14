import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import RouteStep from "../components/RouteStep";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { useSEO } from "../hooks/useSEO";

import { routeStorageKeys } from "../data/routeTopics";

const SELECTED_ROUTE_CAREER_KEY = "careerpath_selected_route_career";

function leerJSONStorage(key, fallback = null) {
  try {
    const guardado = localStorage.getItem(key);

    if (!guardado) {
      return fallback;
    }

    return JSON.parse(guardado);
  } catch (error) {
    console.error(`Error al leer ${key}:`, error);
    return fallback;
  }
}

function tieneRespuestasTest(respuestas) {
  if (!respuestas) {
    return false;
  }

  if (Array.isArray(respuestas)) {
    return respuestas.length > 0;
  }

  if (typeof respuestas === "object") {
    return Object.keys(respuestas).length > 0;
  }

  return false;
}

function normalizarId(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCareerKey(career) {
  return String(
    career?.id ?? career?.careerId ?? career?.titulo ?? career?.nombre ?? "",
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

function crearEtapasDesdeCarrera(career) {
  if (!career) {
    return [];
  }

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

  return career.planEstudios.map((bloque, index) => {
    const tituloBloque = bloque.nivel ?? `Año ${index + 1}`;

    const materias = Array.isArray(bloque.materias) ? bloque.materias : [];

    return {
      id: `${getCareerKey(career)}-${normalizarId(tituloBloque)}-${index}`,
      numero: String(index + 1).padStart(2, "0"),
      titulo: tituloBloque,
      descripcion: `Materias correspondientes a ${tituloBloque} de ${getCareerTitle(
        career,
      )}. Marcá las materias que ya aprobaste o promocionaste.`,
      temas: materias.map((materia, materiaIndex) => ({
        id: `${getCareerKey(career)}-${normalizarId(
          tituloBloque,
        )}-${normalizarId(materia)}-${materiaIndex}`,
        nombre: materia,
      })),
    };
  });
}

function obtenerIdsTemas(etapas) {
  return etapas.flatMap((etapa) => etapa.temas.map((tema) => tema.id));
}

function obtenerCantidadTemas(etapas) {
  return etapas.reduce((total, etapa) => total + etapa.temas.length, 0);
}

function EstadoRuta({ icono, titulo, descripcion, destino, textoBoton }) {
  return (
    <section className="bg-body py-5">
      <div className="container">
        <div
          className="card border-0 shadow-sm rounded-4 mx-auto cp-fade-up"
          style={{ maxWidth: "720px" }}
        >
          <div className="card-body p-4 p-md-5 text-center">
            <div className="mb-4">
              <i
                className={`bi ${icono} display-3 text-primary`}
                aria-hidden="true"
              ></i>
            </div>

            <h1 className="h2 fw-bold mb-3">{titulo}</h1>

            <p className="text-secondary mb-4">{descripcion}</p>

            <Link
              to={destino}
              className="btn btn-primary rounded-pill px-4 cp-btn-animated"
            >
              <i className="bi bi-arrow-right-circle me-2"></i>
              {textoBoton}
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

  const [testAnswers, setTestAnswers] = useState(null);
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [temasCompletados, setTemasCompletados] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }

    const respuestasGuardadas = leerJSONStorage(
      routeStorageKeys.testAnswers,
      null,
    );

    const recomendacionesGuardadas = leerJSONStorage(
      routeStorageKeys.recommendedCareers,
      [],
    );

    setTestAnswers(respuestasGuardadas);

    setRecommendedCareers(
      Array.isArray(recomendacionesGuardadas) ? recomendacionesGuardadas : [],
    );

    setSelectedCareerId(localStorage.getItem(SELECTED_ROUTE_CAREER_KEY));

    setStorageLoaded(true);
  }, [isLoadingAuth, activeUser?.id]);

  const selectedCareer = useMemo(() => {
    if (!selectedCareerId) {
      return null;
    }

    return (
      recommendedCareers.find(
        (career) => getCareerKey(career) === selectedCareerId,
      ) ?? null
    );
  }, [recommendedCareers, selectedCareerId]);

  const etapas = useMemo(
    () => crearEtapasDesdeCarrera(selectedCareer),
    [selectedCareer],
  );

  const idsValidos = useMemo(() => obtenerIdsTemas(etapas), [etapas]);

  const totalTemas = useMemo(() => obtenerCantidadTemas(etapas), [etapas]);

  const progressScope = useMemo(() => {
    if (!activeUser || !selectedCareer) {
      return null;
    }

    return `${activeUser.id}:${getCareerKey(selectedCareer)}`;
  }, [activeUser, selectedCareer]);

  useEffect(() => {
    if (!progressScope) {
      setTemasCompletados([]);
      setProgressLoaded(false);
      return;
    }

    const progresoGuardado = leerJSONStorage(
      routeStorageKeys.routeProgress,
      {},
    );

    const progresoValido =
      progresoGuardado &&
      typeof progresoGuardado === "object" &&
      !Array.isArray(progresoGuardado)
        ? progresoGuardado
        : {};

    const temasGuardados = progresoValido[progressScope];

    const temas = Array.isArray(temasGuardados)
      ? temasGuardados.filter((id) => idsValidos.includes(id))
      : [];

    setTemasCompletados(temas);
    setProgressLoaded(true);
  }, [progressScope, idsValidos]);

  useEffect(() => {
    if (!progressScope || !progressLoaded) {
      return;
    }

    const progresoActual = leerJSONStorage(routeStorageKeys.routeProgress, {});

    const progresoValido =
      progresoActual &&
      typeof progresoActual === "object" &&
      !Array.isArray(progresoActual)
        ? progresoActual
        : {};

    const nuevoProgreso = {
      ...progresoValido,
      [progressScope]: temasCompletados,
    };

    localStorage.setItem(
      routeStorageKeys.routeProgress,
      JSON.stringify(nuevoProgreso),
    );
  }, [temasCompletados, progressScope, progressLoaded]);

  const toggleTema = (temaId) => {
    if (!idsValidos.includes(temaId)) {
      return;
    }

    setTemasCompletados((anteriores) => {
      if (anteriores.includes(temaId)) {
        return anteriores.filter((id) => id !== temaId);
      }

      return [...anteriores, temaId];
    });
  };

  const handleSelectCareer = (career) => {
    const careerKey = getCareerKey(career);

    setSelectedCareerId(careerKey);
    setTemasCompletados([]);
    setProgressLoaded(false);

    localStorage.setItem(SELECTED_ROUTE_CAREER_KEY, careerKey);
  };

  const handleChangeCareer = () => {
    localStorage.removeItem(SELECTED_ROUTE_CAREER_KEY);
    setSelectedCareerId(null);
    setTemasCompletados([]);
    setProgressLoaded(false);
  };

  const cantidadCompletados = temasCompletados.filter((id) =>
    idsValidos.includes(id),
  ).length;

  const cantidadPendientes = Math.max(totalTemas - cantidadCompletados, 0);

  const porcentaje =
    totalTemas === 0 ? 0 : Math.round((cantidadCompletados / totalTemas) * 100);

  const hayTest = tieneRespuestasTest(testAnswers);

  const hayResultados =
    Array.isArray(recommendedCareers) && recommendedCareers.length > 0;

  if (isLoadingAuth || !storageLoaded) {
    return (
      <section className="bg-body py-5">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
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
      <EstadoRuta
        icono="bi-person-lock"
        titulo="Primero iniciá sesión"
        descripcion="Necesitás iniciar sesión o crear una cuenta antes de generar tu ruta de aprendizaje personalizada."
        destino="/perfil"
        textoBoton="Ir a Mi Perfil"
      />
    );
  }

  if (!hayTest) {
    return (
      <EstadoRuta
        icono="bi-clipboard-x"
        titulo="Todavía no completaste el test"
        descripcion="Completá el test vocacional para que CareerPath AI pueda analizar tus respuestas y preparar recomendaciones para tu perfil."
        destino="/test"
        textoBoton="Realizar Test Vocacional"
      />
    );
  }

  if (!hayResultados) {
    return (
      <EstadoRuta
        icono="bi-bar-chart"
        titulo="Todavía no tenés resultados"
        descripcion="Tus respuestas ya están guardadas. Visitá Resultados para generar las carreras recomendadas antes de continuar con Mi Ruta."
        destino="/resultados"
        textoBoton="Ver Resultados"
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
                      {career.area ?? career.tipo ?? "Carrera recomendada"}
                    </span>

                    <h2 className="h5 fw-bold">{getCareerTitle(career)}</h2>

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

            <div className="align-self-start">
              <button
                type="button"
                className="btn btn-outline-primary rounded-pill"
                onClick={handleChangeCareer}
              >
                <i className="bi bi-arrow-left-circle me-2"></i>
                Cambiar carrera
              </button>
            </div>
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
                  {selectedCareer.tipo && (
                    <span className="badge rounded-pill text-bg-secondary px-3 py-2">
                      <i className="bi bi-award me-2"></i>
                      {selectedCareer.tipo}
                    </span>
                  )}

                  {selectedCareer.duracion && (
                    <span className="badge rounded-pill text-bg-secondary px-3 py-2">
                      <i className="bi bi-clock me-2"></i>
                      {selectedCareer.duracion}
                    </span>
                  )}

                  <span className="badge rounded-pill text-bg-secondary px-3 py-2">
                    <i className="bi bi-list-check me-2"></i>
                    {totalTemas} materias
                  </span>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className="p-4 bg-body-tertiary rounded-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">Progreso general</span>

                    <strong className="text-primary">{porcentaje}%</strong>
                  </div>

                  <div className="progress mb-3" style={{ height: "12px" }}>
                    <div
                      className={`progress-bar ${
                        porcentaje === 100 ? "bg-success" : "bg-primary"
                      }`}
                      role="progressbar"
                      style={{ width: `${porcentaje}%` }}
                      aria-label="Progreso general de la ruta"
                      aria-valuenow={porcentaje}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <p className="small text-secondary mb-4">
                    {cantidadCompletados} de {totalTemas} materias marcadas
                  </p>

                  <div className="row g-3 text-center">
                    <div className="col-4">
                      <div className="bg-body rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-success">
                          {cantidadCompletados}
                        </strong>

                        <small className="text-secondary">Marcadas</small>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="bg-body rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-body">
                          {cantidadPendientes}
                        </strong>

                        <small className="text-secondary">Pendientes</small>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="bg-body rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-primary">
                          {porcentaje}%
                        </strong>

                        <small className="text-secondary">Avance</small>
                      </div>
                    </div>
                  </div>

                  {porcentaje === 100 && (
                    <div className="alert alert-success mt-4 mb-0" role="alert">
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
            <div className="mb-4 cp-fade-up">
              <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
                <i className="bi bi-journal-text me-2"></i>
                Materias por año / cuatrimestre
              </span>

              <h2 className="h3 fw-bold mb-2 text-body">Plan de estudios</h2>

              <p className="text-secondary mb-0">
                Abrí cada bloque y marcá las materias que ya aprobaste o
                promocionaste.
              </p>
            </div>

            <div className="d-grid gap-3">
              {etapas.map((etapa) => (
                <RouteStep
                  key={etapa.id}
                  etapa={etapa}
                  temasCompletados={temasCompletados}
                  onToggleTema={toggleTema}
                  abiertoInicial={false}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="card border-0 shadow-sm rounded-4 cp-fade-up">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-8">
                <p className="text-primary fw-semibold mb-2">
                  <i className="bi bi-lightbulb me-2"></i>
                  Seguimiento
                </p>

                <h2 className="h4 fw-bold mb-2">Tu avance queda guardado</h2>

                <p className="text-secondary mb-0">
                  Las materias que marques quedan guardadas para tu usuario y
                  para esta carrera, por lo que podés continuar más adelante
                  desde donde lo dejaste.
                </p>
              </div>

              <div className="col-12 col-lg-4 text-lg-end">
                <Link
                  to="/resultados"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4 cp-btn-animated"
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