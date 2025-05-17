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
    url: "/cursos/auxiliar-farmacia-hospitalaria",
    title: "Auxiliar de Farmacia Hospitalaria",
  },
  { url: "/cursos/camillero", title: "Curso de Camillero" },
  { url: "/cursos/lavanderia-hospitalaria", title: "Lavandería Hospitalaria" },
  {
    url: "/cursos/supervision-de-higiene-hospitalaria",
    title: "Supervisión de Higiene Hospitalaria",
  },
  {
    url: "/cursos/chofer-sanitario",
    title: "Chofer Sanitario",
  },
  {
    url: "/cursos/auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti",
    title: "Auxiliar de servicio adiestrado en Block Quirúrgico y CTI",
  },
  {
    url: "/cursos/emergencia-y-urgencia",
    title: "Emergencia y Urgencia",
  },
  {
    url: "/cursos/economato-y-esterilizacion",
    title: "Economato y Esterilización",
  },
  {
    url: "/cursos/cosmetologia-nivel-1",
    title: "Cosmetología Nivel 1",
  },
  {
    url: "/cursos/iass",
    title: "IASS",
  },
  {
    url: "/cursos/actualizacion-manejo-heridas-curaciones-avanzadas",
    title: "Actualización en el manejo de heridas y curaciones avanzadas",
  },
  {
    url: "/cursos/auxiliar-estadisticas-de-salud-registros-medicos",
    title: "Auxiliar de Estadísticas de Salud y Registros Médicos",
  },
  {
    url: "/cursos/actualizacion-hemato-oncologia",
    title: "Actualización en HEMATO ONCOLOGÍA",
  },
  {
    url: "/cursos/ostomias",
    title: "OSTOMÍAS",
  },
  {
    url: "/cursos/actualizacion-en-vacunas",
    title: "Actualización en Vacunas",
  },
  {
    url: "/cursos/taller-primeros-auxilios-rcp",
    title: "Taller de Primeros Auxilios y RCP",
  },
  { url: "/material", title: "Material" },
  { url: "/bedelia", title: "Bedelía" },
  { url: "/contacto", title: "Contáctanos" },
  { url: "/administracion", title: "Administración" },
  { url: "/administracion/certificado", title: "Generar certificado" },
  { url: "/administracion/qr", title: "Generar QR" },
];

export const breadcrumbParts = urlParts.reduce(
  (acc: { [key: string]: { url: string; title: string } }, { url, title }) => {
    const id = url.split("/").filter(Boolean).pop();
    acc[id ? id : "/"] = { url, title };
    return acc;
  },
  {},
);

const enfermeria: CourseInterface = {
  path: "/cursos/auxiliar-enfermeria",
  id: "auxiliar-enfermeria",
  title: "Auxiliar de Enfermería",
  term: "Con una duración aproximada de 24 meses presencial, este programa intensivo está diseñado para satisfacer la creciente demanda de profesionales cualificados en el sector sanitario, tanto público como privado",
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
    "4to año bachiller aprobado sin previas o el equivalente en UTU (sin materias previas).",
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
      src: "/images/shop/enfermeria_01.jpeg",
      alt: "Curso de enfermería",
      isActive: true,
    },
    {
      src: "/images/shop/enfermeria_02.jpg",
      alt: "Curso de enfermería",
      isActive: false,
    },
  ],
};

