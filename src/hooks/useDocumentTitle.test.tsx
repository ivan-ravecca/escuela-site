import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SITE_NAME } from "../../app.config";
import { useDocumentTitle } from "./useDocumentTitle";

const HookConsumer = () => {
  useDocumentTitle();
  return null;
};

describe("useDocumentTitle", () => {
  it("sets default title on home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HookConsumer />} />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe(SITE_NAME);
  });

  it("sets first-level breadcrumb title", () => {
    render(
      <MemoryRouter initialEntries={["/contacto"]}>
        <Routes>
          <Route path="/contacto" element={<HookConsumer />} />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe(`Contáctanos - ${SITE_NAME}`);
  });

  it("sets nested breadcrumb title from last segment when available", () => {
    render(
      <MemoryRouter initialEntries={["/cursos/auxiliar-enfermeria"]}>
        <Routes>
          <Route path="/cursos/:course" element={<HookConsumer />} />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe(`Auxiliar de Enfermería - ${SITE_NAME}`);
  });

  it("falls back to first segment breadcrumb when nested segment is unknown", () => {
    render(
      <MemoryRouter initialEntries={["/administracion/segmento-no-existe"]}>
        <Routes>
          <Route path="/administracion/:id" element={<HookConsumer />} />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe(`Administración - ${SITE_NAME}`);
  });
});
