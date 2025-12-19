const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const ENABLE_AI = import.meta.env.VITE_ENABLE_AI === 'true';

import React, { useEffect } from "react";
import Footer from "./components/Footer";
import AppHeader from "./components/AppHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CourseDetails from "./pages/CourseDetails";

import "./styles/style.scss";
import "./styles/colors/green.scss";
import Bedelias from "./pages/Bedelia";
import BreadCrumbs from "./components/BreadCrumbs";
import Contact from "./pages/Contact";
import Materials from "./pages/Materials";
import CoursesHome from "./pages/CoursesHome";
import Diploma from "./pages/Diploma";
import DiplomaGenerate from "./pages/DiplomaGenerate";
import CreateCertificate from "./pages/CreateCertificate";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Administration from "./pages/Administration";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { AnalyticsService } from "./services/AnalyticsService";
import SEOHead from "./components/SEOHead";
import { ChatWidgetProvider } from "./contexts/ChatWidgetContext";
import ChatWidgetErrorBoundary from "./components/assistant/ChatWidgetErrorBoundary";
import ChatWidgetContainer from "./components/assistant/ChatWidgetContainer";
import ChatWidgetButton from "./components/assistant/ChatWidgetButton";

// Componente interno que usa los hooks de router
const AppContent: React.FC = () => {
  return (
    <>
      <SEOHead />
      <AnalyticsTracker />
      {ENABLE_AI && (
        <ChatWidgetErrorBoundary>
          <ChatWidgetButton />
          <ChatWidgetContainer />
        </ChatWidgetErrorBoundary>
      )}
      <div id="wrapper">
        <AppHeader />
        <BreadCrumbs />
        <div id="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cursos/" element={<CoursesHome />} />
            <Route path="/cursos/:course" element={<CourseDetails />} />
            <Route path="/bedelia" element={<Bedelias />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/material" element={<Materials />} />
            <Route path="/diploma/:diplomaHash" element={<Diploma />} />

            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/administracion" element={<Administration />} />
              <Route
                path="/administracion/qr"
                element={<DiplomaGenerate />}
              />
              <Route
                path="/administracion/certificado"
                element={<CreateCertificate />}
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

const App: React.FC = () => {
  // Inicializa GA4 al cargar la aplicación
  useEffect(() => {
    AnalyticsService.init();
  }, []);
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ChatWidgetProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ChatWidgetProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
