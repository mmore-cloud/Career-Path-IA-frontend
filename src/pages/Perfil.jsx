import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SectionTitle from "../components/SectionTitle";
import UserProfileSummary from "../components/UserProfileSummary";
import { careers } from "../data/careers";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { getCareerRecommendations } from "../utils/careerMatcher";
import { buildLearningRouteFromCareer } from "../utils/learningRouteBuilder";

const TEST_ANSWERS_KEY = "careerpath_test_answers";
const RECOMMENDED_CAREERS_KEY = "careerpath_recommended_careers";
const LEARNING_ROUTE_KEY = "careerpath_learning_route";

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

  const hasVocationalData =
    activeUser?.intereses?.length > 0 ||
    activeUser?.habilidades?.length > 0;

  let recommendations = [];

  if (activeUser && hasVocationalData) {
    recommendations = getCareerRecommendations({
      careers,
      user: activeUser,
      answers: [],
      limit: 4,
    });
  }

  useEffect(() => {
    const hasStoredTest = Boolean(
      localStorage.getItem(TEST_ANSWERS_KEY),
    );

    if (hasStoredTest) {
      return;
    }

    if (!activeUser || !hasVocationalData) {
      localStorage.removeItem(RECOMMENDED_CAREERS_KEY);
      localStorage.removeItem(LEARNING_ROUTE_KEY);
      return;
    }

    const generatedRecommendations = getCareerRecommendations({
      careers,
      user: activeUser,
      answers: [],
      limit: 4,
    });

    if (generatedRecommendations.length === 0) {
      localStorage.removeItem(RECOMMENDED_CAREERS_KEY);
      localStorage.removeItem(LEARNING_ROUTE_KEY);
      return;
    }

    const generatedRoute = buildLearningRouteFromCareer(
      generatedRecommendations[0],
    );

    localStorage.setItem(
      RECOMMENDED_CAREERS_KEY,
      JSON.stringify(generatedRecommendations),
    );

    localStorage.setItem(
      LEARNING_ROUTE_KEY,
      JSON.stringify(generatedRoute),
    );
  }, [activeUser, hasVocationalData]);

  return (
    <section className="py-5 bg-body-tertiary cp-profile-section">
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