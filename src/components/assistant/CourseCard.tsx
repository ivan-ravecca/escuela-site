import React from "react";
import { ExternalLink, Clock, PhoneCall } from "lucide-react";
import { Course } from "../../types/assistant";
import { COLORS } from "../../constants/colors";

interface CourseCardProps {
  course: Course;
  onSelect?: (courseId: string) => void;
  onContactInterest?: (courseId: string, courseName: string) => void;
}

// Mapeo de colores para categorías
const categoryColors: Record<string, string> = {
  inicial: COLORS.categoryInicial,
  avanzado: COLORS.categoryAvanzado,
  especialización: COLORS.categoryEspecializacion,
};

// Mapeo de colores para modalidades
const modalityColors: Record<string, string> = {
  presencial: COLORS.modalityPresencial,
  virtual: COLORS.modalityVirtual,
  semipresencial: COLORS.modalitySemipresencial,
};

// Función helper para truncar texto
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

// Función para convertir horas a formato legible
const formatDuration = (hours?: number): string => {
  if (!hours) return "";
  
  const months = Math.round(hours / 40); // Asumiendo 40 horas por mes
  
  if (months === 0) {
    return `${hours} horas`;
  } else if (months === 1) {
    return `${hours} horas - 1 mes aprox`;
  } else {
    return `${hours} horas - ${months} meses aprox`;
  }
};

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, onContactInterest }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Compatibilidad con campos legacy
  const courseName = course.name || course.title || "Curso sin título";
  const courseUrl = course.url || course.path || "#";
  const description = course.description || "";

  const handleClick = () => {
    onSelect?.(course.id);
  };

  return (
    <div
      className="relative bg-white rounded-lg overflow-hidden transition-all duration-200 mb-3"
      style={{
        border: `1px solid ${COLORS.borderLightGray}`,
        boxShadow: isHovered
          ? "0 4px 12px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ padding: "14px" }}>
        {/* Header con badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
          {course.category && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "3px 10px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "600",
                color: COLORS.white,
                backgroundColor: categoryColors[course.category],
                textTransform: "capitalize",
              }}
            >
              {course.category}
            </span>
          )}
          {course.modality && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "3px 10px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "600",
                color: COLORS.white,
                backgroundColor: modalityColors[course.modality],
                textTransform: "capitalize",
              }}
            >
              {course.modality}
            </span>
          )}
        </div>

        {/* Título del curso */}
        <h3
          style={{ 
            fontSize: "15px",
            fontWeight: "700",
            lineHeight: "1.4",
            marginBottom: "8px",
            color: COLORS.textGray,
          }}
        >
          {courseName}
        </h3>

        {/* Descripción */}
        {description && (
          <p
            style={{
              fontSize: "13px",
              color: COLORS.textLightGray,
              lineHeight: "1.5",
              marginBottom: "10px",
            }}
          >
            {truncateText(description, 120)}
          </p>
        )}

        {/* Duración */}
        {course.duration_hours && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "12px",
              fontSize: "12px",
              color: COLORS.mediumGray,
            }}
          >
            <Clock size={14} />
            <span>{formatDuration(course.duration_hours)}</span>
          </div>
        )}

        {/* Botones de acción */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <a
            href={courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              width: "100%",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: COLORS.white,
              backgroundColor: COLORS.schoolGreenPrimary,
              textDecoration: "none",
              transition: "all 0.2s",
              cursor: "pointer",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.schoolGreenHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.schoolGreenPrimary;
            }}
          >
            Ver más información
            <ExternalLink size={14} />
          </a>
          
          <button
            onClick={() => onContactInterest?.(course.id, courseName)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              width: "100%",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: COLORS.schoolGreenPrimary,
              backgroundColor: "white",
              textDecoration: "none",
              transition: "all 0.2s",
              cursor: "pointer",
              border: `2px solid ${COLORS.schoolGreenPrimary}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.schoolGreenExtraLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            Me interesa que me contacten
            <PhoneCall size={14} />
          </button>
        </div>
      </div>

      {/* Indicador de oportunidades laborales (opcional) */}
      {course.job_opportunities && course.job_opportunities.length > 0 && (
        <div
          style={{
            padding: "8px 14px",
            fontSize: "11px",
            backgroundColor: COLORS.schoolGreenExtraLight,
            borderTop: `1px solid ${COLORS.borderGray}`,
            color: COLORS.textLightGray,
            fontWeight: "500",
          }}
        >
          💼 {course.job_opportunities.length} oportunidades laborales
        </div>
      )}
    </div>
  );
};

export default CourseCard;
