import React from "react";
import { Link } from "react-router-dom";
import { AULAS_URL } from "../../app.config";
import { useLocation } from "react-router-dom";
import { breadcrumbParts } from "../data/courses";

const AppNavigation: React.FC = () => {
  const location = useLocation();
  const isActiveNavLink = (pathname: string, component: string): object => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const pathName = pathSegments.length > 0 ? pathSegments[0] : "";
    return pathName === component ? { id: "current" } : {};
  };

  return (
    <nav id="navigation" className="style-1">
      <div className="left-corner"></div>
      <div className="right-corner"></div>

      <ul className="menu" id="responsive">
        <li>
          <Link
            to="/"
            {...isActiveNavLink(location.pathname, "")}
            title={breadcrumbParts["/"].title}
            aria-label={breadcrumbParts["/"].title}
          >
            <i className="halflings white home"></i> Inicio
          </Link>
        </li>

        <li>
          <Link to="/cursos" {...isActiveNavLink(location.pathname, "cursos")}>
            <i className="halflings white file"></i> Cursos
          </Link>
          <ul className="cols3">
            <li className="col3">
              <h4>Todos los cursos que tenemos para ti</h4>
            </li>
            <li className="col1">
              <h5>Los más buscados</h5>
              <ol>
                <li>
                  <Link
                    to={breadcrumbParts["auxiliar-enfermeria"].url}
                    title={breadcrumbParts["auxiliar-enfermeria"].title}
                    aria-label={breadcrumbParts["auxiliar-enfermeria"].title}
                  >
                    Auxiliar de Enfermería
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["auxiliar-servicio"].url}
                    title={breadcrumbParts["auxiliar-servicio"].title}
                    aria-label={breadcrumbParts["auxiliar-servicio"].title}
                  >
                    Auxiliar de Servicio
                  </Link>
                </li>
              </ol>
            </li>
            <li className="col1">
              <h5>Cursos cortos</h5>
              <ol>
                <li>
                  <Link
                    to={breadcrumbParts["camillero"].url}
                    title={breadcrumbParts["camillero"].title}
                    aria-label={breadcrumbParts["camillero"].title}
                  >
                    Curso de Camillero
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      breadcrumbParts[
                        "auxiliar-estadisticas-de-salud-registros-medicos"
                      ].url
                    }
                    title={
                      breadcrumbParts[
                        "auxiliar-estadisticas-de-salud-registros-medicos"
                      ].title
                    }
                    aria-label={
                      breadcrumbParts[
                        "auxiliar-estadisticas-de-salud-registros-medicos"
                      ].title
                    }
                  >
                    Curso Auxiliar de Estadísticas de Salud y Registros Médicos
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      breadcrumbParts[
                        "auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti"
                      ].url
                    }
                    title={
                      breadcrumbParts[
                        "auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti"
                      ].title
                    }
                    aria-label={
                      breadcrumbParts[
                        "auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti"
                      ].title
                    }
                  >
                    Auxiliar de Servicio Adiestrado en Block Quirúrgico y CTI
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      breadcrumbParts["supervision-de-higiene-hospitalaria"].url
                    }
                    title={
                      breadcrumbParts["supervision-de-higiene-hospitalaria"]
                        .title
                    }
                    aria-label={
                      breadcrumbParts["supervision-de-higiene-hospitalaria"]
                        .title
                    }
                  >
                    Supervisión de Higiene Hospitalaria
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["economato-y-esterilizacion"].url}
                    title={breadcrumbParts["economato-y-esterilizacion"].title}
                    aria-label={
                      breadcrumbParts["economato-y-esterilizacion"].title
                    }
                  >
                    Economato y Esterilización
                  </Link>
                </li>
              </ol>
            </li>
            <li className="col1">
              <h5>Próximos cursos</h5>
              <p>Actualización en Manejo de Heridas y Curaciones Avanzadas</p>
            </li>
          </ul>
        </li>
        <li>
          <Link
            to={breadcrumbParts["material"].url}
            title={breadcrumbParts["material"].title}
            aria-label={breadcrumbParts["material"].title}
            {...isActiveNavLink(location.pathname, "material")}
          >
            <i className="halflings white home"></i> Material
          </Link>
        </li>
        <li>
          <Link
            to={breadcrumbParts["bedelia"].url}
            title={breadcrumbParts["bedelia"].title}
            aria-label={breadcrumbParts["bedelia"].title}
            {...isActiveNavLink(location.pathname, "bedelia")}
          >
            <i className="halflings white home"></i> Bedelía
          </Link>
        </li>
        <li>
          <Link
            to={AULAS_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Ir a Aulas"
            aria-label="Ir a Aulas"
          >
            <i className="halflings white home"></i> Aulas
          </Link>
        </li>

        <li>
          <Link
            to={breadcrumbParts["contacto"].url}
            title={breadcrumbParts["contacto"].title}
            aria-label={breadcrumbParts["contacto"].title}
            {...isActiveNavLink(location.pathname, "contacto")}
          >
            <i className="halflings white envelope"></i> Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNavigation;
