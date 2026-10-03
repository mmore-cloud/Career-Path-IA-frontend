import { useEffect, useMemo, useState } from "react";
import LoginForm from "../components/LoginForm";
import SectionTitle from "../components/SectionTitle";
import UserProfileSummary from "../components/UserProfileSummary";
import { careers } from "../data/careers";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { getCareerRecommendations } from "../utils/careerMatcher";
import { buildLearningRouteFromCareer } from "../utils/learningRouteBuilder";

function Perfil() {
  const {
    activeUser,
    isAuthenticated,
    isLoadingAuth,
    authError,
    login,
    register,
    updateActiveUser,
    logout,
    resetLocalUsers,
  } = useLocalAuth();

  const [learningRoute, setLearningRoute] = useState(null);

  const hasVocationalData =
    activeUser?.intereses?.length > 0 || activeUser?.habilidades?.length > 0;

  const recommendations = useMemo(() => {
    if (!activeUser || !hasVocationalData) {
      return [];
    }

    return getCareerRecommendations({
      careers,
      user: activeUser,
      answers: [],
      limit: 4,
    });
  }, [activeUser, hasVocationalData]);

  useEffect(() => {
    if (recommendations.length === 0) {
      localStorage.removeItem("careerpath_recommended_careers");
      localStorage.removeItem("careerpath_learning_route");
      setLearningRoute(null);
      return;
    }

    const generatedRoute = buildLearningRouteFromCareer(recommendations[0]);

    setLearningRoute(generatedRoute);

    localStorage.setItem(
      "careerpath_recommended_careers",
      JSON.stringify(recommendations)
    );

    localStorage.setItem(
      "careerpath_learning_route",
      JSON.stringify(generatedRoute)
    );
  }, [recommendations]);

  return (
    <section className="py-5 bg-light cp-profile-section">
      <div className="container">
        <SectionTitle
          etiqueta="Mi perfil"
          titulo="Acceso y perfil vocacional"
          descripcion="Creá tu cuenta, iniciá sesión y completá tus intereses y habilidades para preparar el test vocacional."
        />

        {isLoadingAuth && (
          <div className="card border-0 shadow-sm rounded-4 cp-fade-up">
            <div className="card-body p-4">
              <p className="text-secondary mb-0">
                <i className="bi bi-hourglass-split me-2"></i>
                Cargando sesión local...
              </p>
            </div>
          </div>
        )}

        {!isLoadingAuth && !isAuthenticated && (
          <LoginForm
            onLogin={login}
            onRegister={register}
            authError={authError}
            isLoading={isLoadingAuth}
          />
        )}

        {!isLoadingAuth && isAuthenticated && activeUser && (
          <UserProfileSummary
            user={activeUser}
            recommendations={recommendations}
            learningRoute={learningRoute}
            onUpdateProfile={updateActiveUser}
            onLogout={logout}
            onResetUsers={resetLocalUsers}
          />
        )}
      </div>
    </section>
  );
}

export default Perfil;