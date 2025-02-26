import React from "react";
import ImageSlider from "./ImageSlider";

const Materials: React.FC = () => {
  const images = [
    {
      src: "/images/portfolio/salon_01_01.jpeg",
      alt: "Salones amplios con proyectores",
      isActive: true,
    },
    {
      src: "/images/portfolio/salon_01_02.jpeg",
      alt: "Salones amplios con proyectores",
      isActive: false,
    },
    {
      src: "/images/portfolio/salon_02_01.jpeg",
      alt: "Salones amplios con proyectores",
      isActive: false,
    },
    {
      src: "/images/portfolio/salon_02_02.jpeg",
      alt: "Salones amplios con proyectores",
      isActive: false,
    },
    {
      src: "/images/portfolio/taller_01_01.jpeg",
      alt: "Talleres equipados",
      isActive: false,
    },
    {
      src: "/images/portfolio/taller_01_02.jpeg",
      alt: "Muñecos realistas para prácticas",
      isActive: false,
    },
    {
      src: "/images/portfolio/taller_01_03.jpeg",
      alt: "Muñecos realistas para prácticas",
      isActive: false,
    },
    {
      src: "/images/portfolio/taller_01_04.jpeg",
      alt: "Equipamiento real",
      isActive: false,
    },
    {
      src: "/images/portfolio/taller_01_05.jpeg",
      alt: "Espacios para prácticas",
      isActive: false,
    },
  ];
  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen columns">
          <ImageSlider images={images} />
        </div>
      </div>
      <div className="container" style={{ marginTop: "30px" }}>
        <div className="sixteen columns">
          <h3>Salones equipados</h3>
          <p>
            <span className="dropcap">S</span>alones equipados con sillas de
            estudiantes ergonómicas para asegurar la comodidad durante largas
            horas de estudio. Además, cuentan con una excelente iluminación
            natural y artificial que facilita la concentración y reduce la
            fatiga visual. Cada salón está climatizado con aire acondicionado
            para mantener una temperatura agradable en cualquier época del año.
            También disponen de un proyector de alta definición para
            presentaciones y clases interactivas, así como una whiteboard de
            gran tamaño para anotaciones y explicaciones detalladas.
          </p>
          <h3>Materiales de taller</h3>
          <p>
            <span className="dropcap">T</span>aller equipado con muñecos
            realistas que permiten a los estudiantes practicar procedimientos
            médicos en un entorno seguro y controlado. Estos muñecos están
            diseñados para simular una amplia variedad de situaciones clínicas,
            desde la reanimación cardiopulmonar hasta la inserción de vías
            intravenosas. Además, el taller cuenta con todo el equipamiento
            necesario que se encuentra en una sala de enfermería, incluyendo
            camillas, monitores de signos vitales, desfibriladores y equipos de
            oxigenoterapia. Este entorno práctico permite a los estudiantes
            desarrollar sus habilidades técnicas y de toma de decisiones en
            situaciones de emergencia.
          </p>
          <h3>Jornadas para estudiantes</h3>
          <p>
            <span className="dropcap">J</span>ornadas para estudiantes que se
            exponen como complemento de los cursos regulares, ofreciendo una
            oportunidad única para profundizar en temas específicos y adquirir
            habilidades prácticas adicionales. Estas jornadas incluyen talleres,
            seminarios y conferencias impartidos por expertos en diversas áreas,
            proporcionando a los estudiantes una visión más amplia y actualizada
            de su campo de estudio. Además, permiten la interacción con
            profesionales y compañeros, fomentando el intercambio de
            conocimientos y experiencias.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Materials;
