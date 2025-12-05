export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendedCourses?: Course[];
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  path: string;
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
  email?: string;
  interested_courses?: string[];
}
