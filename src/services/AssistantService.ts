import apiClient, { initializeCSRF } from "../interceptors/apiClient";
import {
  ChatResponse,
  ConversationHistory,
  LeadCaptureData,
} from "../types/assistant";

const API_BASE = "/assistant";

export class AssistantService {
  // Inicializar CSRF token
  static async initializeCSRF(): Promise<void> {
    return initializeCSRF();
  }

  static async getWelcomeMessage(): Promise<string> {
    const response = await apiClient.get<{ message: string }>(
      `${API_BASE}/welcome`
    );
    return response.data.message;
  }

  static async sendMessage(
    message: string,
    conversationHistory?: ConversationHistory[]
  ): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>(`${API_BASE}/chat`, {
      message,
      conversation_history: conversationHistory,
    });
    return response.data;
  }

  static async captureInterest(data: LeadCaptureData): Promise<{ message: string; success: boolean }> {
    const response = await apiClient.post<{ message: string; success: boolean }>(
      `${API_BASE}/interest`,
      data
    );
    return response.data;
  }
}
