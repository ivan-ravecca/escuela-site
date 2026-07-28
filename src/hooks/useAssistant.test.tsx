import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAssistant } from "./useAssistant";
import { AssistantService } from "../services/AssistantService";

vi.mock("../services/AssistantService", () => ({
  AssistantService: {
    initializeCSRF: vi.fn(),
    getWelcomeMessage: vi.fn(),
    sendMessage: vi.fn(),
  },
}));

describe("useAssistant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    vi.mocked(AssistantService.initializeCSRF).mockResolvedValue(undefined);
    vi.mocked(AssistantService.getWelcomeMessage).mockResolvedValue(
      "Hola, soy tu asistente"
    );
    vi.mocked(AssistantService.sendMessage).mockResolvedValue({
      response: "Respuesta del asistente",
      recommended_courses: [],
    });
  });

  it("hydrates messages from localStorage and skips welcome request", async () => {
    localStorage.setItem(
      "assistant_conversation",
      JSON.stringify([
        {
          id: "stored-1",
          role: "assistant",
          content: "Mensaje guardado",
          timestamp: "2026-07-28T12:00:00.000Z",
        },
      ])
    );

    const { result } = renderHook(() => useAssistant());

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe("Mensaje guardado");
    expect(result.current.messages[0].timestamp).toBeInstanceOf(Date);

    await waitFor(() => {
      expect(AssistantService.initializeCSRF).not.toHaveBeenCalled();
      expect(AssistantService.getWelcomeMessage).not.toHaveBeenCalled();
    });
  });

  it("sends a user message and appends assistant response", async () => {
    const { result } = renderHook(() => useAssistant());

    await waitFor(() => {
      expect(AssistantService.getWelcomeMessage).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await result.current.sendMessage("Necesito informacion");
    });

    expect(AssistantService.sendMessage).toHaveBeenCalledWith(
      "Necesito informacion",
      expect.arrayContaining([
        expect.objectContaining({
          role: "user",
          content: "Necesito informacion",
        }),
      ])
    );

    expect(
      result.current.messages.some(
        (message) =>
          message.role === "assistant" &&
          message.content === "Respuesta del asistente"
      )
    ).toBe(true);
  });

  it("blocks message after reaching per-minute rate limit", async () => {
    localStorage.setItem(
      "assistant_conversation",
      JSON.stringify([
        {
          id: "stored-1",
          role: "assistant",
          content: "Mensaje inicial",
          timestamp: "2026-07-28T12:00:00.000Z",
        },
      ])
    );

    const { result } = renderHook(() => useAssistant());

    for (let index = 0; index < 10; index += 1) {
      await act(async () => {
        await result.current.sendMessage(`mensaje-${index}`);
      });
    }

    await act(async () => {
      await result.current.sendMessage("mensaje-11");
    });

    expect(result.current.error).toContain("límite");
    expect(AssistantService.sendMessage).toHaveBeenCalledTimes(10);
  });

  it("validates empty message before calling service", async () => {
    localStorage.setItem(
      "assistant_conversation",
      JSON.stringify([
        {
          id: "stored-1",
          role: "assistant",
          content: "Mensaje inicial",
          timestamp: "2026-07-28T12:00:00.000Z",
        },
      ])
    );

    const { result } = renderHook(() => useAssistant());

    await act(async () => {
      await result.current.sendMessage("   ");
    });

    expect(result.current.error).toBe("El mensaje no puede estar vacío");
    expect(AssistantService.sendMessage).not.toHaveBeenCalled();
  });

  it("clears stored conversation and reloads welcome message", async () => {
    localStorage.setItem(
      "assistant_conversation",
      JSON.stringify([
        {
          id: "stored-1",
          role: "assistant",
          content: "Mensaje inicial",
          timestamp: "2026-07-28T12:00:00.000Z",
        },
      ])
    );

    vi.mocked(AssistantService.getWelcomeMessage).mockResolvedValue(
      "Bienvenida recargada"
    );

    const { result } = renderHook(() => useAssistant());

    await act(async () => {
      await result.current.clearConversation();
    });

    expect(localStorage.getItem("assistant_conversation")).toBeTruthy();
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe("Bienvenida recargada");
    expect(AssistantService.initializeCSRF).toHaveBeenCalledTimes(1);
    expect(AssistantService.getWelcomeMessage).toHaveBeenCalledTimes(1);
  });

  it("adds manual assistant message and contact request", () => {
    localStorage.setItem(
      "assistant_conversation",
      JSON.stringify([
        {
          id: "stored-1",
          role: "assistant",
          content: "Mensaje inicial",
          timestamp: "2026-07-28T12:00:00.000Z",
        },
      ])
    );

    const { result } = renderHook(() => useAssistant());

    act(() => {
      result.current.addAssistantMessage("Seguimos por este canal");
      result.current.requestContactForCourse("course-1", "Auxiliar de Enfermeria");
    });

    expect(
      result.current.messages.some(
        (message) =>
          message.role === "assistant" &&
          message.content === "Seguimos por este canal"
      )
    ).toBe(true);

    expect(
      result.current.messages.some(
        (message) =>
          message.role === "assistant" &&
          message.content.includes("Auxiliar de Enfermeria")
      )
    ).toBe(true);
  });
});
