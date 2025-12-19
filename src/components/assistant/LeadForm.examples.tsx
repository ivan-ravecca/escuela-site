// Example usage of the LeadForm component (LeadCaptureForm)
// This file shows how to use the lead capture form

import LeadForm from './LeadForm';
import { LeadCaptureData } from '../../types/assistant';

// Example 1: Basic form without courses
const BasicLeadFormExample = () => {
  const handleSubmit = async (data: LeadCaptureData) => {
    console.log('Datos enviados:', data);
    // Here you would call the API
    // await AssistantService.captureInterest(data);
  };

  const handleCancel = () => {
    console.log('Form canceled');
  };

  return (
    <LeadForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

// Example 2: Form with recommended courses
const LeadFormWithCoursesExample = () => {
  const courseIds = ['curso-1', 'curso-2', 'curso-3'];
  const courseNames = [
    'Introducción a la Programación',
    'React Avanzado',
    'Arquitectura de Software'
  ];

  const handleSubmit = async (data: LeadCaptureData) => {
    console.log('Lead captured with courses:', data);
    // POST /assistant/interest
  };

  return (
    <LeadForm
      interestedCourses={courseIds}
      courseNames={courseNames}
      onSubmit={handleSubmit}
      onCancel={() => console.log('Canceled')}
    />
  );
};

// Example 3: Full integration with success state
const FullIntegrationExample = () => {
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = async (data: LeadCaptureData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Success!', data);
      // The form closes automatically after 2 seconds
      setTimeout(() => {
        setShowForm(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      throw error; // The form will handle the error
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

// Valid test data
export const VALID_TEST_DATA = {
  name: 'Juan Pérez',
  phone: '099 123 456', // Valid Uruguayan format
  email: 'juan@example.com',
  acceptWhatsApp: true,
};

// Validation cases
export const VALIDATION_CASES = {
  // Valid names
  validNames: [
    'Juan',
    'María García',
    'José Luis Rodríguez',
  ],
  
  // Invalid names
  invalidNames: [
    'AB', // Muy corto (menos de 3 caracteres)
    '  ', // Solo espacios
  ],
  
  // Valid phones (Uruguay)
  validPhones: [
    '099123456',
    '099 123 456',
    '09 912 3456',
    '91234567', // Sin 0 inicial
  ],
  
  // Invalid phones
  invalidPhones: [
    '123456', // Muy corto
    '012345678', // No empieza con 09X
    'abcdefgh', // Letras
    '099-123-456', // Formato incorrecto (usa guiones)
  ],
  
  // Valid emails
  validEmails: [
    'usuario@dominio.com',
    'nombre.apellido@empresa.uy',
    'test+tag@ejemplo.com.ar',
  ],
  
  // Invalid emails
  invalidEmails: [
    'invalido@', // Sin dominio
    '@dominio.com', // Sin usuario
    'sin-arroba.com', // Sin @
    'doble@@dominio.com', // Doble @
  ],
};

// Expected error messages
export const ERROR_MESSAGES = {
  nameRequired: 'Name is required',
  nameMinLength: 'Name must be at least 3 characters',
  phoneRequired: 'Phone is required',
  phoneInvalid: 'Invalid format. Eg: 099 123 456',
  emailInvalid: 'Invalid email format',
  whatsappRequired: 'You must accept to be contacted via WhatsApp',
  rateLimit: 'You have reached the request limit. Please try again later.',
  genericError: 'Error sending the information. Please try again.',
};

// Form states
export const FORM_STATES = {
  idle: 'Initial state, waiting for user input',
  submitting: 'Submitting data to the server (button with loading)',
  success: 'Data sent successfully (success message)',
  error: 'Error during submission (error message visible)',
};

export default {
  BasicLeadFormExample,
  LeadFormWithCoursesExample,
  FullIntegrationExample,
};
