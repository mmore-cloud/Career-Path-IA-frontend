export const routeObjective = {
  titulo: "Desarrollo de Software",
  descripcion:
    "Construir una base sólida en programación y avanzar progresivamente hacia el desarrollo web, aplicaciones, backend e Inteligencia Artificial.",
};

export const routeTopics = [
  {
    id: "fundamentos",
    numero: "01",
    titulo: "Fundamentos",
    descripcion:
      "Empezá por los conceptos esenciales para comprender cómo funciona la programación y cómo se organiza un proyecto.",
    temas: [
      {
        id: "algoritmos",
        nombre: "Algoritmos",
      },
      {
        id: "logica",
        nombre: "Lógica de programación",
      },
      {
        id: "html-css",
        nombre: "HTML y CSS",
      },
      {
        id: "git",
        nombre: "Git y GitHub",
      },
    ],
  },

  {
    id: "desarrollo",
    numero: "02",
    titulo: "Desarrollo",
    descripcion:
      "Avanzá hacia herramientas que permiten crear aplicaciones, trabajar con información y conectar diferentes partes de un sistema.",
    temas: [
      {
        id: "javascript",
        nombre: "JavaScript",
      },
      {
        id: "base-datos",
        nombre: "Bases de datos",
      },
      {
        id: "backend",
        nombre: "Programación Backend",
      },
      {
        id: "api",
        nombre: "APIs",
      },
    ],
  },

  {
    id: "especializacion",
    numero: "03",
    titulo: "Especialización",
    descripcion:
      "Explorá diferentes áreas tecnológicas y descubrí cuáles se relacionan mejor con el perfil profesional que querés construir.",
    temas: [
      {
        id: "ia",
        nombre: "Inteligencia Artificial",
      },
      {
        id: "web",
        nombre: "Desarrollo web",
      },
      {
        id: "aplicaciones",
        nombre: "Desarrollo de aplicaciones",
      },
      {
        id: "cloud",
        nombre: "Cloud Computing",
      },
    ],
  },
];

export const recommendedTopics = [
  "HTML y CSS",
  "JavaScript",
  "Bases de datos",
  "Git y GitHub",
  "Inteligencia Artificial",
  "APIs",
  "Backend",
];

export const routeStorageKeys = {
  activeUser: "careerpath_active_user_id",
  users: "careerpath_users",
  testAnswers: "careerpath_test_answers",
  recommendedCareers: "careerpath_recommended_careers",
  learningRoute: "careerpath_learning_route",
  routeProgress: "careerpath_route_progress",
};


const crearSlug = (texto = "") =>
  String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");


export function adaptarRutaAprendizaje(learningRoute) {
  if (!learningRoute || !Array.isArray(learningRoute.steps)) {
    return [];
  }

  return learningRoute.steps.map((step, stepIndex) => {
    const stepId =
      step.id ||
      `etapa-${stepIndex + 1}`;

    const subjects = Array.isArray(step.subjects)
      ? step.subjects
      : [];

    const tituloEtapa =
      step.title ||
      `Etapa ${stepIndex + 1}`;

    const descripcionEtapa =
      step.description ||
      "Temas recomendados para continuar avanzando en tu ruta.";

    const temas = subjects.map((subject, subjectIndex) => {
      const nombre =
        typeof subject === "string"
          ? subject
          : subject?.nombre ||
            subject?.title ||
            `Tema ${subjectIndex + 1}`;

      const slug =
        crearSlug(nombre) ||
        `tema-${subjectIndex + 1}`;

      return {
        id: `${stepId}-${slug}`,
        nombre,
      };
    });

    return {
      id: stepId,
      numero: String(stepIndex + 1).padStart(2, "0"),
      titulo: tituloEtapa,
      descripcion: descripcionEtapa,
      temas,
    };
  });
}


export function obtenerCantidadTemas(etapas = []) {
  return etapas.reduce(
    (total, etapa) =>
      total +
      (Array.isArray(etapa.temas)
        ? etapa.temas.length
        : 0),
    0,
  );
}


export function obtenerIdsTemas(etapas = []) {
  return etapas.flatMap((etapa) =>
    Array.isArray(etapa.temas)
      ? etapa.temas.map((tema) => tema.id)
      : [],
  );
}