import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { LeadCaptureData } from "../../types/assistant";

interface LeadFormProps {
  interestedCourses?: string[]; // Array con un solo ID
  courseNames?: string[]; // Array con un solo nombre
  onSubmit: (data: LeadCaptureData) => Promise<void>;
  onCancel?: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  acceptWhatsApp: boolean;
}

// Validación de formato de teléfono uruguayo
const PHONE_REGEX = /^0?9[1-9]\d{6,7}$/; // Acepta 099123456 o 99123456
const formatPhoneNumber = (value: string): string => {
  // Eliminar espacios y guiones
  const cleaned = value.replace(/[\s-]/g, '');
  
  // Si tiene 9 dígitos y empieza con 09, formatear como XXX XXX XXX
  if (cleaned.length === 9 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  // Si tiene 8 dígitos y empieza con 9, formatear como XX XXX XXX
  if (cleaned.length === 8 && cleaned.startsWith('9')) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  
  return value;
};

const LeadForm: React.FC<LeadFormProps> = ({
  interestedCourses = [],
  courseNames = [],
  onSubmit,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      acceptWhatsApp: false,
    },
  });

  const phoneValue = watch("phone");

  // Formatear teléfono mientras el usuario escribe
  useEffect(() => {
    if (phoneValue) {
      const formatted = formatPhoneNumber(phoneValue);
      if (formatted !== phoneValue) {
        setValue("phone", formatted, { shouldValidate: true });
      }
    }
  }, [phoneValue, setValue]);

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Limpiar teléfono para enviar sin espacios
      const cleanedPhone = data.phone.replace(/[\s-]/g, '');

      // Obtener el primer curso (solo debería haber uno)
      const courseId = interestedCourses?.[0] || '';
      const courseName = courseNames?.[0] || '';

      if (!courseId || !courseName) {
        setSubmitError("Error: No se pudo identificar el curso de interés.");
        setIsSubmitting(false);
        return;
      }

      await onSubmit({
        name: data.name.trim(),
        phone: cleanedPhone,
        email: data.email.trim(),
        course_id: courseId,
        course_name: courseName,
      });

      setSubmitSuccess(true);

      // Cerrar el formulario después de 2 segundos
      setTimeout(() => {
        onCancel?.();
      }, 2000);
    } catch (err: any) {
      // Manejar diferentes tipos de errores
      if (err.response?.status === 429) {
        setSubmitError("Has alcanzado el límite de 3 solicitudes por hora. Por favor, intentá más tarde.");
      } else if (err.response?.status === 400) {
        // Manejar errores de campos faltantes
        const errorData = err.response?.data;
        if (errorData?.missing_fields) {
          const missingFields = Object.values(errorData.missing_fields).join(", ");
          setSubmitError(`Campos inválidos: ${missingFields}`);
        } else {
          setSubmitError(errorData?.error || "Datos inválidos. Por favor, verificá los campos.");
        }
      } else if (err.response?.data?.error) {
        setSubmitError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setSubmitError(err.response.data.message);
      } else {
        setSubmitError("Error al enviar la información. Por favor, intentá nuevamente.");
      }
      console.error("Error submitting lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar mensaje de éxito
  if (submitSuccess) {
    return (
      <div className="lead-form-success">
        <div className="success-content">
          <CheckCircle size={48} className="success-icon" />
          <h3>¡Gracias!</h3>
          <p>Nos contactaremos pronto por WhatsApp para brindarte más información.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-form-container">
      {/* Header */}
      <div className="lead-form-header">
        <h3>¡Genial! Déjanos tus datos y te contactaremos</h3>
        {onCancel && (
          <button
            onClick={onCancel}
            aria-label="Cerrar formulario"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Cursos recomendados (chips) */}
      {courseNames.length > 0 && (
        <div className="lead-form-courses">
          <p>Cursos de tu interés:</p>
          <div className="courses-list">
            {courseNames.map((courseName, index) => (
              <span key={index} className="course-chip">
                {courseName}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Nombre */}
        <div className="lead-form-field">
          <label>
            Nombre completo <span className="required">*</span>
          </label>
          <input
            {...register("name", {
              required: "El nombre es requerido",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              validate: (value) => 
                value.trim().length >= 3 || "El nombre debe tener al menos 3 caracteres"
            })}
            type="text"
            className={errors.name ? "error" : ""}
            placeholder="Ej: Juan Pérez"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>

        {/* Teléfono */}
        <div className="lead-form-field">
          <label>
            Teléfono <span className="required">*</span>
          </label>
          <input
            {...register("phone", {
              required: "El teléfono es requerido",
              validate: (value) => {
                const cleaned = value.replace(/[\s-]/g, '');
                return PHONE_REGEX.test(cleaned) || "Formato inválido. Ej: 099 123 456";
              }
            })}
            type="tel"
            className={errors.phone ? "error" : ""}
            placeholder="099 123 456"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="error-message">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="lead-form-field">
          <label>
            Email <span className="required">*</span>
          </label>
          <input
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Formato de email inválido",
              },
            })}
            type="email"
            className={errors.email ? "error" : ""}
            placeholder="tu@email.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        {/* Checkbox WhatsApp */}
        <div className="lead-form-checkbox">
          <div className="checkbox-wrapper">
            <input
              {...register("acceptWhatsApp", {
                required: "Debes aceptar ser contactado por WhatsApp",
              })}
              type="checkbox"
              id="acceptWhatsApp"
              disabled={isSubmitting}
            />
            <label htmlFor="acceptWhatsApp">
              Acepto que me contacten por WhatsApp <span className="required">*</span>
            </label>
          </div>
          {errors.acceptWhatsApp && (
            <p className="error-message">{errors.acceptWhatsApp.message}</p>
          )}
        </div>

        {/* Error general */}
        {submitError && (
          <div className="lead-form-error">
            <span className="error-icon">⚠️</span>
            <p>{submitError}</p>
          </div>
        )}

        {/* Botones */}
        <div className="lead-form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-submit"
          >
            {isSubmitting && (
              <Loader2 size={16} className="spinner" />
            )}
            {isSubmitting ? "Enviando..." : "Enviar información"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="btn-cancel"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
