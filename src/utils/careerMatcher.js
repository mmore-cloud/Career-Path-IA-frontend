const normalizeText = (value) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const unique = (values) => [...new Set(values.filter(Boolean))];

const countValues = (values) =>
  values.reduce((counts, value) => {
    const normalizedValue = normalizeText(value);

    if (!normalizedValue) {
      return counts;
    }

    counts[normalizedValue] = (counts[normalizedValue] ?? 0) + 1;
    return counts;
  }, {});

const sortCounts = (counts) =>
  Object.entries(counts).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

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
    "videojuegos",
    "inteligencia artificial",
  ],
  electronica: [
    "electronica",
    "electricidad",
    "control",
    "circuitos",
    "senales",
    "sensores",
    "electrotecnia",
    "comunicaciones",
    "telecomunicaciones",
    "automatizacion",
    "robotica",
    "mecatronica",
  ],
  civil: [
    "civil",
    "construccion",
    "estructuras",
    "hidraulica",
    "infraestructura",
    "obra",
    "urbanismo",
    "ciudades",
    "territorio",
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
    "manufactura",
  ],
  mecanica: [
    "mecanica",
    "maquinas",
    "motores",
    "termodinamica",
    "manufactura",
    "mantenimiento",
    "automotriz",
    "vehiculos",
  ],
  quimica: [
    "quimica",
    "procesos quimicos",
    "laboratorio",
    "materiales",
    "petroquimica",
    "alimentos",
  ],
  salud: [
    "bioingenieria",
    "biologia",
    "salud",
    "biomedica",
    "hospitalaria",
    "rehabilitacion",
    "bioimagenes",
  ],
  energia: [
    "energia",
    "energias renovables",
    "solar",
    "electrica",
    "generacion",
    "eficiencia energetica",
    "nuclear",
  ],
  logistica: [
    "logistica",
    "cadena de suministro",
    "transporte",
    "operaciones",
    "distribucion",
    "almacenamiento",
    "administracion",
  ],
  movilidad: [
    "aeroespacial",
    "aeronautica",
    "automotriz",
    "ferroviaria",
    "naval",
    "transporte",
    "vehiculos",
  ],
  materiales: [
    "materiales",
    "metalurgica",
    "metalurgia",
    "textil",
    "fabricacion",
    "ensayos",
  ],
  seguridad: [
    "higiene",
    "seguridad",
    "prevencion",
    "riesgos",
    "salud ocupacional",
  ],
  videojuegos: [
    "videojuegos",
    "multimedia",
    "diseno interactivo",
    "programacion",
    "produccion digital",
  ],
  alimentos: [
    "alimentos",
    "pesquera",
    "pesca",
    "produccion alimentaria",
    "rural",
  ],
  ambiente: [
    "ambiente",
    "ambiental",
    "sustentable",
    "sostenible",
    "recursos naturales",
    "energias renovables",
  ],
};

const occupationAreaRules = {
  programacion: [
    "software",
    "programador",
    "developer",
    "desarrollador",
    "sistemas",
    "datos",
    "data",
    "web",
    "videojuego",
    "multimedia",
  ],
  electronica: [
    "electronico",
    "electronica",
    "electrico",
    "automatizacion",
    "robotica",
    "telecomunicaciones",
    "control",
    "mecatron",
  ],
  civil: [
    "civil",
    "construccion",
    "estructural",
    "obra",
    "infraestructura",
    "urban",
  ],
  industrial: [
    "industrial",
    "produccion",
    "operaciones",
    "calidad",
    "procesos",
    "manufactura",
  ],
  mecanica: [
    "mecanico",
    "mecanica",
    "automotriz",
    "maquinaria",
    "mantenimiento",
    "motor",
  ],
  quimica: [
    "quimico",
    "quimica",
    "laboratorio",
    "materiales",
    "procesos quimicos",
  ],
  salud: [
    "biomed",
    "clinico",
    "salud",
    "medical",
    "hospital",
    "rehabilitacion",
  ],
  energia: [
    "energia",
    "energetico",
    "renovable",
    "solar",
    "electrico",
    "nuclear",
  ],
  logistica: [
    "logistica",
    "supply",
    "cadena de suministro",
    "operaciones",
    "distribucion",
  ],
  movilidad: [
    "aeronaut",
    "aeroespacial",
    "automotriz",
    "ferrovi",
    "naval",
    "transporte",
  ],
  materiales: [
    "materiales",
    "metalurg",
    "textil",
    "fabricacion",
  ],
  seguridad: [
    "seguridad",
    "prevencion",
    "riesgos",
    "higiene",
  ],
  videojuegos: [
    "videojuego",
    "game",
    "multimedia",
    "interactivo",
  ],
  alimentos: [
    "alimentos",
    "alimentario",
    "pesca",
    "pesquero",
    "agricola",
  ],
  ambiente: [
    "ambiental",
    "ambiente",
    "sostenibilidad",
    "sustentable",
    "recursos naturales",
  ],
};

const getCareerSearchText = (career) =>
  normalizeText(
    [
      career?.nombre,
      career?.titulo,
      career?.tipo,
      career?.subtipo,
      career?.area,
      career?.duracion,
      career?.modalidad,
      career?.descripcion,
      career?.planNombre,
      ...(career?.facultades ?? []),
      ...(career?.planEstudios ?? []).flatMap((bloque) => bloque?.materias ?? []),
    ].join(" "),
  );

const getOccupationText = (occupation) =>
  normalizeText(
    [
      occupation?.title,
      occupation?.preferredLabel,
      occupation?.label,
      occupation?.description,
      occupation?.className,
      occupation?._links?.self?.href,
    ].join(" "),
  );

