import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CourseCard from "./CourseCard";

describe("CourseCard", () => {
  it("uses the database slug, duration text and category for recommendations", () => {
    const onContactInterest = vi.fn();
    render(
      <CourseCard
        course={{
          id: "auxiliar-enfermeria",
          name: "Auxiliar de Enfermería",
          url: "/cursos/auxiliar-enfermeria",
          duration_text: "Duración de 24 meses",
          category: "especializacion",
        }}
        onContactInterest={onContactInterest}
      />,
    );
    expect(screen.getByText("Duración de 24 meses")).toBeInTheDocument();
    expect(screen.getByText("especializacion")).toHaveStyle({ backgroundColor: "rgb(139, 92, 246)" });
    expect(screen.getByRole("link", { name: /Ver más información/ })).toHaveAttribute("href", "/cursos/auxiliar-enfermeria");
    fireEvent.click(screen.getByRole("button", { name: /Me interesa/ }));
    expect(onContactInterest).toHaveBeenCalledWith("auxiliar-enfermeria", "Auxiliar de Enfermería");
  });
});
