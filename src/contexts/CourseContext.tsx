import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CourseService } from "../services/CourseService";
import { SiteCourse } from "../types/siteCourse";

interface CourseContextValue {
  courses: SiteCourse[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<SiteCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);
    try {
      const items = await CourseService.list();
      if (currentRequest === requestId.current) setCourses(items);
    } catch (cause) {
      console.error("No se pudieron cargar los cursos", cause);
      if (currentRequest === requestId.current) setError("No se pudieron cargar los cursos. Inténtalo nuevamente.");
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const currentRequest = ++requestId.current;
    CourseService.list().then((items) => {
      if (active && currentRequest === requestId.current) setCourses(items);
    }).catch((cause) => {
      if (active && currentRequest === requestId.current) {
        console.error("No se pudieron cargar los cursos", cause);
        setError("No se pudieron cargar los cursos. Inténtalo nuevamente.");
      }
    }).finally(() => {
      if (active && currentRequest === requestId.current) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, error, refresh }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses(): CourseContextValue {
  const context = useContext(CourseContext);
  if (!context) throw new Error("useCourses requiere CourseProvider");
  return context;
}
