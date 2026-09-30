import React, { useState } from 'react';
import { questions } from '../data/testQuestions';
import QuestionCard from '../components/QuestionCard';
import { useSEO } from '../hooks/useSEO';

export default function Test({ onFinishTest }) {
    useSEO({
        title: 'Test Vocacional UTN | CareerPath AI',
        description:
            'Realizá el test vocacional de CareerPath AI y descubrí qué carrera de la UTN Facultad Regional Tucumán se adapta mejor a tu perfil.',
        canonicalPath: '/test',
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});

    const handleSelectOption = (optionIndex) => {
        setUserAnswers({ ...userAnswers, [currentIndex]: optionIndex });
    };

    const handleNext = () => {
        if (userAnswers[currentIndex] === undefined) {
            alert('Por favor seleccioná una opción para continuar.');
            return;
        }
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (onFinishTest) {
            onFinishTest(userAnswers);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const progress = (currentIndex / questions.length) * 100;

    return (
        <main className="container py-5">
            <header className="text-center mb-4">
                <h1 className="fw-bold">Test Vocacional UTN</h1>
                <p className="text-muted">
                    Descubrí tu perfil profesional ideal en la UTN Facultad Regional Tucumán
                </p>
            </header>

            <div className="progress mb-4" style={{ height: '10px' }}>
                <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>

            <section>
                <QuestionCard
                    question={questions[currentIndex]}
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
                    selectedAnswer={userAnswers[currentIndex]}
                    onSelectOption={handleSelectOption}
                />

                <div className="d-flex justify-content-between mt-4">
                    <button
                        onClick={handlePrev}
                        className="btn btn-outline-secondary"
                        disabled={currentIndex === 0}
                    >
                        Anterior
                    </button>
                    <button onClick={handleNext} className="btn btn-primary">
                        {currentIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </button>
                </div>
            </section>
        </main>
    );
}