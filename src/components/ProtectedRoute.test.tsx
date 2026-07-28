import { describe, expect, it, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";

vi.mock("../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mockedUseAuth.mockReset();
  });

  it("shows loading state while auth is being resolved", () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      loading: true,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    });

    render(
      <MemoryRouter initialEntries={["/administracion"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/administracion" element={<div>Admin panel</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("redirects guests to login", () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
    });

    render(
      <MemoryRouter initialEntries={["/administracion"]}>
        <Routes>
          <Route path="/login" element={<div>Login page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/administracion" element={<div>Admin panel</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("renders protected content for authenticated users", () => {
    mockedUseAuth.mockReturnValue({
      user: {
        email: "admin@example.com",
        name: "Admin",
        token: "token",
      },
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
    });

    render(
      <MemoryRouter initialEntries={["/administracion"]}>
        <Routes>
          <Route path="/login" element={<div>Login page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/administracion" element={<div>Admin panel</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Admin panel")).toBeInTheDocument();
  });
});
