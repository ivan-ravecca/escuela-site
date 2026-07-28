import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatWidgetProvider, useChatWidget } from "./ChatWidgetContext";

const Consumer = () => {
  const { isOpen, setIsOpen, conversationId, setConversationId } = useChatWidget();

  return (
    <>
      <div data-testid="open">{String(isOpen)}</div>
      <div data-testid="conversation">{conversationId ?? "none"}</div>
      <button type="button" onClick={() => setIsOpen(true)}>
        abrir
      </button>
      <button type="button" onClick={() => setConversationId("conv-1")}>
        set-conv
      </button>
    </>
  );
};

describe("ChatWidgetContext", () => {
  it("throws if hook is used outside provider", () => {
    const BrokenConsumer = () => {
      useChatWidget();
      return null;
    };

    expect(() => render(<BrokenConsumer />)).toThrow(
      "useChatWidget must be used within a ChatWidgetProvider"
    );
  });

  it("provides and updates state values", () => {
    render(
      <ChatWidgetProvider>
        <Consumer />
      </ChatWidgetProvider>
    );

    expect(screen.getByTestId("open").textContent).toBe("false");
    expect(screen.getByTestId("conversation").textContent).toBe("none");

    fireEvent.click(screen.getByRole("button", { name: "abrir" }));
    fireEvent.click(screen.getByRole("button", { name: "set-conv" }));

    expect(screen.getByTestId("open").textContent).toBe("true");
    expect(screen.getByTestId("conversation").textContent).toBe("conv-1");
  });
});
