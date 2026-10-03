export function buildLearningRouteFromCareer(career) {
  if (!career) {
    return null;
  }

  return {
    careerId: career.id,
    careerTitle: career.titulo,
    duration: career.duracion ?? "No especificada",
    modality: career.modalidad ?? "No especificada",
    planName: career.planNombre ?? "Plan de estudio",
    planUrl: career.planUrl ?? "",
    facultyOptions: career.facultades ?? [],
    steps:
      career.planEstudios?.map((level, index) => ({
        id: `${career.id}-${index + 1}`,
        title: level.nivel,
        description: `Materias sugeridas para ${level.nivel.toLowerCase()}.`,
        subjects: level.materias ?? [],
        completed: false,
      })) ?? [],
  };
}