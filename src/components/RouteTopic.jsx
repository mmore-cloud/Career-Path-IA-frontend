function RouteTopic({ topic, completado, onToggle }) {
  return (
    <div
      className={`border rounded-3 p-3 h-100 cp-option-card ${
        completado
          ? "border-success bg-success-subtle"
          : "border-light-subtle bg-white"
      }`}
    >
      <div className="form-check d-flex align-items-start gap-2 mb-0">
        <input
          className="form-check-input mt-1"
          type="checkbox"
          id={`tema-${topic.id}`}
          checked={completado}
          onChange={() => onToggle(topic.id)}
        />

        <label className="form-check-label w-100" htmlFor={`tema-${topic.id}`}>
          <span
            className={`fw-semibold d-flex align-items-center gap-2 ${
              completado ? "text-success" : "text-dark"
            }`}
          >
            <i
              className={`bi ${
                completado ? "bi-check-circle-fill" : "bi-circle"
              }`}
            ></i>

            {topic.nombre}
          </span>

          <small className="text-secondary">
            {completado ? "Tema completado" : "Pendiente"}
          </small>
        </label>
      </div>
    </div>
  );
}

export default RouteTopic;