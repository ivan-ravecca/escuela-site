// Ejemplo de uso del componente CourseCard
// Este archivo muestra cómo usar CourseCard con datos de ejemplo

import CourseCard from './CourseCard';
import { Course } from '../../types/assistant';

// Ejemplo 1: Curso inicial presencial
const cursoInicial: Course = {
  id: '1',
  name: 'Introducción a la Programación Web',
  url: 'https://example.com/cursos/intro-programacion',
  description: 'Aprende los fundamentos de la programación web con HTML, CSS y JavaScript. Este curso te dará las bases necesarias para comenzar tu carrera como desarrollador web.',
  duration_hours: 120,
  modality: 'presencial',
  category: 'inicial',
  job_opportunities: ['Desarrollador Junior', 'Maquetador Web', 'Asistente de Programación']
};

// Ejemplo 2: Curso avanzado virtual
const cursoAvanzado: Course = {
  id: '2',
  name: 'React & TypeScript Avanzado',
  url: 'https://example.com/cursos/react-typescript',
  description: 'Domina React con TypeScript, aprende patrones avanzados, optimización de rendimiento, testing y las mejores prácticas para aplicaciones enterprise de gran escala.',
  duration_hours: 240,
  modality: 'virtual',
  category: 'avanzado',
  job_opportunities: ['Desarrollador React Senior', 'Frontend Architect', 'Tech Lead']
};

// Ejemplo 3: Especialización semipresencial
const especializacion: Course = {
  id: '3',
  name: 'Arquitectura de Software y Microservicios',
  url: 'https://example.com/cursos/arquitectura-microservicios',
  description: 'Especialización completa en diseño de arquitecturas escalables, patrones de microservicios, contenedores Docker, Kubernetes y cloud native development con las mejores prácticas de la industria.',
  duration_hours: 400,
  modality: 'semipresencial',
  category: 'especialización',
  job_opportunities: ['Software Architect', 'Solutions Architect', 'DevOps Engineer', 'Cloud Engineer']
};

// Ejemplo 4: Curso sin campos opcionales (minimal)
const cursoMinimal: Course = {
  id: '4',
  name: 'Fundamentos de Bases de Datos',
  url: 'https://example.com/cursos/bases-datos',
};

// Uso en componente
export const CourseCardExamples = () => {
  const handleCourseSelect = (courseId: string) => {
    console.log('Curso seleccionado:', courseId);
  };

  return (
    <div className="p-6 space-y-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Ejemplos de CourseCard</h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Curso Inicial</h3>
        <CourseCard course={cursoInicial} onSelect={handleCourseSelect} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Curso Avanzado</h3>
        <CourseCard course={cursoAvanzado} onSelect={handleCourseSelect} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Especialización</h3>
        <CourseCard course={especializacion} onSelect={handleCourseSelect} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Curso Mínimo</h3>
        <CourseCard course={cursoMinimal} onSelect={handleCourseSelect} />
      </div>
    </div>
  );
};

// Guía de colores utilizados
export const COLOR_GUIDE = {
  categories: {
    inicial: '#10b981 (verde)',
    avanzado: '#3b82f6 (azul)',
    especialización: '#8b5cf6 (morado)',
  },
  modalities: {
    presencial: '#f97316 (naranja)',
    virtual: '#06b6d4 (cyan)',
    semipresencial: '#eab308 (amarillo)',
  },
};

// Formato de duración esperado
export const DURATION_EXAMPLES = {
  '40 horas': '40 horas - 1 mes aprox',
  '120 horas': '120 horas - 3 meses aprox',
  '240 horas': '240 horas - 6 meses aprox',
  '400 horas': '400 horas - 10 meses aprox',
};
