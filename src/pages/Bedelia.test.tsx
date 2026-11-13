import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Bedelias from "./Bedelia";

describe("Bedelía", () => {
  afterEach(() => {
    document.getElementById("root")?.remove();
  });

  it("muestra el instructivo de registro y habilitación con enlaces externos", () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
    render(
      <MemoryRouter>
        <Bedelias />
      </MemoryRouter>,
      { container: root },
    );

    const trigger = screen.getByRole("link", {
      name: "Registro y habilitación de título",
    });
    const instructions = trigger.closest(".toggle-wrap")?.querySelector<HTMLElement>(".toggle-container");
    expect(instructions).not.toBeVisible();
    fireEvent.click(trigger);
    expect(instructions).toBeVisible();
    if (!instructions) throw new Error("No se encontró el instructivo");

    expect(within(instructions).getByText("100 % en línea y gratuito")).toBeVisible();
    expect(within(instructions).getByText(/máximo 15 MB por archivo/)).toBeVisible();
    expect(within(instructions).getAllByRole("listitem")).toHaveLength(9);
    expect(within(instructions).queryByRole("button")).not.toBeInTheDocument();

    const links = [
      ["gub.uy", "https://mi.iduruguay.gub.uy/"],
      ["TuID Antel", "https://www.tuid.uy/user/auth"],
      ["enlace del trámite", "https://www.gub.uy/tramites/solicitud-registro-habilitacion-titulos-certificados-profesionales-salud"],
    ];
    for (const [name, href] of links) {
      const link = within(instructions).getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    fireEvent.click(trigger);
    expect(instructions).not.toBeVisible();
    expect(screen.getAllByRole("link", { name: /Constancia|Escolaridad/ })).toHaveLength(4);
  });
});
