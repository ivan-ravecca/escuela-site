import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CourseService } from "../services/CourseService";
import { CourseProvider, useCourses } from "./CourseContext";
import { SiteCourse } from "../types/siteCourse";

vi.mock("../services/CourseService", () => ({
  CourseService: { list: vi.fn() },
}));

const course: SiteCourse = {
  recordId: 1, id: "auxiliar-enfermeria", path: "/cursos/auxiliar-enfermeria",
  title: "Auxiliar de Enfermería", term: "", openRegistration: "", info: "",
  curriculum: null, requirements: [], images: [], mostWanted: true, shortCourse: false,
  masterClass: false, sortOrder: 1, menuOrder: 0,
  menuPositions: { mostWanted: 1, shortCourse: 1, masterClass: 1 }, published: true, durationHours: null,
  modality: null, category: null, syllabusSummary: null, schedule: null,
  jobOpportunities: null,
};

function Consumer() {
  const { courses, error, loading, refresh } = useCourses();
  return (
    <div>
      {loading && <p>Cargando</p>}
      {error && <p role="alert">{error}</p>}
      {courses.map((item) => <p key={item.recordId}>{item.title}</p>)}
      <button onClick={() => void refresh()}>Reintentar</button>
    </div>
  );
}

describe("CourseProvider", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("reports load errors and loads courses on retry", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(CourseService.list)
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValueOnce([course]);
    render(<CourseProvider><Consumer /></CourseProvider>);
    expect(await screen.findByRole("alert")).toHaveTextContent("No se pudieron cargar");
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(await screen.findByText("Auxiliar de Enfermería")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    consoleError.mockRestore();
  });

  it("does not replace refreshed data with an older response", async () => {
    let resolveFirst: (courses: SiteCourse[]) => void = () => {};
    vi.mocked(CourseService.list)
      .mockImplementationOnce(() => new Promise((resolve) => { resolveFirst = resolve; }))
      .mockResolvedValueOnce([course]);
    render(<CourseProvider><Consumer /></CourseProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(await screen.findByText("Auxiliar de Enfermería")).toBeInTheDocument();
    await act(async () => resolveFirst([]));
    await waitFor(() => expect(screen.getByText("Auxiliar de Enfermería")).toBeInTheDocument());
  });
});
