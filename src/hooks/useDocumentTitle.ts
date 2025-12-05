import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SITE_NAME } from "../../app.config";
import { breadcrumbParts } from "../data/courses";

/**
 * Hook para actualizar el título del documento según la ruta actual
 */
export const useDocumentTitle = () => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let title = SITE_NAME;

    if (pathSegments.length === 0) {
      // Página de inicio
      title = SITE_NAME;
    } else if (pathSegments.length === 1) {
      // Páginas de primer nivel: /cursos, /contacto, /bedelia, etc.
      const segment = pathSegments[0];
      const breadcrumb = breadcrumbParts[segment];
      if (breadcrumb) {
        title = `${breadcrumb.title} - ${SITE_NAME}`;
      }
    } else if (pathSegments.length >= 2) {
      // Páginas de segundo nivel o más: /cursos/:course, /administracion/qr, etc.
      const lastSegment = pathSegments[pathSegments.length - 1];
      const breadcrumb = breadcrumbParts[lastSegment];
      if (breadcrumb) {
        title = `${breadcrumb.title} - ${SITE_NAME}`;
      } else {
        // Si no encontramos el breadcrumb, usar el primer segmento
        const firstSegment = pathSegments[0];
        const firstBreadcrumb = breadcrumbParts[firstSegment];
        if (firstBreadcrumb) {
          title = `${firstBreadcrumb.title} - ${SITE_NAME}`;
        }
      }
    }

    document.title = title;
  }, [location.pathname, params]);
};

export default useDocumentTitle;
