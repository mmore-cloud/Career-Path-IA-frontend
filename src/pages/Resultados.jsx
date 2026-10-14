import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { careers } from "../data/careers";
import { questions } from "../data/testQuestions";
import CareerCard from "../components/CareerCard";
import { useSEO } from "../hooks/useSEO";
import { useLocalAuth } from "../hooks/useLocalAuth";
import {
  getCareerRecommendations,
  getDominantArea,
} from "../utils/careerMatcher";
import { buildLearningRouteFromCareer } from "../utils/learningRouteBuilder";

const TEST_ANSWERS_KEY = "careerpath_test_answers";
const RECOMMENDED_CAREERS_KEY = "careerpath_recommended_careers";
const LEARNING_ROUTE_KEY = "careerpath_learning_route";
const FAVORITES_KEY = "careerpath-favoritos-utn";

const normalizeText = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getCareerTitle = (career) =>
  career?.nombre ?? career?.titulo ?? "Carrera UTN";

const getCareerDescription = (career) =>
  career?.descripcion ?? "Información de la carrera no disponible.";

const getCareerArea = (career) =>
  career?.area ?? career?.subtipo ?? career?.tipo ?? "Carrera UTN";

const adaptCareerForCard = (career) => ({
  ...career,
  nombre: getCareerTitle(career),
  titulo: career?.titulo ?? career?.nombre ?? "Carrera UTN",
  descripcion: getCareerDescription(career),
  area: getCareerArea(career),
  duracion: career?.duracion ?? "No especificada",
  modalidad: career?.modalidad ?? "No especificada",
});

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

