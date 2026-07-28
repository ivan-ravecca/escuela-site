import { beforeEach, describe, expect, it, vi } from "vitest";

interface AxiosInstanceMock {
  get: ReturnType<typeof vi.fn>;
  request: ReturnType<typeof vi.fn>;
  interceptors: {
    request: {
      use: (onFulfilled: (config: any) => any) => number;
    };
    response: {
      use: (
        onFulfilled: (response: unknown) => unknown,
        onRejected: (error: any) => Promise<unknown>
      ) => number;
    };
  };
}

interface MockErrorConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  _retry?: boolean;
}

const setupApiClientModule = async () => {
  vi.resetModules();
  vi.stubEnv("VITE_API_URL", "http://api.test");

  const requestHandlers: Array<(config: any) => any> = [];
  const responseErrorHandlers: Array<(error: any) => Promise<unknown>> = [];

  const instance: AxiosInstanceMock = {
    get: vi.fn(),
    request: vi.fn(),
    interceptors: {
      request: {
        use: (onFulfilled) => {
          requestHandlers.push(onFulfilled);
          return 0;
        },
      },
      response: {
        use: (_onFulfilled, onRejected) => {
          responseErrorHandlers.push(onRejected);
          return 0;
        },
      },
    },
  };

  vi.doMock("axios", () => ({
    default: {
      create: vi.fn(() => instance),
    },
  }));

  const module = await import("./apiClient");
  return { module, instance, requestHandlers, responseErrorHandlers };
};

describe("apiClient interceptors", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores csrf token after initializeCSRF", async () => {
    const { module, instance } = await setupApiClientModule();
    instance.get.mockResolvedValueOnce({ data: { csrfToken: "csrf-value" } });

    await module.initializeCSRF();

    expect(instance.get).toHaveBeenCalledWith("/assistant/csrf-token");
    expect(module.getCSRFToken()).toBe("csrf-value");
  });

  it("adds bearer and csrf headers for assistant POST requests", async () => {
    const { module, instance, requestHandlers } = await setupApiClientModule();
    instance.get.mockResolvedValueOnce({ data: { csrfToken: "csrf-value" } });

    await module.initializeCSRF();
    localStorage.setItem("auth_token", "auth-value");

    const requestInterceptor = requestHandlers[0];
    const config = requestInterceptor({
      url: "/assistant/chat",
      method: "post",
      headers: {},
    });

    expect(config.headers.Authorization).toBe("Bearer auth-value");
    expect(config.headers["X-CSRF-Token"]).toBe("csrf-value");
  });

  it("retries assistant request on first 403 by refreshing csrf", async () => {
    const { instance, responseErrorHandlers } = await setupApiClientModule();
    instance.get.mockResolvedValueOnce({ data: { csrfToken: "new-token" } });
    instance.request.mockResolvedValueOnce({ data: { ok: true } });

    const responseErrorInterceptor = responseErrorHandlers[0];
    const config: MockErrorConfig = {
      url: "/assistant/chat",
      method: "post",
      headers: {},
    };
    const originalError = {
      response: { status: 403 },
      config,
    };

    const response = await responseErrorInterceptor(originalError);

    expect(instance.get).toHaveBeenCalledWith("/assistant/csrf-token");
    expect(instance.request).toHaveBeenCalledTimes(1);
    expect(originalError.config._retry).toBe(true);
    expect(originalError.config.headers["X-CSRF-Token"]).toBe("new-token");
    expect(response).toEqual({ data: { ok: true } });
  });

  it("clears auth token on 401 responses", async () => {
    const { responseErrorHandlers } = await setupApiClientModule();
    localStorage.setItem("auth_token", "auth-value");

    const responseErrorInterceptor = responseErrorHandlers[0];
    const config: MockErrorConfig = {
      url: "/auth/verify",
      method: "post",
      headers: {},
    };
    const originalError = {
      response: { status: 401 },
      config,
    };

    await expect(responseErrorInterceptor(originalError)).rejects.toEqual(
      originalError
    );
    expect(localStorage.getItem("auth_token")).toBeNull();
  });
});
