import React, { useState } from "react";
import { SITE_NAME } from "../../app.config";
import { Link } from "react-router-dom";
import RequestInfo from "./RequestInfo";
import Modal from "react-modal";
import CustomModal from "./CustomModal";

const Bedelias: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    content: React.ReactNode | undefined;
  }>({ content: undefined });
  Modal.setAppElement("#root");

  const openModal = (content: React.ReactNode | undefined): void => {
    setModalContent({ content });
    setModalIsOpen(true);
  };

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
      onAction: () =>
        openModal(
          <RequestInfo
            inquiringName="Solicitd de Constancia de estudio"
            requiresGraduationYear={false}
            requiresPhysicalPresence={false}
          />,
        ),
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
      onAction: () =>
        openModal(
          <RequestInfo
            inquiringName="Solicitd de Constancia de Egreso"
            requiresGraduationYear={false}
            requiresPhysicalPresence={false}
          />,
        ),
    },
    {
      title: "Constancia de título en trámite",
      text: (
        <p>
          Una <strong>constancia de título en trámite</strong> es un documento
          oficial emitido por{" "}
          <strong className="highlight color">{SITE_NAME}</strong> que certifica
          que un estudiante ha completado satisfactoriamente todos los
          requisitos académicos de un programa de estudios y se encuentra en
          proceso de obtención del título correspondiente. Este documento es
          útil para los estudiantes que han finalizado sus estudios y están
          esperando la entrega del título, ya que les permite demostrar su
          condición de graduados ante empleadores y otras entidades que puedan
          requerir una prueba de su formación académica.
        </p>
      ),
      action: "Solicitar",
      onAction: () =>
        openModal(
          <RequestInfo
            inquiringName="Solicitd de Constancia de título en trámite"
            requiresGraduationYear={false}
            requiresPhysicalPresence={false}
          />,
        ),
    },
    {
      title: "Escolaridad",
      text: (
        <p>
          Una <strong>escolaridad</strong> es un documento oficial emitido por{" "}
          <strong className="highlight color">{SITE_NAME}</strong> que certifica
          que un estudiante ha completado satisfactoriamente todos los
          requisitos académicos de un programa de estudios. Este documento es
          útil para los estudiantes que han finalizado sus estudios y les
          permite demostrar su condición de graduados ante empleadores y otras
          entidades que puedan requerir una prueba de su formación académica.
          Además, la escolaridad incluye información detallada sobre las
          materias cursadas, las calificaciones obtenidas y el rendimiento
          académico del estudiante a lo largo de su trayectoria educativa en
          nuestra institución.
        </p>
      ),
      action: "Solicitar",
      onAction: () =>
        openModal(
          <RequestInfo
            inquiringName="Solicitd de Escolaridad"
            requiresGraduationYear={true}
            requiresPhysicalPresence={true}
          />,
        ),
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
                  <button className="button color" onClick={content.onAction}>
                    {content.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <CustomModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        content={modalContent.content}
      />
    </div>
  );
};

export default Bedelias;
