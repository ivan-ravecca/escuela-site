const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

// Variable para almacenar el token CSRF
let csrfToken: string | null = null;

// Crear instancia de axios con la URL base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CRÍTICO: Permite enviar/recibir cookies
});

// Función para obtener el token CSRF
export async function initializeCSRF(): Promise<void> {
  try {
    console.log('[CSRF] Requesting new CSRF token...');
    const response = await apiClient.get('/assistant/csrf-token');
    csrfToken = response.data.csrfToken;
    console.log('[CSRF] Token obtained successfully:', csrfToken ? csrfToken.substring(0, 20) + '...' : 'null');
    console.log('[CSRF] Cookie should be set by server');
  } catch (error) {
    console.error('[CSRF] Failed to get CSRF token:', error);
    throw error;
  }
}

// Obtener el token actual (útil para debugging)
export function getCSRFToken(): string | null {
  return csrfToken;
}

// Interceptor para agregar el token a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    // Agregar Bearer token si existe
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Agregar CSRF token a todos los POST requests que vayan a /assistant
    const url = config.url || '';
    const isAssistantEndpoint = url.startsWith('/assistant/') || url.includes('/assistant/');
    
    if (config.method === 'post' && isAssistantEndpoint && csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
      console.log('[CSRF] Token added to request:', url, 'Token:', csrfToken.substring(0, 20) + '...');
    } else if (config.method === 'post' && isAssistantEndpoint && !csrfToken) {
      console.warn('[CSRF] POST to assistant endpoint but no CSRF token available:', url);
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
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || '';
    const isAssistantEndpoint = url.startsWith('/assistant/') || url.includes('/assistant/');
    
    // Si obtenemos un 403 en /assistant/* y no hemos reintentado, obtener nuevo token CSRF
    if (
      error.response?.status === 403 && 
      isAssistantEndpoint &&
      !originalRequest._retry
    ) {
      console.warn('[CSRF] 403 error detected, attempting to refresh token...');
      originalRequest._retry = true;
      
      try {
        await initializeCSRF(); // Obtener nuevo token
        originalRequest.headers['X-CSRF-Token'] = csrfToken;
        console.log('[CSRF] Retrying request with new token...');
        return apiClient.request(originalRequest); // Reintentar request
      } catch (csrfError) {
        console.error('[CSRF] Failed to refresh CSRF token:', csrfError);
        return Promise.reject(error);
      }
    }
    
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
