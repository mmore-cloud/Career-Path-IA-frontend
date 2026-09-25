import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { homeFeatures } from '../data/homeFeatures';

function Home({ cambiarPagina }) {
  return (
    <div className="flex-grow-1 bg-light">
      <Hero 
        subtitle="Orientación vocacional con Inteligencia Artificial"
        title={
          <>
            Tu futuro empieza<br />por <span className="text-info">conocerte.</span>
          </>
        }
        description="CareerPath AI está pensado para estudiantes que están eligiendo una carrera o buscando una nueva dirección. Descubrí qué te interesa, explorá tus posibilidades y empezá a construir tu propio camino."
        primaryBtnText="Comenzar con mi perfil ↗"
        onPrimaryClick={() => cambiarPagina("perfil")}
        secondaryBtnText="Conocer el recorrido"
        onSecondaryClick={() => cambiarPagina("test")}
      />

      <section className="container py-5 mt-4">
        <div className="row text-center mb-5">
          <div className="col-12">
            <h2 className="display-6 fw-bold">Cada paso tiene un propósito</h2>
            <p className="text-muted">Un recorrido pensado para ayudarte a decidir con más información.</p>
          </div>
        </div>

        {/* Renderizado dinámico de tarjetas separadas en componentes */}
        <div className="row g-4 text-center">
          {homeFeatures.map((feature) => (
            <div className="col-md-4" key={feature.id}>
              <FeatureCard 
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;