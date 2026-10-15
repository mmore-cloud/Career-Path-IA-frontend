import { useState } from "react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import { homeFeatures } from "../data/homeFeatures";
import { useLocalAuth } from "../hooks/useLocalAuth";

const TEST_ANSWERS_KEY = "careerpath_test_answers";

const Home = () => {
  const { isAuthenticated } = useLocalAuth();

  const [hasCompletedTest] = useState(() =>
    Boolean(localStorage.getItem(TEST_ANSWERS_KEY)),
  );

  let primaryBtn;
  let secondaryBtn;

  if (!isAuthenticated) {
    primaryBtn = {
      text: "Comenzar mi perfil",
      link: "/perfil",
      icon: "bi-person-badge",
    };

    secondaryBtn = null;
  } else if (hasCompletedTest) {
    primaryBtn = {
      text: "Ver mis resultados",
      link: "/resultados",
      icon: "bi-stars",
    };

    secondaryBtn = {
      text: "Ver mi ruta",
      link: "/ruta",
      icon: "bi-signpost-split",
    };
  } else {
    primaryBtn = {
      text: "Realizar test vocacional",
      link: "/test",
      icon: "bi-clipboard-check",
    };

    secondaryBtn = {
      text: "Completar mi perfil",
      link: "/perfil",
      icon: "bi-person-lines-fill",
    };
  }

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
        primaryBtn={primaryBtn}
        secondaryBtn={secondaryBtn}
      />

      <section className="py-5 bg-body-tertiary flex-grow-1">
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