const servicioTisaneria: CourseInterface = {
  path: "/cursos/auxiliar-servicio",
  id: "auxiliar-servicio",
  title: "Auxiliar de Servicio, Ayudante de cocina y Tisanería",
  term: "Se trata de un curso de 6 meses de duración con teórico y práctico presencial.",
  openRegistration: (
    <>
      <p>Nuevo inicio de cursos 2025.</p>
      <p>
        Las inscripciones estan abiertas, curso presencial. Clínica en el
        laboratorio equipado como la unidad del paciente con modelos anatómicos
        de simulación.
      </p>
      <p>Prácticas en Hospitales y Policlínicas.</p>
    </>
  ),
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        Se trata de un curso corto de unos 6 meses de duración con alta demanda
        laboral tanto en el ámbito público como el privado. Contarán con
        material teórico y práctico actualizado a la más modernas prácticas
        sanitarias; el material práctico ayudará al estudiante a prepararse
        antes de tener contacto directo con pacientes reales
      </div>
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "Primaria completa.",
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

const farmacia: CourseInterface = {
  path: "/cursos/auxiliar-farmacia-hospitalaria",
  id: "auxiliar-farmacia-hospitalaria",
  title: "Auxiliar de Farmacia Hospitalaria",
  term: "Se trata de un curso de 12 meses en ambas modalidades (virtual por medio de plataforma y presencial).",
  openRegistration: (
    <>
      <p>Nuevo inicio de cursos 2025.</p>
    </>
  ),
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        Se trata de un curso corto de unos 6 meses de duración con alta demanda
        laboral tanto en el ámbito público como el privado. Contarán con
        material teórico y práctico actualizado a la más modernas prácticas
        sanitarias; el material práctico ayudará al estudiante a prepararse
        antes de tener contacto directo con pacientes reales
      </div>
      <h4>Temario</h4>
      <ul className="check-list">
        <li>
          <strong>Conocimiento de medicamentos:</strong> clasificación de los
          fármacos, sus nombres (genéricos y comerciales), presentaciones, vías
          de administración, dosis usuales, conservaciones y precauciones.
          Farmacología, farmacodinamia (cómo el fármaco afecta al organismo) y
          farmacocinética (cómo el organismo afecta al fármaco).
        </li>
        <li>
          <strong>Dispensación y distribución de medicamentos:</strong> los
          procedimientos correctos para recibir, almacenar, organizar y
          dispensar medicamentos, tanto a pacientes ambulatorios como a las
          diferentes áreas del hospital (enfermería, quirófano, etc.). Esto
          incluye el manejo de stock, control de fechas de vencimiento y la
          preparación de dosis unitarias.
        </li>
        <li>
          <strong>Legislación farmacéutica:</strong> las normativas vigentes
          relacionadas con la dispensación de medicamentos, especialmente en el
          ámbito hospitalario, incluyendo el manejo de psicofármacos y
          estupefacientes.
        </li>
        <li>
          <strong>Atención al paciente:</strong> habilidades y destrezas para
          brindar una atención cordial y eficiente a los pacientes y al personal
          de salud que solicitan medicamentos o información.
        </li>
        <li>Cálculos farmacéuticos de dosis y conversiones de unidades.</li>
        <li>
          <strong>Higiene y seguridad:</strong> normas de higiene y seguridad
          que se deben seguir en una farmacia hospitalaria para evitar
          contaminaciones y riesgos laborales.
        </li>
        <li>
          <strong>Gestión de inventario:</strong> manejo de inventarios, control
          de stock y pedidos de medicamentos.
        </li>
        <li>
          Prácticas profesionales en hospitales o clínicas, lo que te permite
          aplicar los conocimientos teóricos en un entorno real de trabajo.
        </li>
      </ul>
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "4to año bachiller aprobado sin previas o el equivalente en UTU (sin materias previas).",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/farmacia_hospitalaria_01.png",
      alt: "Curso de Farmacia Hospitalaria",
      isActive: true,
    },
  ],
};

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
  requirements: ["Mayor de 18 años", "Primaria aprobada"],
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
      src: "/images/shop/camillero_01.jpeg",
      alt: "Curso de camillero",
      isActive: true,
    },
    {
      src: "/images/shop/camillero_02.jpg",
      alt: "Curso de camillero",
      isActive: false,
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
          Esta especialización permite organizar un servicio de higiene
          ambiental, así como controlar y supervisar las técnicas de limpieza y
          desinfección de los diferentes sectores. El sector de Limpieza
          Hospitalaria es un pilar fundamental en el área de Salud y sumamente
          influyente en la efectividad y seguridad de la preservación de la
          vida, por lo cual, es esencial garantizar y ampliar el desarrollo
          profesional de quienes habitan estos espacios y contribuyen a cumplir
          con las metas institucionales.
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
      src: "/images/shop/supervision_higiene_01.jpeg",
      alt: "Curso Supervisión de Higiene Hospitalaria",
      isActive: true,
    },
    {
      src: "/images/shop/supervision_higiene_02.jpg",
      alt: "Curso de Supervisión de Higiene Hospitalaria",
      isActive: true,
    },
  ],
};

