import React from "react";
import { Link } from "react-router-dom";
import { SITE_NAME, PHONE_NUMBER, WHATSAPP_NUMBER } from "../../app.config";
import SocialIcons from "./SocialIcons";
import AppNavigation from "./AppNavigation";
import { AnalyticsService } from "../services/AnalyticsService";

const AppHeader: React.FC = () => {
  return (
    <>
      <div id="top-line"></div>

      <div className="container">
        <header id="header">
          <div className="ten columns">
            <div id="logo">
              <h1>
                <Link to="/">
                  <img
                    src="/images/logos/logo_ancho_nuevo.png"
                    alt={`Logo ${SITE_NAME}`}
                    title={SITE_NAME}
                  />
                </Link>
              </h1>
              {/* <div id="tagline">{${SITE_NAME}}</div> */}
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="six columns">
            <SocialIcons />
            <div className="clearfix"></div>
            <div className="clearfix">
              <div className="contact-details">
                <Link
                  to={PHONE_NUMBER.url}
                  title={`Llamar a ${SITE_NAME}`}
                  aria-label={`Llamar a ${SITE_NAME}`}
                  onClick={() => {
                    AnalyticsService.trackEvent(
                      "Contact",
                      "Call",
                      `Llamar a ${SITE_NAME}`,
                    );
                  }}
                >
                  Teléfono: {PHONE_NUMBER.visual}
                </Link>
              </div>
            </div>
            <div className="clearfix">
              <div className="contact-details">
                <Link
                  to={WHATSAPP_NUMBER.url}
                  aria-label={`Chatea con ${SITE_NAME}`}
                  title={`Chatea con ${SITE_NAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    AnalyticsService.trackEvent(
                      "Contact",
                      "WhatsApp",
                      `Mensaje a ${SITE_NAME}`,
                    );
                  }}
                >
                  Whatsapp: {WHATSAPP_NUMBER.visual}
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="clearfix"></div>
      </div>

      <AppNavigation />
      <div className="clearfix"></div>
    </>
  );
};

export default AppHeader;
