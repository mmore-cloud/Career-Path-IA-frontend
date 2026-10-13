const normalizeText = (value) =>
    String(value ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

const getCareerSearchText = (career) =>
    normalizeText(
        [career.nombre, career.tipo, career.area, career.duracion, career.descripcion].join(" ")
    );

const areaKeywords = {
    programacion: ["programacion", "software", "sistemas", "computacion", "informatica", "algoritmos", "datos", "web"],
    industrial: ["industrial", "produccion", "procesos", "gestion", "organizacion", "calidad", "costos", "mantenimiento", "logistica"],
    civil: ["civil", "construccion", "estructuras", "hidraulica", "infraestructura", "obra", "materiales"],
    mecanica: ["mecanica", "maquinas", "energia", "motores", "termodinamica", "manufactura", "mantenimiento"],
    salud: ["bioingenieria", "biologia", "salud", "medicina", "biomedica", "hospitalaria"],
    quimica: ["quimica", "procesos quimicos", "laboratorio", "materiales", "ambiental"],
    electronica: ["electronica", "control", "circuitos", "senales", "sensores", "electrotecnia", "comunicaciones", "telecomunicaciones"],
};

export function getCareerRecommendations({ careers, user = null, answers = [], limit = 4 }) {
    const answerAreas = answers.flatMap((answer) => answer.areas ?? []);
    const answerKeywords = answers.flatMap((answer) => answer.keywords ?? []);
    const userKeywords = [...(user?.intereses ?? []), ...(user?.habilidades ?? [])];
    const directKeywords = [...answerKeywords, ...userKeywords].map(normalizeText);

    const scoredCareers = careers.map((career) => {
        const searchText = getCareerSearchText(career);
        let score = 0;
        const matchedReasons = [];

        directKeywords.forEach((keyword) => {
            if (keyword && searchText.includes(keyword)) {
                score += 3;
                matchedReasons.push(keyword);
            }
        });

        answerAreas.forEach((areaKey) => {
            (areaKeywords[areaKey] ?? []).forEach((keyword) => {
                if (searchText.includes(normalizeText(keyword))) {
                    score += 2;
                    matchedReasons.push(keyword);
                }
            });
        });

        return { ...career, score, matchedReasons: [...new Set(matchedReasons)].slice(0, 5) };
    });

    return scoredCareers
        .filter((career) => career.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

export function getDominantArea(answers = []) {
    const counts = {};
    answers.flatMap((answer) => answer.areas ?? []).forEach((area) => {
        counts[area] = (counts[area] ?? 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
}