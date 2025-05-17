const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

// Base URL de tu API

// Crear instancia de axios con la URL base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si obtenemos un 401 (no autorizado), podría ser que el token expiró
    if (error.response && error.response.status === 401) {
      // Redirigir al login o realizar alguna acción
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