const chofer: CourseInterface = {
  path: "/cursos/chofer-sanitario",
  id: "chofer-sanitario",
  title: "Chofer Sanitario",
  term: "Se trata de un curso corto de 3 meses de duración con alta demanda laboral tanto en el ámbito público como el privado.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Un chofer sanitario es un profesional encargado de conducir vehículos
          sanitarios, como ambulancias, garantizando el traslado seguro de
          pacientes en situaciones de emergencia o programadas. Además suelen
          asistir en tareas básicas de atención médica, colaborando con el
          equipo de salud.
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
      src: "/images/shop/chofer_sanitario_01.jpeg",
      alt: "Curso de Chofer Sanitario",
      isActive: true,
    },
    {
      src: "/images/shop/chofer_sanitario_02.jpeg",
      alt: "Curso de Chofer Sanitario",
      isActive: false,
    },
    {
      src: "/images/shop/chofer_sanitario_03.jpeg",
      alt: "Curso de Chofer Sanitario",
      isActive: false,
    },
  ],
};

const blockQuirurgico: CourseInterface = {
  path: "/cursos/auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti",
  id: "auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti",
  title: "Auxiliar de servicio adiestrado en Block Quirúrgico y CTI",
  term: "Se trata de un curso corto virtual de 3 meses de duración con alta demanda laboral tanto en el ámbito público como el privado.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Es una formación especializada que capacita a estos profesionales para
          desempeñar funciones de apoyo esenciales en dos áreas críticas de un
          hospital.
        </p>
        <strong>Objetivos principales:</strong>
        <ul className="star-list">
          <li>
            Preparación , higiene y mantenimiento del entorno quirúrgico y la
            unidad de CTI
          </li>
          <li>Gestión de residuos biológicos y otros materiales.</li>
          <li>Colaboración en el control de infecciones.</li>
        </ul>

        <p>
          <strong>Infecciones asociadas a la atención en salud (IAAS)</strong>
          Se enfoca en proporcionar conocimientos y habilidades para prevenir y
          controlar las infecciones que los pacientes pueden contraer durante su
          estancia en un centro de atención médica.
        </p>
        <ul className="star-list">
          <li>Comprender la epidemiología de las IAAS</li>
          <li>
            Aprender sobre los tipos de infecciones más comunes, sus causas y
            cómo se propagan en entornos de atención médica.
          </li>
          <li>Implementar medidas de prevención</li>
          <li>
            Dominar técnicas y protocolos para prevenir la transmisión de
            infecciones, como la higiene de manos, el uso adecuado de equipos de
            protección personal y la esterilización de equipos.
          </li>
          <li>Aplicar protocolos de control de infecciones</li>
          <li>
            Desarrollar habilidades para identificar y manejar brotes de
            infecciones, así como para implementar estrategias de control en
            diferentes entornos de atención médica.
          </li>
          <li>Conocer la normativa y las directrices</li>
          <li>
            Familiarizarse con las regulaciones y recomendaciones nacionales e
            internacionales relacionadas con la prevención y el control de IAAS.
          </li>
        </ul>
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
      src: "/images/shop/adiestrado_block_01.jpeg",
      alt: "Curso de Block quirúrgico",
      isActive: true,
    },
    {
      src: "/images/shop/adiestrado_block_02.jpg",
      alt: "Curso de Block quirúrgico",
      isActive: false,
    },
  ],
};

