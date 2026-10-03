import React from "react";
import OptionButton from "./OptionButton";

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectOption,
}) {
  return (
    <article className="card shadow-sm border-0 rounded-4 cp-fade-up">
      <div className="card-body p-4">
        <h2 className="h6 text-muted mb-2">
          <i className="bi bi-question-circle me-2 text-primary"></i>
          Pregunta {currentIndex + 1} de {totalQuestions}
        </h2>

        <p className="fs-5 mb-4">{question.text}</p>

        <div className="d-flex flex-column gap-2">
          {question.options.map((option, index) => (
            <OptionButton
              key={option.id ?? index}
              option={option}
              index={index}
              selected={selectedAnswer === index}
              onSelect={onSelectOption}
            />
          ))}
        </div>
      </div>
    </article>
  );
}