import React, { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import { homeFeatures } from "../data/homeFeatures";
import { useLocalAuth } from "../hooks/useLocalAuth";

const TEST_ANSWERS_KEY = "careerpath_test_answers";

const Home = () => {
  const { isAuthenticated } = useLocalAuth();
  const [hasCompletedTest, setHasCompletedTest] = useState(false);

  useEffect(() => {
    setHasCompletedTest(Boolean(localStorage.getItem(TEST_ANSWERS_KEY)));
  }, []);

  const primaryBtn = useMemo(() => {
    if (!isAuthenticated) {
      return {
        text: "Comenzar mi perfil",
        link: "/perfil",
        icon: "bi-person-badge",
      };
    }

    return {
      text: "Conocer mi recorrido",
      link: hasCompletedTest ? "/ruta" : "/test",
      icon: "bi-signpost-split",
    };
  }, [isAuthenticated, hasCompletedTest]);

  const secondaryBtn = useMemo(() => {
    if (!isAuthenticated) {
      return {
        text: "Conocer el recorrido",
        link: "/ruta",
        icon: "bi-signpost-split",
      };
    }

    if (hasCompletedTest) {
      return {
        text: "Ver mis resultados",
        link: "/resultados",
        icon: "bi-stars",
      };
    }

    return {
      text: "Realizar test vocacional",
      link: "/test",
      icon: "bi-clipboard-check",
    };
  }, [isAuthenticated, hasCompletedTest]);

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
