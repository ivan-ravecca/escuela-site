import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AULAS_URL } from "../../app.config";
import { breadcrumbParts } from "../data/courses";

const MenuLinks: React.FC = () => {
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
          <ul className="cols5">
            <li className="col5">
              <h4>Todos los cursos que tenemos para ti</h4>
            </li>
            <li className="col1 menu-cursos">
              <h5>Los más buscados</h5>
              <ol>
                <li>
                  <Link
                    to={breadcrumbParts["auxiliar-enfermeria"].url}
                    title={breadcrumbParts["auxiliar-enfermeria"].title}
                    aria-label={breadcrumbParts["auxiliar-enfermeria"].title}
                  >
                    {breadcrumbParts["auxiliar-enfermeria"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["auxiliar-servicio"].url}
                    title={breadcrumbParts["auxiliar-servicio"].title}
                    aria-label={breadcrumbParts["auxiliar-servicio"].title}
                  >
                    {breadcrumbParts["auxiliar-servicio"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["auxiliar-farmacia-hospitalaria"].url}
                    title={
                      breadcrumbParts["auxiliar-farmacia-hospitalaria"].title
                    }
                    aria-label={
                      breadcrumbParts["auxiliar-farmacia-hospitalaria"].title
                    }
                  >
                    {breadcrumbParts["auxiliar-farmacia-hospitalaria"].title}
                  </Link>
                </li>
              </ol>
            </li>
            <li className="col2 menu-cursos">
              <h5>Cursos cortos</h5>
              <ol>
                <li>
                  <Link
                    to={breadcrumbParts["camillero"].url}
                    title={breadcrumbParts["camillero"].title}
                    aria-label={breadcrumbParts["camillero"].title}
                  >
                    {breadcrumbParts["camillero"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["lavanderia-hospitalaria"].url}
                    title={breadcrumbParts["lavanderia-hospitalaria"].title}
                    aria-label={
                      breadcrumbParts["lavanderia-hospitalaria"].title
                    }
                  >
                    {breadcrumbParts["lavanderia-hospitalaria"].title}
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
                    {
                      breadcrumbParts["supervision-de-higiene-hospitalaria"]
                        .title
                    }
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["chofer-sanitario"].url}
                    title={breadcrumbParts["chofer-sanitario"].title}
                    aria-label={breadcrumbParts["chofer-sanitario"].title}
                  >
                    {breadcrumbParts["chofer-sanitario"].title}
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
                    {
                      breadcrumbParts[
                        "auxiliar-de-servicio-adiestrado-en-block-quirurgico-y-cti"
                      ].title
                    }
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["emergencia-y-urgencia"].url}
                    title={breadcrumbParts["emergencia-y-urgencia"].title}
                    aria-label={breadcrumbParts["emergencia-y-urgencia"].title}
                  >
                    {breadcrumbParts["emergencia-y-urgencia"].title}
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
                    {breadcrumbParts["economato-y-esterilizacion"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["cosmetologia-nivel-1"].url}
                    title={breadcrumbParts["cosmetologia-nivel-1"].title}
                    aria-label={breadcrumbParts["cosmetologia-nivel-1"].title}
                  >
                    {breadcrumbParts["cosmetologia-nivel-1"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["iass"].url}
                    title={breadcrumbParts["iass"].title}
                    aria-label={breadcrumbParts["iass"].title}
                  >
                    {breadcrumbParts["iass"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      breadcrumbParts[
                        "actualizacion-manejo-heridas-curaciones-avanzadas"
                      ].url
                    }
                    title={
                      breadcrumbParts[
                        "actualizacion-manejo-heridas-curaciones-avanzadas"
                      ].title
                    }
                    aria-label={
                      breadcrumbParts[
                        "actualizacion-manejo-heridas-curaciones-avanzadas"
                      ].title
                    }
                  >
                    {
                      breadcrumbParts[
                        "actualizacion-manejo-heridas-curaciones-avanzadas"
                      ].title
                    }
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
              </ol>
            </li>
            <li className="col2 menu-cursos">
              <h5>Masterclass</h5>
              <ol>
                <li>
                  <Link
                    to={breadcrumbParts["actualizacion-hemato-oncologia"].url}
                    title={
                      breadcrumbParts["actualizacion-hemato-oncologia"].title
                    }
                    aria-label={
                      breadcrumbParts["actualizacion-hemato-oncologia"].title
                    }
                  >
                    {breadcrumbParts["actualizacion-hemato-oncologia"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["ostomias"].url}
                    title={breadcrumbParts["ostomias"].title}
                    aria-label={breadcrumbParts["ostomias"].title}
                  >
                    {breadcrumbParts["ostomias"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["actualizacion-en-vacunas"].url}
                    title={breadcrumbParts["actualizacion-en-vacunas"].title}
                    aria-label={
                      breadcrumbParts["actualizacion-en-vacunas"].title
                    }
                  >
                    {breadcrumbParts["actualizacion-en-vacunas"].title}
                  </Link>
                </li>
                <li>
                  <Link
                    to={breadcrumbParts["taller-primeros-auxilios-rcp"].url}
                    title={
                      breadcrumbParts["taller-primeros-auxilios-rcp"].title
                    }
                    aria-label={
                      breadcrumbParts["taller-primeros-auxilios-rcp"].title
                    }
                  >
                    {breadcrumbParts["taller-primeros-auxilios-rcp"].title}
                  </Link>
                </li>
              </ol>
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

export default MenuLinks;
