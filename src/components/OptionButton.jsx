import React from "react";

export default function OptionButton({ option, index, selected, onSelect }) {
  return (
    <div
      className={`form-check border rounded-4 p-3 mb-3 cp-option-card transition-all ${
        selected ? "border-primary bg-primary-subtle shadow-sm" : "bg-white shadow-sm"
      }`}
      style={{ cursor: "pointer", transition: "all 0.2s ease" }}
      onClick={() => onSelect(index)}
    >
      <input
        className="form-check-input d-none"
        type="radio"
        name="option"
        id={`option-${index}`}
        checked={selected}
        onChange={() => onSelect(index)}
      />

      <label
        className="form-check-label w-100 d-flex align-items-center gap-3"
        htmlFor={`option-${index}`}
        style={{ cursor: "pointer" }}
      >
        <div 
          className={`rounded-circle p-2 d-flex align-items-center justify-content-center ${
            selected ? "bg-primary text-white" : "bg-light text-primary"
          }`} 
          style={{ width: "42px", height: "42px", minWidth: "42px", transition: "all 0.2s ease" }}
        >
          <i className={`bi ${option.icon || (selected ? "bi-check-circle-fill" : "bi-circle")} fs-5`}></i>
        </div>

        <span className="fw-medium text-dark">{option.text}</span>
      </label>
    </div>
  );
}