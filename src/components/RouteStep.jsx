function RouteStep({ numero, titulo, descripcion, activo }) {
  return (
    <div className="d-flex gap-3 align-items-start mb-4">
      <div
        className={`rounded-circle d-flex align-items-center justify-content-center fw-bold text-white ${
          activo ? "bg-primary" : "bg-secondary"
        }`}
        style={{
          width: "42px",
          height: "42px",
          minWidth: "42px",
        }}
      >
        {numero}
      </div>

      <div>
        <h3 className="h6 fw-bold mb-1">{titulo}</h3>

        <p className="text-secondary mb-0">
          {descripcion}
        </p>
      </div>
    </div>
  );
}

export default RouteStep;