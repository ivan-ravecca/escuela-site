import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/administracion");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      login();
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen columns">
          <div className="notification notice" style={{ marginBottom: "20px" }}>
            <p>
              <span>Acceso restringido</span> Esta sección requiere
              autenticación.
            </p>
          </div>

          <div className="headline margin-bottom-30">
            <h3>Iniciar sesión</h3>
          </div>

          <div
            className="padding-right-30 padding-left-30 padding-bottom-30 padding-top-30"
            style={{
              backgroundColor: "#f8f8f8",
              borderRadius: "4px",
              boxShadow: "0 2px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div className="text-center margin-bottom-20">
              <p>
                Para acceder a esta sección, por favor inicia sesión con tu
                cuenta de Google Workspace:
              </p>
            </div>

            <div className="text-center">
              <button onClick={handleLogin} className="button color">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    style={{ marginRight: "10px" }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                  Iniciar sesión con Google
                </div>
              </button>
            </div>

            <div className="clearfix"></div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p>
              <small>
                Si tienes problemas para acceder, por favor contacta al
                administrador del sistema.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
