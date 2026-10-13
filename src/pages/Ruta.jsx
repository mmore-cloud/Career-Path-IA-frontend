import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import RouteStep from "../components/RouteStep";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { useSEO } from "../hooks/useSEO";

import {
  adaptarRutaAprendizaje,
  obtenerCantidadTemas,
  obtenerIdsTemas,
  routeStorageKeys,
} from "../data/routeTopics";

// Lee una clave de localStorage y convierte el texto JSON nuevamente a JavaScript.
// Si la clave no existe o contiene datos inválidos, devuelve el valor alternativo recibido en fallback.
function leerJSONStorage(key, fallback = null) {
  try {
    const guardado = localStorage.getItem(key);

    if (!guardado) {
      return fallback;
    }

    return JSON.parse(guardado);
  } catch (error) {
    console.error(`Error al leer ${key}:`, error);
    return fallback;
  }
}

// Comprueba si el usuario realmente tiene respuestas guardadas del Test Vocacional.
// Se aceptan respuestas guardadas como array o como objeto porque el Test puede utilizar cualquiera de esas estructuras.
function tieneRespuestasTest(respuestas) {
  if (!respuestas) {
    return false;
  }

  if (Array.isArray(respuestas)) {
    return respuestas.length > 0;
  }

  if (typeof respuestas === "object") {
    return Object.keys(respuestas).length > 0;
  }

  return false;
}

