import ReactGA from "react-ga4";

export class AnalyticsService {
  private static initialized = false;

  static init(): void {
    const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

    if (!GOOGLE_ANALYTICS_ID) {
      console.warn("Google Analytics ID no configurado");
      return;
    }

    if (this.initialized) return;

    ReactGA.initialize(GOOGLE_ANALYTICS_ID);
    this.initialized = true;
  }

  static trackPageView(path?: string): void {
    if (!this.initialized) return;

    const pagePath = path || window.location.pathname + window.location.search;
    ReactGA.send({ hitType: "pageview", page: pagePath });
  }

  static trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number,
  ): void {
    if (!this.initialized) return;

    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
}
