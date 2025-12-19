import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { LeadCaptureData } from "../../types/assistant";

interface LeadFormProps {
  interestedCourses?: string[]; // Array with a single ID
  courseNames?: string[]; // Array with a single name
  onSubmit: (data: LeadCaptureData) => Promise<void>;
  onCancel?: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  acceptWhatsApp: boolean;
}

// Uruguayan phone format validation
const PHONE_REGEX = /^0?9[1-9]\d{6,7}$/; // Accepts 099123456 or 99123456
const formatPhoneNumber = (value: string): string => {
  // Remove spaces and hyphens
  const cleaned = value.replace(/[\s-]/g, '');
  
  // If it has 9 digits and starts with 09, format as XXX XXX XXX
  if (cleaned.length === 9 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  // If it has 8 digits and starts with 9, format as XX XXX XXX
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

  // Format phone while the user types
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
      // Sanitize phone to send without spaces
      const cleanedPhone = data.phone.replace(/[\s-]/g, '');

      // Get the first selected course (there should be only one)
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

      // Close the form after 2 seconds
      setTimeout(() => {
        onCancel?.();
      }, 2000);
    } catch (err: any) {
      // Handle different error types
      if (err.response?.status === 429) {
        setSubmitError("You've reached the limit of 3 requests per hour. Please try again later.");
      } else if (err.response?.status === 400) {
        // Handle missing field errors
        const errorData = err.response?.data;
        if (errorData?.missing_fields) {
          const missingFields = Object.values(errorData.missing_fields).join(", ");
          setSubmitError(`Invalid fields: ${missingFields}`);
        } else {
          setSubmitError(errorData?.error || "Invalid data. Please check the fields.");
        }
      } else if (err.response?.data?.error) {
        setSubmitError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setSubmitError(err.response.data.message);
      } else {
        setSubmitError("Error sending the information. Please try again.");
      }
      console.error("Error submitting lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message
  if (submitSuccess) {
    return (
      <div className="lead-form-success">
        <div className="success-content">
          <CheckCircle size={48} className="success-icon" />
          <h3>Thank you!</h3>
          <p>We'll contact you soon via WhatsApp to provide more information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-form-container">
      {/* Header */}
      <div className="lead-form-header">
        <h3>Great! Leave your details and we'll reach out</h3>
        {onCancel && (
          <button
            onClick={onCancel}
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Selected course (chips) */}
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

      {/* Form */}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Full name */}
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

        {/* Phone */}
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

        {/* WhatsApp checkbox */}
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

        {/* General error */}
        {submitError && (
          <div className="lead-form-error">
            <span className="error-icon">⚠️</span>
            <p>{submitError}</p>
          </div>
        )}

        {/* Actions */}
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
