const topicsByArea = {
    programacion: [
        { title: "Etapa 1 - Fundamentos", subjects: ["Algoritmos", "Lógica de programación", "HTML y CSS", "Git y GitHub"] },
        { title: "Etapa 2 - Desarrollo", subjects: ["JavaScript", "Bases de datos", "Programación Backend", "APIs"] },
        { title: "Etapa 3 - Especialización", subjects: ["Inteligencia artificial", "Desarrollo web", "Desarrollo de aplicaciones", "Cloud Computing"] },
    ],
    electronica: [
        { title: "Etapa 1 - Fundamentos", subjects: ["Electrotecnia", "Circuitos básicos", "Física aplicada", "Sistemas digitales"] },
        { title: "Etapa 2 - Desarrollo", subjects: ["Microcontroladores", "Señales y sistemas", "Automatización", "Comunicaciones"] },
        { title: "Etapa 3 - Especialización", subjects: ["Control de procesos", "Telecomunicaciones", "Robótica", "IoT"] },
    ],
    civil: [
        { title: "Etapa 1 - Fundamentos", subjects: ["Matemática aplicada", "Física estructural", "Dibujo técnico", "Materiales de construcción"] },
        { title: "Etapa 2 - Desarrollo", subjects: ["Cálculo de estructuras", "Hidráulica", "Topografía", "Hormigón armado"] },
        { title: "Etapa 3 - Especialización", subjects: ["Infraestructura vial", "Gestión de obras", "Sismorresistencia", "Proyectos urbanos"] },
    ],
    mecanica: [
        { title: "Etapa 1 - Fundamentos", subjects: ["Mecánica racional", "Termodinámica", "Dibujo técnico", "Resistencia de materiales"] },
        { title: "Etapa 2 - Desarrollo", subjects: ["Máquinas térmicas", "Hidráulica y neumática", "Diseño mecánico", "Procesos de fabricación"] },
        { title: "Etapa 3 - Especialización", subjects: ["Mantenimiento industrial", "Automatización", "Energías renovables", "Control de calidad"] },
    ],
    industrial: [
        { title: "Etapa 1 - Fundamentos", subjects: ["Gestión de procesos", "Estadística aplicada", "Organización industrial", "Seguridad laboral"] },
        { title: "Etapa 2 - Desarrollo", subjects: ["Control de calidad", "Logística", "Costos industriales", "Planeamiento de producción"] },
        { title: "Etapa 3 - Especialización", subjects: ["Gestión de proyectos", "Mejora continua", "Mantenimiento industrial", "Sustentabilidad"] },
    ],
};

const defaultTopics = [
    { title: "Etapa 1 - Fundamentos", subjects: ["Conceptos básicos del área elegida"] },
    { title: "Etapa 2 - Desarrollo", subjects: ["Profundización práctica"] },
    { title: "Etapa 3 - Especialización", subjects: ["Orientación y especialización final"] },
];

export function buildLearningRouteFromCareer(career, dominantArea) {
    if (!career) return null;

    const topics = topicsByArea[dominantArea] ?? defaultTopics;

    return {
        careerId: career.id,
        careerTitle: career.nombre,
        level: career.tipo,
        duration: career.duracion ?? "No especificada",
        steps: topics.map((etapa, index) => ({
            id: `${career.id}-${index + 1}`,
            title: etapa.title,
            description: `Temas sugeridos para avanzar en ${career.nombre}.`,
            subjects: etapa.subjects,
            completed: false,
        })),
    };
}