const emergenciaUrgencia: CourseInterface = {
  path: "/cursos/emergencia-y-urgencia",
  id: "emergencia-y-urgencia",
  title: "Emergencia y Urgencia",
  term: "Se trata de un curso corto virtual de 3 meses de duración con alta demanda laboral tanto en el ámbito público como el privado.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Especialización en la cual estarás capacitado/a para trabajar en
          situaciones extrahospitalarias y traslado. Poder desarrollar todos los
          procedimientos de asistencia en la emergencia de niños y adultos y
          resolver situaciones con autonomía profesional, accediendo al mercado
          laboral con un diferencial que los jerarquiza como profesionales.
        </p>
      </div>
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "Dirigido a Enfermeros, Licenciados y Estudiantes.",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/emergencia_urgencia.jpeg",
      alt: "Curso de Emergencia y Urgencia",
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
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "Dirigido a personal con Supervisión de higiene, Enfermería, Auxiliar de Servicio y licenciada en Enfermería.",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/economato_01.jpeg",
      alt: "Curso de economato",
      isActive: true,
    },
    {
      src: "/images/shop/economato_02.jpeg",
      alt: "Curso de economato",
      isActive: false,
    },
    {
      src: "/images/shop/economato_03.jpg",
      alt: "Curso de economato",
      isActive: false,
    },
  ],
};

const cosmetologia: CourseInterface = {
  path: "/cursos/cosmetologia-nivel-1",
  id: "cosmetologia-nivel-1",
  title: "Cosmetologia Nivel 1",
  term: "Se trata de un curso corto y presencial de 2 véces por semana, 4 horas por clase para un total de 30 horas.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Preparar al participante como esteticista facial capaz de realizar
          tratamientos de limpieza de rostro, hidratación, máscaras, peeling,
          etc., para desarrollarse profesionalmente en salones, institutos de
          belleza, laboratorios, o de manera independiente.
        </p>
      </div>
    </>
  ),
  requirements: ["A todo público"],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/cosmetologia_01.jpeg",
      alt: "Curso de Cosmetología",
      isActive: true,
    },
  ],
};

const iass: CourseInterface = {
  path: "/cursos/iass",
  id: "iass",
  title: "IASS",
  term: "Se trata de un curso virtual de unas 30 horas en total.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Adquirir conocimientos para comprender, reconocer y prevenir
          infecciones asociadas a la atención de salud en los establecimientos
          asistenciales.
        </p>
      </div>
    </>
  ),
  requirements: ["A todo público"],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/iass_01.png",
      alt: "Curso de IASS",
      isActive: true,
    },
    {
      src: "/images/shop/iass_02.png",
      alt: "Curso de IASS",
      isActive: false,
    },
  ],
};

const actualizacionHeridas: CourseInterface = {
  path: "/cursos/actualizacion-manejo-heridas-curaciones-avanzadas",
  id: "actualizacion-manejo-heridas-curaciones-avanzadas",
  title: "Actualización en el manejo de heridas y curaciones avanzadas",
  term: "Se trata de un curso corto virtual de 4 clases de duración.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <strong>Temario</strong>
        <ul className="check-list">
          <li>
            Evaluar heridas complejas de forma más exhaustiva, identificando
            factores que podrían retrasar la cicatrización.
          </li>
          <li>
            Seleccionar los apósitos y terapias más adecuadas, según el tipo de
            herida, su fase de cicatrización y las necesidades del paciente.
          </li>
          <li>
            Manejar técnicas avanzadas de curación, como el plasma autólogo.
          </li>
          <li>
            Prevenir y tratar complicaciones, infecciones, dehiscencias entre
            otras.
          </li>
          <li>
            Optimizar el confort del paciente y mejorar su calidad de vida
            durante el proceso de curación.
          </li>
          <li>
            Rol de la enfermera navegante, una opción cada vez más ofertada por
            los servicios de salud.
          </li>
          <li>
            Trabajar de forma interdisciplinaria, con otros profesionales de la
            salud para un abordaje integral.
          </li>
          <li>Casos clínicos.</li>
          <li>
            Mantenerse al día con las últimas investigaciones y mejores
            prácticas en el campo.
          </li>
        </ul>
      </div>
    </>
  ),
  requirements: ["A todo público"],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/curacion_heridas_complejas.jpeg",
      alt: "Curso de block",
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
          contacto directo con pacientes reales en diferentes hospitales. El
          Auxiliar de Registros Médicos es un integrante del equipo de salud que
          se desempeña en unidades de registros médicos tanto de salud público
          como privado. Desempeña su labor bajo la supervisión de un Licenciado
          en Registros Médicos, en las áreas de acción específicas: Archivo
          Médico, Admisión de pacientes y Estadísticas en salud.
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
      src: "/images/shop/registros_medicos_01.jpeg",
      alt: "Curso de Registros Médicos",
      isActive: true,
    },
    {
      src: "/images/shop/registros_medicos_02.jpg",
      alt: "Curso de Registros Médicos",
      isActive: false,
    },
  ],
};

