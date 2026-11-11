import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CourseService } from "../services/CourseService";
import { SiteCourse } from "../types/siteCourse";
import AdminCourses from "./AdminCourses";

vi.mock("../services/CourseService", () => ({
  CourseService: { list: vi.fn(), save: vi.fn(), upload: vi.fn() },
}));

vi.mock("../contexts/CourseContext", () => ({
  useCourses: () => ({ refresh: vi.fn().mockResolvedValue(undefined) }),
}));

const course: SiteCourse = {
  recordId: 1, id: "enfermeria", path: "/cursos/enfermeria",
  title: "Enfermería", term: "", openRegistration: "", info: "",
  curriculum: null, requirements: [], images: [], mostWanted: false,
  shortCourse: false, masterClass: false, sortOrder: 1, menuOrder: 0,
  menuPositions: { mostWanted: 1, shortCourse: 1, masterClass: 1 },
  published: true, durationHours: null, modality: null, category: null,
  syllabusSummary: null, schedule: null, jobOpportunities: null,
};

describe("Administración de cursos", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("permite editar y guardar un curso desde el listado", async () => {
    vi.mocked(CourseService.list).mockResolvedValue([course]);
    vi.mocked(CourseService.save).mockResolvedValue(course);
    render(<AdminCourses />);

    const item = await screen.findByRole("listitem");
    expect(within(item).getByText("Publicado")).toBeInTheDocument();
    const link = within(item).getByRole("link", { name: "Ver Enfermería en una pestaña nueva" });
    expect(link).toHaveAttribute("href", "/cursos/enfermeria");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(within(item).getByRole("button", { name: "Editar" }));
    fireEvent.change(screen.getByLabelText("Nombre", { exact: true }), { target: { value: "Enfermería avanzada" } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(await screen.findByText("Enfermería")).toBeInTheDocument();
    expect(CourseService.save).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Enfermería avanzada", id: "enfermeria" }), 1,
    );
  });

  it("permite crear y cancelar, y muestra el estado vacío", async () => {
    vi.mocked(CourseService.list).mockResolvedValue([]);
    render(<AdminCourses />);

    expect(await screen.findByText("No hay cursos para mostrar.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Nuevo curso" }));
    fireEvent.change(screen.getByLabelText("Nombre", { exact: true }), { target: { value: "Curso nuevo" } });
    expect(screen.getByLabelText("ID de la URL")).toHaveValue("curso-nuevo");
    expect(screen.getByRole("group", { name: "Imágenes" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.getByText("No hay cursos para mostrar.")).toBeInTheDocument();
  });

  it("permite despublicar un curso tras confirmar", async () => {
    vi.mocked(CourseService.list)
      .mockResolvedValueOnce([course])
      .mockResolvedValueOnce([{ ...course, published: false }]);
    vi.mocked(CourseService.save).mockResolvedValue({ ...course, published: false });
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<AdminCourses />);

    fireEvent.click(await screen.findByRole("button", { name: "Despublicar" }));
    expect(await screen.findByText("Despublicado")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Ver Enfermería en una pestaña nueva" })).not.toBeInTheDocument();
    expect(CourseService.save).toHaveBeenCalledWith(
      expect.objectContaining({ id: "enfermeria", published: false }), 1,
    );
    confirm.mockRestore();
  });

  it("guarda posiciones independientes para las categorías seleccionadas", async () => {
    vi.mocked(CourseService.list).mockResolvedValue([course]);
    vi.mocked(CourseService.save).mockResolvedValue(course);
    render(<AdminCourses />);

    fireEvent.click(await screen.findByRole("button", { name: "Editar" }));
    fireEvent.click(screen.getByLabelText("Los más buscados"));
    fireEvent.click(screen.getByLabelText("Cursos cortos"));
    fireEvent.change(screen.getByLabelText("Posición en el listado"), { target: { value: "7" } });
    fireEvent.change(screen.getByLabelText("Posición en Los más buscados"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Posición en Cursos cortos"), { target: { value: "2" } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(await screen.findByText("Enfermería")).toBeInTheDocument();
    expect(CourseService.save).toHaveBeenCalledWith(
      expect.objectContaining({
        sortOrder: 7,
        menuPositions: { mostWanted: 3, shortCourse: 2, masterClass: 1 },
      }), 1,
    );
  });
});
