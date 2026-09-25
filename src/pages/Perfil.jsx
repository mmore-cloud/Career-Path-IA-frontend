import React from 'react';
import ProfileForm from '../components/ProfileForm';

function Perfil() {
  return (
    <div className="flex-grow-1 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-dark">Mi Perfil</h2>
              <p className="lead text-muted">Configurá tus datos para que la IA te recomiende la mejor ruta.</p>
            </div>
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;