function RouteTopic({ topic, completado, onToggle }) {
  const handleToggle = () => {
    onToggle(topic.id);
  };

  return (
    <label
      className={`border rounded-3 p-3 h-100 d-flex align-items-start gap-3 shadow-sm ${
        completado
          ? "border-success bg-success-subtle"
          : "border-secondary-subtle bg-body-tertiary"
      }`}
      htmlFor={`tema-${topic.id}`}
      style={{ cursor: "pointer" }}
    >
      <input
        className="form-check-input mt-1"
        type="checkbox"
        id={`tema-${topic.id}`}
        checked={completado}
        onChange={handleToggle}
      />

      <span className="d-block">
        <span
          className={`d-block fw-semibold ${
            completado ? "text-success" : "text-body"
          }`}
        >
          {topic.nombre}
        </span>

        <small className="text-secondary">
          {completado ? "Aprobada / promocionada" : "Pendiente"}
        </small>
      </span>
    </label>
  );
}

export default RouteTopic;