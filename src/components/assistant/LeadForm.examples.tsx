// Ejemplo de uso del componente LeadForm (LeadCaptureForm)
// Este archivo muestra cómo usar el formulario de captura de leads

import LeadForm from './LeadForm';
import { LeadCaptureData } from '../../types/assistant';

// Ejemplo 1: Formulario básico sin cursos
const BasicLeadFormExample = () => {
  const handleSubmit = async (data: LeadCaptureData) => {
    console.log('Datos enviados:', data);
    // Aquí iría la llamada al API
    // await AssistantService.captureInterest(data);
  };

  const handleCancel = () => {
    console.log('Formulario cancelado');
  };

  return (
    <LeadForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

// Ejemplo 2: Formulario con cursos recomendados
const LeadFormWithCoursesExample = () => {
  const courseIds = ['curso-1', 'curso-2', 'curso-3'];
  const courseNames = [
    'Introducción a la Programación',
    'React Avanzado',
    'Arquitectura de Software'
  ];

  const handleSubmit = async (data: LeadCaptureData) => {
    console.log('Lead capturado con cursos:', data);
    // POST /assistant/interest
  };

  return (
    <LeadForm
      interestedCourses={courseIds}
      courseNames={courseNames}
      onSubmit={handleSubmit}
      onCancel={() => console.log('Cancelado')}
    />
  );
};

// Ejemplo 3: Integración completa con estado de éxito
const FullIntegrationExample = () => {
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = async (data: LeadCaptureData) => {
    try {
      // Simulación de API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('¡Éxito!', data);
      // El formulario se cierra automáticamente después de 2 segundos
      setTimeout(() => {
        setShowForm(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      throw error; // El formulario manejará el error
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>
        Solicitar información
      </button>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <LeadForm
              courseNames={['React TypeScript', 'Node.js Avanzado']}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Datos de prueba válidos
export const VALID_TEST_DATA = {
  name: 'Juan Pérez',
  phone: '099 123 456', // Formato uruguayo válido
  email: 'juan@example.com',
  acceptWhatsApp: true,
};

// Casos de validación
export const VALIDATION_CASES = {
  // Nombres válidos
  validNames: [
    'Juan',
    'María García',
    'José Luis Rodríguez',
  ],
  
  // Nombres inválidos
  invalidNames: [
    'AB', // Muy corto (menos de 3 caracteres)
    '  ', // Solo espacios
  ],
  
  // Teléfonos válidos (Uruguay)
  validPhones: [
    '099123456',
    '099 123 456',
    '09 912 3456',
    '91234567', // Sin 0 inicial
  ],
  
  // Teléfonos inválidos
  invalidPhones: [
    '123456', // Muy corto
    '012345678', // No empieza con 09X
    'abcdefgh', // Letras
    '099-123-456', // Formato incorrecto (usa guiones)
  ],
  
  // Emails válidos
  validEmails: [
    'usuario@dominio.com',
    'nombre.apellido@empresa.uy',
    'test+tag@ejemplo.com.ar',
  ],
  
  // Emails inválidos
  invalidEmails: [
    'invalido@', // Sin dominio
    '@dominio.com', // Sin usuario
    'sin-arroba.com', // Sin @
    'doble@@dominio.com', // Doble @
  ],
};

// Mensajes de error esperados
export const ERROR_MESSAGES = {
  nameRequired: 'El nombre es requerido',
  nameMinLength: 'El nombre debe tener al menos 3 caracteres',
  phoneRequired: 'El teléfono es requerido',
  phoneInvalid: 'Formato inválido. Ej: 099 123 456',
  emailInvalid: 'Formato de email inválido',
  whatsappRequired: 'Debes aceptar ser contactado por WhatsApp',
  rateLimit: 'Has alcanzado el límite de solicitudes. Por favor, intenta más tarde.',
  genericError: 'Error al enviar la información. Por favor, intenta nuevamente.',
};

// Estados del formulario
export const FORM_STATES = {
  idle: 'Estado inicial, esperando entrada del usuario',
  submitting: 'Enviando datos al servidor (botón con loading)',
  success: 'Datos enviados correctamente (mensaje de éxito)',
  error: 'Error en el envío (mensaje de error visible)',
};

export default {
  BasicLeadFormExample,
  LeadFormWithCoursesExample,
  FullIntegrationExample,
};
