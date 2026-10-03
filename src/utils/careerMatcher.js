const normalizeText = (value) =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getCareerSearchText = (career) => {
  const planSubjects =
    career.planEstudios
      ?.flatMap((level) => level.materias ?? [])
      .join(" ") ?? "";

  return normalizeText(
    [
      career.id,
      career.titulo,
      career.area,
      career.subtipo,
      career.duracion,
      career.modalidad,
      career.descripcion,
      career.facultades?.join(" "),
      career.planNombre,
      planSubjects,
    ].join(" ")
  );
};

const areaKeywords = {
  programacion: [
    "programacion",
    "software",
    "sistemas",
    "computacion",
    "informatica",
    "algoritmos",
    "datos",
    "web",
    "base de datos",
  ],
  industrial: [
    "industrial",
    "produccion",
    "procesos",
    "gestion",
    "organizacion",
    "calidad",
    "costos",
    "mantenimiento",
  ],
  civil: [
    "civil",
    "construccion",
    "estructuras",
    "hidraulica",
    "infraestructura",
    "obra",
    "materiales",
  ],
  mecanica: [
    "mecanica",
    "maquinas",
    "energia",
    "motores",
    "termodinamica",
    "manufactura",
    "mantenimiento",
  ],
  salud: [
    "bioingenieria",
    "biologia",
    "salud",
    "medicina",
    "biomedica",
    "hospitalaria",
    "anatomia",
    "fisiologia",
  ],
  quimica: [
    "quimica",
    "procesos quimicos",
    "laboratorio",
    "materiales",
    "alimentos",
    "ambiental",
  ],
  electronica: [
    "electronica",
    "control",
    "circuitos",
    "senales",
    "sensores",
    "electrotecnia",
    "comunicaciones",
  ],
};

export function getCareerRecommendations({
  careers,
  user = null,
  answers = [],
  limit = 4,
}) {
  const answerAreas = answers.flatMap((answer) => answer.areas ?? []);
  const answerKeywords = answers.flatMap((answer) => answer.keywords ?? []);

  const userKeywords = [
    ...(user?.intereses ?? []),
    ...(user?.habilidades ?? []),
    ...(user?.palabrasClaveVocacionales ?? []),
  ];

  const directKeywords = [...answerKeywords, ...userKeywords].map(normalizeText);

  const scoredCareers = careers.map((career) => {
    const searchText = getCareerSearchText(career);
    let score = 0;
    const matchedReasons = [];

    directKeywords.forEach((keyword) => {
      if (keyword && searchText.includes(keyword)) {
        score += 4;
        matchedReasons.push(keyword);
      }
    });

    answerAreas.forEach((area) => {
      const keywords = areaKeywords[area] ?? [];

      keywords.forEach((keyword) => {
        if (searchText.includes(normalizeText(keyword))) {
          score += 2;
          matchedReasons.push(keyword);
        }
      });
    });

    if (career.planEstudios?.length > 0) {
      score += 1;
    }

    return {
      ...career,
      score,
      matchedReasons: [...new Set(matchedReasons)].slice(0, 5),
    };
  });

  return scoredCareers
    .filter((career) => career.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}