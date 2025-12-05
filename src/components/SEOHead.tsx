import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_NAME, CONTACT_EMAIL, PHONE_NUMBER, SITE_ADDRESS } from "../../app.config";
import { breadcrumbParts, COURSES } from "../data/courses";

const BASE_URL = "https://escuelaenfermeria.com.uy";
const DEFAULT_IMAGE = `${BASE_URL}/images/logos/logo_ancho_nuevo.png`;
const DEFAULT_DESCRIPTION =
  "Escuela de Enfermería en Pando, Uruguay. Cursos de auxiliar de enfermería, farmacia hospitalaria, camillero y más. Inscripciones abiertas.";

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image: string;
  courseId?: string;
}

const getSEOData = (pathname: string): SEOData => {
  const pathSegments = pathname.split("/").filter(Boolean);

  // Valores por defecto
  let seoData: SEOData = {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    keywords:
      "escuela enfermería, cursos enfermería, auxiliar enfermería, farmacia hospitalaria, camillero, Uruguay, Pando, Canelones",
    url: `${BASE_URL}${pathname}`,
    image: DEFAULT_IMAGE,
  };

  if (pathSegments.length === 0) {
    // Home
    return seoData;
  }

  if (pathSegments[0] === "cursos") {
    if (pathSegments.length === 1) {
      // Página de cursos
      seoData.title = `Cursos - ${SITE_NAME}`;
      seoData.description =
        "Descubre todos nuestros cursos de enfermería y salud. Auxiliar de enfermería, farmacia hospitalaria, camillero, y más. Inscripciones abiertas.";
      seoData.keywords =
        "cursos enfermería, auxiliar enfermería, farmacia hospitalaria, camillero, cursos salud, Uruguay";
    } else {
      // Curso específico
      const courseId = pathSegments[1];
      const course = COURSES.find((c) => c.id === courseId);
      if (course) {
        seoData.title = `${course.title} - ${SITE_NAME}`;
        seoData.description = course.term || `Curso de ${course.title} en ${SITE_NAME}. ${course.openRegistration || ""}`;
        seoData.keywords = `${course.title}, curso ${course.title}, enfermería, salud, Uruguay, Pando`;
        seoData.courseId = courseId;
      }
    }
  } else if (pathSegments[0] === "contacto") {
    seoData.title = `Contacto - ${SITE_NAME}`;
    seoData.description =
      "Contáctanos para más información sobre nuestros cursos de enfermería. Estamos en Pando, Canelones, Uruguay.";
    seoData.keywords =
      "contacto escuela enfermería, información cursos, Pando, Canelones, Uruguay";
  } else if (pathSegments[0] === "bedelia") {
    seoData.title = `Bedelía - ${SITE_NAME}`;
    seoData.description =
      "Accede a los servicios de bedelía: constancias, certificados y trámites administrativos de la Escuela de Enfermería Arte y Ciencia.";
    seoData.keywords =
      "bedelía, constancias, certificados, trámites, escuela enfermería";
  } else if (pathSegments[0] === "material") {
    seoData.title = `Material - ${SITE_NAME}`;
    seoData.description =
      "Accede al material de estudio y recursos educativos de la Escuela de Enfermería Arte y Ciencia.";
    seoData.keywords = "material estudio, recursos educativos, enfermería";
  } else {
    // Otras páginas: usar breadcrumbParts si existe
    const lastSegment = pathSegments[pathSegments.length - 1];
    const breadcrumb = breadcrumbParts[lastSegment];
    if (breadcrumb) {
      seoData.title = `${breadcrumb.title} - ${SITE_NAME}`;
    }
  }

  return seoData;
};

const updateMetaTag = (
  selector: string,
  attribute: string,
  value: string
): void => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
};

// Schema.org: Organization (información de la escuela)
const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_ADDRESS.visualShort,
    addressLocality: "Pando",
    addressRegion: "Canelones",
    addressCountry: "UY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.7193863,
    longitude: -55.9574888,
  },
  telephone: PHONE_NUMBER.visual,
  email: CONTACT_EMAIL.visual,
  sameAs: [
    "https://www.facebook.com/EscuelaDeEnfermeriaArteCiencia",
    "https://www.instagram.com/escuelaenfermeriaarteyciencia",
    "https://www.linkedin.com/company/escuela-de-enfermer%C3%ADa-arte-y-ciencia/",
  ],
});

// Schema.org: Course (información del curso específico)
const getCourseSchema = (courseId: string) => {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.term || `Curso de ${course.title}`,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    url: `${BASE_URL}${course.path}`,
    educationalLevel: "Profesional",
    inLanguage: "es",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      category: "Curso presencial",
    },
  };
};

// Schema.org: BreadcrumbList (navegación)
const getBreadcrumbSchema = (pathname: string) => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: BASE_URL,
    },
  ];

  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const breadcrumb = breadcrumbParts[segment];
    if (breadcrumb) {
      items.push({
        "@type": "ListItem",
        position: index + 2,
        name: breadcrumb.title,
        item: `${BASE_URL}${currentPath}`,
      });
    }
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
};

// Actualizar o crear script JSON-LD
const updateJsonLd = (id: string, data: object | null) => {
  const existingScript = document.getElementById(id);
  
  if (!data) {
    if (existingScript) {
      existingScript.remove();
    }
    return;
  }

  if (existingScript) {
    existingScript.textContent = JSON.stringify(data);
  } else {
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
};

const SEOHead: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const seoData = getSEOData(location.pathname);

    // Actualizar título
    document.title = seoData.title;

    // Actualizar meta tags básicos
    updateMetaTag('meta[name="description"]', "content", seoData.description);
    updateMetaTag('meta[name="keywords"]', "content", seoData.keywords);
    updateMetaTag('link[rel="canonical"]', "href", seoData.url);

    // Actualizar Open Graph
    updateMetaTag('meta[property="og:title"]', "content", seoData.title);
    updateMetaTag(
      'meta[property="og:description"]',
      "content",
      seoData.description
    );
    updateMetaTag('meta[property="og:url"]', "content", seoData.url);
    updateMetaTag('meta[property="og:image"]', "content", seoData.image);

    // Actualizar Twitter
    updateMetaTag('meta[name="twitter:title"]', "content", seoData.title);
    updateMetaTag(
      'meta[name="twitter:description"]',
      "content",
      seoData.description
    );
    updateMetaTag('meta[name="twitter:url"]', "content", seoData.url);
    updateMetaTag('meta[name="twitter:image"]', "content", seoData.image);

    // Actualizar Schema.org JSON-LD
    updateJsonLd("schema-organization", getOrganizationSchema());
    updateJsonLd("schema-breadcrumb", getBreadcrumbSchema(location.pathname));
    
    // Schema de curso (solo en páginas de curso específico)
    if (seoData.courseId) {
      updateJsonLd("schema-course", getCourseSchema(seoData.courseId));
    } else {
      updateJsonLd("schema-course", null);
    }
  }, [location.pathname]);

  return null;
};

export default SEOHead;
