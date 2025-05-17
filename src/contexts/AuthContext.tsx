import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User, AuthContextType, AuthProviderProps } from "../data/interfaces";

const WORKSPACE_DOMAIN = import.meta.env.VITE_WORKSPACE_DOMAIN;
const TOKEN_STORAGE_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Creamos el contexto con valores por defecto
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Verificar si hay un token guardado al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) {
        try {
          // Verificar el token con el backend
          const response = await axios.post(`${API_URL}/auth/verify`, {
            token,
          });
          if (response.data.valid) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decodedToken: any = jwtDecode(token);

            // Verifica que el email pertenece al dominio correcto
            if (decodedToken.email.endsWith(`@${WORKSPACE_DOMAIN}`)) {
              setUser({
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture,
                token,
              });
            } else {
              // Si no es del dominio correcto, eliminar el token
              localStorage.removeItem(TOKEN_STORAGE_KEY);
            }
          } else {
            // Token inválido o expirado
            localStorage.removeItem(TOKEN_STORAGE_KEY);
          }
        } catch (error) {
          console.error("Error al verificar el token:", error);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Callback para procesar la información del usuario después del login
  const processUserLogin = useCallback(async (accessToken: string) => {
    try {
      // Obtenemos los datos del usuario con el token de acceso
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      // Verificamos que el email pertenece al dominio correcto
      if (!userInfo.data.email.endsWith(`@${WORKSPACE_DOMAIN}`)) {
        alert(`Solo se permite acceso a usuarios de ${WORKSPACE_DOMAIN}`);
        return;
      }

      // Enviamos el token al backend para validación y generación de nuestro JWT
      const response = await axios.post(`${API_URL}/auth/login`, {
        googleToken: accessToken,
      });

      const { token } = response.data;

      // Guardamos el token en localStorage
      localStorage.setItem(TOKEN_STORAGE_KEY, token);

      // Actualizamos el estado con la información del usuario
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = jwtDecode(token);
      setUser({
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        token,
      });
    } catch (error) {
      console.error("Error en el proceso de login:", error);
      alert("Error al iniciar sesión. Por favor, intenta de nuevo.");
    }
  }, []);

  // Configurar el login con Google
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      processUserLogin(tokenResponse.access_token);
    },
    onError: (errorResponse) => {
      console.error("Google login error", errorResponse);
      alert("Error al iniciar sesión. Por favor, intenta de nuevo.");
    },
    flow: "implicit",
  });

  // Función para iniciar sesión
  const login = () => {
    googleLogin(); // Ahora esta función está definida correctamente
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  };

  // Valores proporcionados por el contexto
  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