export default function Resultados() {
  useSEO({
    title: "Resultados y Carreras UTN | CareerPath AI",
    description:
      "Explorá las carreras de la UTN recomendadas según tu test vocacional y guardá tus favoritas.",
    canonicalPath: "/resultados",
  });

  const { activeUser, isAuthenticated, isLoadingAuth } = useLocalAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const [hasTestAnswers, setHasTestAnswers] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState(readFavorites);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [openPlanIndex, setOpenPlanIndex] = useState(null);
  const [showCareerSites, setShowCareerSites] = useState(false);

  useEffect(() => {
    if (isLoadingAuth || !activeUser) {
      return;
    }

    const storedAnswers = localStorage.getItem(TEST_ANSWERS_KEY);

    if (!storedAnswers) {
      setHasTestAnswers(false);
      setRecommendedCareers([]);
      return;
    }

    let rawAnswers = {};

    try {
      rawAnswers = JSON.parse(storedAnswers);
    } catch (error) {
      console.error("Error al leer las respuestas del test:", error);
      setHasTestAnswers(false);
      setRecommendedCareers([]);
      return;
    }

    const answerList = Object.entries(rawAnswers)
      .map(
        ([questionIndex, optionIndex]) =>
          questions[Number(questionIndex)]?.options?.[optionIndex],
      )
      .filter(Boolean);

    if (answerList.length === 0) {
      setHasTestAnswers(false);
      setRecommendedCareers([]);
      return;
    }

    setHasTestAnswers(true);

    const recommendations = getCareerRecommendations({
      careers,
      user: activeUser,
      answers: answerList,
      limit: 6,
    });

    const finalRecommendationsRaw =
      recommendations.length > 0 ? recommendations : careers.slice(0, 4);

    const finalRecommendations =
      finalRecommendationsRaw.map(adaptCareerForCard);

    setRecommendedCareers(finalRecommendations);

    localStorage.setItem(
      RECOMMENDED_CAREERS_KEY,
      JSON.stringify(finalRecommendations),
    );

    const dominantArea = getDominantArea(answerList);
    const learningRoute = buildLearningRouteFromCareer(
      finalRecommendations[0],
      dominantArea,
    );

    if (learningRoute) {
      localStorage.setItem(LEARNING_ROUTE_KEY, JSON.stringify(learningRoute));
    }
  }, [activeUser, isLoadingAuth]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = setTimeout(() => {
      setToastMessage("");
    }, 2400);

    return () => clearTimeout(timeout);
  }, [toastMessage]);

  useEffect(() => {
    if (selectedCareer) {
      setOpenPlanIndex(null);
      setShowCareerSites(false);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedCareer]);

  const filteredCareers = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);
    const normalizedSelectedArea = normalizeText(selectedArea);

    return recommendedCareers
      .filter((career) => {
        const careerText = normalizeText(
          [
            career?.id,
            getCareerTitle(career),
            getCareerDescription(career),
            getCareerArea(career),
            career?.subtipo,
            career?.tipo,
            career?.duracion,
            career?.modalidad,
            career?.planNombre,
            career?.facultades?.join(" "),
          ].join(" "),
        );

        const matchesSearch =
          normalizedSearch === "" || careerText.includes(normalizedSearch);

        const matchesArea =
          normalizedSelectedArea === "" ||
          normalizeText(getCareerArea(career)) === normalizedSelectedArea ||
          normalizeText(career?.subtipo) === normalizedSelectedArea ||
          normalizeText(career?.tipo) === normalizedSelectedArea;

        return matchesSearch && matchesArea;
      })
      .map(adaptCareerForCard);
  }, [recommendedCareers, searchTerm, selectedArea]);

  const areaOptions = useMemo(() => {
    const areas = recommendedCareers
      .map((career) => getCareerArea(career))
      .filter(Boolean);

    return [...new Set(areas)];
  }, [recommendedCareers]);

  const handleToggleFavorite = (career) => {
    const careerId = career.id;
    const careerTitle = getCareerTitle(career);

    let updatedFavorites = [...favorites];

    if (updatedFavorites.includes(careerId)) {
      updatedFavorites = updatedFavorites.filter((favId) => favId !== careerId);
      setToastMessage(`“${careerTitle}” se quitó de tus favoritos.`);
    } else {
      updatedFavorites.push(careerId);
      setToastMessage(`“${careerTitle}” se guardó en tus favoritos.`);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  const handleRetakeTest = () => {
    localStorage.removeItem(TEST_ANSWERS_KEY);
    localStorage.removeItem(RECOMMENDED_CAREERS_KEY);
    localStorage.removeItem(LEARNING_ROUTE_KEY);
  };

  const closeModal = () => {
    setSelectedCareer(null);
  };

  if (isLoadingAuth) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="container py-5 text-center cp-fade-up">
        <i className="bi bi-person-lock display-4 text-primary mb-3"></i>

        <h1 className="fw-bold">Primero iniciá sesión</h1>

        <p className="text-secondary">
          Necesitás iniciar sesión o crear una cuenta para generar tus
          resultados.
        </p>

        <Link to="/perfil" className="btn btn-primary rounded-pill mt-3">
          <i className="bi bi-arrow-right-circle me-2"></i>
          Ir a Mi Perfil
        </Link>
      </main>
    );
  }

  if (!hasTestAnswers) {
    return (
      <main className="container py-5 text-center cp-fade-up">
        <i className="bi bi-clipboard-x display-4 text-primary mb-3"></i>

        <h1 className="fw-bold">Todavía no hiciste el test</h1>

        <p className="text-secondary">
          Completá el test vocacional para ver tus carreras recomendadas.
        </p>

        <Link to="/test" className="btn btn-primary rounded-pill mt-3">
          <i className="bi bi-clipboard-check me-2"></i>
          Ir al Test Vocacional
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5 cp-results-page">
      <header className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 cp-fade-up">
        <div>
          <span className="badge rounded-pill text-bg-primary mb-3 cp-soft-badge">
            <i className="bi bi-stars me-2"></i>
            Resultados personalizados
          </span>

          <h1 className="fw-bold mb-1">Resultados de tu Test Vocacional</h1>

          <p className="text-secondary mb-0">
            Hola {activeUser?.nombre ?? "usuario"}, estas son las carreras
            recomendadas según tus respuestas.
          </p>
        </div>

        <Link
          to="/test"
          className="btn btn-outline-primary rounded-pill"
          onClick={handleRetakeTest}
        >
          <i className="bi bi-arrow-repeat me-2"></i>
          Rehacer test
        </Link>
      </header>

      <section
        className="row g-3 mb-4 cp-fade-up"
        aria-label="Filtros de búsqueda"
      >
        <div className="col-md-7">
          <label htmlFor="buscar-carrera" className="form-label fw-semibold">
            <i className="bi bi-search text-primary me-2"></i>
            Buscar carrera
          </label>

          <input
            id="buscar-carrera"
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, área, descripción o facultad..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="filtro-area" className="form-label fw-semibold">
            <i className="bi bi-funnel text-primary me-2"></i>
            Filtrar por área
          </label>

          <select
            id="filtro-area"
            className="form-select"
            value={selectedArea}
            onChange={(event) => setSelectedArea(event.target.value)}
          >
            <option value="">Todas las áreas</option>

            {areaOptions.map((area) => (
              <option value={area} key={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label fw-semibold">
            <i className="bi bi-layout-three-columns text-primary me-2"></i>
            Vista
          </label>

          <div
            className="btn-group w-100"
            role="group"
            aria-label="Cambiar vista"
          >
            <button
              className={`btn btn-outline-primary ${
                viewMode === "grid" ? "active" : ""
              }`}
              type="button"
              onClick={() => setViewMode("grid")}
            >
              <i className="bi bi-grid-3x3-gap"></i>
            </button>

            <button
              className={`btn btn-outline-primary ${
                viewMode === "list" ? "active" : ""
              }`}
              type="button"
              onClick={() => setViewMode("list")}
            >
              <i className="bi bi-list-ul"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="mb-3 cp-fade-up">
        <p className="text-secondary mb-0">
          <i className="bi bi-list-check me-2 text-primary"></i>
          Carreras recomendadas encontradas:{" "}
          <strong>{filteredCareers.length}</strong>
        </p>
      </section>

      <section
        className={
          viewMode === "grid"
            ? "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
            : "row row-cols-1 g-3"
        }
        aria-label="Listado de carreras recomendadas"
      >
        {filteredCareers.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info rounded-4 cp-fade-up" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              No se encontraron carreras que coincidan con la búsqueda.
            </div>
          </div>
        ) : (
          filteredCareers.map((career, index) => (
            <div
              className="col cp-fade-up"
              key={career.id ?? `${career.nombre}-${index}`}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <CareerCard
                career={career}
                isFavorite={favorites.includes(career.id)}
                viewMode={viewMode}
                onToggleFavorite={() => handleToggleFavorite(career)}
                onViewDetails={() => setSelectedCareer(career)}
              />
            </div>
          ))
        )}
      </section>

      {toastMessage && (
        <div className="res-toast-careerpath visible" role="status">
          <i className="bi bi-info-circle me-2"></i>
          {toastMessage}
        </div>
      )}

      {selectedCareer && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 bg-dark bg-opacity-75"
          style={{
            zIndex: 2000,
            backdropFilter: "blur(8px)",
          }}
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <article
            className="card border-0 shadow-lg rounded-4 w-100"
            style={{ maxWidth: "680px" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                <div>
                  <span className="badge rounded-pill text-bg-primary mb-2">
                    <i className="bi bi-mortarboard me-2"></i>
                    {getCareerArea(selectedCareer)}
                  </span>

                  <h2 className="h4 fw-bold mb-0">
                    {getCareerTitle(selectedCareer)}
                  </h2>
                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle flex-shrink-0"
                  aria-label="Cerrar"
                  onClick={closeModal}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <p className="text-secondary small mb-3">
                {getCareerDescription(selectedCareer)}
              </p>

              <div className="row g-2 mb-3">
                <div className="col-4">
                  <div className="bg-body-tertiary border rounded-3 p-2 h-100">
                    <i className="bi bi-clock text-primary d-block mb-1"></i>

                    <small className="text-secondary d-block">Duración</small>

                    <strong className="small">
                      {selectedCareer.duracion ?? "No especificada"}
                    </strong>
                  </div>
                </div>

                <div className="col-4">
                  <div className="bg-body-tertiary border rounded-3 p-2 h-100">
                    <i className="bi bi-display text-primary d-block mb-1"></i>

                    <small className="text-secondary d-block">Modalidad</small>

                    <strong className="small">
                      {selectedCareer.modalidad ?? "No especificada"}
                    </strong>
                  </div>
                </div>

                <div className="col-4">
                  <div className="bg-body-tertiary border rounded-3 p-2 h-100">
                    <i className="bi bi-award text-primary d-block mb-1"></i>

                    <small className="text-secondary d-block">Tipo</small>

                    <strong className="small">
                      {selectedCareer.subtipo ?? selectedCareer.tipo ?? "UTN"}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-pill"
                  onClick={() =>
                    setShowCareerSites((currentValue) => !currentValue)
                  }
                >
                  <i className="bi bi-building me-2"></i>
                  {showCareerSites ? "Ocultar facultades" : "Ver facultades"}
                </button>

                <small className="text-secondary">
                  {selectedCareer.facultades?.length ?? 0} sede/s cargada/s
                </small>
              </div>

              {showCareerSites && (
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {selectedCareer.facultades?.length > 0 ? (
                    selectedCareer.facultades.map((sede) => (
                      <span
                        className="badge rounded-pill text-bg-secondary"
                        key={sede}
                      >
                        {sede}
                      </span>
                    ))
                  ) : (
                    <span className="text-secondary small">
                      Consultar disponibilidad en la UTN.
                    </span>
                  )}
                </div>
              )}

              <div className="border rounded-3 overflow-hidden mb-3">
                <div className="bg-body-tertiary px-3 py-2 border-bottom">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <h3 className="h6 fw-bold mb-0">
                      <i className="bi bi-journal-text me-2 text-primary"></i>
                      {selectedCareer.planNombre ?? "Plan de estudios"}
                    </h3>

                    <small className="text-secondary d-none d-sm-inline">
                      Tocá un año para ver materias
                    </small>
                  </div>
                </div>

                {selectedCareer.planEstudios?.length > 0 ? (
                  <div
                    className="accordion accordion-flush"
                    id="accordionPlanCarrera"
                  >
                    {selectedCareer.planEstudios.map((bloque, index) => {
                      const collapseId = `planCarrera${index}`;
                      const isOpen = openPlanIndex === index;

                      return (
                        <div className="accordion-item" key={collapseId}>
                          <h4 className="accordion-header">
                            <button
                              className={`accordion-button py-2 ${
                                isOpen ? "" : "collapsed"
                              }`}
                              type="button"
                              onClick={() =>
                                setOpenPlanIndex(isOpen ? null : index)
                              }
                              aria-expanded={isOpen}
                              aria-controls={collapseId}
                            >
                              <span className="fw-semibold small">
                                {bloque.nivel ?? `Año ${index + 1}`}
                              </span>
                            </button>
                          </h4>

                          <div
                            id={collapseId}
                            className={`accordion-collapse collapse ${
                              isOpen ? "show" : ""
                            }`}
                          >
                            <div className="accordion-body py-2">
                              <ul className="mb-0 small ps-3">
                                {(bloque.materias ?? []).map((materia) => (
                                  <li className="mb-1" key={materia}>
                                    {materia}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="alert alert-info rounded-0 mb-0 py-2 small">
                    <i className="bi bi-info-circle me-2"></i>
                    El detalle del plan todavía no está cargado. Podés consultar
                    la fuente oficial de la UTN.
                  </div>
                )}
              </div>

              <div className="d-flex flex-wrap justify-content-end gap-2">
                {selectedCareer.fuenteOficial && (
                  <a
                    href={selectedCareer.fuenteOficial}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary btn-sm rounded-pill"
                  >
                    <i className="bi bi-box-arrow-up-right me-2"></i>
                    Fuente oficial
                  </a>
                )}

                {selectedCareer.planUrl && (
                  <a
                    href={selectedCareer.planUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm rounded-pill"
                  >
                    <i className="bi bi-journal-bookmark me-2"></i>
                    Ver plan
                  </a>
                )}

                <button
                  type="button"
                  className="btn btn-secondary btn-sm rounded-pill"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}