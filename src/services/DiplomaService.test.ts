import { beforeEach, describe, expect, it, vi } from "vitest";

type ApiClientMock = {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
};

const loadModule = async () => {
  vi.resetModules();
  vi.stubEnv("VITE_API_URL", "http://api.test");

  const apiClient: ApiClientMock = {
    get: vi.fn(),
    post: vi.fn(),
  };

  vi.doMock("../interceptors/apiClient", () => ({
    default: apiClient,
  }));

  const module = await import("./DiplomaService");
  return { module, apiClient };
};

describe("DiplomaService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches a diploma by id", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const { module } = await loadModule();
    await module.getDiploma("abc123");

    expect(fetchMock).toHaveBeenCalledWith("http://api.test/diploma/abc123", {
      method: "GET",
    });
  });

  it("requests diploma generation as image arraybuffer", async () => {
    const { module, apiClient } = await loadModule();
    apiClient.get.mockResolvedValueOnce({ data: new ArrayBuffer(8) });

    await module.generateDiploma("drive-url");

    expect(apiClient.get).toHaveBeenCalledWith(
      "http://api.test/diploma/generate?link=drive-url",
      {
        responseType: "arraybuffer",
        headers: {
          Accept: "image/png",
        },
      }
    );
  });

  it("creates a PDF Blob for certificate responses", async () => {
    const { module, apiClient } = await loadModule();
    apiClient.post.mockResolvedValueOnce({ data: new Uint8Array([1, 2, 3]) });

    const result = await module.createCertificate({
      certMec: true,
      studentName: "Ana",
      courseName: "Auxiliar",
      courseDate: "2026-07-28",
    });

    expect(apiClient.post).toHaveBeenCalledWith(
      "http://api.test/diploma/certificate",
      {
        certMec: true,
        studentName: "Ana",
        courseName: "Auxiliar",
        courseDate: "2026-07-28",
      },
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
        },
      }
    );
    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("application/pdf");
  });

  it("throws when backend returns empty certificate payload", async () => {
    const { module, apiClient } = await loadModule();
    apiClient.post.mockResolvedValueOnce({ data: null });

    await expect(
      module.createCertificate({
        certMec: true,
        studentName: "Ana",
        courseName: "Auxiliar",
        courseDate: "2026-07-28",
      })
    ).rejects.toThrow("No se recibieron datos del servidor");
  });
});
