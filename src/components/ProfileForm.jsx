import React from 'react';

const ProfileForm = () => {
  return (
    <form className="p-4 p-md-5 bg-white shadow-sm rounded-4 border-0">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-primary">Datos Personales</h3>
      </div>
      
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label fw-bold">Nombre y Apellido</label>
        <input type="text" className="form-control form-control-lg" id="nombre" placeholder="Ingresá tu nombre completo" />
      </div>

      <div className="row mb-3 g-3">
        <div className="col-md-6">
          <label htmlFor="edad" className="form-label fw-bold">Edad</label>
          <input type="number" className="form-control form-control-lg" id="edad" placeholder="Ej: 18" />
        </div>
        <div className="col-md-6">
          <label htmlFor="ciudad" className="form-label fw-bold">Ciudad</label>
          <input type="text" className="form-control form-control-lg" id="ciudad" placeholder="Ej: San Miguel de Tucumán" />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="intereses" className="form-label fw-bold">Intereses principales</label>
        <textarea className="form-control" id="intereses" rows="3" placeholder="¿Qué temas te gustan o te dan curiosidad?"></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="habilidades" className="form-label fw-bold">Habilidades</label>
        <textarea className="form-control" id="habilidades" rows="3" placeholder="¿En qué considerás que sos bueno/a?"></textarea>
      </div>

      <div className="d-grid mt-4">
        <button type="button" className="btn btn-primary btn-lg fw-bold rounded-pill">
          Guardar Perfil
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;