const hematoOncologia: CourseInterface = {
  path: "/cursos/actualizacion-hemato-oncologia",
  id: "actualizacion-hemato-oncologia",
  title: "Actualización en HEMATO ONCOLOGÍA",
  term: "Se trata de un curso corto una instancia en ambas modalidades (virtual o presencial).",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Abordaje multidisciplinario en el paciente hematooncológico, desde
          principios básicos hasta cuidados del paciente durante y post
          tratamiento.
        </p>
      </div>
    </>
  ),
  requirements: [
    "Dirigido a estudiantes y/o egresados de Enfermería.",
    "Lic. en Enfemeria.",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/hematooncologia_01.jpeg",
      alt: "Curso de Hemato Oncología",
      isActive: true,
    },
  ],
};

const ostomias: CourseInterface = {
  path: "/cursos/ostomias",
  id: "ostomias",
  title: "Masterclass de OSTOMÍAS",
  term: "Se trata de un curso corto una instancia en ambas modalidades (virtual o presencial).",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Te proporcionará conocimientos y habilidades esenciales para el
          cuidado y manejo de pacientes con ostomías.
        </p>
        <ul className="check-list">
          <li>Tipos de Ostomías y Anatomía</li>
          <li>Cuidados y evaluación del Estoma</li>
          <li>Cambio de bolsa de ostomía</li>
          <li>Cuidado de la piel periestomal</li>
          <li>Complicaciones y Manejo</li>
          <li>Aspectos Psicosociales</li>
        </ul>
      </div>
    </>
  ),
  requirements: [
    "Dirigido a Licenciados en Enfermería",
    "Dirigido a Enfermeros y/o estudiantes",
    "Dirigido a Aux. de Farmacia",
    "Dirigido a Cuidadores de pacientes con ostomías",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/ostomias_01.jpeg",
      alt: "Curso de Ostomías",
      isActive: true,
    },
  ],
};

const actualizacionVacunas: CourseInterface = {
  path: "/cursos/actualizacion-en-vacunas",
  id: "actualizacion-en-vacunas",
  title: "Actualizacion en Vacunas",
  term: "Se trata de un curso corto de una única instancia presencial.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Consiste de una masterclass que incluye información sobre las
          prácticas más recientes relacionadas a la inmunización Esto abarca
          diversos aspectos, incluyendo: nuevas vacunas, cambios en las
          recomendaciones de vacunación, actualización de los calendarios según
          la evidencia científica más reciente, modificación de las
          recomendaciones para grupos de población específicos, como niños,
          adultos mayores o personas con enfermedades crónicas. Métodos de
          producción y distribución de vacunas.
        </p>
      </div>
    </>
  ),
  requirements: [
    "Dirigido a Licenciados en Enfermería",
    "Dirigido a Enfermeros y/o estudiantes",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/actualizacion_vacunas_01.jpeg",
      alt: "Curso de actualización en vacunas",
      isActive: true,
    },
  ],
};

