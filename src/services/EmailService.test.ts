import { beforeEach, describe, expect, it, vi } from "vitest";

const importEmailService = async () => {
  vi.resetModules();
  vi.stubEnv("VITE_API_URL", "http://api.test");
  return await import("./EmailService");
};

describe("EmailService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends contact payload to /email/send", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const { sendContact } = await importEmailService();
    await sendContact("Ana", "ana@example.com", "Hola");

    expect(fetchMock).toHaveBeenCalledWith("http://api.test/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Ana",
        email: "ana@example.com",
        message: "Hola",
      }),
    });
  });

  it("sends inquire payload to /email/inquire", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const { sendInquire } = await importEmailService();
    await sendInquire({
      name: "Ana",
      email: "ana@example.com",
      phone: "099123456",
      course: "Auxiliar",
      ci: "12345678",
      year: "2026",
      inquire: "Quiero info",
    });

    expect(fetchMock).toHaveBeenCalledWith("http://api.test/email/inquire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Ana",
        email: "ana@example.com",
        phone: "099123456",
        course: "Auxiliar",
        ci: "12345678",
        year: "2026",
        inquire: "Quiero info",
      }),
    });
  });
});
