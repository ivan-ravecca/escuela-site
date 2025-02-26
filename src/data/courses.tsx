import { CourseInterface, BreadcrumbInterface } from "./interfaces";

const urlParts: BreadcrumbInterface[] = [
  { url: "/", title: "Inicio" },
  { url: "/cursos", title: "Cursos" },
  { url: "/cursos/auxiliar-enfermeria", title: "Auxiliar de Enfermería" },
  {
    url: "/cursos/auxiliar-servicio",
    title: "Auxiliar de Servicio, Ayudante de cocina y Tisanería",
  },
  {
    url: "/cursos/auxiliar-estadisticas-de-salud-registros-medicos",
    title: "Auxiliar de Estadísticas de Salud y Registros Médicos",
  },
  {
    url: "/cursos/auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti",
    title: "Auxiliar de servicio adiestrado en Block Quirúrgico y CTI",
  },
  {
    url: "/cursos/supervision-de-higiene-hospitalaria",
    title: "Supervisión de Higiene Hospitalaria",
  },
  {
    url: "/cursos/economato-y-esterilizacion",
    title: "Economato y Esterilización",
  },
  { url: "/cursos/camillero", title: "Curso de Camillero" },
  { url: "/material", title: "Material" },
  { url: "/bedelia", title: "Bedelía" },
  { url: "/contacto", title: "Contáctanos" },
];

export const breadcrumbParts = urlParts.reduce(
  (acc: { [key: string]: { url: string; title: string } }, { url, title }) => {
    const id = url.split("/").filter(Boolean).pop();
    acc[id ? id : "/"] = { url, title };
    return acc;
  },
  {},
);

const camillero: CourseInterface = {
  path: "/cursos/camillero",
  id: "camillero",
  title: "Camillero",
  term: "Clases online una vez a la semana, duración total es de 3 meses.",
  openRegistration:
    "Ya están abiertas las inscripciones para 2025, consulte por fechas de comienzo.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <strong>Metodología:</strong>
        <ul className="star-list">
          <li>
            Son clases teóricas por plataforma y las clases prácticas se
            realizan mediante simulación clínica en el laboratorio.
          </li>
          <li>
            De regalo podrá acceder al curso de primeros auxilios sin costo.
          </li>
          <li>Materiales en formato digital sin costo.</li>
          <li>Diplomas de ambos cursos sin costo.</li>
        </ul>
      </div>
      <div>
        <strong>Justificación:</strong>
        <ul className="star-list">
          <li>
            El traslado de los pacientes dentro de los servicios asistenciales
            constituye una tarea sumamente importante, para que los usuarios
            sean conducidos a los servicios en forma oportuna y eficaz.{" "}
          </li>
          <li>
            Considerando el estado de salud en que éstos se encuentran, es vital
            contar con trabajadores capacitados que a través de la observación
            oportuna y con el equipamiento adecuado, logren realizar una tarea
            rápida y eficiente enfocada en la de seguridad de los pacientes.
          </li>
        </ul>
      </div>
      <div>
        <strong>Objetivos Generales:</strong>
        <ul className="star-list">
          <li>
            Capacitar al personal camillero en el traslado de pacientes con
            diferentes patologías dentro y fuera de las instituciones de salud.
          </li>
          <li>
            Contribuir a la mejora de la calidad de atención reconociendo las
            responsabilidades de su competencia.
          </li>
        </ul>
      </div>
      <div>
        <strong>Objetivos específicos:</strong>
        <ul className="star-list">
          <li>
            Posibilitar el traslado sin inconvenientes de tiempo y estructura
            edilicia.
          </li>
          <li>
            Enfatizar la importancia del vínculo entre el camillero y el
            paciente y/o familia para garantizar su&nbsp; seguridad.
          </li>
          <li>
            Enseñar el significado del lenguaje y códigos que se usan
            habitualmente en la institución.
          </li>
          <li>
            Aprender sobre las situaciones de emergencia, cuando se requiere una
            evacuación rápida.
          </li>
          <li>Utilizar adecuadamente los medios de transporte disponibles.</li>
        </ul>
      </div>
    </>
  ),
  requirements: [
    "Mayor de 18 años",
    "Secundaria completa",
    "Disponibilidad horaria",
  ],
  curriculum: [
    "Responsabilidad legal, moral y ética",
    "Transporte y movilización",
    "Técnicas de movilización",
    "Movilización del paciente a la orilla de la cama",
    "Traslado en cama, camilla o silla de ruedas. Consideraciones",
    "Movilización de cama a camilla",
    "Entrada y salida de ascensor",
    "Manejo de heridos: movilización, métodos de recogida, método de traslado: individual, de a dos",
    "Posiciones de espera y traslado",
    "Manejo de camillas",
    "Transporte de paciente crítico",
    "Normas de evacuación de cargas",
    "Mecánica Corporal",
    "Seguridad laboral",
    "Riesgo de caídas",
  ],
  images: [
    {
      src: "/images/shop/camillero.jpg",
      alt: "Curso de camillero",
      isActive: true,
    },
  ],
};