const tallerPrimerosAuxiliosRCP: CourseInterface = {
  path: "/cursos/taller-primeros-auxilios-rcp",
  id: "taller-primeros-auxilios-rcp",
  title: "Taller de Primeros Auxilios y RCP",
  term: "Se trata de un curso corto de una sola instancia presencial.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Es un curso práctico diseñado para enseñar habilidades básicas que
          pueden salvar vidas en situaciones de emergencia.
        </p>

        <h4>Objetivos principales:</h4>
        <div>
          <strong>Primeros Auxilios:</strong>
          <ul className="check-list">
            <li>
              Aprender a evaluar una situación de emergencia y actuar de manera
              adecuada.
            </li>
            <li>
              Saber cómo actuar ante diversas lesiones (cortes, quemaduras,
              fracturas, etc.).
            </li>
            <li>
              Conocer cómo manejar situaciones de emergencia médica (ataques de
              asma, convulsiones, etc.).
            </li>
            <li>Conocer las pautas de actuación en caso de atragantamiento.</li>
            <li>Aprender a controlar las hemorragias.</li>
          </ul>
          <br />
          <strong>RCP (Reanimación Cardiopulmonar):</strong>
          <ul className="check-list">
            <li>Aprender a reconocer una parada cardiorrespiratoria.</li>
            <li>
              Dominar las técnicas de compresiones torácicas y ventilación
              artificial.
            </li>
            <li>
              Aprender el uso de un Desfibrilador Externo Automático (DEA).
            </li>
          </ul>
          <p>
            Brindan herramientas esenciales para actuar con seguridad y eficacia
            en momentos críticos.
          </p>
          <p>
            Aumentan las posibilidades de supervivencia de una persona en caso
            de emergencia.
          </p>
          <p>
            Proporcionan conocimientos para actuar con calma y confianza ante
            situaciones de estrés.
          </p>
        </div>
      </div>
    </>
  ),
  requirements: ["Abierto a todo público"],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/rcp.jpeg",
      alt: "Curso de RCP",
      isActive: true,
    },
  ],
};

const lavanderiaHospitalaria: CourseInterface = {
  path: "/cursos/lavanderia-hospitalaria",
  id: "lavanderia-hospitalaria",
  title: "Lavandería Hospitalaria",
  term: "Se trata de un curso corto de 3 meses de duración con alta demanda laboral tanto en el ámbito público como el privado.",
  openRegistration: "Inscripciones abiertas para el año 2025.",
  info: (
    <>
      <h4>Información del curso</h4>
      <div>
        <p>
          Una lavandería hospitalaria es el espacio que brinda el servicio de
          lavado, reacondicionamiento y planchado de las prendas textiles en los
          hospitales y centros de salud. La finalidad de este servicio es
          procesar la ropa sucia y contaminada para posteriormente gestionarla
          una vez limpia y sin contaminación microbiana a los servicios del
          hospital o el centro de salud que la requieran.
        </p>
      </div>
    </>
  ),
  requirements: [
    "Más de 18 años al momento de inscripción.",
    "Primaria completa.",
  ],
  curriculum: undefined,
  images: [
    {
      src: "/images/shop/lavanderia_hospitalaria_01.jpeg",
      alt: "Curso de Lavandería Hospitalaria",
      isActive: true,
    },
  ],
};
export const COURSES: CourseInterface[] = [
  enfermeria,
  servicioTisaneria,
  farmacia,
  camillero,
  higiene,
  lavanderiaHospitalaria,
  chofer,
  blockQuirurgico,
  emergenciaUrgencia,
  economato,
  cosmetologia,
  iass,
  actualizacionHeridas,
  auxiliarEstadisticas,
  hematoOncologia,
  ostomias,
  actualizacionVacunas,
  tallerPrimerosAuxiliosRCP,
];
