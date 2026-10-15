const topicsByArea = {
  programacion: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Lógica de programación",
        "Algoritmos",
        "Estructuras de datos",
        "Git y GitHub",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Programación orientada a objetos",
        "Bases de datos",
        "Desarrollo web",
        "APIs",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Inteligencia artificial",
        "Ciencia de datos",
        "Cloud Computing",
        "Arquitectura de software",
      ],
    },
  ],

  electronica: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Electrotecnia",
        "Circuitos eléctricos",
        "Física aplicada",
        "Sistemas digitales",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Electrónica aplicada",
        "Microcontroladores",
        "Señales y sistemas",
        "Automatización",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Sistemas de control",
        "Robótica",
        "Telecomunicaciones",
        "Internet de las cosas",
      ],
    },
  ],

  civil: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Matemática aplicada",
        "Física",
        "Sistemas de representación",
        "Materiales de construcción",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Resistencia de materiales",
        "Topografía",
        "Hidráulica",
        "Tecnología de la construcción",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Estructuras",
        "Infraestructura vial",
        "Gestión de obras",
        "Planeamiento urbano",
      ],
    },
  ],

  industrial: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Organización industrial",
        "Estadística aplicada",
        "Economía",
        "Gestión de procesos",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Planificación de la producción",
        "Control de calidad",
        "Investigación operativa",
        "Costos industriales",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Gestión de proyectos",
        "Mejora continua",
        "Logística",
        "Gestión empresarial",
      ],
    },
  ],

  mecanica: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Mecánica",
        "Termodinámica",
        "Sistemas de representación",
        "Materiales",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Diseño mecánico",
        "Mecánica de fluidos",
        "Elementos de máquinas",
        "Procesos de fabricación",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Automatización",
        "Mantenimiento industrial",
        "Máquinas térmicas",
        "Diseño y simulación",
      ],
    },
  ],

  quimica: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Química general",
        "Física",
        "Matemática aplicada",
        "Laboratorio",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Química orgánica",
        "Termodinámica",
        "Balance de masa y energía",
        "Fenómenos de transporte",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Procesos industriales",
        "Ingeniería ambiental",
        "Control de procesos",
        "Biotecnología",
      ],
    },
  ],

  salud: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Biología",
        "Anatomía",
        "Física aplicada",
        "Programación básica",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Fisiología",
        "Bioinstrumentación",
        "Electrónica biomédica",
        "Procesamiento de señales",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Tecnología hospitalaria",
        "Bioimágenes",
        "Biomecánica",
        "Ingeniería en rehabilitación",
      ],
    },
  ],

  energia: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Física",
        "Electrotecnia",
        "Termodinámica",
        "Matemática aplicada",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Generación eléctrica",
        "Máquinas eléctricas",
        "Energías renovables",
        "Eficiencia energética",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Energía solar",
        "Energía eólica",
        "Sistemas eléctricos",
        "Gestión energética",
      ],
    },
  ],

  logistica: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Administración",
        "Estadística",
        "Economía",
        "Organización empresarial",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Gestión de inventarios",
        "Distribución",
        "Planificación",
        "Costos logísticos",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Cadena de suministro",
        "Comercio exterior",
        "Logística internacional",
        "Optimización de operaciones",
      ],
    },
  ],

  movilidad: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Física aplicada",
        "Mecánica",
        "Materiales",
        "Sistemas de representación",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Sistemas de transporte",
        "Motores",
        "Estructuras",
        "Electrónica aplicada",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Industria automotriz",
        "Tecnología ferroviaria",
        "Sistemas aeroespaciales",
        "Transporte inteligente",
      ],
    },
  ],

  materiales: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Química",
        "Física",
        "Ciencia de materiales",
        "Sistemas de representación",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Ensayos de materiales",
        "Procesos de fabricación",
        "Metalurgia",
        "Tratamientos térmicos",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Materiales avanzados",
        "Control de calidad",
        "Reciclado",
        "Tecnologías de fabricación",
      ],
    },
  ],

  seguridad: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Seguridad laboral",
        "Higiene industrial",
        "Química",
        "Física",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Prevención de riesgos",
        "Ergonomía",
        "Medicina laboral",
        "Legislación",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Gestión de seguridad",
        "Evaluación de riesgos",
        "Seguridad industrial",
        "Gestión ambiental",
      ],
    },
  ],

  videojuegos: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Lógica de programación",
        "Diseño de juegos",
        "Arte digital",
        "Programación básica",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Programación de videojuegos",
        "Motores de desarrollo",
        "Arte 2D y 3D",
        "Audio interactivo",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Game Design",
        "Technical Art",
        "Producción de videojuegos",
        "Desarrollo de proyectos",
      ],
    },
  ],

  alimentos: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Química",
        "Biología",
        "Matemática",
        "Producción",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Procesos productivos",
        "Control de calidad",
        "Microbiología",
        "Gestión de recursos",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Producción alimentaria",
        "Industria pesquera",
        "Administración rural",
        "Sustentabilidad",
      ],
    },
  ],

  ambiente: [
    {
      title: "Etapa 1 - Fundamentos",
      subjects: [
        "Ecología",
        "Química ambiental",
        "Recursos naturales",
        "Estadística",
      ],
    },
    {
      title: "Etapa 2 - Desarrollo",
      subjects: [
        "Gestión ambiental",
        "Evaluación de impacto",
        "Tratamiento de residuos",
        "Energías sustentables",
      ],
    },
    {
      title: "Etapa 3 - Especialización",
      subjects: [
        "Desarrollo sostenible",
        "Gestión de recursos",
        "Eficiencia energética",
        "Tecnologías ambientales",
      ],
    },
  ],
};

const defaultTopics = [
  {
    title: "Etapa 1 - Fundamentos",
    subjects: [
      "Conceptos básicos del área",
      "Introducción a la carrera",
      "Herramientas fundamentales",
    ],
  },
  {
    title: "Etapa 2 - Desarrollo",
    subjects: [
      "Aplicación práctica",
      "Resolución de problemas",
      "Desarrollo de conocimientos técnicos",
    ],
  },
  {
    title: "Etapa 3 - Especialización",
    subjects: [
      "Orientación profesional",
      "Especialización",
      "Proyecto aplicado",
    ],
  },
];

const getCareerTitle = (career) =>
  career?.titulo ?? career?.nombre ?? "Carrera UTN";

export function buildLearningRouteFromCareer(career, dominantArea) {
  if (!career) {
    return null;
  }

  const careerTitle = getCareerTitle(career);
  const topics = topicsByArea[dominantArea] ?? defaultTopics;

  return {
    careerId: career.id,
    careerTitle,
    level: career.subtipo ?? career.tipo ?? career.area ?? "Carrera UTN",
    duration: career.duracion ?? "No especificada",
    dominantArea: dominantArea ?? "general",
    steps: topics.map((stage, index) => ({
      id: `${career.id}-${index + 1}`,
      title: stage.title,
      description: `Temas sugeridos para avanzar en ${careerTitle}.`,
      subjects: stage.subjects,
      completed: false,
    })),
  };
}