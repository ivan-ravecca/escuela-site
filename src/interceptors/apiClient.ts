const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

// Variable to store the CSRF token
let csrfToken: string | null = null;

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CRITICAL: Allows sending/receiving cookies
});

// Function to fetch the CSRF token
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

// Get the current token (useful for debugging)
export function getCSRFToken(): string | null {
  return csrfToken;
}

// Request interceptor to add the token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Add Bearer token if present
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add CSRF token to all POST requests that go to /assistant
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

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || '';
    const isAssistantEndpoint = url.startsWith('/assistant/') || url.includes('/assistant/');
    
    // If we get a 403 on /assistant/* and haven't retried, fetch a new CSRF token
    if (
      error.response?.status === 403 && 
      isAssistantEndpoint &&
      !originalRequest._retry
    ) {
      console.warn('[CSRF] 403 error detected, attempting to refresh token...');
      originalRequest._retry = true;
      
      try {
        await initializeCSRF(); // Fetch new token
        originalRequest.headers['X-CSRF-Token'] = csrfToken;
        console.log('[CSRF] Retrying request with new token...');
        return apiClient.request(originalRequest); // Retry request
      } catch (csrfError) {
        console.error('[CSRF] Failed to refresh CSRF token:', csrfError);
        return Promise.reject(error);
      }
    }
    
    // If we get a 401 (Unauthorized), the token may have expired
    if (error.response && error.response.status === 401) {
      // Redirect to login or perform another action
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  },
);

export default apiClient;
