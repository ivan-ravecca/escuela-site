import { beforeEach, describe, expect, it, vi } from "vitest";
import { AssistantService } from "./AssistantService";

vi.mock("../interceptors/apiClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
  initializeCSRF: vi.fn(),
}));

const loadApiClientMock = async () => {
  const apiClientModule = await import("../interceptors/apiClient");
  return apiClientModule.default as unknown as {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };
};

const loadInitializeCSRFFn = async () => {
  const apiClientModule = await import("../interceptors/apiClient");
  return apiClientModule.initializeCSRF as ReturnType<typeof vi.fn>;
};

describe("AssistantService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes csrf via interceptor module", async () => {
    const initializeCSRFFn = await loadInitializeCSRFFn();
    initializeCSRFFn.mockResolvedValueOnce(undefined);

    await AssistantService.initializeCSRF();

    expect(initializeCSRFFn).toHaveBeenCalledTimes(1);
  });

  it("gets welcome message from assistant endpoint", async () => {
    const apiClient = await loadApiClientMock();
    apiClient.get.mockResolvedValueOnce({ data: { message: "Bienvenido" } });

    const result = await AssistantService.getWelcomeMessage();

    expect(apiClient.get).toHaveBeenCalledWith("/assistant/welcome");
    expect(result).toBe("Bienvenido");
  });

  it("sends chat message with conversation history", async () => {
    const apiClient = await loadApiClientMock();
    apiClient.post.mockResolvedValueOnce({ data: { response: "ok" } });

    const history = [{ role: "assistant", content: "hola" }] as const;
    const result = await AssistantService.sendMessage("nuevo", [...history]);

    expect(apiClient.post).toHaveBeenCalledWith("/assistant/chat", {
      message: "nuevo",
      conversation_history: [...history],
    });
    expect(result).toEqual({ response: "ok" });
  });

  it("captures lead interest payload", async () => {
    const apiClient = await loadApiClientMock();
    const payload = {
      name: "Ana",
      phone: "099123456",
      email: "ana@example.com",
      course_id: "auxiliar-enfermeria",
      course_name: "Auxiliar de Enfermeria",
    };
    apiClient.post.mockResolvedValueOnce({
      data: { success: true, message: "ok" },
    });

    const result = await AssistantService.captureInterest(payload);

    expect(apiClient.post).toHaveBeenCalledWith("/assistant/interest", payload);
    expect(result).toEqual({ success: true, message: "ok" });
  });
});
