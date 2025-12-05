import React, { useState } from "react";
import { LeadCaptureData } from "../../types/assistant";

interface LeadFormProps {
  interestedCourses?: string[];
  onSubmit: (data: LeadCaptureData) => Promise<void>;
  onCancel?: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({
  interestedCourses = [],
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Por favor completa nombre y teléfono");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        interested_courses: interestedCourses.length > 0 ? interestedCourses : undefined,
      });
    } catch (err) {
      setError("Error al enviar. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        ¡Genial! Déjanos tus datos y te contactaremos pronto
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tu nombre"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="099 123 456"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email (opcional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="tu@email.com"
            disabled={isSubmitting}
          />
        </div>
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
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
