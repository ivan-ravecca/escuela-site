import React from "react";
import { Link } from "react-router-dom";
import {
  SITE_NAME,
  CONTACT_EMAIL,
  PHONE_NUMBER,
  WHATSAPP_NUMBER,
  SITE_ADDRESS,
  MEC_URL,
  FACEBOOK_APP,
} from "../../app.config";

const Footer: React.FC = () => {
  return (
    <>
      <footer id="footer">
        <div className="container">
          <div className="eight columns">
            <p>
              <strong className="highlight color">{SITE_NAME}</strong> es una
              joven institución educativa presente en Pando, habilitada por el{" "}
              <Link
                to={MEC_URL}
                target="_blank"
                title="Ir a la web del Ministerio de Educación y Cultura"
                aria-label="Ir a la web del Ministerio de Educación y Cultura"
                rel="noopener noreferrer"
              >
                Ministerio de Educación y Cultura
              </Link>
              .
            </p>
            <iframe src={FACEBOOK_APP.likeUrl}></iframe>
          </div>

          <div className="eight columns">
            <h4>¿Cómo contactarnos?</h4>
            <ul className="contact-details-alt">
              <li>
                <i className="halflings white map-marker"></i>{" "}
                <p>
                  <strong>Dirección:</strong>
                  <Link
                    to={SITE_ADDRESS.url}
                    aria-label={`Dirección de ${SITE_NAME}`}
                    title={`Dirección de ${SITE_NAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {SITE_ADDRESS.visual}
                  </Link>
                </p>
              </li>
              <li>
                <i className="halflings white headphones"></i>{" "}
                <p>
                  <strong>Teléfono:</strong>{" "}
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
                <i className="halflings white phone"></i>{" "}
                <p>
                  <strong>Whatsapp:</strong>{" "}
                  <Link
                    to={WHATSAPP_NUMBER.url}
                    title={`Chatea con nosotros ${SITE_NAME}`}
                    aria-label={`Chatea con nosotros ${SITE_NAME}`}
                  >
                    {WHATSAPP_NUMBER.visual}
                  </Link>
                </p>
              </li>
              <li>
                <i className="halflings white envelope"></i>{" "}
                <p>
                  <strong>Email:</strong>{" "}
                  <Link
                    to={CONTACT_EMAIL.url}
                    title={`Envíanos un email a ${CONTACT_EMAIL.visual}`}
                    aria-label={`Envíanos un email a ${CONTACT_EMAIL.visual}`}
                  >
                    {CONTACT_EMAIL.visual}
                  </Link>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
