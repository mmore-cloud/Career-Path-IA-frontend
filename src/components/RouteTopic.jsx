function RouteTopic({ titulo, descripcion, estado }) {
  const obtenerClaseEstado = () => {
    if (estado === "Completado") {
      return "bg-success";
    }

    if (estado === "En progreso") {
      return "bg-primary";
    }

    return "bg-secondary";
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3 className="h5 fw-bold mb-0">{titulo}</h3>

          <span className={`badge ${obtenerClaseEstado()}`}>
            {estado}
          </span>
        </div>

        <p className="text-secondary mb-0">
          {descripcion}
        </p>
      </div>
    </div>
  );
}

export default RouteTopic;