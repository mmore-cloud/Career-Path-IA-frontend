import React from "react";

export default function OptionButton({ option, index, selected, onSelect }) {
  return (
    <div
      className={`form-check border rounded-4 p-3 cp-option-card ${
        selected ? "border-primary bg-primary-subtle" : ""
      }`}
    >
      <input
        className="form-check-input"
        type="radio"
        name="option"
        id={`option-${index}`}
        checked={selected}
        onChange={() => onSelect(index)}
      />

      <label
        className="form-check-label w-100 d-flex align-items-start gap-2"
        htmlFor={`option-${index}`}
        style={{ cursor: "pointer" }}
      >
        <i
          className={`bi ${
            selected ? "bi-check-circle-fill text-primary" : "bi-circle text-secondary"
          } mt-1`}
        ></i>

        <span>{option.text}</span>
      </label>
    </div>
  );
}