import { beforeEach, describe, expect, it, vi } from "vitest";
import ReactGA from "react-ga4";
import { AnalyticsService } from "./AnalyticsService";

vi.mock("react-ga4", () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn(),
  },
}));

describe("AnalyticsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    const internal = AnalyticsService as unknown as { initialized: boolean };
    internal.initialized = false;
  });

  it("warns and skips init when GA ID is missing", () => {
    vi.stubEnv("VITE_GOOGLE_ANALYTICS_ID", "");
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    AnalyticsService.init();

    expect(warnSpy).toHaveBeenCalledWith("Google Analytics ID no configurado");
    expect(ReactGA.initialize).not.toHaveBeenCalled();
  });

  it("initializes GA only once", () => {
    vi.stubEnv("VITE_GOOGLE_ANALYTICS_ID", "G-TEST123");

    AnalyticsService.init();
    AnalyticsService.init();

    expect(ReactGA.initialize).toHaveBeenCalledTimes(1);
    expect(ReactGA.initialize).toHaveBeenCalledWith("G-TEST123");
  });

  it("tracks page views and events only after init", () => {
    vi.stubEnv("VITE_GOOGLE_ANALYTICS_ID", "G-TEST123");

    AnalyticsService.trackPageView("/before-init");
    AnalyticsService.trackEvent("Contact", "Click");

    expect(ReactGA.send).not.toHaveBeenCalled();
    expect(ReactGA.event).not.toHaveBeenCalled();

    AnalyticsService.init();
    AnalyticsService.trackPageView("/contacto");
    AnalyticsService.trackEvent("Contact", "WhatsApp", "mobile", 1);

    expect(ReactGA.send).toHaveBeenCalledWith({
      hitType: "pageview",
      page: "/contacto",
    });
    expect(ReactGA.event).toHaveBeenCalledWith({
      category: "Contact",
      action: "WhatsApp",
      label: "mobile",
      value: 1,
    });
  });
});
