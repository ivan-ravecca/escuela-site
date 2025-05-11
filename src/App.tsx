import React from "react";
import Footer from "./components/Footer";
import AppHeader from "./components/AppHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import CourseDetails from "./components/CourseDetails";

import "./styles/style.scss";
import "./styles/colors/green.scss";
import Bedelias from "./components/Bedelia";
import BreadCrumbs from "./components/BreadCrumbs";
import Contact from "./components/Contact";
import Materials from "./components/Materials";
import CoursesHome from "./components/CoursesHome";
import Diploma from "./components/Diploma";
import DiplomaGenerate from "./components/DiplomaGenerate";

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
            <Route path="/diploma/generar" element={<DiplomaGenerate />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