const servicioTisaneria: CourseInterface = {
  path: "/cursos/auxiliar-servicio",
  id: "auxiliar-servicio",
  title: "Auxiliar de Servicio, Ayudante de cocina y Tisanería",
  term: "",
  openRegistration: (
    <>
      <p>Nuevo inicio de cursos 2025.</p>
      <p>
        Las inscripciones estan abiertas, curso semi presencial con teóricos por
        plataforma digital. Clínica en el laboratorio equipado como la unidad
        del paciente con modelos anatómicos de simulación.
      </p>
      <p>Prácticas en Hospitales y Policlínicas.</p>
    </>
  ),
  info: (
    <>
      El curso no tiene tope de edad, todos tienen derecho a inscribirse y
      profesionalizarse en el ámbito de la salud. El MEC exige como mínimo la
      edad de 18 años para inscribirse a estos cursos. Se trata de un curso
      corto de unos 6 meses de duración con alta demanda laboral tanto en el
      ámbito público como el privado. Contaran con material teórico y práctico
      actualizado a la más modernas prácticas sanitarias; el material práctico
      ayudará al estudiante a prepararse antes de tener contacto directo con
      pacientes reales en el Hospital de Pando, Hospital Militar y Hospital
      Pereira Rosell. Nuestros jóvenes docentes te ayudarán para que puedas
      desarrollarte durante todo el curso y cultivar las experiencias de
      profesionales en el mejor ambiente para lograr tu profesionalización.
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "Primaria completa.",
    "2 fotocopias de la C.I.",
    "Fotocopia del Carner de Salud",
    "Original de escolaridad de primaria completa.",
    "Copia del libro de matrícula, expedido por la escuela primaria que corresponda.",
    "Pase escolar o certificado de suficiencia escolar.",
    "Cualquier otra constancia de estudio correspondiente a educación secundaria o terciaria habilitada.",
    "Original de constancias provenientes de otros programas especiales, habilitados y autorizados por ANEP.",
    "NOTA: La documentación debe contener firma del director/subdirector y secretario con sus respectivas aclaraciones de firma y cargo. Sello legible.",
    "Tener muchas ganas de aprender y profesionalizarse.",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/auxserv.jpg",
      alt: "Curso de tisanería",
      isActive: true,
    },
  ],
};

