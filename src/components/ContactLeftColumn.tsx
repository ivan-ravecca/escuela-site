import React from "react";
import {
  PHONE_NUMBER,
  SITE_ADDRESS,
  CONTACT_EMAIL,
  SITE_URL,
  SITE_NAME,
  WHATSAPP_NUMBER,
} from "../../app.config";
import { Link } from "react-router-dom";

const ContactLeftColumn: React.FC = () => {
  return (
    <div className="four floated sidebar left">
      <aside className="sidebar padding-reset">
        <div className="widget">
          <h4>Información</h4>
          <p>
            Escuela de Enfermería Arte y Ciencia es una institución dedicada a
            la formación de profesionales en el campo de la enfermería,
            combinando arte y ciencia para brindar una educación integral y de
            calidad.
          </p>
        </div>

        <div className="widget">
          <h4>Datos de contacto</h4>

          <ul className="contact-informations">
            <li>
              <span className="address ">
                <i className="halflings map-marker"></i>
                <Link
                  to={SITE_ADDRESS.url}
                  aria-label={`Dirección de ${SITE_NAME}`}
                  title={`Dirección de ${SITE_NAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SITE_ADDRESS.visual}
                </Link>
              </span>
            </li>
          </ul>

          <ul className="contact-informations second">
            <li>
              <i className="halflings headphones"></i>
              <p>
                <Link
                  to={PHONE_NUMBER.url}
                  title={`Llamar a ${SITE_NAME}`}
                  aria-label={`Llamar a ${SITE_NAME}`}
                >
                  {PHONE_NUMBER.visual}
                </Link>
              </p>
            </li>
            <li>
              <i className="halflings phone"></i>
              <p>
                <Link
                  to={WHATSAPP_NUMBER.url}
                  title={`Chatea con nosotros ${SITE_NAME}`}
                  aria-label={`Chatea con nosotros ${SITE_NAME}`}
                >
                  {WHATSAPP_NUMBER.visual}
                </Link>
              </p>
            </li>

            <li
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <i className="halflings envelope"></i>{" "}
              <p style={{ display: "inline", margin: 0 }}>
                <Link
                  to={CONTACT_EMAIL.url}
                  title={`Envíanos un email a ${CONTACT_EMAIL.visual}`}
                  aria-label={`Envíanos un email a ${CONTACT_EMAIL.visual}`}
                >
                  {CONTACT_EMAIL.visual}
                </Link>
              </p>
            </li>
            <li
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <i className="halflings globe"></i>{" "}
              <p style={{ display: "inline", margin: 0 }} title={SITE_URL}>
                {SITE_URL}
              </p>
            </li>
          </ul>
        </div>

        <div className="widget">
          <h4>Horarios</h4>
          <ul className="contact-informations hours">
            <li>
              <i className="halflings time"></i>Lunes - Viernes{" "}
              <span className="hours">9 am a 6 pm</span>
            </li>
            <li>
              <i className="halflings time"></i>Sábados{" "}
              <span className="hours">9 am a 2 pm</span>
            </li>
            <li>
              <i className="halflings ban-circle"></i>Domingo{" "}
              <span className="hours">Cerrado</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ContactLeftColumn;
