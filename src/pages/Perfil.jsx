import React from 'react';
import ProfileForm from '../components/ProfileForm';

const Perfil = () => {
  return (
    <main className="flex-grow-1 bg-light py-5">
      <section className="container">
        <div className="row justify-content-center">
          <article className="col-12 col-lg-8">
            
            <header className="text-center mb-5">
              <h1 className="display-5 fw-bold text-dark">Mi Perfil</h1>
              <p className="lead text-muted">Configurá tus datos para que la IA te recomiende la mejor ruta de aprendizaje.</p>
            </header>

            {/* Acá pasamos las props al componente */}
            <ProfileForm 
              title="Completá tus Datos Personales"
              buttonText="Guardar y Continuar"
            />

          </article>
        </div>
      </section>
    </main>
  );
};

export default Perfil;