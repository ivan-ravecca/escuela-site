import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ChatWidgetErrorBoundary from "./ChatWidgetErrorBoundary";

const BrokenChild = () => {
  throw new Error("boom");
};

describe("ChatWidgetErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    localStorage.clear();
  });

  it("renders children when there is no error", () => {
    render(
      <ChatWidgetErrorBoundary>
        <div>Contenido del chat</div>
      </ChatWidgetErrorBoundary>
    );

    expect(screen.getByText("Contenido del chat")).toBeInTheDocument();
  });

  it("renders fallback UI and resets state", () => {
    localStorage.setItem("assistant_conversation", "[]");

    render(
      <ChatWidgetErrorBoundary>
        <BrokenChild />
      </ChatWidgetErrorBoundary>
    );

    expect(
      screen.getByText("El asistente no está disponible temporalmente.")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(localStorage.getItem("assistant_conversation")).toBeNull();
  });

  it("renders custom fallback when provided", () => {
    render(
      <ChatWidgetErrorBoundary fallback={<div>Fallback custom</div>}>
        <BrokenChild />
      </ChatWidgetErrorBoundary>
    );

    expect(screen.getByText("Fallback custom")).toBeInTheDocument();
  });
});
