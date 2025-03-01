import React from "react";
import { Link, useLocation } from "react-router-dom";
import { elastic as Menu } from "react-burger-menu";
import { AULAS_URL } from "../../app.config";
import { breadcrumbParts } from "../data/courses";

const MenuLinksBurguer: React.FC = () => {
  const location = useLocation();
  const isActiveNavLink = (pathname: string, component: string): object => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const pathName = pathSegments.length > 0 ? pathSegments[0] : "";
    return pathName === component ? { id: "current" } : {};
  };

  return (
    // <Menu left styles={{ bmMenu: { background: "#ddd" } }}>
    <Menu left>
      <Link
        to="/"
        {...isActiveNavLink(location.pathname, "")}
        title={breadcrumbParts["/"].title}
        aria-label={breadcrumbParts["/"].title}
        onClick={() => Menu.close()}
      >
        <i className="halflings white home"></i> Inicio
      </Link>

      <Link
        to="/cursos"
        {...isActiveNavLink(location.pathname, "cursos")}
        onClick={() => Menu.close()}
      >
        <i className="halflings white file"></i> Cursos
      </Link>

      <Link
        to={breadcrumbParts["material"].url}
        title={breadcrumbParts["material"].title}
        aria-label={breadcrumbParts["material"].title}
        {...isActiveNavLink(location.pathname, "material")}
        onClick={() => Menu.close()}
      >
        <i className="halflings white home"></i> Material
      </Link>

      <Link
        to={breadcrumbParts["bedelia"].url}
        title={breadcrumbParts["bedelia"].title}
        aria-label={breadcrumbParts["bedelia"].title}
        {...isActiveNavLink(location.pathname, "bedelia")}
        onClick={() => Menu.close()}
      >
        <i className="halflings white home"></i> Bedelía
      </Link>

      <Link
        to={AULAS_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Ir a Aulas"
        aria-label="Ir a Aulas"
        onClick={() => Menu.close()}
      >
        <i className="halflings white home"></i> Aulas
      </Link>

      <Link
        to={breadcrumbParts["contacto"].url}
        title={breadcrumbParts["contacto"].title}
        aria-label={breadcrumbParts["contacto"].title}
        {...isActiveNavLink(location.pathname, "contacto")}
        onClick={() => Menu.close()}
      >
        <i className="halflings white envelope"></i> Contacto
      </Link>
    </Menu>
  );
};

export default MenuLinksBurguer;
