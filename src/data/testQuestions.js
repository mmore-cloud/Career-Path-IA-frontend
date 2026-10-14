export const questions = [
  {
    id: 1,
    text: "Cuando pensás en tu futuro, ¿qué tipo de actividad te entusiasma más?",
    options: [
      {
        text: "Crear soluciones digitales, apps o sistemas que usen otras personas",
        areas: ["programacion"],
        keywords: ["software", "sistemas", "programación", "web", "datos"],
        icon: "bi-laptop",
      },
      {
        text: "Diseñar, probar o mejorar dispositivos, circuitos o equipos tecnológicos",
        areas: ["electronica"],
        keywords: ["electrónica", "control", "circuitos", "sensores", "telecomunicaciones"],
        icon: "bi-cpu",
      },
      {
        text: "Resolver problemas relacionados con obras, estructuras o infraestructura",
        areas: ["civil"],
        keywords: ["civil", "construcción", "estructuras", "obra", "infraestructura"],
        icon: "bi-buildings",
      },
      {
        text: "Organizar procesos, recursos y equipos para que algo funcione mejor",
        areas: ["industrial"],
        keywords: ["industrial", "procesos", "producción", "gestión", "calidad"],
        icon: "bi-gear-wide-connected",
      },
    ],
  },
  {
    id: 2,
    text: "¿Qué forma de resolver problemas se parece más a vos?",
    options: [
      {
        text: "Analizar información, detectar patrones y proponer una solución lógica",
        areas: ["programacion"],
        keywords: ["datos", "algoritmos", "informática", "computación", "software"],
        icon: "bi-bar-chart",
      },
      {
        text: "Investigar cómo funciona un sistema técnico y encontrar la falla",
        areas: ["electronica", "mecanica"],
        keywords: ["control", "mantenimiento", "máquinas", "electrónica", "mecánica"],
        icon: "bi-tools",
      },
      {
        text: "Calcular, planificar y verificar que una solución sea segura",
        areas: ["civil", "quimica"],
        keywords: ["cálculo", "materiales", "seguridad", "química", "estructuras"],
        icon: "bi-rulers",
      },
      {
        text: "Ordenar tareas, medir resultados y mejorar la eficiencia",
        areas: ["industrial"],
        keywords: ["organización", "logística", "costos", "calidad", "producción"],
        icon: "bi-diagram-3",
      },
    ],
  },
  {
    id: 3,
    text: "¿Qué tipo de proyecto te gustaría liderar?",
    options: [
      {
        text: "Una app o sistema web para gestionar información",
        areas: ["programacion"],
        keywords: ["app", "sistema web", "software", "información", "programación"],
        icon: "bi-browser-edge",
      },
      {
        text: "Una red de telecomunicaciones o sistema de control",
        areas: ["electronica"],
        keywords: ["telecomunicaciones", "control", "redes", "señales", "electrónica"],
        icon: "bi-broadcast-pin",
      },
      {
        text: "La construcción de un edificio, puente u obra pública",
        areas: ["civil"],
        keywords: ["edificio", "puente", "obra", "construcción", "infraestructura"],
        icon: "bi-buildings",
      },
      {
        text: "Una línea de producción o planta industrial",
        areas: ["industrial", "mecanica"],
        keywords: ["producción", "planta industrial", "procesos", "mecánica", "industria"],
        icon: "bi-building-gear",
      },
    ],
  },
  {
    id: 4,
    text: "¿Qué materia o actividad te resultaba más natural aprender?",
    options: [
      {
        text: "Informática, lógica, programación o análisis de datos",
        areas: ["programacion"],
        keywords: ["informática", "lógica", "programación", "datos", "computación"],
        icon: "bi-pc-display",
      },
      {
        text: "Física, electricidad, electrónica o funcionamiento de equipos",
        areas: ["electronica", "mecanica"],
        keywords: ["física", "electricidad", "electrónica", "mecánica", "equipos"],
        icon: "bi-lightning-charge",
      },
      {
        text: "Matemática aplicada, dibujo técnico o diseño de estructuras",
        areas: ["civil"],
        keywords: ["matemática", "dibujo técnico", "estructuras", "civil", "materiales"],
        icon: "bi-calculator",
      },
      {
        text: "Administración, organización, economía o procesos productivos",
        areas: ["industrial"],
        keywords: ["administración", "economía", "procesos", "industrial", "organización"],
        icon: "bi-clipboard-data",
      },
    ],
  },
  {
    id: 5,
    text: "¿Qué valor te gustaría que tenga tu trabajo?",
    options: [
      {
        text: "Crear herramientas útiles, innovadoras y accesibles",
        areas: ["programacion"],
        keywords: ["innovación", "software", "herramientas", "tecnología", "accesibilidad"],
        icon: "bi-stars",
      },
      {
        text: "Diseñar soluciones técnicas confiables y precisas",
        areas: ["electronica", "mecanica"],
        keywords: ["diseño", "control", "precisión", "sistemas", "equipos"],
        icon: "bi-bullseye",
      },
      {
        text: "Aportar al desarrollo de ciudades, obras o espacios seguros",
        areas: ["civil"],
        keywords: ["ciudades", "obras", "seguridad", "infraestructura", "construcción"],
        icon: "bi-house-check",
      },
      {
        text: "Mejorar la calidad, los tiempos y la organización de un proceso",
        areas: ["industrial"],
        keywords: ["calidad", "tiempos", "organización", "procesos", "gestión"],
        icon: "bi-graph-up-arrow",
      },
    ],
  },
  {
    id: 6,
    text: "¿En qué ambiente te imaginás trabajando con más comodidad?",
    options: [
      {
        text: "En una oficina, startup o equipo de desarrollo tecnológico",
        areas: ["programacion"],
        keywords: ["desarrollo", "tecnología", "software", "web", "startup"],
        icon: "bi-building",
      },
      {
        text: "En un laboratorio, taller técnico o área de mantenimiento",
        areas: ["electronica", "mecanica"],
        keywords: ["laboratorio", "taller", "mantenimiento", "electrónica", "mecánica"],
        icon: "bi-wrench-adjustable",
      },
      {
        text: "En obra, campo, relevamiento o diseño de infraestructura",
        areas: ["civil"],
        keywords: ["obra", "campo", "relevamiento", "infraestructura", "civil"],
        icon: "bi-cone-striped",
      },
      {
        text: "En una empresa, planta, área de calidad o logística",
        areas: ["industrial"],
        keywords: ["empresa", "planta", "calidad", "logística", "producción"],
        icon: "bi-box-seam",
      },
    ],
  },
  {
    id: 7,
    text: "Cuando tenés que tomar una decisión importante, ¿qué hacés primero?",
    options: [
      {
        text: "Busco datos, comparo opciones y pruebo soluciones",
        areas: ["programacion"],
        keywords: ["datos", "análisis", "comparar", "soluciones", "sistemas"],
        icon: "bi-search",
      },
      {
        text: "Reviso cómo funciona cada parte del sistema",
        areas: ["electronica", "mecanica"],
        keywords: ["sistema", "funcionamiento", "control", "equipos", "mecánica"],
        icon: "bi-sliders",
      },
      {
        text: "Evalúo riesgos, materiales y condiciones del entorno",
        areas: ["civil", "quimica"],
        keywords: ["riesgos", "materiales", "entorno", "seguridad", "química"],
        icon: "bi-shield-check",
      },
      {
        text: "Organizo prioridades, tiempos y recursos disponibles",
        areas: ["industrial"],
        keywords: ["prioridades", "tiempos", "recursos", "gestión", "organización"],
        icon: "bi-calendar-check",
      },
    ],
  },
  {
    id: 8,
    text: "¿Qué tipo de desafío te motivaría sostener durante varios años de carrera?",
    options: [
      {
        text: "Aprender lenguajes, tecnologías y formas nuevas de programar",
        areas: ["programacion"],
        keywords: ["lenguajes", "tecnologías", "programar", "software", "sistemas"],
        icon: "bi-code-slash",
      },
      {
        text: "Entender equipos complejos, automatización y sistemas de control",
        areas: ["electronica", "mecanica"],
        keywords: ["automatización", "control", "equipos", "electrónica", "mecatrónica"],
        icon: "bi-robot",
      },
      {
        text: "Diseñar soluciones físicas que tengan impacto en la sociedad",
        areas: ["civil"],
        keywords: ["diseño", "soluciones físicas", "sociedad", "obra", "infraestructura"],
        icon: "bi-globe-americas",
      },
      {
        text: "Mejorar procesos reales de empresas, industrias o servicios",
        areas: ["industrial"],
        keywords: ["procesos", "empresas", "industrias", "servicios", "logística"],
        icon: "bi-kanban",
      },
    ],
  },
];
