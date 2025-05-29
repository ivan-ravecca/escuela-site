import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnalyticsService } from "../services/AnalyticsService";

export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    // Rastrea la página actual
    if (location.pathname.includes("/diploma")) {
      AnalyticsService.trackPageView("/diploma");
    } else {
      AnalyticsService.trackPageView(location.pathname + location.search);
    }
  }, [location]);
};
