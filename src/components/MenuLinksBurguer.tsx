import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { bubble as Menu } from "react-burger-menu";
import { AULAS_URL, SOCIAL_URLS, SITE_NAME } from "../../app.config";
import { breadcrumbParts } from "../data/courses";
import { AnalyticsService } from "../services/AnalyticsService";

const MenuLinksBurguer: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeHamburguerMenu = () => {
    setMenuOpen(false);
  };

  const isActiveNavLink = (pathname: string, component: string): object => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const pathName = pathSegments.length > 0 ? pathSegments[0] : "";
    return pathName === component ? { id: "current" } : {};
  };

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={({ isOpen }) => {
        return setMenuOpen(isOpen);
      }}
      right={false}
    >
      <Link
        to="/"
        {...isActiveNavLink(location.pathname, "")}
        title={breadcrumbParts["/"].title}
        aria-label={breadcrumbParts["/"].title}
        onClick={() => closeHamburguerMenu()}
      >
        <i className="halflings white home"></i> Inicio
      </Link>

      <Link
        to="/cursos"
        {...isActiveNavLink(location.pathname, "cursos")}
        onClick={() => closeHamburguerMenu()}
      >
        <i className="halflings white file"></i> Cursos
      </Link>

      <Link
        to={breadcrumbParts["material"].url}
        title={breadcrumbParts["material"].title}
        aria-label={breadcrumbParts["material"].title}
        {...isActiveNavLink(location.pathname, "material")}
        onClick={() => closeHamburguerMenu()}
      >
        <i className="halflings white home"></i> Material
      </Link>

      <Link
        to={breadcrumbParts["bedelia"].url}
        title={breadcrumbParts["bedelia"].title}
        aria-label={breadcrumbParts["bedelia"].title}
        {...isActiveNavLink(location.pathname, "bedelia")}
        onClick={() => closeHamburguerMenu()}
      >
        <i className="halflings white home"></i> Bedelía
      </Link>

      <Link
        to={AULAS_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Ir a Aulas"
        aria-label="Ir a Aulas"
        onClick={() => closeHamburguerMenu()}
      >
        <i className="halflings white home"></i> Aulas
      </Link>

      <Link
        to={breadcrumbParts["contacto"].url}
        title={breadcrumbParts["contacto"].title}
        aria-label={breadcrumbParts["contacto"].title}
        {...isActiveNavLink(location.pathname, "contacto")}
        onClick={() => closeHamburguerMenu()}
      >
        <i className="halflings white envelope"></i> Contacto
      </Link>

      {/* Redes sociales - solo visibles en mobile */}
      <div className="mobile-social-icons">
        <Link
          to={SOCIAL_URLS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          title={`Facebook de ${SITE_NAME}`}
          aria-label={`Facebook de ${SITE_NAME}`}
          onClick={() => {
            AnalyticsService.trackEvent("Social", "Click", "Ir a Facebook");
            closeHamburguerMenu();
          }}
        >
          <i className="social-icon facebook"></i> Facebook
        </Link>
        <Link
          to={SOCIAL_URLS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          title={`Instagram de ${SITE_NAME}`}
          aria-label={`Instagram de ${SITE_NAME}`}
          onClick={() => {
            AnalyticsService.trackEvent("Social", "Click", "Ir a Instagram");
            closeHamburguerMenu();
          }}
        >
          <i className="social-icon instagram"></i> Instagram
        </Link>
        <Link
          to={SOCIAL_URLS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title={`Linkedin de ${SITE_NAME}`}
          aria-label={`Linkedin de ${SITE_NAME}`}
          onClick={() => {
            AnalyticsService.trackEvent("Social", "Click", "Ir a Linkedin");
            closeHamburguerMenu();
          }}
        >
          <i className="social-icon linkedin"></i> Linkedin
        </Link>
        <Link
          to={SOCIAL_URLS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          title={`Chatea con nosotros ${SITE_NAME}`}
          aria-label={`Chatea con nosotros ${SITE_NAME}`}
          onClick={() => {
            AnalyticsService.trackEvent("Social", "Click", "Ir a Whatsapp");
            closeHamburguerMenu();
          }}
        >
          <i className="social-icon whatsapp"></i> Whatsapp
        </Link>
      </div>
    </Menu>
  );
};

export default MenuLinksBurguer;
