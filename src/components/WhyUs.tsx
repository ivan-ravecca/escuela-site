import React from "react";
import { SITE_NAME, FACEBOOK_APP, SITE_ADDRESS } from "../../app.config";
import { Link } from "react-router-dom";

const WhyUs: React.FC = () => {
  return (
    <>
      <div className="page-content">
        <div className="container">
          <div className="sixteen columns">
            <h2>Escuela de enfermería en Pando</h2>
          </div>
          <div className="sixteen columns">
            <h3>Historia</h3>
            <p>
              La {SITE_NAME}, ubicada en la ciudad de Pando, ha marcado un hito
              en la educación sanitaria desde su fundación en 2012.
            </p>
            <p>
              Con una misión centrada en la calidad y un enfoque educativo
              innovador, la institución se ha comprometido a formar
              profesionales de la salud altamente calificados, enfatizando no
              solo en las competencias técnicas sino también en los valores
              éticos y morales.
            </p>
            <p>
              Su visión de liderazgo en la formación de personal competente se
              refleja en su reciente traslado a una nueva planta física en{" "}
              <Link
                to={SITE_ADDRESS.url}
                aria-label={`Dirección de ${SITE_NAME}`}
                title={`Dirección de ${SITE_NAME}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE_ADDRESS.visualShort}
              </Link>
              , que cuenta con{" "}
              <Link to="/material" title="Material" aria-label="Material">
                aulas modernamente equipadas y laboratorios especializados para
              </Link>{" "}
              <Link
                to="/cursos/auxiliar-enfermeria"
                title="Auxiliar de Enfermería"
                aria-label="Auxiliar de Enfermería"
              >
                Enfermería
              </Link>
              ,{" "}
              <Link
                to="/cursos/auxiliar-servicio"
                title="Auxiliar de Servicio"
                aria-label="Auxiliar de Servicio"
              >
                Servicio y tisanería
              </Link>
              ,{" "}
              <Link
                to="/cursos/auxiliar-estadisticas-de-salud-registros-medicos"
                title="Auxiliar Estadísticas de salud y Registros Médicos"
                aria-label="Auxiliar Estadísticas de salud y Registros Médicos"
              >
                Farmacia y Registros Médicos.
              </Link>
              <br />
              los estudiantes tienen la oportunidad de aprender en un entorno
              práctico y realista. Además, la inclusión de una biblioteca y un
              patio central ofrece espacios para el estudio y la relajación.
            </p>
            <p>
              La colaboración con instituciones de salud reconocidas para
              prácticas profesionales refuerza la preparación de los estudiantes
              para sus futuras carreras, asegurando una educación integral y
              aplicada. Este avance subraya su compromiso con la excelencia y la
              atención humanizada en el cuidado de la salud, preparando a sus
              egresados para integrarse en equipos multidisciplinarios con un
              enfoque humanístico y científico.
            </p>
          </div>
          <div className="sixteen columns">
            <h3>Misión</h3>
            <p>
              Brindar la más alta calidad de educación mediante profesionales
              capacitados Implementando nuevo enfoque educativo, basado en la
              búsqueda de abordajes que permitan el desarrollo de estrategias
              curriculares que reafirmen la participación, la pro actividad, la
              creatividad y la sensibilidad en el desempeño de las habilidades
              técnicas, incrementando la conciencia del cuidado para hacerla más
              humana fundada en valores ético-morales comprometidos con la
              sociedad.
            </p>
            <h3>Visión</h3>
            <p>
              En el plano institucional, la Escuela de Enfermería Arte & Ciencia
              pretende ser líder en la zona en la formación de personal
              competente en el área de la salud que permitan satisfacer, con
              calidad Humana y técnica la demanda de la atención de la sociedad
              en la procuración de la salud. En el plano individual las(os)
              egresadas(os) de la escuela se distinguen por su actuar
              profesional y científico y muestran la capacidad de interactuar
              con un enfoque humanístico fundado en valores ético-morales como
              parte integrante de equipos multidisciplinarios de la salud.
            </p>
            <h3>Valores</h3>
            <p>
              Comprometidos con la sociedad basados en sólidos valores éticos y
              morales liderando con profesionalismo, responsabilidad,
              solidaridad, confianza, humanismo e integralidad, en un equipo
              fuertemente motivado y capacitado teniendo en cuenta las nuevas
              tecnologías y la actualización permanente.
            </p>
          </div>
          <div className="sixteen columns">
            <h3>Autorizados por el MEC</h3>
            <div className="four columns">
              <Link
                to="https://sige.mec.gub.uy/instituciones/"
                target="_blank"
                title="Escuela habilitada por el MEC"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/mec.png"
                  alt="Escuela habilitada por el MEC"
                  title="Escuela habilitada por el MEC"
                />
              </Link>
            </div>
            <div className="one-third columns">
              <Link
                to="https://sige.mec.gub.uy/instituciones/"
                target="_blank"
                title="Escuela habilitada por el MEC"
                rel="noopener noreferrer"
              >
                Somos una escuela autorizada por el MEC
              </Link>
              , lo que garantiza la calidad de nuestros cursos y asegura ??????.
            </div>
          </div>
          <div className="sixteen columns">
            <h3>¿Porqué elegirnos?</h3>
            <p>
              Cursos dinámicos, actualizados y profesionales: Los docentes que
              imparten los cursos son profesionales con experiencia en sus
              materias, dictando los temas con profesionalidad y actualidad.
              Contenido actualizados: Los contenido utilizados en los dictados
              son actualizados permanentemente buscando siempre brindar la
              última información.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <section className="icon-box-container">
          <div className="one-third column">
            <article className="icon-box">
              <i className="icon-building"></i>
              <h3>Infraestructura</h3>
              <p>
                Grupos reducidos con mobiliario totalmente nuevo y cómodo:
                Consideramos que la cantidad de alumnos en los grupos deben ser
                pocos para que todos puedan participar y consultar para que
                aprendan con comodidad, es por eso que no solo el tamaño sino
                que el mobiliario es también adecuado para asistir a clases.
              </p>
            </article>
          </div>

          <div className="one-third column">
            <article className="icon-box">
              <i className="icon-mortar-board"></i>
              <h3>Material Audio - Visual</h3>
              <p>
                Basta de clases aburridas y monótonas, los dictados se
                complementan con el material audio visual reproducido con
                proyectores dentro del salón.
              </p>
            </article>
          </div>
          <div className="one-third column">
            <article className="icon-box">
              <i className="icon-flask"></i>
              <h3>Practicas en Hospitales importantes</h3>
              <p>
                Utilizamos tres centros de alta importancia para la sociedad
                para realizar las prácticas, pudiendo acercar a los alumnos a
                casos reales e interesantes.
              </p>
            </article>
          </div>
        </section>
      </div>
      <div className="page-content">
        <div className="container">
          <h3>Últimos posts de Facebook</h3>
          <iframe
            src={FACEBOOK_APP.widgetUrl}
            width="100%"
            height="500"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default WhyUs;
