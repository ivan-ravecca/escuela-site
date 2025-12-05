// Mock data para testing del ChatWidget sin backend

export const mockWelcomeMessage = "¡Hola! 👋 Soy tu asistente virtual de la Escuela de Enfermería Arte & Ciencia. Estoy aquí para ayudarte a encontrar el curso perfecto para ti. ¿En qué puedo ayudarte hoy?";

export const mockCourses = [
  {
    id: "auxiliar-enfermeria",
    title: "Auxiliar de Enfermería",
    description: "Curso de 24 meses presencial para formar profesionales en el cuidado de la salud.",
    path: "/cursos/auxiliar-enfermeria"
  },
  {
    id: "auxiliar-farmacia-hospitalaria",
    title: "Auxiliar de Farmacia Hospitalaria",
    description: "Formación especializada en gestión y administración farmacéutica hospitalaria.",
    path: "/cursos/auxiliar-farmacia-hospitalaria"
  },
  {
    id: "camillero",
    title: "Curso de Camillero",
    description: "Capacitación para el transporte y movilización de pacientes en instituciones de salud.",
    path: "/cursos/camillero"
  }
];

export const mockResponses: Record<string, { response: string; courses?: typeof mockCourses }> = {
  default: {
    response: "Entiendo. ¿Podrías darme más detalles sobre lo que estás buscando? Por ejemplo, ¿te interesa la enfermería, farmacia u otro área de la salud?"
  },
  enfermeria: {
    response: "¡Excelente elección! Tenemos varios cursos relacionados con enfermería. Te recomiendo especialmente nuestro curso de Auxiliar de Enfermería, que es el más completo. ¿Te gustaría más información?",
    courses: [mockCourses[0]]
  },
  farmacia: {
    response: "¡Perfecto! Nuestro curso de Auxiliar de Farmacia Hospitalaria es ideal para ti. Es una especialización muy demandada en el sector salud. ¿Quieres conocer más detalles?",
    courses: [mockCourses[1]]
  },
  todos: {
    response: "Aquí te muestro todos nuestros cursos disponibles. Puedes hacer click en cualquiera para ver más información:",
    courses: mockCourses
  },
  contacto: {
    response: "¡Genial! Me gustaría ayudarte personalmente. ¿Podrías completar el formulario con tus datos para que nuestro equipo se comunique contigo?"
  },
  precio: {
    response: "Los precios varían según el curso y las opciones de pago disponibles. Te recomiendo que nos dejes tus datos para que podamos brindarte información detallada y personalizada sobre costos y facilidades de pago."
  },
  duracion: {
    response: "Nuestros cursos tienen diferentes duraciones:\n\n• Auxiliar de Enfermería: 24 meses\n• Cursos de especialización: 6-12 meses\n• Talleres y actualizaciones: 3-6 meses\n\n¿Te interesa algún curso en particular?"
  }
};

export const getMockResponse = (message: string) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("enfermer")) return mockResponses.enfermeria;
  if (lowerMessage.includes("farmacia")) return mockResponses.farmacia;
  if (lowerMessage.includes("todos") || lowerMessage.includes("cursos")) return mockResponses.todos;
  if (lowerMessage.includes("contacto") || lowerMessage.includes("contactar") || lowerMessage.includes("información")) return mockResponses.contacto;
  if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("cuanto")) return mockResponses.precio;
  if (lowerMessage.includes("duraci") || lowerMessage.includes("tiempo") || lowerMessage.includes("cuánto dura")) return mockResponses.duracion;
  
  return mockResponses.default;
};
