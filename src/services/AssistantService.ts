import apiClient from "../interceptors/apiClient";
import {
  ChatResponse,
  ConversationHistory,
  LeadCaptureData,
} from "../types/assistant";

const API_BASE = "/assistant";

export class AssistantService {
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

  static async captureInterest(data: LeadCaptureData): Promise<void> {
    await apiClient.post(`${API_BASE}/interest`, data);
  }
}
