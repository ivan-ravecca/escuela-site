import React from "react";
import { SITE_NAME } from "../../app.config";
import { Link } from "react-router-dom";

const Bedelias: React.FC = () => {
  const manageClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const element = e.currentTarget;
    element.classList.toggle("opened");
    element.classList.toggle("active");
    const container = element.nextElementSibling as HTMLElement;
    if (container) {
      if (container.style.display === "block") {
        container.style.display = "none";
      } else {
        container.style.display = "block";
      }
    }
  };

  const contents = [
    {
      title: "Constancia de Estudio",
      text: (
        <p>
          Una <strong>constancia de estudio</strong> es un documento oficial
          emitido por <strong className="highlight color">{SITE_NAME}</strong>{" "}
          que certifica que un estudiante está actualmente matriculado y
          cursando un programa de estudios en nuestra institución. Este
          documento es útil para diversos trámites, como la solicitud de becas,
          la obtención de descuentos en servicios, y la acreditación de la
          condición de estudiante ante diferentes entidades.
        </p>
      ),
      action: "Solicitar",
    },
    {
      title: "Constancia de Egreso",
      text: (
        <p>
          Una <strong>constancia de egreso</strong> es un documento oficial
          emitido por <strong className="highlight color">{SITE_NAME}</strong>{" "}
          que certifica que un estudiante ha completado satisfactoriamente todos
          los requisitos académicos de un programa de estudios. Este documento
          es fundamental para los graduados, ya que les permite demostrar su
          nivel educativo ante empleadores y otras entidades que puedan requerir
          una prueba de su formación académica.
        </p>
      ),
      action: "Solicitar",
    },
  ];
  return (
    <div className="page-content">
      <div className="container">
        <div className="sixteen columns">
          <h2>Bedelias</h2>
          <p>
            Esta página está diseñada para facilitar el acceso a diversos
            certificados y constancias que los estudiantes pueden necesitar
            durante su trayectoria académica. Puedes solicitar constancias de
            egreso, estudio, vacunas y subir certificaciones médicas de forma
            online, rápida y sencilla.
          </p>
        </div>
        {/* <div className="sixteen columns">
          <div className="one-third columns" style={{ width: "30%" }}>
            <button className="button color">Solicitar</button>
            <p>Constancias de Egreso </p>

            <button className="button color">Solicitar</button>
            <p>Constancias de Estudio </p>
          </div>
          <div className="one-third columns" style={{ width: "30%" }}>
            <button className="button color">Solicitar</button>
            <p>Constancias de Vacunas </p>
            <button className="button color">Solicitar</button>
            <p>Constancias de Estudio </p>
          </div>
          <div className="one-third columns" style={{ width: "30%" }}>
            <button className="button color">Enviar</button>
            <p>Certificaciones Médicas </p>
          </div>
        </div> */}

        <div className="sixteen columns">
          {contents.map((content, i) => {
            return (
              <div className="toggle-wrap" key={i}>
                <span
                  className="trigger"
                  onClick={(e) => {
                    manageClick(e);
                  }}
                >
                  <Link to="#">
                    <i className="toggle-icon"></i> {content.title}{" "}
                  </Link>
                </span>
                <div className="toggle-container" style={{ display: "none" }}>
                  {content.text}
                  <button className="button color">{content.action}</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bedelias;
