import cohortes from '@/data/cohortes.json';

// Explicit cohort routing takes priority over historical name heuristics.
export function registeredCourseKey(curso, edicion) {
  return cohortes.find(c => c.curso === curso && c.edicion === edicion)?.courseKey ?? null;
}
