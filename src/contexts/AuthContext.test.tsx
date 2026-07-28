import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

let capturedGoogleOptions:
  | {
      onSuccess: (tokenResponse: { access_token: string }) => void;
      onError: (errorResponse: unknown) => void;
      flow: string;
    }
  | undefined;

const googleLoginTrigger = vi.fn();

vi.mock("@react-oauth/google", () => ({
  useGoogleLogin: vi.fn((options) => {
    capturedGoogleOptions = options;
    return googleLoginTrigger;
  }),
}));

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(),
}));

const renderAuthContext = async () => {
  const module = await import("./AuthContext");
  const { AuthProvider, useAuth } = module;

  const Consumer = () => {
    const { isAuthenticated, loading, user, logout, login } = useAuth();

    return (
      <>
        <div data-testid="loading">{String(loading)}</div>
        <div data-testid="authenticated">{String(isAuthenticated)}</div>
        <div data-testid="email">{user?.email ?? ""}</div>
        <button type="button" onClick={logout}>
          logout
        </button>
        <button type="button" onClick={login}>
          login
        </button>
      </>
    );
  };

  render(
    <AuthProvider>
      <Consumer />
    </AuthProvider>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    localStorage.clear();
    capturedGoogleOptions = undefined;
    googleLoginTrigger.mockReset();

    vi.stubEnv("VITE_WORKSPACE_DOMAIN", "example.com");
    vi.stubEnv("VITE_TOKEN_STORAGE_KEY", "auth_token");
    vi.stubEnv("VITE_API_URL", "http://api.test");
  });

  it("authenticates user when token is valid and domain matches", async () => {
    localStorage.setItem("auth_token", "jwt-token");
    vi.mocked(axios.post).mockResolvedValueOnce({ data: { valid: true } });
    vi.mocked(jwtDecode).mockReturnValue({
      email: "admin@example.com",
      name: "Admin",
      picture: "avatar.png",
    });

    await renderAuthContext();

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("authenticated").textContent).toBe("true");
    expect(screen.getByTestId("email").textContent).toBe("admin@example.com");
    expect(axios.post).toHaveBeenCalledWith("http://api.test/auth/verify", {
      token: "jwt-token",
    });
  });

  it("clears token when backend marks token invalid", async () => {
    localStorage.setItem("auth_token", "jwt-token");
    vi.mocked(axios.post).mockResolvedValueOnce({ data: { valid: false } });

    await renderAuthContext();

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(screen.getByTestId("authenticated").textContent).toBe("false");
  });

  it("removes session when token domain does not match", async () => {
    localStorage.setItem("auth_token", "jwt-token");
    vi.mocked(axios.post).mockResolvedValueOnce({ data: { valid: true } });
    vi.mocked(jwtDecode).mockReturnValue({
      email: "admin@other.com",
      name: "Admin",
    });

    await renderAuthContext();

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(screen.getByTestId("authenticated").textContent).toBe("false");
  });

  it("logout clears user from localStorage", async () => {
    localStorage.setItem("auth_token", "jwt-token");
    vi.mocked(axios.post).mockResolvedValueOnce({ data: { valid: true } });
    vi.mocked(jwtDecode).mockReturnValue({
      email: "admin@example.com",
      name: "Admin",
    });

    await renderAuthContext();

    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("true");
    });

    fireEvent.click(screen.getByRole("button", { name: "logout" }));

    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(screen.getByTestId("authenticated").textContent).toBe("false");
  });

  it("login action triggers google login hook", async () => {
    await renderAuthContext();

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    fireEvent.click(screen.getByRole("button", { name: "login" }));

    expect(useGoogleLogin).toHaveBeenCalled();
    expect(googleLoginTrigger).toHaveBeenCalledTimes(1);
  });

  it("processes successful google callback and stores backend token", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    vi.mocked(axios.get).mockResolvedValueOnce({
      data: { email: "admin@example.com" },
    });
    vi.mocked(axios.post).mockResolvedValueOnce({
      data: { token: "jwt-from-backend" },
    });
    vi.mocked(jwtDecode).mockReturnValue({
      email: "admin@example.com",
      name: "Admin",
      picture: "avatar.png",
    });

    await renderAuthContext();

    await waitFor(() => {
      expect(capturedGoogleOptions).toBeDefined();
    });

    capturedGoogleOptions?.onSuccess({ access_token: "google-access" });

    await waitFor(() => {
      expect(localStorage.getItem("auth_token")).toBe("jwt-from-backend");
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: "Bearer google-access" },
      }
    );
    expect(axios.post).toHaveBeenCalledWith("http://api.test/auth/login", {
      googleToken: "google-access",
    });
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it("shows alert when google callback belongs to invalid domain", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    vi.mocked(axios.get).mockResolvedValueOnce({
      data: { email: "user@other.com" },
    });

    await renderAuthContext();

    await waitFor(() => {
      expect(capturedGoogleOptions).toBeDefined();
    });

    capturedGoogleOptions?.onSuccess({ access_token: "google-access" });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Solo se permite acceso a usuarios de example.com"
      );
    });

    expect(axios.post).not.toHaveBeenCalledWith("http://api.test/auth/login", {
      googleToken: "google-access",
    });
  });

  it("shows alert when google login returns error callback", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    await renderAuthContext();

    await waitFor(() => {
      expect(capturedGoogleOptions).toBeDefined();
    });

    capturedGoogleOptions?.onError({ error: "popup_closed_by_user" });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Error al iniciar sesión. Por favor, intenta de nuevo."
      );
    });
  });

  it("clears token if verify request throws", async () => {
    localStorage.setItem("auth_token", "jwt-token");
    vi.mocked(axios.post).mockRejectedValueOnce(new Error("network error"));

    await renderAuthContext();

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(screen.getByTestId("authenticated").textContent).toBe("false");
  });
});
