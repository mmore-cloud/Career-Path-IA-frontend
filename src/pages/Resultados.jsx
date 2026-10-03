import React, { useMemo, useState } from "react";
import CareerCard from "../components/CareerCard";
import { careers } from "../data/careers";
import { useSEO } from "../hooks/useSEO";

const normalizeText = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getCareerTitle = (career) => career.titulo ?? career.nombre ?? "Carrera UTN";

const getCareerArea = (career) => career.area ?? career.subtipo ?? "";

const adaptCareerForCard = (career) => ({
  ...career,
  nombre: career.nombre ?? career.titulo,
  titulo: career.titulo ?? career.nombre,
  area: career.area ?? career.subtipo ?? "Carrera UTN",
  descripcion: career.descripcion ?? "Información de la carrera UTN.",
  duracion: career.duracion ?? "No especificada",
  modalidad: career.modalidad ?? "No especificada",
});

export default function Resultados({ onRetakeTest }) {
  useSEO({
    title: "Resultados y Carreras UTN | CareerPath AI",
    description:
      "Explorá las carreras de la UTN, filtrá por área de interés y guardá tus favoritas.",
    canonicalPath: "/resultados",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const areaOptions = useMemo(() => {
    const areas = careers
      .map((career) => getCareerArea(career))
      .filter(Boolean);

    return [...new Set(areas)];
  }, []);

  const filteredCareers = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);
    const normalizedSelectedArea = normalizeText(selectedArea);

    return careers
      .filter((career) => {
        const title = getCareerTitle(career);
        const area = getCareerArea(career);

        const careerText = normalizeText(
          [
            career.id,
            title,
            area,
            career.subtipo,
            career.descripcion,
            career.duracion,
            career.modalidad,
            career.facultades?.join(" "),
            career.planNombre,
          ].join(" ")
        );

        const matchesSearch =
          normalizedSearch === "" || careerText.includes(normalizedSearch);

        const matchesArea =
          normalizedSelectedArea === "" ||
          normalizeText(area) === normalizedSelectedArea ||
          normalizeText(career.subtipo) === normalizedSelectedArea;

        return matchesSearch && matchesArea;
      })
      .map(adaptCareerForCard);
  }, [searchTerm, selectedArea]);

  const handleToggleFavorite = (id) => {
    let favorites = JSON.parse(localStorage.getItem("utn_favorites")) || [];

    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
      alert("Carrera eliminada de favoritos.");
    } else {
      favorites.push(id);
      alert("Carrera guardada en favoritos.");
    }

    localStorage.setItem("utn_favorites", JSON.stringify(favorites));
  };

  return (
    <main className="container py-5 cp-results-page">
      <header className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 cp-fade-up">
        <div>
          <span className="badge rounded-pill text-bg-primary mb-3 cp-soft-badge">
            <i className="bi bi-mortarboard me-2"></i>
            Carreras UTN
          </span>

          <h1 className="fw-bold mb-1">Resultados de tu Test Vocacional</h1>

          <p className="text-muted mb-0">
            Explorá las carreras disponibles, sus áreas y sus planes de estudio.
          </p>
        </div>

        {onRetakeTest && (
          <button
            onClick={onRetakeTest}
            className="btn btn-primary rounded-pill cp-btn-animated"
            type="button"
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Repetir test
          </button>
        )}
      </header>

      <section
        className="card border-0 shadow-sm rounded-4 mb-4 cp-fade-up"
        aria-label="Filtros de búsqueda"
      >
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-8">
              <label htmlFor="buscar-carrera" className="form-label fw-semibold">
                <i className="bi bi-search text-primary me-2"></i>
                Buscar carrera
              </label>

              <input
                id="buscar-carrera"
                type="text"
                className="form-control"
                placeholder="Buscar por nombre, descripción, facultad o plan..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="col-md-4">
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
          </div>
        </div>
      </section>

      <section className="mb-3 cp-fade-up">
        <p className="text-muted mb-0">
          <i className="bi bi-list-check me-2 text-primary"></i>
          Carreras encontradas: <strong>{filteredCareers.length}</strong>
        </p>
      </section>

      <section
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
        aria-label="Listado de carreras"
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
              key={career.id}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <CareerCard
                career={career}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
}