const getUserTerms = (user) => {
  const values = [
    ...(Array.isArray(user?.intereses) ? user.intereses : []),
    ...(Array.isArray(user?.habilidades) ? user.habilidades : []),
  ];

  return values
    .map((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return String(value);
      }

      if (value && typeof value === "object") {
        return (
          value.text ??
          value.texto ??
          value.label ??
          value.nombre ??
          value.value ??
          ""
        );
      }

      return "";
    })
    .filter(Boolean);
};

export function getDominantArea(answers = []) {
  const areaCounts = countValues(
    answers.flatMap((answer) => answer?.areas ?? []),
  );

  const sortedAreas = sortCounts(areaCounts);
  return sortedAreas.length > 0 ? sortedAreas[0][0] : null;
}

export function buildEscoProfile({ answers = [], user = null } = {}) {
  const areaCounts = countValues(
    answers.flatMap((answer) => answer?.areas ?? []),
  );

  const keywordCounts = countValues([
    ...answers.flatMap((answer) => answer?.keywords ?? []),
    ...getUserTerms(user),
  ]);

  const searchTermCounts = countValues(
    answers.flatMap((answer) => answer?.escoTerms ?? []),
  );

  const areas = sortCounts(areaCounts).map(([name, score]) => ({
    name,
    score,
  }));

  const keywords = sortCounts(keywordCounts)
    .slice(0, 15)
    .map(([keyword]) => keyword);

  const searchTerms = sortCounts(searchTermCounts)
    .slice(0, 8)
    .map(([term]) => term);

  return {
    dominantArea: areas[0]?.name ?? null,
    areas,
    keywords,
    searchTerms,
  };
}

export function getEscoSearchTerms({ answers = [], user = null, limit = 6 } = {}) {
  const profile = buildEscoProfile({ answers, user });
  return profile.searchTerms.slice(0, limit);
}

export function getCareerRecommendations({
  careers,
  user = null,
  answers = [],
  limit = 6,
}) {
  const profile = buildEscoProfile({ answers, user });

  const scoredCareers = careers.map((career) => {
    const careerText = getCareerSearchText(career);
    let score = 0;
    const matchedReasons = [];

    profile.keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeText(keyword);

      if (normalizedKeyword && careerText.includes(normalizedKeyword)) {
        score += 3;
        matchedReasons.push(keyword);
      }
    });

    profile.areas.forEach(({ name: areaName, score: areaScore }) => {
      (areaKeywords[areaName] ?? []).forEach((keyword) => {
        if (careerText.includes(normalizeText(keyword))) {
          score += Math.max(1, areaScore * 2);
          matchedReasons.push(keyword);
        }
      });
    });

    return {
      ...career,
      score,
      matchedReasons: unique(matchedReasons).slice(0, 6),
    };
  });

  return scoredCareers
    .filter((career) => career.score > 0)
    .sort((careerA, careerB) => careerB.score - careerA.score)
    .slice(0, limit);
}

export function getAreasFromEscoOccupations(occupations = []) {
  const counts = {};

  occupations.forEach((occupation) => {
    const occupationText = getOccupationText(occupation);

    Object.entries(occupationAreaRules).forEach(([areaName, terms]) => {
      const matches = terms.filter((term) =>
        occupationText.includes(normalizeText(term)),
      ).length;

      if (matches > 0) {
        counts[areaName] = (counts[areaName] ?? 0) + matches;
      }
    });
  });

  return sortCounts(counts).map(([name, score]) => ({
    name,
    score,
  }));
}

export function rankCareersFromEsco({
  careers = [],
  occupations = [],
  answers = [],
  user = null,
  limit = 6,
}) {
  if (!Array.isArray(careers) || careers.length === 0) {
    return [];
  }

  const localProfile = buildEscoProfile({ answers, user });
  const escoAreas = getAreasFromEscoOccupations(occupations);

  if (occupations.length === 0 || escoAreas.length === 0) {
    return getCareerRecommendations({
      careers,
      user,
      answers,
      limit,
    });
  }

  const occupationTexts = occupations.map(getOccupationText);

  const scoredCareers = careers.map((career) => {
    const careerText = getCareerSearchText(career);
    let score = 0;
    const matchedReasons = [];
    const matchedOccupations = [];

    escoAreas.forEach(({ name: areaName, score: areaScore }) => {
      (areaKeywords[areaName] ?? []).forEach((keyword) => {
        if (careerText.includes(normalizeText(keyword))) {
          score += areaScore * 4;
          matchedReasons.push(keyword);
        }
      });
    });

    localProfile.areas.forEach(({ name: areaName, score: areaScore }) => {
      (areaKeywords[areaName] ?? []).forEach((keyword) => {
        if (careerText.includes(normalizeText(keyword))) {
          score += areaScore;
        }
      });
    });

    occupationTexts.forEach((occupationText, index) => {
      const careerWords = careerText
        .split(/\s+/)
        .filter((word) => word.length >= 5);

      const overlap = careerWords.filter((word) =>
        occupationText.includes(word),
      ).length;

      if (overlap > 0) {
        score += overlap * 3;

        const occupation = occupations[index];
        matchedOccupations.push(
          occupation?.title ??
            occupation?.preferredLabel ??
            occupation?.label ??
            "Ocupación relacionada",
        );
      }
    });

    return {
      ...career,
      score,
      matchedReasons: unique(matchedReasons).slice(0, 6),
      matchedOccupations: unique(matchedOccupations).slice(0, 4),
    };
  });

  const rankedCareers = scoredCareers
    .filter((career) => career.score > 0)
    .sort((careerA, careerB) => careerB.score - careerA.score)
    .slice(0, limit);

  if (rankedCareers.length > 0) {
    return rankedCareers;
  }

  return getCareerRecommendations({
    careers,
    user,
    answers,
    limit,
  });
}
