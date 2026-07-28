import { describe, expect, it, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import { usePageTracking } from "./usePageTracking";
import { AnalyticsService } from "../services/AnalyticsService";

const HookConsumer = () => {
  usePageTracking();
  return null;
};

describe("usePageTracking", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("tracks current route with query params", () => {
    const trackSpy = vi
      .spyOn(AnalyticsService, "trackPageView")
      .mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/cursos?turno=noche"]}>
        <Routes>
          <Route path="/cursos" element={<HookConsumer />} />
        </Routes>
      </MemoryRouter>
    );

    expect(trackSpy).toHaveBeenCalledTimes(1);
    expect(trackSpy).toHaveBeenCalledWith("/cursos?turno=noche");
  });

  it("normalizes diploma routes for analytics", () => {
    const trackSpy = vi
      .spyOn(AnalyticsService, "trackPageView")
      .mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/diploma/abc123"]}>
        <Routes>
          <Route path="/diploma/:diplomaHash" element={<HookConsumer />} />
        </Routes>
      </MemoryRouter>
    );

    expect(trackSpy).toHaveBeenCalledTimes(1);
    expect(trackSpy).toHaveBeenCalledWith("/diploma");
  });
});
