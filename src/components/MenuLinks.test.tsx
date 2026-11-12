import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SiteCourse } from "../types/siteCourse";
import MenuLinks from "./MenuLinks";

const courses: SiteCourse[] = [
  {
    recordId: 1, id: "uno", path: "/cursos/uno", title: "Curso uno", term: "",
    openRegistration: "", info: "", curriculum: null, requirements: [], images: [],
    mostWanted: true, shortCourse: true, masterClass: false, sortOrder: 1, menuOrder: 0,
    menuPositions: { mostWanted: 2, shortCourse: 1, masterClass: 1 }, published: true,
    durationHours: null, modality: null, category: null, syllabusSummary: null,
    schedule: null, jobOpportunities: null,
  },
  {
    recordId: 2, id: "dos", path: "/cursos/dos", title: "Curso dos", term: "",
    openRegistration: "", info: "", curriculum: null, requirements: [], images: [],
    mostWanted: true, shortCourse: true, masterClass: false, sortOrder: 2, menuOrder: 0,
    menuPositions: { mostWanted: 1, shortCourse: 2, masterClass: 1 }, published: true,
    durationHours: null, modality: null, category: null, syllabusSummary: null,
    schedule: null, jobOpportunities: null,
  },
];

vi.mock("../contexts/CourseContext", () => ({
  useCourses: () => ({ courses, error: null }),
}));
vi.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: false }),
}));

describe("Menú de cursos", () => {
  it("respeta el orden independiente de cada categoría", () => {
    render(<MemoryRouter><MenuLinks /></MemoryRouter>);
    const mostWanted = screen.getByRole("heading", { name: "Los más buscados" }).closest("li");
    const shortCourses = screen.getByRole("heading", { name: "Cursos cortos" }).closest("li");
    expect(mostWanted).not.toBeNull();
    expect(shortCourses).not.toBeNull();
    expect(within(mostWanted!).getAllByRole("link").map((link) => link.textContent))
      .toEqual(["Curso dos", "Curso uno"]);
    expect(within(shortCourses!).getAllByRole("link").map((link) => link.textContent))
      .toEqual(["Curso uno", "Curso dos"]);
  });
});
