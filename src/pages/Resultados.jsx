import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { carrerasUTN } from "../data/careers";
import { questions } from "../data/testQuestions";
import CareerCard from "../components/CareerCard";
import { useSEO } from "../hooks/useSEO";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { getCareerRecommendations, getDominantArea } from "../utils/careerMatcher";
import { buildLearningRouteFromCareer } from "../utils/learningRouteBuilder";

const TEST_ANSWERS_KEY = "careerpath_test_answers";
const RECOMMENDED_CAREERS_KEY = "careerpath_recommended_careers";
const LEARNING_ROUTE_KEY = "careerpath_learning_route";
const FAVORITES_KEY = "utn_favorites";

export default function Resultados() {
    useSEO({
        title: "Resultados y Carreras UTN | CareerPath AI",
        description:
            "Explorá las carreras de la UTN Facultad Regional Tucumán recomendadas según tu test vocacional y guardá tus favoritas.",
        canonicalPath: "/resultados",
    });

    const { activeUser, isAuthenticated, isLoadingAuth } = useLocalAuth();

    // useState: controla los inputs de búsqueda y filtro. Cambian con cada tecla/selección del usuario.
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedArea, setSelectedArea] = useState("");

    // useState: guarda el resultado del matching (carreras recomendadas) y si existe un test completado.
    const [recommendedCareers, setRecommendedCareers] = useState([]);
    const [hasTestAnswers, setHasTestAnswers] = useState(false);

    // useEffect: se ejecuta al montar y cada vez que cambia el usuario activo o termina de cargar la
    // autenticación (dependencias [activeUser, isLoadingAuth]). Lee las respuestas del test desde
    // localStorage, calcula las recomendaciones y, como efecto secundario, persiste el resultado
    // (recomendaciones + ruta de aprendizaje base) para que Mi Ruta pueda leerlo después.
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
            return;
        }

        const answerList = Object.entries(rawAnswers)
            .map(([questionIndex, optionIndex]) => questions[Number(questionIndex)]?.options?.[optionIndex])
            .filter(Boolean);

        if (answerList.length === 0) {
            setHasTestAnswers(false);
            setRecommendedCareers([]);
            return;
        }

        setHasTestAnswers(true);

        const recommendations = getCareerRecommendations({
            careers: carrerasUTN,
            user: activeUser,
            answers: answerList,
            limit: 6,
        });

        const finalRecommendations = recommendations.length > 0 ? recommendations : carrerasUTN.slice(0, 4);
        setRecommendedCareers(finalRecommendations);

        localStorage.setItem(RECOMMENDED_CAREERS_KEY, JSON.stringify(finalRecommendations));

        const dominantArea = getDominantArea(answerList);
        const learningRoute = buildLearningRouteFromCareer(finalRecommendations[0], dominantArea);

        if (learningRoute) {
            localStorage.setItem(LEARNING_ROUTE_KEY, JSON.stringify(learningRoute));
        }
    }, [activeUser, isLoadingAuth]);

    const filteredCareers = useMemo(() => {
        return recommendedCareers.filter((career) => {
            const matchesSearch =
                career.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                career.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesArea = selectedArea === "" || (career.area ?? "").toLowerCase() === selectedArea.toLowerCase();
            return matchesSearch && matchesArea;
        });
    }, [recommendedCareers, searchTerm, selectedArea]);

    const handleToggleFavorite = (id) => {
        let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
        if (favorites.includes(id)) {
            favorites = favorites.filter((favId) => favId !== id);
            alert("Carrera eliminada de favoritos.");
        } else {
            favorites.push(id);
            alert("Carrera guardada en favoritos.");
        }
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
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
            <main className="container py-5 text-center">
                <i className="bi bi-person-lock display-4 text-primary mb-3"></i>
                <h1 className="fw-bold">Primero iniciá sesión</h1>
                <p className="text-muted">
                    Necesitás iniciar sesión o crear una cuenta para generar tus resultados.
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
            <main className="container py-5 text-center">
                <i className="bi bi-clipboard-x display-4 text-primary mb-3"></i>
                <h1 className="fw-bold">Todavía no hiciste el test</h1>
                <p className="text-muted">
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
        <main className="container py-5">
            <header className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <h1 className="fw-bold mb-1">Resultados de tu Test Vocacional</h1>
                    <p className="text-muted mb-0">
                        Hola {activeUser.nombre}, estas son las carreras recomendadas según tus respuestas.
                    </p>
                </div>
                <Link to="/test" className="btn btn-outline-primary rounded-pill">
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Repetir Test
                </Link>
            </header>

            <section className="row g-3 mb-4" aria-label="Filtros de búsqueda">
                <div className="col-md-8">
                    <label htmlFor="buscar-carrera" className="visually-hidden">Buscar carrera</label>
                    <input
                        id="buscar-carrera"
                        type="text"
                        className="form-control"
                        placeholder="Buscar carrera..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="filtro-area" className="visually-hidden">Filtrar por área</label>
                    <select
                        id="filtro-area"
                        className="form-select"
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                    >
                        <option value="">Todas las áreas</option>
                        <option value="Carrera de grado">Carrera de grado</option>
                        <option value="Carrera de pregrado">Carrera de pregrado</option>
                        <option value="complementación curricular">Complementación curricular</option>
                        <option value="carrera de posgrado">Carrera de posgrado</option>
                    </select>
                </div>
            </section>

            <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" aria-label="Listado de carreras recomendadas">
                {filteredCareers.length === 0 ? (
                    <p className="text-muted text-center">No se encontraron carreras que coincidan con la búsqueda.</p>
                ) : (
                    filteredCareers.map((career) => (
                        <div className="col" key={career.id}>
                            <CareerCard career={career} onToggleFavorite={handleToggleFavorite} />
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}