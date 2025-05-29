import { usePageTracking } from "../hooks/usePageTracking";

const AnalyticsTracker: React.FC = () => {
  usePageTracking();
  return null; // Este componente no renderiza nada
};

export default AnalyticsTracker;
