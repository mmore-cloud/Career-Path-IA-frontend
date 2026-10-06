import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { questions } from "../data/testQuestions";
import QuestionCard from "../components/QuestionCard";
import { useSEO } from "../hooks/useSEO";

export default function Test() {
  useSEO({
    title: "Test Vocacional UTN | CareerPath AI",
    description: "Realizá el test vocacional de CareerPath AI y descubrí qué carrera de la UTN se adapta mejor a tu perfil.",
    canonicalPath: "/test",
  });

  const [activeUserId, setActiveUserId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  // Validar si hay usuario logueado en localStorage al entrar
  useEffect(() => {
    const userId = localStorage.getItem('careerpath_active_user_id');
    setActiveUserId(userId);
  }, []);

  const handleSelectOption = (optionIndex) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: optionIndex });
  };

  const handleNext = () => {
    if (userAnswers[currentIndex] === undefined) {
      alert("Por favor seleccioná una opción para continuar.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Guardar en localStorage usando la clave obligatoria del equipo
      localStorage.setItem('careerpath_test_answers', JSON.stringify(userAnswers));
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // ESTADO VACÍO: No hay cuenta iniciada
  if (!activeUserId) {
    return (
      <main className="container py-5 text-center cp-fade-up">
        <div className="py-5">
          <i className="bi bi-person-lock display-1 text-secondary mb-4 d-block"></i>
          <h2 className="fw-bold mb-3">Acceso Restringido</h2>
          <p className="text-muted mb-4 lead">
            Necesitas tener una cuenta iniciada para realizar y guardar tu test vocacional.
          </p>
          <Link to="/perfil" className="btn btn-primary rounded-pill px-5 py-2">
            Iniciar Sesión o Registrarse
          </Link>
        </div>
      </main>
    );
  }

  // ESTADO FINALIZADO: Test completado
  if (isFinished) {
    return (
      <main className="container py-5 text-center cp-fade-up">
        <div className="py-5">
          <i className="bi bi-check-circle-fill display-1 text-success mb-4 d-block"></i>
          <h2 className="fw-bold mb-3">¡Test Completado!</h2>
          <p className="text-muted mb-4 lead">
            Tus respuestas se han guardado con éxito. Ahora cruzaremos tus datos para mostrarte las mejores opciones.
          </p>
          <Link to="/resultados" className="btn btn-success btn-lg rounded-pill px-5">
            Ver mis Resultados <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </main>
    );
  }

  // ESTADO ACTIVO: Mostrando el Test
  const progress = (currentIndex / questions.length) * 100;

  return (
    <main className="container py-5">
      <header className="text-center mb-4 cp-fade-up">
        <span className="badge rounded-pill text-bg-primary mb-3 cp-soft-badge">
          <i className="bi bi-clipboard-check me-2"></i>
          Test vocacional
        </span>
        <h1 className="fw-bold">Test Vocacional UTN</h1>
        <p className="text-muted">
          Descubrí tu perfil profesional ideal en la UTN Facultad Regional Tucumán.
        </p>
      </header>

      <div className="progress mb-4" style={{ height: "10px" }}>
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
        ></div>
      </div>

      <section>
        {/* Usamos 'key' para asegurar el re-renderizado de la tarjeta */}
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
                Finalizar
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