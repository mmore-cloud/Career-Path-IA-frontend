function SectionTitle({ etiqueta, titulo, descripcion }) {
  return (
    <div className="text-center mb-5">
      {etiqueta && (
        <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
          {etiqueta}
        </span>
      )}

      <h2 className="fw-bold display-6 mb-3">
        {titulo}
      </h2>

      {descripcion && (
        <p className="text-secondary mx-auto mb-0" style={{ maxWidth: "720px" }}>
          {descripcion}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;