const enfermeria: CourseInterface = {
  path: "/cursos/auxiliar-enfermeria",
  id: "auxiliar-enfermeria",
  title: "Auxiliar de Enfermería",
  term: "Con una duración aproximada de 24 meses, este programa intensivo está diseñado para satisfacer la creciente demanda de profesionales cualificados en el sector sanitario, tanto público como privado",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Programa del curso</h4>
      <div>
        <p>
          El curso de enfermería ofrece una oportunidad inclusiva para aquellos
          interesados en ingresar al campo de la salud, sin restricción de edad,
          promoviendo el derecho a la educación y profesionalización.
        </p>
        <p>
          Los estudiantes tendrán acceso a materiales teóricos a través de
          plataformas digitales y a prácticas con tecnología de vanguardia,
          incluyendo laboratorios bien equipados y modelos anatómicos avanzados
          para simulaciones. Esto garantiza una preparación integral antes de
          interactuar con pacientes reales. Además, el cuerpo docente,
          caracterizado por su juventud y dinamismo, proporciona una guía
          constante para el desarrollo de habilidades prácticas y teóricas,
          asegurando una experiencia educativa de calidad y un ambiente propicio
          para la profesionalización en enfermería.
        </p>
        <p>
          <strong>Modalidad:</strong> Consta de 2 ciclos
        </p>
      </div>
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "4to año aprobado sin previas o el equivalente en UTU (sin materias previas).",
    "2 Fotocopia de C.I.",
    "Fotocopia de Carnet de Salud",
    "Original de FÓRMULA 05 (egreso de Bachillerato) ó FÓRMULA 69 con sello CES.",
    "NOTA: La documentación debe contener firma del director/ subdirector y secretario con sus respectivas aclaraciones de firma y cargo. Sello legible",
    "Tener muchas ganas de aprender y profesionalizarse.",
  ],
  curriculum: (
    <>
      <div>
        <strong>Primer ciclo: Anatomía y Fisiología:</strong>
        <ul className="check-list">
          <li>Estadística</li>
          <li>Habilidades Informáticas y Tecnológicas</li>
          <li>Bioética,Valores y Humanización de La Salud</li>
          <li>Microbiología I</li>
          <li>Cuidado nutricional y desarrollo Humano</li>
          <li>Seguridad del Paciente y bioseguridad</li>
          <li>Salud Ambiental</li>
          <li>Salud sexual y reproductiva</li>
          <li>Enfermería 1 (Fundamental, Familiar y Comunitaria)</li>
          <li>Taller/Laboratorio Simulación Práctico</li>
        </ul>
      </div>
      <div>
        <strong>Segundo ciclo - PROCESO SALUD - ENFERMEDAD:</strong>
        <ul className="check-list">
          <li>Anatomía y Fisiología</li>
          <li>Introducción Materno Infantil y Adolescente</li>
          <li>Interculturalidad</li>
          <li>Microbiología II</li>
          <li>Tratamiento Farmacológico</li>
          <li>Salud Mental </li>
          <li>Nutrición</li>
          <li>Educación Para la Salud</li>
          <li>Cuidados Paliativos</li>
          <li>Enfermería II (Adulto, Adulto Mayor)</li>
          <li>Enfermería II (Materno Infantil y Adolescente)</li>
          <li>Segundo nivel de atención</li>
          <li>Simulación Practica</li>
        </ul>
      </div>
    </>
  ),
  images: [
    {
      src: "/images/shop/auxenf.jpg",
      alt: "Curso de enfermería",
      isActive: true,
    },
  ],
};

const auxiliarEstadisticas: CourseInterface = {
  path: "/cursos/auxiliar-estadisticas-de-salud-registros-medicos",
  id: "auxiliar-estadisticas-de-salud-registros-medicos",
  title: "Auxiliar de Estadísticas de Salud y Registros Médicos",
  term: "Se trata de un curso corto de unos 6~7 meses de duración aproximadamente con alta demanda laboral tanto en el ámbito público como el privado.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Información Estamos trabajando contínuamente para brindarte todos los
          cursos, carreras y actualizaciones profesionales que tú necesitas. Si
          te interesa informarte más sobre éste u otro curso, consultanos por
          medio de nuestro formulario de contacto. Contaran con material teórico
          y práctico actualizado a la más modernas prácticas sanitarias; el
          material práctico ayudará al estudiante a prepararse antes de tener
          contacto directo con pacientes reales en el Hospital de Pando,
          Hospital Militar y Hospital Pereira Rosell. El Auxiliar de Registros
          Médicos es un integrante del equipo de salud que se desempeña en
          unidades de registros médicos tanto de salud público como privado.
          Desempeña su labor bajo la supervisión de un Licenciado en Registros
          Médicos, en las áreas de acción específicas: Archivo Médico, Admisión
          de pacientes y Estadísticas en salud.
        </p>
      </div>
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "Hasta tercer año de secundaria aprobado o el equivalente en UTU (ciclo básico, sin materias previas).",
    "2 fotocopias de CI",
    "Fotocopia del Carnet de Salud",
    "Original de escolaridad de 3er año de liceo aprobado sin previas (FÓRMULA 04 ó FÓRMULA 05 ó FÓRMULA 69, con sello certificado egreso de Ciclo Básico).",
    "Alumnos de UTU: original de ficha acumulativa con sello que certifique ciclo básico aprobado completo expedido por reguladora central o Constancia de egreso de Ciclo Básico expedido por escuelas técnicas.",
    "Original de constancias provenientes de otros programas especiales, habilitados y autorizados por ANEP.",
    "Original de cualquier otra constancia de estudios correspondiente a educación terciaria y o universitaria.",
    "NOTA: La documentación debe contener firma del director/ subdirector y secretario con sus respectivas aclaraciones de firma y cargo. Sello legible.",
    "Tener muchas ganas de aprender y profesionalizarse.",
  ],
  curriculum: (
    <>
      <div>
        <strong>Primer ciclo: Anatomía y Fisiología:</strong>
        <ul className="check-list">
          <li>Historia Clínica</li>
          <li>Registro medico (archivo, admisión)</li>
          <li>Atención de la salud, terminología médica</li>
          <li>
            Asignaturas instrumentales (informática, metodología estadística,
            etc)
          </li>
        </ul>
      </div>
    </>
  ),
  images: [
    {
      src: "/images/shop/archivo.jpg",
      alt: "Curso de estadística",
      isActive: true,
    },
  ],
};

