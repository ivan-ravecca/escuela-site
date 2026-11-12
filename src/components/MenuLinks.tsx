import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AULAS_URL } from "../../app.config";
import { breadcrumbParts } from "../data/breadcrumbs";
import { useAuth } from "../contexts/AuthContext";
import { useCourses } from "../contexts/CourseContext";
import AdminMenu from "./AdminMenu";

const MenuLinks: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { courses, error } = useCourses();
  const isActiveNavLink = (component: string) =>
    (location.pathname.split("/").filter(Boolean)[0] || "") === component ? { id: "current" } : {};
  const groups = [
    { title: "Los más buscados", className: "col1", key: "mostWanted" },
    { title: "Cursos cortos", className: "col2", key: "shortCourse" },
    { title: "Masterclass", className: "col2", key: "masterClass" },
  ] as const;

  return (
    <nav id="navigation" className="style-1">
      <div className="left-corner"></div>
      <div className="right-corner"></div>
      <ul className="menu" id="responsive">
        <li><Link to="/" {...isActiveNavLink("")} title="Inicio" aria-label="Inicio"><i className="halflings white home"></i> Inicio</Link></li>
        <li>
          <Link to="/cursos" {...isActiveNavLink("cursos")}><i className="halflings white file"></i> Cursos</Link>
          <ul className="cols5">
            <li className="col5"><h4>Todos los cursos que tenemos para ti</h4></li>
            {error && <li className="col5" role="alert">{error}</li>}
            {groups.map((group) => (
              <li className={`${group.className} menu-cursos`} key={group.title}>
                <h5>{group.title}</h5>
                <ol>{courses.filter((course) => course[group.key])
                  .sort((a, b) => a.menuPositions[group.key] - b.menuPositions[group.key])
                  .map((course) => (
                  <li key={course.recordId}>
                    <Link to={course.path} title={course.title} aria-label={course.title}>{course.title}</Link>
                  </li>
                ))}</ol>
              </li>
            ))}
          </ul>
        </li>
        {(["material", "bedelia"] as const).map((key) => (
          <li key={key}><Link to={breadcrumbParts[key].url} title={breadcrumbParts[key].title} aria-label={breadcrumbParts[key].title} {...isActiveNavLink(key)}><i className="halflings white home"></i> {breadcrumbParts[key].title}</Link></li>
        ))}
        <li><Link to={AULAS_URL} target="_blank" rel="noopener noreferrer" title="Ir a Aulas" aria-label="Ir a Aulas"><i className="halflings white home"></i> Aulas</Link></li>
        <li><Link to={breadcrumbParts.contacto.url} title={breadcrumbParts.contacto.title} aria-label={breadcrumbParts.contacto.title} {...isActiveNavLink("contacto")}><i className="halflings white envelope"></i> Contacto</Link></li>
        <li>
          <Link to="/administracion" {...isActiveNavLink("administracion")}><i className="halflings white file"></i> Administracion</Link>
          {isAuthenticated && <AdminMenu />}
        </li>
      </ul>
    </nav>
  );
};

export default MenuLinks;
