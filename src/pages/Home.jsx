import React from "react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import { homeFeatures } from "../data/homeFeatures";

const Home = () => {
  return (
    <>
      <Hero
        badgeText="Orientación vocacional con inteligencia artificial"
        title={
          <>
            Tu futuro empieza
            <br />
            por <span className="text-info">conocerte.</span>
          </>
        }
        leadText="¿Todavía no sabés qué estudiar? Descubrí qué te interesa, explorá tus posibilidades y empezá a construir tu propio camino."
        descriptionText="CareerPath AI está pensado para estudiantes que están eligiendo una carrera o buscando una nueva dirección."
        primaryBtn={{
          text: "Comenzar con mi perfil",
          link: "/perfil",
          icon: "bi-person-badge",
        }}
        secondaryBtn={{
          text: "Conocer el recorrido",
          link: "/test",
          icon: "bi-clipboard-check",
        }}
      />

      <section className="py-5 bg-light flex-grow-1">
        <div className="container">
          <div className="row g-4 text-center">
            {homeFeatures.map((feature) => (
              <div className="col-md-4" key={feature.id}>
                <FeatureCard
                  step={feature.step}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  link={feature.link}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;