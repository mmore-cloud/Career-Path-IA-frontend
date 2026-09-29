import React from 'react';
import OptionButton from './OptionButton';

export default function QuestionCard({ question, currentIndex, totalQuestions, selectedAnswer, onSelectOption }) {
    return (
        <article className="card shadow-sm">
            <div className="card-body">
                <h2 className="h6 text-muted mb-2">
                    Pregunta {currentIndex + 1} de {totalQuestions}
                </h2>
                <p className="fs-5 mb-4">{question.text}</p>

                <div className="d-flex flex-column gap-2">
                    {question.options.map((option, idx) => (
                        <OptionButton
                            key={idx}
                            option={option}
                            index={idx}
                            selected={selectedAnswer === idx}
                            onSelect={onSelectOption}
                        />
                    ))}
                </div>
            </div>
        </article>
    );
}