import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { questions } from "../data/testQuestions";
import { careers } from "../data/careers";
import QuestionCard from "../components/QuestionCard";
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

export default function Test() {
  useSEO({
    title: "Test Vocacional UTN | CareerPath AI",
    description:
      "Realizá el test vocacional de CareerPath AI y descubrí qué carrera de la UTN se adapta mejor a tu perfil.",
    canonicalPath: "/test",
  });

  const navigate = useNavigate();
  const { activeUser, isAuthenticated, isLoadingAuth } = useLocalAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [hasPreviousTest, setHasPreviousTest] = useState(false);
  const [isRetaking, setIsRetaking] = useState(false);

  useEffect(() => {
    setHasPreviousTest(Boolean(localStorage.getItem(TEST_ANSWERS_KEY)));
  }, []);

  const handleStartAgain = () => {
    localStorage.removeItem(TEST_ANSWERS_KEY);
    localStorage.removeItem(RECOMMENDED_CAREERS_KEY);
    localStorage.removeItem(LEARNING_ROUTE_KEY);

    setUserAnswers({});
    setCurrentIndex(0);
    setHasPreviousTest(false);
    setIsRetaking(true);
  };

  const handleSelectOption = (optionIndex) => {
    setUserAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentIndex]: optionIndex,
    }));
  };

  const saveResultsAndGoToRoute = (answersToSave) => {
    localStorage.setItem(TEST_ANSWERS_KEY, JSON.stringify(answersToSave));

    const answerList = Object.entries(answersToSave)
      .map(
        ([questionIndex, optionIndex]) =>
          questions[Number(questionIndex)]?.options?.[optionIndex],
      )
      .filter(Boolean);

    const recommendations = getCareerRecommendations({
      careers,
      user: activeUser,
      answers: answerList,
      limit: 8,
    });

    const finalRecommendations =
      recommendations.length > 0 ? recommendations : careers.slice(0, 8);

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

    Swal.fire({
      icon: "success",
      title: "Test completado",
      text: "Ya generamos tus recomendaciones y tu ruta de aprendizaje.",
      confirmButtonText: "Ver mi ruta",
    }).then(() => {
      navigate("/ruta");
    });
  };

  const handleNext = () => {
    if (userAnswers[currentIndex] === undefined) {
      Swal.fire({
        icon: "warning",
        title: "Falta responder",
        text: "Seleccioná una opción para continuar con el test.",
        confirmButtonText: "Entendido",
      });

      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((currentValue) => currentValue + 1);
      return;
    }

    saveResultsAndGoToRoute(userAnswers);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentValue) => currentValue - 1);
    }
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
        <div className="py-5">
          <i className="bi bi-person-lock display-1 text-secondary mb-4 d-block"></i>

          <h2 className="fw-bold mb-3">Primero creá tu perfil</h2>

          <p className="text-muted mb-4 lead">
            Necesitás tener una cuenta iniciada para realizar y guardar tu test
            vocacional.
          </p>

          <Link to="/perfil" className="btn btn-primary rounded-pill px-5 py-2">
            Comenzar mi perfil
          </Link>
        </div>
      </main>
    );
  }

  if (hasPreviousTest && !isRetaking) {
    return (
      <main className="container py-5 text-center cp-fade-up">
        <div className="card border-0 shadow-sm rounded-4 mx-auto">
          <div className="card-body p-4 p-md-5">
            <i className="bi bi-check-circle-fill display-1 text-success mb-4 d-block"></i>

            <h1 className="fw-bold mb-3">Ya completaste el test</h1>

            <p className="text-muted mb-4 lead">
              Podés ver tus resultados, continuar tu ruta o rehacer el test para
              actualizar tus recomendaciones.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link
                to="/resultados"
                className="btn btn-primary rounded-pill px-4"
              >
                <i className="bi bi-stars me-2"></i>
                Ver resultados
              </Link>

              <Link
                to="/ruta"
                className="btn btn-outline-primary rounded-pill px-4"
              >
                <i className="bi bi-signpost-split me-2"></i>
                Ver mi ruta
              </Link>

              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={handleStartAgain}
              >
                <i className="bi bi-arrow-repeat me-2"></i>
                Rehacer test
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <main className="container py-5">
      <header className="text-center mb-4 cp-fade-up">
        <span className="badge rounded-pill text-bg-primary mb-3 cp-soft-badge">
          <i className="bi bi-clipboard-check me-2"></i>
          Test vocacional
        </span>

        <h1 className="fw-bold">Test Vocacional UTN</h1>

        <p className="text-muted">
          Respondé pensando en tus intereses, habilidades, valores y forma de
          trabajar.
        </p>
      </header>

      <div className="progress mb-4" style={{ height: "10px" }}>
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{
            width: `${progress}%`,
            transition: "width 0.5s ease-in-out",
          }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <section>
        <QuestionCard
          key={currentIndex}
          question={questions[currentIndex]}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedAnswer={userAnswers[currentIndex]}
          onSelectOption={handleSelectOption}
        />

        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={handlePrev}
            className="btn btn-outline-secondary rounded-pill cp-btn-animated px-4"
            disabled={currentIndex === 0}
            type="button"
          >
            <i className="bi bi-arrow-left-circle me-2"></i>
            Anterior
          </button>

          <button
            onClick={handleNext}
            className="btn btn-primary rounded-pill cp-btn-animated px-4"
            type="button"
          >
            {currentIndex === questions.length - 1 ? (
              <>
                <i className="bi bi-flag me-2"></i>
                Finalizar y ver mi ruta
              </>
            ) : (
              <>
                Siguiente
                <i className="bi bi-arrow-right-circle ms-2"></i>
              </>
            )}
          </button>
        </div>
      </section>
    </main>
  );
}