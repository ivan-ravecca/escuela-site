import apiClient from "../interceptors/apiClient";
import { SiteCourse, SiteCourseInput } from "../types/siteCourse";

export const CourseService = {
  async list(admin = false): Promise<SiteCourse[]> {
    const response = await apiClient.get<{ courses: SiteCourse[] }>(
      admin ? "/site-courses/admin" : "/site-courses",
    );
    return response.data.courses;
  },
  async get(id: string): Promise<{ course: SiteCourse; canonical: boolean }> {
    const response = await apiClient.get<{ course: SiteCourse; canonical: boolean }>(
      `/site-courses/${encodeURIComponent(id)}`,
    );
    return response.data;
  },
  async save(course: SiteCourseInput, recordId?: number): Promise<SiteCourse> {
    const response = recordId === undefined
      ? await apiClient.post<SiteCourse>("/site-courses", course)
      : await apiClient.put<SiteCourse>(`/site-courses/${recordId}`, course);
    return response.data;
  },
  async upload(file: File): Promise<string> {
    const response = await apiClient.post<{ src: string }>("/site-courses/images", file, {
      headers: { "Content-Type": file.type },
    });
    return response.data.src;
  },
};