// Componente reutilizable para mostrar los distintos estados en los que Mi Ruta todavía no puede generarse.
// Recibe el icono, título, descripción y botón necesarios para dirigir al usuario al paso que le falta completar.
function EstadoRuta({
  icono,
  titulo,
  descripcion,
  destino,
  textoBoton,
}) {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div
          className="card border-0 shadow-sm rounded-4 mx-auto cp-fade-up"
          style={{ maxWidth: "720px" }}
        >
          <div className="card-body p-4 p-md-5 text-center">
            <div className="mb-4">
              <i
                className={`bi ${icono} display-3 text-primary`}
                aria-hidden="true"
              ></i>
            </div>

            <h1 className="h2 fw-bold mb-3">
              {titulo}
            </h1>

            <p className="text-secondary mb-4">
              {descripcion}
            </p>

            <Link
              to={destino}
              className="btn btn-primary rounded-pill px-4 cp-btn-animated"
            >
              <i className="bi bi-arrow-right-circle me-2"></i>
              {textoBoton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ruta() {
  // Configura el título, la descripción y la URL canónica específica de la página Mi Ruta.
  useSEO({
    title: "Mi Ruta de Aprendizaje | CareerPath AI",
    description:
      "Consultá tu ruta personalizada de aprendizaje según tu perfil vocacional, test y resultados en CareerPath AI.",
    canonicalPath: "/ruta",
  });

  // Obtiene la información del sistema de autenticación local.
  // activeUser contiene el usuario actual.
  // isAuthenticated indica si existe una sesión iniciada.
  // isLoadingAuth indica si todavía se están recuperando los datos de sesión.
  const {
    activeUser,
    isAuthenticated,
    isLoadingAuth,
  } = useLocalAuth();

  // Guarda temporalmente las respuestas del Test Vocacional leídas desde localStorage.
  const [testAnswers, setTestAnswers] = useState(null);

  // Guarda las carreras recomendadas generadas anteriormente por la página Resultados.
  const [
    recommendedCareers,
    setRecommendedCareers,
  ] = useState([]);

  // Guarda la ruta de aprendizaje generada a partir de la carrera recomendada.
  const [
    learningRoute,
    setLearningRoute,
  ] = useState(null);

  // Permite saber cuándo terminó la lectura inicial de localStorage.
  // Evita mostrar un estado vacío antes de terminar de recuperar los datos.
  const [
    storageLoaded,
    setStorageLoaded,
  ] = useState(false);

  // Guarda los identificadores de los temas que el usuario marcó como completados.
  const [
    temasCompletados,
    setTemasCompletados,
  ] = useState([]);

  // Indica si ya se recuperó desde localStorage el progreso correspondiente al usuario y a su carrera.
  const [
    progressLoaded,
    setProgressLoaded,
  ] = useState(false);

  // Lee los datos creados por las etapas anteriores del sistema.
  // Test guarda careerpath_test_answers.
  // Resultados guarda careerpath_recommended_careers y careerpath_learning_route.
  // La lectura se vuelve a ejecutar si cambia el usuario activo.
  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }

    const respuestasGuardadas = leerJSONStorage(
      routeStorageKeys.testAnswers,
      null,
    );

    const recomendacionesGuardadas = leerJSONStorage(
      routeStorageKeys.recommendedCareers,
      [],
    );

    const rutaGuardada = leerJSONStorage(
      routeStorageKeys.learningRoute,
      null,
    );

    setTestAnswers(respuestasGuardadas);

    setRecommendedCareers(
      Array.isArray(recomendacionesGuardadas)
        ? recomendacionesGuardadas
        : [],
    );

    setLearningRoute(rutaGuardada);

    setStorageLoaded(true);
  }, [
    isLoadingAuth,
    activeUser?.id,
  ]);

  // Convierte la estructura guardada en careerpath_learning_route al formato utilizado por RouteStep y RouteTopic.
  // useMemo evita repetir esta transformación si learningRoute no cambió.
  const etapas = useMemo(
    () => adaptarRutaAprendizaje(learningRoute),
    [learningRoute],
  );

  // Obtiene todos los IDs válidos de los temas de la ruta actual.
  // Estos IDs sirven para validar qué temas pueden marcarse como completados.
  const idsValidos = useMemo(
    () => obtenerIdsTemas(etapas),
    [etapas],
  );

  // Calcula automáticamente la cantidad total de temas existentes en todas las etapas.
  const totalTemas = useMemo(
    () => obtenerCantidadTemas(etapas),
    [etapas],
  );

  // Crea una clave única combinando el ID del usuario y el ID de la carrera.
  // Esto permite que cada usuario conserve un progreso independiente para cada ruta.
  const progressScope = useMemo(() => {
    if (!activeUser || !learningRoute) {
      return null;
    }

    const routeId =
      learningRoute.careerId ||
      learningRoute.careerTitle ||
      "ruta";

    return `${activeUser.id}:${routeId}`;
  }, [
    activeUser,
    learningRoute,
  ]);

  // Recupera el progreso previamente guardado para el usuario y la carrera actuales.
  // También elimina cualquier ID guardado que ya no exista dentro de la ruta actual.
  useEffect(() => {
    if (!progressScope) {
      setTemasCompletados([]);
      setProgressLoaded(false);
      return;
    }

    const progresoGuardado = leerJSONStorage(
      routeStorageKeys.routeProgress,
      {},
    );

    const progresoValido =
      progresoGuardado &&
      typeof progresoGuardado === "object" &&
      !Array.isArray(progresoGuardado)
        ? progresoGuardado
        : {};

    const temasGuardados =
      progresoValido[progressScope];

    const temas =
      Array.isArray(temasGuardados)
        ? temasGuardados.filter((id) =>
            idsValidos.includes(id),
          )
        : [];

    setTemasCompletados(temas);
    setProgressLoaded(true);
  }, [
    progressScope,
    idsValidos,
  ]);

  // Guarda automáticamente el progreso cada vez que el usuario marca o desmarca un tema.
  // Se conserva el progreso de otros usuarios y carreras que ya estuvieran almacenados.
  useEffect(() => {
    if (!progressScope || !progressLoaded) {
      return;
    }

    const progresoActual = leerJSONStorage(
      routeStorageKeys.routeProgress,
      {},
    );

    const progresoValido =
      progresoActual &&
      typeof progresoActual === "object" &&
      !Array.isArray(progresoActual)
        ? progresoActual
        : {};

    const nuevoProgreso = {
      ...progresoValido,
      [progressScope]: temasCompletados,
    };

    localStorage.setItem(
      routeStorageKeys.routeProgress,
      JSON.stringify(nuevoProgreso),
    );
  }, [
    temasCompletados,
    progressScope,
    progressLoaded,
  ]);

  // Marca o desmarca un tema de la ruta.
  // Antes de modificar el estado verifica que el ID realmente pertenezca a la ruta actual.
  const toggleTema = (temaId) => {
    if (!idsValidos.includes(temaId)) {
      return;
    }

    setTemasCompletados((anteriores) => {
      if (anteriores.includes(temaId)) {
        return anteriores.filter(
          (id) => id !== temaId,
        );
      }

      return [
        ...anteriores,
        temaId,
      ];
    });
  };

  // Cuenta solamente los temas completados que todavía pertenecen a la ruta actual.
  const cantidadCompletados =
    temasCompletados.filter((id) =>
      idsValidos.includes(id),
    ).length;

  // Calcula cuántos temas siguen pendientes.
  // Math.max evita que por alguna inconsistencia el resultado pueda quedar en un número negativo.
  const cantidadPendientes =
    Math.max(
      totalTemas - cantidadCompletados,
      0,
    );

  // Calcula el porcentaje general de progreso.
  // Si la ruta no tiene temas devuelve 0 para evitar una división por cero.
  const porcentaje =
    totalTemas === 0
      ? 0
      : Math.round(
          (cantidadCompletados / totalTemas) *
            100,
        );

  // Indica si existen respuestas válidas del Test Vocacional.
  const hayTest =
    tieneRespuestasTest(testAnswers);

  // Indica si Resultados ya generó al menos una carrera recomendada.
  const hayResultados =
    Array.isArray(recommendedCareers) &&
    recommendedCareers.length > 0;

  // Comprueba que exista una ruta válida y que tenga al menos una etapa para mostrar.
  const hayRuta =
    learningRoute &&
    typeof learningRoute === "object" &&
    Array.isArray(learningRoute.steps) &&
    learningRoute.steps.length > 0 &&
    etapas.length > 0;

  // Mientras se recuperan la sesión y los datos de localStorage se muestra una pantalla de carga.
  if (isLoadingAuth || !storageLoaded) {
    return (
      <section className="bg-light py-5">
        <div className="container text-center py-5">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          >
            <span className="visually-hidden">
              Cargando...
            </span>
          </div>

          <p className="text-secondary mb-0">
            Cargando tu ruta de aprendizaje...
          </p>
        </div>
      </section>
    );
  }

  // Estado 1: si no existe una sesión activa, Mi Ruta no puede identificar al usuario.
  // Se lo dirige a Mi Perfil para iniciar sesión o crear una cuenta.
  if (!isAuthenticated || !activeUser) {
    return (
      <EstadoRuta
        icono="bi-person-lock"
        titulo="Primero iniciá sesión"
        descripcion="Necesitás iniciar sesión o crear una cuenta antes de generar tu ruta de aprendizaje personalizada."
        destino="/perfil"
        textoBoton="Ir a Mi Perfil"
      />
    );
  }

  // Estado 2: existe un usuario activo pero todavía no realizó el Test Vocacional.
  // Se lo dirige al Test porque sus respuestas son necesarias para generar las recomendaciones.
  if (!hayTest) {
    return (
      <EstadoRuta
        icono="bi-clipboard-x"
        titulo="Todavía no completaste el test"
        descripcion="Completá el test vocacional para que CareerPath AI pueda analizar tus respuestas y preparar recomendaciones para tu perfil."
        destino="/test"
        textoBoton="Realizar Test Vocacional"
      />
    );
  }

  // Estado 3: el Test ya fue realizado pero todavía no existen carreras recomendadas.
  // El usuario debe pasar por Resultados para ejecutar la lógica de recomendación.
  if (!hayResultados) {
    return (
      <EstadoRuta
        icono="bi-bar-chart"
        titulo="Todavía no tenés resultados"
        descripcion="Tus respuestas ya están guardadas. Visitá Resultados para generar las carreras recomendadas antes de continuar con Mi Ruta."
        destino="/resultados"
        textoBoton="Ver Resultados"
      />
    );
  }

  // Estado 4: existen resultados pero careerpath_learning_route todavía no contiene una ruta válida.
  // Se ofrece volver a Resultados porque esa página es la encargada de generar la ruta.
  if (!hayRuta) {
    return (
      <EstadoRuta
        icono="bi-signpost-split"
        titulo="Tu ruta todavía no está disponible"
        descripcion="Ya tenés resultados, pero todavía no se pudo generar una ruta de aprendizaje. Volvé a Resultados para completar este paso."
        destino="/resultados"
        textoBoton="Volver a Resultados"
      />
    );
  }

  // Estado final: el usuario tiene sesión, Test, Resultados y una ruta válida.
  // A partir de este punto se muestra la carrera recomendada, sus etapas y el progreso del usuario.
  return (
    <section className="bg-light py-5">
      <div className="container">
        <header className="mb-5 cp-fade-up">
          <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2 cp-soft-badge">
            <i className="bi bi-signpost-split me-2"></i>
            Ruta personalizada
          </span>

          <h1 className="display-5 fw-bold mb-3">
            Mi ruta de aprendizaje
          </h1>

          <p
            className="lead text-secondary mb-0"
            style={{ maxWidth: "850px" }}
          >
            Hola {activeUser.nombre}. Esta ruta fue
            generada a partir de tu perfil, tus
            respuestas del test y tus resultados.
            Marcá cada tema a medida que avances.
          </p>
        </header>

        <section className="card border-0 shadow-sm rounded-4 mb-5 cp-fade-up">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-7">
                <p className="text-primary fw-semibold mb-2">
                  <i className="bi bi-mortarboard me-2"></i>
                  Carrera recomendada
                </p>

                <h2 className="h3 fw-bold mb-3">
                  {learningRoute.careerTitle ||
                    "Ruta de aprendizaje personalizada"}
                </h2>

                <p className="text-secondary mb-4">
                  Esta ruta organiza los conocimientos
                  recomendados para que puedas avanzar
                  progresivamente dentro del área
                  relacionada con tu resultado vocacional.
                </p>

                <div className="d-flex flex-wrap gap-2">
                  {learningRoute.level && (
                    <span className="badge rounded-pill text-bg-light border px-3 py-2">
                      <i className="bi bi-book me-2"></i>
                      {learningRoute.level}
                    </span>
                  )}

                  {learningRoute.duration && (
                    <span className="badge rounded-pill text-bg-light border px-3 py-2">
                      <i className="bi bi-clock me-2"></i>
                      {learningRoute.duration}
                    </span>
                  )}

                  <span className="badge rounded-pill text-bg-light border px-3 py-2">
                    <i className="bi bi-list-check me-2"></i>
                    {totalTemas} temas
                  </span>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className="p-4 bg-body-tertiary rounded-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">
                      Progreso general
                    </span>

                    <strong className="text-primary">
                      {porcentaje}%
                    </strong>
                  </div>

                  <div
                    className="progress mb-3"
                    style={{ height: "12px" }}
                  >
                    <div
                      className={`progress-bar ${
                        porcentaje === 100
                          ? "bg-success"
                          : "bg-primary"
                      }`}
                      role="progressbar"
                      style={{
                        width: `${porcentaje}%`,
                      }}
                      aria-label="Progreso general de la ruta"
                      aria-valuenow={porcentaje}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <p className="small text-secondary mb-4">
                    {cantidadCompletados} de{" "}
                    {totalTemas} temas completados
                  </p>

                  <div className="row g-3 text-center">
                    <div className="col-4">
                      <div className="bg-white rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-success">
                          {cantidadCompletados}
                        </strong>

                        <small className="text-secondary">
                          Completados
                        </small>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="bg-white rounded-3 p-3 h-100">
                        <strong className="d-block fs-4">
                          {cantidadPendientes}
                        </strong>

                        <small className="text-secondary">
                          Pendientes
                        </small>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="bg-white rounded-3 p-3 h-100">
                        <strong className="d-block fs-4 text-primary">
                          {porcentaje}%
                        </strong>

                        <small className="text-secondary">
                          Avance
                        </small>
                      </div>
                    </div>
                  </div>

                  {porcentaje === 100 && (
                    <div
                      className="alert alert-success mt-4 mb-0"
                      role="alert"
                    >
                      <i className="bi bi-trophy-fill me-2"></i>
                      ¡Completaste todos los temas de tu ruta!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <div className="mb-4 cp-fade-up">
            <span className="badge rounded-pill text-bg-primary mb-3 px-3 py-2">
              <i className="bi bi-map me-2"></i>
              Tu recorrido
            </span>

            <h2 className="h3 fw-bold mb-2">
              Etapas de aprendizaje
            </h2>

            <p className="text-secondary mb-0">
              Las etapas fueron generadas a partir de
              la recomendación obtenida en tus
              resultados.
            </p>
          </div>

          {etapas.map((etapa, index) => (
            <RouteStep
              key={etapa.id}
              etapa={etapa}
              temasCompletados={temasCompletados}
              onToggleTema={toggleTema}
              abiertoInicial={index === 0}
            />
          ))}
        </section>

        <section className="card border-0 shadow-sm rounded-4 cp-fade-up">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-8">
                <p className="text-primary fw-semibold mb-2">
                  <i className="bi bi-lightbulb me-2"></i>
                  Seguimiento
                </p>

                <h2 className="h4 fw-bold mb-2">
                  Tu progreso queda guardado
                </h2>

                <p className="text-secondary mb-0">
                  Los temas que marques como
                  completados quedan almacenados para
                  tu usuario y esta carrera, por lo que
                  podés continuar más adelante desde
                  donde lo dejaste.
                </p>
              </div>

              <div className="col-12 col-lg-4 text-lg-end">
                <Link
                  to="/resultados"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4 cp-btn-animated"
                >
                  <i className="bi bi-arrow-left-circle me-2"></i>
                  Ver mis resultados
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Ruta;