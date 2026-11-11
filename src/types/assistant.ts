export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendedCourses?: Course[];
}

export interface Course {
  id: string;
  name: string;
  url: string;
  description?: string;
  duration_hours?: number;
  duration_text?: string;
  modality?: 'presencial' | 'virtual' | 'semipresencial';
  category?: 'inicial' | 'avanzado' | 'especializacion' | 'especialización';
  job_opportunities?: string | string[];
  // Legacy fields for backwards compatibility
  title?: string;
  path?: string;
}

export interface ConversationHistory {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  response: string;
  recommended_courses?: Course[];
}

export interface LeadCaptureData {
  name: string;
  phone: string;
  email: string;
  course_id: string;
  course_name: string;
}