const blockQuirurgico: CourseInterface = {
  path: "/cursos/auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti",
  id: "auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti",
  title: "Auxiliar de servicio adiestrado en Block Quirúrgico y CTI",
  term: "Se trata de un curso corto de 3 meses de duración con alta demanda laboral tanto en el ámbito público como el privado.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          El curso no tiene tope de edad, todos tienen derecho a inscribirse y
          profesionalizarse en el ámbito de la salud. Clases online una vez a la
          semana, material en formato digital y Diploma sin costo.
        </p>
      </div>
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "Primaria completa.",
    "Dirigido a Auxiliares de Servicio, Licenciadas de Enfermería.",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/adiestrado_block.jpg",
      alt: "Curso de Block quirúrgico",
      isActive: true,
    },
  ],
};

const higiene: CourseInterface = {
  path: "/cursos/supervision-de-higiene-hospitalaria",
  id: "supervision-de-higiene-hospitalaria",
  title: "Supervisión de Higiene Hospitalaria",
  term: "Se trata de un curso corto de 3 meses de duración con alta demanda laboral tanto en el ámbito público como el privado.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          El curso no tiene tope de edad. Las clases son online una vez a la
          semana, con material en formato digital y Diploma sin costo.
        </p>
      </div>
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "Primaria completa.",
    "Dirigido a Auxiliares de Servicio, Licenciadas de Enfermería.",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/supervision_higiene.jpg",
      alt: "Curso de block",
      isActive: true,
    },
  ],
};

const economato: CourseInterface = {
  path: "/cursos/economato-y-esterilizacion",
  id: "economato-y-esterilizacion",
  title: "Economato y Esterilización",
  term: "Se trata de un curso presencial, corto de 4 clases de duración con alta demanda laboral tanto en el ámbito público como el privado.",
  openRegistration: "Consulte por inscripciones para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          <strong>Objetivo del curso:</strong> Formar recursos humanos del área
          de la Salud en la tarea especializada de Economato, de tal manera que
          sea capaz de desempeñarse eficientemente y en forma autónoma en un
          Economato o un Centro de Esterilización y Preparación de Materiales.
          En personal con experiencia de trabajo en esas áreas, generar la
          capacidad para ejercer tareas de supervision y jefatura.
        </p>
      </div>
    </>
  ),
  requirements: ["Más de 18 años al momento de inscripción."],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/economato.jpg",
      alt: "Curso de economato",
      isActive: true,
    },
  ],
};

export const COURSES: CourseInterface[] = [
  camillero,
  servicioTisaneria,
  enfermeria,
  auxiliarEstadisticas,
  blockQuirurgico,
  higiene,
  economato,
];
